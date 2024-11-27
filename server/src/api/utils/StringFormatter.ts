export class StringFormatter {
	public static formatDriverReview(driverReview: string): DriverReview {
		const driverRating = driverReview.slice(0, 3);
		const driverComment = driverReview.slice(4);

		return {
			driverRating,
			driverComment
		};
	}

	public static formatDriverRatePerKm(driverRatePerKm: string): number {
		const regex = /\d+,\d{2}/;

		const match = driverRatePerKm.match(regex);
		if (!match) {
			throw new Error('Invalid price format');
		}

		return parseFloat(match[0].replace(',', '.'));
	}
}

type DriverReview = {
	driverRating: string;
	driverComment: string;
};