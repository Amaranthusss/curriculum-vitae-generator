export interface AppStore {
	isCompact: boolean;
	renderMode: RenderMode;
  signalManualRender: number | null;
	triggerSignalManualProfile: TriggerSignalManualProfile;
}

export type RenderMode = 'onChange' | 'debounced' | 'manual';

export type TriggerSignalManualProfile = () => void;