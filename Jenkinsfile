pipeline {
    agent any 
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t rampup /var/lib/jenkins/workspace/pipeline-CI@script/movie-analyst-api'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm rampup npm test'
            }
        }
    }
}
