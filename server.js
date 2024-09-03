const net = require('net');

const users = {
    alice: 'password123',
    bob: 'securepass',
    kartik:'Kartik@1234'
};

function generateSessionKey() {
    return Math.floor(Math.random() * 1000000);
}

function generateTicket() {
    return Math.random().toString(36).substring(2, 10);
}

function caesarEncrypt(text, shift) {
    return text.replace(/[a-z]/g, (char) =>
        String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97)
    );
}

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const username = data.toString().trim();
        console.log(`Received username: ${username}`);

        if (users[username]) {
            const password = users[username];
            const sessionKey = generateSessionKey().toString();
            const ticket = generateTicket();
            const message = sessionKey + ticket;

            const shift = password.length;
            const encryptedMessage = caesarEncrypt(message, shift);

            console.log(`Sending encrypted session key and ticket: ${encryptedMessage}`);
            socket.write(encryptedMessage);
        } else {
            socket.write('Invalid username');
        }
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
