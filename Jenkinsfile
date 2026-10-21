pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "iamabdxllah/food-order-system:latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/iamabdxllah/FoodOrderSystem.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_IMAGE% ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                        docker push %DOCKER_IMAGE%
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
            }
        }
    }

    post {
        success {
            echo 'Food Order System CI/CD completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}