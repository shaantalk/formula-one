import { useMemo } from "react";
import type { Lap, LapByLapProps, LapTimesTableRow } from "../common/types";
import {
	getColorWithAlt,
	getDateFromTimeString,
	getFastestLapTimeFromLaps,
} from "../common/helpers";

export function useLapTimesData(
	laps: Array<Lap>,
	results: LapByLapProps["results"]
) {
	return useMemo(() => {
		const fastestLap = results?.find(
			(r) => Number(r.FastestLap?.rank) === 1
		)?.FastestLap;
		const fastestLapTime = fastestLap
			? getDateFromTimeString(
					results?.find((r) => Number(r.FastestLap?.rank) === 1)?.FastestLap
						?.Time?.time
				)
			: getFastestLapTimeFromLaps(laps);
		const data: Array<LapTimesTableRow> = [];

		if (laps.length > 0) {
			laps.forEach((lap) => {
				lap.Timings.forEach((timing) => {
					if (!timing.time) {
						return;
					}
					let index = data.findIndex(
						(driver) => driver.driverId === timing.driverId
					);
					if (index === -1) {
						data.push({
							driverId: timing.driverId,
							laps: [],
						});
						index = data.length - 1;
					}

					try {
						const lapTime = getDateFromTimeString(timing.time);
						const personalBest = Math.min(
							...data[index].laps.map((l) =>
								getDateFromTimeString(l.timing.time)
							)
						);

						data[index].laps.push({
							lap: Number(lap.number),
							timing: timing,
							...getColorWithAlt(lapTime, personalBest, fastestLapTime),
						});
					} catch {
						// time couldn't be calculated
					}
				});
			});
		}

		return data;
	}, [laps, results]);
}
