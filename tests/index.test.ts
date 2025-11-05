import { describe, it, expect, vi, beforeEach } from "vitest";

import { dataLayerPush } from "@helpers/dataLayer.js";

describe("pixel script", () => {
	it("should pass this dummy test", () => {
		expect(true).toBe(true);
	});
});

describe("dataLayerPush", () => {
	beforeEach(() => {
		// reset global mock
		(globalThis as any).window = { dataLayer: [] };
		vi.spyOn(console, "log").mockImplementation(() => { });
	});

	it("pushes an event to window.dataLayer", () => {
		const message = { event: "test_event", value: 42 };
		dataLayerPush(message);

		expect(window.dataLayer.length).toBe(1);
		expect(window.dataLayer[0]).toEqual(message);
	});

	it("logs output when config.pixel.logging is enabled", () => {
		const message = { event: "log_event" };
		dataLayerPush(message);

		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining("Custom Pixel")
		);
	});
});

