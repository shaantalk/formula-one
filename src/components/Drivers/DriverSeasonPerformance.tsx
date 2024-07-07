import { Alert, Skeleton, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import type { DriverSeasonPerformanceProps, Race } from "../../common/types";
import useCachedAxios from "../../hooks/useCachedAxios";
import { getAPIUrl, mapSchedule } from "../../api/Ergast";
import { useAppState } from "../../hooks/useAppState";
import Link from "../Link";
import PositionChange from "../RaceResults/PositionChange";
import {
	getPositionTextOutcome,
	getTimeStringFromDate,
} from "../../common/helpers";

export default function DriverSeasonPerformance({
	driverId,
}: DriverSeasonPerformanceProps) {
	const [{ season }] = useAppState();
	const [races, setRaces] = useState<Array<Race> | undefined>();

	useEffect(() => {
		const dataUrl = getAPIUrl(`/${season}/drivers/${driverId}/results.json`);

		useCachedAxios
			.get(dataUrl)
			.then(mapSchedule)
			.then((races) => { setRaces(races); });
	}, [season, driverId]);

	if (!races) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (races.length === 0) {
		return (
			<Alert variant="outlined" severity="info">
				Season Data Not Available
			</Alert>
		);
	}

	return (
		<DataGrid
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
						renderCell: ({ value }) => new Date(value).toLocaleDateString(),
						valueGetter: (date) => new Date(date),
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
						field: "qualifying",
						headerName: "Start",
						type: "number",
						headerAlign: "center",
						align: "center",
						sortable: false,
						filterable: false,
						renderCell: ({ row }: GridCellParams<any, Race>) => {
							return Number(row.Results?.[0].grid);
						},
					},
					{
						field: "result",
						headerName: "Finish",
						type: "number",
						headerAlign: "center",
						align: "center",
						sortable: false,
						filterable: false,
						renderCell: ({ row }: GridCellParams<any, Race>) => {
							return Number(row.Results?.[0].position);
						},
					},
					{
						field: "change",
						renderHeader: () => (
							<Typography sx={visuallyHidden}>Position Changes</Typography>
						),
						renderCell: ({ row }) => {
							const { grid, position } = row.Results?.[0] || {};
							return <PositionChange grid={grid} position={position} />;
						},
						sortable: false,
						filterable: false,
						width: 60,
						headerAlign: "center",
						align: "center",
					},
					{
						field: "points",
						headerName: "Points",
						type: "number",
						headerAlign: "center",
						align: "center",
						sortable: false,
						filterable: false,
						renderCell: ({ row }: GridCellParams<any, Race>) => {
							return Number(row.Results?.[0].points);
						},
					},
					{
						field: "time",
						headerName: "Time",
						headerAlign: "left",
						align: "left",
						flex: 0.5,
						sortable: false,
						filterable: false,
						renderCell: ({ row }: GridCellParams<any, Race>) => {
							const time = row.Results?.[0].Time?.time;
							return time
								? time
								: getPositionTextOutcome(
										row.Results?.[0].positionText,
										row.Results?.[0].status
									);
						},
					},
				] as Array<GridColDef<Race>>
			}
		/>
	);
}
