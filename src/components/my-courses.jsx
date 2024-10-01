import { useState, useEffect } from "react"
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import fetchMyCourse from "@/services/fetchMyCourse"

export default function MyCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const data = await fetchMyCourse();
        console.log(data);
        
        setCourses(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching my courses:", error)
        setLoading(false)
        toast.error("Failed to fetch my courses. Please try again.")
      }
    }

    fetchMyCourses()
  }, [])

  if (loading) {
    return <div className="text-center">Loading My courses...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold">My Courses</h2>
      {courses.length === 0 ? (
        <p>You haven't uploaded any course yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <motion.div
              key={course._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Progress: {course.progress || '0'}%
                </span>
                <Link to={`/courses/${course._id}`}>
                  <Button>Continue Learning</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}