import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Grid, Skeleton, Tooltip, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { visuallyHidden } from "@mui/utils";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import DriversByLine from "../Drivers/DriversByLine";
import { getPositionTextOutcome } from "../../common/helpers";
import PositionChange from "./PositionChange";
import ConstructorsByLine from "../Constructors/ConstructorsByLine";
import type { Race, Result } from "../../common/types";

const sx = {
	border: 0,
	"& > div > .MuiDataGrid-footerContainer": {
		display: "none",
	},
};

export default function Results({ results }: { results: Race["Results"] }) {
	if (!results) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (results.length === 0) {
		return (
			<Alert variant="outlined" severity="info">
				Race Data Not Available
			</Alert>
		);
	}

	const rows = results.map((row) => ({
		...row,
		id: row.position,
	}));

	return (
		<DataGrid
			sx={sx}
			rows={rows}
			autoHeight
			density="compact"
			columns={
				[
					{
						field: "position",
						headerName: "P",
						width: 60,
						headerAlign: "center",
						align: "center",
						type: "number",
					},
					{
						field: "change",
						renderHeader: () => (
							<Typography sx={visuallyHidden}>Position Changes</Typography>
						),
						renderCell: ({ row }) => <PositionChange {...row} />,
						width: 60,
						headerAlign: "center",
						align: "center",
					},
					{
						field: "Driver",
						headerName: "Driver",
						flex: 1,
						renderCell: ({ row }) =>
							row.Driver ? <DriversByLine id={row.Driver.driverId} /> : "",
						minWidth: 200,
					},
					{
						field: "Constructor",
						headerName: "Constructor",
						flex: 1,
						renderCell: ({ row }) =>
							row.Constructor ? (
								<ConstructorsByLine id={row.Constructor.constructorId} />
							) : (
								""
							),
						minWidth: 150,
					},
					{
						field: "points",
						headerName: "Points",
						type: "number",
						headerAlign: "center",
						align: "center",
					},
					{
						field: "time",
						headerName: "Time",
						sortable: false,
						headerAlign: "left",
						align: "left",
						flex: 0.5,
						renderCell: ({ row }) => {
							const time = row.Time?.time;
							return (
								<Grid
									container
									alignItems="center"
									justifyContent="space-between"
									flexWrap="nowrap"
									spacing={1}
								>
									{row.FastestLap?.rank === "1" && (
										<Grid item>
											<Tooltip title="Fastest Lap">
												<FontAwesomeIcon icon={faSquare} color={purple[400]} />
											</Tooltip>
										</Grid>
									)}
									<Grid item>
										{time
											? time
											: getPositionTextOutcome(row.positionText, row.status)}
									</Grid>
								</Grid>
							);
						},
						minWidth: 110,
					},
				] as Array<GridColDef<Result>>
			}
		/>
	);
}
