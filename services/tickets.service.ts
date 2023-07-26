import { Price, Seat, Section } from "../interfaces";
import FetchService from "./fetch.service";

class TicketsService {
	async getTickets(eventId: string) {
		const seatsInfo = await FetchService.fetchSeatsInfo(eventId);
		const pricesInfo = await FetchService.fetchPricesInfo(eventId);
		const sectionsInfo = await FetchService.fetchSectionsInfo();

		let availableSeats = seatsInfo.filter((seat: Seat) => seat.SeatStatusId === 0).map(({ SectionId, ZoneId, SeatRow, SeatNumber, ...dropAttr }: Seat) => ({ SectionId, ZoneId, SeatRow, SeatNumber }));
		const availableZones = [...new Set(availableSeats.map((seat: Pick<Seat, "SectionId" | "ZoneId" | "SeatRow" | "SeatNumber">) => seat.ZoneId))];

		const availablePrices = pricesInfo.filter((item: Price) => availableZones.includes(item.ZoneId) && item.PerformanceId === 0);
		const availableZonePrices = availablePrices.map((item: Price) => ({ ZoneId: item.ZoneId, Price: item.Price }));

		let res = [];

		for (let i = 0; i < availableSeats.length; i++) {
			const seatInfo = {
				Row: availableSeats[i].SeatRow,
				SeatNumber: availableSeats[i].SeatNumber
			}
			res.push({
				Section: sectionsInfo.find((item: Section) => item.Id === availableSeats[i].SectionId)?.Description,
				...seatInfo,
				Price: availableZonePrices.find((item: Pick<Price, "ZoneId" | "Price">) => item.ZoneId === availableSeats[i].ZoneId)?.Price
			}
			);
		}

		return res;
	}
}

export default new TicketsService();