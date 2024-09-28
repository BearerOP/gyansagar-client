import { useRef, useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import AllCourses from "@/components/all-courses";

export default function LandingPage() {
  const coursesRef = useRef(null); // Create a ref for the courses section
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
    <>
      <section>
        <BackgroundBeamsWithCollision>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Learn. Grow. Succeed.
                  </h1>
                </div>

                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock your potential with our expert-led courses. Start your learning journey today.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={scrollToCourses}>Start Learning</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </section>
      {/* Pass coursesRef to AllCourses */}
      <AllCourses coursesRef={coursesRef} />
    </>
  );
}
