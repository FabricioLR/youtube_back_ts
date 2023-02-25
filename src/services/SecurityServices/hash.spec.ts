import { describe, it, expect } from "vitest"
import { hash } from "./hash"

describe("hash functions", () => {
    it("should return a hashed string", async () => {
        const hashedString = await hash("stringtohash")

        expect(hashedString).not.toBeNull()
    })
})