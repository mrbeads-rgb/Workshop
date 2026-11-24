import { useRef, useState } from 'react';
import { Copy, FileText, BookOpen } from 'lucide-react';
import {
  E8_DOCS,
  E8_QUESTIONS,
  E9_PRESETS,
  PACK_F_DATA,
} from '../data/masterclassData';
import {
  calculateOpportunityScore,
  calculatePackFMetrics,
  formatWorkflowPitch,
  type WorkflowState,
} from '../utils/workbookLogic';
import { copyToClipboard } from '../utils/browserHelpers';
import { PackFChart } from './PackFChart';
import {
  BTN_ACTIVE,
  BTN_SECONDARY,
  CardHeaderBar,
  FIELD_LABEL_CLASSES,
  INPUT_CLASSES,
  SectionHeader,
} from './DossierPrimitives';

interface PillarThreeSectionProps {
  e8QuestionIdx: number;
  e8Doc: 'C' | 'D' | 'E';
  onSelectE8Question: (idx: number) => void;
  onSelectE8Doc: (doc: 'C' | 'D' | 'E') => void;
  t6: { impact: number; feas: number };
  onUpdateT6: (patch: { impact?: number; feas?: number }) => void;
  t7: WorkflowState;
  onUpdateT7: (next: WorkflowState) => void;
}

