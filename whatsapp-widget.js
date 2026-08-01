/**
 * Pairadise Resort — WhatsApp Chat Widget
 * ============================================================
 * Floating button (bottom-right, fixed while scrolling) that
 * opens a small chat-style panel. Picking a suggested question,
 * or typing your own and pressing send, opens a real WhatsApp
 * conversation (via wa.me) pre-filled with that message.
 *
 * This does NOT run an actual chat inside the page, WhatsApp
 * doesn't offer that without their paid Business API. It hands
 * off to real WhatsApp (app or web) once a message is sent.
 *
 * REPLACE: WHATSAPP_NUMBER below if the number ever changes.
 * REPLACE: PROMPTS below to change the suggested questions.
 * ============================================================ */
(function () {
  var WHATSAPP_NUMBER = '66838755379'; // no + or leading zeros
  var GREETING = "Hi! 👋 How can we help with your stay at Pairadise?";
  var PROMPTS = [
    "I'd like to check availability for my dates",
    "What's included in the room rate?",
    "How do I get to Pairadise from Pai town?",
    "I'm interested in booking a retreat or event"
  ];

  function waLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function sendMessage(message) {
    if (!message || !message.trim()) return;
    window.open(waLink(message.trim()), '_blank', 'noopener');
  }

  function buildWidget() {
    var wrap = document.createElement('div');
    wrap.className = 'wa-widget';

    var promptsHtml = PROMPTS.map(function (p) {
      return '<button type="button" class="wa-widget-prompt">' + p + '</button>';
    }).join('');

    wrap.innerHTML =
      '<button type="button" class="wa-widget-button" aria-label="Chat with us on WhatsApp" aria-expanded="false">' +
        waIconSvg('#fff') +
      '</button>' +
      '<div class="wa-widget-panel" role="dialog" aria-label="WhatsApp chat">' +
        '<div class="wa-widget-header">' +
          '<img class="wa-widget-avatar" src="assets/pairadise-logo.png" alt="" />' +
          '<div>' +
            '<div class="wa-widget-title">Pairadise Resort</div>' +
            '<div class="wa-widget-status">Usually replies within a few hours</div>' +
          '</div>' +
          '<button type="button" class="wa-widget-close" aria-label="Close chat">&times;</button>' +
        '</div>' +
        '<div class="wa-widget-body">' +
          '<div class="wa-widget-bubble">' + GREETING + '</div>' +
          '<div class="wa-widget-prompts">' + promptsHtml + '</div>' +
        '</div>' +
        '<div class="wa-widget-footer">' +
          '<input type="text" class="wa-widget-input" placeholder="Type a message..." aria-label="Message" />' +
          '<button type="button" class="wa-widget-send" aria-label="Send on WhatsApp">' + sendIconSvg() + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(wrap);
    return wrap;
  }

  function waIconSvg(color) {
    return '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M16.03 3C9.06 3 3.4 8.66 3.4 15.63c0 2.24.59 4.42 1.7 6.34L3 29l7.2-1.89a12.6 12.6 0 0 0 5.82 1.48h.01c6.97 0 12.63-5.66 12.63-12.63C28.66 8.99 23.02 3 16.03 3Zm0 22.9h-.01a10.5 10.5 0 0 1-5.34-1.46l-.38-.23-4.27 1.12 1.14-4.17-.25-.43a10.3 10.3 0 0 1-1.58-5.5c0-5.72 4.66-10.38 10.4-10.38 2.78 0 5.39 1.08 7.35 3.05a10.32 10.32 0 0 1 3.04 7.35c0 5.73-4.66 10.4-10.1 10.65Zm5.7-7.78c-.31-.16-1.85-.91-2.14-1.01-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-1 1.22-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.56-1.85-1.74-2.16-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.02-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" fill="' + color + '"/>' +
    '</svg>';
  }

  function sendIconSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M3 11.5 21 3l-6.5 18-3.5-7.5L3 11.5Z" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>' +
    '</svg>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var wrap = buildWidget();
    var button = wrap.querySelector('.wa-widget-button');
    var panel = wrap.querySelector('.wa-widget-panel');
    var closeBtn = wrap.querySelector('.wa-widget-close');
    var input = wrap.querySelector('.wa-widget-input');
    var sendBtn = wrap.querySelector('.wa-widget-send');
    var prompts = wrap.querySelectorAll('.wa-widget-prompt');

    function openPanel() {
      panel.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
    function closePanel() {
      panel.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }
    function togglePanel() {
      if (panel.classList.contains('is-open')) closePanel();
      else openPanel();
    }

    button.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', closePanel);

    prompts.forEach(function (btn) {
      btn.addEventListener('click', function () {
        sendMessage(btn.textContent);
      });
    });

    sendBtn.addEventListener('click', function () {
      sendMessage(input.value);
      input.value = '';
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        sendMessage(input.value);
        input.value = '';
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closePanel();
    });
  });
})();
