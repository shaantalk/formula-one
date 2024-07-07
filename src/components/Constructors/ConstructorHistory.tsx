import { Alert, Skeleton } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import type { ConstructorHistoryProps, SeasonStanding } from "../../common/types";
import useCachedAxios from "../../hooks/useCachedAxios";
import { getAPIUrl } from "../../api/Ergast";
import { transformConstructorHistoryData } from "../../common/helpers";

export default function ConstructorHistory({
	constructorId,
}: ConstructorHistoryProps) {
	const [standings, setStandings] = useState<Array<SeasonStanding> | undefined>();

	useEffect(() => {
		if (!standings) {
			const dataUrl = getAPIUrl(
				`/constructors/${constructorId}/constructorStandings.json`
			);
			useCachedAxios
				.get(dataUrl)
				.then(transformConstructorHistoryData)
				.then((data) => {
					setStandings(data);
				})
				.catch(() => { setStandings([]); });
		}
	}, [standings, constructorId]);

	if (!standings) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (standings.length === 0) {
		return (
			<Alert variant="outlined" severity="info">
				Career Data Not Available
			</Alert>
		);
	}

	return (
		<DataGrid
			rows={standings}
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
					},
					{
						field: "position",
						headerName: "Position",
						type: "number",
						headerAlign: "center",
						align: "center",
						renderCell: ({ row }) => {
							return Number(row.ConstructorStandings?.[0].position);
						},
						sortable: false,
						filterable: false,
						flex: 1,
					},
					{
						field: "points",
						headerName: "Points",
						type: "number",
						headerAlign: "center",
						align: "center",
						renderCell: ({ row }) => {
							return Number(row.ConstructorStandings?.[0].points);
						},
						sortable: false,
						filterable: false,
						flex: 1,
					},
					{
						field: "wins",
						headerName: "Wins",
						type: "number",
						headerAlign: "center",
						align: "center",
						renderCell: ({ row }) => {
							return Number(row.ConstructorStandings?.[0].wins);
						},
						sortable: false,
						filterable: false,
						flex: 1,
					},
				] as Array<GridColDef<SeasonStanding>>
			}
		/>
	);
}
