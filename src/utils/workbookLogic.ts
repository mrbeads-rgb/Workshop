import {
  E2_CARDS,
  E9_PRESETS,
  T5_PRESETS,
  type DataClass,
  type PackFZone,
  type PromptItem,
} from '../data/masterclassData';

export interface CatalystCardState {
  c: string;
  a1: string;
  t1: string;
  a2: string;
  l: string;
  y: string;
  s: string;
  t2: string;
}

export interface AuditState {
  work: number;
  commute: number;
  family: number;
  study: number;
  rest: number;
  leaks: string;
  fixes: string;
}

export interface ContextCardState {
  roles: string;
  goals: string;
  priorities: string;
  constraints: string;
  energy: string;
  style: string;
}

export interface WeeklyPlanState {
  outcomes: string;
  block: string;
  buffer: number;
  score: string;
}

export interface E6LogRow {
  claim: string;
  source: string;
  rung: string;
  verdict: string;
}

export interface AssistantState {
  name: string;
  role: string;
  context: string;
  standards: string;
  format: string;
  guardrails: string;
  check: string;
}

export interface WorkflowState {
  process: string;
  dataclass: string;
  before: string;
  after: string;
  checkpoint: string;
  measure: string;
}

export interface SkillRow {
  skill: string;
  evidence: string;
  level: string;
  who: string;
  use: string;
}

export interface GainLogRow {
  task: string;
  before: number;
  after: number;
  errors: number;
}

export interface WorkbookState {
  e1Text: string;
  e1Sealed: boolean;
  e2Choices: Record<number, DataClass>;
  catalystStep: number;
  catCard: CatalystCardState;
  t1: AuditState;
  pcc: ContextCardState;
  t3: WeeklyPlanState;
  e5Pack: 'A' | 'A2';
  e5Checked: string[];
  e6Step: 1 | 2 | 3;
  e6Log: E6LogRow[];
  t5: AssistantState;
  e8QuestionIdx: number;
  e8Doc: 'C' | 'D' | 'E';
  e8Tested: number[];
  t6: { impact: number; feas: number };
  t7: WorkflowState;
  t8Skills: SkillRow[];
  t8Lesson: { sit: string; rule: string };
  t9: { purpose: string; paths: string; learning: string; checks: string[] };
  savedPrompts: string[];
  t10: { week1: string; m1: string; partner: string; exitUse: string; exitConf: string };
  gainLog: GainLogRow[];
}

export function createInitialState(): WorkbookState {
  const defaultProcess = 'Incoming correspondence and memo routing';
  const preset = E9_PRESETS[defaultProcess];
  return {
    e1Text: '',
    e1Sealed: false,
    e2Choices: {},
    catalystStep: 0,
    catCard: { c: '', a1: '', t1: '', a2: '', l: '', y: '', s: '', t2: '' },
    t1: { work: 40, commute: 14, family: 28, study: 8, rest: 49, leaks: '', fixes: '' },
    pcc: { roles: '', goals: '', priorities: '', constraints: '', energy: '', style: '' },
    t3: { outcomes: '', block: '', buffer: 20, score: '0' },
    e5Pack: 'A',
    e5Checked: [],
    e6Step: 1,
    e6Log: [
      {
        claim: 'Files must be indexed within 5 working days of opening',
        source: 'Pack C, Clause 1: "within 5 working days"',
        rung: 'Source-check',
        verdict: 'Verified',
      },
      {
        claim: 'Late monthly records returns carry a ₦10,000 fine (ungrounded AI)',
        source: 'Pack C has NO penalty clause',
        rung: 'Source-check',
        verdict: 'Rejected (Hallucination)',
      },
      {
        claim: 'Monthly returns go to Director, Administration by 7th working day',
        source: 'Pack C, Clause 4 matches exactly',
        rung: 'Source-check',
        verdict: 'Verified',
      },
    ],
    t5: { ...T5_PRESETS[0] },
    e8QuestionIdx: 0,
    e8Doc: 'C',
    e8Tested: [0],
    t6: { impact: preset.impact, feas: preset.feas },
    t7: {
      process: defaultProcess,
      dataclass: preset.dataclass,
      before: preset.before,
      after: preset.after,
      checkpoint: preset.checkpoint,
      measure: preset.measure,
    },
    t8Skills: [
      {
        skill: 'Stores Procedure Writing',
        evidence: 'Wrote manual used by ~200 storekeepers across 6 zones',
        level: '4',
        who: 'Cooperatives & SMEs',
        use: 'Practical handbook / training course',
      },
    ],
    t8Lesson: { sit: '', rule: '' },
    t9: { purpose: '', paths: '', learning: '', checks: [] },
    savedPrompts: [],
    t10: { week1: '', m1: '', partner: '', exitUse: '0', exitConf: '0' },
    gainLog: [{ task: 'Notes to action list (Pack A test)', before: 60, after: 12, errors: 3 }],
  };
}

