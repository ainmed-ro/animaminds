import { supabase } from "@/lib/supabase";

export type OnlineLiveRegistration = {
  id: string;
  programme: string;
  format: string;
  price: number;
  duration: number;
  cpd: number;
  dates: string;
  name: string;
  email: string;
  phone: string;
  institution?: string;
  role?: string;
  gdprConsent: boolean;
  calendarConfirmation: boolean;
  status: "INTERESAT" | "ÎNSCRIS" | "CONFIRMAT" | "ANULAT";
  paymentStatus: "NEACHITAT" | "AVANS PLĂTIT" | "ACHITAT INTEGRAL";
  createdAt: string;
};

type DbRow = {
  id: string;
  programme: string;
  format: string;
  price: number;
  duration: number;
  cpd: number;
  dates: string;
  name: string;
  email: string;
  phone: string;
  institution?: string;
  role?: string;
  gdpr_consent: boolean;
  calendar_confirmation: boolean;
  status: string;
  payment_status: string;
  created_at: string;
};

function toOnlineLiveRegistration(row: DbRow): OnlineLiveRegistration {
  return {
    id: row.id,
    programme: row.programme,
    format: row.format,
    price: row.price,
    duration: row.duration,
    cpd: row.cpd,
    dates: row.dates,
    name: row.name,
    email: row.email,
    phone: row.phone,
    institution: row.institution,
    role: row.role,
    gdprConsent: row.gdpr_consent,
    calendarConfirmation: row.calendar_confirmation,
    status: row.status as OnlineLiveRegistration["status"],
    paymentStatus: (row.payment_status as OnlineLiveRegistration["paymentStatus"]) ?? "NEACHITAT",
    createdAt: row.created_at,
  };
}

export async function insertOnlineLiveRegistration(
  registration: Omit<OnlineLiveRegistration, "id" | "createdAt" | "status" | "paymentStatus"> & {
    status?: OnlineLiveRegistration["status"];
    paymentStatus?: OnlineLiveRegistration["paymentStatus"];
  }
): Promise<OnlineLiveRegistration> {
  console.log("insertOnlineLiveRegistration called with:", registration);
  
  if (!supabase) {
    console.error("Supabase client is null");
    throw new Error("Database not available");
  }
  
  console.log("Supabase client available, attempting insert...");
  
  const insertData = {
    programme: registration.programme,
    format: registration.format,
    price: registration.price,
    duration: registration.duration,
    cpd: registration.cpd,
    dates: registration.dates,
    name: registration.name,
    email: registration.email,
    phone: registration.phone,
    institution: registration.institution,
    role: registration.role,
    gdpr_consent: registration.gdprConsent,
    calendar_confirmation: registration.calendarConfirmation,
    status: registration.status ?? "INTERESAT",
    payment_status: registration.paymentStatus ?? "NEACHITAT",
  };
  
  console.log("Insert data prepared:", insertData);
  
  const { data, error } = await supabase
    .from("online_live_registrations")
    .insert([insertData])
    .select()
    .single();
    
  console.log("Supabase insert result:", { data, error });
  
  if (error) {
    console.error("Supabase error details:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
  }
  
  return toOnlineLiveRegistration(data as DbRow);
}

export async function getAllOnlineLiveRegistrations(): Promise<OnlineLiveRegistration[]> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  
  const { data, error } = await supabase
    .from("online_live_registrations")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return (data as DbRow[]).map(toOnlineLiveRegistration);
}
