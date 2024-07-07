import { Card, CardHeader, Grid } from "@mui/material";
import Schedule from "../components/Schedule/Schedule";
import DriversStandingsTable from "../components/Drivers/DriversStandingsTable";
import ConstructorsStandingsTable from "../components/Constructors/ConstructorsStandingsTable";
import { useAppState } from "../hooks/useAppState";

export default function Home() {
	const [{ season }] = useAppState();
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Card variant="outlined">
					<CardHeader title={`Schedule - Season ${season}`} />
					<Schedule />
				</Card>
			</Grid>
			<Grid item xs={12} md={9}>
				<Card variant="outlined">
					<CardHeader title={`Driver's Standings - Season ${season}`} />
					<DriversStandingsTable />
				</Card>
			</Grid>
			<Grid item xs={12} md={3}>
				<Card variant="outlined">
					<CardHeader title={`Constructor's Standings - Season ${season}`} />
					<ConstructorsStandingsTable />
				</Card>
			</Grid>
		</Grid>
	);
}
