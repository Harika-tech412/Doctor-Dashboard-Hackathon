import React, { useState } from "react";
import { Mail, Paperclip, Star } from "lucide-react";
import { EMAILS } from "@/lib/mockData";

export default function Email() {
    const [selected, setSelected] = useState(EMAILS[0]);
    return (
        <div data-testid="email-page" className="px-8 py-8">
            <div className="mb-6">
                <div className="ui-label" style={{ color: "var(--c-primary)" }}>
                    Delivery & inbox
                </div>
                <h1 className="h1 mt-1">Email</h1>
                <p className="caption mt-1">
                    PDF deliveries, lab reports and system digests are routed here.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 card-surface overflow-hidden">
                    <div
                        className="px-4 py-3 border-b border-[var(--c-n7)] text-[13px] font-semibold"
                        style={{ color: "var(--c-n2)" }}
                    >
                        Inbox · {EMAILS.length}
                    </div>
                    <div className="max-h-[620px] overflow-y-auto scroll-thin">
                        {EMAILS.map((e) => (
                            <button
                                key={e.id}
                                data-testid={`email-row-${e.id}`}
                                onClick={() => setSelected(e)}
                                className={`w-full text-left px-4 py-3 border-b border-[var(--c-n7)] transition ${
                                    selected?.id === e.id
                                        ? "bg-[var(--c-primary-light)]"
                                        : "hover:bg-[var(--c-n8)]"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-[13px] font-semibold"
                                        style={{
                                            color: e.unread
                                                ? "var(--c-n0)"
                                                : "var(--c-n2)",
                                        }}
                                    >
                                        {e.from}
                                    </span>
                                    <span className="caption">{e.time}</span>
                                </div>
                                <div
                                    className="text-[13px] mt-0.5 flex items-center gap-1.5"
                                    style={{
                                        color: e.unread
                                            ? "var(--c-n0)"
                                            : "var(--c-n2)",
                                        fontWeight: e.unread ? 600 : 400,
                                    }}
                                >
                                    {e.unread && (
                                        <span
                                            className="w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{
                                                background: "var(--c-accent)",
                                            }}
                                        />
                                    )}
                                    {e.subject}
                                </div>
                                <div className="caption mt-1 line-clamp-1">
                                    {e.preview}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-7 card-surface p-6">
                    {selected && (
                        <>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="h2" style={{ fontSize: 20 }}>
                                        {selected.subject}
                                    </h2>
                                    <div className="caption mt-1">
                                        From <b>{selected.from}</b> · {selected.time}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        data-testid="email-star"
                                        className="w-9 h-9 rounded-full hover:bg-[var(--c-n8)] flex items-center justify-center"
                                    >
                                        <Star size={16} color="var(--c-n4)" />
                                    </button>
                                    <button
                                        data-testid="email-reply"
                                        className="btn-pill btn-primary"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>

                            <div
                                className="flex items-center gap-2 p-3 rounded-lg mb-4"
                                style={{ background: "var(--c-cyan-light)" }}
                            >
                                <Paperclip size={14} color="#0E7490" />
                                <span
                                    className="text-[12.5px] font-semibold"
                                    style={{ color: "#0E7490" }}
                                >
                                    1 attachment · SOAP_Note.pdf
                                </span>
                            </div>

                            <div
                                className="text-[13.5px] leading-relaxed space-y-3"
                                style={{ color: "var(--c-n1)" }}
                            >
                                <p>{selected.preview}</p>
                                <p>
                                    This clinical note was generated by an AI-powered
                                    Medical Scribe Agent (model: MedScribe-MVP-v1.0)
                                    from the consultation transcript.
                                </p>
                                <p>
                                    Reviewed and approved by Dr. A. Sharma. Session
                                    artefacts are retained for 7 years per HIPAA
                                    compliance.
                                </p>
                                <p
                                    className="pt-4 border-t border-[var(--c-n7)]"
                                    style={{ color: "var(--c-n4)" }}
                                >
                                    — aegis.ai · Centific Health
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
