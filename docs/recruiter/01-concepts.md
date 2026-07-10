# 1. Welcome & key concepts

This chapter is the vocabulary for everything else. Five minutes here saves confusion in every later chapter — the rest of the manual assumes these terms.

## 1.1 What TAG is: two sides, one system

TAG runs on two connected surfaces:

- **TAG Connect** — the mobile app in a worker's pocket. Workers use it to upload their qualification cards and identity documents, record work experience and skills, and message you.
- **The Recruiter Dashboard** — where you work. Everything a worker does in the app appears here; every decision you make here appears back on their phone.

Nothing on either side is a copy — it's one system viewed from two angles. When you verify a card, the worker's phone updates within moments; when a worker uploads a document, your queue counts up.

## 1.2 What "verified" means — the most important word in the platform

A document a worker uploads starts as just a photo. It earns nothing and proves nothing until a recruiter **verifies** it: the system reads the card's details, a recruiter checks that reading against the image and judges the card genuine and current, and approves it. Only then does the platform treat the credential as real.

This is deliberate: everything downstream — tiers, compliance statuses, reports, what clients see — is built **only on verified documents**. An unverified upload changes nothing anywhere. That's what lets you stand behind the data when a client or regulator asks.

The full verification workflow is [Chapter 6](06-verification.md).

## 1.3 The five quality tiers

Every worker carries a **profile quality tier** — a single at-a-glance signal of how complete and verified their profile is:

| Tier | What it tells you |
|---|---|
| **New Hand** | Fresh profile — documents submitted but nothing verified yet, or a profile that has lost its credentials. |
| **Site Starter** | First core document verified — a recruiter has confirmed something real. |
| **Site Ready** | Both core verifications done (identity + CSCS). Shortlist-ready; the default filter threshold. |
| **Site Strong** | The full package, all verified: identity, valid CSCS, two further cards, and work experience. |
| **Site Pro** | Reserved for a later phase (adds verified references). Not achievable yet. |

Two rules to internalise: **tiers are earned by verification, not by uploading** — a worker can't self-promote by adding photos; and **tiers move both ways** — an expired CSCS or deleted document drops a worker automatically. One consequence worth knowing: a worker without a valid CSCS can never show Site Strong, however complete the rest of their profile.

**You see more than the worker sees:** recruiters see the tier *and* the 0–100 score behind it (with a full breakdown — [Chapter 5](05-profiles-tiers.md)); workers see only their tier. Never quote a numeric score to a worker — it's not part of their experience.

## 1.4 Compliance statuses

Separate from tiers, each worker carries a **compliance status** against their requirements: whether the right documents exist, are verified, and are in date. The colour language is consistent everywhere:

| Colour | Meaning |
|---|---|
| **Green** | Compliant — required documents verified and in date |
| **Amber** | Attention — something expires soon (typically within 30 days) |
| **Red** | Action required — a required document is expired, missing, or rejected |

Rows tinted red or amber in the workers table are this status talking. Details in [Chapter 9](09-compliance-reporting.md).

## 1.5 Right to Work & share codes

Every worker confirms their **Right to Work** in the UK during app setup. UK and Irish citizens confirm directly (their passport is the evidence). Everyone else provides a **share code** — a code issued by the government's online service that lets an employer check their work status. Codes expire, so a worker may occasionally need to fetch a fresh one. You'll meet this in worker profiles and occasionally in chat threads.

## 1.6 Clients → projects → sites

The commercial hierarchy: a **client** (e.g. Hartwell Construction Ltd) has **projects** (e.g. Riverside Yard, Manchester), and workers are **placed** onto projects. Some clients operate **frameworks** — umbrella agreements with pre-agreed rates that projects hang under. [Chapter 8](08-clients-projects.md) covers managing all of it.

## 1.7 The audit trail — the platform's memory

Every action that matters — uploads, verifications, edits, deletions, tier changes — is recorded permanently: what happened, when, who did it, and why. Entries can never be edited or deleted, by anyone. This is the compliance backbone: when someone asks "how did you know this worker was certified on that date?", the audit trail is the answer. [Chapter 10](10-audit-trail.md).

## 1.8 Who can do what

Most of the dashboard is the same for everyone, but some abilities are role-gated — **admins** additionally manage the team and can investigate recruiter activity in the audit trail. Where a feature is admin-only, this manual marks it. The full permissions matrix is in the [Appendices](15-appendices.md).

<div class="page-feedback" markdown>Was this page helpful? [Tell us what was missing](mailto:support@tagconstructionltd.co.uk?subject=Help%20centre%20feedback%3A%20Key%20concepts).</div>
