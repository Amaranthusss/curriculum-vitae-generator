export type ProfileStore = Profile;

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
  links: LinkField[];
}

export type SetProfileParams = (partial: Partial<Profile>) => void;

export interface QualificationField {
  type: string;
  name: string;
  description?: string;
  issueDate?: string | null;
}

export interface DatePool {
  text: string;
  startDate: IsoString | null;
  endDate: IsoString | null;
}

export interface LanguageField {
  text: string;
  level: LanguageLevel;
}

export type ExperienceField = DatePool;

export type EducationField = DatePool;

export interface LinkField {
  label: string;
  icon?: string;
  link: string;
}
