import { DataLayer } from "@models/locals";

// Assign a mock window with proper type
Object.assign(globalThis, {
  window: {
    dataLayer: [] as DataLayer,
  },
});
