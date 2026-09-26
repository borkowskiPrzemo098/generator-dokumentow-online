// Buduje statyczny HTML: stronę główną i 30 stron generatorów z jednego katalogu.
// Użycie: node tools/build.mjs   (idempotentne — można uruchamiać wielokrotnie)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://borkowskiprzemo098.github.io/generator-dokumentow-online/';
const TODAY = new Date().toISOString().slice(0, 10);

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js/catalog.js'), 'utf8'), ctx);
const { icons: ICONS, categories: CATS, items: ITEMS } = ctx.GD_CATALOG;
const catBy = Object.fromEntries(CATS.map((c) => [c.slug, c]));
const POPULAR = ITEMS.filter((i) => i.popular);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const icon = (name, cls = '') => {
  if (!ICONS[name]) throw new Error('Brak ikony: ' + name);
  return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
};
const plural = (n) => (n === 1 ? 'generator' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'generatory' : 'generatorów');

/* ---------- Ekstrakcja treści ze strony (stary i nowy format) ---------- */
function balancedEnd(html, start) {
  const re = /<div\b|<\/div>/g;
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += m[0] === '</div>' ? -1 : 1;
    if (depth === 0) return m.index + 6;
  }
  throw new Error('Niezbalansowane <div> od ' + start);
}
function innerOf(html, openTag) {
  const s = html.indexOf(openTag);
  if (s === -1) throw new Error('Nie znaleziono ' + openTag);
  const e = balancedEnd(html, s);
  return html.slice(s + openTag.length, e - 6);
}
const between = (html, a, b) => {
  const s = html.indexOf(a), e = html.indexOf(b);
  if (s === -1 || e === -1) throw new Error('Brak znacznika ' + a);
  return html.slice(s + a.length, e).trim();
};
const decode = (s) => String(s).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function extract(html) {
  const get = (re) => (html.match(re) || [])[1];
  const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1].trim()).join('\n');
  const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const script = inline[inline.length - 1].trim();
  const d = {
    title: decode(get(/<title>([\s\S]*?)<\/title>/)),
    desc: decode(get(/<meta name="description" content="([^"]*)"/)),
    styles, script,
  };
  if (html.includes('<!--GD:FORM-->')) {
    d.h1 = get(/<h1 class="display">([\s\S]*?)<\/h1>/);
    d.lead = get(/<p class="page-lead">([\s\S]*?)<\/p>/);
    d.form = between(html, '<!--GD:FORM-->', '<!--/GD:FORM-->');
    d.paper = between(html, '<!--GD:PAPER-->', '<!--/GD:PAPER-->');
    d.note = get(/<span data-gd="note">([\s\S]*?)<\/span>/);
    return d;
  }
  const head = html.match(/<div class="wrap gen-head">[\s\S]*?<h1>([\s\S]*?)<\/h1>\s*<p>([\s\S]*?)<\/p>/);
  d.h1 = head[1].trim();
  d.lead = head[2].trim();
  let form = innerOf(html, '<div class="panel">');
  d.note = (form.match(/<div class="disclaimer">([\s\S]*?)<\/div>/) || [])[1];
  form = form.replace(/<div class="disclaimer">[\s\S]*?<\/div>/, '').replace(/<button class="btn-primary"[\s\S]*?<\/button>/, '');
  d.form = form.trim();
  d.paper = innerOf(html, '<div class="preview-stage">').trim();
  return d;
}

