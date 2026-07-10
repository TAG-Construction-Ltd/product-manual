# 9. Compliance & reporting

Compliance is the question the whole platform exists to answer: **can this worker legitimately be on that site, and can we prove it?** This chapter covers how the platform tracks the first half continuously — and produces the proof on demand.

## 9.1 How compliance status is decided

Each worker is assessed against their **requirements** — the documents someone in their position must hold (identity and Right to Work, a valid CSCS, plus whatever their trade and placement demand). For every requirement the platform checks three things, continuously:

1. Does a matching document **exist**?
2. Is it **verified** (a recruiter approved it — uploads alone never count)?
3. Is it **in date**?

All requirements pass → **green (compliant)**. Something expires soon → **amber (attention)**. A requirement fails any of the three checks → **red (action required)**. That status follows the worker everywhere — table row tinting, profile pill, site views, reports.

## 9.2 Expiry never surprises you — if you watch the ambers

Every dated document is checked **nightly**. The lifecycle of an expiry:

| ~30 days out | Expiry day | After |
|---|---|---|
| Worker turns **amber**; appears in expiring filters and the attention block; the worker gets prompted in their app to renew | Turns **red** automatically overnight; tier drops if the card was load-bearing (an expired CSCS always drops them out of Site Strong) | Stays red until a renewal is uploaded **and verified** |

The operational habit that makes expiry a non-event: work the amber list weekly. A worker chased at day −25 renews calmly; a worker discovered at day +1 is off a site.

## 9.3 The compliance summary on a profile

Each worker's profile carries the requirement-by-requirement table: the requirement, its status, **which document satisfies it**, and that document's expiry. When a worker is red, this table names the exact failing requirement — never guess from the pill alone.

## 9.4 Generating compliance reports

**Compliance report** (from the audit trail page's report button, or a profile) produces the formal document for four scopes:

| Scope | Use it for |
|---|---|
| **Worker** | One person's full evidence pack — client onboarding, a dispute, an audit of an individual |
| **Project** | The crew of one site — pre-audit prep, client assurance for that job |
| **Client** | Everything across one client's projects — account reviews |
| **Whole workforce** | The full estate — internal governance, board reporting |

Pick the scope and time range, generate, review on screen, then export. Two honest rules for using them: **check the generated date range matches what you intend** before sending anything externally, and remember a report is a snapshot — regenerate rather than reuse last month's file.

<div class="screenshot-placeholder">SCREENSHOT ch09-report-modal.png — the report modal; callouts: ① scope picker ② range ③ generate</div>

## 9.5 Exports and handling

Reports and table exports contain personal data. The handling rules: share externally only what the recipient is entitled to (a client gets their project's report, not the whole workforce); prefer sending through agreed channels; delete stale local copies. Inside the platform, data is protected and access-logged — a file on a laptop is neither.

## Troubleshooting this chapter

| You see | It means | Do this |
|---|---|---|
| Worker shows red but "has the card" | The renewal isn't uploaded, or is uploaded but **not verified** | Profile → compliance summary → check the evidence document's status; verify or request re-upload |
| Amber that never clears | Renewal verified but the old document still drives the requirement | Open the requirement's evidence — confirm the new card is verified and in date |
| A client report looks thinner than expected | Client-level history depends on what's been recorded against that client | Cross-check the project-scope reports; flag gaps to your admin |

<div class="page-feedback" markdown>Was this page helpful? [Tell us what was missing](mailto:support@tagconstructionltd.co.uk?subject=Help%20centre%20feedback%3A%20Compliance%20and%20reporting).</div>
