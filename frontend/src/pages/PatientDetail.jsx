import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Check,
    FileDown,
    RefreshCw,
    Save,
    Stethoscope,
    AlertTriangle,
} from "lucide-react";
import { PATIENTS } from "@/lib/mockData";
import { StatusChip } from "@/components/common/StatusChip";
import { toast } from "sonner";

const EntityList = ({ title, items, accent, testid }) => (
    <div data-testid={testid} className="card-surface p-4">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <span
                    className="w-1.5 h-5 rounded-full"
                    style={{ background: accent }}
                />
                <div className="h4" style={{ fontSize: 13.5 }}>
                    {title}
                </div>
            </div>
            <span
                className="caption"
                style={{ color: "var(--c-n4)" }}
            >
                {items.length} {items.length === 1 ? "entity" : "entities"}
            </span>
        </div>
        {items.length === 0 ? (
            <div
                className="caption py-3 text-center rounded-lg"
                style={{ background: "var(--c-n8)" }}
            >
                no data extracted
            </div>
        ) : (
            <div className="space-y-2">
                {items.map((e, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2 rounded-lg border border-[var(--c-n7)] bg-white hover:bg-[var(--c-primary-light)] transition"
                    >
                        <span className="text-[13px] text-[var(--c-n1)]">
                            {e.value}
                        </span>
                        <span
                            className="mono text-[11px] px-1.5 py-0.5 rounded"
                            style={{
                                color: "var(--c-n4)",
                                background: "var(--c-n8)",
                            }}
                        >
                            {e.ts}
                        </span>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default function PatientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const patient = useMemo(() => PATIENTS.find((p) => p.id === id), [id]);
    const [status, setStatus] = useState(patient?.status || "pending");
    const [activeSegment, setActiveSegment] = useState(null);
    const [soap, setSoap] = useState(patient?.soap || {});

    if (!patient) {
        return (
            <div className="px-8 py-10">
                <button
                    onClick={() => navigate("/patients")}
                    className="btn-pill btn-outline"
                >
                    ← Back to patients
                </button>
                <h1 className="h2 mt-6">Session not found.</h1>
            </div>
        );
    }

    const handleApprove = () => {
        setStatus("approved");
        toast.success("Session approved. PDF dispatched to registered email.");
    };
    const handleReject = () => {
        toast("Draft discarded · SOAP regenerating from current entities.", {
            icon: <RefreshCw size={14} />,
        });
    };
    const handleSave = () => {
        toast.success("Changes saved. Session remains in REVIEW_READY state.");
    };

    return (
        <div data-testid="patient-detail-page" className="px-8 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center justify-between mb-5">
                <button
                    data-testid="back-to-patients"
                    onClick={() => navigate("/patients")}
                    className="btn-pill btn-ghost inline-flex items-center gap-1.5"
                >
                    <ArrowLeft size={14} />
                    All patients
                </button>
                <div className="flex items-center gap-2">
                    <button
                        data-testid="action-save"
                        onClick={handleSave}
                        className="btn-pill btn-outline inline-flex items-center gap-1.5"
                    >
                        <Save size={14} />
                        Save & resume
                    </button>
                    <button
                        data-testid="action-reject"
                        onClick={handleReject}
                        className="btn-pill btn-pink inline-flex items-center gap-1.5"
                    >
                        <RefreshCw size={14} />
                        Reject & regenerate
                    </button>
                    <button
                        data-testid="action-approve"
                        onClick={handleApprove}
                        disabled={status === "approved"}
                        className="btn-pill btn-primary inline-flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <Check size={14} />
                        {status === "approved" ? "Approved" : "Approve"}
                    </button>
                </div>
            </div>

            {/* Patient header */}
            <div
                className="card-surface p-6 mb-5 relative overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, #FFFFFF 60%, #FFE4F7 160%)",
                }}
            >
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold"
                            style={{
                                background:
                                    "linear-gradient(135deg, #5929d0 0%, #CF008B 100%)",
                                fontSize: 18,
                            }}
                        >
                            {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="h2">{patient.name}</h1>
                                <StatusChip status={status} />
                            </div>
                            <div className="caption mt-0.5">
                                {patient.age} yrs · {patient.gender} · {patient.id} ·
                                Uploaded{" "}
                                {new Date(patient.uploadedAt).toLocaleString()}
                            </div>
                            <div
                                className="mt-2 text-[13.5px] flex items-center gap-2"
                                style={{ color: "var(--c-n1)" }}
                            >
                                <Stethoscope size={13} color="var(--c-primary)" />
                                {patient.complaint}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {[
                            { l: "BP", v: patient.vitals.bp },
                            { l: "HR", v: patient.vitals.hr },
                            { l: "SpO₂", v: patient.vitals.spo2 },
                            { l: "Temp", v: patient.vitals.temp },
                        ].map((m) => (
                            <div
                                key={m.l}
                                className="px-3 py-2 rounded-xl bg-white/70 border border-[var(--c-n7)] text-center"
                            >
                                <div className="ui-label">{m.l}</div>
                                <div
                                    className="font-bold"
                                    style={{ fontSize: 15, color: "var(--c-n0)" }}
                                >
                                    {m.v}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI disclosure banner */}
            <div
                className="flex items-start gap-2 p-3 rounded-xl mb-5"
                style={{
                    background: "var(--c-warning-light)",
                    border: "1px solid #FCD77A",
                }}
            >
                <AlertTriangle size={15} color="#8A5A10" className="mt-0.5" />
                <div className="text-[12.5px]" style={{ color: "#8A5A10" }}>
                    <b>AI-generated draft · MedScribe-MVP-v1.0.</b> Reviewed and
                    approved only when you sign off. Content is derived from the
                    consultation transcript — no inference beyond stated facts.
                </div>
            </div>

            {/* Three-pane */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Transcript */}
                <div className="lg:col-span-4 card-surface p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="h3" style={{ fontSize: 16 }}>
                            Transcript
                        </h3>
                        <span className="chip chip-live">Diarized</span>
                    </div>
                    <div
                        className="space-y-3 max-h-[540px] overflow-y-auto scroll-thin pr-2"
                        data-testid="transcript-pane"
                    >
                        {patient.transcript.length === 0 && (
                            <div className="caption text-center py-6">
                                Transcript condensed for this demo view.
                            </div>
                        )}
                        {patient.transcript.map((seg, i) => {
                            const isActive = activeSegment === i;
                            const isDoc = seg.speaker === "Doctor";
                            return (
                                <button
                                    key={i}
                                    data-testid={`transcript-seg-${i}`}
                                    onClick={() => setActiveSegment(i)}
                                    className="w-full text-left rounded-lg border p-3 transition"
                                    style={{
                                        borderColor: isActive
                                            ? "var(--c-primary)"
                                            : "var(--c-n7)",
                                        background: isActive
                                            ? "var(--c-primary-light)"
                                            : "#fff",
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span
                                            className="ui-label"
                                            style={{
                                                color: isDoc
                                                    ? "var(--c-primary)"
                                                    : "var(--c-accent)",
                                            }}
                                        >
                                            {seg.speaker}
                                        </span>
                                        <span className="mono text-[11px]" style={{ color: "var(--c-n5)" }}>
                                            {seg.t}
                                        </span>
                                    </div>
                                    <div className="text-[13px] leading-snug text-[var(--c-n1)]">
                                        {seg.text}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Entities */}
                <div className="lg:col-span-4 space-y-4">
                    <EntityList
                        title="Symptoms"
                        items={patient.entities.symptoms}
                        accent="var(--c-primary)"
                        testid="entity-symptoms"
                    />
                    <EntityList
                        title="Diagnosis"
                        items={patient.entities.diagnosis}
                        accent="var(--c-accent)"
                        testid="entity-diagnosis"
                    />
                    <EntityList
                        title="Medications"
                        items={patient.entities.medications}
                        accent="#01CAB8"
                        testid="entity-medications"
                    />
                    <EntityList
                        title="Allergies"
                        items={patient.entities.allergies}
                        accent="#E4902E"
                        testid="entity-allergies"
                    />
                </div>

                {/* SOAP */}
                <div className="lg:col-span-4 card-surface p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="h3" style={{ fontSize: 16 }}>
                            SOAP note ·{" "}
                            <span style={{ color: "var(--c-accent)" }}>DRAFT</span>
                        </h3>
                        <button
                            data-testid="download-pdf"
                            className="btn-pill btn-outline inline-flex items-center gap-1.5"
                            onClick={() => toast.success("PDF downloaded")}
                        >
                            <FileDown size={13} />
                            PDF
                        </button>
                    </div>
                    {["subjective", "objective", "assessment", "plan"].map(
                        (key) => (
                            <div key={key} className="mb-4">
                                <div className="ui-label mb-1.5">
                                    {key}
                                </div>
                                <textarea
                                    data-testid={`soap-${key}`}
                                    value={soap[key] || ""}
                                    onChange={(e) =>
                                        setSoap({
                                            ...soap,
                                            [key]: e.target.value,
                                        })
                                    }
                                    rows={key === "plan" ? 5 : 3}
                                    className="w-full rounded-lg border border-[var(--c-n7)] bg-[var(--c-n8)]/50 focus:bg-white focus:border-[var(--c-primary-border)] outline-none p-3 text-[13px] leading-relaxed text-[var(--c-n1)] transition"
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
