// import {series} from 'async';
const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/accounts', async (req, res) => {

    let hardhatResults

    await exec("npx hardhat accounts", (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        if (stdout) {
            hardhatResults = stdout
            
        }
        else if (stderr) {
            hardhatResults = stderr
        }
        else {
            hardhatResults = `exec error: ${err}`
        }

        let outStr = "<div><h1>Hardhat Script Results:</h1>"

        addresses = stdout.split("\n")

        console.log(addresses);

        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            outStr += `<p>${address}</p>`
        }

        outStr += "</div>"


        res.send(outStr);
    })
});

app.get('/', (req, res) => {

    res.send("Try adding /accounts to the route...");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Hardhat: listening on port ${port}`);
});