import { Timestamps } from "./default";

export type User = Timestamps & {
  id: number;
  email: string;
  name: string;
};
