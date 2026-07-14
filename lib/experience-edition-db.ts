import { supabase } from "@/lib/supabase";

export type ExperienceEditionRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  role?: string;
  locality?: string;
  dietaryRequirements?: string;
  programme: string;
  accommodation?: string;
  preferredPeriod?: string;
  participationType?: string;
  groupSize?: number;
  cui?: string;
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
  role?: string;
  locality?: string;
  dietary_requirements?: string;
  programme: string;
  accommodation?: string;
  preferred_period?: string;
  participation_type?: string;
  group_size?: number;
  cui?: string;
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
    role: row.role,
    locality: row.locality,
    dietaryRequirements: row.dietary_requirements,
    programme: row.programme,
    accommodation: row.accommodation,
    preferredPeriod: row.preferred_period,
    participationType: row.participation_type,
    groupSize: row.group_size,
    cui: row.cui,
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
      role: request.role,
      locality: request.locality,
      dietary_requirements: request.dietaryRequirements,
      programme: request.programme,
      accommodation: request.accommodation,
      preferred_period: request.preferredPeriod,
      participation_type: request.participationType,
      group_size: request.groupSize,
      cui: request.cui,
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
