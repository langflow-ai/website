"use client";

import styles from "./ShortcutIndicator.module.scss";

export function ShortcutIndicator({ isMac }: { isMac: boolean }) {
  return (
    <span className={`${styles.shortcutIndicator}`}>
      {isMac ? "⌘K" : "Ctrl+K"}
    </span>
  );
}
