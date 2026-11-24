import type { ReactNode } from 'react';

interface SectionHeaderProps {
  sectionCode: string;
  meta: string;
  duration?: string;
  title: string;
  standfirst: string;
}

export function SectionHeader({
  sectionCode,
  meta,
  duration,
  title,
  standfirst,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[1.5px] border-ink pb-2.5 mb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-ink-muted">
          <span className="font-semibold text-ink uppercase bg-accent-gold px-2 py-0.5 rounded-[2px]">
            {sectionCode}
          </span>
          <span aria-hidden="true">·</span>
          <span className="uppercase">{meta}</span>
        </div>
        {duration && (
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-teal uppercase tabular-nums">
            {duration}
          </span>
        )}
      </div>
      <h2 className="font-serif font-semibold text-3xl sm:text-4xl tracking-[-0.02em] leading-[1.12] text-ink mb-2.5">
        {title}
      </h2>
      <p className="text-base sm:text-lg font-medium text-slate-teal leading-relaxed max-w-[68ch]">
        {standfirst}
      </p>
    </div>
  );
}

interface CardHeaderBarProps {
  kicker: string;
  meta?: string;
  rightSlot?: ReactNode;
}

export function CardHeaderBar({ kicker, meta, rightSlot }: CardHeaderBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3 mb-4">
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wide text-ink-muted">
        <span className="font-semibold text-ink uppercase bg-accent-gold/85 px-2 py-0.5 rounded-[2px]">
          {kicker}
        </span>
        {meta && (
          <>
            <span aria-hidden="true">·</span>
            <span>{meta}</span>
          </>
        )}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
}

interface EditorialNoteProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function EditorialNote({ label, children, className = '' }: EditorialNoteProps) {
  return (
    <div
      className={`bg-stone-tint border border-rule border-t-[1.5px] border-t-slate-teal rounded-md px-5 py-4 ${className}`}
    >
      <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-teal mb-1.5">
        {label}
      </div>
      <div className="text-[0.95rem] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export const INPUT_CLASSES =
  'w-full min-h-[44px] rounded bg-surface border border-rule-strong px-3 py-2 text-[0.95rem] text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-slate-teal transition-shadow';

export const TEXTAREA_CLASSES =
  'w-full min-h-[96px] rounded bg-surface border border-rule-strong px-3 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-muted/70 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-slate-teal transition-shadow disabled:bg-stone-tint/60 disabled:text-ink-muted';

export const FIELD_LABEL_CLASSES =
  'block font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-1.5';

export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded text-sm font-semibold bg-ink text-paper hover:bg-slate-teal transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-not-allowed';

export const BTN_SECONDARY =
  'inline-flex items-center justify-center gap-2 min-h-[44px] px-3.5 py-2 rounded text-sm font-semibold bg-surface text-ink border border-rule-strong hover:bg-stone-tint hover:border-ink transition-colors cursor-pointer whitespace-nowrap shrink-0';

export const BTN_ACTIVE =
  'inline-flex items-center justify-center gap-2 min-h-[44px] px-3.5 py-2 rounded text-sm font-semibold bg-slate-teal text-paper border border-slate-teal transition-colors cursor-pointer whitespace-nowrap shrink-0';
