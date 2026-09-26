/* Wspólne zachowanie wszystkich stron: wyszukiwarka, zakładki biblioteki,
   podgląd dokumentu, pasek mobilny, baner cookies i eksport do PDF. */

var GD_BASE = location.pathname.indexOf('/generatory/') !== -1 ? '../' : '';

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function todayPL() {
  return new Date().toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' });
}

function gdIcon(name, cls) {
  var icons = (window.GD_CATALOG && window.GD_CATALOG.icons) || {};
  return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (icons[name] || '') + '</svg>';
}

/* ---------- Podgląd: arkusz A4 skalowany do szerokości blatu ---------- */
var gdPaper = { el: null, fit: null, stage: null, scale: 1, manual: false };

function gdFitPaper() {
  var p = gdPaper;
  if (!p.el || !p.stage) return;
  var cs = getComputedStyle(p.stage);
  var avail = p.stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  var w = p.el.offsetWidth, h = p.el.offsetHeight;
  if (!w || avail <= 0) return;
  if (!p.manual) p.scale = Math.min(1, avail / w);
  p.el.style.transform = 'scale(' + p.scale + ')';
  p.fit.style.width = Math.round(w * p.scale) + 'px';
  p.fit.style.height = Math.round(h * p.scale) + 'px';
}

function initZoom(paperId) {
  var paper = document.getElementById(paperId);
  if (!paper) return;
  var fit = paper.parentElement;
  if (!fit.classList.contains('paper-fit')) {
    fit = document.createElement('div');
    fit.className = 'paper-fit';
    paper.parentNode.insertBefore(fit, paper);
    fit.appendChild(paper);
  }
  gdPaper.el = paper;
  gdPaper.fit = fit;
  gdPaper.stage = fit.closest('.desk-stage') || fit.parentElement;

  document.querySelectorAll('[data-zoom]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dir = btn.getAttribute('data-zoom');
      if (dir === 'fit') { gdPaper.manual = false; }
      else {
        gdPaper.manual = true;
        gdPaper.scale = Math.min(1.2, Math.max(0.2, gdPaper.scale + parseInt(dir, 10) * 0.1));
      }
      gdFitPaper();
    });
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(gdFitPaper).observe(paper);
    new ResizeObserver(gdFitPaper).observe(gdPaper.stage);
  } else {
    window.addEventListener('resize', gdFitPaper);
  }
  gdFitPaper();
}

/* ---------- Wybór koloru motywu ---------- */
function initThemePicker(containerId, cssVarName, paperId) {
  var wrap = document.getElementById(containerId);
  var paper = document.getElementById(paperId || 'paper');
  if (!wrap || !paper) return;
  wrap.querySelectorAll('.swatch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      wrap.querySelectorAll('.swatch').forEach(function (s) {
        s.classList.remove('active');
        s.setAttribute('aria-pressed', 'false');
      });
      sw.classList.add('active');
      sw.setAttribute('aria-pressed', 'true');
      paper.style.setProperty(cssVarName, sw.getAttribute('data-color'));
    });
  });
}

/* ---------- Eksport do PDF: drukujemy tylko klon arkusza ---------- */
var gdPrintName = '';

function gdBuildPrintRoot() {
  var paper = document.getElementById('paper');
  if (!paper) return;
  var old = document.getElementById('print-root');
  if (old) old.remove();
  var root = document.createElement('div');
  root.id = 'print-root';
  // Klon zachowuje id="paper", bo style stron (np. format poziomy) celują w #paper; oryginał jest w druku ukryty.
  var clone = paper.cloneNode(true);
  clone.style.transform = 'none';
  root.appendChild(clone);
  document.body.appendChild(root);
}

function gdPrint() {
  var prev = document.title;
  if (gdPrintName) document.title = gdPrintName;
  gdBuildPrintRoot();
  window.print();
  setTimeout(function () { document.title = prev; }, 800);
}

function initDownload(btnId, filename) {
  gdPrintName = filename || '';
  var btns = document.querySelectorAll('#' + btnId + ', [data-download]');
  btns.forEach(function (b) { b.addEventListener('click', gdPrint); });
}

