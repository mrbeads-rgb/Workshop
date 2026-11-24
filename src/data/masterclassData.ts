export type DataClass = 'Green' | 'Amber' | 'Red';

export interface E2Card {
  id: number;
  text: string;
  answer: DataClass;
  reason: string;
}

export interface CatalystStage {
  letter: string;
  word: string;
  title: string;
  question: string;
  rule: string;
  example: string;
  tool: string;
}

export interface E5PackData {
  title: string;
  raw: string;
  output: string;
  ambiguities: string[];
}

export interface T5Preset {
  name: string;
  role: string;
  context: string;
  standards: string;
  format: string;
  guardrails: string;
  check: string;
}

export interface E8Clause {
  id: string;
  text: string;
}

export interface E8Doc {
  key: 'C' | 'D' | 'E';
  shortLabel: string;
  title: string;
  clauses: E8Clause[];
}

export interface E8Question {
  q: string;
  doc: 'C' | 'D' | 'E';
  clause: string;
  ans: string;
  isTrap?: boolean;
}

export interface PackFZone {
  zone: string;
  planned: number;
  completed: number;
  released: number;
  utilised: number;
  turnaround: number;
  q2: number;
  status: 'on' | 'warn' | 'alert';
}

export interface E9Preset {
  impact: number;
  feas: number;
  dataclass: string;
  before: string;
  after: string;
  checkpoint: string;
  measure: string;
}

export interface T9ChecklistItem {
  id: string;
  label: string;
}

export interface PromptItem {
  id: string;
  title: string;
  pillar: '1' | '2' | '3' | '4';
  data: 'Green' | 'Amber';
  when: string;
  prompt: string;
  verify: string;
}

export const THREE_SHIFTS = [
  {
    index: 'Shift 01',
    title: 'From Asking to Designing',
    body: 'Move past one-off chat questions to persistent assistants, templates, and workflows that hold your standards and context once.',
  },
  {
    index: 'Shift 02',
    title: 'From Job Title to Portfolio',
    body: 'Your job title is not your identity; your experience is an asset; your future beyond any single post requires intentional design.',
  },
  {
    index: 'Shift 03',
    title: 'From Chasing to Designing Work',
    body: 'Spot repetitive administrative effort in your department and redesign it into checkable systems within approved boundaries.',
  },
];

export const FOUR_PILLARS = [
  {
    kicker: 'Pillar 1 · Self',
    title: 'Personal Chief of Staff',
    question: 'How do I take control of my time, goals, and weekly energy?',
    mins: '70 min',
    share: '19.7%',
    href: '#sec-pillar1',
  },
  {
    kicker: 'Pillar 2 · Role',
    title: 'Professional Multiplier',
    question: 'How do I turn recurring minutes, briefs, and reports into reusable assistants?',
    mins: '80 min',
    share: '22.5%',
    href: '#sec-pillar2',
  },
  {
    kicker: 'Pillar 3 · Team',
    title: 'Organisational Intelligence',
    question: 'How do I ground policy answers and redesign departmental processes?',
    mins: '80 min',
    share: '22.5%',
    href: '#sec-pillar3',
  },
  {
    kicker: 'Pillar 4 · Future',
    title: 'Future-Readiness Partner',
    question: 'How do I stay valuable, skilled, and purposeful beyond my title?',
    mins: '50 min',
    share: '14.1%',
    href: '#sec-pillar4',
  },
];

export const D1_VIEWS: Record<'raw' | 'ai' | 'catch', string> = {
  raw: `Mon dept meeting, Planning. Mrs Bello chaired. Present: Bello, Okafor, Musa, Eze, Adamu (late), Ibrahim.
Q3 report: Musa says zonal data still incomplete, Kano and Enugu not sent. Okafor says submit by the 15th or board pack delayed. Bello said no extensions.
Training budget: Eze says only N2.1m left, must choose between ICT training and records course. Argument. Bello leaning ICT but wants costs.
Adamu: field monitoring vehicle broken 3 weeks, needs repair approval from Admin.
Ibrahim: staff complaining memos circulate late. Bello wants a proposal on memo tracking by end of month.
AOB: send-forth for Mr Danjuma on the 28th, Eze to coordinate. Ended 11:40.`,
  ai: `1. FIVE-LINE SUMMARY: Planning Dept met (Mrs Bello chairing). Q3 report remains incomplete due to missing Kano & Enugu inputs; deadline upheld. Training balance (₦2.1m) divided opinion between ICT and records; costs requested. Field vehicle repair needs Admin approval, and memo-tracking proposal requested.

2. DECISIONS: No extension on Q3 report.

3. ACTION LIST:
• Musa — Follow up Kano & Enugu data (Due: 15th)
• Eze — Submit ICT vs. Records training costs (Due: Friday)
• Adamu — Submit vehicle repair request to Admin (Due: Immediately)
• Ibrahim — Draft memo-tracking proposal (Due: End of month)
• Eze — Coordinate Mr Danjuma send-forth (Due: 28th)

4. FOLLOW-UP EMAIL: Dear Colleagues, please find attached the summary and action items from Monday's Planning Department meeting...`,
  catch: `TEACHER'S CATCH: Look closely at that crisp-looking action table above!

Because we gave a quick, unguarded prompt, the AI quietly guessed:
• It assigned Ibrahim to write the memo-tracking proposal (he only reported the complaint!).
• It assigned Eze to cost the training options and invented "Due: Friday".
• It accepted "the 15th", "end of month", and "the 28th" with no month.

Lesson: An hour of drafting became a minute of review—but YOU must build the check-and-flag guardrail (taught in Pillar 2).`,
};

