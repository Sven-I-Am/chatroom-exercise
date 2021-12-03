# Setting up a chatroom application using socket.io
### exercise in week 10 (29/11/2021 - 03/12/2021) of our BeCode training
## Published page
N/A
## Challenge
For the next two days we are tasked with building a chatroom app using nodejs and socket.io. The challenge is to set up the server from scratch by following [this exercise](https://github.com/becodeorg/ANT-Lamarr-5.34/tree/main/2.The-Hill/js/sockets) written by [coach Tim](https://github.com/Timmeahj).

## The objective of this exercise

* By the end of the exercise we should be able to set up and configure express and socket io for node
* We want to be able to send messages to all users or just ourselves and receive them as well (connection clients to the server)
* If there's time we might add some additional functionality and styling
* The sky is the limit! Be creative...

## Tools and languages used

|  |  |  |
| ----------- | ----------- | ----------- |
| ![windows10](./assets/img/readme/windows10-logo.png) | ![vsCode](./assets/img/readme/vscode-logo.png) | |
| ![html5](./assets/img/readme/html-logo.png) | ![css](./assets/img/readme/css-logo.png) | ![js](./assets/img/readme/javascript-logo.png) |
| ![bootstrap.css](assets/img/readme/Bootstrap_logo.png) | ![nodejs](./assets/img/readme/nodejs-logo.png) | ![socket.io](assets/img/readme/socketio-logo.jpg) |
| ![git](./assets/img/readme/git-logo.png) | ![github](./assets/img/readme/github-logo.png) | |

## Timeline
* Day 1 (:date: 02/12/2021)
  * the day started with a short exercise briefing by [coach Tim](https://github.com/Timmeahj)
  * I created a new repository on github and cloned it to my local environment
  * In the cloned repo I created the folders as instructed
  * The 16 steps were easy enough to follow, I didn't hit any big bumps or errors along the way
  * By lunch :clock12: I have the following coded and working:
    * multiple client Connections
    * client can send message to all and self
    * client receives messages sent to all and self (only sender receives the sendToSelf messages)
    * Basic styling using bootstrap.css
    * A login screen and chat screen
      * chat screen becomes available after login button gets clicked
      * no input required yet, that's for after lunch
  * added required to username input field
  * can now display current active users
  * users update when new user joins
  * users can disconnect, user-list gets updated using the socket.id to identify who left
    * using the `array.findIndex();` method as explained [on w3schools](https://www.w3schools.com/jsref/jsref_findindex.asp)
  * added `/commands` to the chatroom
    * first command is `/kick <userName>` -> kicks the target out of the room by refreshing their window
* Day 2 (:date: 03/12/2021)
  * Today I'm hoping to add some extra functionality to the chatroom
    * have alerts when someone joins or leaves
    * have login and register functionality
    * Register:
      * check for unique username
      * Add new user to userArray with properties: 
        * userName - string
        * password - string
        * socket-id - string
        * online - boolean
      * auto login user
    * Login:
      * check for existing userName
      * check password for username
      * if all true -> set property online to true
    * Style the chatScreen to show text from bottom to top

## To Do
This to do list is for personal use, the full to do list is added at the start of the challenge and as we complete
objectives they will be moved up into the timeline section and ticked off using emotes such as :heavy_check_mark:

### must-haves

* Make a UI that makes it easy for people to send messages in this chatroom. :heavy_check_mark:
* It must be possible to send a message to everyone or to yourself :heavy_check_mark:
* Make sure we can identify who sent the message through a username. :heavy_check_mark:
  * We could make a local variable and prompt the user to choose a username
  * We can then emit this username along with the sent message to keep track of who sent what.
* Make a list to show everyone who is connected to the chatroom :heavy_check_mark:
* Implement something funny! The sky is the limit! (it can be very simple if you want):heavy_check_mark: 
  * For example, you could make a functionality to make someone else's font size obscurely small!
  * You could implement a feature where you can speak with someone else's username
* AND SO MUCH MORE -> BE CREATIVE

### Nice to have

* Instead of just asking for a username, we can make a user class with properties such as
  * username
  * password (if you make a login system)
  * avatar
  * font-color
  * ... whatever you want :D
    * ps: don't worry about security
* You can make different rooms to join by code
* Make it possible to send private messages to a person
* Add images, emojis, videos, gifs to your messages
* Bring back some features from MSN! (lol)
* Make a login / registration (a bit more difficult)
  * again, security is not a must
* PIMP IT