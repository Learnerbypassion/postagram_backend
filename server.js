import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 4000; // here the env is set to 3000
connectDB();
app.listen(PORT, (req,res)=>{
    console.log("The server is running");
    console.log(`http://localhost:${PORT}`)
    
})