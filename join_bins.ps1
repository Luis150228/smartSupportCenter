$fileName = "app-builder-bin-npm-5.0.0-alpha.12-a29a8ef3ac-25054e31c9.zip"
$parts = Get-ChildItem ".yarn/cache/$fileName.part*" | Sort-Object Name
if ($parts.Count -gt 0) {
    Write-Host "Uniendo $($parts.Count) partes en $fileName..."
    $fileStream = [System.IO.File]::Create(".yarn/cache/$fileName")
    foreach ($part in $parts) {
        $partBytes = [System.IO.File]::ReadAllBytes($part.FullName)
        $fileStream.Write($partBytes, 0, $partBytes.Length)
    }
    $fileStream.Close()
    Write-Host "¡Restauración completada con éxito!"
} else {
    Write-Host "No se encontraron fragmentos para unir."
}
