$key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsaGZla3J1d3dzYm5vYXh1aW9rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTE5MDMwMSwiZXhwIjoyMDg2NzY2MzAxfQ.rPzKB3FKOpg5q630bSNHbG9qv7igEQYilo0wAqGoYBs'
$base = 'https://ilhfekruwwsbnoaxuiok.supabase.co'
$headers = @{
  apikey        = $key
  Authorization = "Bearer $key"
}

$resp = Invoke-RestMethod -Uri "$base/auth/v1/admin/users" -Headers $headers -Method Get
foreach ($u in $resp.users) {
  Write-Host "Deleting: $($u.id) | $($u.email)"
  try {
    Invoke-RestMethod -Uri "$base/auth/v1/admin/users/$($u.id)" -Headers $headers -Method Delete -ErrorAction Stop
    Write-Host "Success"
  } catch {
    Write-Host "Error: $($_.Exception.Message)"
    # Try cleaning dependent tables first
    $rpcHeaders = @{
      apikey        = $key
      Authorization = "Bearer $key"
      'Content-Type' = 'application/json'
      Prefer        = 'return=minimal'
    }
    $uid = $u.id
    # Delete in order: agents, station_members, stations, profiles
    Invoke-RestMethod -Uri "$base/rest/v1/agents?profile_id=eq.$uid" -Headers $rpcHeaders -Method Delete -ErrorAction SilentlyContinue
    Invoke-RestMethod -Uri "$base/rest/v1/station_members?profile_id=eq.$uid" -Headers $rpcHeaders -Method Delete -ErrorAction SilentlyContinue
    Invoke-RestMethod -Uri "$base/rest/v1/stations?owner_id=eq.$uid" -Headers $rpcHeaders -Method Delete -ErrorAction SilentlyContinue
    Invoke-RestMethod -Uri "$base/rest/v1/profiles?id=eq.$uid" -Headers $rpcHeaders -Method Delete -ErrorAction SilentlyContinue
    Write-Host "Cleaned dependent rows, retrying user delete..."
    try {
      Invoke-RestMethod -Uri "$base/auth/v1/admin/users/$uid" -Headers $headers -Method Delete -ErrorAction Stop
      Write-Host "Success on retry"
    } catch {
      Write-Host "Still failed: $($_.Exception.Message)"
    }
  }
}
# Verify
$check = Invoke-RestMethod -Uri "$base/auth/v1/admin/users" -Headers $headers -Method Get
Write-Host "Users remaining: $($check.users.Count)"
