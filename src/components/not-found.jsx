import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                404 - Page Not Found
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Oops! The page you're looking for seems to have wandered off the learning path.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link to={"/"}>
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Suggested Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Catalog</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Explore our wide range of courses and find your next learning adventure.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/courses">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access your enrolled courses, track progress, and manage your learning journey.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Help Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Find answers to common questions or get in touch with our support team.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/help">
                    <Search className="mr-2 h-4 w-4" />
                    Get Help
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>

  )
}