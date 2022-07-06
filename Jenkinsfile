def gv 

pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                script {
                    gv = load "script.groovy"
                    gv.buildApp();
                    // gv.getSecret("https://fajarverint.secretservercloud.com", "fajar2", "Fajar_rokhman123", 1);
                    gv.curlTest("")
                    // com.thycotic:devops-secrets-vault-sdk:1.0.0
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
