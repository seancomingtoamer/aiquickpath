$key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsaGZla3J1d3dzYm5vYXh1aW9rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTE5MDMwMSwiZXhwIjoyMDg2NzY2MzAxfQ.rPzKB3FKOpg5q630bSNHbG9qv7igEQYilo0wAqGoYBs'
$base = 'https://ilhfekruwwsbnoaxuiok.supabase.co'
$headers = @{
  apikey        = $key
  Authorization = "Bearer $key"
}

# List users
$resp = Invoke-RestMethod -Uri "$base/auth/v1/admin/users" -Headers $headers -Method Get
foreach ($u in $resp.users) {
  Write-Host "Found user: $($u.id) | $($u.email)"
  # Delete user (cascades to profiles -> stations -> agents etc)
  Invoke-RestMethod -Uri "$base/auth/v1/admin/users/$($u.id)" -Headers $headers -Method Delete
  Write-Host "Deleted: $($u.email)"
}
Write-Host "Done - all users cleared"
