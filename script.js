/* ============================================================
   Pairadise Resort: homepage interactions (vanilla JS)
   - Mobile menu toggle
   - FAQ accordion
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  if (toggle && nav) {
    // Add a "Book Now" CTA inside the mobile menu (header CTA is hidden on small screens).
    // REPLACE: booking link → Lodgify
    var navList = nav.querySelector('.nav-list');
    var ctaItem = document.createElement('li');
    ctaItem.innerHTML = '<a class="btn btn-primary nav-cta" href="https://pairadise.lodgify.com" target="_blank" rel="noopener noreferrer">Book Now</a>';
    navList.appendChild(ctaItem);

    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close the menu after tapping any in-page link
    navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- FAQ accordion ---------- */
  var questions = document.querySelectorAll('.faq-question');

  Array.prototype.forEach.call(questions, function (q) {
    var answer = q.nextElementSibling;

    q.addEventListener('click', function () {
      var isOpen = q.getAttribute('aria-expanded') === 'true';

      // Close any other open item (single-open accordion)
      Array.prototype.forEach.call(questions, function (other) {
        if (other !== q && other.getAttribute('aria-expanded') === 'true') {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle this one
      q.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });
})();
