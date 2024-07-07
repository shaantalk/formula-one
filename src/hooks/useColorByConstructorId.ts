import { rgbToHex } from "@mui/system";
import { constructors, constructorsWithNoColor } from "../common/contants";

export const useColorByConstructorId = (id?: string) => {
	const constructor = constructors.find((c) => c.constructorId === id);

	if (!constructor) {
		return "#EEEEEE";
	}

	if (constructor.color) {
		return constructor.color;
	}

	const index =
		constructorsWithNoColor.findIndex((c) => c.constructorId === id) + 1;
	const color = Math.floor(0 + (index / constructorsWithNoColor.length) * 128);

	return rgbToHex(`rgb(${color},${color},${color})`);
};
