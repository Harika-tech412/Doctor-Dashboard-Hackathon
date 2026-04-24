import React from "react";

const map = {
    approved: { label: "Approved", cls: "chip-approved" },
    pending: { label: "Pending review", cls: "chip-pending" },
    review_ready: { label: "Ready for review", cls: "chip-review" },
    upcoming: { label: "Upcoming", cls: "chip-review" },
};

export const StatusChip = ({ status }) => {
    const s = map[status] || map.pending;
    return (
        <span
            data-testid={`status-chip-${status}`}
            className={`chip ${s.cls}`}
        >
            {s.label}
        </span>
    );
};
