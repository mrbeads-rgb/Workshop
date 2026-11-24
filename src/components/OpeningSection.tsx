import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { D1_VIEWS, FOUR_PILLARS, THREE_SHIFTS } from '../data/masterclassData';
import {
  BTN_ACTIVE,
  BTN_PRIMARY,
  BTN_SECONDARY,
  CardHeaderBar,
  TEXTAREA_CLASSES,
  FIELD_LABEL_CLASSES,
} from './DossierPrimitives';

interface OpeningSectionProps {
  e1Text: string;
  e1Sealed: boolean;
  onChangeE1Text: (value: string) => void;
  onToggleSeal: (sealed: boolean) => void;
}

export function OpeningSection({
  e1Text,
  e1Sealed,
  onChangeE1Text,
  onToggleSeal,
}: OpeningSectionProps) {
  const [d1Mode, setD1Mode] = useState<'raw' | 'ai' | 'catch'>('raw');
  const [e1Message, setE1Message] = useState('');

  const handleSealClick = () => {
    if (!e1Sealed) {
      if (e1Text.trim().length < 8) {
        setE1Message('Write at least one full sentence before sealing.');
        return;
      }
      onToggleSeal(true);
      setE1Message('Title Card sealed and stored for Pillar 4.');
    } else {
      onToggleSeal(false);
      setE1Message('Unsealed for editing.');
    }
  };

  return (
    <section aria-label="Architecture and Opening Exercises" className="mb-16">
      {/* Three Core Shifts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {THREE_SHIFTS.map((shift) => (
          <div
            key={shift.index}
            className="bg-surface border border-rule border-t-[3px] border-t-slate-teal rounded-md p-5"
          >
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal mb-1.5">
              {shift.index}
            </div>
            <h2 className="font-serif text-xl font-semibold text-ink mb-2">{shift.title}</h2>
            <p className="text-sm text-ink-muted leading-relaxed">{shift.body}</p>
          </div>
        ))}
      </div>

      {/* Four Pillars Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {FOUR_PILLARS.map((p) => (
          <a
            key={p.kicker}
            href={p.href}
            className="group bg-surface border border-rule rounded-md p-5 flex flex-col justify-between gap-4 hover:border-ink transition-colors"
          >
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal mb-1.5">
                {p.kicker}
              </div>
              <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-slate-teal transition-colors mb-1.5">
                {p.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">{p.question}</p>
            </div>
            <div className="flex items-baseline gap-2 border-t border-rule pt-3">
              <span className="font-serif text-2xl font-semibold text-slate-teal tabular-nums">
                {p.mins}
              </span>
              <span className="font-mono text-xs text-ink-muted tabular-nums">· {p.share}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Opening Demo D1 & Exercise E1 */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-6 items-start">
        {/* Live Demo D1 */}
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar
            kicker="Live Demo D1"
            meta="The Three-Minute Rescue · Pack A (Fictional FAIM Notes)"
          />
          <h2 className="font-serif text-2xl font-semibold text-ink mb-2">
            One Hour of Drafting Becomes One Minute of Review
          </h2>
          <p className="text-sm text-ink-muted mb-4">
            Compare how raw scribbled notes from a fictional Planning Department meeting become
            structured outputs—and notice the subtle warning hidden inside an unchecked first draft.
          </p>

          <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Demo D1 views">
            <button
              type="button"
              role="tab"
              aria-selected={d1Mode === 'raw'}
              onClick={() => setD1Mode('raw')}
              className={d1Mode === 'raw' ? BTN_ACTIVE : BTN_SECONDARY}
            >
              1. Raw Scribbled Notes
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={d1Mode === 'ai'}
              onClick={() => setD1Mode('ai')}
              className={d1Mode === 'ai' ? BTN_ACTIVE : BTN_SECONDARY}
            >
              2. AI 3-Minute Rescue Output
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={d1Mode === 'catch'}
              onClick={() => setD1Mode('catch')}
              className={d1Mode === 'catch' ? BTN_ACTIVE : BTN_SECONDARY}
            >
              3. Teacher&apos;s Foreshadowing
            </button>
          </div>

          <div
            data-testid="d1-output"
            className="bg-stone-tint border border-rule rounded p-4 text-[0.92rem] leading-relaxed whitespace-pre-wrap text-ink"
          >
            {D1_VIEWS[d1Mode]}
          </div>
        </article>

        {/* Exercise E1: Title Card */}
        <article className="bg-surface border border-rule rounded-md p-6">
          <CardHeaderBar kicker="Exercise E1" meta="Title Card · Returns in Pillar 4" />
          <h2 className="font-serif text-2xl font-semibold text-ink mb-2">
            Who Are You Without Your Job Title?
          </h2>
          <p className="text-sm text-ink-muted mb-4">
            Before we build any tool, write one honest sentence describing who you are without using
            your job title, grade level, or department. Seal it—we reopen it in Pillar 4.
          </p>

          <div className="mb-4">
            <label htmlFor="e1-title-card" className={FIELD_LABEL_CLASSES}>
              Your Identity Sentence (No Title Allowed)
            </label>
            <textarea
              id="e1-title-card"
              value={e1Text}
              disabled={e1Sealed}
              onChange={(e) => {
                onChangeE1Text(e.target.value);
                if (e1Message) setE1Message('');
              }}
              placeholder="For example: I am a patient problem-solver who brings order to chaotic records, mentors younger colleagues, and builds community projects."
              className={TEXTAREA_CLASSES}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={handleSealClick} className={BTN_PRIMARY}>
              {e1Sealed ? (
                <>
                  <Unlock className="w-4 h-4" aria-hidden="true" />
                  <span>Unseal to Edit</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" aria-hidden="true" />
                  <span>Seal Title Card</span>
                </>
              )}
            </button>
            {e1Message && (
              <span
                role="status"
                className={`font-mono text-xs font-semibold ${
                  e1Message.includes('Write at least') ? 'text-crimson' : 'text-forest'
                }`}
              >
                {e1Message}
              </span>
            )}
          </div>

          {e1Sealed && (
            <div className="mt-4 bg-stone-tint border border-rule border-t-[1.5px] border-t-ink rounded-b-md p-4">
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-ochre mb-1">
                Sealed Dossier Card
              </div>
              <p className="text-sm text-ink-muted">
                Your Title Card is sealed in your personal workbook and waiting for you in{' '}
                <a href="#sec-pillar4" className="text-slate-teal font-semibold underline">
                  Section 05 (Pillar 4)
                </a>
                .
              </p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
