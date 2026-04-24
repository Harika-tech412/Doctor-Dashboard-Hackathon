// Mock data for aegis.ai Medical Scribe demo.
// All data is derived from the MVP scope: Session → Transcript → Entities → SOAP.

export const DOCTOR = {
    name: "Dr. A. Sharma",
    firstName: "Aarav",
    specialty: "General Medicine",
    email: "a.sharma@centific.health",
    avatarInitials: "AS",
};

// Each "session" represents one consultation / one patient visit.
export const PATIENTS = [
    {
        id: "SESSION-2187",
        name: "Marcus Whitfield",
        age: 54,
        gender: "Male",
        uploadedAt: "2026-02-12T08:42:00Z",
        audioDuration: "8m 41s",
        status: "review_ready", // review_ready | approved | pending
        complaint: "Persistent chest tightness, intermittent cough",
        vitals: { bp: "138/86", hr: "82", spo2: "97%", temp: "98.4 °F" },
        transcript: [
            { t: "00:04", speaker: "Doctor", text: "Good morning, Mr. Whitfield. What brings you in today?" },
            { t: "00:10", speaker: "Patient", text: "I've been feeling this tightness in my chest for about ten days now, mostly in the mornings." },
            { t: "00:22", speaker: "Doctor", text: "Any shortness of breath, cough, or radiating pain to the arm or jaw?" },
            { t: "00:31", speaker: "Patient", text: "A mild dry cough. No pain radiating, just the tightness." },
            { t: "00:48", speaker: "Doctor", text: "Are you currently taking any medications?" },
            { t: "00:55", speaker: "Patient", text: "Atorvastatin 20 milligrams at night, and Amlodipine 5 milligrams in the morning." },
            { t: "01:12", speaker: "Doctor", text: "Any known allergies?" },
            { t: "01:16", speaker: "Patient", text: "Penicillin causes a rash." },
            { t: "01:28", speaker: "Doctor", text: "Based on today's evaluation this looks like stable angina pending ECG confirmation. I'm adding sublingual nitroglycerin as needed." },
        ],
        entities: {
            symptoms: [
                { value: "Chest tightness", ts: "00:10" },
                { value: "Dry cough", ts: "00:31" },
            ],
            diagnosis: [{ value: "Stable angina (pending ECG)", ts: "01:28" }],
            medications: [
                { value: "Atorvastatin 20 mg nightly", ts: "00:55" },
                { value: "Amlodipine 5 mg daily", ts: "00:55" },
                { value: "Nitroglycerin SL PRN (added)", ts: "01:28" },
            ],
            allergies: [{ value: "Penicillin — rash", ts: "01:16" }],
        },
        soap: {
            subjective:
                "54-year-old male presents with 10 days of morning chest tightness and mild dry cough. Denies radiating pain, dyspnea at rest, or diaphoresis.",
            objective:
                "Vitals: BP 138/86, HR 82, SpO₂ 97%, Temp 98.4°F. Cardiovascular and pulmonary exams unremarkable on auscultation.",
            assessment:
                "Clinical picture consistent with stable angina pectoris; rule-out workup pending ECG and lipid panel.",
            plan:
                "1. 12-lead ECG today. 2. Fasting lipid panel and HbA1c. 3. Continue Atorvastatin 20 mg and Amlodipine 5 mg. 4. Add Nitroglycerin 0.4 mg SL PRN for chest discomfort. 5. Follow up in 7 days.",
        },
    },
    {
        id: "SESSION-2186",
        name: "Priya Raman",
        age: 34,
        gender: "Female",
        uploadedAt: "2026-02-12T07:18:00Z",
        audioDuration: "6m 12s",
        status: "approved",
        complaint: "Migraine with aura, recurrent",
        vitals: { bp: "118/76", hr: "74", spo2: "99%", temp: "98.2 °F" },
        transcript: [
            { t: "00:05", speaker: "Doctor", text: "Tell me about these headaches." },
            { t: "00:09", speaker: "Patient", text: "Throbbing on the right side, with flashing lights beforehand. Three episodes this month." },
            { t: "00:28", speaker: "Doctor", text: "Any nausea, photophobia, or triggers you've noticed?" },
            { t: "00:35", speaker: "Patient", text: "Bright screens and missed sleep. Some nausea, yes." },
            { t: "00:55", speaker: "Doctor", text: "Any current medications or allergies?" },
            { t: "01:02", speaker: "Patient", text: "Just ibuprofen when it happens. No known allergies." },
        ],
        entities: {
            symptoms: [
                { value: "Throbbing unilateral headache", ts: "00:09" },
                { value: "Visual aura (photopsia)", ts: "00:09" },
                { value: "Nausea", ts: "00:35" },
                { value: "Photophobia", ts: "00:35" },
            ],
            diagnosis: [{ value: "Migraine with aura", ts: "00:28" }],
            medications: [
                { value: "Ibuprofen 400 mg PRN", ts: "01:02" },
                { value: "Sumatriptan 50 mg PRN (added)", ts: "01:02" },
            ],
            allergies: [{ value: "No known drug allergies", ts: "01:02" }],
        },
        soap: {
            subjective:
                "34-year-old female with recurrent right-sided throbbing headaches preceded by visual aura, 3 episodes in the last month. Associated nausea and photophobia. Triggers: sleep deprivation and screen exposure.",
            objective:
                "Vitals within normal limits. Neurological exam non-focal.",
            assessment: "Migraine with aura, episodic.",
            plan:
                "1. Sumatriptan 50 mg at onset of aura, may repeat in 2 hours. 2. Sleep hygiene counseling. 3. Headache diary for 4 weeks. 4. Follow up if frequency > 4/month.",
        },
    },
    {
        id: "SESSION-2185",
        name: "Elena Moretti",
        age: 67,
        gender: "Female",
        uploadedAt: "2026-02-11T16:04:00Z",
        audioDuration: "9m 58s",
        status: "approved",
        complaint: "Uncontrolled Type 2 Diabetes follow-up",
        vitals: { bp: "142/90", hr: "78", spo2: "98%", temp: "98.6 °F" },
        transcript: [
            { t: "00:06", speaker: "Doctor", text: "Let's review your glucose log from the past month." },
            { t: "00:12", speaker: "Patient", text: "Morning readings are around 180, evenings closer to 220." },
            { t: "00:40", speaker: "Doctor", text: "And your current medications?" },
            { t: "00:45", speaker: "Patient", text: "Metformin 1000 mg twice daily and Glimepiride 2 mg daily." },
        ],
        entities: {
            symptoms: [{ value: "Persistent hyperglycemia", ts: "00:12" }],
            diagnosis: [{ value: "Type 2 Diabetes Mellitus, uncontrolled", ts: "00:40" }],
            medications: [
                { value: "Metformin 1000 mg BID", ts: "00:45" },
                { value: "Glimepiride 2 mg daily", ts: "00:45" },
                { value: "Empagliflozin 10 mg daily (added)", ts: "00:45" },
            ],
            allergies: [{ value: "Not discussed", ts: "—" }],
        },
        soap: {
            subjective:
                "67-year-old female with T2DM reports fasting glucose ~180 mg/dL and evening readings near 220 mg/dL over the past month.",
            objective: "BP 142/90. Weight stable. No signs of peripheral neuropathy.",
            assessment: "T2DM, uncontrolled despite current dual therapy.",
            plan:
                "1. Add Empagliflozin 10 mg daily. 2. Continue Metformin + Glimepiride. 3. HbA1c in 6 weeks. 4. Renal and lipid panel today.",
        },
    },
    {
        id: "SESSION-2184",
        name: "Jonah Becker",
        age: 28,
        gender: "Male",
        uploadedAt: "2026-02-11T11:27:00Z",
        audioDuration: "5m 03s",
        status: "pending",
        complaint: "Acute pharyngitis",
        vitals: { bp: "120/78", hr: "88", spo2: "98%", temp: "100.8 °F" },
        transcript: [
            { t: "00:03", speaker: "Doctor", text: "When did the sore throat start?" },
            { t: "00:06", speaker: "Patient", text: "Three days ago, with fever and trouble swallowing." },
        ],
        entities: {
            symptoms: [
                { value: "Sore throat (3 days)", ts: "00:06" },
                { value: "Fever", ts: "00:06" },
                { value: "Odynophagia", ts: "00:06" },
            ],
            diagnosis: [{ value: "Acute pharyngitis — viral likely", ts: "—" }],
            medications: [],
            allergies: [{ value: "Not discussed", ts: "—" }],
        },
        soap: {
            subjective: "28-year-old male with 3-day sore throat, fever and odynophagia.",
            objective: "Temp 100.8°F. Pharyngeal erythema without exudate. No cervical lymphadenopathy.",
            assessment: "Acute pharyngitis, likely viral.",
            plan: "1. Symptomatic care. 2. Rapid strep if no improvement in 48 hours. 3. Hydration and rest.",
        },
    },
    {
        id: "SESSION-2183",
        name: "Amelia Hart",
        age: 42,
        gender: "Female",
        uploadedAt: "2026-02-11T09:10:00Z",
        audioDuration: "7m 36s",
        status: "approved",
        complaint: "Annual physical; mild lower back pain",
        vitals: { bp: "124/80", hr: "70", spo2: "99%", temp: "98.3 °F" },
        transcript: [],
        entities: {
            symptoms: [{ value: "Mild lumbar pain with prolonged sitting", ts: "—" }],
            diagnosis: [{ value: "Mechanical low back pain", ts: "—" }],
            medications: [{ value: "Acetaminophen 500 mg PRN", ts: "—" }],
            allergies: [{ value: "Not discussed", ts: "—" }],
        },
        soap: {
            subjective: "42-year-old female for annual visit; endorses mild lumbar pain after prolonged sitting.",
            objective: "Exam unremarkable; full range of motion.",
            assessment: "Mechanical low back pain; routine health maintenance.",
            plan: "1. Ergonomic guidance. 2. Acetaminophen PRN. 3. Age-appropriate screening labs.",
        },
    },
    {
        id: "SESSION-2182",
        name: "Daniel Okafor",
        age: 61,
        gender: "Male",
        uploadedAt: "2026-02-11T08:02:00Z",
        audioDuration: "8m 14s",
        status: "pending",
        complaint: "Hypertension review",
        vitals: { bp: "150/94", hr: "80", spo2: "98%", temp: "98.2 °F" },
        transcript: [],
        entities: {
            symptoms: [{ value: "Occasional morning headaches", ts: "—" }],
            diagnosis: [{ value: "Stage 2 Hypertension", ts: "—" }],
            medications: [
                { value: "Losartan 50 mg daily", ts: "—" },
                { value: "Hydrochlorothiazide 12.5 mg daily (added)", ts: "—" },
            ],
            allergies: [{ value: "Sulfa drugs", ts: "—" }],
        },
        soap: {
            subjective: "61-year-old male on Losartan, BP remains elevated despite adherence.",
            objective: "BP 150/94. Cardiac exam normal.",
            assessment: "Stage 2 HTN, suboptimal control.",
            plan: "1. Add HCTZ 12.5 mg. 2. Home BP log. 3. Follow-up in 2 weeks.",
        },
    },
];

