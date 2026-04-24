import React, { useEffect, useRef, useState } from "react";
import { Activity, Radio } from "lucide-react";
import { COMMENTARY_SEED, COMMENTARY_STREAM } from "@/lib/mockData";

const tagColor = {
    Transcription: { bg: "#E8E5FF", fg: "#5929d0" },
    "Entity Extraction": { bg: "#FFD6F4", fg: "#CF008B" },
    SOAP: { bg: "#CFFAFE", fg: "#0E7490" },
    Approval: { bg: "#DCFCE7", fg: "#0F6A2F" },
    System: { bg: "#F1F5F9", fg: "#334155" },
};

const levelDot = {
    info: "#5929d0",
    success: "#16A34A",
    warn: "#E4902E",
};

const nowTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
};

export const AILiveCommentary = () => {
    const [feed, setFeed] = useState(COMMENTARY_SEED);
    const streamIdxRef = useRef(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const item =
                COMMENTARY_STREAM[streamIdxRef.current % COMMENTARY_STREAM.length];
            streamIdxRef.current += 1;
            setFeed((prev) =>
                [...prev, { ...item, ts: nowTime() }].slice(-24)
            );
        }, 4200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [feed]);

    return (
        <aside
            data-testid="ai-live-commentary"
            className="w-[340px] shrink-0 border-l border-[var(--c-n7)] bg-white/60 backdrop-blur-sm flex flex-col"
            style={{ height: "calc(100vh - 73px)" }}
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[var(--c-n7)] bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: "var(--c-primary-light)" }}
                        >
                            <Activity size={15} color="var(--c-primary)" />
                        </div>
                        <div>
                            <div className="h4" style={{ fontSize: 14 }}>
                                AI Live Commentary
                            </div>
                            <div className="caption">Real-time scribe pipeline</div>
                        </div>
                    </div>
                    <span className="chip chip-live">
                        <Radio size={10} />
                        Live
                    </span>
                </div>
            </div>

            {/* Pipeline snapshot */}
            <div className="px-5 py-4 border-b border-[var(--c-n7)] bg-[var(--c-n8)]/40">
                <div className="ui-label mb-2">Pipeline stages</div>
                <div className="grid grid-cols-5 gap-1.5">
                    {["Upload", "Transcribe", "Extract", "SOAP", "Review"].map(
                        (label, i) => (
                            <div key={label} className="flex flex-col items-center gap-1">
                                <div
                                    className="w-full h-1.5 rounded-full"
                                    style={{
                                        background:
                                            i < 3
                                                ? "var(--c-primary)"
                                                : i === 3
                                                  ? "var(--c-accent)"
                                                  : "var(--c-n7)",
                                    }}
                                />
                                <span
                                    className="text-[9.5px] font-semibold tracking-wider"
                                    style={{ color: "var(--c-n4)" }}
                                >
                                    {label.toUpperCase()}
                                </span>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Feed */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto scroll-thin px-4 py-3 space-y-2"
                data-testid="commentary-feed"
            >
                {feed.map((item, i) => {
                    const tc = tagColor[item.tag] || tagColor.System;
                    return (
                        <div
                            key={`${item.ts}-${i}`}
                            className="commentary-item rounded-xl border border-[var(--c-n7)] bg-white px-3 py-2.5"
                        >
                            <div className="flex items-center justify-between mb-1.5">
                                <span
                                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold"
                                    style={{
                                        background: tc.bg,
                                        color: tc.fg,
                                    }}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{
                                            background:
                                                levelDot[item.level] || tc.fg,
                                        }}
                                    />
                                    {item.tag}
                                </span>
                                <span className="mono" style={{ fontSize: 10.5, color: "var(--c-n5)" }}>
                                    {item.ts}
                                </span>
                            </div>
                            <div
                                className="text-[12.5px] leading-snug"
                                style={{ color: "var(--c-n1)" }}
                            >
                                {item.text}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[var(--c-n7)] bg-white">
                <div className="caption">
                    Logs are append-only · retention 7 years · MedScribe-MVP-v1.0
                </div>
            </div>
        </aside>
    );
};
