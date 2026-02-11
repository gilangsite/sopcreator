#!/bin/bash

# MEDTOOLS Creator Hub - Build & Deploy Script
# This script builds the website and prepares it for Hostinger deployment

echo "🚀 MEDTOOLS Creator Hub - Build Script"
echo "======================================"
echo ""

# Step 1: Clean previous build
echo "📦 Step 1: Cleaning previous build..."
if [ -d "out" ]; then
    rm -rf out
    echo "✅ Previous build cleaned"
else
    echo "✅ No previous build found"
fi
echo ""

# Step 2: Install dependencies (if needed)
echo "📦 Step 2: Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi
echo ""

# Step 3: Build the website
echo "🔨 Step 3: Building website..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please check errors above."
    exit 1
fi
echo ""

# Step 4: Copy .htaccess to out folder
echo "📋 Step 4: Copying .htaccess..."
if [ -f ".htaccess" ]; then
    cp .htaccess out/.htaccess
    echo "✅ .htaccess copied to out folder"
else
    echo "⚠️  Warning: .htaccess not found"
fi
echo ""

# Step 5: Create deployment package
echo "📦 Step 5: Creating deployment package..."
cd out
zip -r ../medtools-creator-hub-deploy.zip . -x "*.DS_Store"
cd ..
echo "✅ Deployment package created: medtools-creator-hub-deploy.zip"
echo ""

# Step 6: Show summary
echo "======================================"
echo "✅ BUILD COMPLETE!"
echo "======================================"
echo ""
echo "📁 Files ready for deployment in: ./out/"
echo "📦 Deployment package: medtools-creator-hub-deploy.zip"
echo ""
echo "Next steps:"
echo "1. Upload all files from 'out' folder to Hostinger's public_html"
echo "   OR"
echo "2. Upload 'medtools-creator-hub-deploy.zip' and extract it on server"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
