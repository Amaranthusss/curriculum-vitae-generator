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
  languages: { text: string; level: LanguageLevel }[];
  education: Education[];
  experience: Experience[];
}

export type SetProfileParams = (partial: Partial<Profile>) => void;

export interface DatePool {
  text: string;
  startDate: IsoString | null;
  endDate: IsoString | null;
}

export type Experience = DatePool;

export type Education = DatePool;
