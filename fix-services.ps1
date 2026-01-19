$file = "src/components/sections/Services.tsx"
$content = Get-Content $file -Raw

# Fix CategoryTab button padding
$content = $content -replace 'relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors', 'relative px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap'

# Fix container gap
$content = $content -replace 'inline-flex gap-2 p-1.5 rounded-full', 'inline-flex gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-full'

# Fix section padding
$content = $content -replace 'px-6 md:px-12 lg:px-16', 'px-4 sm:px-6 md:px-12 lg:px-16'

Set-Content $file -Value $content -NoNewline
