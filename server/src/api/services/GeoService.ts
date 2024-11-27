import fetch from "node-fetch";
import { geocodeUrl } from "../apiUrls.js";
import type { GeoCoordinatesResponse } from "../types/geoCoordinates.types.js";

export class GeoService {
	static async getOriginAndDestinationCoordinatesFromUserRequest(origin: string, destination: string, usage?: string): Promise<GeoCoordinatesResponse> {
		try {
			const googleMapsApiKey = process.env["GOOGLE_MAPS_API_KEY"];

			const [originResponse, destinationResponse] = await Promise.all([
				fetch(geocodeUrl(origin, googleMapsApiKey)),
				fetch(geocodeUrl(destination, googleMapsApiKey)),
			]);

			const [originData, destinationData]: any = await Promise.all([
				originResponse.json(),
				destinationResponse.json(),
			]);

			if (originData.status !== "OK" || destinationData.status !== "OK") {
				return ({
					message: "Failed to geocode one or both addresses.",
					originError: originData.status,
					destinationError: destinationData.status,
				});
			}

			const originCoordinates = originData.results[0].geometry.location;
			const destinationCoordinates = destinationData.results[0].geometry.location;

			if (usage === "Google") {
				return ({
					origin: {
						location: {
							latLng: {
								latitude: originCoordinates.lat,
								longitude: originCoordinates.lng
							}
						}
					},
					destination: {
						location: {
							latLng: {
								latitude: destinationCoordinates.lat,
								longitude: destinationCoordinates.lng
							}
						}
					},
				});
			}

			if (usage === "Shopper") {
				return ({
					origin: {
						latitude: originCoordinates.lat,
						longitude: originCoordinates.lng
					},
					destination: {
						latitude: destinationCoordinates.lat,
						longitude: destinationCoordinates.lng
					},
				});
			}

			return { originCoordinates, destinationCoordinates};

		} catch (err: any) {
			console.error("Error:", err.message || err);
			return ({ message: "Failed to estimate route." });
		}
	}
}