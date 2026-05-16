const yearLabel = (y) => ["", "1st", "2nd", "3rd", "4th"][y] ?? `${y}th`;

const avatarColors = [
    "bg-violet-100 text-violet-600",
    "bg-sky-100 text-sky-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-600",
];

function getInitials(name = "") {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarColor(name = "") {
    let sum = 0;
    for (const ch of name) sum += ch.charCodeAt(0);
    return avatarColors[sum % avatarColors.length];
}

function StudentList({ students, loading, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="font-display font-bold text-slate-800 text-base">All Students</h3>
                <span className="text-[12px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {students.length} {students.length === 1 ? "record" : "records"}
                </span>
            </div>

            {/* Body */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
                    <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                        <path className="opacity-70" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                    </svg>
                    <span className="text-[13px]">Loading students…</span>
                </div>
            ) : students.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-slate-200">
                        <rect x="4" y="4" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="2"/>
                        <path d="M14 16h12M14 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p className="text-[13px]">No students added yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-5 py-3">Student</th>
                                <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Course</th>
                                <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Year</th>
                                <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Phone</th>
                                <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {students.map((student) => {
                                const colorClass = getAvatarColor(student.name);
                                return (
                                    <tr key={student._id} className="hover:bg-slate-50/70 transition-colors group">

                                        {/* Name + email */}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold ${colorClass}`}>
                                                    {getInitials(student.name)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800 leading-tight">{student.name}</p>
                                                    <p className="text-[12px] text-slate-400 leading-tight mt-0.5">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Course */}
                                        <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">
                                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[12px] font-medium">
                                                {student.course}
                                            </span>
                                        </td>

                                        {/* Year */}
                                        <td className="px-4 py-3.5 hidden sm:table-cell">
                                            <span className="text-slate-500">{yearLabel(student.year || 1)} Year</span>
                                        </td>

                                        {/* Phone */}
                                        <td className="px-4 py-3.5 text-slate-400 hidden lg:table-cell">
                                            {student.phone || <span className="text-slate-300">—</span>}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => onEdit(student)}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 text-[12px] font-medium transition-all"
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M8.5 1.5l2 2L3 11H1v-2L8.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => onDelete(student._id)}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 text-[12px] font-medium transition-all"
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M2 3h8M4.5 3V2h3v1M5 5.5v3M7 5.5v3M3 3l.5 7h5L9 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default StudentList;