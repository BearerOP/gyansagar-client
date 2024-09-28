"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import fetchAllCourse from "@/services/fetchAllCourse";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Grid2X2, List } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "./ui/separator";

export default function AllCourses({ coursesRef }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourse();
        setCourses(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        toast.error("Failed to fetch courses. Please try again.");
      }
    };

    loadCourses();
  }, []);

  return (
    <div
      ref={coursesRef}
      className="flex flex-col gap-4 w-[82.5vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-gray-800 dark:text-gray-100 py-10"
    >
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <h1 className="tracking-tighter text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-primary">
          Available Courses
        </h1>
        <div className="flex justify-between items-center">
          <span className="text-lg xl:text-xl text-gray-600 dark:text-primary/75 font-medium">
            Manage your courses effectively
          </span>
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setGridView(!gridView)}
              variant="ghost"
              className="text-gray-600 dark:text-gray-100"
            >
              {gridView ? <List className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-lg text-gray-800 dark:text-gray-100">Loading courses...</span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`grid gap-6 min-h-[400px] ${gridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
        >
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                delay: 0.1 * index,
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="flex flex-col rounded-2xl border border-primary/30 dark:border-primary/30 bg-primary/10 dark:bg-primary/10"
            >
              <div className="flex justify-between px-6 py-4">
                <h3 className="font-bold text-xl md:text-2xl tracking-tighter text-gray-800 dark:text-gray-100">
                  {course.name}
                </h3>
                <span className="font-semibold text-primary dark:text-gray/75 hover:dark:text-primary hover:text-primary transition-all duration-300">
                  {course.price} USD
                </span>
              </div>
              <div className="flex flex-col  gap-4 px-6 py-4 rounded-2xl bg-primary/15 dark:bg-primary/10 ">
                <div className="flex flex-col w-full ">
                  <span className="text-lg font-bold tracking-tighter text-gray-700 dark:text-gray-200">
                    Description
                  </span>
                  <div className="flex justify-between w-full items-center gap-2">
                    <p className="break-all text-gray-600 dark:text-gray-400 font-light hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300">
                      {course.description.substring(0, 80) + "..."}
                    </p>
                  </div>
                  <Separator className='my-2 bg-primary/50' />
                  <span className="text-primary/80  text-sm">
                      <span className="text-gray-500 text-sm">

                        Author:
                      </span> {course.author.username}
                    </span>
                  <Separator className='my-2 bg-primary/50' />
                  <div className="flex justify-between items-center">
                    <span className="text-primary/80 text-sm">
                      <span className="text-gray-500 text-sm">
                        Duration:</span> {course.duration}
                    </span>
                    <span className="text-primary/80  text-sm">
                      <span className="text-gray-500 text-sm">

                        Category:
                      </span> {course.category}
                    </span>
                  </div>
                </div>
                <Link href={`/course/${course._id}`} passHref>
                  <Button className="w-full bg-primary text-white hover:bg-primary-dark dark:bg-primary/90 dark:hover:bg-primary/80">
                    View Course
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
