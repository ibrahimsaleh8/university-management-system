import Link from "next/link";
import Image from "next/image";
import notFoundImage from "@images/not-found-logo.webp";
export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center flex-col gap-4">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
        linear-gradient(
          90deg, 
          transparent 0%,
          transparent 30%,
          rgba(138, 43, 226, 0.4) 50%,
          transparent 70%,
          transparent 100%
        ),
        linear-gradient(
          to bottom,
          #1a1a2e 0%,
          #2d1b69 50%,
          #0f0f23 100%
        )
      `,
          backgroundImage: `
        repeating-linear-gradient(
          90deg,
          transparent 0px,
          transparent 79px,
          rgba(255, 255, 255, 0.05) 80px,
          rgba(255, 255, 255, 0.05) 81px
        )
      `,
        }}
      />
      <div className="mt-24">
        <Image
          src={notFoundImage}
          alt="Not found image"
          width={1000}
          height={1000}
          className="md:w-[30rem] w-96"
          priority
        />

        <div className="flex flex-col gap-6 items-center justify-center text-center">
          <h2 className="text-2xl font-medium text-main-text">Not Found</h2>
          <p className="text-low-white">Could not find requested resource</p>
          <Link
            href="/"
            className="px-6 py-2.5 bg-main-text text-black font-bold border border-main-text hover:bg-transparent hover:text-main-text duration-300 text-sm">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
