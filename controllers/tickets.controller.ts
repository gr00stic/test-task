import { Request, Response } from "express";
import TicketsService from "../services/tickets.service";

class TicketsController {
	async getTickets(req: Request, res: Response) {
		const eventId = req.params.eventId;

		const tickets = await TicketsService.getTickets(eventId);

		return res.json(tickets);
	}
}

export default new TicketsController();