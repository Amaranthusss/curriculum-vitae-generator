import { isCompact } from "../../utils/isCompact";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

import type { AppStore } from "./interface";

export const useAppStore = create<AppStore>()(
  devtools(
    (): AppStore => {
      return {
        isCompact: isCompact(),
      };
    },
    { name: "app-store" }
  )
);
