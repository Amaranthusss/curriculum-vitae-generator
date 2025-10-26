import type { TriggerSignalProfile } from "../form/interface";

export interface ColorsStore extends Colors {
	getColors: GetColors;
  setColors: SetColors;
	signalProfile: number | null;
	triggerSignalProfile: TriggerSignalProfile;
}

export interface Colors {
  primaryColor: React.CSSProperties["color"];
  primaryBgColor: React.CSSProperties["color"];
  secondaryColor: React.CSSProperties["color"];
  sidebarColor: React.CSSProperties["color"];
  sidebarBgColor: React.CSSProperties["color"];
  sidebarSidebarCaptionColor: React.CSSProperties["color"];
  sidebarSidebarCaptionBgColor: React.CSSProperties["color"];
}

export type SetColors = (partial: Partial<ColorsStore>) => void;

export type GetColors = () => Colors;
