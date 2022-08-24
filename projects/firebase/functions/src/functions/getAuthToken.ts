import { normalize } from "@metamask/eth-sig-util";
import * as functions from "firebase-functions";
import { FUNCTION_REGION, SIGNATURE_EXPIRATION } from "../constants";
import { AuthTokenRequest } from "../types";
import { recoverAuthTokenMessage } from "../utils";
import { auth, HttpsError } from "./../firebase";

export const getAuthToken = functions
  .region(FUNCTION_REGION)
  .https.onCall(async ({ message, signature }: AuthTokenRequest) => {
    const recovered = recoverAuthTokenMessage(message, signature);
    if (normalize(message.address) !== recovered) {
      throw new HttpsError("invalid-argument", "Signature do not match.");
    }
    if (Date.now() - Number(message.signedAt) > SIGNATURE_EXPIRATION) {
      throw new HttpsError("unavailable", "Signature have expired.");
    }
    const customToken = await auth.createCustomToken(recovered);
    return { token: customToken };
  });
