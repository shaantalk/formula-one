import { Avatar } from "@mui/material";
import type { FlagProps } from "../../common/types";
import { useCountryFlag } from "../../hooks/useCountryFlag";
import { useImageSize } from "../../hooks/useImageSize";

export default function Flag({ nationality, size = "small" }: FlagProps) {
	const sizeSx = useImageSize(size, true);
	const flag = useCountryFlag(nationality);
	if (!nationality) {
		return null;
	}

	return (
		<Avatar
			component="span"
			variant="square"
			alt={nationality}
			sx={{
				...sizeSx,
				background: "transparent",
			}}
		>
			{flag}
		</Avatar>
	);
}
