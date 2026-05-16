import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import API from "../services/api";

function StatCard({ label, value, color }) {
    return (
        <div className={`rounded-xl px-4 py-3.5 ${color}`}>
            <p className="text-[11px] font-semibold uppercase tracking-wide opacity-70 mb-0.5">{label}</p>
            <p className="text-2xl font-bold font-display">{value}</p>
        </div>
    );
}

function Home() {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await API.get("/students");
            setStudents(res.data);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const saveStudent = async (student) => {
        try {
            setSaving(true);
            if (editingStudent) {
                await API.put(`/students/${editingStudent._id}`, student);
            } else {
                await API.post("/students", student);
            }
            setEditingStudent(null);
            await fetchStudents();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to save student");
        } finally {
            setSaving(false);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await API.delete(`/students/${id}`);
            await fetchStudents();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete student");
        }
    };

    const yearCounts = [1, 2, 3, 4].map(y => students.filter(s => (s.year || 1) === y).length);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-7 sm:p-9">
                    {/* decorative circles */}
                    <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-sky-500/10 pointer-events-none" />
                    <div className="absolute -right-4 top-6 w-28 h-28 rounded-full bg-sky-400/10 pointer-events-none" />

                    <p className="text-sky-400 text-[11.5px] font-bold uppercase tracking-widest mb-2">MongoDB connected app</p>
                    <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
                        Student Management<br className="hidden sm:block" /> System
                    </h1>
                    <p className="text-slate-400 text-[14px] max-w-md">
                        Add, edit, and manage student records from one connected dashboard.
                    </p>

                    {/* Stat pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {[
                            { label: "Total", val: students.length, bg: "bg-white/10 text-white" },
                            { label: "Yr 1", val: yearCounts[0], bg: "bg-sky-500/20 text-sky-200" },
                            { label: "Yr 2", val: yearCounts[1], bg: "bg-sky-500/20 text-sky-200" },
                            { label: "Yr 3", val: yearCounts[2], bg: "bg-sky-500/20 text-sky-200" },
                            { label: "Yr 4", val: yearCounts[3], bg: "bg-sky-500/20 text-sky-200" },
                        ].map(({ label, val, bg }) => (
                            <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold ${bg}`}>
                                <span className="opacity-70">{label}</span>
                                <span>{val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Error banner */}
                {error && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[13px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {error}
                        <button onClick={() => setError("")} className="ml-auto text-rose-400 hover:text-rose-600 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                )}

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5 items-start">

                    {/* Form card */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
                            <div className={`w-2 h-2 rounded-full ${editingStudent ? "bg-amber-400" : "bg-emerald-400"}`} />
                            <h3 className="font-display font-bold text-slate-800 text-base">
                                {editingStudent ? "Edit Student" : "Add New Student"}
                            </h3>
                        </div>
                        <div className="p-5">
                            <StudentForm
                                key={editingStudent?._id || "new-student"}
                                initialStudent={editingStudent}
                                isEditing={Boolean(editingStudent)}
                                onSubmit={saveStudent}
                                onCancel={() => setEditingStudent(null)}
                                loading={saving}
                            />
                        </div>
                    </div>

                    {/* List */}
                    <StudentList
                        students={students}
                        loading={loading}
                        onEdit={setEditingStudent}
                        onDelete={deleteStudent}
                    />
                </div>

            </div>
        </div>
    );
}

export default Home;