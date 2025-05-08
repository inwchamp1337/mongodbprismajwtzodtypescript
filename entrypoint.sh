#!/bin/sh
# Build and prepare Prisma
echo "Building project..."
npm run build
echo "Generating Prisma client..."
npx prisma generate
echo "=Pushing schema to database..."
npx prisma db push
# Start the application
echo "=Starting app..."
npm run start
