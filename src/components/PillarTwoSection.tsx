import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  E5_DATA,
  E6_STEPS,
  T5_PRESETS,
  T5_TEST_RESPONSES,
} from '../data/masterclassData';
import type { AssistantState, E6LogRow } from '../utils/workbookLogic';
import { copyToClipboard } from '../utils/browserHelpers';
import {
  BTN_ACTIVE,
  BTN_PRIMARY,
  BTN_SECONDARY,
  CardHeaderBar,
  FIELD_LABEL_CLASSES,
  INPUT_CLASSES,
  SectionHeader,
  TEXTAREA_CLASSES,
} from './DossierPrimitives';

interface PillarTwoSectionProps {
  e5Pack: 'A' | 'A2';
  onSetE5Pack: (pack: 'A' | 'A2') => void;
  e5Checked: string[];
  onToggleE5Ambiguity: (key: string) => void;
  e6Step: 1 | 2 | 3;
  onSetE6Step: (step: 1 | 2 | 3) => void;
  e6Log: E6LogRow[];
  onUpdateE6Verdict: (idx: number, verdict: string) => void;
  t5: AssistantState;
  onUpdateT5: (next: AssistantState) => void;
}

export function PillarTwoSection({
  e5Pack,
  onSetE5Pack,
  e5Checked,
  onToggleE5Ambiguity,
  e6Step,
  onSetE6Step,
  e6Log,
  onUpdateE6Verdict,
  t5,
  onUpdateT5,
}: PillarTwoSectionProps) {
  const [t5TestMode, setT5TestMode] = useState<'typical' | 'tricky'>('typical');
  const [copyStatus, setCopyStatus] = useState('');

  const packData = E5_DATA[e5Pack];

  const handleCopyAssistant = async () => {
    const spec = [
      `ROLE: ${t5.role}`,
      `CONTEXT: ${t5.context}`,
      `STANDARDS: ${t5.standards}`,
      `FORMAT: ${t5.format}`,
      `GUARDRAILS: ${t5.guardrails}`,
      `CHECK: ${t5.check}`,
    ].join('\n');
    const ok = await copyToClipboard(spec);
    setCopyStatus(
      ok
        ? 'Instruction Card copied. Paste into a Gem, Project, or Custom GPT.'
        : 'Select text manually to copy.'
    );
    setTimeout(() => setCopyStatus(''), 3500);
  };

  return (
    <section id="sec-pillar2" className="scroll-mt-6 mb-20">
      <SectionHeader
        sectionCode="Pillar 2 · Role"
        meta="Exercises E5, E6 & Assistant T5 · Section 03"
        duration="80 Min Block"
        title="Your Professional Multiplier: Reusable Assistants & Verification"
        standfirst="Fluency is not accuracy. Moving from one-off prompts to reusable Instruction-Card assistants saves hours—and the Verification Ladder ensures you remain the accountable author."
      />

      {/* Exercise E5: Notes to Minutes Ambiguity Inspector */}
      <article className="bg-surface border border-rule rounded-md p-6 mb-8">
        <CardHeaderBar
          kicker="Exercise E5"
          meta="Pack A & Pack A2 · Catching Quiet Guesses"
          rightSlot={
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSetE5Pack('A')}
                className={e5Pack === 'A' ? BTN_ACTIVE : BTN_SECONDARY}
              >
                Pack A · Planning Meeting
              </button>
              <button
                type="button"
                onClick={() => onSetE5Pack('A2')}
                className={e5Pack === 'A2' ? BTN_ACTIVE : BTN_SECONDARY}
              >
                Pack A2 · Procurement Committee
              </button>
            </div>
          }
        />

        <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
          Why One Line (&ldquo;Use [UNCLEAR]—Never Guess&rdquo;) Changes Everything
        </h3>
        <p className="text-sm text-ink-muted mb-5">
          Inspect the raw notes alongside Prompt P7&apos;s disciplined output. Click each ambiguity
          below to verify what the AI refused to invent.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div>
            <span className={FIELD_LABEL_CLASSES}>Raw Fictional Notes ({packData.title})</span>
            <div className="bg-stone-tint border border-rule rounded p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink">
              {packData.raw}
            </div>
          </div>
          <div>
            <span className={FIELD_LABEL_CLASSES}>
              Disciplined P7 Action Output (With [UNCLEAR] Flags)
            </span>
            <div className="bg-paper border border-rule rounded p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink">
              {packData.output}
            </div>
          </div>
        </div>

        <div className="bg-stone-tint border border-rule border-t-[1.5px] border-t-ink rounded-b-md p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
              Ambiguity Checklist (Target: Flag at Least 2)
            </span>
            <span className="font-mono text-xs font-semibold text-slate-teal tabular-nums">
              {e5Checked.length} flagged total
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {packData.ambiguities.map((item, idx) => {
              const key = `${e5Pack}_${idx}`;
              const checked = e5Checked.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={checked}
                  onClick={() => onToggleE5Ambiguity(key)}
                  className={`inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-left text-xs sm:text-sm font-medium rounded border transition-colors cursor-pointer ${
                    checked
                      ? 'bg-slate-teal text-paper border-slate-teal'
                      : 'bg-surface text-ink border-rule-strong hover:bg-paper'
                  }`}
                >
                  {checked && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                  <span>{checked ? `Flagged: ${item}` : `Flag: ${item}`}</span>
                </button>
              );
            })}
          </div>
        </div>
      </article>

      {/* Exercise E6: Hallucination Hunt & Verification Log */}
      <article className="bg-surface border border-rule rounded-md p-6 mb-8">
        <CardHeaderBar
          kicker="Exercise E6"
          meta="The Hallucination Hunt · Pack C (FAIM/REC/2026/014)"
          rightSlot={
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ochre">
              Verification Ladder
            </span>
          }
        />

        <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
          Watch How AI Behaves With vs. Without a Source Document
        </h3>
        <p className="text-sm text-ink-muted mb-4">
          Step through this three-part experiment on our fictional Records Management Circular
          (which deliberately omits any penalty for late monthly returns), then log your own
          verification verdict.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => onSetE6Step(1)}
            className={e6Step === 1 ? BTN_ACTIVE : BTN_SECONDARY}
          >
            Step 1: Grounded Brief (P8)
          </button>
          <button
            type="button"
            onClick={() => onSetE6Step(2)}
            className={e6Step === 2 ? BTN_ACTIVE : BTN_SECONDARY}
          >
            Step 2: Ask Missing Fact (With Source)
          </button>
          <button
            type="button"
            onClick={() => onSetE6Step(3)}
            className={e6Step === 3 ? BTN_ACTIVE : BTN_SECONDARY}
          >
            Step 3: Ask Missing Fact (No Source — Watch Trap)
          </button>
        </div>

        <div className="bg-stone-tint border border-rule rounded p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink mb-6">
          {E6_STEPS[e6Step]}
        </div>

        <div>
          <span className={FIELD_LABEL_CLASSES}>
            Interactive Verification Log (Climb the Ladder: Sense → Source → Second → Subject)
          </span>
          <div className="overflow-x-auto border border-rule rounded-md bg-surface">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-tint border-b-[1.5px] border-ink text-left">
                  <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5">
                    Claim / Output Checked
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5">
                    What the Source Document Says
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5">
                    Ladder Rung
                  </th>
                  <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5">
                    My Verdict
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {e6Log.map((row, idx) => (
                  <tr key={row.claim}>
                    <td className="px-3.5 py-3 text-ink">{row.claim}</td>
                    <td className="px-3.5 py-3 text-ink-muted">{row.source}</td>
                    <td className="px-3.5 py-3 font-mono text-xs font-semibold text-slate-teal whitespace-nowrap">
                      {row.rung}
                    </td>
                    <td className="px-3.5 py-3 min-w-[200px]">
                      <select
                        aria-label={`Verdict for check ${idx + 1}`}
                        value={row.verdict}
                        onChange={(e) => onUpdateE6Verdict(idx, e.target.value)}
                        className={INPUT_CLASSES}
                      >
                        <option value="Verified">Verified</option>
                        <option value="Rejected (Hallucination)">Rejected (Hallucination)</option>
                        <option value="Needs Subject Check">Needs Subject Check</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>

      {/* Studio T5: Professional AI Assistant Setup */}
      <article className="bg-surface border border-rule rounded-md p-6">
        <CardHeaderBar
          kicker="Studio T5 · Exercise E7"
          meta="Build Your Professional AI Assistant"
          rightSlot={
            <button type="button" onClick={handleCopyAssistant} className={BTN_PRIMARY}>
              <Copy className="w-4 h-4" aria-hidden="true" />
              <span>Copy Instruction Card</span>
            </button>
          }
        />

        <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
          Six-Part Instruction Card &amp; Guardrail Stress Test
        </h3>
        <p className="text-sm text-ink-muted mb-4">
          Select a starter role or tailor the six fields for a responsibility you repeat monthly or
          more. Then test it on both a typical input and a tricky, incomplete input.
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {T5_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => onUpdateT5({ ...preset })}
              className={t5.name === preset.name ? BTN_ACTIVE : BTN_SECONDARY}
            >
              Preset: {preset.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-6 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="t5-role" className={FIELD_LABEL_CLASSES}>
                1. Role
              </label>
              <input
                id="t5-role"
                type="text"
                value={t5.role}
                onChange={(e) => onUpdateT5({ ...t5, name: 'Custom Assistant', role: e.target.value })}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="t5-context" className={FIELD_LABEL_CLASSES}>
                2. Context (Green Only)
              </label>
              <input
                id="t5-context"
                type="text"
                value={t5.context}
                onChange={(e) =>
                  onUpdateT5({ ...t5, name: 'Custom Assistant', context: e.target.value })
                }
                className={INPUT_CLASSES}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="t5-standards" className={FIELD_LABEL_CLASSES}>
                3. Standards (What Good Looks Like)
              </label>
              <textarea
                id="t5-standards"
                value={t5.standards}
                onChange={(e) =>
                  onUpdateT5({ ...t5, name: 'Custom Assistant', standards: e.target.value })
                }
                className={TEXTAREA_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="t5-format" className={FIELD_LABEL_CLASSES}>
                4. Output Format
              </label>
              <input
                id="t5-format"
                type="text"
                value={t5.format}
                onChange={(e) =>
                  onUpdateT5({ ...t5, name: 'Custom Assistant', format: e.target.value })
                }
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="t5-check" className={FIELD_LABEL_CLASSES}>
                6. Mandatory Check Line
              </label>
              <input
                id="t5-check"
                type="text"
                value={t5.check}
                onChange={(e) =>
                  onUpdateT5({ ...t5, name: 'Custom Assistant', check: e.target.value })
                }
                className={INPUT_CLASSES}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="t5-guardrails" className={FIELD_LABEL_CLASSES}>
                5. Guardrails (What It Must Never Do)
              </label>
              <textarea
                id="t5-guardrails"
                value={t5.guardrails}
                onChange={(e) =>
                  onUpdateT5({ ...t5, name: 'Custom Assistant', guardrails: e.target.value })
                }
                className={TEXTAREA_CLASSES}
              />
            </div>
          </div>

          <div className="bg-stone-tint border border-rule border-t-[1.5px] border-t-ink rounded-b-md p-5">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-1">
              Test Your Assistant&apos;s Guardrails
            </div>
            <p className="text-sm text-ink-muted mb-3">
              A strong assistant excels on normal work—and refuses to invent facts when given vague
              instructions.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                type="button"
                onClick={() => setT5TestMode('typical')}
                className={t5TestMode === 'typical' ? BTN_ACTIVE : BTN_SECONDARY}
              >
                Typical Input
              </button>
              <button
                type="button"
                onClick={() => setT5TestMode('tricky')}
                className={t5TestMode === 'tricky' ? BTN_ACTIVE : BTN_SECONDARY}
              >
                Tricky Vague Input
              </button>
            </div>
            <div className="bg-paper border border-rule rounded p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink">
              {T5_TEST_RESPONSES[t5TestMode]}
            </div>
            {copyStatus && (
              <p className="font-mono text-xs font-semibold text-forest mt-3" role="status">
                {copyStatus}
              </p>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
