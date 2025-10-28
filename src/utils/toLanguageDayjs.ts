import { LanguageDayjs } from "../constants/LanguageDayjs";
import { Language } from "../constants/Language";

export const toLanguageDayjs = (language: Language): LanguageDayjs => {
	switch (language) {
		case Language.British:
			return LanguageDayjs.British;
		case Language.German:
			return LanguageDayjs.German;
		case Language.Polish:
			return LanguageDayjs.Polish;
	}
}