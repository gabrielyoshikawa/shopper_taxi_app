export type GeoCoordinatesResponse =
	| DefaultGeoCoordinatesResponse
	| GoogleGeoCoordinatesResponse
	| ShopperGeoCoordinatesResponse
	| ErrorResponse;

interface DefaultGeoCoordinatesResponse {
	originCoordinates: {
		lat: number;
		lng: number;
	};
	destinationCoordinates: {
		lat: number;
		lng: number;
	};
}

interface GoogleGeoCoordinatesResponse {
	origin: {
		location: {
			latLng: {
				latitude: number;
				longitude: number;
			};
		};
	};
	destination: {
		location: {
			latLng: {
				latitude: number;
				longitude: number;
			};
		};
	};
}

interface ShopperGeoCoordinatesResponse {
	origin: {
		latitude: number;
		longitude: number;
	};
	destination: {
		latitude: number;
		longitude: number;
	};
}

interface ErrorResponse {
	message: string;
	originError?: string;
	destinationError?: string;
}