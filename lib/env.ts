// Validasi environment variables
export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  POSTGRES_URL: process.env.POSTGRES_URL!,
} as const

// Validasi bahwa semua environment variables ada
function validateEnv() {
  const missing = Object.entries(env)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`)
  }
}

validateEnv()