export const E2_CARDS: E2Card[] = [
  {
    id: 1,
    text: 'Notes from a fictional training meeting with invented names.',
    answer: 'Green',
    reason: 'Fictional data contains zero real institutional secrets or personal records.',
  },
  {
    id: 2,
    text: "Your agency's published annual report.",
    answer: 'Green',
    reason: 'Already in the public domain; safe to summarise or query in free tools.',
  },
  {
    id: 3,
    text: 'A draft internal memo on staff restructuring.',
    answer: 'Red',
    reason: 'Confidential internal restructuring affects staff and pre-decision governance. Never paste into a public tool.',
  },
  {
    id: 4,
    text: 'A spreadsheet of staff names, grade levels and salaries.',
    answer: 'Red',
    reason: 'Contains personal and payroll data protected under the Nigeria Data Protection Act 2023.',
  },
  {
    id: 5,
    text: 'Quarterly zone figures with no names or personal details, not yet published.',
    answer: 'Amber',
    reason: 'Unpublished internal operational data. Anonymise or aggregate further, or use an approved institutional tool.',
  },
  {
    id: 6,
    text: 'Your own weekly schedule and personal goals.',
    answer: 'Green',
    reason: 'Your own non-sensitive personal schedule—just avoid naming third parties or passwords.',
  },
  {
    id: 7,
    text: "A citizen complaint letter with the citizen's name and phone number.",
    answer: 'Red',
    reason: 'Identifiable citizen PII and sensitive case material. Never enter into public AI.',
  },
  {
    id: 8,
    text: 'A circular already published on a government website.',
    answer: 'Green',
    reason: 'Publicly released regulatory guidance.',
  },
  {
    id: 9,
    text: 'An approved internal SOP on records handling, not marked confidential.',
    answer: 'Amber',
    reason: 'Internal agency document. Check policy before pasting into a public notebook; an approved workspace is safer.',
  },
  {
    id: 10,
    text: 'Meeting notes that mention a disciplinary case.',
    answer: 'Red',
    reason: 'Personnel and disciplinary records are strictly confidential.',
  },
];

export const CATALYST_STAGES: CatalystStage[] = [
  {
    letter: 'C',
    word: 'Clarify',
    title: 'Clarify the Real Problem',
    question: 'What exactly is going wrong, for whom, and what would "fixed" look like?',
    rule: 'A problem you cannot describe in two sentences cannot be delegated.',
    example: `Mr Bashir Lawal's problem isn't "writing the DG report"—it's six zones sending figures in six incompatible formats.`,
    tool: 'Problem Statement Discipline: write the root cause in 2 sentences before opening any AI window.',
  },
  {
    letter: 'A',
    word: 'Assess',
    title: 'Assess the AI Role & Data',
    question: 'What can AI do here, what must stay with me, and is any of this Green, Amber, or Red?',
    rule: 'AI drafts, analyses, structures, and challenges; the human decides and signs.',
    example: 'AI can standardise inputs and compute rates on anonymised figures; only the Head of Planning sets priorities and signs off.',
    tool: 'Traffic-Light Gate: Green passes; Amber must be anonymised or moved to an approved tool; Red stays out.',
  },
  {
    letter: 'T',
    word: 'Tell',
    title: 'Tell It the Context',
    question: 'Who am I, what is the situation, what materials exist, what does good look like, and what must you avoid?',
    rule: "Context is the difference between a stranger's generic advice and an assistant's help.",
    example: "Supplying Mrs Amina Yusuf's 90-minute commute, evening power cuts, and 5–9 AM energy peak.",
    tool: 'The Context Stack: Role · Situation · Materials · Standards · Constraints.',
  },
  {
    letter: 'A',
    word: 'Ask',
    title: 'Ask With Precision',
    question: 'What task, in what format, tone, and length, with what explicit checks?',
    rule: 'Ask for a structure, not a miracle—and always tell AI to flag what it guessed.',
    example: 'End every request with: "Use [UNCLEAR] wherever the source does not state an owner or date, and list every assumption."',
    tool: 'The Instruction Anatomy: Task · Format · Tone · Length · Check.',
  },
  {
    letter: 'L',
    word: 'Loop',
    title: 'Loop With It',
    question: 'What is missing, weak, or wrong? What would a critical Director ask?',
    rule: 'The first output is a draft; the third is usually the keeper.',
    example: '"What three tough questions would the Director General ask about this Q3 brief? Answer them from the data or state what is missing."',
    tool: 'Iterative Critique: Push back on unrealistic schedules, weak arguments, or missing evidence.',
  },
  {
    letter: 'Y',
    word: 'Your Check',
    title: 'Your Judgement & Verification',
    question: 'Have I checked facts, figures, names, dates, tone, and risk before signing?',
    rule: 'Nothing leaves your desk unverified.',
    example: 'Recalculating the 76.9% completion total in a spreadsheet and verifying circular clauses by clicking citations.',
    tool: 'The Verification Ladder: Sense-check → Source-check → Second-check → Subject-check.',
  },
  {
    letter: 'S',
    word: 'Systemise',
    title: 'Systemise What Worked',
    question: 'If this worked twice, how do I make sure I never start from zero again?',
    rule: 'Move up the ladder: Saved Prompt → Template → Persistent Assistant → Approved Workflow.',
    example: 'Saving the "Sunday Reset" prompt inside your Personal Chief of Staff Gem or Project.',
    tool: 'The Systemise Ladder (top rung requires IT, Records & DPO approval when touching agency systems).',
  },
  {
    letter: 'T',
    word: 'Track',
    title: 'Track the Gain',
    question: 'Did this save time, raise quality, or reduce errors—and by how much?',
    rule: 'If you did not measure against your own baseline, you do not know if the system works.',
    example: 'Logging 60 minutes before vs. 15 minutes with AI, plus 2 ambiguities caught before circulation.',
    tool: 'The AI Gain Log: Date · Task · Minutes Before · Minutes With AI · Quality (1–5) · Errors Caught.',
  },
];

