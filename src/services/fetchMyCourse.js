import Path from "./path";


const fetchMyCourse = async()=>{
    try {
        const response = await Path.get('/api/v1/course/myCourses');
        console.log(response.data);
        
        return response.data;


    }catch(err){
        console.log(err);
    }            

}

export default fetchMyCourse;