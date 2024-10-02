require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// extra security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');



const connectDB = require('./database/connect')
const MONGO_URI = process.env.MONGO_URI;
const authenticateUser = require('./middleware/auth')

const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs') 


app.use(express.static ('./public'))

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.set('trust proxy' , 1)
app.use(rateLimiter({
    windowMs : 15 * 60 * 1000 ,
    max : 100
}))
app.use(helmet())
app.use(cors())
app.use(xss())




app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/jobs' ,authenticateUser , jobsRouter)

app.use(notFound);
app.use(errorHandlerMiddleware)


const start = async ()=>{
    try{
        await connectDB(MONGO_URI)
        app.listen(PORT , console.log(`server is listening on port ${PORT}...`))
    }catch(err){
        console.log('failed to connect to DB' , err)
    }

}

start()