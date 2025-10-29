import dayjs from "dayjs";

import type { GlobalLocaleDataReturn } from "dayjs";

import { DisplayLimit } from "../constants/DisplayLimit";

export const formatDate = (displayLimit: DisplayLimit | undefined): string => {
	const localFullFormat: string = dayjs.localeData().longDateFormat("L");

	switch (displayLimit) {
		case DisplayLimit.Year:
			return "YYYY";

		case DisplayLimit.Month:
			{
				const localeData: GlobalLocaleDataReturn = dayjs.localeData();
				const monthFormat: "MM" | "M" = localeData.monthsShort() ? "MM" : "M";

				return `${monthFormat}${localFullFormat.match(/[./-]/)?.[0] ?? "/"}YYYY`;
			}

		case DisplayLimit.Day:
			return localFullFormat;

		default:
			return localFullFormat;
	}
}