export function PillarThreeSection({
  e8QuestionIdx,
  e8Doc,
  onSelectE8Question,
  onSelectE8Doc,
  t6,
  onUpdateT6,
  t7,
  onUpdateT7,
}: PillarThreeSectionProps) {
  const [highlightedClause, setHighlightedClause] = useState<string | null>(
    E8_QUESTIONS[e8QuestionIdx]?.clause ?? 'D1'
  );
  const [showBrief, setShowBrief] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const docViewerRef = useRef<HTMLDivElement>(null);

  const activeQuestion = E8_QUESTIONS[e8QuestionIdx] ?? E8_QUESTIONS[0];
  const activeDoc = E8_DOCS[e8Doc] ?? E8_DOCS.C;
  const packF = calculatePackFMetrics(PACK_F_DATA);
  const oppScore = calculateOpportunityScore(t6.impact, t6.feas);
  const pitch = formatWorkflowPitch(t7);

  const handleSelectQuestion = (idx: number) => {
    const q = E8_QUESTIONS[idx];
    onSelectE8Question(idx);
    if (q) {
      onSelectE8Doc(q.doc);
      setHighlightedClause(q.clause);
    }
  };

  const handleVerifyCitation = (docKey: 'C' | 'D' | 'E', clauseId: string) => {
    onSelectE8Doc(docKey);
    setHighlightedClause(clauseId);
    setTimeout(() => {
      const container = docViewerRef.current;
      const target = container?.querySelector(`[data-clause="${clauseId}"]`);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 30);
  };

  const handleProcessChange = (processName: string) => {
    const preset = E9_PRESETS[processName];
    if (preset) {
      onUpdateT6({ impact: preset.impact, feas: preset.feas });
      onUpdateT7({
        process: processName,
        dataclass: preset.dataclass,
        before: preset.before,
        after: preset.after,
        checkpoint: preset.checkpoint,
        measure: preset.measure,
      });
    } else {
      onUpdateT7({ ...t7, process: processName });
    }
  };

  const handleCopyWorkflow = async () => {
    const txt = `OPPORTUNITY SCORE (T6): ${oppScore}/25\nWORKFLOW PITCH (T7): ${pitch}`;
    const ok = await copyToClipboard(txt);
    setCopyStatus(ok ? 'Workflow pitch & T6/T7 design copied.' : 'Select text manually to copy.');
    setTimeout(() => setCopyStatus(''), 3500);
  };

  return (
    <section id="sec-pillar3" className="scroll-mt-6 mb-20">
      <SectionHeader
        sectionCode="Pillar 3 · Team & Department"
        meta="Grounded Notebooks, Performance Intelligence & Workflow Redesign · Section 04"
        duration="80 Min Block"
        title="Organisational Intelligence: Knowledge Grounding, KPIs & Process Redesign"
        standfirst="Managers spend enormous energy moving information between people. Systems can carry the chasing; managers carry the judgement—within clear institutional governance."
      />

      {/* Three Access Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-surface border border-rule border-t-[3px] border-t-forest rounded-md p-5">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-forest mb-1.5">
            Tier 1 · Individual, Free, Today
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-1.5">
            Personal Accounts (Green Data)
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            ChatGPT, Claude, Gemini free plans, NotebookLM / Gemini Notebook, Gamma &amp; Canva
            free. Build and practise here with fictional or public data.
          </p>
        </div>

        <div className="bg-surface border border-rule border-t-[3px] border-t-ochre rounded-md p-5">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-ochre mb-1.5">
            Tier 2 · Individual, Paid (Optional)
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-1.5">
            Higher Limits, Same Safety Rules
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            Never required for this programme. Custom GPT sharing or higher daily caps remain
            personal accounts—still no Red institutional records.
          </p>
        </div>

        <div className="bg-surface border border-rule border-t-[3px] border-t-slate-teal rounded-md p-5">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal mb-1.5">
            Tier 3 · Institutional &amp; Approved
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-1.5">
            Management, IT &amp; DPO Sign-Off
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            Microsoft 365 Copilot, Power Automate / AppSheet on agency data, or approved platforms
            like Service-Wise GPT. Propose here; never deploy solo.
          </p>
        </div>
      </div>

      {/* Lab E8: Grounded Policy Q&A Notebook Simulator */}
      <article className="bg-surface border border-rule rounded-md p-6 mb-8">
        <CardHeaderBar
          kicker="Lab E8"
          meta="Ask Your Documents · NotebookLM / Gemini Notebook Simulator"
          rightSlot={
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest">
              Packs C, D &amp; E Loaded
            </span>
          }
        />

        <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
          Grounded Policy Q&amp;A: Click Any Question, Then Verify the Citation
        </h3>
        <p className="text-sm text-ink-muted mb-5">
          Unlike general chat, a grounded notebook answers <em>only</em> from the uploaded document
          pack and links every rule to its source clause. Click a question on the left to inspect
          the cited answer and highlight the exact source passage on the right.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Questions + Grounded Answer */}
          <div>
            <span className={FIELD_LABEL_CLASSES}>Test Questions (Including Traps)</span>
            <div className="flex flex-col gap-2 mb-4">
              {E8_QUESTIONS.map((item, idx) => {
                const active = idx === e8QuestionIdx;
                return (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => handleSelectQuestion(idx)}
                    className={`flex items-start gap-2.5 text-left min-h-[44px] px-3.5 py-2.5 rounded border text-sm font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-slate-teal text-paper border-slate-teal'
                        : 'bg-surface text-ink border-rule-strong hover:bg-stone-tint'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-semibold shrink-0 mt-0.5 ${
                        active ? 'text-accent-gold' : 'text-slate-teal'
                      }`}
                    >
                      Q{idx + 1}
                    </span>
                    <span>
                      {item.q}
                      {item.isTrap && (
                        <span
                          className={`ml-2 font-mono text-[11px] uppercase ${
                            active ? 'text-accent-gold' : 'text-ochre'
                          }`}
                        >
                          (Trap)
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              data-testid="e8-answer-box"
              className="bg-paper border border-rule border-t-[1.5px] border-t-slate-teal rounded-md p-4"
            >
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal mb-2">
                Notebook Grounded Answer
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap text-ink mb-3">
                {activeQuestion.ans}
              </div>
              <button
                type="button"
                onClick={() => handleVerifyCitation(activeQuestion.doc, activeQuestion.clause)}
                className={BTN_SECONDARY}
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>
                  Verify Citation in Pack {activeQuestion.doc} ({activeQuestion.clause})
                </span>
              </button>
            </div>
          </div>

          {/* Document Pack Viewer */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label="Source packs">
              {(['C', 'D', 'E'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={e8Doc === key}
                  onClick={() => {
                    onSelectE8Doc(key);
                    setHighlightedClause(null);
                  }}
                  className={e8Doc === key ? BTN_ACTIVE : BTN_SECONDARY}
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>{E8_DOCS[key].shortLabel}</span>
                </button>
              ))}
            </div>

            <div
              ref={docViewerRef}
              className="max-h-[420px] overflow-y-auto bg-paper border border-rule rounded-md p-4"
            >
              <div className="font-serif font-semibold text-base text-slate-teal mb-3 pb-2 border-b border-rule">
                {activeDoc.title}
              </div>
              <div className="space-y-2">
                {activeDoc.clauses.map((clause) => {
                  const isHit = highlightedClause === clause.id;
                  return (
                    <div
                      key={clause.id}
                      data-clause={clause.id}
                      data-highlighted={isHit ? 'true' : 'false'}
                      className={`p-2.5 rounded text-sm leading-relaxed transition-colors ${
                        isHit
                          ? 'bg-accent-gold text-ink font-semibold'
                          : 'text-ink hover:bg-stone-tint/60'
                      }`}
                    >
                      {clause.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Lab D7: Q3 Performance Data Explorer (Pack F) */}
      <article className="bg-surface border border-rule rounded-md p-6 mb-8">
        <CardHeaderBar
          kicker="Lab D7 · Pack F"
          meta="Performance Intelligence · Q3 Six-Zone Data"
          rightSlot={
            <button
              type="button"
              onClick={() => setShowBrief((v) => !v)}
              className={showBrief ? BTN_ACTIVE : BTN_SECONDARY}
            >
              {showBrief ? 'Hide Management Brief' : 'Show Management Brief & 3 DG Questions'}
            </button>
          }
        />

        <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
          From Raw Zonal Table to Executive Decision Brief
        </h3>
        <p className="text-sm text-ink-muted mb-5">
          Target turnaround is 5.0 days or fewer. Inspect how AI computes rates, exposes Kano as the
          overall outlier and Lagos as high-spend/low-completion, and flags what the Director
          General will ask next.
        </p>

        {/* Headline KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-paper border border-rule rounded-md p-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Overall Completion
            </span>
            <div className="font-serif text-3xl font-semibold text-slate-teal tabular-nums mt-1">
              {packF.overallCompletionPct}%
            </div>
            <span className="text-xs text-ink-muted tabular-nums">
              {packF.totalCompleted} completed of {packF.totalPlanned} planned
            </span>
          </div>
          <div className="bg-paper border border-rule rounded-md p-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Budget Utilisation
            </span>
            <div className="font-serif text-3xl font-semibold text-slate-teal tabular-nums mt-1">
              {packF.overallUtilisationPct}%
            </div>
            <span className="text-xs text-ink-muted tabular-nums">
              ₦{packF.totalUtilised}m utilised of ₦{packF.totalReleased}m released
            </span>
          </div>
          <div className="bg-paper border border-rule rounded-md p-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Zones Meeting ≤ 5d Target
            </span>
            <div className="font-serif text-3xl font-semibold text-crimson tabular-nums mt-1">
              {packF.zonesMeetingTarget} of {packF.totalZones}
            </div>
            <span className="text-xs text-ink-muted">Abuja, Ibadan, Port Harcourt (5.0d)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-6 items-start">
          <div className="overflow-x-auto border border-rule rounded-md bg-surface">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-tint border-b-[1.5px] border-ink text-left">
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2.5 whitespace-nowrap">Zone</th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2.5 text-right whitespace-nowrap">
                    Planned
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2.5 text-right whitespace-nowrap">
                    Done (%)
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2.5 text-right whitespace-nowrap">
                    Utilised (%)
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2.5 text-right whitespace-nowrap">
                    Turnaround
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2.5 text-right whitespace-nowrap">
                    Q2 %
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {packF.zones.map((z) => {
                  const rowBg =
                    z.status === 'alert'
                      ? 'bg-crimson-soft/75'
                      : z.zone === 'Lagos'
                        ? 'bg-ochre-soft/60'
                        : '';
                  return (
                    <tr key={z.zone} className={rowBg}>
                      <td className="px-3 py-2.5 font-semibold text-ink whitespace-nowrap">
                        {z.zone}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono tabular-nums">{z.planned}</td>
                      <td className="px-3 py-2.5 text-right font-mono tabular-nums whitespace-nowrap">
                        {z.completed} ({z.completionPct.toFixed(1)}%)
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono tabular-nums whitespace-nowrap">
                        ₦{z.utilised}m ({z.utilisationPct.toFixed(1)}%)
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono tabular-nums">
                        {z.turnaround.toFixed(1)}d
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono tabular-nums">{z.q2}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <PackFChart zones={PACK_F_DATA} />
        </div>

        {showBrief && (
          <div
            data-testid="d7-brief-panel"
            className="mt-5 bg-stone-tint border border-rule border-t-[1.5px] border-t-ink rounded-b-md p-5 space-y-2.5 text-sm leading-relaxed text-ink"
          >
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal">
              AI-Drafted &amp; Human-Verified Brief (Prompt P14)
            </div>
            <p>
              <strong>Key Findings:</strong> (1) <strong>Kano</strong> is the outlier on every
              measure—50.0% completion (down from 55%), 50.8% budget utilisation, and 11.5-day
              turnaround. (2) <strong>Lagos</strong> spends 99.2% of released funds (₦238m of ₦240m)
              yet completes only 73.3% (down from 80%), yielding the highest cost per completed
              project (~₦10.8m vs. ₦6.8m–₦8.1m elsewhere). (3) <strong>Port Harcourt</strong>{' '}
              improved most (+8.4 pts to 86.4%) and hit the 5.0-day target.
            </p>
            <p>
              <strong>Three Questions for the Director General:</strong> (a) What is blocking
              Kano—procurement, capacity, or field access? (b) Why is Lagos&apos;s spend per
              completed project ~40% above other zones? (c) What practice did Port Harcourt change
              that can be scaled?
            </p>
          </div>
        )}
      </article>

      {/* Workbooks T6 & T7: Departmental Opportunity & Workflow Redesign */}
      <article className="bg-surface border border-rule rounded-md p-6">
        <CardHeaderBar
          kicker="Workbooks T6 & T7 · Exercise E9"
          meta="Departmental Opportunity Scorer & Workflow Redesign"
          rightSlot={
            <button type="button" onClick={handleCopyWorkflow} className={BTN_SECONDARY}>
              <Copy className="w-4 h-4" aria-hidden="true" />
              <span>Copy Pitch &amp; Workflow Spec</span>
            </button>
          }
        />

        <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
          Redesign the Process on Paper Before Touching Any Tool
        </h3>
        <p className="text-sm text-ink-muted mb-5">
          Select a recurring departmental process, score its Impact × Feasibility (T6), and design
          the redesigned workflow with explicit Human Checkpoints and Approval Paths (T7).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="t7-process" className={FIELD_LABEL_CLASSES}>
              Choose Process (E9 Menu)
            </label>
            <select
              id="t7-process"
              value={t7.process}
              onChange={(e) => handleProcessChange(e.target.value)}
              className={INPUT_CLASSES}
            >
              {Object.keys(E9_PRESETS).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="t7-dataclass" className={FIELD_LABEL_CLASSES}>
              Sensitivity &amp; Approval Path
            </label>
            <input
              id="t7-dataclass"
              type="text"
              value={t7.dataclass}
              onChange={(e) => onUpdateT7({ ...t7, dataclass: e.target.value })}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t6-impact" className={FIELD_LABEL_CLASSES}>
              Impact (1–5)
            </label>
            <input
              id="t6-impact"
              type="number"
              min={1}
              max={5}
              value={t6.impact}
              onChange={(e) =>
                onUpdateT6({ impact: Math.min(5, Math.max(1, parseInt(e.target.value, 10) || 1)) })
              }
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t6-feas" className={FIELD_LABEL_CLASSES}>
              Feasibility (1–5) · Opportunity Score:{' '}
              <span className="text-slate-teal tabular-nums">{oppScore}/25</span>
            </label>
            <input
              id="t6-feas"
              type="number"
              min={1}
              max={5}
              value={t6.feas}
              onChange={(e) =>
                onUpdateT6({ feas: Math.min(5, Math.max(1, parseInt(e.target.value, 10) || 1)) })
              }
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t7-before" className={FIELD_LABEL_CLASSES}>
              Before (Painful Current State)
            </label>
            <input
              id="t7-before"
              type="text"
              value={t7.before}
              onChange={(e) => onUpdateT7({ ...t7, before: e.target.value })}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t7-after" className={FIELD_LABEL_CLASSES}>
              After (AI / Rule Redesign)
            </label>
            <input
              id="t7-after"
              type="text"
              value={t7.after}
              onChange={(e) => onUpdateT7({ ...t7, after: e.target.value })}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t7-checkpoint" className={FIELD_LABEL_CLASSES}>
              Human Checkpoint (Mandatory Sign-Off)
            </label>
            <input
              id="t7-checkpoint"
              type="text"
              value={t7.checkpoint}
              onChange={(e) => onUpdateT7({ ...t7, checkpoint: e.target.value })}
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t7-measure" className={FIELD_LABEL_CLASSES}>
              Success Measure
            </label>
            <input
              id="t7-measure"
              type="text"
              value={t7.measure}
              onChange={(e) => onUpdateT7({ ...t7, measure: e.target.value })}
              className={INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="bg-stone-tint border border-rule border-t-[1.5px] border-t-ink rounded-b-md p-5">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal mb-1.5">
            Your One-Sentence Group Pitch (T7)
          </div>
          <p className="font-semibold text-ink text-[0.98rem] leading-relaxed">{pitch}</p>
          {copyStatus && (
            <p className="font-mono text-xs font-semibold text-forest mt-2" role="status">
              {copyStatus}
            </p>
          )}
        </div>
      </article>
    </section>
  );
}
