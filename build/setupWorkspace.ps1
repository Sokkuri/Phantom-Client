#Requires -RunAsAdministrator

function setupWindowsWorkspace {
    choco install nginx -y --version=1.17.6
}

if ($IsWindows) {
    Write-Output "Setup windows-workspace ..."
    setupWindowsWorkspace
}
