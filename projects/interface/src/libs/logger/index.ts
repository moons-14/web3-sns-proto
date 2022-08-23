import { logEvent } from "firebase/analytics";

import { analytics } from "../firebase";

export const logger = (
  name: string,
  param?: {
    [key: string]: any;
  }
) => logEvent(analytics, name, param);