export const D2_PREVIEWS: Record<'weak' | 'strong', string> = {
  weak: `PROMPT: "Plan my week."

OUTPUT (Generic):
• Monday: Wake up at 6 AM, meditate, check emails, do high-priority work 9–12, lunch, afternoon meetings, evening gym.
• Tuesday–Friday: Repeat similar schedule.

TEACHER'S NOTE: This could belong to anyone on Earth. It ignores your 90-minute commute, evening power cuts, family duties, and energy slump.`,
  strong: `PROMPT: Role (Assistant Director, parent of 3, student, treasurer) + Commute (75–90m) + Energy (sharp 5–9 AM, low after 8 PM, power cuts) + Fixed Commitments + Check ("mark any clash & list assumptions").

OUTPUT (Tailored):
• Tue & Thu 5:30–6:30 AM: Study block placed at peak energy before commute & evening power risks.
• Wed 10:00–11:30 AM: Protected office block for Q3 report draft (due Thursday).
• CLASH FLAGGED: Wed 5:00 PM school event conflicts with 4:00 PM close + 90-min commute—suggest leaving office at 3:15 PM.
• ASSUMPTIONS LISTED: Assumed no weekend travel; Friday family dinner protected.`,
};

export const E5_DATA: Record<'A' | 'A2', E5PackData> = {
  A: {
    title: 'Pack A · Planning Meeting',
    raw: D1_VIEWS.raw,
    output: `SUMMARY: Planning Dept met under Mrs Bello. Strict deadline upheld for Q3 report despite missing Kano/Enugu data. Options weighed for remaining ₦2.1m training budget; vehicle repair and memo-tracking proposal flagged.

DECISIONS:
• No extension granted on Q3 report submission.

ACTION TABLE:
• Chase Kano & Enugu Q3 data | Owner: [UNCLEAR - Musa reported gap, no owner assigned] | Due: [UNCLEAR - "the 15th", month unstated]
• Present ICT vs. Records training costs | Owner: [UNCLEAR] | Due: [UNCLEAR]
• Seek Admin approval for vehicle repair | Owner: [UNCLEAR - Adamu raised issue] | Due: [UNCLEAR]
• Draft memo-tracking proposal | Owner: [UNCLEAR - Ibrahim raised, Bello requested] | Due: [UNCLEAR - "end of month"]
• Coordinate Mr Danjuma send-forth | Owner: Eze | Due: [UNCLEAR - "the 28th", month unstated]`,
    ambiguities: [
      '"The 15th" and "the 28th" have no month or year stated',
      'No owner explicitly assigned for costing the two training options',
      'No author explicitly named for the memo-tracking proposal',
      "Adamu raised the vehicle repair, but notes don't confirm he owns chasing Admin",
    ],
  },
  A2: {
    title: 'Pack A2 · Procurement Committee',
    raw: `Procurement committee. Laptops for the new unit, 12 units. Three quotations: Cormart N8.6m, 8 weeks delivery; Techbridge N9.4m, 2 weeks delivery; third vendor did not attend.
Chair says speed matters. Eze says check the warranty first. Chair to decide after warranty confirmed.
Generator service overdue, Musa will "get a quote". Fuel allocation cut? Not agreed. Next meeting after the long weekend.`,
    output: `SUMMARY: Procurement Committee reviewed laptop quotations (12 units) and deferred final award pending warranty verification. Generator servicing and fuel allocation discussed without final budget resolution.

ACTION TABLE:
• Confirm warranty terms for Cormart (₦8.6m, 8w) & Techbridge (₦9.4m, 2w) | Owner: [UNCLEAR - Eze suggested, Chair deferred] | Due: [UNCLEAR - before next meeting]
• Obtain quotation for generator service | Owner: Musa | Due: [UNCLEAR]
• Fuel allocation cut | Status: NOT AGREED / OPEN ISSUE
• Convene next meeting | Owner: [UNCLEAR] | Due: [UNCLEAR - "after the long weekend", exact date unstated]`,
    ambiguities: [
      'No name recorded for who will verify laptop warranties (Eze or Secretariat?)',
      'Third vendor named nowhere—reason for non-attendance unrecorded',
      '"After the long weekend" gives no specific date or time',
      "No target date or budget cap stated for Musa's generator service quote",
    ],
  },
};

export const E6_STEPS: Record<1 | 2 | 3, string> = {
  1: `PROMPT (P8): Summarise Pack C (FAIM/REC/2026/014) for the Director, Administration. Quote clauses exactly. Write "not stated" if absent.

AI OUTPUT: Files indexed within 5 working days (Clause 1); closed files held 3 years (Clause 2); originals never leave registry (Clause 3); monthly returns due 7th working day to Director, Administration (Clause 4); GL 10+ Liaison Officer required (Clause 5); approved shared repository only (Clause 6).`,
  2: `PROMPT (Source-Bound): "What penalty does Circular FAIM/REC/2026/014 prescribe for late submission of monthly records returns? Quote the clause."

AI OUTPUT: "Not stated in the document. Clause 4 gives the due date (7th working day of the next month), but no penalty for late submission is specified."

TEACHER'S VERDICT: Good! Grounding + explicit instruction prevented guessing.`,
  3: `PROMPT (Ungrounded Trap): "Without using any document, tell me the legal penalty in Nigerian public-service rules for late records returns, and quote the section number."

TYPICAL UNGROUNDED AI TRAP: "Under Section 04302 of the Public Service Rules, heads of unit face a formal query and surcharge of ₦25,000..." [CONTAINS PLAUSIBLE-SOUNDING HALLUCINATED SECTION/FIGURE!]

TEACHER'S LESSON: Fluency is not accuracy. Never sign off on a cited law or figure without checking the official text!`,
};

