# Product flow maps

The complete decision logic of the recruiter dashboard, drawn: one master map plus six detailed flows, nested down to individual judgment calls. Rectangles are actions, diamonds are decisions, edge labels are the answers. Each flow summarises a chapter of this manual — use these as the visual index, and the chapters for the words. Each flow is also embedded in its home chapter, right where you need it.

!!! note "One global rule, drawn nowhere"
    Every human action in these flows writes a permanent audit entry — who, when, what. Repeating that on every node would double the diagrams, so it's stated once here and holds everywhere.

## 1 · Master map — how the whole dashboard hangs together

The top-level journey: sign in, triage from Home, branch into one of the five working areas. Each grey subflow node expands in its own numbered diagram below.

```mermaid
flowchart TD
  A(["Recruiter signs in"]) --> B{"Credentials OK?"}
  B -- "No" --> B1[/"Login &amp; recovery — Flow 2"/]
  B1 --> B
  B -- "Yes" --> C["Dashboard Home"]
  C --> C1["Read KPI tiles"]
  C --> C2["Clear the attention block"]
  C --> C3["Glance at activity feed"]
  C1 --> D{"Anything surprising?"}
  D -- "Yes" --> D1["Click the tile — opens Workers pre-filtered to that number"]
  D -- "No" --> E{"Where is today's work?"}
  C2 --> E
  D1 --> E
  E -- "Queue badge > 0" --> F[/"VERIFY — Flow 3"/]
  E -- "Red or amber rows" --> G[/"WORKERS — Flow 4"/]
  E -- "Threads: Needs you" --> H[/"MESSAGES — Flow 5"/]
  E -- "Client or crew work" --> I["PROJECTS: client to project to placement"]
  E -- "Evidence or history needed" --> J[/"AUDIT and REPORTS — Flow 7"/]
  F --> K(["Loop back to Home"])
  G --> K
  H --> K
  I --> K
  J --> K
```

## 2 · Login & session

Access is invitation-only; every path back into the dashboard runs through here.

```mermaid
flowchart TD
  A(["Admin sends invitation"]) --> B["Recruiter opens email link"]
  B --> C["Set password (first time)"]
  C --> D["Sign-in screen"]
  D --> E{"Credentials correct?"}
  E -- "Yes" --> Z(["Dashboard Home"])
  E -- "No" --> F{"Forgotten password?"}
  F -- "Yes" --> G["Request reset link"]
  G --> H{"Email arrives?"}
  H -- "No" --> H1{"In spam? Right address?"}
  H1 -- "Fixed" --> G
  H1 -- "Still nothing" --> H2["Ask admin to re-send / verify invited address"]
  H2 --> G
  H -- "Yes" --> I{"Link still valid?"}
  I -- "Expired" --> G
  I -- "Valid" --> J["Set new password"] --> D
  F -- "No, just mistyped" --> K{"Repeated failures / locked?"}
  K -- "Locked" --> L["Wait a few minutes"] --> D
  K -- "No" --> D
  Z --> M{"Session expires mid-work?"}
  M -- "Yes" --> D
  M -- "Happens constantly" --> N["Note the page it happens on and report to support"]
```

## 3 · Verification — the deep flow

The core loop of the product, nested to the judgment level: queue mechanics, then the four red-flag trees, then the decision, then everything an approval cascades into. This diagram and Flow 6 share the tier arithmetic.

