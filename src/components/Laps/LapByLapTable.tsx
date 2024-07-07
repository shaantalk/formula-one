import { Box } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import type { LapByLapProps, LapByLapTableRow } from "../../common/types";
import useLapByLapChartData from "../../hooks/useLapByLapChartData";
import DriversByLine from "../Drivers/DriversByLine";

export default function LapByLapTable({ laps, results }: LapByLapProps) {
	const flatData: Array<LapByLapTableRow> = [];
	const data = useLapByLapChartData(laps, results);

	data.forEach((serie) => {
		flatData.push({
			driverId: serie.id,
			laps: Object.fromEntries(serie.data.map((d) => [`lap_${d.x}`, d.y])),
		});
	});

	const columns: Array<GridColDef<LapByLapTableRow>> = [
		{
			field: "driverId",
			headerName: "Driver",
			flex: 1,
			renderCell: ({ value }) => <DriversByLine id={value} variant="full" />,
			minWidth: 240,
		},
	];

	for (let index = 1; index <= laps.length; index++) {
		columns.push({
			sortable: false,
			filterable: false,
			field: `lap_${index}`,
			headerName: String(index),
			type: "number",
			align: "center",
			headerAlign: "center",
			width: 32,
			renderCell: ({ row, field }) => {
				return <>{row?.laps?.[field]}</>;
			},
		});
	}

	return (
		<Box height={800}>
			<DataGrid
				columns={columns}
				rows={flatData}
				getRowId={(r) => r.driverId}
			/>
		</Box>
	);
}
