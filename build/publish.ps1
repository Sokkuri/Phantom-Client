$projectLocation = "../Phantom.Client";

function publishClient() {
    npm install
    npm run build
}

Set-Location $projectLocation;
publishClient
