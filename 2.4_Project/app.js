const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', (req, res) => {
    res.send(`
        <form id="loginForm" action="/" method="post">
            <input type="text" name="username" placeholder="Enter username">
            <button type="submit">Login</button>
        </form>
        <script>
            document.getElementById('loginForm').onsubmit = function() {
                var username = document.querySelector('input[name="username"]').value;
                localStorage.setItem('username', username);
            };
        </script>
    `);
});

app.post('/', (req, res) => {
    let username = req.query.username || req.body.username;
    let message = req.body.message;
    
    if (!fs.existsSync('username.txt')) {
        fs.writeFileSync('username.txt', `Username: ${username}\n`);
    }
    
    if (message) {
        let data = `${message}\n`;
        fs.appendFile('username.txt', data, (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).send('Internal Server Error');
            }
        });
    }
    res.redirect('/');
});

app.get('/', (req, res) => {
    fs.readFile('username.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(`
            <form id="messageForm" action="/" method="post">
                <input type="text" name="message" placeholder="Enter text">
                <button type="submit">Send</button>
            </form>
            <pre>${data}</pre>
            <script>
                document.getElementById('messageForm').onsubmit = function() {
                    var username = localStorage.getItem('username');
                    if (username) {
                        this.action = '/?username=' + encodeURIComponent(username);
                    }
                };
            </script>
        `);
    });
});

app.listen(7000, () => console.log('Server started running on port 7000...'));
