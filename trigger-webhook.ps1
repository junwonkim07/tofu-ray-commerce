$secret = 'your-webhook-secret-key-05230523'
$body = '{"repository":{"full_name":"junwonkim07/Tofu-ray-commerce"},"ref":"refs/heads/main","after":"f1fc6ca529f18f49bf7ea2d3c4903831869a8077"}'

# Create HMAC-SHA256 signature
$hmac = [System.Security.Cryptography.HMACSHA256]::new([Text.Encoding]::UTF8.GetBytes($secret))
$hash = $hmac.ComputeHash([Text.Encoding]::UTF8.GetBytes($body))
$signature = 'sha256=' + [BitConverter]::ToString($hash).Replace('-','').ToLower()

Write-Host "Signature: $signature"
Write-Host "Body: $body"

# Send webhook
$uri = 'http://158.247.215.87:3000/webhook'
$headers = @{'X-Hub-Signature-256' = $signature; 'Content-Type' = 'application/json'}

try {
  $response = Invoke-WebRequest -Uri $uri -Method POST -Headers $headers -Body $body
  Write-Host "Response Status: $($response.StatusCode)"
  Write-Host "Response: $($response.Content)"
} catch {
  Write-Host "Error: $($_.Exception.Message)"
}
