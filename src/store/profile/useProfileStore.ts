import { useFormStore } from "../form/useFormStore";

import { devtools } from "zustand/middleware";
import { create } from "zustand";
import dayjs from "dayjs";
import _ from "lodash";

import type { FormDate, FormDatePool, Profile, ProfileStore } from "./interface";

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
					const json: string = JSON.stringify(profile, null, 2);
					const blob: Blob = new Blob([json], { type: "application/json" });
					const url: string = URL.createObjectURL(blob);
					const link: HTMLAnchorElement = document.createElement("a");

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
								const loadedProfile: Profile = JSON.parse(text);

								loadedProfile.education = mapIsoStringDates(loadedProfile.education);
								loadedProfile.experience = mapIsoStringDates(loadedProfile.experience);

								set(loadedProfile);
								useFormStore.getState().triggerSignalProfile();
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

const mapIsoStringDates = <T extends FormDatePool>(fields: T[]): T[] => {
	return _.map(fields, e => ({ ...e, date: toFormDate(e.date) }));
}

const toFormDate = (date: FormDate): FormDate => {
	const value: FormDate['value'] =
		_.isNil(date.value) ? null
			: _.isArray(date.value) && date.value.length === 2 ? _.map(date.value, dayjs)
				: _.isString(date.value) ? dayjs(date.value)
					: null;

	return { value, present: date.present ?? false };
}