import { devtools } from "zustand/middleware";
import { create } from "zustand";

import type { ProfileStore } from "./interface";

export const useProfileStore = create<ProfileStore>()(
  devtools(
    (): ProfileStore => {
      return {
        name: "",
        surname: "",
        aboutMe: "",
        picture: "",
        email: "",
        country: "",
        languages: [],
        education: [],
        experience: [],
      };
    },
    { name: "profile-store" }
  )
);
