// ================================================
//   Local Type Definitions
// ================================================

export interface DataLayerMessage {
  event: string;
  [key: string]: unknown;
}

export type DataLayer = DataLayerMessage[];
