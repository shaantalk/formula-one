import { Box, Skeleton, useMediaQuery } from "@mui/material";
import { ResponsiveBump } from "@nivo/bump";
import { useEffect, useState } from "react";
import useCachedAxios from "../../hooks/useCachedAxios";
import { getAPIUrl, mapSchedule } from "../../api/Ergast";
import { useDriversStandingsChartData } from "../../hooks/useDriversStandingsChartData";
import { useAppState } from "../../hooks/useAppState";
import type { Race } from "../../common/types";
import DriversByLine from "../Drivers/DriversByLine";
import { useCustomTheme } from "../../hooks/useCustomTheme";

export default function DriversStandingsChart() {
	const theme = useCustomTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
	const height = isMdUp ? 600 : 500;
	const [{ season }] = useAppState();
	const [races, setRaces] = useState<Array<Race>>([]);
	const data = useDriversStandingsChartData(races);

	useEffect(() => {
		const dataUrl = getAPIUrl(`/${season}/results.json`);
		useCachedAxios
			.get(dataUrl)
			.then(mapSchedule)
			.then((races) => { setRaces(races); });
	}, [season]);

	if (!data) {
		return <Skeleton variant="rectangular" height={height} />;
	}

	if (data.length === 0) {
		return null;
	}

	return (
		<Box
			height={height}
			width="100%"
			sx={{ boxSizing: "border-box" }}
			aria-hidden
		>
			<ResponsiveBump
				interpolation="smooth"
				xPadding={0.7}
				data={data}
				colors={({ color }) => color || "transparent"}
				lineWidth={2}
				activeLineWidth={6}
				inactiveLineWidth={3}
				inactiveOpacity={0.35}
				pointSize={3}
				activePointSize={16}
				inactivePointSize={0}
				pointBorderWidth={0}
				// pointBorderColor={{ from: "serie.color" }}
				activePointBorderWidth={0}
				// @ts-ignore
				startLabel={({ id }) => (
					<DriversByLine variant={isMdUp ? "name" : "code"} id={id} />
				)}
				endLabel={false}
				enableGridX={false}
				enableGridY={false}
				axisTop={null}
				axisLeft={null}
				axisBottom={null}
				axisRight={{
					tickSize: 0,
					tickPadding: 10,
					tickRotation: 0,
				}}
				margin={{ top: 0, right: 44, bottom: 24, left: isMdUp ? 100 : 60 }}
				tooltip={() => <></>}
			/>
		</Box>
	);
}
