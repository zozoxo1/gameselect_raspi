const fs = require('fs')
const { exec } = require('child_process')

const games = JSON.parse(fs.readFileSync('./games/games.json', 'utf-8'))

module.exports.stopAll = () => {

    games.forEach(element => {

        exec(element.commands['stop'], (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    });

}

module.exports.stop = (game) => {
    const my_game = games.find(element => element.game == game)

    exec(my_game.commands['stop'], (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

module.exports.start = (game) => {

    const my_game = games.find(element => element.game == game)
    
    exec(my_game.commands['start'], (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

}