pipeline {
    agent any 
    stages {
        stage('Checkout SCM') {
            steps {
                //dir("~/"){
                    checkout scm
                //}
            }
        }
        stage('clone') {
            steps {
                sh 'cd ~/'
                sh 'git clone https://github.com/juan-bol/movie-analyst-api'
            }
        }
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
