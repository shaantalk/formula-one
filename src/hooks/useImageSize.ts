import type { SxProps } from "@mui/material";
import { useTheme } from "@mui/material";
import type { ImageSize } from "../common/types";

export const useImageSize = (
	size: ImageSize,
	includeFontSize: boolean = false
): SxProps => {
	const theme = useTheme();

	const sizeMapping = {
		small: theme.spacing(4),
		medium: theme.spacing(8),
		large: theme.spacing(16),
	};

	const calculatedSize =
		sizeMapping[size as keyof typeof sizeMapping] ||
		(typeof size === "number" ? size : undefined);

	if (calculatedSize !== undefined) {
		return includeFontSize
			? {
					width: calculatedSize,
					height: calculatedSize,
					fontSize: calculatedSize,
				}
			: { width: calculatedSize, height: calculatedSize };
	}

	return { width: "100%", height: "100%" };
};
