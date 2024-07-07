import { useContext, useEffect } from "react";
import { getAPIUrl, getCanonicalId } from "../api/Ergast";
import type { ConstructorId, Responses } from "../common/types";
import useCachedAxios from "./useCachedAxios";
import { ConstructorContext } from "../store/ConstructorProvider";

export const useConstructor = (id: ConstructorId) => {
	const [constructors, setConstructors] = useContext(ConstructorContext);

	useEffect(() => {
		if (id && !constructors[id]) {
			const dataUrl = getAPIUrl(`/constructors/${id}.json`);
			useCachedAxios
				.get<Responses["ConstructorsByYearResponse"]>(dataUrl)
				.then((response) => response.data)
				.then((data) => data.MRData?.ConstructorTable?.Constructors?.[0])
				.then(async (constructor) => {
					if (constructor) {
						const canonicalId = getCanonicalId(constructor);
						setConstructors((current) => ({
							...current,
							[id]: {
								...constructor,
								canonicalId,
							},
						}));
					}
				});
		}
	}, [id, constructors, setConstructors]);

	return id ? constructors[id] : undefined;
};
