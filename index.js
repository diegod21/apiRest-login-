require('dotenv').config();

const express = require('express');
const app = express();
const useRouter = require('./routes/useRouter');
const adminRouter = require('./routes/adminRouter')
const mongoose = require('mongoose');

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/user', express.json(), useRouter);

app.use('/admin', express.json(), adminRouter)

app.listen(process.env.PORT, ()=>{
    console.log('server running');
})