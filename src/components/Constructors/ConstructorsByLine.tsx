import type { ConstructorByLineProps } from "../../common/types";
import { useConstructor } from "../../hooks/useConstructors";
import Link from "../Link";

export default function ByLine({
	id,
	variant = "full",
}: ConstructorByLineProps) {
	const constructor = useConstructor(id);

	if (!constructor) {
		return null;
	}

	const { constructorId, name } = constructor;

	switch (variant) {
		case "name": {
			return <>{name}</>;
		}

		case "full": {
			return <Link to={`/constructor/${constructorId}`}>{name}</Link>;
		}
	}

	return null;
}
