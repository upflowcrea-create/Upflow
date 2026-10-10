import { useState } from "react";
import clsx from "clsx";
import { ASSETS, BRAND } from "../lib/config";

type Props = {
  className?: string;
  height?: number;
};

/**
 * Tries to render the real UPFLOW PNG logo (see ASSETS.md).
 * Falls back to a styled gradient wordmark until the file is provided —
 * so the site looks finished either way.
 */
export function Logo({ className, height = 34 }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={clsx("logo-wordmark", className)} style={{ fontSize: height * 0.62 }}>
        {BRAND.name}
      </span>
    );
  }

  return (
    <img
      src={ASSETS.logo}
      alt={BRAND.name}
      className={clsx("logo-img", className)}
      style={{ height }}
      onError={() => setFailed(true)}
    />
  );
}
