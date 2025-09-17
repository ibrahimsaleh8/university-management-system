import {
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Lock,
  Bell,
  Palette,
  Layers,
  Rocket,
  FolderOpen,
  MessageSquare,
} from "lucide-react";
import FeatureCard from "./FeatureCard";
import { TypingText } from "@/components/animate-ui/primitives/texts/typing";

const features: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Role-Based Dashboards",
    desc: "Separate dashboards for Students, Teachers, and Admins — each with tailored functionality and permissions.",
    icon: <Users className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Course Management",
    desc: "Admins can create, update, and assign courses. Students can enroll and view their courses easily.",
    icon: <BookOpen className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Exam & Assignment Scheduling",
    desc: "Teachers can schedule exams, upload assignments, and review student submissions.",
    icon: <FileText className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Grade Tracking",
    desc: "Students can view their grades in real-time, and teachers can manage grading efficiently.",
    icon: <BarChart3 className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Automated Timetable",
    desc: "Smart scheduling system that generates class and exam timetables dynamically.",
    icon: <Calendar className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Secure Authentication",
    desc: "Modern login system with JWT-based authentication and role-based access control.",
    icon: <Lock className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Notifications & Announcements",
    desc: "Real-time notifications for new courses, upcoming exams, deadlines, and admin announcements.",
    icon: <Bell className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Clean UI & UX",
    desc: "Modern, responsive design built with Tailwind CSS and Shadcn UI for a smooth user experience.",
    icon: <Palette className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Scalable & Maintainable",
    desc: "Built with Next.js, Prisma, and PostgreSQL, ensuring a scalable and production-ready architecture.",
    icon: <Layers className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Performance Optimized",
    desc: "Efficient data fetching with React Query and optimized database queries for fast loading.",
    icon: <Rocket className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Smart Classroom Scheduling",
    desc: "Automatically generate class timetables based on enrolled students, available teachers, and room capacity.",
    icon: <Calendar className="w-6 h-6 text-main-text" />,
  },

  {
    title: "Resource Sharing",
    desc: "Teachers can upload lecture notes, slides, and study materials for students to access easily.",
    icon: <FolderOpen className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Assignment & Homework Tracking",
    desc: "Students can submit assignments online, and teachers can grade and give feedback directly in the system.",
    icon: <FileText className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Class Announcements",
    desc: "Send important updates, reminders, and notices to students instantly with real-time notifications.",
    icon: <Bell className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Live Collaboration",
    desc: "Enable discussion forums or live Q&A sessions within each classroom to improve engagement.",
    icon: <MessageSquare className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Exam Preparation Space",
    desc: "Provide past papers, practice quizzes, and exam schedules for better preparation.",
    icon: <BookOpen className="w-6 h-6 text-main-text" />,
  },
  {
    title: "Performance Analytics",
    desc: "Track student progress and give teachers a quick overview of class performance.",
    icon: <BarChart3 className="w-6 h-6 text-main-text" />,
  },
];

export default function FeaturesSection() {
  return (
    <div className="mx-auto flex flex-col gap-4 w-full lg:w-[80%] sm:px-5">
      <TypingText
        className="sm:text-4xl text-3xl font-bold text-center"
        text="Features"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
        }}
        className="gap-4">
        {features.map((feature, i) => (
          <FeatureCard
            title={feature.title}
            desc={feature.desc}
            icon={feature.icon}
            index={i}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
