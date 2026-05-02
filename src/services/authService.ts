import { supabase } from "@/lib/supabase";
import { apiRequest, AUTH_BASE_URL } from "@/services/api";

export class EmailNotConfirmedError extends Error {
  constructor(public email: string) {
    super("Email not confirmed");
    this.name = "EmailNotConfirmedError";
  }
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "employee" | "client" | "super-admin";
  agencyId: string | null;
  avatar?: string;
}

export interface ClientSignupResult {
  user: {
    id: string;
    name: string;
    email: string;
    role: "client";
  };
}

export async function signUpClient(payload: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<ClientSignupResult> {
  return apiRequest<ClientSignupResult>("/signup/client", {
    baseUrl: AUTH_BASE_URL,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    if (error?.message.includes("Email not confirmed")) {
      throw new EmailNotConfirmedError(email);
    }
    throw new Error(error?.message ?? "Invalid email or password");
  }

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
  };
}

export async function validateSession(accessToken: string): Promise<AuthUser> {
  return apiRequest<AuthUser>("/validate", {
    baseUrl: AUTH_BASE_URL,
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}

export async function forgotPassword(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
}

export async function resetPasswordWithOtp(
  email: string,
  token: string,
  password: string,
): Promise<void> {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "recovery",
  });

  if (error || !data.session) {
    throw new Error(error?.message ?? "Invalid or expired reset code");
  }

  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError) throw new Error(updateError.message);

  await supabase.auth.signOut();
}
