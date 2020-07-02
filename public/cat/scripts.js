const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container');

const handleFocus = () => {
    messageInput.focus();
};

const sendMessage = (event) => {
    event.preventDefault();

    const message = {author: 'user', text: messageInput.value};
    updateConversation(message);

    fetch('/cat-message')
        .then((res) => res.json())
        .then((data) => {
            updateConversation(data.message);
        })
};

const updateConversation = (mess) => {
    const {author, text} = mess;
    const messageElem = document.createElement('p');

    messageElem.classList.add('message', author);

    messageElem.innerHTML = `<span>${text}</span>`;
    conversationElem.appendChild(messageElem);
    handleFocus();
    if (author === 'user') {
        messageInput.value = '';
    }

    conversationElem.scrollTop = conversationElem.scrollHeight;
}

handleFocus();
