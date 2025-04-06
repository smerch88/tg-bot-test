import express from 'express';
import cors from 'cors';
import messageRouter from './routes/message.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/send-message', messageRouter);

export default app;
