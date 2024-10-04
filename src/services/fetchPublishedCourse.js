import Path from "./path";


const fetchPublishedCourse = async()=>{
    try {
        const response = await Path.get('/api/v1/course/published');
        console.log(response.data);
        
        return response.data;


    }catch(err){
        console.log(err);
    }            

}

export default fetchPublishedCourse;