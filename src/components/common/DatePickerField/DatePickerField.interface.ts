import type { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import type { RangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import type { Dayjs } from "dayjs";

export interface DatePickerFieldProps {
  placeholder?: LimitedArray<string, 2>;
  present: boolean;
  value?: RangeValueType<Dayjs> | Dayjs | null;
  onChange?: (dates: NoUndefinedRangeValueType<Dayjs> | null) => void;
}
