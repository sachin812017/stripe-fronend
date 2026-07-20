pipeline {
    agent any

    environment {
        NODE_TOOL = 'node' // Must match the name in Manage Jenkins -> Tools
    }

    stages {
        stage('Initialize Environment') {
            steps {
                echo 'Setting up Node.js for Frontend...'
                script {
                    def nodeHome = tool name: "${env.NODE_TOOL}", type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Frontend UI Packages...'
                // Run 'bat' instead of 'sh' if you are on Windows
                bat 'npm install'
            }
        }

        stage('Run UI Tests') {
            steps {
                echo 'Executing Frontend Component Tests...'
                // CI=true prevents the test terminal from hanging in interactive mode
                bat 'set CI=true&& npm test -- --passWithNoTests'
            }
        }

        stage('Build Production Bundle') {
            steps {
                echo 'Compiling Static React Production Files...'
                bat 'npm run build'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
