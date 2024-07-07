import type { HeatMapSerie } from "@nivo/heatmap/dist/types/types";

export type FunctionComponent = React.ReactElement | null;

type HeroIconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
	React.RefAttributes<SVGSVGElement>;

type IconProps = HeroIconSVGProps & {
	title?: string;
	titleId?: string;
};

export type Heroicon = React.FC<IconProps>;

export type AppStateType = {
	season: number;
};

export type SetAppStateType = (newState: AppStateType) => void;

export type DriverId = Driver["driverId"];

export type Drivers = {
	[id: string]: Driver;
};

export type CanonicalId = string;

export type Circuit = {
	circuitId?: string;
	round?: string;
	url?: string;
	circuitName?: string;
	Location?: Location;
};

export type Location = {
	lat?: string;
	long?: string;
	locality?: string;
	country?: string;
};

export type Constructor = {
	constructorId?: string;
	url?: string;
	name?: string;
	nationality?: string;
};

export type Driver = {
	driverId?: string;
	permanentNumber?: string;
	code?: string;
	url?: string;
	canonicalId?: CanonicalId;
	givenName?: string;
	familyName?: string;
	dateOfBirth?: string;
	nationality?: string;
};

export type Race = {
	season?: string;
	round?: string;
	url?: string;
	raceName?: string;
	Circuit?: Circuit;
	date?: string;
	time?: string;
	Results?: Array<Result>;
	QualifyingResults?: Array<QualifyingResult>;
	Laps?: Array<Lap>;
};

export type Lap = {
	number: string;
	Timings: Array<Timing>;
};

export type Timing = {
	driverId: string;
	position: string;
	time: string;
};

export type Result = {
	number?: string;
	position?: string;
	positionText?: string;
	points?: string;
	Driver?: Driver;
	Constructor?: Constructor;
	grid?: string;
	laps?: string;
	status?: string;
	Time?: Time;
	FastestLap?: FastestLap;
};

export type QualifyingResult = {
	number: number;
	position: number;
	Driver: Driver;
	Constructor: Constructor;
	Q1: string;
	Q2: string;
	Q3: string;
};

export type FastestLap = {
	rank?: string;
	lap?: string;
	Time?: Time;
	AverageSpeed?: Speed;
};

export type Speed = {
	units?: string;
	speed?: string;
};

export type Time = {
	millis?: string;
	time?: string;
};

export type Standing = {
	id?: string;
	position?: string;
	positionText?: string;
	points?: string;
	wins?: string;
	Driver?: Driver;
	Constructor?: Constructor;
	Constructors?: Array<Constructor>;
};

export type Season = {
	season: string;
	url: string;
};

export type SeasonStanding = {
	season?: string;
	round?: string;
	DriverStandings?: Array<Standing>;
	ConstructorStandings?: Array<Standing>;
};

export type Responses = {
	SeasonsResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			limit?: string;
			offset?: string;
			total?: string;
			SeasonTable?: {
				Seasons?: Array<Season>;
			};
		};
	};

	CircuitsResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			limit?: string;
			offset?: string;
			total?: string;
			CircuitTable?: {
				Circuits?: Array<Circuit>;
			};
		};
	};

	ConstructorsByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			limit?: string;
			offset?: string;
			total?: string;
			ConstructorTable?: {
				season?: string;
				Constructors?: Array<Constructor>;
			};
		};
	};

	ConstructorStandingsByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			limit?: string;
			offset?: string;
			total?: string;
			StandingsTable?: {
				season?: string;
				StandingsLists?: Array<{
					season?: string;
					round?: string;
					ConstructorStandings?: Array<{
						position?: string;
						positionText?: string;
						points?: string;
						wins?: string;
						Constructor?: Constructor;
					}>;
				}>;
			};
		};
	};
	DriversResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			limit?: string;
			offset?: string;
			total?: string;
			DriverTable?: {
				Drivers?: Array<Driver>;
			};
		};
	};
	DriverStandingsByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			limit?: string;
			offset?: string;
			total?: string;
			StandingsTable?: {
				season?: string;
				StandingsLists?: Array<SeasonStanding>;
			};
		};
	};
	ResultsByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			limit?: string;
			offset?: string;
			total?: string;
			RaceTable?: {
				season?: string;
				round?: string;
				Races?: Array<Race>;
			};
		};
	};
	SeasonByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			limit?: string;
			offset?: string;
			total?: string;
			RaceTable?: {
				season?: string;
				Races?: Array<Race>;
			};
		};
	};
};

