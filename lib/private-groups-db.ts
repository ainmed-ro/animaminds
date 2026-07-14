import { supabase } from "@/lib/supabase";

export type PrivateGroupRequest = {
  id: string;
  requesterName: string;
  email: string;
  phone: string;
  programmeRequested: string;
  estimatedGroupSize: number;
  message: string;
  requestType: "Private Group";
  status: "PRIMITĂ" | "ÎN PROCESARE" | "CONFIRMATĂ" | "ANULATĂ";
  createdAt: string;
};

type DbRow = {
  id: string;
  requester_name: string;
  email: string;
  phone: string;
  programme_requested: string;
  estimated_group_size: number;
  message: string;
  request_type: string;
  status: string;
  created_at: string;
};

function toPrivateGroupRequest(row: DbRow): PrivateGroupRequest {
  return {
    id: row.id,
    requesterName: row.requester_name,
    email: row.email,
    phone: row.phone,
    programmeRequested: row.programme_requested,
    estimatedGroupSize: row.estimated_group_size,
    message: row.message,
    requestType: row.request_type as PrivateGroupRequest["requestType"],
    status: row.status as PrivateGroupRequest["status"],
    createdAt: row.created_at,
  };
}

export async function insertPrivateGroupRequest(
  request: Omit<PrivateGroupRequest, "id" | "createdAt" | "status">
): Promise<PrivateGroupRequest> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  
  const id = `pg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const { data, error } = await supabase
    .from("private_group_requests")
    .insert([{
      id,
      requester_name: request.requesterName,
      email: request.email,
      phone: request.phone,
      programme_requested: request.programmeRequested,
      estimated_group_size: request.estimatedGroupSize,
      message: request.message,
      request_type: request.requestType,
      status: "PRIMITĂ",
    }])
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return toPrivateGroupRequest(data as DbRow);
}

export async function getAllPrivateGroupRequests(): Promise<PrivateGroupRequest[]> {
  if (!supabase) {
    throw new Error("Database not available");
  }
  
  const { data, error } = await supabase
    .from("private_group_requests")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return (data as DbRow[]).map(toPrivateGroupRequest);
}
