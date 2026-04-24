import React from "react";
import { FileText, Download, FileSpreadsheet } from "lucide-react";
import { DOWNLOADS } from "@/lib/mockData";
import { toast } from "sonner";

const typeIcon = (type) =>
    type === "Report" || type === "Audit Log" ? FileSpreadsheet : FileText;
const typeAccent = (type) =>
    type === "Report"
        ? "#01CAB8"
        : type === "Audit Log"
          ? "var(--c-accent)"
          : "var(--c-primary)";

export default function Downloads() {
    return (
        <div data-testid="downloads-page" className="px-8 py-8">
            <div className="mb-6">
                <div className="ui-label" style={{ color: "var(--c-primary)" }}>
                    Files & reports
                </div>
                <h1 className="h1 mt-1">Downloads</h1>
                <p className="caption mt-1">
                    All generated SOAP PDFs, audit logs and activity reports.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DOWNLOADS.map((f) => {
                    const Icon = typeIcon(f.type);
                    return (
                        <div
                            key={f.id}
                            data-testid={`download-${f.id}`}
                            className="card-surface p-5 hover:border-[var(--c-primary-border)] transition"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "var(--c-n8)",
                                        color: typeAccent(f.type),
                                    }}
                                >
                                    <Icon size={19} />
                                </div>
                                <span
                                    className="chip"
                                    style={{
                                        background: "var(--c-primary-light)",
                                        color: "var(--c-primary)",
                                    }}
                                >
                                    {f.type}
                                </span>
                            </div>
                            <div
                                className="text-[13.5px] font-semibold break-all"
                                style={{ color: "var(--c-n0)" }}
                            >
                                {f.name}
                            </div>
                            <div className="caption mt-1">
                                {f.size} · {f.date}
                            </div>
                            <button
                                data-testid={`download-btn-${f.id}`}
                                onClick={() => toast.success(`Downloading ${f.name}`)}
                                className="mt-4 btn-pill btn-outline inline-flex items-center gap-1.5 w-full justify-center"
                            >
                                <Download size={13} />
                                Download
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
