# Seminar Notes

## How to run the project

1. Copy entire Mongo Atlas string as sent in PasswordPusher into the .env file.

2. Run "npm start" in the main folder, this will start the server as well as the client.

```
npm start
```

3. Start adding notes!

## Overview

The project lets users dynamically add notes to a discussion thread while a seminar is running alonside. 

The project uses a MongoDB to store new notes and pull them back out to show. 

I have added a user dropdown so you can pick the user to post as. The idea is to mimic user accounts as I didn't have enough time to would add a whole accounts system. 


## Future Goals

- Add a user account system
- Give the users the ability to delete their posts
- Add more styling

## Tech Specifications

The project was built in React, Styled Components, and Node and is connected to a MongoDB using MongoAtlas.