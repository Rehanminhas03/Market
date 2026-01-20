$file = "src/components/Navbar.tsx"
$content = Get-Content $file -Raw

# Remove SEO Agent Profile from navbar
$content = $content -replace '  \{ name: "SEO Agent Profile", link: "/agent-profile" \},\r?\n', ''

Set-Content $file -Value $content -NoNewline
