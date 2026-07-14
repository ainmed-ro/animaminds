import { supabase } from "@/lib/supabase";

export type OrganizationRequestStatus = "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type OrganizationRequest = {
  id: string;
  organizationName: string;
  organizationType: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  contactPosition?: string;
  programmeInterest?: string;
  deliveryFormatPreference?: string;
  participantCountEstimate?: number;
  preferredTimeline?: string;
  budgetRange?: string;
  specificRequirements?: string;
  createdAt: string;
  updatedAt: string;
  status: OrganizationRequestStatus;
};

type DbRow = {
  id: string;
  organization_name: string;
  organization_type: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  contact_position?: string;
  programme_interest?: string;
  delivery_format_preference?: string;
  participant_count_estimate?: number;
  preferred_timeline?: string;
  budget_range?: string;
  specific_requirements?: string;
  created_at: string;
  updated_at: string;
  status: string;
};

function toOrganizationRequest(row: DbRow): OrganizationRequest {
  return {
    id: row.id,
    organizationName: row.organization_name,
    organizationType: row.organization_type,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone ?? "",
    contactPosition: row.contact_position ?? "",
    programmeInterest: row.programme_interest ?? "",
    deliveryFormatPreference: row.delivery_format_preference ?? "",
    participantCountEstimate: row.participant_count_estimate ?? 0,
    preferredTimeline: row.preferred_timeline ?? "",
    budgetRange: row.budget_range ?? "",
    specificRequirements: row.specific_requirements ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status as OrganizationRequestStatus,
  };
}

export async function insertOrganizationRequest(
  request: Omit<OrganizationRequest, "id" | "createdAt" | "updatedAt" | "status">
): Promise<OrganizationRequest> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  
  const { data, error } = await supabase
    .from("organization_requests")
    .insert([{
      organization_name: request.organizationName,
      organization_type: request.organizationType,
      contact_name: request.contactName,
      contact_email: request.contactEmail,
      contact_phone: request.contactPhone ?? "",
      contact_position: request.contactPosition ?? "",
      programme_interest: request.programmeInterest ?? "",
      delivery_format_preference: request.deliveryFormatPreference ?? "",
      participant_count_estimate: request.participantCountEstimate ?? 0,
      preferred_timeline: request.preferredTimeline ?? "",
      budget_range: request.budgetRange ?? "",
      specific_requirements: request.specificRequirements ?? "",
      status: "PRIMITĂ",
    }])
    .select()
    .single();
    
  if (error) throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
  return toOrganizationRequest(data as DbRow);
}

export async function getAllOrganizationRequests(): Promise<OrganizationRequest[]> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  
  const { data, error } = await supabase
    .from("organization_requests")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return (data as DbRow[]).map(toOrganizationRequest);
}

export async function updateOrganizationRequestStatus(
  id: string,
  status: OrganizationRequestStatus
): Promise<OrganizationRequest | null> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  
  const { data, error } = await supabase
    .from("organization_requests")
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();
    
  if (error) return null;
  return toOrganizationRequest(data as DbRow);
}
