import type {Immutable} from "@monorepo-private/ts--types";
import type {DigitalHoardingMemeplex} from "@digital-hoarder/model";

export interface BaseProps {
	memeplex: Immutable<DigitalHoardingMemeplex>

	_debug?: boolean
}
