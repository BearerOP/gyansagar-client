import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { useEffect, useState } from "react";
  import fetchAllCourse from "@/services/fetchAllCourse";
import { Button } from "./ui/button";
  
  export default function AllCourses({ coursesRef }) {
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getCourses = async () => {
        try {
          const response = await fetchAllCourse();
          if (response.success) {
            setAllCourses(response.data); // Accessing response.data
          } else {
            throw new Error("Failed to fetch courses");
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      getCourses();
    }, []);
  
    if (loading) {
      return <p>Loading courses...</p>;
    }
  
    return (
      <>
        <section 
          ref={coursesRef}  // Attach the ref to the courses section
          id="courses" 
          className="min-h-screen flex items-center justify-center w-full py-12 md:py-24 lg:py-32 bg-purple-100 dark:bg-purple-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Available Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => (
                <Card key={course._id}>  {/* Use course._id as the key */}
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Duration: {course.duration} hours</p>
                    <p>Price: ${course.price}</p>
                    <p>Category: {course.category}</p>
                    <p>Author: {course.author.username}</p> {/* Displaying author's username */}
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
    );
  }
  