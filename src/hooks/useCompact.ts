import { useCallback, useLayoutEffect } from "react";

import { useAppStore } from "../store/app/useAppStore";

import { isCompact } from "../utils/isCompact";

export const useCompact = (): void => {
  const onResize = useCallback((): void => {
    useAppStore.setState({ isCompact: isCompact() });
  }, []);

  useLayoutEffect((): (() => void) => {
    window.addEventListener("resize", onResize);

    return (): void => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
};
