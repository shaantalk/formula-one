import { useContext, useEffect } from "react";
import { getAPIUrl, getCanonicalId } from "../api/Ergast";
import type { DriverId, Responses } from "../common/types";
import { DriverContext } from "../store/DriverProvider";
import useCachedAxios from "./useCachedAxios";

export const useDriver = (id: DriverId) => {
	const [drivers, setDrivers] = useContext(DriverContext);

	useEffect(() => {
		if (id && !drivers[id]) {
			const dataUrl = getAPIUrl(`/drivers/${id}.json`);
			useCachedAxios
				.get<Responses["DriversResponse"]>(dataUrl)
				.then((response) => {
					return response.data;
				})
				.then((data) => data.MRData?.DriverTable?.Drivers?.[0])
				.then((driver) => {
					if (driver) {
						const canonicalId = getCanonicalId(driver);
						setDrivers((current) => ({
							...current,
							[id]: {
								...driver,
								canonicalId,
							},
						}));
					}
				});
		}
	}, [id, drivers, setDrivers]);

	return id ? drivers[id] : undefined;
};
