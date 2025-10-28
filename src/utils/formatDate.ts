import dayjs from "dayjs";

import { DisplayLimit } from "../constants/DisplayLimit";

export const formatDate = (displayLimit: DisplayLimit | undefined): string => {
	const localFullFormat: string = dayjs.localeData().longDateFormat("L");

	switch (displayLimit) {
		case DisplayLimit.Year:
			return "YYYY";

		case DisplayLimit.Month:
			return localFullFormat.replace(/[^M]*DD[^M]*[./-]*/, "");

		case DisplayLimit.Day:
			return localFullFormat;

		default:
			return localFullFormat;
	}
}