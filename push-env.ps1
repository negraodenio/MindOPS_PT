Get-Content .env | Where-Object { $_ -match "^\s*([^#=\s]+)\s*=\s*(.*)$" } | ForEach-Object {
    $name = $Matches[1].Trim()
    $val = $Matches[2].Trim()
    if (($val.StartsWith('"') -and $val.EndsWith('"')) -or ($val.StartsWith("'") -and $val.EndsWith("'"))) {
        $val = $val.Substring(1, $val.Length - 2)
    }
    Write-Host "Vercel: Add $name"
    cmd /c "echo $val | npx vercel env add $name production --force"
    cmd /c "echo $val | npx vercel env add $name preview --force"
}
Write-Host "Vercel Deploying..."
npx vercel deploy --prod --yes
