const express=require("express")
const cors=require("cors");
const connection = require("./db");
const userRouter = require("./routes/user.route");
const OEM_Router = require("./routes/OEM.route");
const dealerRouter = require("./routes/dealer.route");

require("dotenv").config();

const app=express();
app.use(cors());

app.use(express.json());
app.use(userRouter)
app.use(OEM_Router)
app.use(dealerRouter)


app.listen(process.env.port,async()=>{
   try {
       await connection
       console.log("DB is Connected");
       console.log(`Server is running at ${process.env.port}`)
   } catch (error) {
    console.log(error)
   }
})