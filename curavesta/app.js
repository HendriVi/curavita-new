import { siteConfig } from './site-config.js';
import { careLabels, timingLabels, validateRegion, validateContact, buildSummary, buildMailto, getLaunchIssues } from './enquiry.js';

document.documentElement.classList.remove('no-js');

const form = document.querySelector('#enquiry-form');
const next = document.querySelector('#form-next');
const error = document.querySelector('#form-error');
const region = document.querySelector('#region');
const menu = document.querySelector('#hauptnavigation');
const menuToggle = document.querySelector('.menu-toggle');
const dialogs = [...document.querySelectorAll('dialog')];
const canContact = getLaunchIssues(siteConfig).length === 0;
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
function renderSummary() {
  const answers = readAnswers();
  summary = buildSummary(answers);
  document.querySelector('#summary-contact').textContent = answers.name + '\n' + answers.email + (answers.phone ? '\n' + answers.phone : '');
  document.querySelector('#summary-message').textContent = answers.message;
  form.querySelector('[data-step="2"]').hidden = false;
  document.querySelector('#summary-care').textContent = careLabels[answers.care];
  document.querySelector('#summary-region').textContent = answers.region;
  document.querySelector('#summary-timing').textContent = timingLabels[answers.timing];
  document.querySelector('#email-ready').hidden = !canContact;
  document.querySelector('#preview-note').hidden = canContact;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#copy-fallback').hidden = true;
  if (canContact) document.querySelector('#email-enquiry').href = buildMailto(siteConfig.email, summary);
}

function readAnswers() {
  return {
    care: selected('care'), region: region.value.trim(), timing: selected('timing'),
    name: document.querySelector('#contact-name').value.trim(),
    email: document.querySelector('#contact-email').value.trim(),
    phone: document.querySelector('#contact-phone').value.trim(),
    message: document.querySelector('#contact-message').value.trim(),
  };
}
form.addEventListener('submit', event => {
  event.preventDefault();
  clearError();
  if (!form.reportValidity()) return;
  if (!validateRegion(region.value)) {
    error.textContent = 'Bitte geben Sie einen Ort oder eine vierstellige Schweizer Postleitzahl ein.';
    region.setAttribute('aria-invalid', 'true');
    region.focus();
    return;
  }
  const contactError = validateContact(readAnswers());
  if (contactError) { error.textContent = contactError; return; }
  renderSummary();
  const heading = form.querySelector('[data-step="2"] legend');
  heading.focus({ preventScroll: true });
  heading.scrollIntoView({ block: 'center', behavior: 'auto' });
});
// Enable submission only after its preventDefault handler exists. Without JS,
// method="dialog" and a disabled button prevent leaking form data into a URL.
next.type = 'submit';
next.disabled = false;
document.querySelector('#form-unavailable').hidden = true;
function invalidateSummary() {
  clearError();
  summary = '';
  form.querySelector('[data-step="2"]').hidden = true;
  document.querySelector('#email-enquiry').removeAttribute('href');
}
form.addEventListener('input', invalidateSummary);
form.addEventListener('change', () => {
  invalidateSummary();
  document.querySelector('#urgency-note').hidden = selected('timing') !== 'soon';
});
document.querySelectorAll('[data-care]').forEach(link => {
  link.addEventListener('click', () => {
    const input = form.querySelector('input[name="care"][value="' + link.dataset.care + '"]');
    if (input) input.checked = true;
    invalidateSummary();
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
