// import {series} from 'async';
const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/vitaliks_eth', async (req, res) => {

    let hardhatResults

    await exec("npx hardhat get_vb_balance", (err, stdout, stderr) => {
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
        outStr += `<p>${hardhatResults}</p></div>`


        res.send(outStr);
    })
});

app.get('/', (req, res) => {

    res.send("Try adding /vitaliks_eth to the route...");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Hardhat: listening on port ${port}`);
});