import Path from "./path";


const purchaseCourse = async(courseid)=>{
    try {
        const response = await Path.post(`/api/v1/course/purchase/${courseid}`);
        console.log(response.data);
        
        return response.data;


    }catch(err){
        console.log(err);
    }            

}

export default purchaseCourse;