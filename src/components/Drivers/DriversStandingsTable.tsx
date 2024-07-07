import { Box, Divider, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useCachedAxios from "../../hooks/useCachedAxios";
import type { Responses, Standing } from "../../common/types";
import DriversByLine from "./DriversByLine";
import Place from "../Podium/Place";
import { useAppState } from "../../hooks/useAppState";
import { getAPIUrl, transformDriversStandingsData } from "../../api/Ergast";
import Podium from "../Podium/Podium";
import DriversStandingsChart from "./DriversStandingsChart";

const sx = {
	"& > .MuiDataGrid-main": {
		overflowX: "hidden",
	},
	"& > div > .MuiDataGrid-footerContainer": {
		display: "none",
	},
};

export default function DriversStandingsTable() {
	const [{ season }] = useAppState();
	const [standings, setStandings] = useState<Array<Standing>>([]);

	useEffect(() => {
		if (season) {
			const dataUrl = getAPIUrl(`/${season}/driverStandings.json`);
			useCachedAxios
				.get<Responses["DriverStandingsByYearResponse"]>(dataUrl)
				.then(transformDriversStandingsData)
				.then((data) => { setStandings(data); })
				.catch(() => { setStandings([]); });
		}
	}, [season, setStandings]);

	if (standings.length === 0) {
		return null;
	}

	const [p1, p2, p3, ...rest] = standings;

	return (
		<Grid container spacing={2} alignItems="stretch">
			<Grid item container xs={12} md={8} lg={8}>
				<Grid item xs={12} md={12} lg={12} sx={{ order: { md: 1, xs: 2 } }}>
					<Podium results={standings} />
				</Grid>
				<Grid item xs={12} md={12} lg={12} sx={{ order: { md: 2, xs: 1 } }}>
					<DriversStandingsChart />
				</Grid>
			</Grid>

			<Grid item xs={12} md={4} lg={4}>
				<Box
					sx={{
						height: {
							xs: 800,
							lg: "calc(100% - 8px)",
						},
						pr: {
							xs: 0,
							lg: 4,
						},
					}}
				>
					<DataGrid
						sx={sx}
						rows={rest}
						density="compact"
						columns={[
							{
								field: "position",
								headerName: "P",
								headerAlign: "center",
								type: "number",
								align: "center",
								width: 16,
							},
							{
								field: "code",
								headerName: "Driver",
								flex: 1,
								renderCell: ({ row }) => (
									<DriversByLine id={row.Driver?.driverId} variant="full" />
								),
								minWidth: 200,
							},
							{
								field: "points",
								headerName: "Points",
								type: "number",
							},
						]}
					/>
				</Box>
			</Grid>
		</Grid>
	);
}
