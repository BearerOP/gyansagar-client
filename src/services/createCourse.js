import Path from "./path";


export const createCourse = async(course)=>{
    const { name, description, price, category, duration } = course;
    try {
        const response = await Path.post('/api/v1/course/add',{
            name, description, price, category, duration 
        });

        console.log(response.data);
        
        return response.data;


    }catch(err){
        console.log(err);
    }            

}

