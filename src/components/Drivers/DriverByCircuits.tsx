import { Alert, Skeleton } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getCircuitResults, getTimeStringFromDate } from "../../common/helpers";
import type {
	TracksProps,
	CircuitWithRaces,
	DriverSeasonPerformanceChartProps,
} from "../../common/types";
import { useAppState } from "../../hooks/useAppState";
import useCachedAxios from "../../hooks/useCachedAxios";
import { getAPIUrl, transformCircuitsData } from "../../api/Ergast";

export default function Circuits({ driverId }: TracksProps) {
	const [{ season }] = useAppState();
	const [circuits, setCircuits] = useState<Array<CircuitWithRaces> | undefined>();

	useEffect(() => {
		const dataUrl = getAPIUrl(`/drivers/${driverId}/circuits.json`);

		useCachedAxios
			.get(dataUrl)
			.then(transformCircuitsData)
			.then((circuits) => {
				Promise.all(
					circuits.map((circuit) => getCircuitResults(driverId, circuit))
				)
					.then((circuitsWithRaces) => {
						return circuitsWithRaces.map(
							(circuit: DriverSeasonPerformanceChartProps) => {
								const racePositions: Array<number> = [];
								const raceTimes: Array<number> = [];

								circuit.races.forEach((race) => {
									if (race.Results?.[0].position) {
										racePositions.push(Number(race.Results?.[0].position));
									}

									try {
										const time = Number(race.Results?.[0].Time?.millis);

										if (time) {
											raceTimes.push(time);
										}
									} catch {
										// time could not be calculated
									}
								});

								return {
									...circuit,
									averagePosition: racePositions.length === 0
										? undefined
										: Math.round(
												racePositions.reduce((a, v) => a + v, 0) /
													racePositions.length
											),
									averageTime: raceTimes.length === 0
										? undefined
										: raceTimes.reduce((a, v) => a + v, 0) / raceTimes.length,
								};
							}
						);
					})
					.then((circuitsWithRacesAndTimes) =>
						{ setCircuits(circuitsWithRacesAndTimes); }
					);
				return circuits;
			})
			.catch(() => { setCircuits([]); });
	}, [season, driverId]);

	if (!circuits) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (circuits.length === 0) {
		return (
			<Alert variant="outlined" severity="info">
				Circuit Data Not Available
			</Alert>
		);
	}

	return (
		<DataGrid
			sx={{ mt: 2 }}
			rows={circuits}
			autoHeight
			density="compact"
			getRowId={(row) => row.circuitId || ""}
			columns={
				[
					{
						field: "circuitName",
						headerName: "Race",
						flex: 1,
						minWidth: 250,
						renderCell: ({ row }) => row.circuitName,
					},
					{
						field: "races",
						headerName: "Races",
						type: "number",
						headerAlign: "center",
						align: "center",
						flex: 1,
						renderCell: ({ row }) => row.races.length,
					},
					{
						field: "wins",
						headerName: "Wins",
						type: "number",
						headerAlign: "center",
						align: "center",
						flex: 1,
						renderCell: ({ row }) =>
							row.races.filter((r) => Number(r.Results?.[0].position) === 1)
								.length,
					},
					{
						field: "averagePosition",
						headerName: "Avg. Finish",
						type: "number",
						headerAlign: "center",
						align: "center",
						flex: 1,
					},
					{
						field: "averageTime",
						headerName: "Avg. Time",
						type: "number",
						headerAlign: "center",
						align: "center",
						flex: 1,
						renderCell: ({ value }) => {
							if (!value) {
								return "--";
							}
							return getTimeStringFromDate(new Date(value));
						},
					},
				] as Array<GridColDef<CircuitWithRaces>>
			}
		/>
	);
}
