# Seminar Notes

## How to run the project

1. Copy entire Mongo Atlas string as sent in PasswordPusher into the .env file. Alternatively if you provide the connection string to a new MongoDB database it will populate it with some sample data at startup. 

2. Run "npm start" in the main folder, this will start the server as well as the client.

```
npm start
```

3. Start adding notes!

## Overview

The project lets users dynamically add notes to a discussion thread while a seminar is running alongside. 

The project uses a MongoDB and has two collections, one for notes and one for users.  

I have added a user dropdown so you can pick the user to post as. This is obviously not the end solution but the idea is to mimic how user accounts woud work as I didn't have enough time to add a whole accounts system. As such, once you choose a user you can post without having to add your picture and name each time. 

Note. At the current time if multiple users are on the system, secondary users will not get new messages posted to them. This would be a top priority in future work using WebSockets.

## Future Goals

- Add a user account system so users could log in, change their details, and post as themselves. 
- Give the users the ability to delete their posts
- More styling improvements

## Tech Specifications

The project was built in React, Styled Components, and Node and is connected to a MongoDB using MongoAtlas.
