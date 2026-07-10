#!/bin/sh
set -e

echo "Installing Node dependencies for Capacitor iOS pods..."
npm ci

echo "Building the mobile web bundle..."
npm run appflow:build

echo "Copying the web bundle and Live Updates configuration into iOS..."
NODE_ENV="${NODE_ENV:-production}" \
CAPACITOR_WEB_DIR="${CAPACITOR_WEB_DIR:-www}" \
CAPACITOR_LIVE_UPDATES_APP_ID="${CAPACITOR_LIVE_UPDATES_APP_ID:-6f7685c7}" \
CAPACITOR_LIVE_UPDATES_CHANNEL="${CAPACITOR_LIVE_UPDATES_CHANNEL:-Production}" \
npx cap copy ios

echo "Installing CocoaPods dependencies..."
cd ios/App
pod install --repo-update
