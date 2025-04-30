import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { timeSlots } from "@/lib/constants";

export default function DateTimeSelector({
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot
}: {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    selectedTimeSlot: string | null;
    setSelectedTimeSlot: (slot: string) => void;
}) {
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

    // Generate mock availability
    useEffect(() => {
        const today = new Date();
        const dates: Date[] = [];
        for (let i = 1; i <= 14; i++) {
            if (Math.random() > 0.2) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                dates.push(date);
            }
        }
        setAvailableDates(dates);
    }, []);

    useEffect(() => {
        if (selectedDate) {
            // Simulate time slot filtering
            const slots = timeSlots.filter(() => Math.random() > 0.3);
            setAvailableTimeSlots(slots);
        } else {
            setAvailableTimeSlots([]);
        }
    }, [selectedDate]);

    const isTileDisabled = ({ date }: { date: Date }) => {
        return !availableDates.some(d => d.toDateString() === date.toDateString());
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Select a Date</h3>
                <Calendar
                    onChange={(value) => setSelectedDate(value as Date)}
                    value={selectedDate}
                    tileDisabled={isTileDisabled}
                />
            </div>

            {selectedDate && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
                    {availableTimeSlots.length === 0 ? (
                        <p className="text-text-secondary text-sm">
                            No slots available for this date. Try another day.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {availableTimeSlots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedTimeSlot(slot)}
                                    className={`p-2 rounded border ${selectedTimeSlot === slot
                                            ? "bg-primary text-white"
                                            : "bg-white hover:bg-primary/10"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
