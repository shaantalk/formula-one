import { useState, useEffect } from "react";
import { feature } from "topojson-client";

export const useLand = () => {
	const [landFeature, setLandFeature] = useState(null);

	useEffect(() => {
		const loadLand = async () => {
			const land = await import("world-atlas/land-110m.json");
			const geoJSON = feature(land, land.objects.land);
			const featureLand = geoJSON.features[0];
			featureLand.id = "land";
			setLandFeature(featureLand);
		};

		loadLand();
	}, []);

	return landFeature;
};
