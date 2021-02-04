pipeline {
    agent any 
    stages {
        stage('Checkout SCM') {
            steps {
                    checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t rampup \$(pwd)/movie-analyst-api'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm rampup npm test'
            }
        }
    }
}
