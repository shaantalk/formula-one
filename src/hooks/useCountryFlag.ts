import flag from "emoji-flags";
import nationalities from "i18n-nationality";
import enLocale from "i18n-nationality/langs/en.json";

nationalities.registerLocale(enLocale);
// nationalities.registerLocale(require("i18n-nationality/langs/en.json"));

export const useCountryFlag = (
	nationality: string | undefined
): string | null => {
	if (!nationality) {
		return null;
	}

	const code = nationalities.getAlpha2Code(
		nationality === "Monegasque" ? "Monacan" : nationality,
		"en"
	);

	return code ? (flag as any)[code]?.emoji || null : null;
};
