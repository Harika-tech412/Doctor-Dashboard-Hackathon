import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { SCHEDULE_TODAY, PATIENTS } from "@/lib/mockData";
import { StatusChip } from "@/components/common/StatusChip";

export default function Scheduler() {
    const navigate = useNavigate();
    const todayLabel = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    const findPatient = (name) => PATIENTS.find((p) => p.name === name);

    return (
        <div data-testid="scheduler-page" className="px-8 py-8">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <div className="ui-label" style={{ color: "var(--c-primary)" }}>
                        Today · {todayLabel}
                    </div>
                    <h1 className="h1 mt-1">Scheduler</h1>
                    <p className="caption mt-1">
                        Your day, ordered. Click any slot to open the session.
                    </p>
                </div>
                <div
                    className="chip"
                    style={{
                        background: "var(--c-primary-light)",
                        color: "var(--c-primary)",
                    }}
                >
                    {SCHEDULE_TODAY.length} consultations
                </div>
            </div>

            <div className="card-surface overflow-hidden">
                <div
                    className="px-5 py-3 bg-banner text-white flex items-center justify-between"
                >
                    <span className="ui-label" style={{ color: "rgba(255,255,255,0.9)" }}>
                        Timeline
                    </span>
                    <span
                        className="text-[12px] font-semibold"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                    >
                        General medicine · Dr. A. Sharma
                    </span>
                </div>
                <div className="divide-y divide-[var(--c-n7)]">
                    {SCHEDULE_TODAY.map((s, i) => {
                        const patient = findPatient(s.patient);
                        return (
                            <button
                                key={i}
                                data-testid={`schedule-slot-${i}`}
                                onClick={() =>
                                    patient && navigate(`/patients/${patient.id}`)
                                }
                                className="w-full flex items-center gap-5 px-5 py-4 hover:bg-[var(--c-primary-light)] transition text-left"
                            >
                                <div
                                    className="flex flex-col items-center justify-center w-16 shrink-0"
                                    style={{ color: "var(--c-primary)" }}
                                >
                                    <Clock size={13} />
                                    <span
                                        className="font-bold mono"
                                        style={{ fontSize: 15 }}
                                    >
                                        {s.time}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-[14px] font-semibold text-[var(--c-n0)]">
                                        {s.patient}
                                    </div>
                                    <div className="caption mt-0.5">{s.reason}</div>
                                </div>
                                <StatusChip status={s.status} />
                                <span
                                    className="text-[12px] font-semibold hidden md:inline"
                                    style={{ color: "var(--c-primary)" }}
                                >
                                    Open →
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
