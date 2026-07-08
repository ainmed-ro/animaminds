import { supabase } from "@/lib/supabase";

export type RegistrationStatus = "INTERESAT" | "ÎNSCRIS" | "CONFIRMAT" | "ANULAT";
export type PaymentStatus = "NEACHITAT" | "AVANS PLĂTIT" | "ACHITAT INTEGRAL";

export type Registration = {
  id: string;
  experience: string; // Program
  editie: string;
  nume: string;
  email: string;
  telefon: string;
  participanti: number;
  observatii: string;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
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
  payment_status: string;
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
    paymentStatus: (row.payment_status as PaymentStatus) ?? "NEACHITAT",
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
  reg: Omit<Registration, "id" | "createdAt" | "status" | "paymentStatus"> & {
    status?: RegistrationStatus;
    paymentStatus?: PaymentStatus;
  }
): Promise<Registration> {
  const id = `reg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const { data, error } = await supabase
    .from("registrations")
    .insert([{
      id,
      experience: reg.experience,
      editie: reg.editie,
      nume: reg.nume,
      email: reg.email,
      telefon: reg.telefon,
      participanti: reg.participanti,
      observatii: reg.observatii ?? "",
      status: reg.status ?? "INTERESAT",
      payment_status: reg.paymentStatus ?? "NEACHITAT",
    }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toRegistration(data as DbRow);
}

export async function updateStatus(
  id: string,
  updates: { status?: RegistrationStatus; paymentStatus?: PaymentStatus }
): Promise<Registration | null> {
  const dbUpdates: Record<string, string> = {};
  if (updates.status) dbUpdates.status = updates.status;
  if (updates.paymentStatus) dbUpdates.payment_status = updates.paymentStatus;
  if (Object.keys(dbUpdates).length === 0) return null;

  const { data, error } = await supabase
    .from("registrations")
    .update(dbUpdates)
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
    .neq("status", "ANULAT");
  if (error) throw new Error(error.message);
  const counts: Record<string, number> = {};
  for (const r of data as { editie: string; participanti: number }[]) {
    counts[r.editie] = (counts[r.editie] ?? 0) + r.participanti;
  }
  return counts;
}
