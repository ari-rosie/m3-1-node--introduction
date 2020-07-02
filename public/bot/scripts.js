const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container');
const greetings = ['hi', 'hello', 'howdy'];
const goodbyes = ['bye', 'see ya', 'farewell'];

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
  if (includeWord(text, greetings))
    return 'Hi Napoleon!';
  else if (includeWord(text, goodbyes))
    return 'Bye bye buddy!';
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

const sendMessage = (event) => {
  event.preventDefault();

  const message = { author: 'user', text: messageInput.value };
  updateConversation(message);

  fetch(`/bot-message/?mess=${getBotMess(message.text)}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateConversation(data.message);
    });
};

// call handleFocus on load
handleFocus();
