import { createInitialState, type WorkbookState } from './workbookLogic';

const STORAGE_KEY = 'ai_productive_life_masterclass_v1';

export function loadPersistedState(): WorkbookState {
  const fallback = createInitialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<WorkbookState>;
    if (!parsed || typeof parsed !== 'object') return fallback;
    return {
      ...fallback,
      ...parsed,
      catCard: { ...fallback.catCard, ...(parsed.catCard ?? {}) },
      t1: { ...fallback.t1, ...(parsed.t1 ?? {}) },
      pcc: { ...fallback.pcc, ...(parsed.pcc ?? {}) },
      t3: { ...fallback.t3, ...(parsed.t3 ?? {}) },
      t5: { ...fallback.t5, ...(parsed.t5 ?? {}) },
      t6: { ...fallback.t6, ...(parsed.t6 ?? {}) },
      t7: { ...fallback.t7, ...(parsed.t7 ?? {}) },
      t8Lesson: { ...fallback.t8Lesson, ...(parsed.t8Lesson ?? {}) },
      t9: { ...fallback.t9, ...(parsed.t9 ?? {}) },
      t10: { ...fallback.t10, ...(parsed.t10 ?? {}) },
      e2Choices: parsed.e2Choices ?? fallback.e2Choices,
      e5Checked: Array.isArray(parsed.e5Checked) ? parsed.e5Checked : fallback.e5Checked,
      e6Log: Array.isArray(parsed.e6Log) ? parsed.e6Log : fallback.e6Log,
      e8Tested: Array.isArray(parsed.e8Tested) ? parsed.e8Tested : fallback.e8Tested,
      t8Skills: Array.isArray(parsed.t8Skills) ? parsed.t8Skills : fallback.t8Skills,
      savedPrompts: Array.isArray(parsed.savedPrompts) ? parsed.savedPrompts : fallback.savedPrompts,
      gainLog: Array.isArray(parsed.gainLog) ? parsed.gainLog : fallback.gainLog,
    };
  } catch {
    return fallback;
  }
}

export function savePersistedState(state: WorkbookState): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearPersistedState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage restriction
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function triggerTextDownload(content: string, filename: string): boolean {
  try {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    return false;
  }
}
