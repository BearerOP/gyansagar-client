import { useEffect, useRef, useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { IntroducingButton } from "@/components/introducing-button.jsx";
import { useNavigate } from "react-router-dom";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const coursesRef = useRef(null); // Create a ref for the courses section
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [pathname]);

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
          <div className='flex flex-col' >
              <Link to={'/courses/all'}>
            <div className='mb-10'>
                <AnimatedGradientText>
                  🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                  <span
                    className={cn(
                      `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                  >
                    Start Learning
                  </span>
                  <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
            </div>
              </Link>
            <div className="container px-4 md:px-6 relative">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-4">
                  <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                    <h1 className="tracking-tighter text-5xl md:text-[110px] mb-8 font-extrabold sm:text-4xl">
                      Learn. Grow. Succeed.
                    </h1>
                  </div>

                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Unlock your potential with our expert-led courses. Start your learning journey today.
                  </p>
                </div>
                <div className="space-x-4">


                  {/* <Button variant="outline">Learn More</Button> */}
                </div>
              </div>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </section>
    </>
  );
}
