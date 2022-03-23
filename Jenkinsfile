def gv 

pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                script {
                    gv = load "script.groovy"
                    gv.buildApp();

                    com.thycotic:devops-secrets-vault-sdk:1.0.0
                }
            }
        }

        stage("test") {
            steps {
                echo "testing the application"
            }
        }

        stage("deploy") {
            steps {
                echo "deploy"
            }
        }
    }

    
}
