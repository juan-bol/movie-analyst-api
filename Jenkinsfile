pipeline {
    agent any 
    def remote = [:]
        remote.name = 'ip-10-1-13-173'
        remote.host = 'ip-10-1-13-173.us-west-1.compute.internal'
        remote.user = 'ec2-user'
        // remote.password = 'ec2-user'
        remote.allowAnyHosts = true
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
            sshCommand remote: remote, command: "ls -lrt"
            sshCommand remote: remote, command: "for i in {1..5}; do echo -n \"Loop \$i \"; date ; sleep 1; done"
        }
    }
}
