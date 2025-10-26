import { useColorsStore } from "../colors/useColorsStore";
import { useFormStore } from "../form/useFormStore";

import { devtools } from "zustand/middleware";
import { create } from "zustand";
import dayjs from "dayjs";
import i18n from "../../utils/i18n";
import _ from "lodash";

import type { FormDate, FormDatePool, Profile, ProfileFile, ProfileStore } from "./interface";
import type { Language } from "../../constants/Language";
import type { Colors } from "../colors/interface";
import type { Dayjs } from "dayjs";

import { ProfileKeys } from "./constants";
import { ColorsKeys } from "../colors/constants";

export const useProfileStore = create<ProfileStore>()(
	devtools(
		(set, get): ProfileStore => {
			return {
				name: "",
				surname: "",
				aboutMe: "",
				picture: "",
				email: "",
				country: "",
				links: [],
				languages: [],
				education: [],
				experience: [],
				qualifications: [],
				publications: [],

				getProfile: (): Profile => {
					return _.omit(get(), ['getProfile', 'saveProfile', 'loadProfile'] satisfies (keyof ProfileStore)[]);
				},

				saveProfile: (): void => {
					const profile: Profile = get().getProfile();
					const colors: Colors = useColorsStore.getState().getColors();

					const profileFile: ProfileFile = {
						...profile,
						...colors,
						version: dayjs().toISOString(),
						language: i18n.language as Language
					};

					const json: string = JSON.stringify(profileFile, null, 2);
					const blob: Blob = new Blob([json], { type: "application/json" });
					const url: string = URL.createObjectURL(blob);
					const link: HTMLAnchorElement = document.createElement("a");

					console.log('colors', colors)
					console.log('profile', profile)
					console.log('profileFile', profileFile)

					link.href = url;
					link.download = (useFormStore.getState().joinNameAndSurname() ?? 'profile') + ".json";
					link.click();
					URL.revokeObjectURL(url);
				},

				loadProfile: async () => {
					return new Promise<void>((resolve: () => void, reject: (reason: Error | string) => void) => {
						const input: HTMLInputElement = document.createElement("input");

						input.type = "file";
						input.accept = "application/json";
						input.style.display = "none";

						input.onchange = async (e: Event): Promise<void> => {
							const file: File | undefined = (e.target as HTMLInputElement).files?.[0];

							if (file == null) return reject("The file has not been selected.");

							try {
								const text: string = await file.text();
								const loadedProfile: ProfileFile = JSON.parse(text);

								loadedProfile.education = mapFormDatePoolIsoStringDates(loadedProfile.education);
								loadedProfile.experience = mapFormDatePoolIsoStringDates(loadedProfile.experience);
								loadedProfile.publications = mapDateParam(loadedProfile.publications, 'publicationYear');
								loadedProfile.qualifications = mapDateParam(loadedProfile.qualifications, 'issueDate');

								const profile: Profile = _.pick(loadedProfile, ProfileKeys);
								const colors: Colors = _.pick(loadedProfile, ColorsKeys);

								set(profile);
								useFormStore.getState().triggerSignalProfile();
								useColorsStore.getState().setColors(colors);
								useColorsStore.getState().triggerSignalProfile();
								i18n.changeLanguage(loadedProfile.language)
								resolve();
							} catch (error: unknown) {
								console.error("Could not read the file", error);
								reject(error as Error | string);
							}
						};

						document.body.appendChild(input);
						input.click();
						document.body.removeChild(input);
					});
				},
			};
		},
		{ name: "profile-store" }
	)
);

const mapFormDatePoolIsoStringDates = <T extends FormDatePool>(fields: T[]): T[] => {
	return _.map(fields, e => ({ ...e, date: toFormDate(e.date) }));
}

const toFormDate = (date: FormDate): FormDate => {
	const value: FormDate['value'] =
		_.isNil(date.value) ? null
			: _.isArray(date.value) && date.value.length === 2 ? _.map(date.value, v => _.isNil(v) ? null : dayjs(v))
				: _.isString(date.value) ? dayjs(date.value)
					: null;

	return { value, present: date.present ?? false };
}

const mapSingleDate = (value: Dayjs | null | undefined): Dayjs | null => {
	return !_.isNil(value) && _.isString(value) ? dayjs(value)
		: dayjs.isDayjs(value) ? value
			: null;
}

type KeysWithDate<T> = {
	[P in keyof T]: T[P] extends Dayjs | null | undefined ? P : never
}[keyof T];

const mapDateParam = <T, K extends KeysWithDate<T>>(
	list: T[],
	dateParam: K
): T[] => {
	return _.map(list, (p: T): T => {
		return {
			...p,
			[dateParam]: mapSingleDate(p[dateParam] as Dayjs | null | undefined)
		};
	});
};