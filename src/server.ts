import {Server} from 'http'
import mongoose from 'mongoose';
import dotenv from "dotenv";
import app from './app';
let server: Server;

dotenv.config();

const PORT = process.env.PORT || 5000;


async function main(){
    try {
         await mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.qpmcg.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0`);
         console.log("connect to mongodb");
         
        server = app.listen(PORT, ()=>{
            console.log(`App is listening on port ${PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

main()