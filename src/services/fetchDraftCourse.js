import Path from "./path";

const fetchDraftCourse = async()=>{
    try {
        const response = await Path.get('/api/v1/course/drafted');
        console.log(response.data);
        return response.data;
    }catch(err){
        console.log(err);
    }            
}

export default fetchDraftCourse;