```mermaid
flowchart TD
  A(["Open Verify"]) --> B{"Queue empty?"}
  B -- "Yes" --> B1(["Inbox zero — done"])
  B -- "No" --> C{"Work in bulk or one by one?"}
  C -- "Bulk (G)" --> QA["Quick Approve grid"]
  QA --> QA1{"Card pre-selected (clean, high confidence)?"}
  QA1 -- "Yes" --> QA2["Glance check the card"]
  QA2 --> QA3{"Still comfortable?"}
  QA3 -- "Yes" --> QA4["Leave ticked"]
  QA3 -- "No" --> QA5["Untick — open individually"]
  QA1 -- "No (Inspect chip)" --> QA5
  QA4 --> QA6["Approve selected (N)"] --> CASC
  QA5 --> D
  C -- "One by one" --> D["Open next card"]
  D --> E{"Locked by a colleague?"}
  E -- "Yes" --> E1["Skip with J"] --> D
  E -- "No" --> F["Card locks to me"]
  F --> G["Read worker context bar"]
  G --> H{"Upload plausible for this worker?"}
  H -- "Odd (first upload, wrong trade)" --> H1["Raise scrutiny — continue carefully"]
  H -- "Yes" --> I
  H1 --> I{"Red-flag chips present?"}
  I -- "No flags" --> J{"Any low-confidence (enlarged) fields?"}
  J -- "No" --> K["Fast pass: image vs fields"]
  J -- "Yes" --> J1["Compare highlighted card region to the field"]
  J1 --> J2{"Extraction correct?"}
  J2 -- "Yes" --> K
  J2 -- "No" --> J3["Pencil-edit the field — type EXACTLY as printed, never reformat"]
  J3 --> K
  K --> DEC
  I -- "Flags" --> FL{"Which flag?"}

  FL -- "DOB mismatch" --> M1["Open profile from context bar"]
  M1 --> M2{"Where is the error?"}
  M2 -- "Profile typo" --> M3["Fix profile (change is logged)"] --> DEC
  M2 -- "Card misread" --> M4["Edit the field"] --> DEC
  M2 -- "Genuinely different person" --> RJ

  FL -- "Expired" --> N1{"Uploaded as current competence?"}
  N1 -- "Yes" --> RJ
  N1 -- "Historical evidence" --> N2{"Does it serve the purpose it was requested for?"}
  N2 -- "Yes" --> DEC
  N2 -- "Unsure" --> HOLD

  FL -- "Possible duplicate" --> O1["Compare with the existing card"]
  O1 --> O2{"Same registration no, newer dates?"}
  O2 -- "Yes — it's a renewal" --> O3["Approve the new; old card stays (history intact)"] --> DEC
  O2 -- "No — true duplicate" --> RJ

  FL -- "Photo mismatch" --> P1["Zoom-compare cardholder vs profile photo"]
  P1 --> P2{"Doubt resolved?"}
  P2 -- "Yes" --> DEC
  P2 -- "No — never approve on hope" --> HOLD

  DEC{"Decision"} -- "A" --> APP["APPROVE"]
  DEC -- "R" --> RJ["REJECT"]
  DEC -- "H" --> HOLD["HOLD"]

  HOLD --> HO1["Check with colleague / scheme register"]
  HO1 --> HO2{"Resolved?"}
  HO2 -- "Genuine" --> APP
  HO2 -- "Not genuine" --> RJ
  HO2 -- "Still unsure" --> HO3["Stays held in queue"] --> D

  RJ --> R1{"Pick the reason (tells the worker what to DO)"}
  R1 --> R2["Photo unclear / Wrong document / Expired / Details mismatch / Back side needed"]
  R2 --> R3["Worker receives action card with one-tap fix"]
  R3 --> R4{"Worker re-uploads?"}
  R4 -- "Yes" --> R5["New submission re-enters the queue"] --> D
  R4 -- "No" --> R6["Worker stays incomplete — nudge via Flow 5"]

  APP --> CASC["THE CASCADE"]
  CASC --> S1["Permanent audit entry: who, when, confirmed values"]
  CASC --> S2{"Satisfies a compliance requirement?"}
  S2 -- "Yes" --> S3["Worker's compliance can flip green"]
  CASC --> S4["Completeness score recalculates"]
  S4 --> S5{"Tier threshold crossed? (20 / 35 / 70)"}
  S5 -- "Yes" --> S6["Tier changes — worker's phone shows it in moments"]
  S6 --> S7{"First time reaching Site Strong?"}
  S7 -- "Yes" --> S8["Recognition moment fires (once ever)"]
  S5 -- "No" --> S9["Silent progress inside the band"]
  S3 --> T
  S8 --> T
  S9 --> T{"More cards in queue?"}
  T -- "Yes (J)" --> D
  T -- "No" --> B1
```

