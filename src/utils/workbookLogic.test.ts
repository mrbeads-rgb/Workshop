import test from 'node:test';
import assert from 'node:assert/strict';
import { PACK_F_DATA, PROMPTS } from '../data/masterclassData';
import {
  applyPromptPlaceholders,
  buildWorkbookExportText,
  calculateAuditHours,
  calculateE2Score,
  calculateGainLogTotals,
  calculateMasteryProgress,
  calculateOpportunityScore,
  calculatePackFMetrics,
  countWords,
  createInitialState,
  extractPromptPlaceholders,
  filterPrompts,
  formatWorkflowPitch,
  generateContextCardText,
} from './workbookLogic';

test('initial state starts at 0 of 8 milestones completed', () => {
  const state = createInitialState();
  const progress = calculateMasteryProgress(state);
  assert.equal(progress.completed, 0);
  assert.equal(progress.total, 8);
  assert.equal(progress.percentage, 0);
});

test('mastery progress reaches 100% when all 8 milestones are completed', () => {
  const state = createInitialState();
  state.e1Text = 'I am a steady operations leader who mentors junior staff.';
  state.e1Sealed = true;
  for (let id = 1; id <= 8; id++) {
    state.e2Choices[id] = 'Green';
  }
  state.catCard.c = 'Six zones send inconsistent Q3 spreadsheets.';
  state.catCard.a2 = 'Return a KPI table and flag missing items as [CHECK].';
  state.pcc.roles = 'Assistant Director, parent of three';
  state.pcc.goals = 'Deliver Q3 plan early and pass certificate exam';
  state.e5Checked = ['A_0', 'A_1'];
  state.e8Tested = [0, 1, 3];
  state.t9.purpose = 'Mentoring new officers in records management.';
  state.t10.week1 = '1. Save context card 2. Run Sunday Reset 3. Test assistant';

  const progress = calculateMasteryProgress(state);
  assert.equal(progress.completed, 8);
  assert.equal(progress.percentage, 100);
});

test('E2 card sort grades Green, Amber, and Red cards accurately', () => {
  const res = calculateE2Score({
    1: 'Green',
    3: 'Red',
    5: 'Amber',
    9: 'Green', // incorrect (should be Amber)
  });
  assert.equal(res.answered, 4);
  assert.equal(res.correct, 3);
  assert.equal(res.total, 10);
});

test('168-hour audit calculates unaccounted hours and flags over-allocation', () => {
  const normal = calculateAuditHours({
    work: 40,
    commute: 14,
    family: 28,
    study: 8,
    rest: 49,
    leaks: '',
    fixes: '',
  });
  assert.equal(normal.total, 139);
  assert.equal(normal.unaccounted, 29);
  assert.equal(normal.isOver, false);

  const over = calculateAuditHours({
    work: 70,
    commute: 20,
    family: 30,
    study: 10,
    rest: 50,
    leaks: '',
    fixes: '',
  });
  assert.equal(over.total, 180);
  assert.equal(over.unaccounted, -12);
  assert.equal(over.isOver, true);
});

test('context card includes standing safety rule and stays well under 350 words', () => {
  const card = generateContextCardText({
    roles: 'Assistant Director (Planning)',
    goals: 'Pass exams and standardise reporting',
    priorities: 'Q3 plan, exam modules, family evenings',
    constraints: '90-min commute, evening power cuts',
    energy: 'Sharp 5-9 AM',
    style: 'Direct Nigerian English',
  });
  assert.match(card, /Standing rule: Do not ask for/i);
  assert.ok(countWords(card) > 40 && countWords(card) < 350);
});

test('Pack F metrics compute exact completion, utilisation, and turnaround target counts', () => {
  const metrics = calculatePackFMetrics(PACK_F_DATA);
  assert.equal(metrics.totalPlanned, 130);
  assert.equal(metrics.totalCompleted, 100);
  assert.equal(metrics.overallCompletionPct, 76.9);
  assert.equal(metrics.totalReleased, 950);
  assert.equal(metrics.totalUtilised, 841);
  assert.equal(metrics.overallUtilisationPct, 88.5);
  assert.equal(metrics.zonesMeetingTarget, 3);

  const kano = metrics.zones.find((z) => z.zone === 'Kano');
  const lagos = metrics.zones.find((z) => z.zone === 'Lagos');
  assert.equal(kano?.completionPct, 50.0);
  assert.equal(lagos?.utilisationPct, 99.2);
  assert.equal(lagos?.costPerCompleted, 10.8);
});

test('opportunity score clamps to 1..5 bounds and workflow pitch formats cleanly', () => {
  assert.equal(calculateOpportunityScore(5, 4), 20);
  assert.equal(calculateOpportunityScore(9, 0), 5);

  const state = createInitialState();
  const pitch = formatWorkflowPitch(state.t7);
  assert.match(pitch, /Incoming correspondence and memo routing/);
  assert.match(pitch, /human checkpoint/);
});

test('prompt placeholder extraction ignores reserved flags and substitutes custom values', () => {
  const p7 = PROMPTS.find((p) => p.id === 'P7')!;
  const placeholders = extractPromptPlaceholders(p7.prompt);
  assert.ok(placeholders.includes('[MEETING_NAME]'));
  assert.ok(!placeholders.includes('[UNCLEAR]'));

  const filled = applyPromptPlaceholders(p7.prompt, {
    '[MEETING_NAME]': 'Monthly Planning Review',
    '[DATE]': '14 October 2026',
    '[UNCLEAR]': 'SHOULD_NOT_REPLACE',
  });
  assert.match(filled, /Monthly Planning Review/);
  assert.match(filled, /14 October 2026/);
  assert.match(filled, /\[UNCLEAR\]/);
});

test('prompt library filtering works across pillar, data class, search, and saved state', () => {
  assert.equal(PROMPTS.length, 24);
  const p4 = filterPrompts(PROMPTS, '4', 'ALL', '', []);
  assert.equal(p4.length, 6);

  const amberOnly = filterPrompts(PROMPTS, 'ALL', 'Amber', '', []);
  assert.ok(amberOnly.every((p) => p.data === 'Amber'));
  assert.ok(amberOnly.length > 0);

  const searchRes = filterPrompts(PROMPTS, 'ALL', 'ALL', 'retirement', []);
  assert.equal(searchRes.length, 1);
  assert.equal(searchRes[0].id, 'P24');

  const savedRes = filterPrompts(PROMPTS, 'SAVED', 'ALL', '', ['P3', 'P7']);
  assert.equal(savedRes.length, 2);
});

test('gain log totals and workbook export build cleanly', () => {
  const totals = calculateGainLogTotals([
    { task: 'Minutes', before: 60, after: 12, errors: 3 },
    { task: 'Memo', before: 30, after: 10, errors: 1 },
  ]);
  assert.equal(totals.totalMinutesSaved, 68);
  assert.equal(totals.totalErrorsCaught, 4);

  const state = createInitialState();
  state.e1Text = 'Community builder and records steward.';
  state.savedPrompts = ['P3', 'P7'];
  const txt = buildWorkbookExportText(state);
  assert.match(txt, /Community builder and records steward/);
  assert.match(txt, /Saved Prompts: P3, P7/);
});
