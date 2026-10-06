/* =========================================================
   +nächstenliebe – Seitenlogik
   - Abschnitte als "Tabs" über den URL-Anker (#budget, #kontakt …)
   - Menü auf kleinen Bildschirmen
   - Schriftgröße umschalten
   - Kontaktformular über Formspree
   Ohne JavaScript werden einfach alle Abschnitte untereinander angezeigt.
   ========================================================= */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  initSections();
  initMenu();
  initTextSize();
  initContactForm();
  document.getElementById('jahr').textContent = new Date().getFullYear();
});

/* ---------- Abschnitte / Navigation ---------- */
function initSections() {
  const panels = Array.from(document.querySelectorAll('.panel'));
  const navLinks = Array.from(document.querySelectorAll('.nav-list a'));
  const ids = panels.map((p) => p.id);

  function show(id, moveFocus) {
    if (!ids.includes(id)) id = ids[0];

    panels.forEach((panel) => { panel.hidden = panel.id !== id; });
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    const heading = document.querySelector('#' + id + ' h1');
    document.title = (heading ? heading.textContent.trim() + ' – ' : '') + '+nächstenliebe';

    if (moveFocus) {
      window.scrollTo(0, 0);
      // Fokus auf die Überschrift, damit Screenreader den Wechsel ansagen
      if (heading) heading.focus({ preventScroll: true });
    }
  }

  window.addEventListener('hashchange', () => {
    show(location.hash.slice(1), true);
    closeMenu();
  });

  // Skip-Link: Fokus auf die Überschrift des aktiven Abschnitts
  document.querySelector('.skip-link').addEventListener('click', (e) => {
    e.preventDefault();
    const active = panels.find((p) => !p.hidden);
    const heading = active && active.querySelector('h1');
    if (heading) heading.focus();
  });

  show(location.hash.slice(1), false);
}

/* ---------- Menü (mobil) ---------- */
function closeMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('hauptnavigation');
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}

function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('hauptnavigation');

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (open) nav.querySelector('a').focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

/* ---------- Schriftgröße ---------- */
function initTextSize() {
  const btn = document.getElementById('textsize-toggle');
  const KEY = 'textsize-large';

  function apply(large) {
    document.documentElement.classList.toggle('text-large', large);
    btn.setAttribute('aria-pressed', String(large));
  }

  let saved = false;
  try { saved = localStorage.getItem(KEY) === '1'; } catch (e) { /* Speicher nicht verfügbar */ }
  apply(saved);

  btn.addEventListener('click', () => {
    const large = btn.getAttribute('aria-pressed') !== 'true';
    apply(large);
    try { localStorage.setItem(KEY, large ? '1' : '0'); } catch (e) { /* egal */ }
  });
}

/* ---------- Kontaktformular ---------- */
function initContactForm() {
  const form = document.getElementById('kontaktformular');
  const status = document.getElementById('form-status');
  const submit = form.querySelector('button[type="submit"]');

  function setStatus(text, type) {
    status.textContent = text;
    status.className = 'form-status' + (type ? ' is-' + type : '');
  }

  function validate() {
    let firstInvalid = null;
    form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
      const ok = field.value.trim() !== '' && field.checkValidity();
      field.setAttribute('aria-invalid', String(!ok));
      document.getElementById(field.getAttribute('aria-describedby')).hidden = ok;
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('');
    if (!validate()) return;

    if (form.action.includes('DEINE_FORM_ID')) {
      setStatus('Das Formular ist noch nicht eingerichtet (Formspree-ID fehlt). Bitte nutzen Sie vorerst den „Schreib mir"-Button.', 'error');
      return;
    }

    submit.disabled = true;
    setStatus('Nachricht wird gesendet …');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      setStatus('Vielen Dank! Ihre Nachricht ist angekommen. Wir melden uns so bald wie möglich.', 'success');
    } catch (err) {
      setStatus('Leider hat das Senden nicht geklappt. Bitte versuchen Sie es später noch einmal oder nutzen Sie den „Schreib mir"-Button.', 'error');
    } finally {
      submit.disabled = false;
    }
  });
}
