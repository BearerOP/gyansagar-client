import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

 function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter mb-8">Welcome back, User!</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">5</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completed Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">2</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={40} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">40% Complete</p>
              </CardContent>
            </Card>
          </div>
          <h2 className="text-2xl font-bold tracking-tighter mt-12 mb-6">Your Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Course Title {i}</CardTitle>
                  <CardDescription>Brief description of the course</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={i * 25} className="w-full mb-2" />
                  <p className="text-sm text-muted-foreground">{i * 25}% Complete</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard;