const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDb = require('./config/db');
const portRouter = require('./routes/messageRoute');
const authRouter = require('./routes/userRoute.js');

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

connectDb();

app.use('/auth',authRouter);
app.use('/my-portfolio',portRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));
