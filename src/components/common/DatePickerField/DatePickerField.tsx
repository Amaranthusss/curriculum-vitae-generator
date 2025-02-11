import { DatePicker } from "antd";

import type { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import type { DatePickerFieldProps } from "./DatePickerField.interface";
import type { RangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import type { Dayjs } from "dayjs";

export const DatePickerField = ({
  present,
  value,
  onChange,
  placeholder,
}: DatePickerFieldProps): React.ReactNode => {
  if (present) {
    return (
      <DatePicker
        value={value as NoUndefinedRangeValueType<Dayjs> | null}
        style={{ width: "100%" }}
        placeholder={placeholder?.[0]}
        onChange={onChange}
      />
    );
  }

  return (
    <DatePicker.RangePicker
      value={value as RangeValueType<Dayjs> | null}
      style={{ width: "100%" }}
      allowEmpty={[true, false]}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
