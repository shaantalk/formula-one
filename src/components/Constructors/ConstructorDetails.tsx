import { Grid, Typography } from "@mui/material";
import type { ConstructorWithBio } from "../../common/types";

export const ConstructorDetails = ({
	constructor,
}: {
	constructor: ConstructorWithBio;
}) => {
	return (
		<Grid
			container
			spacing={4}
			sx={{ fontSize: "1.5em", fontWeight: "bold" }}
			alignItems="center"
		>
			<Grid item>
				<Typography variant="h2">{constructor.name}</Typography>
			</Grid>
		</Grid>
	);
};
