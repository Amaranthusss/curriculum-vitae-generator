import type { QualificationField } from "../profile/interface";
import type { PublicationField } from "../profile/interface";
import type { Profile } from "../profile/interface";
import type { Dayjs } from "dayjs";

export interface FormStore {
  updateValues: UpdateValues;
  joinNameAndSurname: JoinNameAndSurname;
  getInitialFormValues: GetInitialFormValues;
}

export type UpdateValues = (values: Partial<ProfileFormValues>) => void;

export type JoinNameAndSurname = () => string | null;

export type GetInitialFormValues = () => ProfileFormValues;

export interface ProfileFormValues
  extends Omit<Profile, "education" | "experience"> {
  education: FormEducation[];
  experience: FormExperience[];
}

export interface FormDatePool {
  date: LimitedArray<Dayjs, 2> | null;
}

export interface FormEducation extends FormDatePool {
  title: string;
  description: string;
}

export interface FormExperience extends FormDatePool {
  workStation: string;
  description: string;
}

export type FormQualification = QualificationField;

export type FormPublication = PublicationField;
