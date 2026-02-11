(function(){
  function boot(){
    if (!window.init || !window.state || !window.geminiGenerate) { return setTimeout(boot, 25); }

    window.init(window.__SYSTEM, window.__HELLO);

    // Indirect injection wrapper (no template literals)
    var notesEl = document.querySelector('#notes');
    var notes = notesEl ? notesEl.textContent : '';
    var oldGem = window.geminiGenerate;
    window.geminiGenerate = async function(){
      var msgs = window.state.messages;
      var last = msgs && msgs.length ? msgs[msgs.length - 1] : null;
      if (last && last.role === 'user') {
        last.text = 'UNTRUSTED:\n' + notes + '\n\nUSER:\n' + last.text;
      }
      return oldGem();
    };
  }
  boot();
})();