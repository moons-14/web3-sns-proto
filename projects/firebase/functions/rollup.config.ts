import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript";
import * as path from "path";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [
    typescript(),
    alias({
      entries: {
        "@crypteen/common": path.resolve(
          __dirname,
          "../../common/dist/index.js"
        ),
      },
    }),
  ],
};
