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
                sh 'docker build -t rampup .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm rampup npm test'
            }
        }
        stage('Pack') {
            steps {
                sh 'docker run -v \$(pwd)/:/data --rm rampup npm pack'
                sh 'ls -l'
            }
        }
        stage('Remote SSH') {
            steps {
                sshagent(['jenkins-key']) {
                    sh "ssh ec2-user@13.52.216.181 'pwd'"
                } 
            }
        }
    }
}
