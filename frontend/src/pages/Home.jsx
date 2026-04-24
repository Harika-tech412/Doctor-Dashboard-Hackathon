import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowUpRight,
    FileText,
    Stethoscope,
    CheckCircle2,
    Clock,
    Sparkles,
} from "lucide-react";
import { DOCTOR, PATIENTS } from "@/lib/mockData";
import { StatusChip } from "@/components/common/StatusChip";

const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
};

const Metric = ({ icon: Icon, label, value, accent, sub, testid }) => (
    <div
        data-testid={testid}
        className="card-surface p-5 flex flex-col gap-2 fade-up"
    >
        <div className="flex items-center justify-between">
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                    background: accent || "var(--c-primary-light)",
                }}
            >
                <Icon size={17} color={accent ? "#fff" : "var(--c-primary)"} />
            </div>
            <ArrowUpRight size={16} color="var(--c-n5)" />
        </div>
        <div className="ui-label">{label}</div>
        <div className="flex items-baseline gap-2">
            <span
                className="font-bold"
                style={{ fontSize: 28, color: "var(--c-n0)", letterSpacing: "-0.02em" }}
            >
                {value}
            </span>
            {sub && <span className="caption">{sub}</span>}
        </div>
    </div>
);

export default function Home() {
    const navigate = useNavigate();
    const readyForReview = PATIENTS.filter((p) => p.status === "review_ready");
    const approvedToday = PATIENTS.filter((p) => p.status === "approved");
    const pending = PATIENTS.filter((p) => p.status === "pending");

    return (
        <div data-testid="home-page">
            {/* Hero */}
            <section className="hero-grid px-8 pt-10 pb-14 relative overflow-hidden">
                <div className="max-w-5xl">
                    <div className="ui-label mb-3 fade-up" style={{ color: "var(--c-primary)" }}>
                        <Sparkles size={11} className="inline mr-1 -mt-0.5" />
                        aegis.ai scribe · MVP-v1.0
                    </div>
                    <h1
                        className="display fade-up"
                        style={{ animationDelay: "60ms" }}
                    >
                        {greeting()}, {DOCTOR.firstName.split(" ")[0]}.
                    </h1>
                    <p
                        className="mt-3 body fade-up"
                        style={{
                            animationDelay: "120ms",
                            color: "var(--c-n2)",
                            fontSize: 16,
                            maxWidth: 620,
                        }}
                    >
                        Your consultations are drafted, traced and ready for your
                        review. Nothing moves forward without you.
                    </p>
                    <div
                        className="mt-5 flex items-center gap-2 fade-up"
                        style={{ animationDelay: "180ms" }}
                    >
                        <span
                            className="italic text-[13px]"
                            style={{ color: "var(--c-accent)" }}
                        >
                            “Nobody was watching.”
                        </span>
                        <span className="caption">
                            — a reminder that quiet rigor is what earns trust.
                        </span>
                    </div>

                    <div
                        className="mt-8 flex flex-wrap items-center gap-3 fade-up"
                        style={{ animationDelay: "240ms" }}
                    >
                        <button
                            data-testid="home-cta-review"
                            onClick={() => navigate("/patients")}
                            className="btn-pill btn-primary inline-flex items-center gap-2"
                        >
                            Review today's sessions
                            <ArrowUpRight size={15} />
                        </button>
                        <button
                            data-testid="home-cta-new"
                            onClick={() => navigate("/scheduler")}
                            className="btn-pill btn-outline inline-flex items-center gap-2"
                        >
                            View scheduler
                        </button>
                    </div>
                </div>
            </section>

            {/* Metrics */}
            <section className="px-8 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Metric
                        icon={Stethoscope}
                        label="Sessions today"
                        value={PATIENTS.length}
                        sub="across general medicine"
                        testid="metric-sessions"
                    />
                    <Metric
                        icon={FileText}
                        label="Awaiting review"
                        value={readyForReview.length + pending.length}
                        sub={`${readyForReview.length} ready · ${pending.length} pending`}
                        accent="var(--c-primary)"
                        testid="metric-awaiting"
                    />
                    <Metric
                        icon={CheckCircle2}
                        label="Approved"
                        value={approvedToday.length}
                        sub="PDF delivered via email"
                        testid="metric-approved"
                    />
                    <Metric
                        icon={Clock}
                        label="Avg. draft time"
                        value="3m 48s"
                        sub="SLA ≤ 5 min"
                        accent="var(--c-accent)"
                        testid="metric-avg-time"
                    />
                </div>
            </section>

            {/* Ready-for-review list */}
            <section className="px-8 mt-10">
                <div className="flex items-end justify-between mb-4">
                    <div>
                        <div className="ui-label" style={{ color: "var(--c-accent)" }}>
                            Immediate attention
                        </div>
                        <h2 className="h2 mt-1">Ready for your review</h2>
                    </div>
                    <button
                        data-testid="home-see-all-patients"
                        onClick={() => navigate("/patients")}
                        className="btn-pill btn-ghost"
                    >
                        See all →
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {[...readyForReview, ...pending].slice(0, 4).map((p, i) => (
                        <button
                            key={p.id}
                            data-testid={`home-patient-${p.id}`}
                            onClick={() => navigate(`/patients/${p.id}`)}
                            className="card-surface p-5 text-left hover:border-[var(--c-primary-border)] hover:-translate-y-0.5 transition fade-up"
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-11 h-11 rounded-full flex items-center justify-center font-semibold"
                                        style={{
                                            background: "var(--c-primary-light)",
                                            color: "var(--c-primary)",
                                        }}
                                    >
                                        {p.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </div>
                                    <div>
                                        <div className="h4" style={{ fontSize: 15 }}>
                                            {p.name}
                                        </div>
                                        <div className="caption">
                                            {p.age} yrs · {p.gender} · {p.id}
                                        </div>
                                    </div>
                                </div>
                                <StatusChip status={p.status} />
                            </div>
                            <div className="body" style={{ color: "var(--c-n2)", fontSize: 13.5 }}>
                                {p.complaint}
                            </div>
                            <div className="mt-4 flex items-center justify-between pt-3 border-t border-[var(--c-n7)]">
                                <div className="flex items-center gap-4 caption">
                                    <span>Audio · {p.audioDuration}</span>
                                    <span>BP {p.vitals.bp}</span>
                                    <span>HR {p.vitals.hr}</span>
                                </div>
                                <span
                                    className="text-[12px] font-semibold"
                                    style={{ color: "var(--c-primary)" }}
                                >
                                    Open session →
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}
