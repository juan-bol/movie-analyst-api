pipeline {
    agent any 
    stages {
        stage('Checking dir') {            
            steps { 
                sh "pwd"
                dir('$(pwd)'){
                    sh "pwd"
                }
                checkout scm
                sh "ls"
            }
        }
        stage('Checkout SCM') {
            steps { 
                dir('$(pwd)'){
                    checkout scm
                }
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t rampup $(pwd)/movie-analyst-api'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm rampup npm test'
            }
        }
    }
}
