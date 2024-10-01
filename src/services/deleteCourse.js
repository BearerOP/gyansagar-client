import Path from "./path";

const deleteCourseById = async (courseId) => {
  try {
    const response = await Path.delete(`/api/v1/course/delete/:${courseId}`);

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default deleteCourseById;