/* ---------- Przekształcenia (idempotentne) ---------- */
const TOKENS = [
  ['--green-950', '--doc-ink'], ['--green-900', '--doc-900'], ['--green-800', '--doc-900'],
  ['--green-700', '--doc-700'], ['--green-600', '--doc-700'], ['--mint-100', '--doc-zebra'],
  ['--mint-200', '--doc-rule'], ['--mint-300', '--doc-rule-2'], ['--ink-faint', '--doc-faint'],
  ['--ink-soft', '--doc-soft'], ['--border-strong', '--doc-line-2'], ['--border', '--doc-line'],
  ['--bg-soft', '--doc-zebra'], ['--gold-600', '--doc-gold'], ['--shadow-pop', '--doc-shadow'],
];
function docTokens(s) {
  for (const [a, b] of TOKENS) s = s.replace(new RegExp('var\\(' + a + '([,)])', 'g'), `var(${b}$1`);
  return s.replace(/#cfe8de/gi, 'rgba(255,255,255,.72)').replace(/#e4f0e8/gi, 'rgba(255,255,255,.9)').replace(/#eef7f1/gi, '#fff');
}
const SWATCH_NAMES = {
  '#16342c': 'ciemna zieleń', '#1f3a5f': 'granat', '#5c2a3a': 'bordo', '#7a5c1f': 'złoty brąz',
  '#3a3a3a': 'grafit', '#2f5c4a': 'zieleń', '#7a2a3a': 'wiśnia', '#a9822f': 'złoto',
};
function transformForm(f) {
  f = f.replace(/<h2 style="margin-top:\d+px">/g, '<h2>');
  f = f.replace(/<span class="swatch( active)?" data-color="(#[0-9a-fA-F]{6})" style="background:#[0-9a-fA-F]{6}"><\/span>/g,
    (m, act, hex) => `<button type="button" class="swatch${act || ''}" data-color="${hex}" style="background:${hex}" aria-label="Kolor: ${SWATCH_NAMES[hex.toLowerCase()] || hex}" aria-pressed="${act ? 'true' : 'false'}"></button>`);
  f = f.replace(/<label>([^<]*)<\/label>(\s*)<(input|textarea|select)([^>]*?)\sid="([^"]+)"/g, '<label for="$5">$1</label>$2<$3$4 id="$5"');
  f = f.replace(/<h2>([^<]+)<\/h2>(\s*)<div class="field">(\s*)<(input|textarea|select)(?![^>]*aria-label)/g, '<h2>$1</h2>$2<div class="field">$3<$4 aria-label="$1"');
  f = f.replace(/(<button class="btn-add"[^>]*>)\+ /g, `$1${icon('plus')}`);
  return docTokens(f);
}
function transformPaper(p) {
  p = p.replace(/(<div class="paper-doc[^"]*" id="paper") style="([^"]*)"/, (m, open, st) => {
    const rest = st.split(';').map((x) => x.trim()).filter((x) => x && !x.startsWith('transform')).join(';');
    return rest ? `${open} style="${rest}"` : open;
  });
  return docTokens(p);
}
const DAYS = [['Pon', 'Poniedziałek'], ['Wt', 'Wtorek'], ['Śr', 'Środa'], ['Czw', 'Czwartek'], ['Pt', 'Piątek'], ['Sob', 'Sobota'], ['Ndz', 'Niedziela']];
function transformScript(s) {
  s = s.replace(/<button class="repeat-remove" type="button">×<\/button>/g,
    `<button class="repeat-remove" type="button" aria-label="Usuń pozycję">${icon('x')}</button>`);
  s = s.replace(/class="field-row" style="grid-template-columns:repeat\((\d),1fr\)(?:;margin-top:8px)?"/g, 'class="field-row cols-$1"');
  s = s.replace(/<input class="r-d(\d)"(?: placeholder="[^"]*")? value=/g,
    (m, n) => `<input class="r-d${n}" placeholder="${DAYS[n][0]}" aria-label="${DAYS[n][1]}" value=`);
  s = s.replace(/<input class="(r-[a-z]+)" placeholder="([^"]+)"(?! aria-label)/g, '<input class="$1" placeholder="$2" aria-label="$2"');
  return docTokens(s);
}

/* ---------- Wspólne fragmenty ---------- */
const FONTS_SITE = 'family=Figtree:wght@400;500;600;700;800';
const FONTS_DOCS = 'family=Figtree:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,600';

function head({ title, desc, url, base, fonts, extra = '' }) {
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Generator dokumentów online">
<meta property="og:locale" content="pl_PL">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#112a6b">
<link rel="icon" type="image/svg+xml" href="${base}assets/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/css/style.css">${fonts === FONTS_DOCS ? `
<link rel="stylesheet" href="${base}assets/css/documents.css">` : ''}${extra}`;
}

const logoInner = `<span class="logo-mark">${icon('file-text')}</span><span class="logo-text">Generator <span>dokumentów</span></span>`;

function searchForm(id, base, variant = '') {
  const hero = variant === 'hero';
  return `<form class="search${hero ? ' search--hero' : ''}${variant === 'header' ? ' header-search' : ''}" role="search" action="${base}index.html">
  <label class="search-field">${icon('search')}<span class="sr-only">Szukaj dokumentu</span><input id="${id}" data-search type="search" role="combobox" aria-controls="${id}-list" aria-expanded="false" aria-autocomplete="list" autocomplete="off" placeholder="${hero ? 'Szukaj dokumentu…' : 'Szukaj dokumentu…'}">${hero ? '<button class="search-submit" type="submit">Szukaj</button>' : ''}</label>
  <div class="search-results" id="${id}-list" role="listbox" hidden></div>
</form>`;
}

function header(base) {
  return `<a class="skip-link" href="#main">Przejdź do treści</a>
<header class="site-header">
<div class="wrap header-bar">
<a href="${base}index.html" class="logo" aria-label="Generator dokumentów online — strona główna">${logoInner}</a>
${searchForm('q-header', base, 'header')}
<nav class="header-nav" aria-label="Nawigacja główna"><a href="${base}index.html#wszystkie">Wszystkie generatory</a><a href="${base}index.html#popularne">Popularne</a></nav>
<button type="button" class="header-search-btn" data-search-open aria-label="Szukaj dokumentu">${icon('search')}</button>
</div>
</header>`;
}

function searchSheet(base) {
  return `<div class="search-backdrop" id="searchBackdrop" hidden></div>
<div class="search-sheet" id="searchSheet" role="dialog" aria-label="Szukaj dokumentu" hidden>
<div class="search-sheet-head"><p>Szukaj dokumentu</p><button type="button" class="icon-btn" data-search-close aria-label="Zamknij wyszukiwanie">${icon('x')}</button></div>
${searchForm('q-sheet', base)}
</div>`;
}

function footer(base) {
  const cats = CATS.map((c) => `<li><a href="${base}index.html#kat-${c.slug}">${esc(c.name)}</a></li>`).join('');
  const pop = POPULAR.map((i) => `<li><a href="${base}generatory/${i.slug}.html">${esc(i.name)}</a></li>`).join('');
  return `<footer class="site-footer">
<div class="wrap footer-grid">
<div><a href="${base}index.html" class="logo logo--inverted" aria-label="Generator dokumentów online — strona główna">${logoInner}</a>
<p class="footer-about">${ITEMS.length} darmowych generatorów dokumentów. Bez konta i bez wysyłania danych: każdy dokument powstaje w Twojej przeglądarce.</p></div>
<div class="footer-col"><h2>Kategorie</h2><ul>${cats}</ul></div>
<div class="footer-col"><h2>Popularne</h2><ul>${pop}</ul></div>
<div class="footer-col"><h2>Nasze serwisy</h2><ul><li><a class="footer-sibling" href="https://borkowskiprzemo098.github.io/kalkulatory/"><span class="sq">${icon('calculator')}</span>Kalkulatory Online</a></li></ul></div>
</div>
<div class="footer-bottom"><div class="wrap"><b>© 2026 Generator dokumentów online</b><span>Wzory mają charakter pomocniczy i nie stanowią porady prawnej.</span></div></div>
</footer>`;
}

const CONTRACT = `<!--
THESIS: a document-generator portal that behaves like a phone app, sibling of Kalkulatory Online; refuses the pale form-builder SaaS page and the cream-and-serif stationery cliche.
OWN-WORLD: ink-blue ramp #071334-#eff4fd in full-bleed fields, sun yellow #ffd24d only for the one action on blue; Figtree 800 display; white 20px tiles with 56px ink-blue icon squares; a white A4 sheet lying on a blue "desk" panel.
STORY: the visitor finds the document in one search or tap, fills a short form, watches the sheet rewrite itself, downloads the PDF.
FIRST VIEWPORT: blue hero; H1 "Generator dokumentow online" at display size left with a 64px search and four chips; right a live mini-generator whose paper sheet rewrites as you type (sun ink-flash). Primary action: search.
FORM: pinned by the user brief (Kalkulatory Online sibling in its own colour), no roll; code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

const tileLg = (i, base) => `<li><a class="tile tile-lg" href="${base}generatory/${i.slug}.html"><span class="sq">${icon(i.icon)}</span><span class="nm">${esc(i.name)}</span></a></li>`;
const tileSm = (i, href) => `<li><a class="tile tile-sm" href="${href}"><span class="sq">${icon(i.icon)}</span><span class="nm">${esc(i.name)}</span></a></li>`;
const faqHtml = (list) => list.map((f) => `<details><summary>${esc(f.q)}<span class="pl">${icon('plus')}</span></summary><p>${esc(f.a)}</p></details>`).join('\n');
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

/* ---------- Strona generatora ---------- */
const GENERIC_FAQ = [
  { q: 'Jak zapisać dokument jako PDF?', a: 'Kliknij „Pobierz PDF”. Otworzy się okno drukowania — jako drukarkę wybierz „Zapisz jako PDF” i zatwierdź. Na telefonie ta opcja jest zwykle w menu „Udostępnij” lub „Drukuj”.' },
  { q: 'Czy moje dane są gdzieś wysyłane?', a: 'Nie. Formularz i podgląd działają w całości w Twojej przeglądarce — wpisane dane nie trafiają na żaden serwer.' },
];

function genPage(it, d) {
  const base = '../';
  const cat = catBy[it.cat];
  const url = `${SITE}generatory/${it.slug}.html`;
  const lead = it.lead || d.lead;
  const note = d.note || 'Wzór ma charakter pomocniczy — sprawdź dane przed wydrukiem.';
  let related = ITEMS.filter((x) => x.cat === it.cat && x.slug !== it.slug);
  if (related.length < 4) related = related.concat(POPULAR.filter((x) => x.slug !== it.slug && !related.includes(x))).slice(0, 5);
  related = related.slice(0, 5);
  const faq = it.faq.concat(GENERIC_FAQ);
  const chev = icon('chevron-right');
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: it.name, url, description: d.desc, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', inLanguage: 'pl', offers: { '@type': 'Offer', price: '0', priceCurrency: 'PLN' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: SITE },
      { '@type': 'ListItem', position: 2, name: cat.name, item: `${SITE}#kat-${cat.slug}` },
      { '@type': 'ListItem', position: 3, name: it.name, item: url }] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];
  return `<!DOCTYPE html>
<html lang="pl">
<head>
${head({ title: d.title, desc: d.desc, url, base, fonts: FONTS_DOCS })}
${d.styles ? `<style>\n${d.styles}\n</style>` : ''}
${ld.map(jsonLd).join('\n')}
</head>
<body class="has-mobile-bar">
${CONTRACT}
${header(base)}
<main id="main">
<section class="page-head">
<div class="wrap">
<nav class="crumbs" aria-label="Ścieżka"><a href="${base}index.html">Start</a>${chev}<a href="${base}index.html#kat-${cat.slug}">${esc(cat.name)}</a>${chev}<span aria-current="page">${esc(it.name)}</span></nav>
<div class="page-title"><span class="sq">${icon(it.icon)}</span><div><h1 class="display">${d.h1}</h1><p class="page-lead">${lead}</p></div></div>
</div>
</section>

<section class="gen" aria-label="Formularz i podgląd dokumentu">
<div class="wrap">
<div class="gen-grid">
<form class="form-card" aria-label="Dane dokumentu" onsubmit="return false">
<!--GD:FORM-->
${d.form}
<!--/GD:FORM-->
</form>

<aside class="desk" id="desk" aria-label="Podgląd dokumentu">
<div class="desk-bar"><h2>Podgląd dokumentu</h2>
<button type="button" class="desk-btn" data-zoom="-1" aria-label="Pomniejsz podgląd">${icon('minus')}</button>
<button type="button" class="desk-btn" data-zoom="1" aria-label="Powiększ podgląd">${icon('plus')}</button>
<button type="button" class="desk-btn" data-zoom="fit" aria-label="Dopasuj do szerokości">${icon('maximize')}</button>
<button type="button" class="desk-btn desk-close" data-preview-close aria-label="Zamknij podgląd">${icon('x')}</button>
</div>
<div class="desk-stage"><div class="paper-fit">
<!--GD:PAPER-->
${d.paper}
<!--/GD:PAPER-->
</div></div>
<button type="button" class="btn-sun desk-download" id="downloadBtn">${icon('download')}Pobierz PDF</button>
<p class="desk-privacy">${icon('shield-check')}Dokument powstaje w Twojej przeglądarce — nic nie wysyłamy.</p>
</aside>
</div>
<p class="gen-note">${icon('info')}<span data-gd="note">${note}</span></p>
</div>
</section>

<section class="info" aria-label="Informacje o dokumencie">
<div class="wrap info-grid">
<div class="info-article">
<p class="info-intro">${esc(it.intro)}</p>
<section aria-labelledby="how-h">
<h2 class="block-title" id="how-h"><span class="sq">${icon('list-checks')}</span>Jak to działa</h2>
<ol class="steps">
<li><b>Wypełnij formularz.</b> Dokument w podglądzie zmienia się na bieżąco, w trakcie pisania.</li>
<li><b>Sprawdź podgląd.</b> Na telefonie otworzysz go przyciskiem „Podgląd” na dole ekranu.</li>
<li><b>Kliknij „Pobierz PDF”</b> i w oknie drukowania wybierz „Zapisz jako PDF”.</li>
</ol>
</section>
<section aria-labelledby="faq-h">
<h2 class="block-title" id="faq-h"><span class="sq">${icon('help')}</span>Najczęściej zadawane pytania</h2>
<div class="faq">
${faqHtml(faq)}
</div>
</section>
</div>
<aside class="info-aside" aria-labelledby="rel-h">
<h2 class="block-title" id="rel-h"><span class="sq">${icon('layers')}</span>Podobne generatory</h2>
<ul class="tiles-sm tiles-sm--col">${related.map((r) => tileSm(r, `${r.slug}.html`)).join('')}</ul>
</aside>
</div>
</section>
</main>
${footer(base)}
<div class="mobile-bar"><button type="button" class="btn btn-outline" data-preview-open>${icon('eye')}Podgląd</button><button type="button" class="btn btn-blue" data-download>${icon('download')}Pobierz PDF</button></div>
${searchSheet(base)}
<script src="${base}assets/js/catalog.js"></script>
<script src="${base}assets/js/common.js"></script>
<script>
${d.script}
</script>
</body>
</html>
`;
}

