import type { Profile } from "../store/profile/interface";

export const ProfileKeys: (keyof Profile)[] = [
	'generalSettings',
	'dateColumnWidths',
	'dateDisplayStyle',
	'name',
	'surname',
	'country',
	'picture',
	'email',
	'mobile',
	'aboutMe',
	'footer',
	'isAboutMeAtPage',
	'languages',
	'education',
	'experience',
	'qualifications',
	'publications',
	'references',
];