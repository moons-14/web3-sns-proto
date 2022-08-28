import clsx from "clsx";

import { useTheme } from "@/states/theme";

export const ThemeBox: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { transparent?: boolean }
> = ({ className, transparent, ...props }) => {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(transparent && "bg-transparent", className)}
      {...props}
      data-theme={theme}
    />
  );
};
