import { supabase } from "@/lib/supabase";

export type ExperienceEditionRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  programme: string;
  accommodation?: string;
  preferredPeriod?: string;
  message?: string;
  status: "PRIMITĂ" | "ÎN PROCESARE" | "CONFIRMATĂ" | "ANULATĂ";
  createdAt: string;
};

type DbRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  programme: string;
  accommodation?: string;
  preferred_period?: string;
  message?: string;
  status: string;
  created_at: string;
};

function toExperienceEditionRequest(row: DbRow): ExperienceEditionRequest {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    programme: row.programme,
    accommodation: row.accommodation,
    preferredPeriod: row.preferred_period,
    message: row.message,
    status: row.status as ExperienceEditionRequest["status"],
    createdAt: row.created_at,
  };
}

export async function insertExperienceEditionRequest(
  request: Omit<ExperienceEditionRequest, "id" | "createdAt" | "status">
): Promise<ExperienceEditionRequest> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  
  const { data, error } = await supabase
    .from("experience_edition_requests")
    .insert([{
      name: request.name,
      email: request.email,
      phone: request.phone,
      company: request.company,
      programme: request.programme,
      accommodation: request.accommodation,
      preferred_period: request.preferredPeriod,
      message: request.message,
      status: "INTERESAT",
    }])
    .select()
    .single();
    
  if (error) throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
  return toExperienceEditionRequest(data as DbRow);
}

export async function getAllExperienceEditionRequests(): Promise<ExperienceEditionRequest[]> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  
  const { data, error } = await supabase
    .from("experience_edition_requests")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return (data as DbRow[]).map(toExperienceEditionRequest);
}
