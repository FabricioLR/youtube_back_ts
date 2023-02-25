import { NextFunction, Request, Response, Send } from "express"
import { describe, it, expect, vi } from "vitest"
import { createTokenMock } from "./createToken"
import { VerifyTokenMock } from "./verifyToken"

describe("verify token function if success", () => {
    const setup = () => {
        const secret = "secret"
        var responseSendBody= {}

        const sendFunction = vi.fn().mockImplementation((result) => {
            responseSendBody = result
        })
        const nextFunction = vi.fn().mockImplementation((result) => {})

        const request = {
            headers: {
                token: createTokenMock("testid", secret)
            } as any
        } as Request

        const response = {
            status: (code: number) => {
                const send: Send = sendFunction

                return {
                    send
                }
            },
            locals: {}
        } as Response

        const next: NextFunction = nextFunction

        VerifyTokenMock(request, response, next, secret)

        return {
            request, response, next, responseSendBody, sendFunction, nextFunction
        }
    }

    it("should not return any error", async () => {
        const { response, responseSendBody, sendFunction, nextFunction } = setup()

        expect(response.locals).not.toBeNull()
        expect(responseSendBody).not.toHaveProperty("error")
        expect(sendFunction).toBeCalledTimes(0)
        expect(nextFunction).toBeCalledTimes(1)
    })
})

describe("verify token function if failure", () => {
    const setup = () => {
        const secret = "secret"
        var responseSendBody= {}

        const sendFunction = vi.fn().mockImplementation((result) => {
            responseSendBody = result
        })
        const nextFunction = vi.fn().mockImplementation((result) => {})

        const request = {
            headers: {
                token: createTokenMock("testid", "othersecret")
            } as any
        } as Request

        const response = {
            status: (code: number) => {
                const send: Send = sendFunction

                return {
                    send
                }
            },
            locals: {}
        } as Response

        const next: NextFunction = nextFunction

        VerifyTokenMock(request, response, next, secret)

        return {
            request, response, next, responseSendBody, sendFunction, nextFunction
        }
    }

    it("should not return any error", async () => {
        const { responseSendBody, sendFunction, nextFunction } = setup()

        expect(responseSendBody).toHaveProperty("error", "invalid token")
        expect(sendFunction).toBeCalledTimes(1)
        expect(nextFunction).toBeCalledTimes(0)
    })
})