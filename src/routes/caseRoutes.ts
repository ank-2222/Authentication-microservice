import express from 'express';
import { createCase } from '../controller/caseController';


const router = express.Router();

router.post("/raiseTicket",createCase);




export default router;