import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";

type Props = {
  name: string;
  grade: number;
};
export default function StudentClassCard({ grade, name }: Props) {
  return (
    <MotionEffect
      fade
      blur="10px"
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      inView>
      <div className="flex border border-soft-border hover:border-main-text duration-300 items-center justify-between bg-soft-border py-3 px-4 rounded-md">
        <div className="flex items-center gap-3">
          <img
            loading="lazy"
            className="w-12 h-12 rounded-md"
            src="https://i.ibb.co/NgrTw6jT/student-image.png"
            alt="student image"
          />
          <p className="font-medium">{name}</p>
        </div>
        <p className="font-bold">Grade : {grade}</p>
      </div>
    </MotionEffect>
  );
}
