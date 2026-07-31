/**
 * Pairadise Resort — Cookie Consent Banner
 * ============================================================
 * Self-contained: creates its own DOM and reads styling from
 * styles.css (.cookie-banner and related classes).
 *
 * Storage: localStorage key "pairadise_cookie_consent", one of:
 *   "all"        — accepted everything
 *   "necessary"  — essential/functional cookies only
 * (No value yet = banner has not been answered.)
 *
 * HOW TO GATE A FUTURE SCRIPT (e.g. Google Analytics, Meta Pixel):
 *   if (window.PairadiseCookieConsent.hasFullConsent()) {
 *     // load your analytics/marketing script here
 *   }
 *   window.addEventListener('pairadiseCookieConsent', function (e) {
 *     if (e.detail.consent === 'all') {
 *       // load your analytics/marketing script here too,
 *       // in case the person accepts *after* the page has loaded
 *     }
 *   });
 * ============================================================
 */
(function () {
  var STORAGE_KEY = 'pairadise_cookie_consent';

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // localStorage unavailable (private mode, etc.)
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      localStorage.setItem(STORAGE_KEY + '_at', new Date().toISOString());
    } catch (e) {
      /* ignore write failures, banner will just reappear next visit */
    }
    window.dispatchEvent(new CustomEvent('pairadiseCookieConsent', { detail: { consent: value } }));
  }

  function hasFullConsent() {
    return getConsent() === 'all';
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie preferences');

    banner.innerHTML =
      '<p class="cookie-banner-text">' +
        'We use a small number of cookies to run this site and to show the embedded video on our homepage. ' +
        'We don\'t currently use analytics or advertising cookies. ' +
        'See our <a href="privacy-policy.html">Privacy &amp; Cookie Policy</a> for details.' +
      '</p>' +
      '<div class="cookie-banner-actions">' +
        '<button type="button" class="cookie-accept-all">Accept All</button>' +
        '<button type="button" class="cookie-necessary-only">Necessary Only</button>' +
      '</div>';

    document.body.appendChild(banner);

    banner.querySelector('.cookie-accept-all').addEventListener('click', function () {
      setConsent('all');
      hideBanner(banner);
    });
    banner.querySelector('.cookie-necessary-only').addEventListener('click', function () {
      setConsent('necessary');
      hideBanner(banner);
    });

    return banner;
  }

  function showBanner(banner) {
    // slight delay so the transform transition actually animates in
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        banner.classList.add('is-visible');
      });
    });
  }

  function hideBanner(banner) {
    banner.classList.remove('is-visible');
    window.setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 400);
  }

  function openPreferences() {
    var existing = document.querySelector('.cookie-banner');
    if (existing) { showBanner(existing); return; }
    var banner = buildBanner();
    showBanner(banner);
  }

  // Public API, e.g. for a "Cookie Settings" link in the footer:
  // <button onclick="PairadiseCookieConsent.open()">Cookie Settings</button>
  window.PairadiseCookieConsent = {
    get: getConsent,
    hasFullConsent: hasFullConsent,
    open: openPreferences
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (!getConsent()) {
      showBanner(buildBanner());
    }
  });
})();
