dev gv

pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                script {
                    gv = load "script.groovy";
                    gv.buildApp();
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
