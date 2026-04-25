import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { DOCTOR } from "@/lib/mockData";

const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
};

export default function Home() {
    const navigate = useNavigate();

    return (
        <div data-testid="home-page" className="min-h-full">
            {/* Hero */}
            <section className="hero-grid px-8 pt-16 pb-24 relative overflow-hidden min-h-[calc(100vh-73px)] flex items-center">
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
        </div>
    );
}
