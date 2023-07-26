import { Price, Seat, Section } from "../interfaces";

class FetchService {
	async fetchSeatsInfo(eventId: string): Promise<Seat[]> {
		const rawSeatsInfo = await fetch(`https://my.laphil.com/en/rest-proxy/TXN/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`);

		return await rawSeatsInfo.json();
	}

	async fetchPricesInfo(eventId: string): Promise<Price[]> {
		const rawPricesInfo = await fetch(`https://my.laphil.com/en/rest-proxy/TXN/Packages/${eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`);

		return await rawPricesInfo.json();
	}

	async fetchSectionsInfo(): Promise<Section[]> {
		const rawSectionsInfo = await fetch(`https://my.laphil.com/en/rest-proxy/ReferenceData/Sections?seatMapId=12`);

		return await rawSectionsInfo.json();
	}
}

export default new FetchService();