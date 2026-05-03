import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getPublicAgency } from "@/services/agencyService";
import { useAgencyStore } from "@/stores/useAgencyStore";
import { fleetKeys } from "./useAgencyFleet";

export const pairingKeys = {
  all: ["pairing"] as const,
};

export function usePairWithAgency() {
  const pair = useAgencyStore((s) => s.pair);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idOrSlug: string) => getPublicAgency(idOrSlug),
    onSuccess: (agency) => {
      pair(agency);
      queryClient.invalidateQueries({ queryKey: fleetKeys.all });
    },
  });
}
