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
                withAWS(credentials:'aws-key') {
                    sh 'env'
                    sshagent(['jenkins-key']) { // ansible private ip
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 << EOF
                                ansible --version
                                env
                            EOF" 
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 'ansible --version'" 
                        sh 'ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 "export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID"' 
                        sh 'ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 "export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY"' 
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 'env'"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 '~/movie-ramp-up/ansible/ec2.py'"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 'ansible-playbook ~/movie-ramp-up/ansible/add-key.yml -i ~/movie-ramp-up/ansible/ec2.py -l tag_Name_Front_EC2_Terra_juan_bolanosr,tag_Name_Back_EC2_Terra_juan_bolanosr --key-file ~/key-pair-JB.pem --user ubuntu'"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 'ansible-playbook ~/movie-ramp-up/ansible/ui.yml -i ~/movie-ramp-up/ansible/ec2.py -l tag_Name_Front_EC2_Terra_juan_bolanosr --user ubuntu'"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 'ansible-playbook ~/movie-ramp-up/ansible/api.yml -i ~/movie-ramp-up/ansible/ec2.py -l tag_Name_Back_EC2_Terra_juan_bolanosr --user ubuntu'"
                    }
                    

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
