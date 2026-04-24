import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Plus } from "lucide-react";
import { PATIENTS } from "@/lib/mockData";
import { StatusChip } from "@/components/common/StatusChip";

const filters = [
    { key: "all", label: "All" },
    { key: "review_ready", label: "Ready for review" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
];

export default function PatientList() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");
    const [q, setQ] = useState("");

    const filtered = PATIENTS.filter((p) => {
        const matchStatus = filter === "all" || p.status === filter;
        const matchQ =
            !q.trim() ||
            `${p.name} ${p.id} ${p.complaint}`
                .toLowerCase()
                .includes(q.toLowerCase());
        return matchStatus && matchQ;
    });

    return (
        <div data-testid="patient-list-page" className="px-8 py-8">
            <div className="flex items-end justify-between mb-6">
                <div>
                    <div className="ui-label" style={{ color: "var(--c-primary)" }}>
                        Clinical sessions
                    </div>
                    <h1 className="h1 mt-1">My patients</h1>
                    <p className="caption mt-1">
                        Reverse-chronological, one row per consultation session.
                    </p>
                </div>
                <button
                    data-testid="new-consultation-btn"
                    className="btn-pill btn-primary inline-flex items-center gap-2"
                >
                    <Plus size={15} />
                    New consultation
                </button>
            </div>

            {/* Toolbar */}
            <div className="card-surface p-4 mb-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[240px] px-3 py-2 rounded-full border border-[var(--c-n7)] bg-[var(--c-n8)]">
                    <Search size={15} color="var(--c-n4)" />
                    <input
                        data-testid="patient-search-input"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search by patient, session ID, diagnosis…"
                        className="flex-1 bg-transparent outline-none text-[13.5px] placeholder:text-[var(--c-n5)]"
                    />
                </div>
                <div className="flex items-center gap-1">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            data-testid={`filter-${f.key}`}
                            onClick={() => setFilter(f.key)}
                            className={`btn-pill text-[12.5px] ${
                                filter === f.key
                                    ? "btn-primary"
                                    : "btn-ghost"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <button
                    data-testid="filter-more"
                    className="btn-pill btn-outline inline-flex items-center gap-1.5"
                >
                    <Filter size={13} />
                    Filters
                </button>
            </div>

            {/* Table */}
            <div className="card-surface overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr style={{ background: "var(--c-primary)" }}>
                            {[
                                "Patient",
                                "Session ID",
                                "Chief complaint",
                                "Uploaded",
                                "Duration",
                                "Vitals",
                                "Status",
                                "",
                            ].map((h) => (
                                <th
                                    key={h}
                                    className="ui-label px-4 py-3"
                                    style={{ color: "#fff", letterSpacing: "0.05em" }}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((p, i) => (
                            <tr
                                key={p.id}
                                data-testid={`patient-row-${p.id}`}
                                onClick={() => navigate(`/patients/${p.id}`)}
                                className="cursor-pointer border-b border-[var(--c-n7)] hover:bg-[var(--c-primary-light)] transition"
                                style={{
                                    background:
                                        i % 2 === 0 ? "#fff" : "#FAFBFD",
                                }}
                            >
                                <td className="px-4 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold"
                                            style={{
                                                background:
                                                    "var(--c-primary-light)",
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
                                            <div className="text-[13.5px] font-semibold text-[var(--c-n0)]">
                                                {p.name}
                                            </div>
                                            <div className="caption">
                                                {p.age} yrs · {p.gender}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3.5 mono text-[12px]" style={{ color: "var(--c-n2)" }}>
                                    {p.id}
                                </td>
                                <td className="px-4 py-3.5 text-[13px]" style={{ color: "var(--c-n1)" }}>
                                    {p.complaint}
                                </td>
                                <td className="px-4 py-3.5 caption">
                                    {new Date(p.uploadedAt).toLocaleString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                                <td className="px-4 py-3.5 caption">{p.audioDuration}</td>
                                <td className="px-4 py-3.5 caption">
                                    BP {p.vitals.bp} · HR {p.vitals.hr}
                                </td>
                                <td className="px-4 py-3.5">
                                    <StatusChip status={p.status} />
                                </td>
                                <td className="px-4 py-3.5 text-right">
                                    <span
                                        className="text-[12px] font-semibold"
                                        style={{ color: "var(--c-primary)" }}
                                    >
                                        {p.status === "approved" ? "View" : "Review"} →
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-4 py-10 text-center caption">
                                    No sessions match your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
