pipeline {
    agent { 
    }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
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
