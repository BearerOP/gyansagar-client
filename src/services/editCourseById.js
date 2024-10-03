import Path from "./path";

const editCourseById = async (courseId,course) => {
  const { name, description, price, category, duration,status } = course;
  try {
    const response = await Path.put(`/api/v1/course/edit/${courseId}`, {
      name,
      description,
      price,
      category,
      duration,
      status
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default editCourseById;
