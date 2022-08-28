import { useRecoilState } from "recoil";

import { themeState } from "./atom";
export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  return { theme, setTheme };
};
