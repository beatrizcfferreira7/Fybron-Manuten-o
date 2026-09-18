var langAttrs = { pt: "pt-PT", en: "en", fr: "fr", nl: "nl" };

function setLanguage(lang){
  var dict = translations[lang];
  if(!dict) return;

  document.title = dict.title;
  document.documentElement.lang = langAttrs[lang];

  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    if(dict[key] !== undefined){
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll('.lang-switch button').forEach(function(btn){
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  try{ localStorage.setItem('fybron-lang', lang); }catch(e){}
}

document.querySelectorAll('.lang-switch button').forEach(function(btn){
  btn.addEventListener('click', function(){
    setLanguage(btn.getAttribute('data-lang'));
  });
});

var saved = null;
try{ saved = localStorage.getItem('fybron-lang'); }catch(e){}
if(saved && translations[saved]){
  setLanguage(saved);
}
