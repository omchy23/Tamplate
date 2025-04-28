import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv' ;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    path: path.join(__dirname, '.env')
});



connectDB().then(() => {
    app.listen(process.env.PORT || 7672 , () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})