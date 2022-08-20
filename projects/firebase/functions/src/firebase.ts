import { initializeApp } from "firebase-admin";

export const app = initializeApp();

export const auth = app.auth();
