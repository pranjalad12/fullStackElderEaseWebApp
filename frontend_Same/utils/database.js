import mongoose from 'mongoose';

let isConnected =false;

export const connectToDB =async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('using existing connection');
        return;
    }
    try{
        const db =await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            // useUnifiedTopology:true
        });
        isConnected =true;
        console.log('new connection');
    }
    catch(error){
        console.log('MongoDb err')
        console.log(error);
    }
}