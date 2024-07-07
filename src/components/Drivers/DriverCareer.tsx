import { Alert, Skeleton } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import type { DriverCareerProps, SeasonStanding } from "../../common/types";
import useCachedAxios from "../../hooks/useCachedAxios";
import { getAPIUrl, transformDriverCareerData } from "../../api/Ergast";
import ConstructorsByLine from "../Constructors/ConstructorsByLine";

export default function DriverCareer({ driverId }: DriverCareerProps) {
	const [seasonStandings, setSeasonStandings] = useState<
		Array<SeasonStanding> | undefined
	>();

	useEffect(() => {
		if (!seasonStandings) {
			const dataUrl = getAPIUrl(`/drivers/${driverId}/driverStandings.json`);
			useCachedAxios
				.get(dataUrl)
				.then(transformDriverCareerData)
				.then((data) => {
					setSeasonStandings(data);
				})
				.catch(() => { setSeasonStandings([]); });
		}
	}, [seasonStandings, driverId]);

	if (!seasonStandings) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (seasonStandings.length === 0) {
		return (
			<Alert variant="outlined" severity="info">
				Career Data Not Available
			</Alert>
		);
	}

	return (
		<DataGrid
			rows={seasonStandings}
			autoHeight
			density="compact"
			getRowId={(r) => r.season || ""}
			columns={
				[
					{
						field: "season",
						headerName: "Season",
						headerAlign: "center",
						type: "number",
						align: "center",
						flex: 1,
						minWidth: 100,
					},
					{
						field: "position",
						headerName: "Position",
						type: "number",
						headerAlign: "center",
						align: "center",
						renderCell: ({ row }) => {
							return Number(row.DriverStandings?.[0].position);
						},
						sortable: false,
						filterable: false,
						flex: 1,
						minWidth: 100,
					},
					{
						field: "points",
						headerName: "Points",
						type: "number",
						headerAlign: "center",
						align: "center",
						renderCell: ({ row }) => {
							return Number(row.DriverStandings?.[0].points);
						},
						sortable: false,
						filterable: false,
						flex: 1,
						minWidth: 100,
					},
					{
						field: "wins",
						headerName: "Wins",
						type: "number",
						headerAlign: "center",
						align: "center",
						renderCell: ({ row }) => {
							return Number(row.DriverStandings?.[0].wins);
						},
						sortable: false,
						filterable: false,
						flex: 1,
						minWidth: 100,
					},
					{
						field: "team",
						headerName: "Constructor",
						filterable: false,
						renderCell: ({ row }) => {
							return (
								<ConstructorsByLine
									id={row.DriverStandings?.[0].Constructors?.[0].constructorId}
									variant="full"
								/>
							);
						},
						flex: 1,
						minWidth: 150,
					},
				] as Array<GridColDef<SeasonStanding>>
			}
		/>
	);
}
