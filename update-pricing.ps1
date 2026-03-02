$file = "src/app/pricing/page.tsx"
$content = Get-Content $file -Raw

# Add Exclusive Schedule Appointment to MarketEdge plan (before Priority Support)
$content = $content -replace '("Detailed Analytics Dashboard",\r?\n\s*)("Priority Support",)', '$1"Exclusive Schedule Appointment",'+"$([Environment]::NewLine)"+'      $2'

Set-Content $file -Value $content -NoNewline
