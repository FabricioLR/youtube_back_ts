import { describe, it, expect } from "vitest"
import { createTokenMock } from "./createToken"

describe("create token functions", () => {
    it("should return a token", async () => {
        const token = createTokenMock("testid", "çalskdfklasdfasdf")

        expect(token).not.toBeNull()
    })
})