!!! info "Judgment rules encoded above"
    a real card with stale personal details gets the profile fixed, not the card rejected · a worker standing next to you changes nothing · a wrong past approval is corrected visibly (re-review + proper rejection), never quietly.

## 4 · Worker triage & placement

The daily table routine — colours first, then the two jobs: fixing red, and shortlisting for placement.

```mermaid
flowchart TD
  A(["Open Workers"]) --> B{"Tinted rows at the top?"}
  B -- "Red rows" --> C["Open the worker"]
  C --> D["Compliance summary names the failing requirement"]
  D --> E{"Renewal already uploaded?"}
  E -- "Yes, sitting in queue" --> F[/"Verify it now — Flow 3"/]
  E -- "Yes, but rejected" --> G["Re-request with the reason — Flow 5 action card"]
  E -- "No" --> H["Request re-upload / chase renewal"]
  F --> I{"Verified and in date?"}
  I -- "Yes" --> J["Row returns to normal"]
  I -- "No" --> H
  B -- "Amber rows" --> K["Expiry within ~30 days"]
  K --> L["Chase the renewal NOW — calm at day -25 beats crisis at day +1"]
  B -- "Clean" --> M{"Today's task?"}
  M -- "Shortlist for a project" --> N["Filter: trade + tier Site Ready or above + compliant + unassigned"]
  N --> O{"Candidates found?"}
  O -- "Yes" --> P["Switch to Rich view — compare cards, sectors, tenure"]
  P --> Q["Assign to project"]
  Q --> R["Placement recorded with dates — becomes their real site history"]
  O -- "No" --> S{"Why empty?"}
  S -- "Tier too strict" --> T["Relax to Site Starter + check what each is missing (breakdown drawer)"]
  T --> U["Tell the near-misses their one missing step"]
  S -- "All assigned" --> V["Check placements ending soon"]
  M -- "Routine sweep" --> W["Sort by last seen — nudge good profiles gone quiet"]
  M -- "Client needs an export" --> X["Filter first, then Export — the file mirrors the filter"]
  X --> Y{"Recipient entitled to this data?"}
  Y -- "Yes" --> Z["Send via agreed channel; delete stale copies"]
  Y -- "No" --> ZZ["Narrow the filter or decline — exports leave the platform's protection"]
```

## 5 · Messaging lifecycle

Every thread answers one question — whose move is it? — and the statuses enforce it.

```mermaid
flowchart TD
  A(["Thread enters: Needs you"]) --> B{"What arrived?"}
  B -- "Worker completed a requested action" --> C["Review the completion (e.g. re-upload landed in queue)"]
  C --> D{"Fully done?"}
  D -- "Yes" --> E["Mark RESOLVED — always your explicit click"]
  D -- "No" --> F{"Does a template fit the follow-up?"}
  B -- "Worker replied with a question" --> F
  F -- "Yes" --> G["Send ACTION CARD — one-tap deep link on their phone"]
  F -- "No" --> H["Free-text reply, plain words"]
  G --> I["Status: Awaiting reply"]
  H --> I
  I --> J{"Worker acts / replies?"}
  J -- "Yes" --> K["Auto-flips back to Needs you"] --> B
  J -- "Ages without answer" --> L{"Urgent?"}
  L -- "Yes" --> M["Chase — or call; note the call in the thread"]
  L -- "No" --> N["Leave — it's on their side"]
  M --> I
  E --> O{"New topic comes up later?"}
  O -- "Yes" --> P["NEW thread, right category — never reopen mixed history"]
  subgraph TAKE ["Colleague's thread"]
    Q{"Colleague active on it?"} -- "Yes" --> R["Read-only for you"]
    Q -- "Away + urgent" --> S["Takeover (admin / per team setup) — the takeover is logged"]
  end
```

## 6 · The automatic engines — what the system does without you

