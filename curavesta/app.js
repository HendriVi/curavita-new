import { siteConfig } from './site-config.js';
import { careLabels, timingLabels, validateRegion, buildSummary, buildMailto, getLaunchIssues } from './enquiry.js';

document.documentElement.classList.remove('no-js');

const form = document.querySelector('#enquiry-form');
const fieldsets = [...form.querySelectorAll('[data-step]')];
const next = document.querySelector('#form-next');
const back = document.querySelector('#form-back');
const error = document.querySelector('#form-error');
const region = document.querySelector('#region');
const menu = document.querySelector('#hauptnavigation');
const menuToggle = document.querySelector('.menu-toggle');
const dialogs = [...document.querySelectorAll('dialog')];
const canContact = getLaunchIssues(siteConfig).length === 0;
let step = 0;
let summary = '';
let returnHash = '#start';
let activeDialog = null;

document.querySelector('#year').textContent = String(new Date().getFullYear());

function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
  menuToggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});

function selected(name) {
  return form.querySelector('input[name="' + name + '"]:checked')?.value || '';
}
function clearError() {
  error.textContent = '';
  region.removeAttribute('aria-invalid');
}
function showStep(index, focus = true) {
  step = index;
  clearError();
  fieldsets.forEach((fieldset, i) => { fieldset.hidden = i !== step; });
  document.querySelector('#step-label').textContent = 'Schritt ' + (step + 1) + ' von 3';
  document.querySelectorAll('.form-progress span').forEach((bar, i) => bar.classList.toggle('is-active', i <= step));
  next.hidden = step === 2;
  back.hidden = step === 0;
  if (focus) fieldsets[step].querySelector('legend').focus({ preventScroll: true });
}
function renderSummary() {
  const answers = { care: selected('care'), region: region.value.trim(), timing: selected('timing') };
  summary = buildSummary(answers);
  document.querySelector('#summary-care').textContent = careLabels[answers.care];
  document.querySelector('#summary-region').textContent = answers.region;
  document.querySelector('#summary-timing').textContent = timingLabels[answers.timing];
  document.querySelector('#email-ready').hidden = !canContact;
  document.querySelector('#preview-note').hidden = canContact;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#copy-fallback').hidden = true;
  if (canContact) document.querySelector('#email-enquiry').href = buildMailto(siteConfig.email, summary);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  clearError();
  if (step === 0) {
    if (!selected('care')) {
      error.textContent = 'Bitte wählen Sie ein Anliegen. Sie können sich auch zuerst orientieren.';
      form.querySelector('input[name="care"]').focus({ preventScroll: true });
      return;
    }
    showStep(1);
  } else if (step === 1) {
    if (!validateRegion(region.value)) {
      error.textContent = 'Bitte geben Sie einen Ort oder eine vierstellige Schweizer Postleitzahl ein.';
      region.setAttribute('aria-invalid', 'true');
      region.focus({ preventScroll: true });
      return;
    }
    if (!selected('timing')) {
      error.textContent = 'Bitte wählen Sie einen Zeitraum.';
      form.querySelector('input[name="timing"]').focus({ preventScroll: true });
      return;
    }
    renderSummary();
    showStep(2);
  }
});
back.addEventListener('click', () => showStep(Math.max(0, step - 1)));
form.addEventListener('input', clearError);
form.addEventListener('change', () => {
  clearError();
  document.querySelector('#urgency-note').hidden = selected('timing') !== 'soon';
});
document.querySelectorAll('[data-care]').forEach(link => {
  link.addEventListener('click', () => {
    const input = form.querySelector('input[name="care"][value="' + link.dataset.care + '"]');
    if (input) input.checked = true;
    showStep(0, false);
  });
});
document.querySelector('#copy-summary').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(summary);
    status.textContent = 'Übersicht kopiert. Es wurde keine Anfrage versendet.';
  } catch {
    const fallback = document.querySelector('#copy-fallback');
    fallback.value = summary;
    fallback.hidden = false;
    fallback.focus();
    fallback.select();
    status.textContent = 'Automatisches Kopieren ist hier nicht verfügbar. Sie können den markierten Text manuell kopieren.';
  }
});
document.querySelector('#download-summary').addEventListener('click', () => {
  const blob = new Blob(['\uFEFF' + summary], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'curavesta-meine-pflegesuche.txt';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#copy-status').textContent = 'Download gestartet. Es wurde keine Anfrage versendet.';
});

// Native dialogs retain keyboard trapping and focus restoration. Hashes support
// direct guide links, refresh, back/forward navigation, and the no-JS version.
function syncHash() {
  let hash;
  try { hash = decodeURIComponent(location.hash); } catch { return; }
  const targetDialog = dialogs.find(dialog => '#' + dialog.id === hash);
  if (activeDialog && activeDialog !== targetDialog) {
    activeDialog.close();
    activeDialog = null;
  }
  if (targetDialog && !targetDialog.open) {
    if (returnHash === '#start' && !['impressum', 'datenschutz'].includes(targetDialog.id)) returnHash = '#ratgeber';
    targetDialog.showModal();
    activeDialog = targetDialog;
  } else if (!targetDialog) {
    returnHash = hash || '#start';
  }
}
function closeArticle() {
  if (!activeDialog) return;
  const previous = activeDialog;
  activeDialog = null;
  previous.close();
  history.replaceState(null, '', returnHash);
}
dialogs.forEach(dialog => {
  dialog.querySelector('[data-close]').addEventListener('click', closeArticle);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeArticle(); });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeArticle();
  });
});
window.addEventListener('hashchange', syncHash);
// Reopening an already-current guide hash should work after close/return.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    if (link.hash === location.hash) syncHash();
  });
});
syncHash();
document.querySelector('#print-checklist').addEventListener('click', () => window.print());

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    document.querySelector('.mobile-cta').classList.toggle('is-hidden', entries[0].isIntersecting);
  }, { threshold: 0 });
  observer.observe(document.querySelector('#erstgespraech'));
}

if (canContact) {
  const directEmail = document.querySelector('#direct-email');
  directEmail.href = 'mailto:' + siteConfig.email;
  directEmail.textContent = siteConfig.email;
  directEmail.hidden = false;
  document.querySelector('#direct-contact').hidden = false;
  if (siteConfig.phone && /^\+?[\d\s()/-]+$/.test(siteConfig.phone)) {
    const phone = document.querySelector('#direct-phone');
    phone.href = 'tel:' + siteConfig.phone.replace(/[^\d+]/g, '');
    phone.textContent = siteConfig.phone;
    phone.hidden = false;
  }
  const operator = document.querySelector('#legal-details');
  [siteConfig.legalName, siteConfig.address, siteConfig.postalCodeAndCity, siteConfig.country, siteConfig.email].forEach(text => {
    const line = document.createElement('p');
    line.textContent = text;
    operator.append(line);
  });
  document.querySelector('#legal-pending').hidden = true;
  document.querySelector('#privacy-pending').hidden = true;
}
