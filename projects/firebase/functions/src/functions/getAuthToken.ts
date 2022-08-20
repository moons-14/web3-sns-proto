import {
  createAuthTokenMessageParam,
  recoverAuthTokenMessage,
} from "@crypteen/common";
import {
  normalize,
  signTypedData,
  SignTypedDataVersion,
} from "@metamask/eth-sig-util";
import * as functions from "firebase-functions";
import { FUNCTION_REGION, SIGNATURE_EXPIRATION } from "../constants";
import { AuthTokenRequest } from "../types";
import { auth } from "./../firebase";

export const testSign = functions
  .region(FUNCTION_REGION)
  .https.onRequest((req, res) => {
    const msg = {
      address: "0xcdFDd3F515Ac5Aea36bD21453d59a8804764141F",
      signedAt: Date.now().toString(),
    };
    const typed = createAuthTokenMessageParam(msg);
    const signature = signTypedData({
      privateKey: Buffer.from(
        "3186277f1c2f63dfb6a0d198594baac753d589cf6bf3b908c5c2a1d9785467e0",
        "hex"
      ),
      data: typed,
      version: SignTypedDataVersion.V4,
    });
    res.json({ message: msg, signature });
  });

export const getAuthToken = functions
  .region(FUNCTION_REGION)
  .https.onCall(async ({ message, signature }: AuthTokenRequest) => {
    const recovered = recoverAuthTokenMessage(message, signature);
    if (normalize(message.address) !== recovered)
      throw new Error("Signatures do not match.");
    if (Date.now() - Number(message.signedAt) > SIGNATURE_EXPIRATION)
      throw new Error("Signature have expired.");

    const userRecord = await auth.createUser({ uid: message.address });
    console.log(userRecord);
    return userRecord;
  });

export const getAuthTokenApi = functions
  .region(FUNCTION_REGION)
  .https.onRequest(async (req, res) => {
    const { message, signature } = req.body as AuthTokenRequest;
    const recovered = recoverAuthTokenMessage(message, signature);
    console.log(normalize(message.address));
    if (normalize(message.address) !== recovered)
      throw new Error("Signatures do not match.");
    if (Date.now() - Number(message.signedAt) > SIGNATURE_EXPIRATION)
      throw new Error("Signature have expired.");
    const customToken = await auth.createCustomToken(recovered);
    console.log(customToken);
    res.json(customToken);
  });
