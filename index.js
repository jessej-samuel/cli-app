const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fetch = require('node-fetch');

const about = async searchQuery =>
    await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json`)
        .then(res => res.json())
        .then(json => console.log('\n', chalk.cyan(String(json.query.search[0].snippet).replace(/<[^>]+>/g, ''))));

figlet.text('CodeR x JesseJ', 'Slant', (err, res) => {
    if (err) {
        console.error('Something is wrong...');
    }
    else {
        console.log(chalk.blueBright(res));
    }

    // Inquirer stuff

    inquirer.prompt(
        {
            type: 'input',
            name: 'query',
            message: 'What do you want to search for?',
            default: 'Jack Sparrow'
        }
    ).then(async answer => {
        console.log(chalk.greenBright(`${answer.query}`));
        let result = await about(answer.query);
    })
});