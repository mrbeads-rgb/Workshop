import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  CATALYST_STAGES,
  D2_PREVIEWS,
  E2_CARDS,
  type DataClass,
} from '../data/masterclassData';
import { calculateE2Score, type CatalystCardState } from '../utils/workbookLogic';
import { copyToClipboard } from '../utils/browserHelpers';
import {
  BTN_ACTIVE,
  BTN_SECONDARY,
  CardHeaderBar,
  EditorialNote,
  FIELD_LABEL_CLASSES,
  INPUT_CLASSES,
  SectionHeader,
} from './DossierPrimitives';

interface FoundationsSectionProps {
  e2Choices: Record<number, DataClass>;
  onPickE2Card: (id: number, choice: DataClass) => void;
  catalystStep: number;
  onSetCatalystStep: (idx: number) => void;
  catCard: CatalystCardState;
  onUpdateCatCard: (field: keyof CatalystCardState, value: string) => void;
}

const CATALYST_FIELDS: { key: keyof CatalystCardState; label: string; placeholder: string }[] = [
  {
    key: 'c',
    label: 'C · Clarify the Real Problem (2 sentences max)',
    placeholder: 'What is going wrong, for whom, and what does fixed look like?',
  },
  {
    key: 'a1',
    label: 'A · Assess AI Role & Data Class (G/A/R)',
    placeholder: 'Green/Amber? What AI drafts vs. what I decide',
  },
  {
    key: 't1',
    label: 'T · Tell It Context (Role, Situation, Constraints)',
    placeholder: 'Who I am, materials, standards, what to avoid',
  },
  {
    key: 'a2',
    label: 'A · Ask With Precision (Task, Format, Tone, Check)',
    placeholder: 'Structure + instruction to flag assumptions',
  },
  {
    key: 'l',
    label: 'L · Loop With It (Refinement Question)',
    placeholder: 'What would a critical Director or reviewer ask?',
  },
  {
    key: 'y',
    label: 'Y · Your Judgement (Verification Step)',
    placeholder: 'Figures, dates, tone, and facts I will verify myself',
  },
  {
    key: 's',
    label: 'S · Systemise (Prompt → Template → Assistant)',
    placeholder: 'Where will I save this so I never start from zero?',
  },
  {
    key: 't2',
    label: 'T · Track the Gain (Minutes / Quality Baseline)',
    placeholder: 'Minutes before vs. with AI; errors caught',
  },
];

