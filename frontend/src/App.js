import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AppShell } from "@/components/layout/AppShell";
import Home from "@/pages/Home";
import PatientList from "@/pages/PatientList";
import PatientDetail from "@/pages/PatientDetail";
import Email from "@/pages/Email";
import Downloads from "@/pages/Downloads";
import CalendarView from "@/pages/CalendarView";
import Scheduler from "@/pages/Scheduler";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<AppShell />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/patients" element={<PatientList />} />
                        <Route
                            path="/patients/:id"
                            element={<PatientDetail />}
                        />
                        <Route path="/email" element={<Email />} />
                        <Route path="/downloads" element={<Downloads />} />
                        <Route path="/calendar" element={<CalendarView />} />
                        <Route path="/scheduler" element={<Scheduler />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster position="bottom-right" richColors />
        </div>
    );
}

export default App;
