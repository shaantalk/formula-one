import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router";
import { ConstructorDetails } from "../components/Constructors/ConstructorDetails";
import { useConstructor } from "../hooks/useConstructors";
import ConstructorBySeason from "../components/Constructors/ConstructorBySeason";
import ConstructorHistory from "../components/Constructors/ConstructorHistory";
import { useAppState } from "../hooks/useAppState";

export default function ConstructorProfile() {
	const { id } = useParams();
	const constructor = useConstructor(id);
	const [{ season }] = useAppState();

	if (!constructor) {
		return null;
	}

	return (
		<Card elevation={0}>
			<CardHeader title={<ConstructorDetails constructor={constructor} />} />

			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12} lg={12}>
						<Card variant="outlined">
							<Box sx={{ p: 2 }}>
								<Typography variant="h5" component="div" gutterBottom>
									Performance - Season {season}
								</Typography>
								<ConstructorBySeason
									constructorId={constructor.constructorId}
								/>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={12} lg={12}>
						<Card variant="outlined">
							<Box sx={{ p: 2 }}>
								<Typography variant="h5" component="div" gutterBottom>
									Performance - All Seasons
								</Typography>
								<ConstructorHistory constructorId={constructor.constructorId} />
							</Box>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