/* ---------- Strona główna ---------- */
const HOME_FAQ = [
  { q: 'Czy generatory dokumentów są darmowe?', a: 'Tak. Wszystkie generatory są całkowicie darmowe i działają bez rejestracji. Wypełniasz formularz i od razu pobierasz PDF.' },
  { q: 'Czy moje dane są wysyłane na serwer?', a: 'Nie. Formularz i podgląd działają w całości w Twojej przeglądarce, więc wpisane dane nigdy nie opuszczają Twojego urządzenia.' },
  { q: 'Czy wygenerowane dokumenty mają moc prawną?', a: 'Wzory pokazują ogólnie przyjętą strukturę pism i mają charakter pomocniczy. Nie są poradą prawną: w ważnych sprawach prawnych lub finansowych skonsultuj dokument z prawnikiem.' },
  { q: 'Jak pobrać gotowy dokument?', a: 'Kliknij „Pobierz PDF”. Otworzy się okno drukowania przeglądarki, w którym jako drukarkę wybierasz „Zapisz jako PDF”.' },
  { q: 'Czy mogę zmienić kolorystykę dokumentu?', a: 'Tak. Generator CV, wizytówki, zaproszenia i kartki okolicznościowej mają wybór koloru. Kliknij kolor nad formularzem, a podgląd i PDF zmienią się od razu.' },
];

