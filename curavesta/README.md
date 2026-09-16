# Curavesta

A standalone Swiss care-finding company website, separate from BetterHealth.

## Run

Requires Node.js 20 or newer. No install and no third-party runtime dependencies.

```sh
cd curavesta
npm run dev
```

Open http://localhost:4173. Set `CURAVESTA_PORT` to change the port.

```sh
npm run check
npm run build
```

The preview build goes to `curavesta/dist/`. All asset paths are relative, so it can run at a domain root or a GitHub Pages project subpath. Guide links use hashes and support refresh and browser history. `npm run preview:file` creates a self-contained `dist/curavesta-preview.html` with all assets embedded; open it in a modern browser without installing anything.

## Repository isolation

During this work, the repository briefly contained a BetterHealth deployment at commit `a3987f7`. The remote main branch was subsequently restored to its original care-finding state at `7e54904`. This redesign is based on that restored state and remains on a review branch. No live branch or deployment was changed by this work.

The new source lives inside `curavesta/`. The root package scripts now build this site instead of the old React demo, whose files are retained for reference. The existing GitHub Pages workflow is unchanged. Root `npm run build` requires the verified production configuration and prepares root `dist/` for that workflow. Root `npm run build:preview` prepares an explicitly noindex preview build for testing.

Do not merge and publish before completing the launch checks below. This is the separate Curavesta business; it contains no BetterHealth content or clinical positioning.

## Before launch

Edit `site-config.js` with verified **public business information**:

- Contact email and optional phone.
- Actual legal operator, address and postcode/city.
- Final website URL.
- Confirm the offered service, free initial consultation, fees for any subsequent work, actual geographical scope and any provider remuneration/conflicts.
- Review and complete the privacy text for the actual operator, hosting provider and handling of received enquiries. This is a technical draft, not legal sign-off.
- Set the two review flags only after those checks are complete.

Then run `npm run build:production`. The production command fails closed while information or review is missing. It removes the preview's noindex tag and adds the confirmed canonical URL only when the checks pass. Deploy the contents of this site's `dist/`, not the repository root.

The claim of a free first conversation is carried over in narrower form from the original site's free-service positioning. The actual commercial terms still need confirmation; no claim of independence or full-market coverage is made.

## Enquiry behaviour

The visible enquiry form asks for care category, region, timing, name and email, with optional phone and message. It prepares a summary; it does not make clinical recommendations or claim availability. All input fields remain visible without JavaScript. Preparing the summary requires JavaScript; if scripts are blocked, a visible hint explains how to open the preview in a browser.

- No backend, API key, analytics, cookies or persistent browser storage.
- Contact details remain in browser memory until the visitor chooses to copy, download or email their summary. No uploads are offered, and the form asks visitors not to include diagnoses.
- With verified configuration, the last step opens an encoded `mailto:` draft. The visitor must send it from their own email program.
- Without launch-ready configuration, the last step explicitly says it is a preview and no enquiry was sent.
- Copy and text-download actions work without a contact destination. Clipboard denial has a manual-copy fallback.
- The printable visit checklist is an on-page document, with print-specific styling.

For a later server-backed contact form, choose an approved destination and establish delivery/error handling, data processing and retention first. Do not replace the current explicit delivery state with a simulated success message.

## Design and content

The site retains the repository's existing illustration and Curavesta name. It replaces the marketplace/demo presentation with a focused service: understand the situation, compare options, prepare the next step.

Terracotta, warm paper and sage retain the approachable character, while large serif headings, restrained components and a simpler page hierarchy improve readability. The copy uses Swiss German spelling and respects the older person's wishes and autonomy.

The main page covers the offer, process, company approach, guides, FAQ and enquiry. Guides and legal information are accessible in native dialogs; without JavaScript they remain reachable as linked sections. The form and menu use labelled controls and visible keyboard focus, and reduced motion is respected.

## Research basis

Observed acquisition **patterns**, not verified conversion performance:

- [Seniorenheim Plus](https://www.seniorenheimplus.ch/): prominent guidance, a clear starting point, attention to region and personal needs.
- [Pflegehilfe Schweiz](https://www.pflegehilfe.ch/): family relief, familiar living arrangements and a short staged enquiry.

These observations informed the structure, not copied wording, ratings, customer counts, credentials or service guarantees. No conversion analytics or customer acquisition data was available.

Practical guide references:

- [Pro Senectute: choosing a home](https://www.prosenectute.ch/de/ratgeber/wohnen/umzug-seniorenwohnheim.html).
- [Helsana: care homes and financing](https://www.helsana.ch/de/blog/familie/alter/eintritt-ins-pflegeheim.html).
- [Pro Senectute: advice](https://www.prosenectute.ch/de.html).

Research reviewed September 2026. Cost content is general and contains no invented quote, entitlement or Swiss-wide fixed tariff.

## Verification

`npm test` covers region validation, all care/timing combinations, encoded email drafts, missing contacts, production readiness, assets, links, IDs, source-level accessibility checks, absence of tracking/persistence and independent preview builds.

Browser-rendered desktop/mobile review remains a launch check: the available cloud browser could not access the local development server (`ERR_BLOCKED_BY_CLIENT`). Do not describe these source-level and unit checks as completed visual or cross-browser testing.
