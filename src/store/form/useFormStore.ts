import { useProfileStore } from "../profile/useProfileStore";
import { devtools } from "zustand/middleware";
import { create } from "zustand";
import dayjs from "dayjs";
import _ from "lodash";

import type { ProfileFormValues } from "./interface";
import type { FormDatePool } from "./interface";
import type { FormStore } from "./interface";
import type { DatePool } from "../profile/interface";
import type { Profile } from "../profile/interface";

const mapDates = <T extends keyof Profile & keyof ProfileFormValues>(
  param: T,
  value: ProfileFormValues[T],
  updated: Partial<Profile>
): void => {
  if (param !== "education" && param !== "experience") return;

  const mappedParam: "education" | "experience" = param;
  const mappedValue: FormDatePool[] = value as FormDatePool[];

  updated[mappedParam] = _.chain(mappedValue)
    .map((datePool: FormDatePool): DatePool | null => {
      if (_.isNil(datePool)) return null;
      return {
        text: datePool.text,
        startDate: datePool.date?.[0].toISOString() ?? null,
        endDate: datePool.date?.[1].toISOString() ?? null,
      };
    })
    .filter((pool: DatePool | null) => !_.isNull(pool))
    .sortBy(({ endDate }) => dayjs(endDate).valueOf())
    .value();
};

export const useFormStore = create<FormStore>()(
  devtools(
    (): FormStore => {
      return {
        joinNameAndSurname: (): string | null => {
          const { name, surname } = useProfileStore.getState();

          if (_.isEmpty(name) && _.isEmpty(surname)) return null;
          return [name, surname].filter((v) => !_.isEmpty(v)).join(" ");
        },

        getInitialFormValues: (): ProfileFormValues => {
          const profile: Profile = _.omit(useProfileStore.getState(), []);

          return {
            ...profile,
            experience: [],
            education: [],
          };
        },

        updateValues: (values: Partial<ProfileFormValues>): void => {
          const updated: Partial<Profile> = {
            ..._.omit(values, ["education", "experience"]),
          };

          if (values.experience != null) {
            mapDates("experience", values.experience, updated);
          }

          if (values.education != null) {
            mapDates("education", values.education, updated);
          }

          useProfileStore.setState(updated);
        },
      };
    },
    { name: "form-store" }
  )
);
