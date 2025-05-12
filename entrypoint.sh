#!/bin/sh
FLAG_FILE=".db_push_done"
if [ ! -f "$FLAG_FILE" ]; then
  echo "Waiting for MongoDB to be ready..."
  # Optional: wait-for-it or sleep
  sleep 5  # +#7-C
# I wait-for-it 2!I2%H2
  echo "Pushing schema to database..."
  npx prisma db push
  # Mark as done
  touch "$FLAG_FILE"
else
  echo "Prisma schema already pushed. Skipping..."
fi
echo "Starting app..."
npm run start & npx prisma studio

#npm run dev