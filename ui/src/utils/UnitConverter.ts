export class UnitConverter {
	public static meterToKilometer(meters: number): string {
		const kilometers = meters / 1000;
		const formattedKilometers = Math.floor(kilometers * 10) / 10;
		return `${formattedKilometers} km`;
	}

		public static secondsToHoursAndMinutes(seconds: string): string {
			const totalSeconds = parseInt(seconds.replace('s', ''), 10);
	
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
	
			const hoursPart = hours > 0 ? `${hours}h ` : '';
			const minutesPart = `${minutes} min`;
	
			return `${hoursPart}${minutesPart}`.trim();
		}
	
}