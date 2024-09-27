import Path from "./path";


const fetchAllCourse = async()=>{
    try {
        const response = await Path.get('/api/v1/course/getAll');
        console.log(response.data);
        
        return response.data;


    }catch(err){
        console.log(err);
    }            

}

export default fetchAllCourse;