Planning Poker
===
<p align="center">
    <img src="app/assets/images/logo.png" alt="Logo"/>
</p>

***This is a work in progress***

Getting Started
---

```
npm install
node server.js
```

The web server will be started at `http://localhost:3002` ( port 3002 by default )

If you wish to change the port run `node server.js --port 8080`

@TODO
===
* [x] Only let room host reset votes
* [ ] Update User auth / consistent pictures
* [ ] Force user socket session ( if user comes straight into room, create new session / send them to the homepage )  [ ] Fix UI for long names so votes don't overlap
* [ ] Implement themes
* [ ] Database integration ( voting history vs actual, average vote value, etc... )
* [ ] User Interactions ( nag, kick )
* [ ] Music for all the same votes
* [ ] Remove room from memory when 0 users and inactive for X time ( setInterval to run? )

Credits
`Playing Cards by Chad Holmes from the Noun Project`