import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import fetchCourseById from "@/services/fetchCourseById";
import purchaseCourse from "@/services/purchaseCourse";

// Importing the services for fetching and purchasing the course


export default function ViewCourse() {
  const { id } = useParams(); // Extract course ID from the URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true); // Loading state
  const [purchasing, setPurchasing] = useState(false); // State to manage purchase button

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourseById(id); // Fetch the course by ID
        setCourse(data.data); // Set course data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
        toast.error("Failed to fetch course details. Please try again.");
      }
    };

    loadCourse();
  }, [id]);

  // Function to handle course enrollment
  const enrollCourse = async () => {
    try {
      setPurchasing(true);
      const data = await purchaseCourse(id); // Call purchase course API
      console.log(data,"purchasing courses");
      
      toast.success("You have successfully enrolled in the course!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Enrollment failed. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  // If the course is still loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-gray-800 dark:text-gray-100">Loading course details...</span>
      </div>
    );
  }

  // If the course was not found
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Link to="/courses/all">
          <Button>Back to All Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Link to="/courses/all" className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Courses
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{course.name}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Clock className="mr-2 h-4 w-4" />
              Duration: {course.duration} hrs
            </span>
            <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
              <BookOpen className="mr-2 h-4 w-4" />
              {course.lessons || 0} lessons
            </span>
            <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Users className="mr-2 h-4 w-4" />
              {course.students || 0} students enrolled
            </span>
            <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="mr-2 h-4 w-4" />
              Last updated: {new Date(course.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <Separator className="my-6" />

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
            <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Price</p>
              <p className="text-3xl font-bold text-primary">${course.price} USD</p>
            </div>
            <Button
              onClick={enrollCourse}
              size="lg"
              className="w-full md:w-auto"
              disabled={purchasing} // Disable button while purchasing
            >
              {purchasing ? "Processing..." : "Enroll Now"}
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Created by <span className="font-semibold">{course.author.username}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
