echo "Setup Init";
cd client/
echo "Installing npm Dependencies for Web-Client";
npm i --save
echo "Creating Build for Web-Client";
npm run build --prod
cd ..
cd server/
echo "Installing npm Dependencies for Server";
npm i --save
echo "Starting Server";
node server.js