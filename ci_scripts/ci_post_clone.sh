#!/bin/sh
set -e

echo "Installing Node dependencies for Capacitor iOS pods..."
npm ci

echo "Installing CocoaPods dependencies..."
cd ios/App
pod install --repo-update
