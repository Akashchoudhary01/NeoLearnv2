import mongoose from "mongoose";

mongoose.set('strictQuery' , false);

export const connectionToDB = async()=>{
    try{

        const {connection} = await mongoose.connect(
            process.env.MONGO_URI
        )
        if(connection){
            console.log(`connected to mongodb : ${connection.host} `);  
        }
    }catch(err){
        console.log(err);
        process.exit(1);  // if any error occure then terminate the server
        

    }
        
        
    
}