window.addEventListener('beforeprint', gdBuildPrintRoot);
window.addEventListener('afterprint', function () {
  var r = document.getElementById('print-root');
  if (r) r.remove();
});

/* ---------- Podgląd pełnoekranowy na telefonie ---------- */
function gdInitMobilePreview() {
  var desk = document.getElementById('desk');
  if (!desk) return;
  var lastFocus = null;
  function open() {
    lastFocus = document.activeElement;
    desk.classList.add('is-open');
    document.body.classList.add('desk-open');
    requestAnimationFrame(gdFitPaper);
    var c = desk.querySelector('.desk-close');
    if (c) setTimeout(function () { c.focus(); }, 50);
  }
  function close() {
    desk.classList.remove('is-open');
    document.body.classList.remove('desk-open');
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-preview-open]').forEach(function (b) { b.addEventListener('click', open); });
  document.querySelectorAll('[data-preview-close]').forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && desk.classList.contains('is-open')) close();
  });
}

/* ---------- Wyszukiwarka ---------- */
function gdNorm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
}

function gdSearch(q) {
  var cat = window.GD_CATALOG;
  if (!cat) return [];
  var terms = gdNorm(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  var catName = {};
  cat.categories.forEach(function (c) { catName[c.slug] = c.name; });
  return cat.items.map(function (it) {
    var hay = gdNorm(it.name + ' ' + it.kw);
    var name = gdNorm(it.name);
    var score = 0;
    for (var i = 0; i < terms.length; i++) {
      if (hay.indexOf(terms[i]) === -1) return null;
      score += name.indexOf(terms[i]) === 0 ? 3 : name.indexOf(terms[i]) !== -1 ? 2 : 1;
    }
    return { it: it, score: score, catName: catName[it.cat] };
  }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 7);
}

function gdInitSearch(input) {
  var box = input.closest('.search');
  var list = box.querySelector('.search-results');
  var active = -1, results = [];

  function hrefOf(it) { return GD_BASE + 'generatory/' + it.slug + '.html'; }

  function render() {
    var q = input.value.trim();
    if (!q) { list.hidden = true; input.setAttribute('aria-expanded', 'false'); return; }
    results = gdSearch(q);
    active = -1;
    if (!results.length) {
      list.innerHTML = '<p class="search-empty">Brak wyników dla „' + escapeHtml(q) + '”. Spróbuj np. „CV” albo „wypowiedzenie”.</p>';
    } else {
      list.innerHTML = results.map(function (r, i) {
        return '<a class="search-result" role="option" id="' + input.id + '-opt-' + i + '" href="' + hrefOf(r.it) + '">' +
          '<span class="sq">' + gdIcon(r.it.icon) + '</span>' +
          '<span><b>' + escapeHtml(r.it.name) + '</b><small>' + escapeHtml(r.catName) + '</small></span></a>';
      }).join('');
    }
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  function highlight() {
    var opts = list.querySelectorAll('.search-result');
    opts.forEach(function (o, i) { o.classList.toggle('is-active', i === active); });
    if (active >= 0 && opts[active]) input.setAttribute('aria-activedescendant', opts[active].id);
    else input.removeAttribute('aria-activedescendant');
  }

  input.addEventListener('input', render);
  input.addEventListener('focus', function () { if (input.value.trim()) render(); });
  input.addEventListener('keydown', function (e) {
    if (list.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(results.length - 1, active + 1); highlight(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(-1, active - 1); highlight(); }
    else if (e.key === 'Escape') { list.hidden = true; input.setAttribute('aria-expanded', 'false'); }
  });
  var form = input.closest('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!results.length) results = gdSearch(input.value);
      var pick = results[active >= 0 ? active : 0];
      if (pick) { location.href = hrefOf(pick.it); return; }
      var lib = document.getElementById('biblioteka');
      if (lib) { gdSelectCat('all'); lib.scrollIntoView(); }
    });
  }
  document.addEventListener('click', function (e) {
    if (!box.contains(e.target)) { list.hidden = true; input.setAttribute('aria-expanded', 'false'); }
  });
}

function gdInitSearchSheet() {
  var sheet = document.getElementById('searchSheet');
  var backdrop = document.getElementById('searchBackdrop');
  if (!sheet) return;
  var input = sheet.querySelector('input');
  var lastFocus = null;
  function open() {
    lastFocus = document.activeElement;
    sheet.hidden = false;
    backdrop.hidden = false;
    setTimeout(function () { input.focus(); }, 30);
  }
  function close() {
    sheet.hidden = true;
    backdrop.hidden = true;
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-search-open]').forEach(function (b) { b.addEventListener('click', open); });
  sheet.querySelector('[data-search-close]').addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) close(); });
}

