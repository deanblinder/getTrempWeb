"use client";

import { DatePicker as MDatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  style?: React.CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const DatePicker = ({
  value,
  onChange,
  required = false,
  style,
}: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MDatePicker
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          if (newValue) {
            onChange(newValue.format("YYYY-MM-DD"));
          }
        }}
        slotProps={{
          textField: {
            color: "primary" as const,
            required: required,
            defaultValue: dayjs(),
            sx: {
              "& .MuiInputBase-root": {
                height: "3rem",
                borderRadius: "0.5rem",
                border: "1px solid #4b5563",
                backgroundColor: "#374151",
                color: "#e5e7eb",
                fontSize: "1rem",
                "& .MuiInputAdornment-root": {
                  color: "#e5e7eb",
                },
                "& .MuiSvgIcon-root": {
                  color: "#e5e7eb",
                },
                "&:hover": {
                  border: "1px solid #3b82f6",
                },
                "& fieldset": {
                  border: "none",
                },
              },
            },
          },
        }}
        sx={{
          width: "100%",
          ...style,
          "& .MuiPaper-root": {
            backgroundColor: "#1f2937",
            color: "#e5e7eb",
          },
          "& .MuiPickersDay-root": {
            color: "#e5e7eb",
            "&:hover": {
              backgroundColor: "#374151",
            },
            "&.Mui-selected": {
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            },
          },
          "& .MuiDayCalendar-weekDayLabel": {
            color: "#9ca3af",
          },
          "& .MuiPickersCalendarHeader-root": {
            color: "#e5e7eb",
          },
          "& .MuiPickersArrowSwitcher-button": {
            color: "#e5e7eb",
          },
        }}
        minDate={dayjs()}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
