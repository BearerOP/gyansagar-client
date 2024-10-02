import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import fetchCourseById from "@/services/fetchCourseById"
import editCourseById from "@/services/editCourseById"

export default function EditCourse() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = React.useState(true)
  const [updating, setUpdating] = React.useState(false)
  const [courseData, setCourseData] = React.useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    status: ""
  })

  React.useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourseById(id)
        setCourseData(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching course:", error)
        toast.error("Failed to fetch course details. Please try again.")
        navigate("/courses/my")
      }
    }

    loadCourse()
  }, [id, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setCourseData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const data = await editCourseById(id, {
        ...courseData,
        price: parseFloat(courseData.price),
        duration: parseInt(courseData.duration)
      })
      console.log(data, "after update")
      
      if (data.success) {
        toast.success("Course updated successfully!")
        navigate("/courses/my")
      } else {
        toast.error("Failed to update course. Please try again.")
      }
    } catch (error) {
      console.error("Error updating course:", error)
      toast.error("Failed to update course. Please try again.")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Button
        onClick={() => navigate("/courses/my")}
        variant="ghost"
        className="mb-6 text-primary hover:text-primary/80 dark:text-primary-foreground dark:hover:text-primary-foreground/80"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to My Courses
      </Button>

      <div className="bg-primary/10  backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-primary/20 dark:border-primary/20 transition-all duration-300 hover:shadow-primary/20 dark:hover:shadow-primary/20">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Edit Course</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground">Course Name</Label>
              <Input
                id="name"
                name="name"
                value={courseData.name}
                onChange={handleInputChange}
                required
                className="border-primary/30 focus:ring-primary dark:focus:ring-primary bg-background/5  backdrop-blur-sm"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-foreground">Course Description</Label>
              <Textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                required
                className="border-primary/30 focus:ring-primary dark:focus:ring-primary bg-background/5  backdrop-blur-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-foreground">Price (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={courseData.price}
                  onChange={handleInputChange}
                  required
                  className="border-primary/30 focus:ring-primary dark:focus:ring-primary bg-background/5  backdrop-blur-sm"
                />
              </div>
              <div>
                <Label htmlFor="duration" className="text-foreground">Duration (hours)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={courseData.duration}
                  onChange={handleInputChange}
                  required
                  className=" border-primary/30 focus:ring-primary dark:focus:ring-primary bg-background/5  backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category" className="text-foreground">Category</Label>
              <Select onValueChange={(value) => handleSelectChange("category", value)} defaultValue={courseData.category}>
                <SelectTrigger className="w-full border-primary/30 focus:ring-primary dark:focus:ring-primary bg-background/5  backdrop-blur-sm">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-background/90 dark:bg-background/90 backdrop-blur-md">
                  <SelectGroup>
                    <SelectLabel className="text-foreground">Categories</SelectLabel>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status" className="text-foreground">Status</Label>
              <Select onValueChange={(value) => handleSelectChange("status", value)} defaultValue={courseData.status}>
                <SelectTrigger className="w-full border-primary/30 focus:ring-primary dark:focus:ring-primary bg-background/5  backdrop-blur-sm">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent className="bg-background/90 dark:bg-background/90 backdrop-blur-md">
                  <SelectGroup>
                    <SelectLabel className="text-foreground">Status</SelectLabel>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>


            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={updating} 
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/30"
              >
                {updating ? "Updating Course..." : "Update Course"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}