export const T5_PRESETS: T5Preset[] = [
  {
    name: 'Meeting Preparation',
    role: 'You are my Meeting Preparation Assistant.',
    context: 'I am a department head in a Nigerian federal agency. I supply purpose, date, duration, attendees by role, and brief background.',
    standards:
      'One-sentence objective; agenda of at most 5 items with time allocations, decision required, and lead; 3 toughest questions with suggested answers; likely disagreements; pre-read list; closing script confirming actions and owners.',
    format: 'One-page structured brief with headings and concise bullets.',
    guardrails: 'Never invent attendees, dates, or figures; use only what I provide; never request or store confidential government files or PII.',
    check: 'End by listing everything you assumed and everything you still need from me.',
  },
  {
    name: 'Management Report',
    role: 'You are my Management Report Drafter for the Planning Unit.',
    context: "Month-end reporting to the Director General and Board using anonymised or aggregated zonal figures and last month's structure.",
    standards:
      '100-word Executive Summary; KPI table against targets showing formulas; Achievements; Challenges; Top 3 Risks with mitigations; Decisions Required.',
    format: 'Formal, concise Nigerian English; clear tables and numbered recommendations.',
    guardrails: 'Do not invent numbers or smooth over gaps. Flag missing or unreconciled figures as [CHECK].',
    check: 'List every formula used and every figure you could not reconcile.',
  },
  {
    name: 'Policy & Circular Analyst',
    role: 'You are my Policy and Document Briefing Assistant.',
    context: 'I am a manager preparing a 5-minute briefing for senior leadership on public or fictional training circulars.',
    standards:
      '150-word summary; 5 points that matter most to our unit; obligations, deadlines, and numbers quoted verbatim with clause numbers; ambiguities and 3 questions for the author.',
    format: 'Numbered executive memo format.',
    guardrails: 'Use only the pasted text. If a penalty, threshold, or rule is absent, write "Not stated in the document".',
    check: 'Include 3 spot-check quotes with exact clause references so I can verify.',
  },
];

export const T5_TEST_RESPONSES: Record<'typical' | 'tricky', string> = {
  typical: `INPUT: "Quarterly planning review, 2 hours, six unit heads and the Director, background: Q3 targets were missed in two zones."

ASSISTANT RESPONSE:
• Objective: Diagnose Q3 shortfalls across two zones and agree corrective actions.
• Agenda (120 min): 1. Opening (10m) · 2. Zonal Data Review (35m) · 3. Root-Cause Barriers (35m) · 4. Recovery Plan & Owners (30m) · 5. Closing Script (10m).
• CHECK: I still need the exact names of the two zones and specific Q3 figures from you—I will not invent them.`,
  tricky: `TRICKY VAGUE INPUT: "Meeting tomorrow about the thing we discussed."

GUARDRAIL-PASSING RESPONSE:
"I cannot prepare your meeting pack yet because my guardrails forbid inventing attendees, topics, or decisions. Before I draft the agenda, please tell me:
1. What is the meeting's purpose and topic?
2. Who is attending by role, and how long will it last?
3. What single decision must come out of it?"`,
};

export const E8_DOCS: Record<'C' | 'D' | 'E', E8Doc> = {
  C: {
    key: 'C',
    shortLabel: 'Pack C · Records',
    title: 'Pack C · Records Management Circular (FAIM/REC/2026/014)',
    clauses: [
      { id: 'C1', text: '1. Indexing Standard: All newly opened official files must be indexed within 5 working days of opening.' },
      { id: 'C2', text: '2. Registry Retention: Closed files remain in the departmental registry for 3 years before transfer to the central records centre.' },
      { id: 'C3', text: "3. Original Files: Original physical files may not leave the registry; photocopies require the Head of Registry's written approval." },
      { id: 'C4', text: '4. Monthly Returns: Monthly records returns are due by the 7th working day of the following month to the Director, Administration.' },
      { id: 'C5', text: '5. Liaison Officer: Each department shall designate one Records Liaison Officer of at least Grade Level 10 (GL 10).' },
      { id: 'C6', text: '6. Electronic Storage: Electronic copies must be stored only in the approved shared repository—never on personal email or personal cloud drives.' },
    ],
  },
  D: {
    key: 'D',
    shortLabel: 'Pack D · Leave',
    title: 'Pack D · Leave & Attendance Guidelines (Fictional Training Material)',
    clauses: [
      { id: 'D1', text: '1. Annual Leave Entitlement: Officers on GL 07 and above receive 25 working days; officers below GL 07 receive 20 working days.' },
      { id: 'D2', text: '2. Application Notice: Leave applications must be submitted at least 14 days before the start date and approved by the Head of Department.' },
      { id: 'D3', text: '3. Carry-Over & Roster: Up to 10 days may be carried over; the annual leave roster is published by 15 January.' },
      { id: 'D4', text: '4. Casual Absence: Unplanned absence must be reported by 9:30 AM the same day; a medical certificate is required after 2 consecutive days.' },
      { id: 'D5', text: '5. Study Leave: Study leave with pay of up to 4 weeks per year may be granted for approved professional examinations.' },
    ],
  },
  E: {
    key: 'E',
    shortLabel: 'Pack E · Procurement',
    title: 'Pack E · Procurement Thresholds SOP (Fictional Training Material)',
    clauses: [
      { id: 'E1', text: '1. Direct Purchase: Purchases up to ₦500,000 may be executed via direct purchase by one authorised officer.' },
      { id: 'E2', text: '2. Three Quotations: Purchases from ₦500,001 to ₦5,000,000 require three competitive quotations, approved by the Head of Department.' },
      { id: 'E3', text: '3. Procurement Committee: Purchases above ₦5,000,000 must go to the Procurement Committee.' },
      { id: 'E4', text: '4. Anti-Splitting & Inspection: Splitting a purchase to evade a threshold is strictly prohibited. All goods received must be inspected by two officers.' },
    ],
  },
};