The flows that run on their own: the nightly expiry sweep, the score recalculation, and the tier arithmetic — including the CSCS cap, which is arithmetic, not a rule.

```mermaid
flowchart TD
  subgraph NIGHT ["Every night"]
    A(["Nightly sweep"]) --> B{"Any card's expiry date crossed?"}
    B -- "No" --> B1(["Nothing to do"])
    B -- "Yes" --> C["Recalculate that worker"]
  end
  subgraph EVENT ["On every profile event"]
    D(["Verification / edit / deletion / experience added"]) --> C
  end
  C --> E["Re-evaluate all components (all-or-nothing each)"]
  E --> F{"ANY valid, in-date, verified CSCS exists?"}
  F -- "No" --> G["CSCS component = 0 — maximum possible score 65"]
  G --> H["Site Strong (70+) mathematically unreachable — no rule needed"]
  F -- "Yes" --> I["CSCS component earned"]
  H --> J["New score"]
  I --> J
  J --> K{"Crossed a band boundary? (20 / 35 / 70)"}
  K -- "Up" --> L["Promotion — tier badge climbs"]
  L --> L1{"First ever time at 70+?"}
  L1 -- "Yes" --> L2["Recognition fires (once, ever)"]
  K -- "Down" --> M["Demotion — audit records the CAUSE"]
  M --> N{"Cause?"}
  N -- "Card expired" --> N1["Worker sees: renew it and climb straight back + amber expiry alert"]
  N -- "Document deleted" --> N2["Worker sees: re-add a verified card"]
  N -- "90-day inactivity (-5)" --> N3["Only boundary-sitters drop — full profiles shrug it off"]
  K -- "No" --> O["Silent movement inside the band"]
  N1 --> P{"Worker fixes it?"}
  N2 --> P
  N3 --> P
  P -- "Yes: renewal verified / activity resumes" --> D
  P -- "No" --> Q["Stays down — appears in red/amber triage, Flow 4"]
```

## 7 · Audit & reporting

The evidence layer: investigating history, and producing the formal proof.

```mermaid
flowchart TD
  A(["A question about the past"]) --> B{"What kind?"}
  B -- "About one worker" --> C["Investigate: Worker scope"]
  B -- "About one document" --> D["Investigate: Card scope — its whole life, upload to expiry"]
  B -- "About a team member's actions" --> E{"Am I an admin?"}
  E -- "Yes" --> F["Investigate: Recruiter scope (ADMIN)"]
  E -- "No" --> G["Ask an admin — scope is role-gated"]
  C --> H["Narrow: time range + category"]
  D --> H
  F --> H
  H --> I["Read entries: timestamp, actor (person or SYSTEM), action, before-to-after diff, reason"]
  I --> J{"Need the underlying record?"}
  J -- "Yes" --> K["Deep-link — the trail is the index, not the destination"]
  J -- "Entry looks wrong" --> L["It can't be edited — corrections become NEW entries; the original stands"]
  I --> M{"Need formal proof for someone?"}
  M -- "Yes" --> N{"Scope?"}
  N -- "One person" --> O["Worker report"]
  N -- "One site" --> P["Project report"]
  N -- "One account" --> Q["Client report"]
  N -- "Everything" --> R["Whole-workforce report"]
  O --> S["Check the date range MATCHES the intent"]
  P --> S
  Q --> S
  R --> S
  S --> T["Generate, review on screen"]
  T --> U{"Sending externally?"}
  U -- "Yes" --> V["Only what the recipient is entitled to — a client gets their project, not the estate"]
  U -- "No" --> W(["Done — regenerate fresh next time, never reuse last month's file"])
  V --> W
```

!!! info "Global properties"
    every human action in Flows 3–5 writes an immutable audit entry · viewing an audit trail is itself logged · deleting a record never deletes its history.

<div class="page-feedback" markdown>Was this page helpful? [Tell us what was missing](mailto:support@tagconstructionltd.co.uk?subject=Help%20centre%20feedback%3A%20Flow%20maps).</div>
