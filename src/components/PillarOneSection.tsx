import { useState } from 'react';
import { Copy, Sparkles } from 'lucide-react';
import {
  calculateAuditHours,
  countWords,
  generateChiefOfStaffInstruction,
  generateContextCardText,
  type AuditState,
  type ContextCardState,
  type WeeklyPlanState,
} from '../utils/workbookLogic';
import { copyToClipboard } from '../utils/browserHelpers';
import {
  BTN_PRIMARY,
  BTN_SECONDARY,
  CardHeaderBar,
  FIELD_LABEL_CLASSES,
  INPUT_CLASSES,
  SectionHeader,
  TEXTAREA_CLASSES,
} from './DossierPrimitives';

interface PillarOneSectionProps {
  t1: AuditState;
  onUpdateT1: (patch: Partial<AuditState>) => void;
  pcc: ContextCardState;
  onUpdatePcc: (patch: Partial<ContextCardState>) => void;
  t3: WeeklyPlanState;
  onUpdateT3: (patch: Partial<WeeklyPlanState>) => void;
}

export function PillarOneSection({
  t1,
  onUpdateT1,
  pcc,
  onUpdatePcc,
  t3,
  onUpdateT3,
}: PillarOneSectionProps) {
  const [pccCopyStatus, setPccCopyStatus] = useState('');

  const audit = calculateAuditHours(t1);
  const contextCardText = generateContextCardText(pcc);
  const wordCount = countWords(contextCardText);

  const loadAminaAudit = () => {
    onUpdateT1({
      work: 40,
      commute: 14,
      family: 26,
      study: 8,
      rest: 49,
      leaks:
        'Time leaks: meetings without agendas; late-night report writing.\nAttention leaks: checking WhatsApp ~6x/hr (~70 min/day); weekend errands.',
      fixes:
        "Non-negotiables: Friday family dinner, children's school events.\nFixes: two 20-min message windows; 5:30 AM study block; no weekend work.",
    });
  };

  const loadAminaContextCard = () => {
    onUpdatePcc({
      roles:
        'Assistant Director (Planning & Statistics), mother of three, part-time professional student, community association treasurer',
      goals:
        'Pass professional certificate exams (in 4 months), deliver departmental annual plan on time, exercise 3x/week, stop weekend work',
      priorities:
        '1. Standardise Q3 zonal reporting; 2. Complete exam revision modules; 3. Protect family evenings twice a week',
      constraints: '8:00–4:00 work hours, 75–90 min commute each way, evening power cuts, husband works shifts',
      energy: 'Best focus 5:00–9:00 AM, lowest after 8:00 PM. Non-negotiables: Friday family dinner & school events',
      style: 'Direct, short bullets, Nigerian English, ask one question at a time, flag all schedule assumptions',
    });
  };

  const handleCopyCard = async (mode: 'card' | 'assistant') => {
    const payload =
      mode === 'assistant' ? generateChiefOfStaffInstruction(pcc) : contextCardText;
    const ok = await copyToClipboard(payload);
    setPccCopyStatus(
      ok
        ? mode === 'assistant'
          ? 'Chief of Staff system instruction copied.'
          : 'Personal Context Card copied.'
        : 'Select text manually to copy.'
    );
    setTimeout(() => setPccCopyStatus(''), 3500);
  };

  const numChange = (field: 'work' | 'commute' | 'family' | 'study' | 'rest', raw: string) => {
    const parsed = parseFloat(raw);
    onUpdateT1({ [field]: Number.isFinite(parsed) ? Math.max(0, parsed) : 0 });
  };

  return (
    <section id="sec-pillar1" className="scroll-mt-6 mb-20">
      <SectionHeader
        sectionCode="Pillar 1 · Self"
        meta="Workbook T1, T2 & T3 · Section 02"
        duration="70 Min Block"
        title="Your Personal Chief of Staff: Audit, Context Card & Weekly Rhythm"
        standfirst="Audit before you optimise. Most busy managers try to fix a schedule they have never measured—and re-explain their life story at the start of every chat."
      />

      {/* Workbook T1: Personal Productivity Audit */}
      <article className="bg-surface border border-rule rounded-md p-6 mb-8">
        <CardHeaderBar
          kicker="Workbook T1"
          meta="Personal Productivity Audit · 168-Hour Snapshot"
          rightSlot={
            <button type="button" onClick={loadAminaAudit} className={BTN_SECONDARY}>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Load Worked Example (Mrs Amina Yusuf)</span>
            </button>
          }
        />
        <p className="text-sm text-ink-muted mb-5">
          Adjust your honest weekly hours below to see where your 168 hours go, then name your top
          time leaks, attention leaks, and non-negotiables.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          <div>
            <label htmlFor="t1-work" className={FIELD_LABEL_CLASSES}>
              Paid Work (hrs/wk)
            </label>
            <input
              id="t1-work"
              type="number"
              min={0}
              max={100}
              value={t1.work}
              onChange={(e) => numChange('work', e.target.value)}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t1-commute" className={FIELD_LABEL_CLASSES}>
              Commute (hrs/wk)
            </label>
            <input
              id="t1-commute"
              type="number"
              min={0}
              max={40}
              value={t1.commute}
              onChange={(e) => numChange('commute', e.target.value)}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t1-family" className={FIELD_LABEL_CLASSES}>
              Family &amp; Home (hrs/wk)
            </label>
            <input
              id="t1-family"
              type="number"
              min={0}
              max={60}
              value={t1.family}
              onChange={(e) => numChange('family', e.target.value)}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t1-study" className={FIELD_LABEL_CLASSES}>
              Study / Community (hrs/wk)
            </label>
            <input
              id="t1-study"
              type="number"
              min={0}
              max={40}
              value={t1.study}
              onChange={(e) => numChange('study', e.target.value)}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t1-rest" className={FIELD_LABEL_CLASSES}>
              Sleep &amp; Rest (hrs/wk)
            </label>
            <input
              id="t1-rest"
              type="number"
              min={0}
              max={80}
              value={t1.rest}
              onChange={(e) => numChange('rest', e.target.value)}
              className={INPUT_CLASSES}
            />
          </div>
          <div className="bg-paper border border-rule rounded p-3.5 flex flex-col justify-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Unaccounted Hours
            </span>
            <div
              data-testid="t1-unaccounted"
              className={`font-serif text-xl font-semibold tabular-nums ${
                audit.isOver ? 'text-crimson' : 'text-ink'
              }`}
            >
              {audit.unaccounted} hrs / 168 hrs
            </div>
            <span className="text-xs text-ink-muted">
              {audit.isOver
                ? 'Over 168 hours—some commitments overlap or need trimming'
                : 'Unstructured, transitional, or attention-leak hours'}
            </span>
          </div>
        </div>

        {/* Stacked Distribution Bar + Legend */}
        <div
          className="flex h-4 rounded-[2px] overflow-hidden bg-stone-deep mb-2"
          aria-label="Weekly hours distribution"
        >
          <div
            className="h-full bg-[#1f4e5f]"
            style={{ width: `${audit.percentages.work}%` }}
            title={`Paid Work: ${t1.work} hrs`}
          />
          <div
            className="h-full bg-[#d99000]"
            style={{ width: `${audit.percentages.commute}%` }}
            title={`Commute: ${t1.commute} hrs`}
          />
          <div
            className="h-full bg-[#2b6e52]"
            style={{ width: `${audit.percentages.family}%` }}
            title={`Family & Home: ${t1.family} hrs`}
          />
          <div
            className="h-full bg-[#b84a39]"
            style={{ width: `${audit.percentages.study}%` }}
            title={`Study / Community: ${t1.study} hrs`}
          />
          <div
            className="h-full bg-[#1f4e5f]/55"
            style={{ width: `${audit.percentages.rest}%` }}
            title={`Sleep & Rest: ${t1.rest} hrs`}
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-ink-muted mb-5 tabular-nums">
          <span>Work {t1.work}h</span>
          <span>· Commute {t1.commute}h</span>
          <span>· Family {t1.family}h</span>
          <span>· Study {t1.study}h</span>
          <span>· Rest {t1.rest}h</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="t1-leaks" className={FIELD_LABEL_CLASSES}>
              Top Time &amp; Attention Leaks
            </label>
            <textarea
              id="t1-leaks"
              value={t1.leaks}
              onChange={(e) => onUpdateT1({ leaks: e.target.value })}
              placeholder="e.g. Checking WhatsApp 6x/hr (~70 min/day); meetings without agendas; late-night drafting"
              className={TEXTAREA_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t1-fixes" className={FIELD_LABEL_CLASSES}>
              Non-Negotiables &amp; Stop / Batch / Delegate Fixes
            </label>
            <textarea
              id="t1-fixes"
              value={t1.fixes}
              onChange={(e) => onUpdateT1({ fixes: e.target.value })}
              placeholder="e.g. Friday family dinner; two 20-min message windows; protected 7:30–9:00 deep-work block"
              className={TEXTAREA_CLASSES}
            />
          </div>
        </div>
      </article>

      {/* Studio T2 + Workbook T3 */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6 items-start">
        {/* Studio T2: Personal Context Card Generator */}
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar
            kicker="Studio T2"
            meta="Personal Context Card Generator · Target < 350 Words"
            rightSlot={
              <span
                data-testid="pcc-word-count"
                className={`font-mono text-xs font-semibold tabular-nums px-2 py-0.5 rounded-[2px] ${
                  wordCount <= 350
                    ? 'bg-forest-soft text-forest'
                    : 'bg-ochre-soft text-ochre'
                }`}
              >
                {wordCount} / 350 words
              </span>
            }
          />
          <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
            Build Your Reusable Personal Operating System
          </h3>
          <p className="text-sm text-ink-muted mb-4">
            Enter your non-sensitive personal briefing once. Paste the generated card into a Gemini
            Gem, ChatGPT Project, Claude Project, or your phone&apos;s notes app.
          </p>

          <div className="mb-4">
            <button type="button" onClick={loadAminaContextCard} className={BTN_SECONDARY}>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Pre-fill Example (Mrs Amina Yusuf)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label htmlFor="pcc-roles" className={FIELD_LABEL_CLASSES}>
                Who I Am &amp; My Roles
              </label>
              <input
                id="pcc-roles"
                type="text"
                value={pcc.roles}
                onChange={(e) => onUpdatePcc({ roles: e.target.value })}
                placeholder="e.g. Assistant Director, parent of three, part-time student"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="pcc-goals" className={FIELD_LABEL_CLASSES}>
                12-Month Goals
              </label>
              <input
                id="pcc-goals"
                type="text"
                value={pcc.goals}
                onChange={(e) => onUpdatePcc({ goals: e.target.value })}
                placeholder="e.g. Pass professional exam, deliver annual plan early, exercise 3x/wk"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="pcc-priorities" className={FIELD_LABEL_CLASSES}>
                This Quarter&apos;s Top 3 Priorities
              </label>
              <input
                id="pcc-priorities"
                type="text"
                value={pcc.priorities}
                onChange={(e) => onUpdatePcc({ priorities: e.target.value })}
                placeholder="e.g. Q3 report process; certificate modules 1–4; zero weekend work"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="pcc-constraints" className={FIELD_LABEL_CLASSES}>
                Real-World Constraints
              </label>
              <input
                id="pcc-constraints"
                type="text"
                value={pcc.constraints}
                onChange={(e) => onUpdatePcc({ constraints: e.target.value })}
                placeholder="e.g. 90-min commute each way, evening power cuts, phone-first"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="pcc-energy" className={FIELD_LABEL_CLASSES}>
                Energy Peak &amp; Non-Negotiables
              </label>
              <input
                id="pcc-energy"
                type="text"
                value={pcc.energy}
                onChange={(e) => onUpdatePcc({ energy: e.target.value })}
                placeholder="e.g. Sharpest 5:30–9:00 AM; lowest after 8 PM; Friday family dinner"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="pcc-style" className={FIELD_LABEL_CLASSES}>
                How AI Must Respond
              </label>
              <input
                id="pcc-style"
                type="text"
                value={pcc.style}
                onChange={(e) => onUpdatePcc({ style: e.target.value })}
                placeholder="e.g. Direct, concise, Nigerian English, ask one question at a time"
                className={INPUT_CLASSES}
              />
            </div>
          </div>

          <div className="mb-4">
            <span className={FIELD_LABEL_CLASSES}>
              Live Generated Personal Context Card (Includes Standing Data Rule)
            </span>
            <div
              data-testid="pcc-output"
              className="bg-paper border border-rule rounded p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink"
            >
              {contextCardText}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleCopyCard('card')}
              className={BTN_PRIMARY}
            >
              <Copy className="w-4 h-4" aria-hidden="true" />
              <span>Copy Context Card</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopyCard('assistant')}
              className={BTN_SECONDARY}
            >
              <Copy className="w-4 h-4" aria-hidden="true" />
              <span>Copy Chief of Staff Instruction</span>
            </button>
          </div>

          {pccCopyStatus && (
            <p className="font-mono text-xs font-semibold text-forest mt-3" role="status">
              {pccCopyStatus}
            </p>
          )}
        </article>

        {/* Workbook T3: Weekly Planning */}
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar kicker="Workbook T3" meta="Sunday Reset & Friday Review" />
          <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
            Next Week&apos;s Priority Blueprint
          </h3>
          <p className="text-sm text-ink-muted mb-4">
            Run Prompt P3 every Sunday (10 minutes) and P4 every Friday (5 minutes). Anchor your
            week around outcomes, not busyness.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="t3-outcomes" className={FIELD_LABEL_CLASSES}>
                Three Outcomes That Make Next Week a Success
              </label>
              <textarea
                id="t3-outcomes"
                value={t3.outcomes}
                onChange={(e) => onUpdateT3({ outcomes: e.target.value })}
                placeholder={'1. Submit Q3 report draft by Thursday\n2. Complete two early-morning study blocks\n3. Clear memo backlog before Friday 2 PM'}
                className={TEXTAREA_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="t3-block" className={FIELD_LABEL_CLASSES}>
                Protected Deep-Work Block &amp; Delegations
              </label>
              <textarea
                id="t3-block"
                value={t3.block}
                onChange={(e) => onUpdateT3({ block: e.target.value })}
                placeholder="Block: Tue & Thu 5:30–6:30 AM study; Wed 10:00–11:30 drafting. Delegate: Eze to follow up Kano & Enugu returns by Tuesday."
                className={TEXTAREA_CLASSES}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="t3-buffer" className={FIELD_LABEL_CLASSES}>
                  Buffer Time Reserved (%)
                </label>
                <input
                  id="t3-buffer"
                  type="number"
                  min={0}
                  max={50}
                  value={t3.buffer}
                  onChange={(e) =>
                    onUpdateT3({ buffer: Math.max(0, Math.min(50, parseFloat(e.target.value) || 0)) })
                  }
                  className={INPUT_CLASSES}
                />
              </div>
              <div>
                <label htmlFor="t3-score" className={FIELD_LABEL_CLASSES}>
                  Friday Week Score (1–5)
                </label>
                <select
                  id="t3-score"
                  value={t3.score}
                  onChange={(e) => onUpdateT3({ score: e.target.value })}
                  className={INPUT_CLASSES}
                >
                  <option value="0">Pending Friday review</option>
                  <option value="1">1 — Overwhelmed</option>
                  <option value="2">2 — Reactive</option>
                  <option value="3">3 — Steady</option>
                  <option value="4">4 — Focused</option>
                  <option value="5">5 — Designed &amp; Calm</option>
                </select>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
