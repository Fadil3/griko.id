import { useEffect } from "react";

import analyticsConfig from "~config/analytics";
import { useGlobalStore } from "~store/global";

import * as Fathom from "fathom-client";

export default function useFathomEvents() {
  // track opening cheatsheet
  useEffect(() => {
    return useGlobalStore.subscribe(
      (store) => store.isCheatsheetOpen,
      (isOpen) => {
        if (isOpen) {
          Fathom.trackGoal(analyticsConfig.fathomEvents.openCheatsheet, 0);
        }
      },
    );
  }, []);

  return null;
}
