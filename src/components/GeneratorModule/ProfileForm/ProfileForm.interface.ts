import type { Profile } from "../../../store/profile/interface";

export interface ProfileFieldData {
  name: [keyof Profile];
  value?: Profile[keyof Profile];
}