// The AI Live Commentary feed (simulated real-time).
export const COMMENTARY_SEED = [
    { tag: "Transcription", level: "info", text: "Speaker diarization completed — 2 speakers identified (Doctor, Patient).", ts: "09:42:04" },
    { tag: "Transcription", level: "success", text: "Transcript accuracy: 94.2% — within target (≥ 90%).", ts: "09:42:07" },
    { tag: "Entity Extraction", level: "info", text: "Extracted 4 symptoms, 1 diagnosis, 3 medications, 1 allergy from SESSION-2187.", ts: "09:42:11" },
    { tag: "Entity Extraction", level: "warn", text: "Allergy panel absent in SESSION-2182 transcript — flagged as 'not discussed'.", ts: "09:42:14" },
    { tag: "SOAP", level: "info", text: "Draft SOAP note generated for Marcus Whitfield — awaiting physician review.", ts: "09:42:19" },
    { tag: "Approval", level: "success", text: "Dr. A. Sharma approved SESSION-2186 · PDF dispatched to registered email.", ts: "09:42:24" },
    { tag: "System", level: "info", text: "End-to-end processing time: 3m 48s (target ≤ 5m). All within MVP SLA.", ts: "09:42:29" },
];

export const COMMENTARY_STREAM = [
    { tag: "Transcription", level: "info", text: "Ingesting SESSION-2188 · audio decoded, 7m 22s duration." },
    { tag: "Transcription", level: "info", text: "Medical-domain ASR running on batch pipeline…" },
    { tag: "Entity Extraction", level: "info", text: "Parsing clinical entities — symptoms, diagnosis, medications, allergies." },
    { tag: "Entity Extraction", level: "success", text: "Traceability anchors added to every extracted entity (transcript timestamps)." },
    { tag: "SOAP", level: "info", text: "Assembling structured SOAP template (Subjective / Objective / Assessment / Plan)." },
    { tag: "SOAP", level: "success", text: "Draft generated — marked DRAFT, AI-disclosure banner attached." },
    { tag: "Approval", level: "info", text: "Awaiting physician review · session locked to Dr. A. Sharma." },
    { tag: "System", level: "info", text: "Audit event appended · immutable log · retention 7 years." },
];

