import { supabase } from "@/lib/supabase";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  programInteres: string;
  subject: string;
  message: string;
  created_at: string;
};

type DbRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  program_interes: string;
  subject: string;
  message: string;
  created_at: string;
};

function toContactMessage(row: DbRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    organization: row.organization ?? "",
    programInteres: row.program_interes ?? "",
    subject: row.subject,
    message: row.message,
    created_at: row.created_at,
  };
}

export async function insertContactMessage(
  message: Omit<ContactMessage, "id" | "created_at">
): Promise<ContactMessage> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const { data, error } = await supabase
    .from("contact_messages")
    .insert([{ 
      id, 
      name: message.name, 
      email: message.email, 
      phone: message.phone, 
      organization: message.organization ?? "",
      program_interes: message.programInteres ?? "",
      subject: message.subject, 
      message: message.message
    }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toContactMessage(data as DbRow);
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as DbRow[]).map(toContactMessage);
}
