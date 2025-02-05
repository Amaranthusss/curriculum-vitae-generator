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
        links: [],
        languages: [],
        education: [],
        experience: [],
        qualifications: [],
        publications: [],
      };
    },
    { name: "profile-store" }
  )
);
