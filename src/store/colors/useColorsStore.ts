import { devtools } from "zustand/middleware";
import { create } from "zustand";
import _ from "lodash";

import type { Colors, ColorsStore } from "./interface";

export const useColorsStore = create<ColorsStore>()(
	devtools(
		(set, get): ColorsStore => {
			return {
				signalProfile: null,
				primaryColor: "#ffffff",
				primaryBgColor: "#00439c",
				secondaryColor: "#6ea9f5",
				sidebarColor: "#ffffff",
				sidebarBgColor: "#1d1c1c",
				sidebarSidebarCaptionColor: "#ffffff",
				sidebarSidebarCaptionBgColor: "#2e2e2e",

				getColors: (): Colors => {
					return _.omit(get(), [
						'getColors',
						'setColors',
						'signalProfile',
						'triggerSignalProfile',
					] satisfies (keyof ColorsStore)[]);
				},

				setColors: (partial: Partial<ColorsStore>): void => set(partial),

				triggerSignalProfile: (): void => {
					set({ signalProfile: (get().signalProfile ?? 0) + 1 });
				}
			};
		},
		{ name: "colors-store" }
	)
);
