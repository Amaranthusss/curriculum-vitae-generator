import type { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import type { DatePickerProps } from "antd";
import type { RangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import type { Dayjs } from "dayjs";

export interface DatePickerFieldProps {
	placeholder?: LimitedArray<string, 2>;
	present: boolean;
	disableRange?: boolean;
	picker?: DatePickerProps['picker'];
	value?: RangeValueType<Dayjs> | Dayjs | null;
	onChange?: (dates: NoUndefinedRangeValueType<Dayjs> | null) => void;
}
