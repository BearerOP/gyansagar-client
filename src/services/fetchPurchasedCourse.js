import Path from "./path";


const fetchPurchasedCourse = async()=>{
    try {
        const response = await Path.get('/api/v1/course/purchased');
        console.log(response.data);
        
        return response.data;


    }catch(err){
        console.log(err);
    }            

}

export default fetchPurchasedCourse;