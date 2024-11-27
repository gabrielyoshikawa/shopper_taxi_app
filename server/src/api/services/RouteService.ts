import fetch from "node-fetch";
import { routeUrl } from "../apiUrls.js";
import { GeoCoordinatesResponse } from "../types/geoCoordinates.types.js";

export class RouteService {
	static async getRouteDistanceAndRouteTime(originAndDestinationCoordinates: GeoCoordinatesResponse) {
		try {
			const googleMapsApiKey = process.env["GOOGLE_MAPS_API_KEY"];

			const directionsResponse = await fetch(routeUrl(googleMapsApiKey), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
				},
				body: JSON.stringify(originAndDestinationCoordinates),
			});

			if (!directionsResponse.ok) {
				const errorResponse = await directionsResponse.text();
				console.error("Google Maps API Error:", errorResponse);
				return ({ message: "Failed to get route data." });
			}

			const directionsData: any = await directionsResponse.json();

			const routes = directionsData.routes;
			if (!routes || routes.length === 0) {
				return ({ message: "No routes found." });
			}

			const { distanceMeters, duration } = routes[0];

			return ({
				routeResponse: directionsData,
				distance: distanceMeters,
				duration,
			});
		} catch (err: any) {
			console.error("Error:", err.message || err);
			return ({ message: "Failed to estimate route." });
		}
	}
}