export function calculateMasteryProgress(state: WorkbookState) {
  const milestones = [
    {
      id: 'e1',
      label: 'E1 Title Card',
      done: Boolean(state.e1Sealed || state.e1Text.trim().length > 10),
    },
    {
      id: 'e2',
      label: 'E2 Safety Sort (8+)',
      done: Object.keys(state.e2Choices).length >= 8,
    },
    {
      id: 'e3',
      label: 'E3 CATALYST Card',
      done: state.catCard.c.trim().length > 3 && state.catCard.a2.trim().length > 3,
    },
    {
      id: 't2',
      label: 'T2 Context Card',
      done: state.pcc.roles.trim().length > 3 && state.pcc.goals.trim().length > 3,
    },
    {
      id: 'e5',
      label: 'E5 Ambiguities (2+)',
      done: state.e5Checked.length >= 2,
    },
    {
      id: 'e8',
      label: 'E8 Notebook Q&A (3+)',
      done: state.e8Tested.length >= 3,
    },
    {
      id: 't8',
      label: 'T8/T9 Future Plan',
      done: state.t8Skills.length >= 2 || state.t9.purpose.trim().length > 5,
    },
    {
      id: 't10',
      label: 'T10 90-Day Pledge',
      done: state.t10.week1.trim().length > 5,
    },
  ];
  const completed = milestones.filter((m) => m.done).length;
  const total = milestones.length;
  const percentage = Math.round((completed / total) * 100);
  return { completed, total, percentage, milestones };
}

export function calculateE2Score(choices: Record<number, DataClass>) {
  let correct = 0;
  let answered = 0;
  for (const card of E2_CARDS) {
    const picked = choices[card.id];
    if (picked) {
      answered++;
      if (picked === card.answer) correct++;
    }
  }
  return { correct, answered, total: E2_CARDS.length };
}

export function calculateAuditHours(t1: AuditState) {
  const safe = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);
  const work = safe(t1.work);
  const commute = safe(t1.commute);
  const family = safe(t1.family);
  const study = safe(t1.study);
  const rest = safe(t1.rest);
  const total = work + commute + family + study + rest;
  const unaccounted = Math.round((168 - total) * 10) / 10;
  const denom = Math.max(168, total);
  return {
    total,
    unaccounted,
    isOver: unaccounted < 0,
    percentages: {
      work: Math.min(100, (work / denom) * 100),
      commute: Math.min(100, (commute / denom) * 100),
      family: Math.min(100, (family / denom) * 100),
      study: Math.min(100, (study / denom) * 100),
      rest: Math.min(100, (rest / denom) * 100),
    },
  };
}

