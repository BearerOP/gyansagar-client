import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { ArrowLeft } from "lucide-react"
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

// Assume we have a createCourse function in our services
import { createCourse } from "@/services/createCourse"

export default function CreateCourse() {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [courseData, setCourseData] = React.useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    status: "draft"
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setCourseData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createCourse({
        ...courseData,
        price: parseFloat(courseData.price),
        duration: parseInt(courseData.duration)
      })
      toast.success("Course created successfully!")
      navigate("/courses/all")
    } catch (error) {
      console.error("Error creating course:", error)
      toast.error("Failed to create course. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Button
        onClick={() => navigate("/courses/all")}
        variant="ghost"
        className="mb-6 text-primary hover:text-primary-dark"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Courses
      </Button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Create New Course</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                name="name"
                value={courseData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={courseData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={courseData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => handleSelectChange("status", value)} defaultValue="draft">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading ? "Creating Course..." : "Create Course"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}