function homePage() {
  const base = '';
  const chips = [['cv', 'CV'], ['wypowiedzenie-umowy', 'Wypowiedzenie'], ['upowaznienie', 'Upoważnienie'], ['wizytowka', 'Wizytówka']]
    .map(([slug, label]) => { const i = ITEMS.find((x) => x.slug === slug); return `<a class="chip" href="generatory/${slug}.html">${icon(i.icon)}${label}</a>`; }).join('');
  const tabs = CATS.map((c) => {
    const n = ITEMS.filter((i) => i.cat === c.slug).length;
    return `<button type="button" role="tab" class="cat-tab" id="kat-${c.slug}" data-cat="${c.slug}" aria-controls="panel-${c.slug}" aria-selected="false">${icon(c.icon)}${esc(c.name)}<span class="ct">${n}</span></button>`;
  }).join('\n') + `\n<button type="button" role="tab" class="cat-tab" id="wszystkie" data-cat="all" aria-selected="false">${icon('grid')}Pokaż wszystkie<span class="ct">${ITEMS.length}</span></button>`;
  const panels = CATS.map((c) => {
    const list = ITEMS.filter((i) => i.cat === c.slug);
    return `<div class="cat-panel" id="panel-${c.slug}" data-cat="${c.slug}" role="tabpanel" aria-labelledby="kat-${c.slug}">
<h3 class="cat-panel-title">${esc(c.name)} <span class="sr-only">(${list.length} ${plural(list.length)})</span></h3>
<ul class="tiles-sm">${list.map((i) => tileSm(i, `generatory/${i.slug}.html`)).join('')}</ul>
</div>`;
  }).join('\n');
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Generator dokumentów online', url: SITE, inLanguage: 'pl' },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Generatory dokumentów', itemListElement: ITEMS.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.name, url: `${SITE}generatory/${i.slug}.html` })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: HOME_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];
  return `<!DOCTYPE html>
<html lang="pl">
<head>
${head({
  title: `Generator dokumentów online — ${ITEMS.length} darmowych wzorów pism i dokumentów PDF`,
  desc: `${ITEMS.length} darmowych generatorów dokumentów: CV, list motywacyjny, wypowiedzenia, upoważnienia, wezwania do zapłaty, wizytówki, zaproszenia i grafiki pracy. Wypełniasz formularz, pobierasz gotowy PDF — bez rejestracji.`,
  url: SITE, base, fonts: FONTS_SITE,
})}
${ld.map(jsonLd).join('\n')}
</head>
<body class="has-bottom-nav">
${CONTRACT}
${header(base)}
<main id="main">
<section class="hero" aria-labelledby="hero-h">
<div class="hero-glyphs" aria-hidden="true"><span style="right:3%;top:2%;font-size:16rem;transform:rotate(10deg)">§</span><span style="left:-3%;bottom:-12%;font-size:14rem">¶</span><span style="left:44%;top:-14%;font-size:9rem;transform:rotate(-8deg)">@</span><span style="right:30%;bottom:-10%;font-size:8rem">A4</span></div>
<div class="wrap hero-inner">
<div>
<h1 id="hero-h" class="display">Generator dokumentów <span class="sun">online</span></h1>
<p class="hero-lead">${ITEMS.length} darmowych wzorów pism i dokumentów. Wypełniasz formularz, a gotowy PDF masz od razu.</p>
${searchForm('q-hero', base, 'hero')}
<nav class="chips" aria-label="Popularne dokumenty">${chips}</nav>
</div>
<div class="demo" id="heroDemo">
<div class="demo-head"><span class="sq">${icon('file-x')}</span><p>Wypowiedzenie umowy: wpisz swoje dane</p></div>
<div class="demo-fields">
<div><label for="demo-name">Imię i nazwisko</label><input id="demo-name" value="Jan Nowak" autocomplete="off"></div>
<div><label for="demo-what">Umowa z firmą</label><input id="demo-what" value="Fitness Club" autocomplete="off"></div>
</div>
<div class="demo-desk" aria-hidden="true"><div class="demo-sheet">
<div class="ds-top"><span><mark class="ds-name" id="dsName">Jan Nowak</mark><br>ul. Leśna 8/2, Warszawa</span><span id="dsDate"></span></div>
<p class="ds-title">WYPOWIEDZENIE UMOWY</p>
<p class="ds-body">Niniejszym wypowiadam umowę zawartą z <mark id="dsWhat">Fitness Club</mark> z zachowaniem okresu wypowiedzenia. Proszę o potwierdzenie przyjęcia wypowiedzenia oraz o informację o dacie rozwiązania umowy.</p>
</div></div>
<a class="demo-link" href="generatory/wypowiedzenie-umowy.html">Otwórz pełny generator wypowiedzenia${icon('arrow-right')}</a>
</div>
</div>
</section>

<section class="section" id="popularne" aria-labelledby="pop-h">
<div class="wrap">
<div class="section-head"><h2 id="pop-h" class="display">Najpopularniejsze</h2><a class="more-link" href="#wszystkie">Wszystkie${icon('arrow-right')}</a></div>
<ul class="tiles">${POPULAR.map((i) => tileLg(i, base)).join('')}</ul>
</div>
</section>

<section class="section section--mist" id="biblioteka" aria-labelledby="lib-h">
<div class="wrap">
<div class="section-head"><h2 id="lib-h" class="display">Wszystkie generatory</h2></div>
<div class="cat-tabs" role="tablist" aria-label="Kategorie dokumentów">
${tabs}
</div>
${panels}
</div>
</section>

<section class="band section" aria-labelledby="band-h">
<div class="wrap">
<h2 id="band-h" class="display">Gotowy dokument <span class="sun">bez rejestracji</span></h2>
<ul class="band-list">
<li class="band-item"><span class="sq">${icon('zap')}</span><h3>Podgląd na żywo</h3></li>
<li class="band-item"><span class="sq">${icon('device')}</span><h3>Dane zostają u Ciebie</h3></li>
<li class="band-item"><span class="sq">${icon('printer')}</span><h3>PDF jednym kliknięciem</h3></li>
</ul>
<a class="btn-sun" href="#wszystkie">Zobacz wszystkie ${ITEMS.length} generatorów${icon('arrow-right')}</a>
</div>
</section>

<section class="section" id="faq" aria-labelledby="faq-h">
<div class="wrap">
<div class="section-head"><h2 id="faq-h" class="display">Najczęstsze pytania</h2></div>
<div class="faq" style="margin-top:28px">
${faqHtml(HOME_FAQ)}
</div>
</div>
</section>
</main>
${footer(base)}
<nav class="bottom-nav" aria-label="Nawigacja mobilna"><ul>
<li><a href="index.html" aria-current="page"><span class="pill">${icon('home')}</span>Start</a></li>
<li><a href="#wszystkie"><span class="pill">${icon('grid')}</span>Generatory</a></li>
<li><a href="#popularne"><span class="pill">${icon('star')}</span>Popularne</a></li>
<li><button type="button" data-search-open><span class="pill">${icon('search')}</span>Szukaj</button></li>
</ul></nav>
${searchSheet(base)}
<script src="assets/js/catalog.js"></script>
<script src="assets/js/common.js"></script>
</body>
</html>
`;
}

/* ---------- Uruchomienie ---------- */
let n = 0;
for (const it of ITEMS) {
  const file = path.join(ROOT, 'generatory', it.slug + '.html');
  const src = fs.readFileSync(file, 'utf8');
  const d = extract(src);
  if (!src.includes('<!--GD:FORM-->')) {
    d.form = transformForm(d.form);
    d.paper = transformPaper(d.paper);
    d.script = transformScript(d.script);
    d.styles = docTokens(d.styles);
  }
  fs.writeFileSync(file, genPage(it, d));
  n++;
}
fs.writeFileSync(path.join(ROOT, 'index.html'), homePage());
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}</loc><lastmod>${TODAY}</lastmod><priority>1.0</priority></url>
${ITEMS.map((i) => `  <url><loc>${SITE}generatory/${i.slug}.html</loc><lastmod>${TODAY}</lastmod><priority>${i.popular ? '0.9' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`);
console.log(`Zbudowano: index.html + ${n} stron generatorów + sitemap.xml`);
