// Wspólne funkcje pomocnicze dla wszystkich generatorów dokumentów

function escapeHtml(str){
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function todayPL(){
  const d = new Date();
  return d.toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' });
}

// przybliżanie / oddalanie podglądu dokumentu
function initZoom(paperId){
  const paper = document.getElementById(paperId);
  let scale = 0.62;
  document.querySelectorAll('.zoom-controls button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const dir = parseInt(btn.dataset.zoom, 10);
      scale = Math.min(1, Math.max(0.35, scale + dir * 0.08));
      paper.style.transform = 'scale(' + scale + ')';
    });
  });
}

// wybór koloru motywu dokumentu (CV, wizytówka)
function initThemePicker(containerId, cssVarName, paperId){
  const wrap = document.getElementById(containerId);
  const paper = document.getElementById(paperId || 'paper');
  if(!wrap || !paper) return;
  wrap.querySelectorAll('.swatch').forEach(function(sw){
    sw.addEventListener('click', function(){
      wrap.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active'));
      sw.classList.add('active');
      paper.style.setProperty(cssVarName, sw.dataset.color);
    });
  });
}

// favicon + baner cookies + rozbudowana stopka — wspólne dla wszystkich podstron
function injectChrome(){
  const base = location.pathname.includes('/generatory/') ? '../' : '';

  if(!document.querySelector('link[rel="icon"]')){
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = base + 'assets/favicon.svg';
    document.head.appendChild(link);
  }

  if(!localStorage.getItem('gd_cookieConsent') && !document.getElementById('cookieBanner')){
    const el = document.createElement('div');
    el.id = 'cookieBanner';
    el.className = 'cookie-banner';
    el.innerHTML =
      '<div class="cookie-icon">🍪</div>' +
      '<div class="cookie-text">Używamy plików cookies do statystyk odwiedzin i wyświetlania reklam wspierających działanie serwisu. Możesz zaakceptować lub odrzucić — generatory działają tak samo w obu przypadkach.</div>' +
      '<div class="cookie-actions">' +
        '<button type="button" class="cookie-btn" id="cookieDecline">Odrzuć</button>' +
        '<button type="button" class="cookie-btn solid" id="cookieAccept">Akceptuję</button>' +
      '</div>';
    document.body.appendChild(el);
    document.getElementById('cookieAccept').addEventListener('click', function(){
      localStorage.setItem('gd_cookieConsent', 'accepted');
      el.remove();
    });
    document.getElementById('cookieDecline').addEventListener('click', function(){
      localStorage.setItem('gd_cookieConsent', 'declined');
      el.remove();
    });
  }

  const footer = document.querySelector('.site-footer');
  if(footer && !footer.querySelector('.footer-grid')){
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<div class="brand" style="margin-bottom:14px"><span class="mark">G</span>Generator dokumentów</div>' +
            '<p class="footer-note">Darmowe generatory dokumentów i pism — bez rejestracji, bez wysyłania danych na serwer. Wszystko dzieje się lokalnie, w Twojej przeglądarce.</p>' +
          '</div>' +
          '<div class="footer-cols">' +
            '<div class="footer-col">' +
              '<h4>O serwisie</h4>' +
              '<a href="' + base + 'index.html#dokumenty">Wszystkie generatory</a>' +
              '<a href="' + base + 'index.html#kategorie">Kategorie</a>' +
              '<a href="' + base + 'index.html#faq">Najczęstsze pytania</a>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Zasady</h4>' +
              '<span style="display:block;font-size:14.5px;color:var(--ink-soft);margin-bottom:10px">Wzory mają charakter pomocniczy</span>' +
              '<span style="display:block;font-size:14.5px;color:var(--ink-soft);margin-bottom:10px">Dane zostają w Twojej przeglądarce</span>' +
              '<span style="display:block;font-size:14.5px;color:var(--ink-soft)">Bez rejestracji i bez konta</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">© 2026 Generator dokumentów online. Wzory mają charakter pomocniczy i nie stanowią porady prawnej.</div>' +
      '</div>';
  }
}
document.addEventListener('DOMContentLoaded', injectChrome);

// eksport do PDF przez natywne drukowanie przeglądarki
function initDownload(btnId, filename){
  const btn = document.getElementById(btnId);
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const prevTitle = document.title;
    if(filename) document.title = filename;
    window.print();
    setTimeout(()=>{ document.title = prevTitle; }, 500);
  });
}
