import { recoverAuthTokenMessage } from "@crypteen/common";
import { normalize } from "@metamask/eth-sig-util";
import * as functions from "firebase-functions";
import { FUNCTION_REGION, SIGNATURE_EXPIRATION } from "../constants";
import { AuthTokenRequest } from "../types";
import { auth } from "./../firebase";

export const getAuthToken = functions
  .region(FUNCTION_REGION)
  .https.onCall(async ({ message, signature }: AuthTokenRequest) => {
    const recovered = recoverAuthTokenMessage(message, signature);
    if (normalize(message.address) !== recovered) {
      throw new Error("Signatures do not match.");
    }
    if (Date.now() - Number(message.signedAt) > SIGNATURE_EXPIRATION) {
      throw new Error("Signature have expired.");
    }
    const customToken = await auth.createCustomToken(recovered);
    return { token: customToken };
  });

export const getAuthTokenApi = functions
  .region(FUNCTION_REGION)
  .https.onRequest(async (req, res) => {
    const { message, signature } = req.body as AuthTokenRequest;
    const recovered = recoverAuthTokenMessage(message, signature);
    if (normalize(message.address) !== recovered) {
      throw new Error("Signatures do not match.");
    }
    if (Date.now() - Number(message.signedAt) > SIGNATURE_EXPIRATION) {
      throw new Error("Signature have expired.");
    }
    const customToken = await auth.createCustomToken(recovered, {});
    res.json({ token: customToken });
  });
