pipeline {
    agent any 
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t rampup ./movie-analyst-api'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm rampup npm test'
            }
        }
    }
}
