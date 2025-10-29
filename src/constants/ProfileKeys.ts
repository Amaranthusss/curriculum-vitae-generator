import type { Profile } from "../store/profile/interface";

export const ProfileKeys: (keyof Profile)[] = [
	'aboutMe',
	'country',
	'education',
	'email',
	'experience',
	'languages',
	'links',
	'name',
	'picture',
	'publications',
	'qualifications',
	'surname',
	'generalSettings',
	'mobile'
];