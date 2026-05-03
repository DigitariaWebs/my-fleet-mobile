import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { PublicAgency } from "@/services/agencyService";

interface AgencyState {
  paired: PublicAgency | null;
  pairedAt: string | null;
}

interface AgencyActions {
  pair: (agency: PublicAgency) => void;
  unpair: () => void;
}

type AgencyStore = AgencyState & AgencyActions;

export const useAgencyStore = create<AgencyStore>()(
  persist(
    (set) => ({
      paired: null,
      pairedAt: null,

      pair: (agency) =>
        set({ paired: agency, pairedAt: new Date().toISOString() }),

      unpair: () => set({ paired: null, pairedAt: null }),
    }),
    {
      name: "my-fleet-client-agency",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
