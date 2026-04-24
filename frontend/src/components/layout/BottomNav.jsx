import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Search,
    LayoutGrid,
    Users,
    Mail,
    FolderDown,
    Calendar as CalendarIcon,
    ClipboardList,
    X,
} from "lucide-react";
import { PATIENTS } from "@/lib/mockData";

const tabs = [
    { to: "/", icon: LayoutGrid, label: "Home", testid: "nav-home" },
    { to: "/patients", icon: Users, label: "Patients", testid: "nav-patients" },
    { to: "/email", icon: Mail, label: "Email", testid: "nav-email" },
    { to: "/downloads", icon: FolderDown, label: "Downloads", testid: "nav-downloads" },
    { to: "/calendar", icon: CalendarIcon, label: "Calendar", testid: "nav-calendar" },
    { to: "/scheduler", icon: ClipboardList, label: "Scheduler", testid: "nav-scheduler" },
];

export const BottomNav = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const results = query.trim()
        ? PATIENTS.filter((p) =>
              `${p.name} ${p.id} ${p.complaint}`
                  .toLowerCase()
                  .includes(query.toLowerCase())
          ).slice(0, 5)
        : [];

    return (
        <>
            {/* Search overlay */}
            {searchOpen && (
                <div
                    className="fixed inset-0 z-40 flex items-start justify-center pt-32 px-4"
                    style={{ background: "rgba(15,23,42,0.35)" }}
                    onClick={() => setSearchOpen(false)}
                    data-testid="search-overlay"
                >
                    <div
                        className="w-full max-w-2xl card-surface p-5 fade-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 pb-3 border-b border-[var(--c-n7)]">
                            <Search size={18} color="var(--c-primary)" />
                            <input
                                data-testid="search-input"
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search patients, sessions, diagnoses…"
                                className="flex-1 bg-transparent outline-none text-[15px] text-[var(--c-n0)] placeholder:text-[var(--c-n5)]"
                            />
                            <button
                                data-testid="search-close"
                                onClick={() => setSearchOpen(false)}
                                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[var(--c-n8)]"
                            >
                                <X size={14} />
                            </button>
                        </div>
                        <div className="pt-3 space-y-1 max-h-80 overflow-y-auto scroll-thin">
                            {!query && (
                                <div className="caption px-2 py-6 text-center">
                                    Start typing to search across your sessions.
                                </div>
                            )}
                            {query && results.length === 0 && (
                                <div className="caption px-2 py-6 text-center">
                                    No matches for "{query}".
                                </div>
                            )}
                            {results.map((p) => (
                                <button
                                    key={p.id}
                                    data-testid={`search-result-${p.id}`}
                                    onClick={() => {
                                        navigate(`/patients/${p.id}`);
                                        setSearchOpen(false);
                                        setQuery("");
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--c-primary-light)] text-left"
                                >
                                    <div>
                                        <div className="text-[13.5px] font-semibold text-[var(--c-n0)]">
                                            {p.name}
                                        </div>
                                        <div className="caption">
                                            {p.id} · {p.complaint}
                                        </div>
                                    </div>
                                    <span className="ui-label" style={{ color: "var(--c-primary)" }}>
                                        Open →
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom floating pill */}
            <nav
                data-testid="bottom-nav"
                className="bottom-nav fixed bottom-5 left-1/2 -translate-x-1/2 z-40 rounded-full px-2 py-2 flex items-center gap-1"
            >
                <button
                    data-testid="nav-search"
                    onClick={() => setSearchOpen(true)}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-[var(--c-n8)] transition"
                    title="Search"
                >
                    <Search size={18} color="var(--c-n2)" />
                    <span className="text-[12.5px] font-medium text-[var(--c-n2)] hidden lg:inline">
                        Search
                    </span>
                </button>
                <div className="w-px h-6 bg-[var(--c-n7)] mx-1" />
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.to}
                        to={tab.to}
                        end={tab.to === "/"}
                        data-testid={tab.testid}
                        className={({ isActive }) =>
                            `group flex items-center gap-2 px-4 py-2.5 rounded-full transition ${
                                isActive
                                    ? "text-white"
                                    : "text-[var(--c-n2)] hover:bg-[var(--c-n8)]"
                            }`
                        }
                        style={({ isActive }) =>
                            isActive
                                ? {
                                      background:
                                          "linear-gradient(135deg, #5929d0 0%, #CF008B 100%)",
                                      boxShadow:
                                          "0 8px 18px -8px rgba(89,41,208,0.6)",
                                  }
                                : {}
                        }
                    >
                        <tab.icon size={18} />
                        <span className="text-[12.5px] font-semibold hidden lg:inline">
                            {tab.label}
                        </span>
                    </NavLink>
                ))}
            </nav>
        </>
    );
};
