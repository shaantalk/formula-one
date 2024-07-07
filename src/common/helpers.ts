import { green, purple, yellow } from "@mui/material/colors";
import type {
	Circuit,
	CircuitWithRaces,
	DriverId,
	Lap,
	RaceTotalRecord,
	Responses,
	Result,
	SeasonStanding,
} from "./types";
import useCachedAxios from "../hooks/useCachedAxios";
import { getAPIUrl, getCanonicalId, transformRacesData } from "../api/Ergast";
import type { AxiosResponse } from "axios";

export const getDateFromTimeString = (time: string | undefined) => {
	if (!time) {
		throw new Error("Time is undefined");
	}
	const [mins, secondsWithMilli] = time.split(":");
	const [seconds, milliseconds] = secondsWithMilli.split(".");
	return Date.UTC(
		2022,
		0,
		1,
		0,
		Number(mins),
		Number(seconds),
		Number(milliseconds)
	);
};

export const getTimeStringFromDate = (time: Date) => {
	const hours = time.getUTCHours();
	const minutes = String(time.getUTCMinutes()).padStart(2, "0");
	const seconds = String(time.getUTCSeconds()).padStart(2, "0");
	const millis = String(time.getUTCMilliseconds()).padStart(2, "0");

	return `${hours}:${minutes}:${seconds}.${millis}`;
};

export const getFastestLapTimeFromLaps = (laps: Array<Lap>) => {
	let fastestLapTime: number | undefined;

	laps.forEach((l) => {
		l.Timings.forEach((t) => {
			try {
				const time = getDateFromTimeString(t.time);
				if (time && (!fastestLapTime || time < fastestLapTime)) {
					fastestLapTime = time;
				}
			} catch {
				// time couldn't be calculated
			}
		});
	});

	return fastestLapTime;
};

export const getLapTicks = (laps: number) => {
	const ticks = [1];
	for (let index = 1; index < laps; index++) {
		if (index % 10 === 0) {
			ticks.push(index);
		}
	}

	return [...ticks, laps];
};

export const getColorWithAlt = (
	lapTime: number,
	personalBest: number,
	fastestLapTime: number | undefined
) => {
	if (lapTime === fastestLapTime) {
		return { color: purple[800], alt: "Fastest Lap" };
	} else if (lapTime < personalBest) {
		return { color: green[400], alt: "Personal Best" };
	}

	return { color: yellow[500], alt: "Slower than Personal Best" };
};

export function getPositionTextOutcome(
	positionText: Result["positionText"],
	status: Result["status"]
) {
	switch (positionText) {
		case "R": {
			return `Retired: ${status}`;
		}
		case "D": {
			return "Disqualified";
		}
		case "E": {
			return "Excluded";
		}
		case "W": {
			return "Withdrawn";
		}
		case "F": {
			return "Failed to qualify";
		}
		case "N": {
			return "Not Classified";
		}

		default: {
			return status;
		}
	}
}

export const sortRacesByTotal = (a: RaceTotalRecord, b: RaceTotalRecord) => {
	if (a.total > b.total) {
		return -1;
	} else if (a.total < b.total) {
		return 1;
	} else {
		return 0;
	}
};

export const getCircuitResults = (
	driverId: DriverId,
	circuit: Circuit
): Promise<CircuitWithRaces> => {
	const dataUrl = getAPIUrl(
		`/drivers/${driverId}/circuits/${circuit.circuitId}/results.json`
	);

	return useCachedAxios
		.get(dataUrl)
		.then(transformRacesData)
		.then((races) => ({
			...circuit,
			races,
		}))
		.catch(() => ({
			...circuit,
			races: [],
		}));
};

export const transformConstructorHistoryData = (
	response: AxiosResponse<Responses["ConstructorStandingsByYearResponse"]>
): Array<SeasonStanding> => {
	const standingsTable = response.data?.MRData?.StandingsTable;
	const standingsLists = standingsTable?.StandingsLists;

	if (standingsLists) {
		return standingsLists.map((season) => ({
			...season,
			ConstructorStandings: season.ConstructorStandings?.map((standing) => ({
				...standing,
				id: standing.Constructor?.constructorId ?? "",
				Constructors: [
					{
						...standing.Constructor,
						canonicalId: getCanonicalId(standing.Constructor),
					},
				],
			})),
		}));
	}

	return [];
};
