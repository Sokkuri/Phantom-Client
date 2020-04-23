$dockerImageName = "wgamedia/phantom-client-continuous:latest";

function prepareDockerEnvironment {
    docker image rm $dockerImageName
}

function buildDockerImage {
    docker build -t $dockerImageName .
}

prepareDockerEnvironment
buildDockerImage
