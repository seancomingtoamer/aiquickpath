$key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsaGZla3J1d3dzYm5vYXh1aW9rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTE5MDMwMSwiZXhwIjoyMDg2NzY2MzAxfQ.rPzKB3FKOpg5q630bSNHbG9qv7igEQYilo0wAqGoYBs'
$base = 'https://ilhfekruwwsbnoaxuiok.supabase.co'
$headers = @{
  apikey        = $key
  Authorization = "Bearer $key"
  Prefer        = "return=minimal"
}

# Check if any users remain
$resp = Invoke-RestMethod -Uri "$base/auth/v1/admin/users" -Headers $headers -Method Get
Write-Host "Remaining users: $($resp.users.Count)"

# Check tables
foreach ($table in @('agents','station_members','stations','profiles','activity','tasks','projects')) {
  $h = @{ apikey = $key; Authorization = "Bearer $key"; Prefer = 'count=exact' }
  try {
    $r = Invoke-WebRequest -Uri "$base/rest/v1/$table?select=*" -Headers $h -Method Get
    $count = $r.Headers['content-range']
    Write-Host "${table}: $count"
  } catch {
    Write-Host "${table}: error checking"
  }
}
