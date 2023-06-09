import { forwardRef } from "react";
import { DatePicker as XDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

// eslint-disable-next-line react/display-name
const DatePicker = forwardRef(({ className, ...rest }, ref) => {
  return (
    <XDatePicker
      {...rest}
      ref={ref}
      className={["datepicker-container", ...(className ? [className] : [])]
        .join(" ")
        .trim()}
      renderInput={(params) => {
        return (
          <div className="border rounded-lg bg-white">
            <TextField style={{ width: "100%" }} {...params} />
          </div>
        );
      }}
    />
  );
});

export default DatePicker;
