import React from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { AILiveCommentary } from "./AILiveCommentary";

export const AppShell = () => {
    return (
        <div className="min-h-screen w-full flex flex-col" data-testid="app-shell">
            <TopBar />
            <div className="flex flex-1 min-h-0">
                <main
                    data-testid="main-content"
                    className="flex-1 overflow-y-auto scroll-thin"
                    style={{ height: "calc(100vh - 73px)" }}
                >
                    <div className="pb-28 min-h-full">
                        <Outlet />
                    </div>
                </main>
                <AILiveCommentary />
            </div>
            <BottomNav />
        </div>
    );
};
