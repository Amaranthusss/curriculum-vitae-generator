import type { Profile } from "../store/profile/interface";

export const ProfileKeys: (keyof Profile)[] = [
	'generalSettings',
	'name',
	'surname',
	'country',
	'picture',
	'email',
	'mobile',
	'aboutMe',
	'isAboutMeAtPage',
	'languages',
	'education',
	'experience',
	'qualifications',
	'publications',
	'links',
];