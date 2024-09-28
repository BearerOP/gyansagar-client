"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import fetchAllCourse from "@/services/fetchAllCourse"
import {Link} from "react-router-dom"
import { motion } from 'framer-motion'
import {
  Grid2X2,
  List,
} from "lucide-react"
import { toast } from "sonner"

export default function Dashboard() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [gridView, setGridView] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourse()
        setCourses(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setLoading(false)
        toast.error("Failed to fetch courses. Please try again.")
      }
    }

    loadCourses()
  }, [])

  return (
    <div className="flex flex-col gap-4 w-[82.5vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <h1 className="tracking-tighter text-5xl md:text-7xl font-extrabold text-primary">
          Courses Dashboard
        </h1>
        <div className='flex justify-between items-center'>
          <span className="text-lg xl:text-xl text-primary/75 font-medium">
            Manage your courses effectively
          </span>
          <div className="flex justify-between items-center">
            <Button onClick={() => setGridView(!gridView)} variant="ghost">
              {gridView ? <List className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-lg text-primary">Loading courses...</span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          // Ensure the container has a consistent minimum height
          className={`grid gap-6 min-h-[400px] ${gridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * index,
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="flex flex-col rounded-2xl border border-primary/30"
            >
              <div className="flex justify-between px-6 py-4">
                <h3 className="font-bold text-xl md:text-2xl tracking-tighter">{course.name}</h3>
                <span className="font-semibold text-primary/75">{course.price} USD</span>
              </div>
              <div className="flex flex-col gap-4 px-6 py-4 rounded-2xl bg-primary/10">
                <div className="flex flex-col w-full">
                  <span className="text-lg font-bold tracking-tighter">Description</span>
                  <div className="flex justify-between w-full items-center gap-2">
                    <p
                      className="break-all text-primary/60 font-light cursor-pointer hover:text-primary transition-all duration-300 truncate"
                    >
                      {course.description.substring(0, 50) + "..."}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary/60 text-sm">Duration: {course.duration}</span>
                    <span className="text-primary/60 text-sm">Category: {course.category}</span>
                  </div>
                </div>
                <Link href={`/course/${course._id}`} passHref>
                  <Button className="w-full">View Course</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