export const EMAILS = [
    { id: "E-081", from: "delivery@centific.health", subject: "SESSION-2186 — SOAP note delivered", time: "09:04", unread: false, preview: "Your approved clinical note for Priya Raman has been delivered as a PDF attachment." },
    { id: "E-080", from: "lab@centrallab.us", subject: "Lipid panel results — M. Whitfield", time: "08:51", unread: true, preview: "Total cholesterol 212 mg/dL, LDL 141 mg/dL. See attached detailed report." },
    { id: "E-079", from: "delivery@centific.health", subject: "SESSION-2185 — SOAP note delivered", time: "Yesterday", unread: false, preview: "Your approved clinical note for Elena Moretti has been delivered." },
    { id: "E-078", from: "support@centific.health", subject: "Weekly scribe summary — 23 sessions", time: "Yesterday", unread: true, preview: "This week: 23 sessions, 19 approved on first draft (82.6%)." },
    { id: "E-077", from: "radiology@centrallab.us", subject: "Chest X-Ray report — Daniel Okafor", time: "Mon", unread: false, preview: "No acute cardiopulmonary findings." },
];

export const DOWNLOADS = [
    { id: "D-214", name: "SOAP_SESSION-2186_P.Raman.pdf", size: "184 KB", date: "Feb 12, 09:04", type: "SOAP Note" },
    { id: "D-213", name: "SOAP_SESSION-2185_E.Moretti.pdf", size: "201 KB", date: "Feb 11, 17:22", type: "SOAP Note" },
    { id: "D-212", name: "SOAP_SESSION-2183_A.Hart.pdf", size: "172 KB", date: "Feb 11, 10:18", type: "SOAP Note" },
    { id: "D-211", name: "Audit_Log_SESSION-2186.csv", size: "14 KB", date: "Feb 12, 09:06", type: "Audit Log" },
    { id: "D-210", name: "My_Sessions_Activity_Feb2026.csv", size: "38 KB", date: "Feb 12, 08:00", type: "Report" },
];

export const SCHEDULE_TODAY = [
    { time: "09:00", patient: "Marcus Whitfield", reason: "Stable angina follow-up", status: "review_ready" },
    { time: "09:30", patient: "Jonah Becker", reason: "Acute pharyngitis", status: "pending" },
    { time: "10:15", patient: "Daniel Okafor", reason: "Hypertension review", status: "pending" },
    { time: "11:00", patient: "Yuki Tanaka", reason: "New patient — fatigue workup", status: "upcoming" },
    { time: "13:30", patient: "Noor Al-Saidi", reason: "Diabetes counseling", status: "upcoming" },
    { time: "15:00", patient: "Ethan Cole", reason: "Post-flu follow-up", status: "upcoming" },
    { time: "16:00", patient: "Priya Raman", reason: "Migraine check-in", status: "approved" },
];
