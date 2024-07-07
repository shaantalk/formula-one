import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Grid,
	Typography,
} from "@mui/material";
import { useParams } from "react-router";
import DriverByCircuits from "../components/Drivers/DriverByCircuits";
import DriverCareer from "../components/Drivers/DriverCareer";
import { DriverDetails } from "../components/Drivers/DriverDetails";
import DriverSeasonPerformance from "../components/Drivers/DriverSeasonPerformance";
import { useAppState } from "../hooks/useAppState";
import { useDriver } from "../hooks/useDriver";

export default function DriverProfile() {
	const { id } = useParams();
	const driver = useDriver(id);
	const [{ season }] = useAppState();

	if (!driver) {
		return null;
	}

	return (
		<Card elevation={0}>
			<CardHeader title={<DriverDetails driver={driver} />} />

			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12} lg={12}>
						<Card variant="outlined">
							<Box sx={{ p: 2 }}>
								<Typography variant="h5" component="div" gutterBottom>
									Performance - Season {season}
								</Typography>
								<DriverSeasonPerformance driverId={id} />
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={12} lg={12}>
						<Card variant="outlined">
							<Box sx={{ p: 2 }}>
								<Typography variant="h5" component="div" gutterBottom>
									Performance - All Seasons
								</Typography>
								<DriverCareer driverId={id} />
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={12} lg={12}>
						<Card variant="outlined">
							<Box sx={{ p: 2 }}>
								<Typography variant="h5" component="div" gutterBottom>
									Performance - All Circuits
								</Typography>
								<DriverByCircuits driverId={id} />
							</Box>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
