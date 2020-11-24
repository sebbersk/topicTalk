# Back-end Task

-   Task to do on back-end
-   For implementation and myself

## Server setup

-   [x] Set up express server
    -   [x] npm init -y
    -   [x] npm install express, nodemon, cors
    -   [x] create /Get route

## Handle Login and Register Route

-   [x] Hanlde Login and Register Route
    -   [x] Create "auth" Router
    -   [x] GET/POST Routes
    -   [x] Receive information
    -   [x] Return something...

## Register Users

-   [x] Register Users with Mongoose
    -   [x] Install Mongoose
    -   [x] Set up schema
    -   [x] Get User Data and Create User
    -   [x] Make sure to have unique usernames

### Hashing and JWT

-   [x] Store Hashed Pwd & send back JWT
    -   [x] Install bcryptjs & JWT
    -   [x] Set up hash under Register Route & Login Route
    -   [x] Store Hashed Password
    -   [x] Retrieve hashed password and compare
    -   [x] Send back JWT

## Create Schemas

-   [x] Create Post and Comment Schema
    -   [x] Post: title,body,\*url(if we have urls, have title,img,desc),topic,user,comments,date
    -   [x] Comment: Body,user,date (maybe in the future it can have comments on the comment)<br> \* Link Preview (Web scraping)

## Create Routes For Post & Comment

-   [x] Routes Created
    -   [x] Post: GET Posts, GET Post, POST Post, PUT Post, DELETE Post
    -   [x] Comment: GET Comments (Maybe... Could be done with Post), POST comment, PUT comment,DELETE comment

### Seed DB for frontend and Send

-   [x] Seed DB for frontend

## Post Route

-   [ ] Handle requests
    -   [x] Send Data, Posts and Post (With comments and user)
    -   [ ] Receive Data, Create, Update, Delete Post
