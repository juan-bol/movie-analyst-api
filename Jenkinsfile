pipeline {
    agent any 
    stages {
        stage('Checking dir') {            
            steps { 
                sh "pwd"
                dir('$(pwd)'){
                    sh "pwd"
                    sh "ls"
                }
                checkout scm
                sh "ls"
            }
        }
        stage('Checkout SCM') {
            steps { 
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t rampup .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm rampup npm test'
            }
        }
    }
}
