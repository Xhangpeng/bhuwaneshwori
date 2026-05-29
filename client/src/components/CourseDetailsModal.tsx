import {
  Calendar,
  CheckCircle2,
  FileText,
  Layers,
  MapPin,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { SCHOOL } from "@/const";

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    level: string;
    levelName: string;
    title: string;
    age: string;
    grades: string;
    maxStudents: string;
    desc: string;
    subjects: string[];
    focus: string;
  } | null;
}

export default function CourseDetailsModal({
  isOpen,
  onClose,
  course,
}: CourseDetailsModalProps) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#faf6ee] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-secondary/10 flex flex-col anim-fade-up">
        {/* Header - Prevent Shrinking */}
        <div
          className="relative px-6 py-8 text-white flex flex-col justify-between shrink-0"
          style={{ background: "var(--gradient-primary)" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition animate-fade-in"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-2">
            <span className="eyebrow-pill text-xs bg-white/10 border-white/20 text-white">
              <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
              Course Details
            </span>
            <h2
              className="font-display font-extrabold text-2xl tracking-tight text-white mt-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {course.title}
            </h2>
            <p className="text-white/80 text-xs font-sans mt-1">
              Code: {course.id} | Target Age: {course.age} | {course.grades}
            </p>
          </div>
        </div>

        {/* Content Body - Fully Scrollable */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6 bg-[#faf6ee]">
          {/* Description */}
          <div className="space-y-2.5">
            <h3 className="font-display font-bold text-base text-primary">
              Program Overview
            </h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans">
              {course.desc}
            </p>
          </div>

          {/* Subjects Grid */}
          <div className="space-y-2.5">
            <h3 className="font-display font-bold text-base text-primary flex items-center gap-2">
              <Layers className="h-4 w-4 text-secondary" />
              Curriculum Subject Matrix
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-slate-600 font-sans">
              {course.subjects.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements & Dates Grid */}
          <div className="grid sm:grid-cols-2 gap-5 pt-4 border-t border-slate-200/60">
            {/* Required Documents */}
            <div className="space-y-2.5">
              <h4 className="font-display font-bold text-sm text-primary flex items-center gap-2">
                <FileText className="h-4 w-4 text-secondary" />
                Required Documents
              </h4>
              <ul className="space-y-2 text-[11px] text-slate-500 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Original Birth Certificate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Previous Progress Report Card</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Transfer Certificate (TC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>4 copies of passport-size photos</span>
                </li>
              </ul>
            </div>

            {/* Calendar */}
            <div className="space-y-2.5">
              <h4 className="font-display font-bold text-sm text-primary flex items-center gap-2">
                <Calendar className="h-4 w-4 text-secondary" />
                Admission Deadlines
              </h4>
              <div className="space-y-2 text-[11px] text-slate-500 font-sans">
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-slate-400 block uppercase font-bold text-[8px] tracking-wider">
                    Application Opens
                  </span>
                  <span className="text-primary font-bold mt-0.5 block">
                    Baisakh 1 – Jestha 30
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-slate-400 block uppercase font-bold text-[8px] tracking-wider">
                    Entrance Examination
                  </span>
                  <span className="text-primary font-bold mt-0.5 block">
                    Asadh 1 – Asadh 15
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
