
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// PostgreSQL configuration
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Connect to PostgreSQL
pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

// Export the Supabase client and PostgreSQL pool
module.exports = {
  supabase,
  pool,
};

