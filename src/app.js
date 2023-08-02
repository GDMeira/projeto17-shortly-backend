import express from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';
import dotenv from 'dotenv';
import { stringStripHtml } from './middlewares/stringStripHtmlValidation.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(stringStripHtml);
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listen on port ${port}`));