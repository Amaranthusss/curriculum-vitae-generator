import type { Dayjs } from "dayjs";

export interface ProfileStore extends Profile
{
	getProfile: () => Profile;
	saveProfile: () => void;
	loadProfile: () => Promise<void>;
};

export enum LanguageLevel {
  A1,
  A2,
  B1,
  B2,
  C1,
  C2,
}

export interface Profile {
  name: string;
  surname: string;
  email: string;
  country: string;
  aboutMe?: string;
  picture: string;
  languages: LanguageField[];
  education: EducationField[];
  experience: ExperienceField[];
  qualifications: QualificationField[];
  publications: PublicationField[];
  links: LinkField[];
}

export type SetProfileParams = (partial: Partial<Profile>) => void;

export interface PublicationField {
  title: string;
  publisher: string;
  code: string;
  publicationYear?: Dayjs | null;
}

export interface QualificationField {
  type: string;
  name: string;
  description?: string;
  issueDate?: string | null;
}

export interface LanguageField {
  text: string;
  level: LanguageLevel;
}

export interface FormDate {
  value: Dayjs | LimitedArray<Dayjs, 2> | null;
  present: boolean;
}
export interface FormDatePool {
  date: FormDate;
}

export interface EducationField extends FormDatePool {
  title: string;
  description: string;
}

export interface ExperienceField extends FormDatePool {
  workStation: string;
  description: string;
}

export interface LinkField {
  label: string;
  icon?: string;
  link: string;
}
