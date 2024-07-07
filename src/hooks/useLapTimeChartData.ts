import { useMemo } from "react";
import {
	getColorWithAlt,
	getDateFromTimeString,
	getFastestLapTimeFromLaps,
} from "../common/helpers";
import type { Lap, LapByLapProps, LapTimeChartSeries } from "../common/types";

export default function useLapTimeChartData(
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
		const data: Array<LapTimeChartSeries> = [];

		if (laps.length > 0) {
			laps.forEach((lap) => {
				lap.Timings.forEach((timing) => {
					if (!timing.time) {
						return;
					}
					let index = data.findIndex((driver) => driver.id === timing.driverId);
					if (index === -1) {
						data.push({
							id: timing.driverId,
							data: [],
						});
						index = data.length - 1;
					}

					const lapTime = getDateFromTimeString(timing.time);
					const personalBest = Math.min(...data[index].data.map((l) => l.y));

					data[index].data.push({
						x: Number(lap.number),
						y: lapTime,
						timing,
						color: getColorWithAlt(lapTime, personalBest, fastestLapTime).color,
					});
				});
			});
		}

		return data;
	}, [laps, results]);
}
