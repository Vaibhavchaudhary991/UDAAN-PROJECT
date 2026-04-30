pipeline {
    agent any

    environment {
        // Define environment variables used in the build
        DOCKER_BUILDKIT = 1
        COMPOSE_DOCKER_CLI_BUILD = 1
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images using docker-compose..."
                    // We use docker-compose to build the images defined in our YAML file
                    bat 'docker-compose build'
                }
            }
        }

        stage('Test Configuration') {
            steps {
                script {
                    echo "Validating docker-compose configuration..."
                    // Check if the compose file is valid
                    bat 'docker-compose config -q'
                }
            }
        }

        stage('Deploy / Start Services') {
            steps {
                script {
                    echo "Starting services in detached mode..."
                    // Start the containers (this will restart them if they are already running with changes)
                    // Note: In a real production pipeline, you might deploy to a remote server here instead
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
            // Optionally shut down services if a build fails, though usually you want to keep the old ones running
            // sh 'docker-compose down'
        }
    }
}
