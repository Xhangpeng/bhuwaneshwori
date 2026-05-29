import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  Heart,
  HelpCircle,
  Laptop,
  Microscope,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { ASSETS, SCHOOL } from "@/const";
import { Link } from "wouter";
import { useState } from "react";
import CourseDetailsModal from "@/components/CourseDetailsModal";
import EnrollmentModal from "@/components/EnrollmentModal";

type CourseLevel = "all" | "early" | "primary" | "lower_sec" | "secondary" | "higher_sec";

interface CourseItem {
  id: string;
  level: string;
  levelName: string;
  title: string;
  age: string;
  grades: string;
  maxStudents: string;
  icon: React.ReactNode;
  image: string;
  desc: string;
  subjects: string[];
  focus: string;
}

export default function Courses() {
  const [filter, setFilter] = useState<CourseLevel>("all");
  
  // Modal State Management
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  const courses: CourseItem[] = [
    {
      id: "001",
      level: "early",
      levelName: "Early Childhood Education",
      title: "Early Childhood Education",
      age: "4 and above",
      grades: "Nursery, LKG, and UKG",
      maxStudents: "40 Max",
      icon: <Heart className="h-6 w-6 text-secondary" />,
      image: ASSETS.activity,
      desc: "At our school’s Early Childhood Program, children begin their learning journey in a warm, loving environment. We focus on play-based learning, social habits, motor skill development, and basic language/cognitive concepts to build a strong, joyful foundation.",
      subjects: [
        "Nepali & English Alphabet Foundations",
        "Fun Numeracy & Shape Identification",
        "Creative Arts, Music & Dance",
        "Social Habits & Emotional Sharing",
        "Sensory & Fine Motor Play Activities",
      ],
      focus: "Play, Social Habits, Fine Motor Skills, Language",
    },
    {
      id: "002",
      level: "primary",
      levelName: "Primary Level",
      title: "Primary Level (Grades 1 - 5)",
      age: "6 - 10",
      grades: "Class 1 to 5",
      maxStudents: "40 Max",
      icon: <BookOpen className="h-6 w-6 text-secondary" />,
      image: ASSETS.classroom,
      desc: "We provide a highly supportive and engaging environment to primary level students. Our focus is on establishing strong literacy in Nepali and English, core mathematics, environmental curiosity, and moral values that guide everyday behavior.",
      subjects: [
        "Nepali (नेपाली) & English (अंग्रेजी)",
        "Compulsory Mathematics (गणित)",
        "Science & Environmental Studies (विज्ञान)",
        "Social Studies & Local Environment (सामाजिक)",
        "Creative Arts, Crafts & Physical Ed.",
      ],
      focus: "Reading, Writing, Core Math, Basic Science",
    },
    {
      id: "003",
      level: "lower_sec",
      levelName: "Lower Secondary Level",
      title: "Lower Secondary Level (Grades 6 - 8)",
      age: "11 - 13",
      grades: "Class 6 to 8",
      maxStudents: "40 Max",
      icon: <Microscope className="h-6 w-6 text-secondary" />,
      image: ASSETS.activity,
      desc: "At the Lower Secondary Level, students continue to strengthen their academic foundation. We introduce structured laboratory practices, computer technology, integrated social sciences, and collaborative project work to encourage active enquiry.",
      subjects: [
        "English & Nepali Languages",
        "Compulsory Mathematics",
        "Science & Information Technology",
        "Social Studies & Population Ed.",
        "Moral & Health Education",
        "Occupation, Business & Tech Ed.",
      ],
      focus: "Critical Thinking, Science Labs, Tech Literacy",
    },
    {
      id: "004",
      level: "secondary",
      levelName: "Secondary Level",
      title: "Secondary Level (Grades 9 - 10 · SEE)",
      age: "14 - 16",
      grades: "Class 9 and 10",
      maxStudents: "40 Max",
      icon: <Trophy className="h-6 w-6 text-secondary" />,
      image: ASSETS.hero,
      desc: "At the Secondary Level, students engage in a more focused and exam-oriented academic program. This track fully prepares students for the Secondary Education Examination (SEE) board with mock testing, extensive lab sessions, and stream counseling.",
      subjects: [
        "Compulsory English & Nepali",
        "Compulsory Mathematics",
        "Compulsory Science & Technology",
        "Compulsory Social Studies",
        "Optional I: Opt. Mathematics",
        "Optional II: Computer Science / Health Ed.",
      ],
      focus: "SEE Preparation, Advanced Science, Career Guidance",
    },
    {
      id: "005",
      level: "higher_sec",
      levelName: "Higher Secondary (+2 Management)",
      title: "+2 Management Program",
      age: "17 - 19",
      grades: "XI and XII",
      maxStudents: "100 Max",
      icon: <Laptop className="h-6 w-6 text-secondary" />,
      image: ASSETS.campus,
      desc: "Our +2 Management program offers a strong academic foundation combined with practical learning to prepare students for the modern business world. Aligned with the National Examinations Board (NEB), we focus on accounting, economics, and business administration.",
      subjects: [
        "Compulsory English & Nepali",
        "Principles of Accounting",
        "Economics & Business Studies",
        "Business Mathematics / Marketing",
        "Computer Science / Social Studies",
      ],
      focus: "Financial Literacy, Economics, Management, IT",
    },
  ];

  const handleOpenDetails = (course: CourseItem) => {
    setSelectedCourse(course);
    setIsDetailsOpen(true);
  };

  const handleOpenEnroll = (course: CourseItem) => {
    setSelectedCourse(course);
    setIsEnrollOpen(true);
  };

  const filteredCourses = courses.filter(
    (c) => filter === "all" || c.level === filter
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${ASSETS.classroom})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            mixBlendMode: "overlay",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(197,155,39,0.20) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(30,95,160,0.30) 0%, transparent 55%)",
          }}
        />

        <div className="container relative z-10 py-20 sm:py-24 md:py-32 lg:py-36 text-center">
          <span className="eyebrow-pill">
            <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
            Academic Offerings
          </span>
          <h1
            className="text-white mt-6 anim-fade-up font-display font-extrabold"
            style={{
              fontSize: "clamp(2.1rem, 1.4rem + 3.6vw, 4.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              animationDelay: "80ms",
            }}
          >
            Our <span className="text-shimmer" style={{ backgroundSize: "200% 100%" }}>Courses</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-white/85 anim-fade-up"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.98rem, 0.88rem + 0.4vw, 1.125rem)",
              lineHeight: 1.65,
              animationDelay: "160ms",
            }}
          >
            Explore our comprehensive educational pathways, spanning from early childhood nurturing
            to high school board programs. Fully responsive, highly structured, and designed for growth.
          </p>
        </div>

        {/* Curved bottom transition */}
        <svg
          className="absolute bottom-[-1px] left-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: "60px", display: "block" }}
          aria-hidden
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fafbfc" />
        </svg>
      </section>

      {/* Course List & Filters */}
      <section className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <span className="eyebrow-pill">Academic Programs</span>
          <h2 className="section-title mt-5">Educational Pathways</h2>
          <p
            className="mt-5 mx-auto"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#64748b",
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              maxWidth: "60ch",
            }}
          >
            Filter by academic levels to explore our structured curriculum, core subject matrices,
            and specialized focus areas. Click on any course to view full details and enrollment criteria.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-10 sm:mb-14 border-b border-slate-200/60 pb-3 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: "all", label: "All Levels" },
            { id: "early", label: "Early Childhood" },
            { id: "primary", label: "Primary" },
            { id: "lower_sec", label: "Lower Secondary" },
            { id: "secondary", label: "Secondary" },
            { id: "higher_sec", label: "Higher Secondary" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as CourseLevel)}
              data-active={filter === tab.id}
              className="subtab"
            >
              <span className="subtab-dot" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="space-y-12 md:space-y-20">
          {filteredCourses.map((c, idx) => (
            <div
              key={c.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center reveal ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Frame */}
              <div
                className={`lg:col-span-5 ${
                  idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="relative group cursor-pointer" onClick={() => handleOpenDetails(c)}>
                  <div className="image-frame hover-zoom shadow-xl">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                  {/* Absolute Badge */}
                  <div
                    className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-white font-bold text-[10px] sm:text-xs shadow-lg flex flex-col items-center justify-center"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    <span className="opacity-75 uppercase tracking-widest text-[8px] sm:text-[9px]">Capacity</span>
                    <span className="text-xs sm:text-sm font-extrabold mt-0.5">{c.maxStudents}</span>
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div
                className={`lg:col-span-7 space-y-5 ${
                  idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/5 text-secondary border border-secondary/10 flex items-center justify-center">
                    {c.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-secondary font-sans block">
                      Code {c.id} · {c.levelName}
                    </span>
                    <span className="text-xs text-slate-400 font-sans block mt-0.5">
                      Target Age: {c.age} Years | {c.grades}
                    </span>
                  </div>
                </div>

                <h3
                  className="font-display font-extrabold text-primary cursor-pointer hover:text-secondary transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem)",
                    lineHeight: 1.15,
                  }}
                  onClick={() => handleOpenDetails(c)}
                >
                  {c.title}
                </h3>

                <p
                  className="text-slate-600 leading-relaxed text-[15px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {c.desc}
                </p>

                {/* Subject Matrices & Focus Grid */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200/60">
                  {/* Subject List */}
                  <div>
                    <h4
                      className="text-xs font-bold uppercase tracking-wider text-primary font-sans flex items-center gap-1.5"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-secondary" />
                      Core Subject Matrix
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-slate-500 font-sans">
                      {c.subjects.slice(0, 4).map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                          {s}
                        </li>
                      ))}
                      {c.subjects.length > 4 && (
                        <li className="text-secondary font-bold pl-3.5 mt-1 cursor-pointer hover:underline" onClick={() => handleOpenDetails(c)}>
                          + {c.subjects.length - 4} more subjects
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Core Focus Area */}
                  <div className="space-y-4">
                    <div>
                      <h4
                        className="text-xs font-bold uppercase tracking-wider text-primary font-sans flex items-center gap-1.5"
                      >
                        <Compass className="h-3.5 w-3.5 text-secondary animate-spin-slow" />
                        Core Focus Area
                      </h4>
                      <p className="mt-2.5 text-xs text-slate-500 font-sans leading-relaxed">
                        {c.focus}
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => handleOpenEnroll(c)}
                        className="btn-gold shine text-xs px-4 py-2.5 rounded-lg"
                      >
                        Enroll Now
                      </button>
                      <button
                        onClick={() => handleOpenDetails(c)}
                        className="btn-ghost text-xs px-4 py-2.5 rounded-lg border border-slate-200 hover:border-primary"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CDC Standard Banner */}
      <section className="container py-12 md:py-16">
        <div className="cta-band grid md:grid-cols-12 gap-8 items-center hover-lift relative overflow-hidden">
          <div className="md:col-span-8">
            <span
              className="eyebrow-pill"
              style={{
                color: "var(--color-gold-soft)",
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              Curriculum Development Centre (CDC) Standards
            </span>
            <h2
              className="text-white mt-5"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 1.1rem + 1.8vw, 2.5rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Aligned with National Education Standards
            </h2>
            <p
              className="mt-4 text-white/85 max-w-2xl"
              style={{ fontFamily: "var(--font-sans)", fontSize: "1.0625rem", lineHeight: 1.65 }}
            >
              Every level of our academic programs strictly follows the curriculum matrices set by the
              Ministry of Education, Nepal. We combine this standard with custom practical labs, IT exposure,
              and physical sports to ensure all-round student growth.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-wrap md:justify-end items-center gap-3">
            <Link href="/contact" className="btn-gold shine">
              Contact Admissions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Course Details Modal */}
      <CourseDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        course={selectedCourse}
      />

      {/* Enrollment Inquiry Modal */}
      <EnrollmentModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        course={selectedCourse}
      />
    </>
  );
}
