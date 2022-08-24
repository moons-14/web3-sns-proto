import { ComponentType, lazy } from "react";

export function lazyImport<
  T extends ComponentType<unknown>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, names: K[]): I {
  return Object.assign(
    {},
    ...names.map((name) => ({
      [name]: lazy(() =>
        factory().then((module) => ({ default: module[name] }))
      ),
    }))
  ) as I;
}
