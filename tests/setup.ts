import { vi } from "vitest";

(globalThis as any).window = { dataLayer: [] };
(globalThis as any).analytics = { subscribe: vi.fn() };
(globalThis as any).init = { data: { shop: { name: "Demo Shop" } } };

