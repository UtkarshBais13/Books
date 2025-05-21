require("dotenv").config();
const express = require("express");
const cors = require("cors")

const app = express();
const router = require("./router/auth.router")
const bookrouter = require("./router/book.router")
const connectDb = require("./utils/db");
const sliderrouter = require("./router/sliderbook.router")
const cartRouter = require("./router/cart.router")
const searchRouter = require("./router/search.router")
const readerRouter = require("./router/readers.router")

//handling cors
const corsOptions ={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
};
app.use(cors(corsOptions));



app.use(express.json());
app.use("/api/auth",router);
app.use("/api/book",bookrouter);
app.use("/api/slider",sliderrouter);
app.use("/api/cart",cartRouter);
app.use("/api/readers",readerRouter);
app.use("/api/search",searchRouter);


const PORT = 8080;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at :${PORT}`)
    });
})

