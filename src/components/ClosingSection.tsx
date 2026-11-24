import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { calculateGainLogTotals, type GainLogRow } from '../utils/workbookLogic';
import {
  BTN_PRIMARY,
  CardHeaderBar,
  FIELD_LABEL_CLASSES,
  INPUT_CLASSES,
  SectionHeader,
  TEXTAREA_CLASSES,
} from './DossierPrimitives';

interface ClosingSectionProps {
  t10: { week1: string; m1: string; partner: string; exitUse: string; exitConf: string };
  onUpdateT10: (
    patch: Partial<{ week1: string; m1: string; partner: string; exitUse: string; exitConf: string }>
  ) => void;
  gainLog: GainLogRow[];
  onAddGainLog: (row: GainLogRow) => void;
  onRemoveGainLog: (idx: number) => void;
}

export function ClosingSection({
  t10,
  onUpdateT10,
  gainLog,
  onAddGainLog,
  onRemoveGainLog,
}: ClosingSectionProps) {
  const [task, setTask] = useState('');
  const [before, setBefore] = useState(60);
  const [after, setAfter] = useState(15);
  const [errors, setErrors] = useState(2);
  const [formError, setFormError] = useState('');

  const totals = calculateGainLogTotals(gainLog);

  const handleAddGain = () => {
    if (!task.trim()) {
      setFormError('Enter a task name before logging.');
      return;
    }
    setFormError('');
    onAddGainLog({
      task: task.trim(),
      before: Math.max(0, before),
      after: Math.max(0, after),
      errors: Math.max(0, errors),
    });
    setTask('');
  };

  return (
    <section id="sec-closing" className="scroll-mt-6">
      <SectionHeader
        sectionCode="Closing · T10 & Gain Log"
        meta="Convert Insight Into 90-Day Behaviour"
        duration="Final Commitment"
        title="Your 90-Day Pledge & AI Gain Log"
        standfirst="Habits beat heroics: three actions this week, not thirty. Track every minute saved and error caught for four weeks—an accountability partner doubles follow-through."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-6 items-start">
        {/* Workbook T10: 90-Day Action Plan */}
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar kicker="Workbook T10" meta="90-Day AI Productivity Action Plan" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="t10-week1" className={FIELD_LABEL_CLASSES}>
                First Three Actions (This Week / Monday Morning)
              </label>
              <textarea
                id="t10-week1"
                value={t10.week1}
                onChange={(e) => onUpdateT10({ week1: e.target.value })}
                placeholder={'1. Save my Personal Context Card and switch off model training\n2. Run Sunday Reset (P3) for next week\n3. Test my Meeting Preparation Assistant before Monday\'s meeting'}
                className={TEXTAREA_CLASSES}
              />
            </div>

            <div className="flex flex-col justify-between h-full">
              <label htmlFor="t10-m1" className={FIELD_LABEL_CLASSES}>
                Month 1–3 Goals
              </label>
              <textarea
                id="t10-m1"
                value={t10.m1}
                onChange={(e) => onUpdateT10({ m1: e.target.value })}
                placeholder={'M1: 3 reusable prompts in weekly use\nM2: Grounded team notebook proposal\nM3: Present departmental pilot results'}
                className={TEXTAREA_CLASSES}
              />
            </div>

            <div className="flex flex-col justify-between h-full">
              <label htmlFor="t10-partner" className={FIELD_LABEL_CLASSES}>
                Accountability Partner &amp; Check-In Dates
              </label>
              <textarea
                id="t10-partner"
                value={t10.partner}
                onChange={(e) => onUpdateT10({ partner: e.target.value })}
                placeholder={'Partner: e.g. Mrs Eze\nDay 30 / 60 / 90 dates: 24 Dec, 24 Jan, 24 Feb'}
                className={TEXTAREA_CLASSES}
              />
            </div>

            <div className="flex flex-col justify-between h-full">
              <label htmlFor="exit-use" className={FIELD_LABEL_CLASSES}>
                Exit Card: Usefulness (1–5)
              </label>
              <select
                id="exit-use"
                value={t10.exitUse}
                onChange={(e) => onUpdateT10({ exitUse: e.target.value })}
                className={INPUT_CLASSES}
              >
                <option value="0">Rate 1–5</option>
                <option value="5">5 — Transformative</option>
                <option value="4">4 — Very Useful</option>
                <option value="3">3 — Useful</option>
                <option value="2">2 — Somewhat Useful</option>
                <option value="1">1 — Needs Work</option>
              </select>
            </div>

            <div className="flex flex-col justify-between h-full">
              <label htmlFor="exit-conf" className={FIELD_LABEL_CLASSES}>
                Exit Card: Confidence Using AI Safely (1–5)
              </label>
              <select
                id="exit-conf"
                value={t10.exitConf}
                onChange={(e) => onUpdateT10({ exitConf: e.target.value })}
                className={INPUT_CLASSES}
              >
                <option value="0">Rate 1–5</option>
                <option value="5">5 — High Confidence</option>
                <option value="4">4 — Confident</option>
                <option value="3">3 — Growing</option>
                <option value="2">2 — Cautious</option>
                <option value="1">1 — Unsure</option>
              </select>
            </div>
          </div>
        </article>

        {/* Stage T Tracker: AI Gain Log */}
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar
            kicker="Stage T Tracker"
            meta="AI Gain Log"
            rightSlot={
              <span
                data-testid="gain-total-saved"
                className="font-mono text-xs font-semibold tabular-nums text-forest bg-forest-soft px-2 py-0.5 rounded-[2px]"
              >
                {totals.totalMinutesSaved} min saved · {totals.totalErrorsCaught} caught
              </span>
            }
          />

          <p className="text-sm text-ink-muted mb-4">
            Log real tasks to prove what actually saves time and improves quality.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 items-end">
            <div className="sm:col-span-3">
              <label htmlFor="gain-task" className={FIELD_LABEL_CLASSES}>
                Task Name
              </label>
              <input
                id="gain-task"
                type="text"
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="e.g. Minutes from rough notes"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="gain-before" className={FIELD_LABEL_CLASSES}>
                Min Before
              </label>
              <input
                id="gain-before"
                type="number"
                min={1}
                value={before}
                onChange={(e) => setBefore(parseInt(e.target.value, 10) || 0)}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="gain-after" className={FIELD_LABEL_CLASSES}>
                Min With AI
              </label>
              <input
                id="gain-after"
                type="number"
                min={0}
                value={after}
                onChange={(e) => setAfter(parseInt(e.target.value, 10) || 0)}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="gain-errors" className={FIELD_LABEL_CLASSES}>
                Errors Fixed
              </label>
              <input
                id="gain-errors"
                type="number"
                min={0}
                value={errors}
                onChange={(e) => setErrors(parseInt(e.target.value, 10) || 0)}
                className={INPUT_CLASSES}
              />
            </div>
          </div>

          {formError && (
            <p className="font-mono text-xs font-semibold text-crimson mb-2" role="alert">
              {formError}
            </p>
          )}

          <div className="mb-4">
            <button type="button" onClick={handleAddGain} className={BTN_PRIMARY}>
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Log Task Gain</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-rule rounded-md bg-surface">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-tint border-b-[1.5px] border-ink text-left">
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2">Task</th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2 text-right">
                    Saved
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2 text-right">
                    Errors
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3 py-2 text-right">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {gainLog.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-center text-ink-muted">
                      No tasks logged yet.
                    </td>
                  </tr>
                ) : (
                  gainLog.map((row, idx) => (
                    <tr key={`${row.task}-${idx}`}>
                      <td className="px-3 py-2.5 text-ink">{row.task}</td>
                      <td className="px-3 py-2.5 text-right font-mono tabular-nums whitespace-nowrap">
                        {Math.max(0, row.before - row.after)} min
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono tabular-nums">
                        {row.errors}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <button
                          type="button"
                          aria-label={`Delete log entry ${row.task}`}
                          onClick={() => onRemoveGainLog(idx)}
                          className="inline-flex items-center justify-center min-h-[34px] min-w-[34px] rounded border border-rule-strong bg-surface text-ink-muted hover:text-crimson hover:border-crimson transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      {/* Attribution Footer */}
      <footer className="mt-14 bg-stone-tint border border-rule border-t-[1.5px] border-t-ink rounded-b-md px-6 py-5">
        <div className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
          Source &amp; Attribution
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">
          Adapted from <em>The AI-Powered Productive Life: Designing AI-Powered Systems for Personal
          Productivity, Professional Excellence and Future Readiness</em> workshop curriculum for
          public-sector managers. All case personas (Mrs Amina Yusuf, Mr Bashir Lawal, Mr Emeka
          Nwosu) and FAIM agency circulars and metrics are fictional training materials.
        </p>
      </footer>
    </section>
  );
}