export const E8_QUESTIONS: E8Question[] = [
  {
    q: 'How many days of annual leave does a GL 09 officer get, and how far in advance must they apply?',
    doc: 'D',
    clause: 'D1',
    ans: 'A GL 09 officer is GL 07 or above and receives 25 working days of annual leave [Pack D, Clause 1]. The application must be submitted at least 14 days before the start date and approved by the Head of Department [Pack D, Clause 2]. Confirm with HR/Admin before acting.',
  },
  {
    q: 'When are monthly records returns due, and to whom?',
    doc: 'C',
    clause: 'C4',
    ans: 'Monthly records returns are due by the 7th working day of the following month, submitted to the Director, Administration [Pack C, Clause 4]. Confirm with Registry before acting.',
  },
  {
    q: 'My department wants to buy equipment costing ₦3.2 million. What process applies?',
    doc: 'E',
    clause: 'E2',
    ans: 'At ₦3.2 million (between ₦500,001 and ₦5,000,000), the purchase requires three competitive quotations approved by the Head of Department [Pack E, Clause 2]. Splitting the order is prohibited, and two officers must inspect goods on receipt [Pack E, Clause 4]. Confirm with Procurement Unit before acting.',
  },
  {
    q: 'What is the penalty for late submission of monthly records returns?',
    doc: 'C',
    clause: 'C4',
    isTrap: true,
    ans: 'Not stated in the sources. Pack C (Clause 4) specifies the 7th working day deadline, but none of the three documents prescribes a penalty for late submission. Do not guess—check official Public Service Rules or ask Administration.',
  },
  {
    q: 'Can I save a copy of a registry file on my personal Google Drive to work from home?',
    doc: 'C',
    clause: 'C6',
    ans: 'No. Electronic copies may be placed only in the approved shared repository—never in personal email or personal cloud storage [Pack C, Clause 6]. Original physical files also may not leave the registry [Pack C, Clause 3].',
  },
  {
    q: 'Synthesise a 1-page quick guide for a new manager covering leave, records, and purchasing.',
    doc: 'D',
    clause: 'D2',
    ans: `NEW MANAGER QUICK GUIDE:
• Leave: Roster due 15 Jan; GL 07+ gets 25 days (apply 14 days ahead); report absence by 9:30 AM [Pack D, Clauses 1–4].
• Records: Appoint a GL 10+ Liaison Officer; index files in 5 days; returns due 7th working day; approved shared drive only [Pack C, Clauses 1, 4–6].
• Purchasing: ≤₦500k direct; ₦500k–₦5m three quotes (HoD); >₦5m Committee; two-officer inspection [Pack E, Clauses 1–4].`,
  },
];

export const PACK_F_DATA: PackFZone[] = [
  { zone: 'Abuja', planned: 24, completed: 21, released: 180, utilised: 171, turnaround: 4.2, q2: 84, status: 'on' },
  { zone: 'Lagos', planned: 30, completed: 22, released: 240, utilised: 238, turnaround: 7.9, q2: 80, status: 'warn' },
  { zone: 'Kano', planned: 18, completed: 9, released: 120, utilised: 61, turnaround: 11.5, q2: 55, status: 'alert' },
  { zone: 'Enugu', planned: 20, completed: 15, released: 140, utilised: 118, turnaround: 6.1, q2: 70, status: 'warn' },
  { zone: 'Port Harcourt', planned: 22, completed: 19, released: 160, utilised: 149, turnaround: 5.0, q2: 78, status: 'on' },
  { zone: 'Ibadan', planned: 16, completed: 14, released: 110, utilised: 104, turnaround: 4.8, q2: 85, status: 'on' },
];

export const E9_PRESETS: Record<string, E9Preset> = {
  'Incoming correspondence and memo routing': {
    impact: 5,
    feas: 4,
    dataclass: 'Amber · Head of Registry, ICT Unit & Data Protection Officer',
    before: 'Manual registry logging and 5-day average chasing across desks',
    after: 'Standard intake summary (AI) + automated 3-day reminder (Rule)',
    checkpoint: 'Registry officer confirms recipients and file classification before routing',
    measure: 'Average days from receipt to first action (2-week pilot)',
  },
  'Monthly zonal report consolidation': {
    impact: 5,
    feas: 5,
    dataclass: 'Amber · Planning Head (template now), ICT for automated intake',
    before: 'Six zones send six incompatible formats; 2 full days to consolidate',
    after: 'Standardised input form + AI KPI table & anomaly draft with [CHECK] flags',
    checkpoint: 'Planning officer reconciles totals in Excel before DG submission',
    measure: 'Hours to produce report and post-review corrections',
  },
  'Leave application and tracking': {
    impact: 4,
    feas: 4,
    dataclass: 'Red/Amber (staff records) · HR, ICT & DPO DPIA required',
    before: 'Paper forms lost between units and manual roster checks',
    after: 'Rule-based roster balance check + automated 14-day notice validation',
    checkpoint: 'Head of Department approves cover arrangement before leave starts',
    measure: 'Turnaround time from application to written decision',
  },
  'Training-needs tracking': {
    impact: 4,
    feas: 5,
    dataclass: 'Green/Amber · HR Training Desk & Department Heads',
    before: 'Ad-hoc nomination emails and duplicate course requests',
    after: 'AI clusters anonymised skill gaps against annual budget options',
    checkpoint: 'Training Committee confirms priority nominations and cost-value',
    measure: '% of training budget matched to documented competency gaps',
  },
  'Stores requisition and approvals': {
    impact: 4,
    feas: 3,
    dataclass: 'Amber · Head of Stores, Internal Audit & ICT',
    before: 'Verbal requests, missed reorder thresholds, and slow approvals',
    after: 'Rule check on threshold & stock balance + AI draft inspection checklist',
    checkpoint: 'Two officers physically inspect and countersign goods received',
    measure: 'Stock-out incidents and requisition cycle days',
  },
  'Scheduling and minuting recurring meetings': {
    impact: 5,
    feas: 5,
    dataclass: 'Amber (anonymise names) · Unit Head only for template',
    before: '60+ minutes typing scribbled notes; missed follow-ups',
    after: 'Meeting Prep Assistant agenda + P7 Action Table with [UNCLEAR] flags',
    checkpoint: 'Chair verifies owners and dates before email circulation',
    measure: 'Minutes saved per meeting & % of actions closed on time',
  },
};

export const T9_CHECKLIST_ITEMS: T9ChecklistItem[] = [
  {
    id: 'chk1',
    label: 'Confirm Retirement Savings Account (RSA) records and accrued rights directly with PenCom or your pension desk.',
  },
  {
    id: 'chk2',
    label: 'Verify current federal/state exit-benefit or Minimum Pension Guarantee rules with official circulars.',
  },
  {
    id: 'chk3',
    label: 'Review post-service health insurance cover and keep personal vital documents organised.',
  },
  {
    id: 'chk4',
    label: 'Confirm HR and Ethics rules on conflict of interest and outside engagement while still in service.',
  },
];