export function FoundationsSection({
  e2Choices,
  onPickE2Card,
  catalystStep,
  onSetCatalystStep,
  catCard,
  onUpdateCatCard,
}: FoundationsSectionProps) {
  const [d2Mode, setD2Mode] = useState<'weak' | 'strong'>('weak');
  const [copyStatus, setCopyStatus] = useState('');

  const score = calculateE2Score(e2Choices);
  const activeStage = CATALYST_STAGES[catalystStep] ?? CATALYST_STAGES[0];

  const handleCopyCatalyst = async () => {
    const txt = [
      'CATALYST PROBLEM CARD',
      `C - Clarify: ${catCard.c}`,
      `A - Assess AI & Data: ${catCard.a1}`,
      `T - Tell Context: ${catCard.t1}`,
      `A - Ask Precisely: ${catCard.a2}`,
      `L - Loop: ${catCard.l}`,
      `Y - Your Judgement: ${catCard.y}`,
      `S - Systemise: ${catCard.s}`,
      `T - Track Gain: ${catCard.t2}`,
    ].join('\n');
    const ok = await copyToClipboard(txt);
    setCopyStatus(ok ? 'CATALYST card copied to clipboard.' : 'Select text manually to copy.');
    setTimeout(() => setCopyStatus(''), 3500);
  };

  return (
    <section id="sec-foundations" className="scroll-mt-6 mb-20">
      <SectionHeader
        sectionCode="Section 01"
        meta="Foundations · Data Protection & Methodology"
        duration="35 Min Block"
        title="Safe Hands, Smart Hands: The Traffic-Light Rule & The CATALYST Loop"
        standfirst="Safety and method come before speed. Treat any free personal AI account like a public noticeboard unless your organisation has formally approved and deployed it."
      />

      {/* Traffic-Light Governance Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-surface border border-rule border-t-[3px] border-t-forest rounded-md p-5">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-forest mb-2">
            Green · Safe for Free Tools
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-2">
            Public, Fictional, or Yours Alone
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            Published annual reports, public circulars, fictional training data, or your own
            personal schedule and study goals. Safe to practise with freely.
          </p>
        </div>

        <div className="bg-surface border border-rule border-t-[3px] border-t-ochre rounded-md p-5">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-ochre mb-2">
            Amber · Anonymise or Approved Tool
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-2">
            Internal, Non-Sensitive Material
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            Unpublished zone totals with no personal identifiers, or internal non-confidential SOPs.
            Strip names/numbers or use an approved institutional tool.
          </p>
        </div>

        <div className="bg-surface border border-rule border-t-[3px] border-t-crimson rounded-md p-5">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-crimson mb-2">
            Red · Never in a Public Tool
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-2">
            Confidential, Personal, or Legal Data
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            Staff payroll, citizen complaints with phone numbers, disciplinary notes, draft
            restructuring memos, passwords, or security records. Never paste these.
          </p>
        </div>
      </div>

      <EditorialNote label="Governance & Two Settings to Change Today" className="mb-10">
        Under the <strong>Nigeria Data Protection Act 2023</strong> (and the August 2026 Federal MDA
        compliance circular requiring Data Protection Officers), public bodies must keep a human in
        the loop—Section 37 guards against automated decisions on citizen welfare or HR without
        human oversight. Before running your first prompt: <strong>(1)</strong> turn off chat
        history/model training in settings, and <strong>(2)</strong> use temporary or incognito
        chats for anything sensitive.
      </EditorialNote>

      {/* Exercise E2: 10-Card Sort */}
      <article className="bg-surface border border-rule rounded-md p-6 mb-14">
        <CardHeaderBar
          kicker="Exercise E2"
          meta="Interactive Card Sort · Target: 8 / 10"
          rightSlot={
            <span
              data-testid="e2-score-display"
              className="font-serif text-lg font-semibold text-ink tabular-nums"
            >
              Score: {score.correct} / {score.total}
            </span>
          }
        />
        <h3 className="font-serif text-2xl font-semibold text-ink mb-1.5">
          Would You Paste This Into a Free Personal AI Assistant?
        </h3>
        <p className="text-sm text-ink-muted mb-5">
          Classify each of these ten real-world public-sector items as Green, Amber, or Red. Pay
          close attention to items 05 and 09—they spark the most debate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {E2_CARDS.map((card) => {
            const picked = e2Choices[card.id];
            const isCorrect = picked === card.answer;
            return (
              <div
                key={card.id}
                className="bg-paper border border-rule rounded-md p-4 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="font-mono text-xs font-semibold text-slate-teal mb-1">
                    CARD {String(card.id).padStart(2, '0')}
                  </div>
                  <p className="text-sm font-semibold text-ink leading-snug">{card.text}</p>
                </div>

                <div>
                  <div
                    className="flex flex-wrap gap-1.5"
                    role="group"
                    aria-label={`Classify card ${card.id}`}
                  >
                    {(['Green', 'Amber', 'Red'] as const).map((option) => {
                      const active = picked === option;
                      let colorStyle =
                        'bg-surface text-ink border-rule-strong hover:bg-stone-tint';
                      if (active && option === 'Green') {
                        colorStyle = 'bg-forest text-paper border-forest';
                      } else if (active && option === 'Amber') {
                        colorStyle = 'bg-ochre text-paper border-ochre';
                      } else if (active && option === 'Red') {
                        colorStyle = 'bg-crimson text-paper border-crimson';
                      }
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => onPickE2Card(card.id, option)}
                          className={`min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${colorStyle}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {picked && (
                    <div
                      className={`mt-3 text-xs leading-relaxed p-2.5 rounded ${
                        isCorrect
                          ? 'bg-forest-soft text-forest'
                          : 'bg-crimson-soft text-crimson'
                      }`}
                    >
                      <strong>
                        {isCorrect ? `Correct (${card.answer})` : `Answer: ${card.answer}`}
                      </strong>{' '}
                      — {card.reason}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </article>

      {/* The CATALYST Loop */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 border-b-[1.5px] border-ink pb-2 mb-3 text-xs font-mono text-ink-muted">
          <span className="font-semibold text-ink uppercase bg-accent-gold px-2 py-0.5 rounded-[2px]">
            Framework
          </span>
          <span aria-hidden="true">·</span>
          <span className="uppercase">Beyond Prompting · Eight Stages of an AI System Designer</span>
        </div>
        <h3 className="font-serif text-3xl font-semibold text-ink mb-2">The CATALYST Loop</h3>
        <p className="text-[1rem] text-ink/90 max-w-[65ch]">
          A catalyst speeds up a reaction without being consumed by it. AI accelerates your thinking
          and drafting, while <em>you</em> choose the problem, supply the context, verify the
          result, and turn what worked into a permanent system.
        </p>
      </div>

      {/* 8-Stage Stepper Rail */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-5"
        role="tablist"
        aria-label="CATALYST stages"
      >
        {CATALYST_STAGES.map((st, idx) => {
          const isActive = idx === catalystStep;
          return (
            <button
              key={`${st.letter}-${idx}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSetCatalystStep(idx)}
              className={`flex flex-col items-center justify-center min-h-[68px] px-2 py-2.5 rounded border text-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-surface text-ink border-rule hover:bg-stone-tint hover:border-ink'
              }`}
            >
              <span
                className={`font-serif text-xl font-bold leading-none ${
                  isActive ? 'text-accent-gold' : 'text-ink'
                }`}
              >
                {st.letter}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider mt-1.5">
                {st.word}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage Detail + Demo D2 */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-6 items-start mb-8">
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar
            kicker={`Stage ${catalystStep + 1} of 8`}
            meta={`${activeStage.letter} · ${activeStage.word}`}
          />
          <h4 className="font-serif text-2xl font-semibold text-ink mb-2">{activeStage.title}</h4>
          <p className="font-semibold text-slate-teal mb-3">
            Ask yourself: &ldquo;{activeStage.question}&rdquo;
          </p>
          <p className="text-[0.96rem] text-ink mb-4">
            <strong>Rule of thumb:</strong> {activeStage.rule}
          </p>
          <div className="bg-stone-tint border border-rule border-t-[1.5px] border-t-ink rounded-b-md p-4">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-1">
              Public-Sector &amp; Life Example
            </div>
            <p className="text-sm text-ink mb-3">{activeStage.example}</p>
            <div className="font-mono text-xs font-medium text-slate-teal">
              Instrument: {activeStage.tool}
            </div>
          </div>
        </article>

        {/* Demo D2 */}
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar kicker="Demo D2" meta="The Power of Stage T (Tell It Context)" />
          <h4 className="font-serif text-2xl font-semibold text-ink mb-2">
            Weak Prompt vs. Context-Rich Prompt
          </h4>
          <p className="text-sm text-ink-muted mb-4">
            See how supplying Mrs Amina Yusuf&apos;s constraints (75–90 min commute, evening power
            cuts, peak 5–9 AM energy) transforms generic fluff into an actionable week.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => setD2Mode('weak')}
              className={d2Mode === 'weak' ? BTN_ACTIVE : BTN_SECONDARY}
            >
              Weak Prompt (&ldquo;Plan my week&rdquo;)
            </button>
            <button
              type="button"
              onClick={() => setD2Mode('strong')}
              className={d2Mode === 'strong' ? BTN_ACTIVE : BTN_SECONDARY}
            >
              CATALYST Context Prompt
            </button>
          </div>
          <div className="bg-stone-tint border border-rule rounded p-4 text-[0.9rem] leading-relaxed whitespace-pre-wrap text-ink">
            {D2_PREVIEWS[d2Mode]}
          </div>
        </article>
      </div>

      {/* Exercise E3: CATALYST Card Builder */}
      <article className="bg-surface border border-rule rounded-md p-6">
        <CardHeaderBar
          kicker="Exercise E3"
          meta="Your CATALYST Card · Apply to One Real, Non-Sensitive Problem"
          rightSlot={
            <button type="button" onClick={handleCopyCatalyst} className={BTN_SECONDARY}>
              {copyStatus ? (
                <Check className="w-4 h-4 text-forest" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4" aria-hidden="true" />
              )}
              <span>Copy CATALYST Brief</span>
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATALYST_FIELDS.map((field) => (
            <div key={field.key}>
              <label htmlFor={`cat-${field.key}`} className={FIELD_LABEL_CLASSES}>
                {field.label}
              </label>
              <input
                id={`cat-${field.key}`}
                type="text"
                value={catCard[field.key]}
                onChange={(e) => onUpdateCatCard(field.key, e.target.value)}
                placeholder={field.placeholder}
                className={INPUT_CLASSES}
              />
            </div>
          ))}
        </div>

        {copyStatus && (
          <p className="font-mono text-xs font-semibold text-forest mt-3" role="status">
            {copyStatus}
          </p>
        )}
      </article>
    </section>
  );
}
