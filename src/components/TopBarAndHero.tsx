import { useState } from 'react';
import { Download, RotateCcw, Check } from 'lucide-react';
import { BTN_PRIMARY, BTN_SECONDARY, EditorialNote } from './DossierPrimitives';

interface MilestoneItem {
  id: string;
  label: string;
  done: boolean;
}

interface TopBarAndHeroProps {
  completed: number;
  total: number;
  percentage: number;
  milestones: MilestoneItem[];
  onExport: () => void;
  exportMessage: string;
  onResetAll: () => void;
}

const CHAPTER_LINKS = [
  { num: '00', label: 'Opening Rescue', href: '#sec-opening' },
  { num: '01', label: 'Safety & CATALYST', href: '#sec-foundations' },
  { num: '02', label: 'Chief of Staff', href: '#sec-pillar1' },
  { num: '03', label: 'Multiplier', href: '#sec-pillar2' },
  { num: '04', label: 'Organisation', href: '#sec-pillar3' },
  { num: '05', label: 'Future', href: '#sec-pillar4' },
  { num: '06', label: '24 Prompts & 90-Day', href: '#sec-prompts' },
];

export function TopBarAndHero({
  completed,
  total,
  percentage,
  milestones,
  onExport,
  exportMessage,
  onResetAll,
}: TopBarAndHeroProps) {
  const [resetArmed, setResetArmed] = useState(false);

  const handleResetClick = () => {
    if (!resetArmed) {
      setResetArmed(true);
      return;
    }
    setResetArmed(false);
    onResetAll();
  };

  return (
    <div id="sec-opening">
      {/* Three-Zone Top Bar Contract */}
      <header className="flex items-center justify-between gap-3 sm:gap-6 border-b-[1.5px] border-ink pb-4 mb-8">
        <a
          href="#sec-opening"
          className="font-serif text-base sm:text-xl font-semibold tracking-tight text-ink whitespace-nowrap truncate min-w-0 hover:text-slate-teal transition-colors"
        >
          AI-Powered Productive Life
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-ink-muted"
        >
          <a href="#sec-foundations" className="hover:text-ink hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Foundations
          </a>
          <a href="#sec-pillar1" className="hover:text-ink hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Chief of Staff
          </a>
          <a href="#sec-pillar2" className="hover:text-ink hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Multiplier
          </a>
          <a href="#sec-pillar3" className="hover:text-ink hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Organisation
          </a>
          <a href="#sec-prompts" className="hover:text-ink hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            24 Prompts
          </a>
        </nav>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-semibold bg-ink text-paper hover:bg-slate-teal transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="sm:hidden">Export</span>
            <span className="hidden sm:inline">Export Workbook</span>
          </button>
        </div>
      </header>

      {/* Dossier Meta Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-ink-muted mb-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold text-ink uppercase bg-accent-gold px-2 py-0.5 rounded-[2px]">
            Masterclass Dossier
          </span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="uppercase tracking-wide">
            One-Day Public-Sector Programme · 08:00–15:00 · 4 Pillars · 10 Workbooks · 24 Prompts
          </span>
        </div>
        <span className="uppercase tracking-wide">Auto-saved locally</span>
      </div>

      {/* Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] gap-8 items-start">
        <div>
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-[3.75rem] tracking-[-0.025em] leading-[1.06] text-ink mb-4 max-w-[18ch]">
            The AI-Powered Productive Life
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-teal leading-[1.45] mb-5 max-w-[64ch]">
            Designing AI-powered systems for personal productivity, professional excellence, and future
            readiness—moving from asking one-off questions to building reusable assistants, verified
            workflows, and a 90-day plan.
          </p>
          <p className="text-[1.02rem] text-ink/90 leading-relaxed max-w-[65ch] mb-6">
            Most professionals spend decades inside institutional structures—attending meetings, writing
            reports from scratch, and borrowing their routines from a job title. This interactive
            masterclass treats your life, your daily role, your department, and your future beyond any
            title as one connected design problem. Everything works on a smartphone with free-tier
            accounts, using fictional or public data so you learn safe hands before fast hands.
          </p>

          <EditorialNote label="Teacher's Promise — By the End of This Masterclass">
            You will leave with five working assets: a <strong>Personal Operating System</strong>, a
            tested <strong>Professional Assistant</strong>, a{' '}
            <strong>Document-Grounded Knowledge Notebook</strong>, a{' '}
            <strong>Departmental Workflow Redesign</strong>, and a{' '}
            <strong>Future-Readiness Plan v0.1</strong>—backed by the CATALYST Loop and a 24-prompt
            library.
          </EditorialNote>
        </div>

        {/* Workbook Progress Panel */}
        <aside className="bg-surface border border-rule rounded-md p-6">
          <div className="flex items-center justify-between gap-2 border-b-[1.5px] border-ink pb-2.5 mb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal">
              Workbook Progress
            </span>
            <span
              className="font-mono text-sm font-semibold text-ink tabular-nums"
              data-testid="mastery-pct"
            >
              {percentage}%
            </span>
          </div>

          <div
            className="font-serif text-xl font-semibold text-ink tabular-nums mb-2"
            data-testid="mastery-count"
          >
            {completed} of {total} Hands-On Milestones
          </div>

          <div
            className="w-full h-2.5 bg-stone-deep rounded-[2px] overflow-hidden mb-4"
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Masterclass completion progress"
          >
            <div
              className="h-full bg-slate-teal transition-transform duration-300 origin-left"
              style={{ transform: `scaleX(${percentage / 100})` }}
            />
          </div>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4 text-xs text-ink-muted">
            {milestones.map((m) => (
              <li key={m.id} className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 rounded-[2px] border shrink-0 ${
                    m.done
                      ? 'bg-forest text-paper border-forest'
                      : 'bg-paper text-transparent border-rule-strong'
                  }`}
                  aria-hidden="true"
                >
                  <Check className="w-3 h-3" />
                </span>
                <span className={m.done ? 'text-ink font-medium' : 'text-ink-muted'}>
                  {m.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-xs text-ink-muted leading-relaxed mb-4">
            Every exercise, workbook field, Context Card, and Gain Log entry saves automatically to
            your browser so you can pause and return.
          </p>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onExport} className={BTN_PRIMARY}>
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download (.txt)</span>
            </button>
            <button
              type="button"
              onClick={handleResetClick}
              onBlur={() => setResetArmed(false)}
              className={
                resetArmed
                  ? 'inline-flex items-center justify-center gap-2 min-h-[44px] px-3.5 py-2 rounded text-sm font-semibold bg-crimson text-paper border border-crimson cursor-pointer whitespace-nowrap shrink-0'
                  : BTN_SECONDARY
              }
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{resetArmed ? 'Click Again to Confirm Reset' : 'Reset Progress'}</span>
            </button>
          </div>

          {exportMessage && (
            <p className="font-mono text-xs font-semibold text-forest mt-3" role="status">
              {exportMessage}
            </p>
          )}
        </aside>
      </div>

      {/* Chapter Navigation Strip */}
      <nav
        aria-label="Masterclass chapters"
        className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2 py-4 my-8 border-y border-rule"
      >
        {CHAPTER_LINKS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-2.5 py-2 text-[13px] font-semibold text-ink bg-surface border border-rule rounded hover:bg-stone-tint hover:border-ink transition-colors whitespace-nowrap shrink-0 lg:flex-1"
          >
            <span className="font-mono text-xs text-slate-teal">{item.num}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
