import type { Profile } from "../profile/interface";

export interface FormStore {
	updateValues: UpdateValues;
	joinNameAndSurname: JoinNameAndSurname;
	getInitialFormValues: GetInitialFormValues;
  signalProfile: number | null;
	triggerSignalProfile: TriggerSignalProfile;
}

export type UpdateValues = (values: Partial<Profile>) => void;

export type JoinNameAndSurname = () => string | null;

export type GetInitialFormValues = () => Profile;

export type TriggerSignalProfile = () => void;