export function generateContextCardText(pcc: ContextCardState): string {
  return [
    'PERSONAL CONTEXT CARD',
    `• Who I am & Roles: ${pcc.roles.trim() || '[Fill your roles]'}`,
    `• 12-Month Goals: ${pcc.goals.trim() || '[Fill your 12-month goals]'}`,
    `• Quarter Top 3 Priorities: ${pcc.priorities.trim() || '[Fill top 3 priorities]'}`,
    `• Constraints: ${pcc.constraints.trim() || '[Commute, power, hours, device]'}`,
    `• Energy & Non-Negotiables: ${pcc.energy.trim() || '[Peak hours & protected family time]'}`,
    `• Response Style: ${pcc.style.trim() || '[Tone, length, challenge level]'}`,
    '• Standing rule: Do not ask for, and warn me if I share, confidential government information, personal data about other people, passwords, or account details.',
  ].join('\n');
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function generateChiefOfStaffInstruction(pcc: ContextCardState): string {
  return `You are my Chief of Staff. At the start of every chat, read my Personal Context Card below. Be direct and brief. Ask one question at a time when you need information. Never invent facts about my schedule. When I say Sunday Reset, plan my week; when I say Friday Review, run my weekly review.\n\n${generateContextCardText(pcc)}`;
}

export function calculatePackFMetrics(zones: PackFZone[]) {
  const enriched = zones.map((z) => {
    const completionPct = Number(((z.completed / z.planned) * 100).toFixed(1));
    const utilisationPct = Number(((z.utilised / z.released) * 100).toFixed(1));
    const costPerCompleted = Number((z.utilised / Math.max(1, z.completed)).toFixed(1));
    const deltaFromQ2 = Number((completionPct - z.q2).toFixed(1));
    return { ...z, completionPct, utilisationPct, costPerCompleted, deltaFromQ2 };
  });

  const totalPlanned = zones.reduce((s, z) => s + z.planned, 0);
  const totalCompleted = zones.reduce((s, z) => s + z.completed, 0);
  const totalReleased = zones.reduce((s, z) => s + z.released, 0);
  const totalUtilised = zones.reduce((s, z) => s + z.utilised, 0);
  const zonesMeetingTarget = zones.filter((z) => z.turnaround <= 5.0).length;

  return {
    zones: enriched,
    totalPlanned,
    totalCompleted,
    overallCompletionPct: Number(((totalCompleted / totalPlanned) * 100).toFixed(1)),
    totalReleased,
    totalUtilised,
    overallUtilisationPct: Number(((totalUtilised / totalReleased) * 100).toFixed(1)),
    zonesMeetingTarget,
    totalZones: zones.length,
  };
}

export function calculateOpportunityScore(impact: number, feas: number): number {
  const clampedImpact = Math.min(5, Math.max(1, Math.round(impact) || 1));
  const clampedFeas = Math.min(5, Math.max(1, Math.round(feas) || 1));
  return clampedImpact * clampedFeas;
}

export function formatWorkflowPitch(t7: WorkflowState): string {
  return `"We will move ${t7.process} from ${t7.before} to ${t7.after}, with a human checkpoint where ${t7.checkpoint}, needing ${t7.dataclass}, measured by ${t7.measure}."`;
}

const RESERVED_FLAGS = new Set(['[MISSING]', '[UNCLEAR]', '[CHECK]', '[VERIFY]']);

export function extractPromptPlaceholders(template: string): string[] {
  const matches = template.match(/\[([A-Z0-9_]+)\]/g) || [];
  return Array.from(new Set(matches.filter((token) => !RESERVED_FLAGS.has(token))));
}

export function applyPromptPlaceholders(template: string, values: Record<string, string>): string {
  let result = template;
  for (const [token, rawValue] of Object.entries(values)) {
    const clean = rawValue.trim();
    if (clean && !RESERVED_FLAGS.has(token)) {
      result = result.split(token).join(clean);
    }
  }
  return result;
}

export function filterPrompts(
  prompts: PromptItem[],
  pillar: 'ALL' | '1' | '2' | '3' | '4' | 'SAVED',
  dataFilter: 'ALL' | 'Green' | 'Amber',
  search: string,
  savedIds: string[]
): PromptItem[] {
  const q = search.toLowerCase().trim();
  return prompts.filter((p) => {
    if (pillar === 'SAVED') {
      if (!savedIds.includes(p.id)) return false;
    } else if (pillar !== 'ALL' && p.pillar !== pillar) {
      return false;
    }
    if (dataFilter !== 'ALL' && p.data !== dataFilter) return false;
    if (q && !`${p.id} ${p.title} ${p.when} ${p.prompt}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function calculateGainLogTotals(entries: GainLogRow[]) {
  let totalMinutesSaved = 0;
  let totalErrorsCaught = 0;
  for (const row of entries) {
    totalMinutesSaved += Math.max(0, row.before - row.after);
    totalErrorsCaught += Math.max(0, row.errors);
  }
  return { totalMinutesSaved, totalErrorsCaught };
}

export function buildWorkbookExportText(state: WorkbookState): string {
  const pccOut = generateContextCardText(state.pcc);
  const pitchOut = formatWorkflowPitch(state.t7);
  const gainTotals = calculateGainLogTotals(state.gainLog);

  return [
    'THE AI-POWERED PRODUCTIVE LIFE — PERSONAL WORKBOOK EXPORT',
    '========================================================',
    '',
    `1. TITLE CARD (E1): ${state.e1Text.trim() || '[Not yet filled]'}`,
    '',
    '2. CATALYST CARD (E3):',
    `   C - Clarify: ${state.catCard.c || '[Not filled]'}`,
    `   A - Assess AI & Data: ${state.catCard.a1 || '[Not filled]'}`,
    `   T - Tell Context: ${state.catCard.t1 || '[Not filled]'}`,
    `   A - Ask Precisely: ${state.catCard.a2 || '[Not filled]'}`,
    `   L - Loop: ${state.catCard.l || '[Not filled]'}`,
    `   Y - Your Judgement: ${state.catCard.y || '[Not filled]'}`,
    `   S - Systemise: ${state.catCard.s || '[Not filled]'}`,
    `   T - Track Gain: ${state.catCard.t2 || '[Not filled]'}`,
    '',
    '3. PERSONAL CONTEXT CARD (T2):',
    pccOut,
    '',
    '4. WEEKLY PLANNER (T3):',
    `Outcomes:\n${state.t3.outcomes || '[Not filled]'}`,
    `Deep-Work Block & Delegations:\n${state.t3.block || '[Not filled]'}`,
    `Buffer Reserved: ${state.t3.buffer}% · Friday Score: ${state.t3.score}/5`,
    '',
    '5. PROFESSIONAL ASSISTANT INSTRUCTION CARD (T5):',
    `Role: ${state.t5.role}`,
    `Context: ${state.t5.context}`,
    `Standards: ${state.t5.standards}`,
    `Format: ${state.t5.format}`,
    `Guardrails: ${state.t5.guardrails}`,
    `Check: ${state.t5.check}`,
    '',
    '6. DEPARTMENTAL WORKFLOW REDESIGN (T6 & T7):',
    `Opportunity Score: ${calculateOpportunityScore(state.t6.impact, state.t6.feas)}/25`,
    pitchOut,
    '',
    '7. SKILLS INVENTORY & FUTURE PLAN (T8 & T9):',
    `Purpose: ${state.t9.purpose || '[Not filled]'}`,
    `Skills: ${state.t8Skills.map((s) => `${s.skill} (${s.evidence})`).join(' | ')}`,
    `Career Rule of Thumb: ${state.t8Lesson.rule || '[Not filled]'}`,
    '',
    '8. 90-DAY PLEDGE (T10), SAVED PROMPTS (T4) & GAIN LOG:',
    `First 3 Actions:\n${state.t10.week1 || '[Not filled]'}`,
    `Month 1-3 Goals:\n${state.t10.m1 || '[Not filled]'}`,
    `Accountability Partner:\n${state.t10.partner || '[Not filled]'}`,
    `Saved Prompts: ${state.savedPrompts.join(', ') || 'None yet'}`,
    `AI Gain Log Totals: ${gainTotals.totalMinutesSaved} minutes saved · ${gainTotals.totalErrorsCaught} errors caught`,
  ].join('\n');
}
