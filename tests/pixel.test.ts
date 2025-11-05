import { describe, it, expect, beforeAll } from "vitest";

describe("pixel script", () => {
	beforeAll(async () => {
		// Vitest will have jsdom ready here
		await import("../src/pixel");
	});

	it("should pass this dummy test", () => {
		expect(true).toBe(true);
	});
});

