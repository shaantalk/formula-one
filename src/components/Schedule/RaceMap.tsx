import { alpha, Box, Typography, useTheme } from "@mui/material";
import type { GeoMapTooltip} from "@nivo/geo";
import { ResponsiveGeoMap } from "@nivo/geo";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useInvertedTheme } from "../../hooks/useCustomTheme";
import type { Race } from "../../common/types";
import { useLand } from "../../hooks/useLand";

const Tooltip: GeoMapTooltip = ({ feature }) => {
	const theme = useInvertedTheme();

	if (feature?.geometry?.type !== "Point") {
		return null;
	}

	const sx = {
		p: 1,
		borderRadius: 1,
		background: alpha(theme.palette.background.paper, 0.75),
		color: theme.palette.getContrastText(theme.palette.background.paper),
	};

	const race: Race = feature.race;

	return (
		<Box sx={sx}>
			<Typography>{race.raceName}</Typography>
			<Typography>{race.Circuit?.circuitName}</Typography>
		</Box>
	);
};

type RaceMapProps = {
	season: string | number;
	races: Array<Race>;
	height?: number | "auto";
	width?: number | "auto";
	centerOn?: Location;
	zoom?: boolean;
};

export default function RaceMap({
	season,
	races,
	height = 600,
	width = "auto",
	centerOn = { long: "0", lat: "0" },
	zoom = false,
}: RaceMapProps) {
	const theme = useTheme();
	const navigate = useNavigate();
	const land = useLand();

	const points = useMemo(
		() =>
			races.map((race) => ({
				type: "Feature",
				properties: {
					name: race.Circuit?.circuitName,
				},
				geometry: {
					type: "Point",
					coordinates: [
						race.Circuit?.Location?.long,
						race.Circuit?.Location?.lat,
					],
				},
				race,
				id: race.round,
			})),
		[races]
	);

	if (!land) {
		return null;
	}

	return (
		<Box sx={{ height, width }} aria-hidden>
			<ResponsiveGeoMap
				features={[land, ...points]}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				projectionType="equirectangular"
				projectionTranslation={[0.5, (Number(centerOn?.lat) / 90) * 0.5 + 0.5]}
				projectionRotation={[Number(centerOn?.long) * -1, 0, 0]}
				projectionScale={zoom ? 400 : 100}
				borderWidth={0.5}
				borderColor={theme.palette.primary.main}
				tooltip={Tooltip}
				fillColor={(feature) => {
					return feature?.geometry?.type === "Point" ? theme.palette.secondary.main : alpha(theme.palette.primary.light, 0.25);
				}}
				onClick={(feature) => {
					if (feature?.geometry?.type === "Point") {
						navigate(`/race/${season}/${feature.race.round}`); return;
					}
				}}
			/>
		</Box>
	);
}
