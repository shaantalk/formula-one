import { Grid, Typography } from "@mui/material";
import Link from "../Link";
import { useDriver } from "../../hooks/useDriver";
import type { DriversByLineProps } from "../../common/types";

export default function DriversByLine({
	id,
	variant = "full",
}: DriversByLineProps) {
	const driver = useDriver(id);

	if (!driver) {
		return null;
	}

	const { driverId, givenName, familyName, code } = driver;
	const name = `${givenName} ${familyName}`;

	switch (variant) {
		case "code": {
			return <>{code}</>;
		}
		case "name": {
			return <>{name}</>;
		}

		case "full": {
			return (
				<Grid
					container
					spacing={1}
					alignItems="center"
					sx={{ flexWrap: "nowrap" }}
				>
					<Grid item>
						<Typography>
							<Link to={`/driver/${driverId}`}>{name}</Link>
						</Typography>
					</Grid>
				</Grid>
			);
		}
	}

	return null;
}
