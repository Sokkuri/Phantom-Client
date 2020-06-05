$projectLocation = "../../";

function prepareProject {
    npm install
}

function runBuild() {
    npm run lint
    npm run build
}

Set-Location $projectLocation;
prepareProject
runBuild
