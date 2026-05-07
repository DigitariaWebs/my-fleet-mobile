import { apiRequest } from "@/services/api";
import { getAuthHeader } from "@/services/authHeader";

export interface ClientProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  idType: "passport" | "national-id" | "driving-license" | "";
  idNumber: string;
  driverLicense: string;
  driverLicenseExpiry: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  idType?: "passport" | "national-id" | "driving-license";
  idNumber?: string;
  driverLicense?: string;
  driverLicenseExpiry?: string;
}

export async function getProfile(): Promise<ClientProfile> {
  const headers = await getAuthHeader();
  return apiRequest<ClientProfile>("/client/profile", {
    method: "GET",
    headers,
  });
}

export async function updateProfile(
  patch: UpdateProfilePayload,
): Promise<ClientProfile> {
  const headers = await getAuthHeader();
  return apiRequest<ClientProfile>("/client/profile", {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
}

export interface PairResult {
  id: string;
  alreadyPaired: boolean;
}

export interface ProfileIncompleteError {
  code: "PROFILE_INCOMPLETE";
  missingFields: string[];
}

// Calls the new pair endpoint. Returns PairResult on success, or throws
// with code="PROFILE_INCOMPLETE" + missingFields on 422.
export async function pairWithAgency(agencyId: string): Promise<PairResult> {
  const headers = await getAuthHeader();
  return apiRequest<PairResult>(
    `/client/agencies/${encodeURIComponent(agencyId)}/pair`,
    {
      method: "POST",
      headers,
    },
  );
}
