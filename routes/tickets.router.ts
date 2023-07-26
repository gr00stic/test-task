import { Router } from "express";
import TicketsController from "../controllers/tickets.controller";


const ticketsRouter = Router();

ticketsRouter.get('/get-tickets/:eventId', TicketsController.getTickets);

export default ticketsRouter;