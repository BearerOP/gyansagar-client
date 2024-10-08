import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import fetchAllCourse from "@/services/fetchAllCourse";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Grid2X2, List } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

// Skeleton Loader Component
const CourseSkeleton = () => (
  <div className="flex flex-col rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 animate-pulse p-4">
    <Skeleton className="h-12 w-12 rounded-2xl" />
    <div className="space-y-2 mt-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gridView, setGridView] = useState(true);
  const observer = useRef(null);

  // Function to load courses with a 0.2 second delay
  const loadCourses = async () => {
    if (loading || page > totalPages) return;

    setLoading(true);
    setLoadingSkeleton(true);  // Show skeleton during the delay
    try {
      const data = await fetchAllCourse(page);

      // Introduce a 0.2s delay before updating the courses
      setTimeout(() => {
        setCourses((prevCourses) => [...prevCourses, ...data.data]);
        setTotalPages(data.totalPages);
        setLoadingSkeleton(false);  // Stop showing skeleton after courses are loaded
      }, ); // 0.2 sec delay
    } catch (error) {
      toast.error("Failed to fetch courses. Please try again.");
      setLoadingSkeleton(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses(); // Load courses on component mount and page change
  }, [page]);

  // Use IntersectionObserver to trigger loading more courses when the user scrolls near the bottom
  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, option);
    if (observer.current) observer.current.observe(document.querySelector("#load-more-trigger"));
  }, [page, totalPages]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">All Courses</h2>
        <Button
          onClick={() => setGridView(!gridView)}
          variant="outline"
          className="text-primary/60 dark:text-primary"
        >
          {gridView ? <List className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`grid gap-6 min-h-[400px] ${gridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {/* Render Skeletons when loading */}
        {loadingSkeleton && Array(6).fill(0).map((_, i) => <CourseSkeleton key={i} />)}

        {/* Render the courses */}
        {!loadingSkeleton && courses.map((course, index) => (
          <motion.div
            key={course._id}
            whileHover={{ scale: 1.05 }}
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
            <div className="flex flex-col gap-4 px-6 py-4 rounded-2xl bg-primary/15 dark:bg-primary/10">
              <div className="flex flex-col w-full">
                <span className="text-lg font-bold tracking-tighter text-gray-700 dark:text-gray-200">
                  Description
                </span>
                <p className="break-all text-gray-600 dark:text-gray-400 font-light hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300">
                  {course.description.substring(0, 80) + "..."}
                </p>
                <Separator className='my-2 bg-primary/50' />
                <span className="text-primary/80 text-sm">
                  <span className="text-gray-500 text-sm">Author: </span>
                  {course.author.username}
                </span>
                <Separator className='my-2 bg-primary/50' />
                <div className="flex justify-between items-center">
                  <span className="text-primary/80 text-sm">
                    <span className="text-gray-500 text-sm">Duration: </span>
                    {course.duration}
                  </span>
                  <span className="text-primary/80 text-sm">
                    <span className="text-gray-500 text-sm">Category: </span>
                    {course.category}
                  </span>
                </div>
              </div>
              <Link to={`/courses/${course._id}`}>
                <Button className="w-full bg-primary text-white hover:bg-primary-dark dark:bg-primary/90 dark:hover:bg-primary/80">
                  View Course
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Loading indicator */}
      {loading && <div className="text-center">Loading more courses...</div>}

      {/* Trigger for infinite scroll */}
      <div id="load-more-trigger" style={{ height: "20px" }}></div>
    </div>
  );
}