export const PROMPTS: PromptItem[] = [
  {
    id: 'P1',
    title: 'Personal Productivity Audit',
    pillar: '1',
    data: 'Green',
    when: 'You feel busy but cannot say where the time goes',
    prompt:
      'Act as my personal productivity coach. I am [ROLE] with these responsibilities: [RESPONSIBILITIES]. Interview me one question at a time to audit how my time and attention are spent. Ask about a typical week, fixed commitments, interruptions, energy peaks and slumps, tasks I avoid, and what I wish I had more time for. Ask no more than ten questions. After my last answer produce: (1) a weekly time snapshot with estimated hours per area; (2) my top three time leaks and top three attention leaks, each with a likely cause; (3) my non-negotiables; (4) five specific changes ranked by effort and impact; (5) the questions you could not answer from what I told you. Use my wording and do not invent facts; mark gaps as [MISSING].',
    verify: 'Confirm the snapshot totals roughly 168 hours and test estimates with a 3-day diary.',
  },
  {
    id: 'P2',
    title: 'Goal Setting & Execution Plan',
    pillar: '1',
    data: 'Green',
    when: 'A goal exists but there is no realistic plan',
    prompt:
      'Act as a strategic planner. Turn this goal into an execution plan: [GOAL]. Context: [ROLE_AND_CONSTRAINTS], deadline [DEADLINE], free hours a week [HOURS]. First ask up to five clarifying questions. Then produce: a one-sentence outcome statement; three measurable success criteria; milestones for 12 months, each quarter and the next 30 days; the weekly habits that drive the goal; the three biggest risks with a countermeasure each; and what I should stop doing to make room. Keep it realistic for a working manager. Do not invent facts; list your assumptions.',
    verify: 'Check that weekly habits actually fit your real free hours; cut anything unrealistic.',
  },
  {
    id: 'P3',
    title: 'Sunday Weekly Planner',
    pillar: '1',
    data: 'Green',
    when: 'Every Sunday for 10 minutes',
    prompt:
      'Use my Personal Context Card. Plan my week of [WEEK_DATES]. Fixed commitments: [COMMITMENTS]. Top priorities this week: [TOP_THREE]. Energy pattern: [ENERGY_PATTERN]. Build a day-by-day plan with one protected deep-work block per day, priority tasks sorted Must, Should, Could, and at least [20]% buffer time. Then list three outcomes that would make this week a success, anything I should delegate or decline, and the single biggest risk. Do not schedule outside [WORKING_HOURS]. Flag every clash and every assumption.',
    verify: 'Verify travel/commute times are realistic and every fixed commitment is placed.',
  },
  {
    id: 'P4',
    title: 'Friday Review & Reset',
    pillar: '1',
    data: 'Green',
    when: 'Every Friday for 5 minutes',
    prompt:
      'Run a five-minute weekly review. Ask me one question at a time: what got done, what slipped and why, what drained me, what gave me energy, and what I learned. Then summarise in four lines: wins, slips with root cause, one habit to keep, one habit to change. Turn unfinished items into a draft list for next week, each marked Do, Delegate, Drop or Defer. End by asking what I will do first on Monday.',
    verify: 'Be honest about root causes vs. excuses, and actively use Drop on low-value tasks.',
  },
  {
    id: 'P5',
    title: 'Decision Support',
    pillar: '1',
    data: 'Green',
    when: 'A decision is difficult and stakes are real',
    prompt:
      'Act as a clear-thinking adviser, not a decision-maker. I must decide: [DECISION]. Options: [OPTIONS]. What matters to me: [CRITERIA]. Constraints: [CONSTRAINTS]. First ask up to five questions that could change the answer. Then: (1) restate the decision; (2) compare the options against my criteria in a table; (3) argue the strongest case for each option, including the one you would not choose; (4) list what could go wrong with each and the early warning signs; (5) suggest a low-cost way to test the favourite; (6) say what information is still missing. Do not tell me what to choose. Do not invent facts.',
    verify: 'Consult qualified professionals for pension, legal, medical, or financial decisions.',
  },
  {
    id: 'P6',
    title: 'Personal Context Card Builder',
    pillar: '1',
    data: 'Green',
    when: 'Setting up your Personal Operating System',
    prompt:
      "Help me build my Personal Context Card, a one-page briefing you will read at the start of every conversation. Interview me one question at a time about: who I am and my roles; my 12-month goals; this quarter's top three priorities; my constraints (time, health, family, resources); my energy pattern; how I like answers (length, tone, level of challenge); and what I never want you to do. Then write the card in under 350 words, in the first person, with headings. End with this line: Standing rule: do not ask for, and warn me if I share, confidential government information, personal data about other people, passwords or account details.",
    verify: 'Remove anything too private for a public tool; review every quarter.',
  },
  {
    id: 'P7',
    title: 'Notes to Minutes & Action List',
    pillar: '2',
    data: 'Amber',
    when: 'Immediately after any meeting',
    prompt:
      'You are my meeting secretary. Below are rough notes from [MEETING_NAME], chaired by [CHAIR_ROLE], on [DATE]. Produce: (1) a five-line summary; (2) the decisions taken; (3) an action table with Task, Owner, Due date and Status, using [UNCLEAR] wherever the notes do not say, and never guessing an owner or a date; (4) open issues and risks; (5) a short follow-up email to attendees in formal Nigerian English. At the end list every point where you had to interpret the notes. Notes: [PASTE_ANONYMISED_NOTES].',
    verify: 'Check every owner, date, and decision against your attendance list before sending.',
  },
  {
    id: 'P8',
    title: 'Document Analysis & Briefing',
    pillar: '2',
    data: 'Green',
    when: 'A long document must be briefed quickly',
    prompt:
      'Read the document below. I need to brief [AUDIENCE] in [MINUTES] minutes. Produce: (1) a 150-word summary; (2) the five points that matter most to us and why; (3) obligations, deadlines and numbers, quoted exactly with the clause or page; (4) anything ambiguous, missing or contradictory; (5) three questions I should put to the author. Use only the document. If something is not in it, write "not stated". Document: [PASTE_DOCUMENT].',
    verify: 'Spot-check 3 quoted clauses against the source and test one unstated question.',
  },
  {
    id: 'P9',
    title: 'Meeting Preparation',
    pillar: '2',
    data: 'Amber',
    when: 'Before chairing or attending a key meeting',
    prompt:
      'Prepare me to chair [MEETING] on [DATE], lasting [DURATION], with [ATTENDEES_BY_ROLE]. Purpose: [PURPOSE]. Background: [SHORT_SUMMARY]. Produce: a clear objective; an agenda of no more than five items with time allocations, the decision needed for each and who leads; the three toughest questions I may face with suggested answers; likely disagreements and how to handle them; what to send participants beforehand; and a closing script that confirms actions and owners. Do not invent attendees, figures or decisions.',
    verify: 'Ensure agenda minutes add up and adjust for team dynamics you know.',
  },
  {
    id: 'P10',
    title: 'Management Report Drafter',
    pillar: '2',
    data: 'Amber',
    when: 'Consolidating periodic unit reports',
    prompt:
      'Act as the report drafter for the Head of [UNIT]. Write the [MONTH] progress report for [AUDIENCE] in this structure: Summary (100 words); KPI table against target; Achievements; Challenges; Risks (top three with mitigation); Decisions required. Inputs by unit: [PASTE_AGGREGATED_FIGURES]. Calculate every rate you show and state the formula. Flag any unit with missing or inconsistent data as [CHECK]. Tone: formal, concise, Nigerian English. Do not invent numbers.',
    verify: 'Recompute 3 headline numbers in a spreadsheet and resolve every [CHECK] flag.',
  },
  {
    id: 'P11',
    title: 'Delegation & Accountability Brief',
    pillar: '2',
    data: 'Green',
    when: 'Handing over a task clearly',
    prompt:
      'Help me delegate this task: [TASK]. To: [ROLE_AND_EXPERIENCE]. Deadline: [DEADLINE]. Why it matters: [PURPOSE]. Write a delegation brief with the outcome expected, what "done well" looks like, boundaries of authority, resources, check-in points and what to escalate. Then write a one-paragraph message I can send. Finally list three ways this delegation could go wrong and how I would notice early. Keep the tone respectful and clear.',
    verify: 'Confirm the authority boundaries are genuinely yours to delegate.',
  },
  {
    id: 'P12',
    title: 'Official Communication Improver',
    pillar: '2',
    data: 'Amber',
    when: 'A memo or letter must be clear and accurate',
    prompt:
      'Rewrite the draft below as a [MEMO_LETTER_OR_EMAIL] from [MY_ROLE] to [RECIPIENT_ROLE]. Purpose: [PURPOSE]. Tone: [TONE]. Keep every fact exactly as drafted. Use short paragraphs, plain words, a clear subject line, and a closing that states what I need and by when. Then give me a version half the length, the two weakest sentences in the original and why, and anything that could be read as a commitment, accusation or promise. Draft: [PASTE_DRAFT].',
    verify: 'Check no facts changed, confirm file references, and read aloud.',
  },
  {
    id: 'P13',
    title: 'KPI Development',
    pillar: '3',
    data: 'Green',
    when: 'A unit has activity but weak measures',
    prompt:
      'Act as a performance management adviser. My unit is [UNIT] with this mandate: [MANDATE]. Our outputs are: [OUTPUTS]. Propose eight KPIs. For each give a definition, the formula, the data source, the frequency, a realistic target range, the owner, and one way it could be gamed. Group them as Output, Quality, Timeliness, Cost and Outcome. Recommend the three that matter most and why. Flag any KPI that needs data we may not have. Do not invent baselines; ask me for them.',
    verify: 'Verify each KPI can actually be measured from existing unit records.',
  },
  {
    id: 'P14',
    title: 'Performance Data to Management Brief',
    pillar: '3',
    data: 'Amber',
    when: 'A table of results needs executive interpretation',
    prompt:
      'Analyse the table below for [AUDIENCE]. Compute completion rate (completed divided by planned) and budget utilisation (utilised divided by released) for each [UNIT] and in total. Compare with [PREVIOUS_PERIOD]. Identify the strongest and weakest performers, unusual patterns (for example high spending with low completion), and at least three questions the Director General would ask. Draft a one-page management brief: headline, KPI table, three findings, three risks, three recommended actions and data caveats. Show your calculations. Data: [PASTE_TABLE].',
    verify: 'Recalculate totals in a spreadsheet and verify each recommendation against data.',
  },
  {
    id: 'P15',
    title: 'Workflow Redesign',
    pillar: '3',
    data: 'Amber',
    when: 'A repetitive administrative process wastes effort',
    prompt:
      "Act as a process-improvement analyst. Process: [PROCESS_NAME]. Today's steps in order: [CURRENT_STEPS_WITH_MINUTES]. Pain points: [PAIN_POINTS]. Redesign this process. Show a before-and-after table. Mark each new step Human, AI-assisted or Rule-based. Add human checkpoints where an error would matter. List the data touched and its sensitivity (Green, Amber, Red), the approvals needed (manager, ICT, Data Protection Officer, records), three success measures, risks with a fallback, and a two-week pilot plan for one team. Do not assume any tool is approved.",
    verify: 'Walk the design through with frontline staff and obtain approvals before piloting.',
  },
  {
    id: 'P16',
    title: 'Departmental AI Opportunity Scan',
    pillar: '3',
    data: 'Green',
    when: 'Deciding which departmental process to improve first',
    prompt:
      'My department is [FUNCTION] with [STAFF_COUNT] staff. Recurring processes: [LIST_6_TO_10_PROCESSES]. For each, estimate frequency, effort, pain level and data sensitivity from what I tell you, and ask me when unsure. Score each on impact (1–5) and feasibility (1–5) for AI-assisted improvement, mark the AI role (draft, analyse, route, monitor), the main risk and whether it needs approval. Return the T6 table sorted by score. Recommend the single best pilot and explain why, and name one process that should not use AI and why.',
    verify: 'Replace rough time guesses with real registry/unit records.',
  },
  {
    id: 'P17',
    title: 'Risk & Options Appraisal',
    pillar: '3',
    data: 'Green',
    when: 'Advising a senior decision-maker',
    prompt:
      'I must advise [DECISION_MAKER] on [ISSUE]. Background: [FACTS_WITH_SOURCES]. Options: [OPTIONS]. Produce a management brief with the issue in two sentences; the options with costs, benefits, risks and dependencies; a risk register for the preferred option (likelihood, impact, mitigation, owner); the assumptions behind the recommendation; and what would change my mind. Give a recommendation with a confidence level, but make clear this is advice for a human decision. Separate facts I gave you from your assumptions.',
    verify: 'Test every legal/policy reference against the official text and peer-review.',
  },
  {
    id: 'P18',
    title: 'Grounded Policy Q&A Instruction',
    pillar: '3',
    data: 'Green',
    when: 'Setting up a knowledge assistant or notebook',
    prompt:
      'You answer questions about [TOPIC] using only the documents provided. For every answer cite the document and clause. If the answer is not in the documents, say "not stated in the sources" and do not guess. If two documents conflict, show both and say so. Keep answers under 150 words unless asked. After any answer that involves a rule, add: Confirm with [OFFICE] before acting. When asked, produce a one-page quick guide for new managers on [TOPICS].',
    verify: 'Test with 5 questions including 1 unanswerable trap, and click every citation.',
  },
  {
    id: 'P19',
    title: 'Personal Learning Roadmap',
    pillar: '4',
    data: 'Green',
    when: 'Learning a new capability deliberately',
    prompt:
      'Act as a personal learning designer. I want to learn [SKILL_OR_SUBJECT] in order to [PURPOSE] within [TIME_FRAME], with [HOURS_PER_WEEK] hours a week. My current level: [LEVEL]. How I learn best: [PREFERENCE]. Constraints: [CONSTRAINTS]. First ask me three questions. Then design a roadmap with milestones, weekly activities, free or low-cost resources, a practice project, and a way to test myself each week. Prefer resources that work on low bandwidth. Mark every resource you are not certain exists as [VERIFY].',
    verify: 'Check that every recommended resource or course actually exists.',
  },
  {
    id: 'P20',
    title: 'Rapid Topic Tutor',
    pillar: '4',
    data: 'Green',
    when: 'Mastering an unfamiliar subject quickly',
    prompt:
      'Teach me [TOPIC] as if I were an intelligent manager who is new to it. Start with a five-sentence overview, then three key concepts with a Nigerian example each. Ask me two questions to check my understanding before going further. Then give me five quiz questions of rising difficulty and correct my answers with explanations. Finally list the three most common misconceptions and what to read or ask an expert next. Where you are unsure, say so.',
    verify: 'Cross-check key facts with an authoritative domain source.',
  },
  {
    id: 'P21',
    title: 'Knowledge Documentation Interview',
    pillar: '4',
    data: 'Amber',
    when: 'Preserving lessons learned over your career',
    prompt:
      'Act as a professional biographer and knowledge manager. I want to preserve what I have learned about [AREA] over [YEARS] years. Interview me one question at a time. Ask for a real case, what I did, what went wrong, what I would do differently, and the rule of thumb I now use. After every three answers write a short lesson card: title, situation, action, result, lesson, and when it applies. Do not include names of private individuals or confidential government details; if I mention any, replace them with a generic description and tell me you did.',
    verify: 'Confirm no classified or identifiable personal data appears before saving.',
  },
  {
    id: 'P22',
    title: 'Skills Discovery Interview',
    pillar: '4',
    data: 'Green',
    when: 'Seeing your transferable value beyond a title',
    prompt:
      'Act as a career analyst. I will describe my career. Interview me for ten minutes, one question at a time, about my responsibilities, projects, results, problems I solved, people I trained or led, tools I use, and the things colleagues ask me for help with. Then produce a Skills and Knowledge Inventory table: skill, evidence (what I did and the result), level 1 to 4, who needs it outside my current organisation, and a possible use. Add the five skills I seem to undervalue most. Use my words; do not exaggerate or invent achievements.',
    verify: 'Verify every achievement is provable and ask a trusted colleague if it fits.',
  },
  {
    id: 'P23',
    title: 'Future Paths & Opportunity Explorer',
    pillar: '4',
    data: 'Green',
    when: 'Exploring meaningful options beyond your post',
    prompt:
      'Using the skills inventory below, help me explore three possible future paths beyond my current job: [THREE_PATH_AREAS]. For each path give: what the work looks like, who needs it, what I already have, what I must learn, one small experiment I can run in 30 days, and the legal, ethical or conflict-of-interest points I must check first, including rules on outside engagement while in service. Do not promise income. Mark claims about Nigerian regulations or markets as [VERIFY]. Inventory: [PASTE_SKILLS_INVENTORY].',
    verify: 'Confirm all in-service rules with HR/Ethics Unit before starting any outside path.',
  },
  {
    id: 'P24',
    title: 'Retirement Transition Roadmap',
    pillar: '4',
    data: 'Green',
    when: 'Designing the non-financial side of your next chapter',
    prompt:
      'Help me plan the non-financial side of my transition from public service in about [YEARS_REMAINING] years. Context: [CONTEXT]. Produce a draft purpose statement; a typical-week design for the first year after service (routine, learning, contribution, rest, relationships); a three-year roadmap with a 12-month and a 90-day action plan; a knowledge-sharing and mentoring plan; wellbeing and community connections; and a list of questions to ask my pension desk, PenCom or a qualified financial adviser about my pension, exit benefits and any other entitlements. Do not give financial, tax or legal advice, and do not estimate amounts. Mark anything that depends on regulations as [VERIFY].',
    verify: 'Confirm every entitlement with PenCom, your pension desk, and qualified professionals.',
  },
];
