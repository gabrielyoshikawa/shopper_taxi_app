export const geocodeUrl = (address: string, googleMapsApiKey: string | undefined) => `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;
export const routeUrl = (googleMapsApiKey: string | undefined) => `https://routes.googleapis.com/directions/v2:computeRoutes?key=${googleMapsApiKey}`;