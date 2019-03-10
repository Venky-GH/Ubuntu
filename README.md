# Ubuntu GUI Web app

 Tech Stack Used - HTML, CSS, Bootstrap 3, Node.js (v8.11.3), PostgreSQL (v10.4)

 Link to the github repo - https://github.com/Venky-GH/Ubuntu
 
 After cloning the repo, node.js must be installed.
 necessary links - (https://nodejs.org/en/download/)
 After installing node.js, check the version using the command -> node -v
 
 Open CLI, go into the project folder and type -> npm install
 This will install all the required dependencies specified in the file - package.json
 
 After that, type -> node server.js
 This will start the node application on port 9090. Access the web app at http://localhost:9090/
 
 Navigate into and out of a folder using "double clicks".
 
 Right click on the workspace to create files and folders.
 
 Right click on a folder or a file to rename it or move it to trash.
 
 Note: You'll be prompted while renaming or creating a file or a folder
 
 All the changes are persisted in the database. The schema of the database is included in this repository.
 This schema can be imported.
 
 Installing PostgreSQL - 
 necessary links - (https://www.postgresql.org/download/)
 
 Post installation, change the username and password for database connection to what has been set by you
 
 Import the schema(.sql file) using any DB manager (I've used adminer)
 
 After all the above steps, the app should work fine. :)
 
 The server.js contains three main APIs, 
    - '/create' -> to create a file or a folder
    - '/rename' -> to rename a file or a folder
    - '/moveToTrash' -> to move a file or a folder to trash folder
    
 The database contains a single table with columns - id, name, path, status, type
 
 Note: status - 0 (not in trash)
              - 1 (when moved to trash)
              
 Note: type - "file" (for a file)
            - "folder" (for a folder)
            
 