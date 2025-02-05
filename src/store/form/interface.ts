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
  text: string;
  date: LimitedArray<Dayjs, 2> | null;
}

export type FormEducation = FormDatePool;

export type FormExperience = FormDatePool;

export type FormQualification = QualificationField;

export type FormPublication = PublicationField;
