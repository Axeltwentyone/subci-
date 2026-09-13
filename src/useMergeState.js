import { useCallback, useState } from 'react';

export function useMergeState(initial) {
  const [state, setStateRaw] = useState(initial);
  const setState = useCallback((patch) => {
    setStateRaw((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }));
  }, []);
  return [state, setState];
}

export const fmt = (n) => Number(n).toLocaleString('fr-FR') + ' FCFA';
