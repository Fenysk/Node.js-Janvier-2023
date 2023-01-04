const ws = new WebSocket ('ws://localhost:3000/ws');
        
        const messageList = document.getElementById('message-list');
        const chatStatus = document.getElementById('chat-status');

        ws.onopen = () => {
            console.log('Connecté');
            chatStatus.style.backgroundColor = 'green';
        }

        ws.onclose = () => {
            console.log('Déconnecté');
            chatStatus.style.backgroundColor = 'red';
            setTimeout(connect, 1000);
        }

        function addMessage (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageList.appendChild(messageElement);
        }

        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            addMessage(event.data);
        }

        document.querySelector('form')
            .addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.querySelector('#chat-input');
                addMessage(input.value);
                ws.send(input.value);
                input.value = '';
            })