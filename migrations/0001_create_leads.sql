-- Optional D1 lead storage for Upper Cumberland Well Pump.
-- Apply with:  npx wrangler d1 migrations apply ucwp-leads
-- Stores only what is needed to route a request. Uploaded photos live in
-- R2 (private bucket); this table stores object references only.

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,                  -- lead reference (UCWP-YYMMDD-XXXXX)
  created_at TEXT NOT NULL,             -- ISO 8601 timestamp
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city_or_county TEXT NOT NULL,
  property_location TEXT,
  property_type TEXT,
  service_needed TEXT NOT NULL,
  water_situation TEXT NOT NULL,
  problem_started TEXT,
  urgency TEXT,
  pump_type TEXT,
  pump_running TEXT,
  breaker_status TEXT,
  pressure_reading TEXT,
  tank_symptoms TEXT,
  water_quality_changes TEXT,
  preferred_contact_time TEXT,
  additional_details TEXT NOT NULL,
  upload_references TEXT,               -- JSON array of R2 object keys
  source_page TEXT,
  consent_recorded_at TEXT NOT NULL,
  lead_status TEXT NOT NULL DEFAULT 'new'  -- new | contacted | referred | closed | test
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (lead_status);
