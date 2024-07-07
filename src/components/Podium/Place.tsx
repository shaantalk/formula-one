import { Card, CardHeader, Divider, Typography } from "@mui/material";
import Link from "../Link";
import { useDriver } from "../../hooks/useDriver";
import type { PlaceProps } from "../../common/types";

export default function Place({ driverId, place, points }: PlaceProps) {
	const driver = useDriver(driverId);

	if (!driver) {
		return null;
	}

	const { givenName, familyName } = driver;
	const name = `${givenName} ${familyName}`;

	return (
		<Card elevation={0}>
			<CardHeader
				title={
					<Typography noWrap>
						<Link to={`/driver/${driverId}`}>{name}</Link>
					</Typography>
				}
				subheader={
					<>
						{place ? `P${place} ` : ""}
						{points ? (
							<Typography variant="caption">
								<Divider orientation="vertical" /> {points} pts
							</Typography>
						) : (
							""
						)}
					</>
				}
			/>
		</Card>
	);
}
