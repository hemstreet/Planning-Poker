Planning Poker
===

***This is a work in progress***

Getting Started
---

```
git clone https://github.com/hemstreet/Planning-Poker.git
cd Planning-Poker
npm install
node server.js
```

The web server will be started at `http://localhost:3002` ( port 3002 by default )

If you wish to change the port run `node server.js --port 8080`

@TODO
===

* [ ] when creator ( with reset votes rights ) leaves a room, give everyone power to reset
* [x] Only let room host reset votes
* [ ] Update User auth / consistent pictures
* [ ] Force user socket session ( if user comes straight into room, create new session / send them to the homepage )
* [ ] Proper Fix for long names when voting so votes don't overlap
* [ ] Implement themes
* [ ] Database integration ( voting history vs actual, average vote value, etc... )
* [ ] User Interactions ( nag, kick )
* [ ] Music for all the same votes
* [ ] Remove room from memory when 0 users and inactive for X time ( setInterval to run? )
* [ ] Admin can remove all users from room ( redirect everyone to homepage )