export type PlaceProps = {
	driverId: DriverId;
	place?: number | string;
	points?: number | string;
};

export type LapsProps = {
	season: string;
	round: string;
	results: Race["Results"];
};

export type DriversByLineProps = {
	id: DriverId;
	variant?: "code" | "name" | "full";
};

export type ConstructorId = Constructor["constructorId"];

export type ConstructorByLineProps = {
	id: ConstructorId;
	variant?: "name" | "full";
};

export type ConstructorWithBio = Constructor & {
	canonicalId?: CanonicalId;
};

export type Constructors = {
	[id: string]: ConstructorWithBio;
};

export type ConstructorWithColor = Constructor & {
	color?: string;
};

export type LapByLapProps = {
	laps: Array<Lap>;
	results: Race["Results"];
};

export type LapChartDatum = {
	x: number;
	y: number | null;
};

export type LapChartSeries = {
	id: string;
	color?: string;
	data: Array<LapChartDatum>;
};

export type LapByLapTableRow = {
	driverId: LapChartSeries["id"];
	laps: {
		[lap: string]: number | null;
	};
};

export type LapTimeChartDatum = {
	x: number;
	y: number;
	timing: Timing;
	color: string;
};

export type LapTimeChartSeries = {
	id: string;
	color?: string;
	data: Array<LapTimeChartDatum>;
};

export type LapTimesProps = {
	laps: Array<Lap>;
	results: Race["Results"];
};

export type LapTimesChartProps = {
	lapCount: number;
	data: Array<HeatMapSerie<LapChartDatum, any>>;
};

export type LapData = {
	lap: number;
	timing: Timing;
	color: string;
	alt: string;
};

export type LapTimesTableRow = {
	driverId: LapChartSeries["id"];
	laps: Array<LapData>;
};

export type QualifyingProps = {
	season: string;
	round: string;
};

export type RaceState = {
	race?: Race;
};

export type ChartSerie = {
	id: string;
	color: string;
	data: Array<{
		x: number;
		y: number;
		total: number;
		data: Result;
	}>;
};

export type RaceTotalRecord = {
	round: number;
	driverId: string;
	total: number;
};

export type FlagProps = {
	nationality: string | undefined;
	size?: "small" | "medium" | "large" | "auto" | number;
};

export type DriverAvatarProps = {
	id: DriverId;
	size?: "small" | "medium" | "large" | "auto" | number;
};

export type ImageSize = FlagProps["size"]  ;

export type DriverSeasonPerformanceChartProps = {
	races: Array<Race>;
};

export type DriverSeasonPerformanceProps = {
	driverId: DriverId;
};

export type DriverCareerProps = {
	driverId: DriverId;
};

export type TracksProps = {
	driverId: DriverId;
};

export type CircuitWithRaces = Circuit & {
	races: Array<Race>;
	averagePosition?: number;
	averageTime?: number;
};

export type CircuitDialogProps = {
	driver: Driver;
	circuit: CircuitWithRaces | undefined;
	onClose: () => void;
};

export type CircuitMapProps = {
	height?: number | "auto";
	width?: number | "auto";
	centerOn?: Location;
	zoom?: boolean;
	circuits?: Array<Circuit>;
};

export type ConstructorBySeasonProps = {
	constructorId: ConstructorId;
};

export type ConstructorHistoryProps = {
	constructorId: ConstructorId;
};
