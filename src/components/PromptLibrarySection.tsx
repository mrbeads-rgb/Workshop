import { useState } from 'react';
import { Bookmark, BookmarkCheck, Copy, ChevronDown } from 'lucide-react';
import { PROMPTS, type PromptItem } from '../data/masterclassData';
import {
  applyPromptPlaceholders,
  extractPromptPlaceholders,
  filterPrompts,
} from '../utils/workbookLogic';
import { copyToClipboard } from '../utils/browserHelpers';
import {
  BTN_ACTIVE,
  BTN_PRIMARY,
  BTN_SECONDARY,
  FIELD_LABEL_CLASSES,
  INPUT_CLASSES,
  SectionHeader,
} from './DossierPrimitives';

interface PromptLibrarySectionProps {
  savedPrompts: string[];
  onToggleSavePrompt: (id: string) => void;
}

type PillarFilter = 'ALL' | '1' | '2' | '3' | '4' | 'SAVED';

function PromptCard({
  item,
  isSaved,
  onToggleSave,
}: {
  item: PromptItem;
  isSaved: boolean;
  onToggleSave: () => void;
}) {
  const placeholders = extractPromptPlaceholders(item.prompt);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copyMsg, setCopyMsg] = useState('');

  const handleCopy = async () => {
    const finalPrompt = applyPromptPlaceholders(item.prompt, values);
    const ok = await copyToClipboard(finalPrompt);
    setCopyMsg(ok ? `Prompt ${item.id} copied to clipboard.` : 'Select text manually to copy.');
    setTimeout(() => setCopyMsg(''), 3500);
  };

  return (
    <article
      data-testid={`prompt-card-${item.id}`}
      className="bg-surface border border-rule rounded-md p-5 flex flex-col justify-between gap-3.5"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-2.5 mb-3">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="font-semibold text-slate-teal">{item.id}</span>
            <span className="text-ink-muted" aria-hidden="true">
              ·
            </span>
            <span className="text-ink-muted uppercase">Pillar {item.pillar}</span>
            <span className="text-ink-muted" aria-hidden="true">
              ·
            </span>
            <span
              className={`font-semibold uppercase ${
                item.data === 'Green' ? 'text-forest' : 'text-ochre'
              }`}
            >
              {item.data} Data
            </span>
          </div>

          <button
            type="button"
            aria-pressed={isSaved}
            onClick={onToggleSave}
            className={`inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isSaved
                ? 'bg-slate-teal text-paper border-slate-teal'
                : 'bg-surface text-ink border-rule-strong hover:bg-stone-tint'
            }`}
          >
            {isSaved ? (
              <BookmarkCheck className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{isSaved ? 'Saved to T4' : 'Save to T4'}</span>
          </button>
        </div>

        <h3 className="font-serif text-xl font-semibold text-ink mb-1">{item.title}</h3>
        <p className="text-sm text-ink-muted mb-3">
          <strong className="text-ink">Use when:</strong> {item.when}
        </p>

        <div className="bg-paper border border-rule rounded p-3.5 text-sm leading-relaxed text-ink mb-3">
          {item.prompt}
        </div>

        <p className="text-xs text-ink-muted leading-relaxed">
          <strong className="text-ink">Verify before use:</strong> {item.verify}
        </p>
      </div>

      <details className="bg-paper border border-rule rounded-md px-3.5 py-2 group">
        <summary className="flex items-center justify-between gap-2 min-h-[40px] font-semibold text-sm text-slate-teal cursor-pointer list-none">
          <span>
            Customise Placeholders &amp; Copy ({placeholders.length}{' '}
            {placeholders.length === 1 ? 'field' : 'fields'})
          </span>
          <ChevronDown
            className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div className="pt-3 pb-1 border-t border-rule mt-2">
          {placeholders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {placeholders.map((ph) => {
                const cleanLabel = ph.replace(/\[|\]/g, '').replace(/_/g, ' ');
                const inputId = `ph-${item.id}-${cleanLabel.replace(/\s+/g, '-').toLowerCase()}`;
                return (
                  <div key={ph}>
                    <label htmlFor={inputId} className={FIELD_LABEL_CLASSES}>
                      {cleanLabel}
                    </label>
                    <input
                      id={inputId}
                      type="text"
                      value={values[ph] ?? ''}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [ph]: e.target.value }))
                      }
                      placeholder={`Enter ${cleanLabel.toLowerCase()}...`}
                      className={INPUT_CLASSES}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-ink-muted mb-3">
              No custom placeholders needed—ready to copy as written.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={handleCopy} className={BTN_PRIMARY}>
              <Copy className="w-4 h-4" aria-hidden="true" />
              <span>Copy Tailored Prompt</span>
            </button>
            {copyMsg && (
              <span className="font-mono text-xs font-semibold text-forest" role="status">
                {copyMsg}
              </span>
            )}
          </div>
        </div>
      </details>
    </article>
  );
}

export function PromptLibrarySection({
  savedPrompts,
  onToggleSavePrompt,
}: PromptLibrarySectionProps) {
  const [pillar, setPillar] = useState<PillarFilter>('ALL');
  const [dataFilter, setDataFilter] = useState<'ALL' | 'Green' | 'Amber'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = filterPrompts(PROMPTS, pillar, dataFilter, search, savedPrompts);

  const tabs: { key: PillarFilter; label: string }[] = [
    { key: 'ALL', label: 'All (24)' },
    { key: '1', label: 'Pillar 1 · Personal (P1–P6)' },
    { key: '2', label: 'Pillar 2 · Management (P7–P12)' },
    { key: '3', label: 'Pillar 3 · Organisation (P13–P18)' },
    { key: '4', label: 'Pillar 4 · Future (P19–P24)' },
    { key: 'SAVED', label: `Saved to T4 (${savedPrompts.length})` },
  ];

  return (
    <section id="sec-prompts" className="scroll-mt-6 mb-20">
      <SectionHeader
        sectionCode="Section 06 · Prompt Studio"
        meta="24 CATALYST Prompts · Customise, Copy & Log"
        duration="P1 – P24"
        title="The Complete 24-Prompt Library"
        standfirst="Every prompt follows the CATALYST anatomy: Role, Context, Task, Format, and a final Verification Check. Filter by pillar, fill placeholders inline, and save your favourites to your T4 library."
      />

      {/* Filter Bar */}
      <div className="bg-surface border border-rule rounded-md p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="prompt-search" className={FIELD_LABEL_CLASSES}>
              Search Prompts by Keyword or Use Case
            </label>
            <input
              id="prompt-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search minutes, KPI, audit, learning, retirement..."
              className={INPUT_CLASSES}
            />
          </div>
          <div>
            <label htmlFor="prompt-data-filter" className={FIELD_LABEL_CLASSES}>
              Filter by Data Class
            </label>
            <select
              id="prompt-data-filter"
              value={dataFilter}
              onChange={(e) => setDataFilter(e.target.value as 'ALL' | 'Green' | 'Amber')}
              className={INPUT_CLASSES}
            >
              <option value="ALL">All Data Classes</option>
              <option value="Green">Green Only (Personal / Public)</option>
              <option value="Amber">Amber (Anonymise / Approved)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Prompt pillar filters">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={pillar === tab.key}
              onClick={() => setPillar(tab.key)}
              className={pillar === tab.key ? BTN_ACTIVE : BTN_SECONDARY}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="font-mono text-xs text-ink-muted mb-3 tabular-nums" data-testid="prompt-count">
        Showing {filtered.length} of {PROMPTS.length} prompts
      </div>

      {/* Prompt Grid */}
      {filtered.length === 0 ? (
        <div className="bg-surface border border-rule rounded-md p-8 text-center">
          <p className="text-sm text-ink-muted mb-3">
            No prompts match that filter. Clear your search or switch back to All (24).
          </p>
          <button
            type="button"
            onClick={() => {
              setPillar('ALL');
              setDataFilter('ALL');
              setSearch('');
            }}
            className={BTN_SECONDARY}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <PromptCard
              key={item.id}
              item={item}
              isSaved={savedPrompts.includes(item.id)}
              onToggleSave={() => onToggleSavePrompt(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
