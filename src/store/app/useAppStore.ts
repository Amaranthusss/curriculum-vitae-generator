import { isCompact } from "../../utils/isCompact";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

import type { AppStore } from "./interface";

export const useAppStore = create<AppStore>()(
	devtools(
		(set, get): AppStore => {
			return {
				isCompact: isCompact(),
				renderMode: 'debounced',
				signalManualRender: null,

				triggerSignalManualProfile: (): void => {
					set({ signalManualRender: (get().signalManualRender ?? 0) + 1 });
				}
			};
		},
		{ name: "app-store" }
	)
);
