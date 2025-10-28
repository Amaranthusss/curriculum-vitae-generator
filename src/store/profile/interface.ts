import type { DisplayLimit } from "../../constants/DisplayLimit";
import type { Language } from "../../constants/Language";
import type { Colors } from "../colors/interface";
import type { Dayjs } from "dayjs";

export interface ProfileStore extends Profile {
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

export type ProfileFile = Profile & Colors & { version: string, language: Language };

export type SetProfileParams = (partial: Partial<Profile>) => void;

export interface PublicationField {
	title: string;
	publisher: string;
	code: string;
	publicationYear?: Dayjs | null;
	publicationYearDisplayLimit?: DisplayLimit
}

export interface QualificationField {
	type: string;
	name: string;
	description?: string;
	issueDate?: Dayjs | null;
	issueDateDisplayLimit?: DisplayLimit
}

export interface LanguageField {
	text: string;
	level: LanguageLevel;
}

export interface FormDate {
	value: Dayjs | LimitedArray<Dayjs | null, 2> | null;
	displayLimit?: DisplayLimit
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
