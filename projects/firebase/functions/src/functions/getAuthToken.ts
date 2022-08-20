import * as functions from "firebase-functions";
import { AuthTokenRequest } from "../types";

export const getAuthToken = functions.https.onCall(
  (data: AuthTokenRequest) => {}
);
