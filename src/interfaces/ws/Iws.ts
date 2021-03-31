import * as WS from "ws";

export interface Iws extends WS {
  id: string;
  channel: string;
}
