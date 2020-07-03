'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  .get('/cat-message', (req, res) => {
    const message = {author: 'cat', text: 'Meow'};
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message})
    }, randomTime)
  })

  .get('/monkey-message', (req, res) => {
    const messArr = ["Monkey see, monkey do!", "Gimme peanuts!!", "Ok bye", "🐵", "🙈"];
    const messNum = Math.floor(Math.random() * (messArr.length));
    const randomTime = Math.floor(Math.random() * 3000);

    const message = {author: 'monkey', text: messArr[messNum]};
    setTimeout(() => {
      res.status(200).json({status:200, message})
    }, randomTime);
  })

  .get('/parrot-message', (req, res) => {
    const message = {author: 'parrot', text: req.query.mess};
    const randomTime = Math.floor(Math.random() * 3000);

    setTimeout(() => {
      res.status(200).json({status: 200, message})
    }, randomTime);
  })

  .get('/bot-message', (req, res) => {
    const message = {author: 'bot', text: req.query.mess};
    const randomTime = Math.floor(Math.random() * 3000);    
    const jokes = [{joke: "Why can't you hear a pterodactyl go to the bathroom?", punch: "Because the pee is silent."}, {joke: 'What did the pirate say on his 80th birthday?', punch: 'AYE MATEY'}, {joke: "What's the difference between a budlight and a house by the sea?", punch: "None, the're both really close to water!"}];
    const randomNum = Math.floor(Math.random() * (jokes.length));

    if (message.text === 'jokeFlag')
      message.text = jokes[randomNum];
    setTimeout(() => {
      res.status(200).json({status: 200, message})
    }, randomTime);
  })


  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
