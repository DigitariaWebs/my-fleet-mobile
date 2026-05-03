import { useQuery } from "@tanstack/react-query";

import { getPublicVehicle, listPublicVehicles } from "@/services/agencyService";

export const fleetKeys = {
  all: ["fleet"] as const,
  byAgency: (agencyId: string) => [...fleetKeys.all, agencyId] as const,
  vehicle: (agencyId: string, id: string) =>
    [...fleetKeys.byAgency(agencyId), "vehicle", id] as const,
  disabledList: ["fleet", "__disabled_list__"] as const,
  disabledVehicle: ["fleet", "__disabled_vehicle__"] as const,
};

export function useAgencyFleet(agencyId: string | null) {
  return useQuery({
    queryKey: agencyId ? fleetKeys.byAgency(agencyId) : fleetKeys.disabledList,
    queryFn: () => {
      if (!agencyId) throw new Error("useAgencyFleet: agencyId required");
      return listPublicVehicles(agencyId);
    },
    enabled: !!agencyId,
  });
}

export function useVehicleDetail(id: string | null, agencyId: string | null) {
  return useQuery({
    queryKey:
      id && agencyId
        ? fleetKeys.vehicle(agencyId, id)
        : fleetKeys.disabledVehicle,
    queryFn: () => {
      if (!id || !agencyId)
        throw new Error("useVehicleDetail: id and agencyId required");
      return getPublicVehicle(id, agencyId);
    },
    enabled: !!id && !!agencyId,
  });
}
