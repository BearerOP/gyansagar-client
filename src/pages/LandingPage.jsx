"use client";

import { useRef, useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Spotlight } from "@/components/ui/spotlight";
import HeroSection from "@/components/hero-section";
import AllCourses from "@/components/all-courses";

export default function LandingPage() {
  const coursesRef = useRef(null);
  const [error, setError] = useState(null);

  const scrollToCourses = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative top-0">
      <section className="overflow-hidden">
        <BackgroundBeamsWithCollision>
          <HeroSection />
        </BackgroundBeamsWithCollision>
        <Spotlight className="-top-40 left-60 md:left-60 md:-top-60 z-10" fill="violet" />
      </section>

      {/* Placeholder content */}
      <div className="h-screen bg-white dark:bg-black flex items-center justify-center">
        <h1 className="text-xl text-gray-800 dark:text-gray-200">Explore Courses</h1>
      </div>

      {/* Courses section */}
      <section ref={coursesRef} className="w-full py-12 bg-gray-100 dark:bg-gray-900 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Courses</h2>
        <div className="w-[80vw]">
          <AllCourses />
        </div>
      </section>
    </div>
  );
}
