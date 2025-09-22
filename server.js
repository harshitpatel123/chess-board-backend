import dotenv from 'dotenv'
dotenv.config();
import express, { json } from 'express';
import cors from 'cors'
import { connect } from 'mongoose';
import gameRoutes from './routes/gameRoute.js';

connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // MONGO_URL=mongodb://localhost:27017/chess
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const app = express()

app.use(json());
app.use(cors());

app.use('/game', gameRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Chess app listening on port ${process.env.PORT}`) // PORT=4000
})