"use client";

import Image from "next/image";
import Link from "next/link";

export default function MeetOurTeamBanner() {
  return (
    <section className="w-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:bg-black py-16 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <Image
          src="https://img.freepik.com/premium-vector/team-puzzle-jigsaw-connect-teamwork-solving-problem-cooperation-team-success_997622-13397.jpg" // replace with your image path
          alt="College building"
          width={400}
          height={200}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Right: Text */}
      <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Meet Our Team
        </h2>
        <p className="text-xs sm:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Our dedicated faculty and staff are passionate about helping students.
        </p>
        <Link href="/team">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
          See More
        </button>
        </Link>
      </div>
    </section>
  );
}
