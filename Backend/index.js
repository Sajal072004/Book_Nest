import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './routes/book.routes.js'
import userRoute from './routes/user-route.js'
import cors from 'cors'
dotenv.config();
const app=express();

app.use(cors({
  origin: 'https://book-nest-wine.vercel.app', // Allow requests from this origin
  methods: ['POST', 'GET'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow cookies or credentials
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



const PORT=process.env.PORT || 4000;
const URI=process.env.MongoDBURI;

//connect to MongoDB

try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (error) {
    console.log("Error ", error);
}

//defining routes
app.use('/book',bookRoute);
app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})
