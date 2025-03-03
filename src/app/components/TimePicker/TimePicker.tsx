"use client";

import { TimePicker as MTimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  style?: React.CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const TimePicker = ({
  value,
  onChange,
  required = false,
  style,
}: TimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MTimePicker
        ampm={false}
        defaultValue={dayjs("00:00", "HH:mm")}
        value={value ? dayjs(value, "HH:mm") : null}
        onChange={(newValue) => {
          if (newValue) {
            onChange(newValue.format("HH:mm"));
          }
        }}
        slotProps={{
          textField: {
            required,
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
          },
          "& .MuiClock-root": {
            backgroundColor: "#1f2937",
            color: "#e5e7eb",
          },
          "& .MuiClockNumber-root": {
            color: "#e5e7eb",
          },
          "& .MuiClockPointer-root": {
            backgroundColor: "#3b82f6",
          },
          "& .MuiClockPointer-thumb": {
            backgroundColor: "#3b82f6",
            borderColor: "#3b82f6",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
