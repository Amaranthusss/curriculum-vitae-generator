import { devtools } from "zustand/middleware";
import { create } from "zustand";
import _ from "lodash";

import type { Colors, ColorsStore } from "./interface";

export const useColorsStore = create<ColorsStore>()(
  devtools(
    (set, get): ColorsStore => {
      return {
        primaryColor: "#ffffff",
        primaryBgColor: "#00439c",
        sidebarColor: "#ffffff",
        sidebarBgColor: "#1d1c1c",
        sidebarSidebarCaptionColor: "#ffffff",
        sidebarSidebarCaptionBgColor: "#2e2e2e",

        getInitialColors: (): Colors => {
          return _.omit(get(), [
            "setColors",
            "getInitialColors",
          ] satisfies (keyof ColorsStore)[]);
        },

        setColors: (partial: Partial<ColorsStore>): void => set(partial),
      };
    },
    { name: "colors-store" }
  )
);
