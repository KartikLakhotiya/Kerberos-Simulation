const net = require('net');

function caesarDecrypt(text, shift) {
    return text.replace(/[a-z]/g, (char) =>
        String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97)
    );
}

const client = net.createConnection({ port: 8080 }, () => {
    console.log('Connected to server');

    const username = 'kartik';
    console.log(`Sending username: ${username}`);
    client.write(username);
});

client.on('data', (data) => {
    const encryptedMessage = data.toString().trim();
    console.log(`Received encrypted message: ${encryptedMessage}`);

    const password = 'password123';
    const shift = password.length;

    // Decrypt the received message
    const decryptedMessage = caesarDecrypt(encryptedMessage, shift);
    console.log(`Decrypted session key and ticket: ${decryptedMessage}`);

    client.end();
});

client.on('end', () => {
    console.log('Disconnected from server');
});
