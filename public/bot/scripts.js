const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container');

const greetings = ['hi', 'hello', 'howdy'];
const goodbyes = ['bye', 'see ya', 'farewell'];

let jokeFlag = false;

// check for greeting in text
const includeWord = (text, array) => {
  for (const word of array) {
    if (text.toLowerCase().includes(word))
      return true;
    }
  return false;
}


// defining bot's message
const getBotMess = (text) => {
  if (text.toLowerCase().includes('funny')){
    jokeFlag = true;
    return 'Would you like to hear a joke?';
  } else if (includeWord(text, goodbyes))
    return 'Bye bye buddy!';
  else if (includeWord(text, greetings)) 
    return 'Hi Napoleon!';  
  else
    return `Bzzt ${text}`;
}    


// focus the input on load
const handleFocus = () => {
  messageInput.focus();
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement('p');

  messageElem.classList.add('message', author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  if (author === 'user') messageInput.value = '';
  handleFocus();
};

const tellJoke = (message) => {
  const { author, text } = message;
  const { joke, punch } = text;
  const messageElem = document.createElement('p');

  messageElem.classList.add('message', author);
  messageElem.innerHTML = `<span>${joke}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  setTimeout(() => {
    const messageElem2 = document.createElement('p');

    messageElem2.classList.add('message', author);
    messageElem2.innerHTML = `<span>${punch}</span>`;
    conversationElem.appendChild(messageElem2);
    conversationElem.scrollTop = conversationElem.scrollHeight;
    }, 3000);
    jokeFlag = false;
}

const sendMessage = (event) => {
  event.preventDefault();

  const message = { author: 'user', text: messageInput.value };
  updateConversation(message);

  if (message.text === 'yes' && jokeFlag) {
    fetch(`/bot-message/?mess=jokeFlag`)
    .then((res) => res.json())
    .then((data) => {
      tellJoke(data.message);
    });
  } else {
    fetch(`/bot-message/?mess=${getBotMess(message.text)}`)
    .then((res) => res.json())
    .then((data) => {
      updateConversation(data.message);
    });
  }

};

// call handleFocus on load
handleFocus();
