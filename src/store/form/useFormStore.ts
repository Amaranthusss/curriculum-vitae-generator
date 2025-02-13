import { useProfileStore } from "../profile/useProfileStore";
import { devtools } from "zustand/middleware";
import { create } from "zustand";
import _ from "lodash";

import type { FormStore } from "./interface";
import type { Profile } from "../profile/interface";

export const useFormStore = create<FormStore>()(
  devtools(
    (): FormStore => {
      return {
        joinNameAndSurname: (): string | null => {
          const { name, surname } = useProfileStore.getState();

          if (_.isEmpty(name) && _.isEmpty(surname)) return null;
          return [name, surname].filter((v) => !_.isEmpty(v)).join(" ");
        },

        getInitialFormValues: (): Profile => {
          return useProfileStore.getState();
        },

        updateValues: (values: Partial<Profile>): void => {
          useProfileStore.setState(values);
        },
      };
    },
    { name: "form-store" }
  )
);
