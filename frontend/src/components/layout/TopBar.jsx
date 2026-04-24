import React from "react";
import { Bell, Sparkles } from "lucide-react";
import { DOCTOR } from "@/lib/mockData";

export const TopBar = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <header
            data-testid="top-bar"
            className="flex items-center justify-between px-8 py-4 border-b border-[var(--c-n7)] bg-white/80 backdrop-blur-md sticky top-0 z-30"
        >
            <div className="flex items-center gap-4">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                        background:
                            "linear-gradient(135deg, #5929d0 0%, #CF008B 100%)",
                    }}
                >
                    <Sparkles size={18} color="#fff" />
                </div>
                <div>
                    <div className="h4 leading-tight" style={{ fontSize: 15 }}>
                        aegis.ai <span style={{ color: "var(--c-accent)" }}>·</span>{" "}
                        <span style={{ color: "var(--c-n2)", fontWeight: 500 }}>
                            Medical Scribe
                        </span>
                    </div>
                    <div className="caption">{dateStr}</div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="chip chip-live" data-testid="system-live-chip">
                    System live · MVP-v1.0
                </span>
                <button
                    data-testid="notifications-btn"
                    className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--c-n8)] transition"
                    aria-label="Notifications"
                >
                    <Bell size={18} color="var(--c-n2)" />
                    <span
                        className="absolute top-2 right-2 w-2 h-2 rounded-full"
                        style={{ background: "var(--c-accent)" }}
                    />
                </button>
                <div className="flex items-center gap-3 pl-3 border-l border-[var(--c-n7)]">
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white"
                        style={{
                            background:
                                "linear-gradient(135deg, #0E2E89 0%, #5929d0 100%)",
                            fontSize: 12,
                        }}
                    >
                        {DOCTOR.avatarInitials}
                    </div>
                    <div className="hidden md:block">
                        <div className="text-[13px] font-semibold text-[var(--c-n0)] leading-tight">
                            {DOCTOR.name}
                        </div>
                        <div className="caption leading-tight">
                            {DOCTOR.specialty}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
