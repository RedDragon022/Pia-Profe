// Font loader: añade clases al <html> para controlar FOUT/FOIT y estilos críticos.
(function(){
  const html = document.documentElement;
  // Estado inicial
  html.classList.add('fonts-loading');

  // Intenta usar FontFace API si está disponible
  function markLoaded(){
    html.classList.remove('fonts-loading');
    html.classList.add('fonts-loaded');
  }

  function markError(){
    html.classList.remove('fonts-loading');
    html.classList.add('fonts-failed');
  }

  // Si document.fonts está disponible, usarlo
  if (document.fonts && document.fonts.ready) {
    // document.fonts.ready es una Promise que se resuelve cuando las fuentes solicitadas están cargadas
    document.fonts.ready.then(() => {
      // pequeña espera para evitar flash abrupto
      setTimeout(markLoaded, 50);
    }).catch(() => {
      markError();
    });
  } else if (window.FontFace) {
    // Fallback: intentar cargar una muestra pequeña de la familia Inter
    try {
      const f = new FontFace('Inter', 'local(Inter)');
      f.load().then(() => {
        document.fonts.add(f);
        markLoaded();
      }).catch(()=>{
        markError();
      });
    } catch (e) {
      // Si no funciona, marcar como cargada para no bloquear UI
      markLoaded();
    }
  } else {
    // No hay API moderna: marcar cargada después de un timeout corto
    setTimeout(markLoaded, 300);
  }
})();
