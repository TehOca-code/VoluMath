import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join } from "path"

// Menggunakan environment variables yang sudah tersedia
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Buat client dengan service role key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

async function runMigrations() {
  try {
    console.log("Running database migrations...")

    // Baca file schema.sql
    const schemaPath = join(process.cwd(), "database", "schema.sql")
    const schemaSql = readFileSync(schemaPath, "utf-8")

    // Split SQL menjadi statements individual
    const statements = schemaSql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"))

    console.log(`Found ${statements.length} SQL statements to execute`)

    // Eksekusi setiap statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      console.log(`Executing statement ${i + 1}/${statements.length}...`)

      const { error } = await supabaseAdmin.rpc("exec_sql", {
        sql_query: statement,
      })

      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error)
        console.error("Statement:", statement)
        // Lanjutkan ke statement berikutnya
      } else {
        console.log(`✅ Statement ${i + 1} executed successfully`)
      }
    }

    console.log("✅ Database migrations completed!")
  } catch (error) {
    console.error("Error running migrations:", error)
  }
}

// Jalankan migrasi
runMigrations()
