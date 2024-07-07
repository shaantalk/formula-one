import type { AxiosResponse } from "axios";
import { REACT_APP_API_URL } from "../common/contants";
import type {
	Race,
	Responses,
	Driver as TDriver,
	Constructor,
	Lap,
	QualifyingResult,
	Standing,
	SeasonStanding,
	Circuit,
} from "../common/types";

export function getAPIUrl(path: string) {
	return `${REACT_APP_API_URL}${path}`;
}

export const mapSchedule = (
	response: AxiosResponse<Responses["ResultsByYearResponse"]>
): Array<Race> => {
	if (response.data.MRData?.RaceTable?.Races) {
		return response?.data?.MRData?.RaceTable?.Races;
	}

	return [];
};

export const getCanonicalId = (summary: TDriver | Constructor | undefined) => {
	if (!summary) {
		return;
	}
	const urlParts = (summary.url || "").split("/");
	return urlParts.pop() || undefined;
};

export const transformRaceData = (
	response: AxiosResponse<Responses["ResultsByYearResponse"]>
): Race | undefined => {
	const raceTable = response.data?.MRData?.RaceTable;
	const races = raceTable?.Races;
	const firstRace = races?.[0];
	const results = firstRace?.Results;

	if (results) {
		return {
			...firstRace,
			Results: results.map((result) => ({
				...result,
				id: result.position,
				Driver: {
					...result.Driver,
					canonicalId: getCanonicalId(result.Driver),
				},
			})),
		};
	}

	return undefined;
};

export const transformLapsData = (
	response: AxiosResponse<Responses["ResultsByYearResponse"]>
): Array<Lap> => {
	const raceTable = response.data?.MRData?.RaceTable;
	const races = raceTable?.Races;
	const firstRace = races?.[0];
	const laps = firstRace?.Laps;

	if (laps) {
		return laps.map((lap) => ({
			...lap,
			id: lap.number,
		}));
	}

	return [];
};

export const transformQualifyingData = (
	response: AxiosResponse<Responses["ResultsByYearResponse"]>
): Array<QualifyingResult> => {
	const raceTable = response.data?.MRData?.RaceTable;
	const races = raceTable?.Races;
	const firstRace = races?.[0];
	const qualifyingResults = firstRace?.QualifyingResults;

	if (qualifyingResults) {
		return qualifyingResults.map((qualifying) => ({
			...qualifying,
			id: qualifying.position,
			Driver: {
				...qualifying.Driver,
				canonicalId: getCanonicalId(qualifying.Driver),
			},
		}));
	}

	return [];
};

export const transformDriversStandingsData = (
	response: AxiosResponse<Responses["DriverStandingsByYearResponse"]>
): Array<Standing> => {
	const standingsTable = response.data?.MRData?.StandingsTable;
	const standingsLists = standingsTable?.StandingsLists;
	const firstStandingsList = standingsLists?.[0];
	const driverStandings = firstStandingsList?.DriverStandings;

	if (driverStandings) {
		return driverStandings.map((standing) => ({
			...standing,
			id: standing.Driver?.driverId ?? "",
			Driver: {
				...standing.Driver,
				canonicalId: getCanonicalId(standing.Driver),
			},
		}));
	}

	return [];
};

export const transformConstructorsStandingsData = (
	response: AxiosResponse<Responses["ConstructorStandingsByYearResponse"]>
): Array<Standing> => {
	const standingsTable = response.data?.MRData?.StandingsTable;
	const standingsLists = standingsTable?.StandingsLists;
	const firstStandingsList = standingsLists?.[0];
	const constructorStandings = firstStandingsList?.ConstructorStandings;

	if (constructorStandings) {
		return constructorStandings.map((standing) => ({
			...standing,
			id: standing.Constructor?.constructorId ?? "",
		}));
	}

	return [];
};

export const transformDriverCareerData = (
	response: AxiosResponse<Responses["DriverStandingsByYearResponse"]>
): Array<SeasonStanding> => {
	const standingsTable = response.data?.MRData?.StandingsTable;
	const standingsLists = standingsTable?.StandingsLists;

	if (standingsLists) {
		return standingsLists.map((season) => ({
			...season,
			DriverStandings: season.DriverStandings?.map((standing) => ({
				...standing,
				id: standing.Driver?.driverId ?? "",
				Driver: {
					...standing.Driver,
					canonicalId: getCanonicalId(standing.Driver),
				},
			})),
		}));
	}

	return [];
};

export const transformRacesData = (
	response: AxiosResponse<Responses["ResultsByYearResponse"]>
): Array<Race> => {
	if (response.data.MRData?.RaceTable?.Races) {
		return response.data.MRData?.RaceTable?.Races;
	}

	return [];
};

export const transformCircuitsData = (
	response: AxiosResponse<Responses["CircuitsResponse"]>
): Array<Circuit> => {
	if (response.data.MRData?.CircuitTable?.Circuits) {
		return response?.data?.MRData?.CircuitTable?.Circuits;
	}

	return [];
};
