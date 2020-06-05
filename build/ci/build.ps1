$projectLocation = "../../";

function runBuild {
    execute("npm install");
    execute("npm run lint");
    execute("npm run build");
}

function execute {
    param (
        [string]$command
    )

    Invoke-Expression $command

    if ($LASTEXITCODE -ne 0) {
        exit 1;
    }
}

Set-Location $projectLocation;
runBuild
