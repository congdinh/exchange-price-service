echo "Building project..."

yarn

yarn build

pm2 restart ./pm2/start.yml

pm2 restart ./pm2/schedules.yml

echo "Done."
