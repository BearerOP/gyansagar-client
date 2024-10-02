"use client";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Spotlight } from "@/components/ui/spotlight";
import HeroSection from "@/components/hero-section";

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
    <section className="overflow-hidden absolute top-0">
      <BackgroundBeamsWithCollision>
        <HeroSection/>
      </BackgroundBeamsWithCollision>
      <Spotlight className="top-52 left-0 md:left-60 md:-top-20 z-10" fill="violet" />
    </section>
  );
}