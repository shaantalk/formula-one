import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import type { LapTimesProps, LapTimesTableRow } from "../../common/types";
import DriversByLine from "../Drivers/DriversByLine";
import { useLapTimesData } from "../../hooks/useLapTimesData";

const useColumns = (laps: number) => {
	return useMemo(() => {
		const columns: Array<GridColDef<LapTimesTableRow>> = [
			{
				field: "driverId",
				headerName: "Driver",
				flex: 1,
				renderCell: ({ value }) => <DriversByLine id={value} variant="full" />,
				minWidth: 240,
			},
		];

		for (let index = 1; index <= laps; index++) {
			columns.push({
				sortable: false,
				filterable: false,
				field: String(index),
				headerName: String(index),
				type: "dateTime",
				align: "center",
				headerAlign: "center",
				width: 100,
				renderCell: ({ row, field }) => {
					const lap = row.laps.find((l) => l.lap === Number(field));
					if (!lap) {
						return "";
					}
					const { color, alt, timing } = lap;
					return (
						<>
							<FontAwesomeIcon
								icon={faSquare}
								color={color}
								title={alt}
								style={{ marginRight: 8 }}
							/>
							{timing.time}
						</>
					);
				},
			});
		}

		return columns;
	}, [laps]);
};

export default function LapTimesTable({ laps, results }: LapTimesProps) {
	const data = useLapTimesData(laps, results);
	const columns = useColumns(laps.length);

	return (
		<DataGrid
			columns={columns}
			rows={data}
			getRowId={(r) => r.driverId}
			autoHeight
		/>
	);
}
