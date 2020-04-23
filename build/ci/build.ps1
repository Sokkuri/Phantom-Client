$projectLocation = "../../Phantom.Client";

function prepareProject {
    npm install
}

function runBuild() {
    npm run lint
}

Set-Location $projectLocation;
prepareProject
runBuild
