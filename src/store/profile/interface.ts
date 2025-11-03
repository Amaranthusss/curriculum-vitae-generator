import type { DisplayLimit } from "../../constants/DisplayLimit";
import type { Alignment } from "pdfmake/interfaces";
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

interface DateDisplayLimit {
	dateDisplayLimit: DisplayLimit;
}

export interface GeneralSettings {
	education: DateDisplayLimit;
	experience: DateDisplayLimit;
	publications: DateDisplayLimit;
	qualifications: DateDisplayLimit;
}

export interface Profile {
	name: string;
	surname: string;
	email: string;
	mobile: string;
	country: string;
	aboutMe?: string;
	aboutMeAlignment: Alignment;
	footer?: string;
	footerTopMargin: number;
	footerAlignment: Alignment;
	interests?: string;
	interestsAlignment: Alignment;
	isAboutMeAtPage?: boolean;
	dateColumnWidths: number;
	dateDisplayStyle: DateDisplayStyle;
	picture: string;
	languages: LanguageField[];
	education: EducationField[];
	experience: ExperienceField[];
	qualifications: QualificationField[];
	publications: PublicationField[];
	references: ReferenceField[];
	generalSettings: GeneralSettings;
}

export type ProfileFile = Profile & Colors & { version: string, language: Language };

export type SetProfileParams = (partial: Partial<Profile>) => void;

export interface OrderIndex {
	orderIndex: number;
}

export interface FormDatePool {
	date: FormDate;
}

export interface PublicationField extends FormDatePool, OrderIndex {
	title: string;
	publisher: string;
	code: string;
}

export interface QualificationField extends FormDatePool, OrderIndex {
	type: string;
	name: string;
	description?: string;
}

export interface LanguageField extends OrderIndex {
	text: string;
	level: LanguageLevel;
}

export interface FormDate {
	value: Dayjs | LimitedArray<Dayjs | null, 2> | null;
	displayLimit?: DisplayLimit;
	present?: boolean;
}

export interface EducationField extends FormDatePool, OrderIndex {
	title: string;
	description: string;
}

export interface ExperienceField extends FormDatePool, OrderIndex {
	workStation: string;
	description: string;
}

export interface ReferenceField extends OrderIndex {
	label: string;
	icon?: string;
	link: string;
}

export type DateDisplayStyle = 'inline' | 'seperated-vertical' | 'vertical' | 'from-to';
