import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Link from "../Link";
import { getAPIUrl, mapSchedule } from "../../api/Ergast";
import useCachedAxios from "../../hooks/useCachedAxios";
import type { Race } from "../../common/types";
import { useAppState } from "../../hooks/useAppState";
import RaceMap from "./RaceMap";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Schedule() {
	const [{ season }] = useAppState();
	const [races, setRaces] = useState<Array<Race>>([]);
	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	useEffect(() => {
		Promise.all([
			useCachedAxios
				.get(getAPIUrl(`/${season}/results/1.json`))
				.then(mapSchedule),
			useCachedAxios.get(getAPIUrl(`/${season}.json`)).then(mapSchedule),
		]).then(([results, schedule]) => {
			setRaces(
				schedule.map((race) => ({
					...race,
					Results:
						results.find((r) => r.round === race.round)?.Results ||
						race.Results,
				}))
			);
		});
	}, [season]);

	return (
		<>
			<RaceMap
				season={season}
				races={races}
				height={isMdUp ? 900 : 300}
				zoom={isMdUp}
			/>
			<DataGrid
				sx={{ mt: 2 }}
				rows={races}
				autoHeight
				density="compact"
				getRowId={(row) => row.round || ""}
				columns={
					[
						{
							field: "date",
							headerName: "Date",
							headerAlign: "center",
							type: "date",
							align: "center",
							valueGetter: (date) => new Date(date),
							renderCell: ({ value }) => value.toLocaleDateString(),
							minWidth: 100,
						},
						{
							field: "raceName",
							headerName: "Race",
							flex: 1,
							renderCell: ({ row, value }) => (
								<Link to={`/race/${season}/${row.round}#${row.raceName}`}>
									{value}
								</Link>
							),
							minWidth: 200,
						},
						{
							field: "winner",
							headerName: "Winner",
							flex: 1,
							renderCell: ({ row }) => {
								if (!row.Results?.length) {
									return "--";
								}
								const winnerDriver = row.Results.find(
									(r) => Number(r.position) === 1
								)?.Driver;

								return winnerDriver
									? `${winnerDriver.givenName} ${winnerDriver.familyName} (${winnerDriver.code})`
									: "Winner Data Absent";
							},
							minWidth: 200,
						},
						{
							field: "location",
							headerName: "Location",
							type: "string",
							flex: 0.5,
							renderCell: ({ row }: GridCellParams<any, Race>) => {
								const locality = row.Circuit?.Location?.locality;
								const country = row.Circuit?.Location?.country;

								return `${locality}, ${country}`;
							},
							minWidth: 175,
						},
					] as Array<GridColDef<Race>>
				}
			/>
		</>
	);
}
