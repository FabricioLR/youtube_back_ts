import { describe, it, expect } from "vitest"
import { hash } from "./hash"
import { verifyPassword } from "./verifyPassword"

describe("verify password funcitons", () => {
    it("should return true if password is correct", async () => {
        const hashedPassword = await hash("password")

        const verify = await verifyPassword("password", hashedPassword)

        expect(verify).toBeTruthy()
    })

    it("should return false if password is not correct", async () => {
        const hashedPassword = await hash("password")

        const verify = await verifyPassword("otherPassword", hashedPassword)

        expect(verify).toBeFalsy()
    })
})