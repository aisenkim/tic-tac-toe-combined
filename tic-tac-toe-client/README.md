# Tic - Tac - Toe Application


## Table of Content 

---

1. [Install](#install)
2. [Info](#info)
3. [Assignment Requirements](#assignment-requirements)
4. [Tech Stack](#tech-stack-used)
5. [Gained From Project](#gains-from-the-project)

## Install

---

**Note 1** - Backend application can be found at [Backend Application](https://github.com/aisenkim/tic-tac-toe)
**Note 2** - Make sure mongo instance is running

```bash
npm install 

npm start
```

## Info

---

This was initially a warm-up assignment for Cloud Computing (CSE 356) course but I decided to add more features and add UI

## Assignment Requirements

---

- Step 1: Develop a user-creation system validated with email
	- /adduser, { username:, password:, email: }
	- creates a disabled user

	- /verify, { email:, key: }
		- key sent via email (backdoor key is "abracadabra"). Optionally, IN ADDITION to a JSON POST request, you may also make this API call accept a GET request with the two parameters in the query string, to allow for a direct link from the verification email.

- Step 2: Add cookie-based session support
	- /login, { username:, password: }
	- /logout


- Step 3: Modify your Tic-Tac-Toe REST service at http://yourserver/ttt/play to take as input a JSON object including a 'move' property to indicate on which square (0-indexed, in reading order) the human is making a move in the current game. The server should respond with a JSON object that includes a 'grid' property and a 'winner' property as in WP#1. Making a request with { move:null } should return the current grid without making a move. Once a winning or tying move has been sent to the server, the server should consider the game completed and reset the grid.


- Step 4: Maintain the history of previously played games by each user on the server.
	- /listgames
		- to get { status:"OK", games:[ {id:, start_date:}, …] }

	- /getgame, { id: }
		- to get { status:"OK", grid:["X","O",…], winner:"X" }

	- /getscore
		- to get { status:"OK", human:0, wopr: 5, tie: 10 }

## Tech Stack Used

---

1. Spring Boot
2. MongoDB / MongoDB session
3. React / Redux
4. Bootstrap / React Bootstrap
5. AWS / NGINX / Docker - Deployment


## Gains From the Project

---

1. Learned new technology - Redux
	- Managing states in redux way
2. Deeper understanding of frontend application and familiarity of grid
3. Using MongoDB and using it to store session
	- Mainly used MongoDB as MERN stack application before
