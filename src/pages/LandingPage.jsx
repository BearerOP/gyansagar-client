import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();


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
                <Button onClick={() => navigate('/dashboard')}>Start Learning</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </section>
      <section id="courses" className="min-h-screen flex items-center justify-center w-full py-12 md:py-24 lg:py-32 text-background dark:text-white bg-purple-100 dark:bg-purple-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Available Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Course Title {i}</CardTitle>
                  <CardDescription>Brief description of the course</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Course details and highlights...</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Enroll Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
