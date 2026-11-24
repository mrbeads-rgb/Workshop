import { useEffect, useState } from 'react';
import {
  buildWorkbookExportText,
  calculateMasteryProgress,
  createInitialState,
  type WorkbookState,
} from './utils/workbookLogic';
import {
  clearPersistedState,
  loadPersistedState,
  savePersistedState,
  triggerTextDownload,
} from './utils/browserHelpers';
import { TopBarAndHero } from './components/TopBarAndHero';
import { OpeningSection } from './components/OpeningSection';
import { FoundationsSection } from './components/FoundationsSection';
import { PillarOneSection } from './components/PillarOneSection';
import { PillarTwoSection } from './components/PillarTwoSection';
import { PillarThreeSection } from './components/PillarThreeSection';
import { PillarFourSection } from './components/PillarFourSection';
import { PromptLibrarySection } from './components/PromptLibrarySection';
import { ClosingSection } from './components/ClosingSection';

export default function App() {
  const [state, setState] = useState<WorkbookState>(() => loadPersistedState());
  const [exportMessage, setExportMessage] = useState('');

  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  const mastery = calculateMasteryProgress(state);

  const handleExport = () => {
    const content = buildWorkbookExportText(state);
    const ok = triggerTextDownload(content, 'ai_productive_life_workbook.txt');
    setExportMessage(
      ok
        ? 'Workbook downloaded (ai_productive_life_workbook.txt).'
        : 'Unable to trigger download in this browser.'
    );
    setTimeout(() => setExportMessage(''), 4000);
  };

  const handleResetAll = () => {
    clearPersistedState();
    setState(createInitialState());
    setExportMessage('Workbook reset to clean state.');
    setTimeout(() => setExportMessage(''), 3500);
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        <TopBarAndHero
          completed={mastery.completed}
          total={mastery.total}
          percentage={mastery.percentage}
          milestones={mastery.milestones}
          onExport={handleExport}
          exportMessage={exportMessage}
          onResetAll={handleResetAll}
        />

        <main>
          <OpeningSection
            e1Text={state.e1Text}
            e1Sealed={state.e1Sealed}
            onChangeE1Text={(e1Text) => setState((s) => ({ ...s, e1Text }))}
            onToggleSeal={(e1Sealed) => setState((s) => ({ ...s, e1Sealed }))}
          />

          <FoundationsSection
            e2Choices={state.e2Choices}
            onPickE2Card={(id, choice) =>
              setState((s) => ({
                ...s,
                e2Choices: { ...s.e2Choices, [id]: choice },
              }))
            }
            catalystStep={state.catalystStep}
            onSetCatalystStep={(catalystStep) => setState((s) => ({ ...s, catalystStep }))}
            catCard={state.catCard}
            onUpdateCatCard={(field, value) =>
              setState((s) => ({
                ...s,
                catCard: { ...s.catCard, [field]: value },
              }))
            }
          />

          <PillarOneSection
            t1={state.t1}
            onUpdateT1={(patch) =>
              setState((s) => ({ ...s, t1: { ...s.t1, ...patch } }))
            }
            pcc={state.pcc}
            onUpdatePcc={(patch) =>
              setState((s) => ({ ...s, pcc: { ...s.pcc, ...patch } }))
            }
            t3={state.t3}
            onUpdateT3={(patch) =>
              setState((s) => ({ ...s, t3: { ...s.t3, ...patch } }))
            }
          />

          <PillarTwoSection
            e5Pack={state.e5Pack}
            onSetE5Pack={(e5Pack) => setState((s) => ({ ...s, e5Pack }))}
            e5Checked={state.e5Checked}
            onToggleE5Ambiguity={(key) =>
              setState((s) => ({
                ...s,
                e5Checked: s.e5Checked.includes(key)
                  ? s.e5Checked.filter((k) => k !== key)
                  : [...s.e5Checked, key],
              }))
            }
            e6Step={state.e6Step}
            onSetE6Step={(e6Step) => setState((s) => ({ ...s, e6Step }))}
            e6Log={state.e6Log}
            onUpdateE6Verdict={(idx, verdict) =>
              setState((s) => ({
                ...s,
                e6Log: s.e6Log.map((row, i) => (i === idx ? { ...row, verdict } : row)),
              }))
            }
            t5={state.t5}
            onUpdateT5={(t5) => setState((s) => ({ ...s, t5 }))}
          />

          <PillarThreeSection
            e8QuestionIdx={state.e8QuestionIdx}
            e8Doc={state.e8Doc}
            onSelectE8Question={(idx) =>
              setState((s) => ({
                ...s,
                e8QuestionIdx: idx,
                e8Tested: s.e8Tested.includes(idx) ? s.e8Tested : [...s.e8Tested, idx],
              }))
            }
            onSelectE8Doc={(e8Doc) => setState((s) => ({ ...s, e8Doc }))}
            t6={state.t6}
            onUpdateT6={(patch) =>
              setState((s) => ({ ...s, t6: { ...s.t6, ...patch } }))
            }
            t7={state.t7}
            onUpdateT7={(t7) => setState((s) => ({ ...s, t7 }))}
          />

          <PillarFourSection
            e1Text={state.e1Text}
            t8Skills={state.t8Skills}
            onSetT8Skills={(t8Skills) => setState((s) => ({ ...s, t8Skills }))}
            t8Lesson={state.t8Lesson}
            onUpdateT8Lesson={(patch) =>
              setState((s) => ({ ...s, t8Lesson: { ...s.t8Lesson, ...patch } }))
            }
            t9={state.t9}
            onUpdateT9={(patch) =>
              setState((s) => ({ ...s, t9: { ...s.t9, ...patch } }))
            }
          />

          <PromptLibrarySection
            savedPrompts={state.savedPrompts}
            onToggleSavePrompt={(id) =>
              setState((s) => ({
                ...s,
                savedPrompts: s.savedPrompts.includes(id)
                  ? s.savedPrompts.filter((p) => p !== id)
                  : [...s.savedPrompts, id],
              }))
            }
          />

          <ClosingSection
            t10={state.t10}
            onUpdateT10={(patch) =>
              setState((s) => ({ ...s, t10: { ...s.t10, ...patch } }))
            }
            gainLog={state.gainLog}
            onAddGainLog={(row) =>
              setState((s) => ({ ...s, gainLog: [...s.gainLog, row] }))
            }
            onRemoveGainLog={(idx) =>
              setState((s) => ({
                ...s,
                gainLog: s.gainLog.filter((_, i) => i !== idx),
              }))
            }
          />
        </main>
      </div>
    </div>
  );
}
