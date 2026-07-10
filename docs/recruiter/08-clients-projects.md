# 8. Clients, projects & sites

This is the commercial side of the dashboard: the companies you supply, the projects they run, and which workers are placed where. The hierarchy is always **client → project (sometimes under a framework) → placements**.

## 8.1 The clients list

**Projects** in the sidebar opens your client roster. Each client row shows the essentials — name, active projects, placements. Click through to the **client detail page**: header with the client's information, then tabs/chips for **Placements · Contacts · Projects · Compliance · Notes**, plus time-range filters to focus recent activity.

<div class="screenshot-placeholder">SCREENSHOT ch08-client-detail.png — Hartwell Construction Ltd detail page; callouts: ① category chips ② Add project ③ contacts</div>

## 8.2 Adding a client, contacts and notes

**Add client** takes the company's core details. Once created:

- **Contacts** — add the people you deal with (name, role, phone, email). Keep roles current; "who do I call at Hartwell about Riverside Yard?" should always be answerable from here.
- **Notes** — timestamped free-text attached to the client: call summaries, agreements in principle, quirks ("gate closes 4pm sharp"). Notes are visible to the whole team — write them as if a colleague will rely on them, because they will.

!!! warning "Deleting a client is effectively permanent"
    Treat client deletion as one-way — there is no self-service undo. Before deleting anything with history, be certain; if a client is merely dormant, leave the record and note it, don't delete it.

## 8.3 Projects and frameworks

From a client's page, **Add project** creates a piece of work: name, site location, dates, requirements. Two shapes exist:

=== "Standalone project"

    The simple case — a project with its own commercial terms, entered directly.

=== "Project under a framework"

    Clients with an umbrella agreement have a **framework** holding pre-agreed terms (day rates and the like). Create the framework once; every project created under it **inherits those rates automatically** — no re-typing, no drift between what was agreed and what a project shows. If a rate looks wrong on a framework project, fix the framework, not the project.

## 8.4 Placing workers

A **placement** connects a worker to a project. Start from either end: the project's Add placement flow (pick the worker), or the worker's profile/table row (**Assign**, pick the project). Before placing, the shortlist you want is [Chapter 4's](04-workers.md) classic filter: right trade + **Site Ready or above** + **compliant** + unassigned.

Placements record their dates — which is what powers a worker's real site history (the experience chips in the Rich view are built from placements, not from claims).

## 8.5 Viewing a site

A project's **site view** is the deployment picture for one location: who's placed there now, their compliance state at a glance, and anything demanding attention about that crew. Before a client visit or a site audit, this page is your two-minute prep — a green board is your talking point, an amber one is your homework.

## 8.6 Compliance at client level

The client detail's **Compliance** chip aggregates across the client's projects — the "is everything clean across everything we do for Hartwell?" view. For the formal document version, generate a client-scope compliance report ([Chapter 9](09-compliance-reporting.md)).

## Troubleshooting this chapter

| You see | It means | Do this |
|---|---|---|
| A worker can't be placed | They may already be on an overlapping placement, or fail the project's requirements | Check their profile's current assignment and compliance summary |
| A framework project shows odd rates | The framework's terms changed after creation, or the project was created standalone by mistake | Check the framework's terms first; recreate the project under the framework if it was standalone |
| A client you "deleted" still appears via an old link | Historic records remain reachable by direct link | Don't reuse the record; flag it to your admin for proper cleanup |

<div class="page-feedback" markdown>Was this page helpful? [Tell us what was missing](mailto:support@tagconstructionltd.co.uk?subject=Help%20centre%20feedback%3A%20Clients%20and%20projects).</div>
