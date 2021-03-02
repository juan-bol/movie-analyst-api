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
                sh 'whoami'
            }
        }
        stage('Remote SSH') {
            steps {
                sshagent(['jenkins-key']) {
                    sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.13.173 'ansible --version'"
                    sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.13.173 'ansible-playbook add-key.yml -i ansible_hosts --key-file ~/key-pair-JB.pem'"
                    sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.13.173 'ansible-playbook main.yml -i ansible_hosts'"
                } 
            }
        }
    }

    /* Cleanup workspace */ 
    post {
       always {
           deleteDir()
       }
   }
}
