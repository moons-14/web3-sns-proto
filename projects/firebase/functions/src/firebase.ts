import { initializeApp } from "firebase-admin";
import * as functions from "firebase-functions";

export const app = initializeApp();

export const auth = app.auth();

export const HttpsError = functions.https.HttpsError;
