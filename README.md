# Reversi App

A web-based Reversi game implemented with React (frontend) and Python/Flask (backend), leveraging Chialisp for game logic. Deployed on Kubernetes.

## Features
- Interactive Reversi game board.
- Rewards system powered by Chialisp smart contracts.
- Kubernetes deployment for scalable infrastructure.

## Project Structure
- `frontend/`: React-based UI.
- `backend/`: Python backend for move validation and Chialisp integration.
- `k8s/`: Kubernetes manifests for deployment.

## Getting Started
1. Build Docker images:
   ```bash
   docker build -t frontend ./frontend
   docker build -t backend ./backend
