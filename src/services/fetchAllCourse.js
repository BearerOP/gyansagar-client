import Path from "./path";

const fetchAllCourse = async (page = 1, limit = 10) => {
    try {
      const response = await Path.get(`/api/v1/course/getAll?page=${page}&limit=${limit}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
  

export default fetchAllCourse;