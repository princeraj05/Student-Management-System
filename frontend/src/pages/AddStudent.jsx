import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import API from '../services/api';

export default function AddStudent() {
    const navigate = useNavigate();

    const addStudent = async (student) => {
        await API.post('/students', student);
        navigate('/');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">

                {/* Back link */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-700 transition-colors mb-6"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back to dashboard
                </button>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100">
                        <div className="flex items-center gap-2.5 mb-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <h2 className="font-display font-bold text-slate-800 text-lg">Add New Student</h2>
                        </div>
                        <p className="text-slate-400 text-[13px]">Fill in the details below to register a new student.</p>
                    </div>
                    <div className="p-6">
                        <StudentForm onSubmit={addStudent} />
                    </div>
                </div>

            </div>
        </div>
    );
}