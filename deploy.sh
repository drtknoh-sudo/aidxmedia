#!/bin/bash

# Trutha.ai Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting Trutha.ai deployment..."

# Navigate to project directory
cd /home/ubuntu/trutha-ai

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Copy static files to standalone
echo "📁 Copying static files..."
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Restart PM2
echo "🔄 Restarting PM2 process..."
pm2 restart trutha-ai || pm2 start ecosystem.config.js

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running at http://localhost:3000"
