import { useState } from "react";

const emptyStudent = {
    name: "",
    email: "",
    phone: "",
    course: "",
    year: 1
};

function StudentForm({ initialStudent, isEditing = false, onSubmit, onCancel, loading = false }) {
    const [student, setStudent] = useState(() => (
        initialStudent ? { ...emptyStudent, ...initialStudent } : emptyStudent
    ));

    const handleChange = (e) => {
        const value = e.target.name === "year" ? Number(e.target.value) : e.target.value;
        setStudent({ ...student, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(student);
        if (!isEditing) {
            setStudent(emptyStudent);
        }
    };

    const inputClass = "w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-[13.5px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all";

    const labelClass = "block text-[11.5px] font-semibold text-slate-500 uppercase tracking-wide mb-1";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
                <label className={labelClass}>Full Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g. Arjun Sharma"
                    className={inputClass}
                    value={student.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label className={labelClass}>Email Address</label>
                <input
                    type="email"
                    name="email"
                    placeholder="arjun@example.com"
                    className={inputClass}
                    value={student.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label className={labelClass}>Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    className={inputClass}
                    value={student.phone}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className={labelClass}>Course</label>
                <input
                    type="text"
                    name="course"
                    placeholder="e.g. B.Tech Computer Science"
                    className={inputClass}
                    value={student.course}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label className={labelClass}>Year of Study</label>
                <select
                    name="year"
                    className={`${inputClass} cursor-pointer`}
                    value={student.year}
                    onChange={handleChange}
                >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                    <option value={4}>4th Year</option>
                </select>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-10 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white text-[13.5px] font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                            </svg>
                            Saving…
                        </>
                    ) : isEditing ? "Update Student" : "Add Student"}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-10 px-4 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-[13.5px] font-medium transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>

        </form>
    );
}

export default StudentForm;