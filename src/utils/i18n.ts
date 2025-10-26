import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import i18next from "i18next";

import { Language } from "../constants/Language";

i18next
	.use(Backend)
	.use(initReactI18next)
	.init({
		// debug: import.meta.env.DEV,
		fallbackLng: Language.British,
		interpolation: { escapeValue: false },
		ns: ["translations"],
		defaultNS: "translations",
		backend: {
			loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
		},
		load: "currentOnly",
		supportedLngs: [Language.British, Language.German, Language.Polish],
	});

export default i18next;