import Path from "./path";


const fetchCourseById = async(courseId)=>{
    try {
        const response = await Path.get(`/api/v1/course/get/${courseId}`);
        return response.data;


    }catch(err){
        console.log(err);
    }            

}

export default fetchCourseById;