/* ---------- Zakładki biblioteki (strona główna) ---------- */
function gdSelectCat(slug) {
  var tabs = document.querySelectorAll('.cat-tab');
  if (!tabs.length) return;
  tabs.forEach(function (t) {
    var on = t.getAttribute('data-cat') === slug;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    t.tabIndex = on ? 0 : -1;
  });
  document.querySelectorAll('.cat-panel').forEach(function (p) {
    var pc = p.getAttribute('data-cat');
    p.hidden = !(slug === 'all' || pc === slug);
    var title = p.querySelector('.cat-panel-title');
    if (title) title.hidden = slug !== 'all';
  });
}

function gdInitTabs() {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.cat-tab'));
  if (!tabs.length) return;
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      gdSelectCat(t.getAttribute('data-cat'));
      history.replaceState(null, '', '#' + t.id);
    });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); n.focus(); n.click(); }
    });
  });
  function fromHash() {
    var h = location.hash.replace('#', '');
    if (h === 'wszystkie') { gdSelectCat('all'); return true; }
    var t = document.getElementById(h);
    if (t && t.classList.contains('cat-tab')) { gdSelectCat(t.getAttribute('data-cat')); return true; }
    return false;
  }
  if (!fromHash()) gdSelectCat(tabs[0].getAttribute('data-cat'));
  window.addEventListener('hashchange', function () {
    if (fromHash()) document.getElementById('biblioteka').scrollIntoView();
  });
}

/* ---------- Demo w hero ---------- */
function gdInitDemo() {
  var demo = document.getElementById('heroDemo');
  if (!demo) return;
  var map = [['demo-name', 'dsName'], ['demo-what', 'dsWhat']];
  function update(e) {
    map.forEach(function (m) {
      var v = document.getElementById(m[0]).value.trim() || '…';
      var t = document.getElementById(m[1]);
      if (t.textContent !== v) {
        t.textContent = v;
        if (e && e.target.id === m[0]) {
          t.classList.remove('flash');
          void t.offsetWidth;
          t.classList.add('flash');
        }
      }
    });
  }
  demo.addEventListener('input', update);
  document.getElementById('dsDate').textContent = todayPL();
  update();
}

/* ---------- Baner cookies ---------- */
function gdInitCookies() {
  var KEY = 'gd_cookieConsent';
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { stored = 'n/a'; }
  if (stored) return;
  var el = document.createElement('div');
  el.className = 'cookie';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Zgoda na pliki cookies');
  el.innerHTML =
    '<p>Używamy plików cookies do statystyk odwiedzin i wyświetlania reklam wspierających działanie serwisu. ' +
    'Możesz zaakceptować lub odrzucić — generatory działają tak samo w obu przypadkach.</p>' +
    '<div class="cookie-actions">' +
    '<button type="button" class="btn btn-outline" data-v="denied">Odrzuć</button>' +
    '<button type="button" class="btn btn-blue" data-v="granted">Akceptuję</button></div>';
  document.body.appendChild(el);
  el.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-v]');
    if (!b) return;
    try { localStorage.setItem(KEY, b.getAttribute('data-v')); } catch (err) {}
    el.remove();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('input[data-search]').forEach(gdInitSearch);
  gdInitSearchSheet();
  gdInitTabs();
  gdInitDemo();
  gdInitMobilePreview();
  gdInitCookies();
});
