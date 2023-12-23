"use client";

import React, { useState } from "react";
import { z } from "zod";

interface TimeFieldProps {
    onChange: (duration: string) => void;
    value?: string;
}

const durationSchema = z.string().refine(
    (value) => {
        const [hours, minutes] = value.split(":").map(Number);
        return hours >= 0 && minutes >= 0;
    },
    {
        message:
            "פורמט לא נכון של זמן. השתמש בפורמט HH:MM ווודא שהשעות והדקות הם לא שליליים.",
    }
);

const TimeField: React.FC<TimeFieldProps> = ({ onChange, value }) => {
    const [time, setTime] = useState<string>(value || "00:00");
    const [error, setError] = useState<string | null>(null);

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        const sanitizedInput = inputValue.replace(/[^\d:]/g, "");
        const [inputHours, inputMinutes] = sanitizedInput
            .split(":")
            .map(Number);

        if (
            sanitizedInput !== "" &&
            !isNaN(inputHours) &&
            !isNaN(inputMinutes)
        ) {
            const newTime = `${Math.min(Math.max(inputHours), 23)
                .toString()
                .padStart(2, "0")}:${Math.min(Math.max(inputMinutes), 59)
                .toString()
                .padStart(2, "0")}`;
            try {
                durationSchema.parse(newTime);
                setError(null);
                setTime(newTime);
                onChange(newTime);
            } catch (validationError) {
                setError(
                    "פורמט לא נכון של זמן. השתמש בפורמט HH:MM ווודא שהשעות והדקות הם לא שליליים."
                );
            }
        } else {
            setError(
                "פורמט לא נכון של זמן. השתמש בפורמט HH:MM ווודא שהשעות והדקות הם לא שליליים."
            );
        }
    };

    return (
        <div>
            <div className="mt-1 relative">
                <input
                    type="text"
                    className={`form-input pt-1 pb-1 pl-2 rounded-md shadow-sm ${
                        error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="--:--"
                    value={time}
                    onChange={handleTimeChange}
                    dir="ltr"
                />
                {error && (
                    <div className="text-sm text-red-600 mt-2">{error}</div>
                )}
            </div>
        </div>
    );
};

export default TimeField;
