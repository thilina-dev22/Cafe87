import { useEffect } from 'react';

// Closes on Escape and forwards arrow keys while a dialog is open.
export default function useDialogKeys(isOpen, { onClose, onNext, onPrev } = {}) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const handler = (e) => {
      if (e.key === 'Escape') onClose?.();
      else if (e.key === 'ArrowRight') onNext?.();
      else if (e.key === 'ArrowLeft') onPrev?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose, onNext, onPrev]);
}
