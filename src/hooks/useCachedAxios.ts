import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

type Cache<T> = {
	timestamp: number;
	response: AxiosResponse<T>;
};

type Caches = {
	[url: string]: {
		[key: string]: Cache<any>;
	};
};

const CACHE_KEY = "cached-axios-results";

function getCache(): Caches {
	return (JSON.parse(localStorage.getItem(CACHE_KEY) || "{}") as Caches) ?? {};
}

function setCache(caches: Caches): void {
	localStorage.setItem(CACHE_KEY, JSON.stringify(caches));
}

function clearExpiredCache(caches: Caches, cacheFor: number): void {
	const now = Math.floor(Date.now() / 1000);

	for (const url in caches) {
		for (const configKey in caches[url] ?? {}) {
			if (Number(caches[url]?.[configKey]?.timestamp ?? 0 + cacheFor) <= now) {
				delete caches[url]?.[configKey];
			}
		}
		if (Object.keys(caches[url] ?? {}).length === 0) {
			delete caches[url];
		}
	}

	setCache(caches);
}

async function get<T = any, D = any>(
	url: string,
	config: AxiosRequestConfig<D> = { params: { limit: 500 } },
	cacheFor: number = 24 * 60 * 60
): Promise<AxiosResponse<T>> {
	const now = Math.floor(Date.now() / 1000);
	const caches: Caches = getCache();
	const configKey = btoa(JSON.stringify(config || {}));

	const cachedResponse = caches?.[url]?.[configKey];
	if (cachedResponse && Number(cachedResponse.timestamp + cacheFor) > now) {
		return cachedResponse.response;
	}

	try {
		const response = await axios.get<T, AxiosResponse<T>, D>(url, config);
		const updatedCaches: Caches = {
			...caches,
			[url]: {
				...caches[url],
				[configKey]: {
					timestamp: Date.now(),
					response,
				},
			},
		};

		clearExpiredCache(updatedCaches, cacheFor);
		setCache(updatedCaches);

		return response;
	} catch (error) {
		// Handle error appropriately, rethrow or return a default value
		return Promise.reject(error);
	}
}

const useCachedAxios = {
	get,
};

export default useCachedAxios;
