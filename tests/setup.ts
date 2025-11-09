import { DataLayer } from "@models";

// Assign a mock window with proper type
Object.assign(globalThis, {
  window: {
    dataLayer: [] as DataLayer,
  },
});
