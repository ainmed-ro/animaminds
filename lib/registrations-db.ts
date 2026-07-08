import { supabase } from "@/lib/supabase";

export type RegistrationStatus = "Nou" | "Confirmat" | "Achitat" | "Anulat";

export type Registration = {
  id: string;
  experience: string;
  editie: string;
  nume: string;
  email: string;
  telefon: string;
  participanti: number;
  observatii: string;
  status: RegistrationStatus;
  createdAt: string;
};

type DbRow = {
  id: string;
  experience: string;
  editie: string;
  nume: string;
  email: string;
  telefon: string;
  participanti: number;
  observatii: string;
  status: string;
  created_at: string;
};

function toRegistration(row: DbRow): Registration {
  return {
    id: row.id,
    experience: row.experience,
    editie: row.editie,
    nume: row.nume,
    email: row.email,
    telefon: row.telefon,
    participanti: row.participanti,
    observatii: row.observatii ?? "",
    status: row.status as RegistrationStatus,
    createdAt: row.created_at,
  };
}

export async function readAll(): Promise<Registration[]> {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as DbRow[]).map(toRegistration);
}

export async function insert(
  reg: Omit<Registration, "id" | "createdAt" | "status">
): Promise<Registration> {
  const id = `reg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const { data, error } = await supabase
    .from("registrations")
    .insert([{ id, experience: reg.experience, editie: reg.editie, nume: reg.nume, email: reg.email, telefon: reg.telefon, participanti: reg.participanti, observatii: reg.observatii ?? "", status: "Nou" }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toRegistration(data as DbRow);
}

export async function updateStatus(
  id: string,
  status: RegistrationStatus
): Promise<Registration | null> {
  const { data, error } = await supabase
    .from("registrations")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) return null;
  return toRegistration(data as DbRow);
}

export async function getSpotsByEdition(): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("registrations")
    .select("editie, participanti, status")
    .neq("status", "Anulat");
  if (error) throw new Error(error.message);
  const counts: Record<string, number> = {};
  for (const r of data as { editie: string; participanti: number }[]) {
    counts[r.editie] = (counts[r.editie] ?? 0) + r.participanti;
  }
  return counts;
}
