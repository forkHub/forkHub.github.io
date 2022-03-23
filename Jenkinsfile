def gv = load "script.groovy"

pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                script {
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
