import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Deterministic event dots per day-of-month
const eventsFor = (day) => {
    const seed = (day * 37) % 7;
    if (seed === 0) return [];
    if (seed === 1) return ["primary"];
    if (seed === 2) return ["primary", "accent"];
    if (seed === 3) return ["accent"];
    if (seed === 4) return ["primary", "primary"];
    return ["primary"];
};

export default function CalendarView() {
    const today = new Date();
    const [cursor, setCursor] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );

    const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const lastDay = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    const startOffset = firstDay.getDay();
    const days = lastDay.getDate();

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(d);

    const monthLabel = cursor.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div data-testid="calendar-page" className="px-8 py-8">
            <div className="flex items-end justify-between mb-6">
                <div>
                    <div className="ui-label" style={{ color: "var(--c-primary)" }}>
                        Month view
                    </div>
                    <h1 className="h1 mt-1">Calendar</h1>
                    <p className="caption mt-1">
                        Clinic consultations and follow-ups at a glance.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        data-testid="cal-prev"
                        onClick={() =>
                            setCursor(
                                new Date(
                                    cursor.getFullYear(),
                                    cursor.getMonth() - 1,
                                    1
                                )
                            )
                        }
                        className="w-10 h-10 rounded-full border border-[var(--c-n7)] bg-white hover:bg-[var(--c-n8)] flex items-center justify-center"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <div
                        className="px-4 h-10 rounded-full border border-[var(--c-n7)] bg-white flex items-center font-semibold text-[13.5px]"
                        style={{ color: "var(--c-n0)" }}
                    >
                        {monthLabel}
                    </div>
                    <button
                        data-testid="cal-next"
                        onClick={() =>
                            setCursor(
                                new Date(
                                    cursor.getFullYear(),
                                    cursor.getMonth() + 1,
                                    1
                                )
                            )
                        }
                        className="w-10 h-10 rounded-full border border-[var(--c-n7)] bg-white hover:bg-[var(--c-n8)] flex items-center justify-center"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="card-surface p-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {WEEK.map((w) => (
                        <div
                            key={w}
                            className="ui-label text-center py-2"
                        >
                            {w}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {cells.map((d, i) => {
                        if (d === null)
                            return <div key={i} className="h-24" />;
                        const isToday =
                            d === today.getDate() &&
                            cursor.getMonth() === today.getMonth() &&
                            cursor.getFullYear() === today.getFullYear();
                        const evts = eventsFor(d);
                        return (
                            <div
                                key={i}
                                data-testid={`cal-day-${d}`}
                                className="h-24 rounded-xl p-2 border transition hover:-translate-y-0.5 cursor-pointer"
                                style={{
                                    borderColor: isToday
                                        ? "var(--c-primary)"
                                        : "var(--c-n7)",
                                    background: isToday
                                        ? "var(--c-primary-light)"
                                        : "#fff",
                                }}
                            >
                                <div className="flex items-start justify-between">
                                    <span
                                        className="text-[13px] font-semibold"
                                        style={{
                                            color: isToday
                                                ? "var(--c-primary)"
                                                : "var(--c-n1)",
                                        }}
                                    >
                                        {d}
                                    </span>
                                    {isToday && (
                                        <span
                                            className="text-[9.5px] font-bold uppercase tracking-wider"
                                            style={{
                                                color: "var(--c-primary)",
                                            }}
                                        >
                                            Today
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2 space-y-1">
                                    {evts.slice(0, 2).map((e, idx) => (
                                        <div
                                            key={idx}
                                            className="text-[11px] px-1.5 py-0.5 rounded truncate"
                                            style={{
                                                background:
                                                    e === "accent"
                                                        ? "var(--c-accent-light)"
                                                        : "var(--c-primary-light)",
                                                color:
                                                    e === "accent"
                                                        ? "var(--c-accent)"
                                                        : "var(--c-primary)",
                                            }}
                                        >
                                            {e === "accent"
                                                ? "Follow-up"
                                                : "Consultation"}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
