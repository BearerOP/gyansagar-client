import Path from "./path";


const addNewCourse = async(course)=>{
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

export default addNewCourse;