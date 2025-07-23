import { Enum } from 'typescript-string-enums'

/////////////////////////////////////////////////

export const Status = Enum("RUNNING", "STOPPED");
export type Status = Enum<typeof Status>;
