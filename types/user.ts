export type UserRole = "user" | "admin"

export type UserStatus = "pending" | "approved" | "rejected"

export interface UserProfile {
  id: string
  user_id: string
  full_name: string
  phone: string
  role: UserRole
  status: UserStatus
  created_at: string
  updated_at: string
}
