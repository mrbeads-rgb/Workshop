import { useState } from 'react';
import { Eye, Plus, Trash2, Sparkles, Check } from 'lucide-react';
import { T9_CHECKLIST_ITEMS } from '../data/masterclassData';
import type { SkillRow } from '../utils/workbookLogic';
import {
  BTN_PRIMARY,
  BTN_SECONDARY,
  CardHeaderBar,
  EditorialNote,
  FIELD_LABEL_CLASSES,
  INPUT_CLASSES,
  SectionHeader,
  TEXTAREA_CLASSES,
} from './DossierPrimitives';

interface PillarFourSectionProps {
  e1Text: string;
  t8Skills: SkillRow[];
  onSetT8Skills: (skills: SkillRow[]) => void;
  t8Lesson: { sit: string; rule: string };
  onUpdateT8Lesson: (patch: { sit?: string; rule?: string }) => void;
  t9: { purpose: string; paths: string; learning: string; checks: string[] };
  onUpdateT9: (patch: Partial<{ purpose: string; paths: string; learning: string; checks: string[] }>) => void;
}

export function PillarFourSection({
  e1Text,
  t8Skills,
  onSetT8Skills,
  t8Lesson,
  onUpdateT8Lesson,
  t9,
  onUpdateT9,
}: PillarFourSectionProps) {
  const [revealed, setRevealed] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newEvidence, setNewEvidence] = useState('');
  const [newWho, setNewWho] = useState('');
  const [skillError, setSkillError] = useState('');

  const loadNwosuCase = () => {
    onSetT8Skills([
      {
        skill: 'Stores & Asset Control',
        evidence: 'Introduced asset tagging across 6 zonal stores',
        level: '4',
        who: 'Public depots & private warehouses',
        use: 'Advisory & audit support',
      },
      {
        skill: 'Procedure Manual Writing',
        evidence: 'Authored stores manual used by ~200 storekeepers',
        level: '4',
        who: 'Cooperatives & SMEs',
        use: 'Publish practical stores handbook',
      },
      {
        skill: 'Mentoring & Technical Training',
        evidence: 'Trains new storekeepers yearly; mentored 2 junior staff',
        level: '4',
        who: 'Trade associations',
        use: 'Part-time workshop facilitation',
      },
    ]);
    onUpdateT8Lesson({
      sit: 'We tagged zonal assets before counting them, so we tagged items that no longer existed.',
      rule: 'Count, reconcile, then tag.',
    });
    onUpdateT9({
      purpose:
        'Turning 28 years of logistics stewardship into practical training and small-enterprise advisory.',
    });
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      setSkillError('Enter a skill or knowledge area before adding.');
      return;
    }
    setSkillError('');
    onSetT8Skills([
      ...t8Skills,
      {
        skill: newSkill.trim(),
        evidence: newEvidence.trim() || 'Applied across recurring duties',
        level: '3',
        who: newWho.trim() || 'Teams outside current post',
        use: 'Mentoring, handbook, or consulting',
      },
    ]);
    setNewSkill('');
    setNewEvidence('');
    setNewWho('');
  };

  const handleRemoveSkill = (idx: number) => {
    onSetT8Skills(t8Skills.filter((_, i) => i !== idx));
  };

  const handleToggleCheck = (id: string) => {
    const exists = t9.checks.includes(id);
    const next = exists ? t9.checks.filter((c) => c !== id) : [...t9.checks, id];
    onUpdateT9({ checks: next });
  };

  return (
    <section id="sec-pillar4" className="scroll-mt-6 mb-20">
      <SectionHeader
        sectionCode="Pillar 4 · Future"
        meta="Workbooks T8 & T9 · Beyond the Job Title · Section 05"
        duration="50 Min Block"
        title="Beyond the Job Title: Transferable Assets & Initial Future-Readiness Plan"
        standfirst="Employment is one chapter of your knowledge and value. Here we reopen your sealed Title Card, uncover skills you stopped noticing, and design what comes next—at any career stage."
      />

      {/* Reopen Title Card + Advice Boundary */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-6 items-start mb-8">
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar
            kicker="Title Card Revisited"
            meta="Exercise E1 Unsealed"
            rightSlot={
              <button
                type="button"
                onClick={() => setRevealed((v) => !v)}
                className={BTN_SECONDARY}
              >
                <Eye className="w-4 h-4" aria-hidden="true" />
                <span>{revealed ? 'Hide Title Card' : 'Reveal My Title Card'}</span>
              </button>
            }
          />
          <div className="bg-stone-tint border border-rule rounded p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink">
            {revealed
              ? `YOUR OPENING TITLE CARD:\n"${
                  e1Text.trim() ||
                  "(You haven't written a Title Card in the Opening yet—scroll up to Exercise E1 or reflect on your identity beyond your title right here.)"
                }"\n\nNOW ASK YOURSELF: Knowing your transferable assets (Skills, Knowledge, Relationships, Reputation), what strength would you add to that card today?`
              : 'Click "Reveal My Title Card" to read what you wrote in the Opening—and ask yourself what skills and assets you would add to it now.'}
          </div>
        </article>

        <EditorialNote label="Professional Advice Boundary">
          AI is a mirror, scribe, and tutor—<strong>never a financial, tax, legal, or pension adviser</strong>.
          Always confirm your Retirement Savings Account records, exit benefits, Minimum Pension
          Guarantee rules, and accrued rights directly with <strong>PenCom</strong>, your
          agency&apos;s pension desk, and qualified advisers—and verify HR/ethics rules before any
          outside engagement while in service.
        </EditorialNote>
      </div>

      {/* Workbook T8: Transferable Skills Inventory + Lesson Card */}
      <article className="bg-surface border border-rule rounded-md p-6 mb-8">
        <CardHeaderBar
          kicker="Workbook T8 · Exercise E10"
          meta="Transferable Skills & Knowledge Inventory"
          rightSlot={
            <button type="button" onClick={loadNwosuCase} className={BTN_SECONDARY}>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Load Example (Mr Emeka Nwosu · Pack G)</span>
            </button>
          }
        />

        <p className="text-sm text-ink-muted mb-4">
          Catalogue skills you have proved in practice—without exaggerating—and preserve one
          hard-won rule of thumb from your career before it walks out the door.
        </p>

        <div className="overflow-x-auto border border-rule rounded-md bg-surface mb-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-stone-tint border-b-[1.5px] border-ink text-left">
                <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5">
                  Skill or Knowledge
                </th>
                <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5">
                  Concrete Evidence &amp; Result
                </th>
                <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5 text-right">
                  Level (1–4)
                </th>
                <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5">
                  Who Needs It Outside
                </th>
                <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5">
                  Possible Next-Chapter Use
                </th>
                <th className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {t8Skills.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-ink-muted">
                    No skills listed yet. Add one below or load Mr Emeka Nwosu&apos;s worked example.
                  </td>
                </tr>
              ) : (
                t8Skills.map((row, idx) => (
                  <tr key={`${row.skill}-${idx}`}>
                    <td className="px-3.5 py-3 font-semibold text-ink">{row.skill}</td>
                    <td className="px-3.5 py-3 text-ink-muted">{row.evidence}</td>
                    <td className="px-3.5 py-3 text-right font-mono tabular-nums">{row.level}</td>
                    <td className="px-3.5 py-3 text-ink">{row.who}</td>
                    <td className="px-3.5 py-3 text-ink-muted">{row.use}</td>
                    <td className="px-3.5 py-3 text-right">
                      <button
                        type="button"
                        aria-label={`Remove skill ${row.skill}`}
                        onClick={() => handleRemoveSkill(idx)}
                        className="inline-flex items-center gap-1 min-h-[36px] px-2.5 py-1 text-xs font-semibold rounded border border-rule-strong bg-surface text-ink hover:bg-crimson-soft hover:text-crimson hover:border-crimson transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Skill Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-2">
          <div>
            <label htmlFor="t8-new-skill" className={FIELD_LABEL_CLASSES}>
              Skill / Knowledge
            </label>
            <input
              id="t8-new-skill"
              type="text"
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
                if (skillError) setSkillError('');
              }}
              placeholder="e.g. Procedure manual writing"
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t8-new-evidence" className={FIELD_LABEL_CLASSES}>
              Evidence &amp; Result
            </label>
            <input
              id="t8-new-evidence"
              type="text"
              value={newEvidence}
              onChange={(e) => setNewEvidence(e.target.value)}
              placeholder="e.g. Wrote manual used by 200 storekeepers"
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t8-new-who" className={FIELD_LABEL_CLASSES}>
              Who Needs It &amp; Level (1–4)
            </label>
            <input
              id="t8-new-who"
              type="text"
              value={newWho}
              onChange={(e) => setNewWho(e.target.value)}
              placeholder="e.g. Level 4 · Cooperatives, SMEs"
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <button type="button" onClick={handleAddSkill} className={`${BTN_PRIMARY} w-full`}>
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Add Skill to Inventory</span>
            </button>
          </div>
        </div>
        {skillError && (
          <p className="font-mono text-xs font-semibold text-crimson mb-4" role="alert">
            {skillError}
          </p>
        )}

        {/* Knowledge Archive Lesson Card */}
        <div className="mt-6 bg-stone-tint border border-rule border-t-[1.5px] border-t-ink rounded-b-md p-5">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal mb-3">
            Knowledge Archive Lesson Card (Prompt P21)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="t8-lesson-sit" className={FIELD_LABEL_CLASSES}>
                Situation &amp; What Went Wrong
              </label>
              <input
                id="t8-lesson-sit"
                type="text"
                value={t8Lesson.sit}
                onChange={(e) => onUpdateT8Lesson({ sit: e.target.value })}
                placeholder="e.g. We tagged zonal assets before conducting a physical count"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="t8-lesson-rule" className={FIELD_LABEL_CLASSES}>
                Rule of Thumb I Use Now
              </label>
              <input
                id="t8-lesson-rule"
                type="text"
                value={t8Lesson.rule}
                onChange={(e) => onUpdateT8Lesson({ rule: e.target.value })}
                placeholder="e.g. Count, reconcile, then tag—never invert the sequence"
                className={INPUT_CLASSES}
              />
            </div>
          </div>
        </div>
      </article>

      {/* Workbook T9: Future-Readiness Plan v0.1 */}
      <article className="bg-surface border border-rule rounded-md p-6">
        <CardHeaderBar
          kicker="Workbook T9"
          meta="Future-Readiness Plan v0.1 · Purpose, Paths & Readiness"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="md:col-span-2">
            <label htmlFor="t9-purpose" className={FIELD_LABEL_CLASSES}>
              Purpose Statement Beyond My Title
            </label>
            <input
              id="t9-purpose"
              type="text"
              value={t9.purpose}
              onChange={(e) => onUpdateT9({ purpose: e.target.value })}
              placeholder="e.g. Turning 20+ years of public-sector operations experience into practical training and community stewardship"
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t9-paths" className={FIELD_LABEL_CLASSES}>
              Three Possible Paths &amp; 30-Day Small Experiment
            </label>
            <textarea
              id="t9-paths"
              value={t9.paths}
              onChange={(e) => onUpdateT9({ paths: e.target.value })}
              placeholder={'1. Mentoring / Teaching: record two short how-to sessions\n2. Practical Handbook: outline 6 chapters\n3. Cooperative Advisory (after checking HR ethics rules)'}
              className={TEXTAREA_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="t9-learning" className={FIELD_LABEL_CLASSES}>
              Capability Gap &amp; 90-Day Learning Step
            </label>
            <textarea
              id="t9-learning"
              value={t9.learning}
              onChange={(e) => onUpdateT9({ learning: e.target.value })}
              placeholder="Gap: digital facilitation skills. 90-day step: study 3 hrs/week with Prompt P19 and shadow one facilitator."
              className={TEXTAREA_CLASSES}
            />
          </div>
        </div>

        <div>
          <span className={FIELD_LABEL_CLASSES}>
            Practical Readiness Checklist (Not AI Advice — Verify With Authorities)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {T9_CHECKLIST_ITEMS.map((item) => {
              const checked = t9.checks.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={checked}
                  onClick={() => handleToggleCheck(item.id)}
                  className={`flex items-start gap-2.5 text-left min-h-[44px] px-4 py-3 rounded border text-sm font-medium transition-colors cursor-pointer ${
                    checked
                      ? 'bg-slate-teal text-paper border-slate-teal'
                      : 'bg-paper text-ink border-rule-strong hover:bg-stone-tint'
                  }`}
                >
                  <span
                    className={`mt-0.5 w-4 h-4 rounded-[2px] border flex items-center justify-center shrink-0 ${
                      checked
                        ? 'bg-accent-gold text-ink border-accent-gold'
                        : 'bg-surface border-rule-strong text-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    <Check className="w-3 h-3" />
                  </span>
                  <span>
                    <strong className="font-mono text-xs uppercase mr-1.5">
                      {checked ? '[Confirmed]' : '[To Check]'}
                    </strong>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
}
