import { useEffect } from 'react';

export const useFocusTrap = (ref: React.RefObject<HTMLDivElement | null>, active: boolean) => {
  useEffect(() => {
    if (!active || !ref.current) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusableEls = Array.from(ref.current.querySelectorAll<HTMLElement>(focusableSelectors));

    if (focusableEls.length === 0) return;

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    // Focus first element when menu opens
    firstEl.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [ref, active]);
};
