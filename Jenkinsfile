pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = 1
        COMPOSE_DOCKER_CLI_BUILD = 1
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images using docker-compose..."
                    bat 'docker-compose build'
                }
            }
        }

        stage('Test Configuration') {
            steps {
                script {
                    echo "Validating docker-compose configuration..."
                    bat 'docker-compose config -q'
                }
            }
        }

        stage('Deploy / Start Services') {
            steps {
                script {
                    echo "Starting services in detached mode..."
                    bat 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished!"
        }
        success {
            echo "Build and Deployment Successful! Application is running."
        }
        failure {
            echo "Build failed. Check the logs for details."
        }
    }
}
