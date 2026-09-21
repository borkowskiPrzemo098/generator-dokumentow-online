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
