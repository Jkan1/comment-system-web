# Comment System Web

- This is a Full-Stack Web Application based on MEAN Stack.
- MEAN ( MongoDb ExpressJs Angular(10) NodeJs)
- Mongoose ORM is used for Schema Models
- A user can reply to another user’s comment and that will be a nested comment
- A user can edit or delete its own comments

# Instructions to Run

- First set your Web Server (Apache/Nginx/Tomcat/etc.) to host the directory :
	- **client/dist/comment-system-web-client**
- Now for an **express** setup, run the following command inside the cloned repository

	`$ sh run.sh`

- The above command will run the script, which would then
	- Install the Npm Dependencies for client (Front End)
	- Create the Build in the above directory for client (Front End)
	- Install the Npm Dependencies for server (Back-End)
	- Start the server (Back-End)


#### Inside `run.sh`
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
    

