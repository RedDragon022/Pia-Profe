(function(){
  'use strict';
  const STORAGE_KEY = 'invomex_theme_pref';
  const html = document.documentElement;

  function updateMetaThemeColor(){
    var meta = document.querySelector('meta[name="theme-color"]');
    if(!meta){
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    const isDark = html.getAttribute('data-theme') === 'dark';
    meta.setAttribute('content', isDark ? '#1e1b4b' : '#312e81');
  }

  function applyStoredTheme(){
    const stored = localStorage.getItem(STORAGE_KEY);
    if(stored === 'dark'){ html.setAttribute('data-theme','dark'); }
    else { html.removeAttribute('data-theme'); }
    updateMetaThemeColor();
  }

  function toggleTheme(){
    const isDark = html.getAttribute('data-theme') === 'dark';
    if(isDark){
      html.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY,'light');
      button.setAttribute('aria-pressed','false');
      button.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>';
    } else {
      html.setAttribute('data-theme','dark');
      localStorage.setItem(STORAGE_KEY,'dark');
      button.setAttribute('aria-pressed','true');
      button.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
    }
    updateMetaThemeColor();
  }

  // Crear botón accesible
  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.type = 'button';
  button.setAttribute('aria-label','Cambiar tema');
  button.setAttribute('aria-pressed','false');
  button.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>';

  button.addEventListener('click', toggleTheme);

  // Aplicar tema almacenado lo antes posible
  applyStoredTheme();

  document.addEventListener('DOMContentLoaded', function(){
    // Insertar al final del body
    document.body.appendChild(button);
    // Actualizar estado visual según preferencia
    if(html.getAttribute('data-theme') === 'dark'){
      button.setAttribute('aria-pressed','true');
      button.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
    }
  });
})();
