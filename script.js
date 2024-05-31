(function () {
    const playerName = (function createPlayer() {
        const newPlayer = document.querySelector('nav>button');
        const newPlayerName = document.querySelector('.player>.name');
        const newPlayerProfile = document.querySelector('.player>.profile>img');
        const dialog = document.querySelector('dialog');
        const cancel = dialog.querySelector('.cancel');
        const nameInput = dialog.querySelector('#Name');
        const profileInput = dialog.querySelector('#Profile');
        const submit = dialog.querySelector('form>input');

        function clearDialog() {
            nameInput.value = '';
            nameInput.classList.remove('inValid');
            profileInput.value = '';
            dialog.close();
        }

        newPlayer.addEventListener('click', () => dialog.showModal());
        nameInput.addEventListener('input', () => {
            nameInput.classList.remove('inValid');
        })
        cancel.addEventListener('click', () => {
            clearDialog();
        });
        submit.addEventListener('click', event => {
            if (!(nameInput.value)) {
                event.preventDefault();
                nameInput.classList.add('inValid');
            } else {
                newPlayerName.textContent = nameInput.value;
                const image = profileInput.files[0];
                if (image) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        newPlayerProfile.src = e.target.result;
                    };
                    reader.readAsDataURL(image);
                }
                clearDialog();
            }
        })
        return (newPlayerName.textContent);
    })();

    function chessPlayer(name, choice) {
        const boardArr = [];
        return { name, choice, boardArr };
    }
    const player = chessPlayer(playerName, 'X');
    const bot = chessPlayer('Bot', 'O');

    const gameController = (function () {
        const gameBoard = document.querySelector('.gameBoard');
        const board = gameBoard.querySelector('.board');
        const score = gameBoard.querySelector('.score');
        const buttonX = gameBoard.querySelector('button[value="buttonX"]');
        const buttonO = gameBoard.querySelector('button[value="buttonO"]');
        let gameEndFlag = false;

        function initializeGame() {
            gameEndFlag = false;
            while (board.firstChild) {
                board.removeChild(board.firstChild);
            }
            for (i = 0; i <= 8; i++) {
                const button = document.createElement('button');
                button.value = '';
                button.id = i;
                board.appendChild(button);
            }
            board.querySelectorAll('button').forEach(button => button.disabled = false);
            buttonX.classList.add('chosen');
            buttonO.classList.remove('chosen');
            player.choice = 'X';
            bot.choice = 'O';
            score.textContent = '';
            player.boardArr.length = 0;
            bot.boardArr.length = 0;
        };

        function toggleXO(value) {
            initializeGame();
            if (value == 'buttonX') {
                buttonX.classList.add('chosen');
                buttonO.classList.remove('chosen');
                player.choice = 'X';
                bot.choice = 'O';
            } else {
                buttonO.classList.add('chosen');
                buttonX.classList.remove('chosen');
                player.choice = 'O';
                bot.choice = 'X';
                botMove();
            }
        }

        function checkForWinner(chess) {
            const victoryCase = [
                ['0', '1', '2'],
                ['3', '4', '5'],
                ['6', '7', '8'],
                ['0', '3', '6'],
                ['1', '4', '7'],
                ['2', '5', '8'],
                ['0', '4', '8'],
                ['2', '4', '6']
            ];
            for (let i = 0; i < 8; i++) {
                gameEndFlag = victoryCase[i].every(element => chess.boardArr.includes(element));
                if (gameEndFlag) {
                    board.querySelectorAll('button').forEach(button => button.disabled = true);
                    score.textContent = `The winner is ${chess.name}!!!`;
                    return (chess.name);
                }
            }
            if (player.boardArr.length + bot.boardArr.length == 9) {
                gameEndFlag = true;
                board.querySelectorAll('button').forEach(button => button.disabled = true);
                score.textContent = `It's a tie!`;
                return ('tie');
            }
        }

        function botMove() {
            const emptyValueButtons = board.querySelectorAll('button[value=""]');
            const randomNumber = Math.floor(Math.random() * (emptyValueButtons.length));
            const chosenButton = emptyValueButtons[randomNumber];
            chosenButton.value = bot.choice;
            chosenButton.textContent = bot.choice;
            bot.boardArr.push(chosenButton.id);
        }

        gameBoard.addEventListener('click', event => {
            const target = event.target;
            if (target.value == 'refresh') {
                initializeGame();
            } else if (target.value == 'buttonX' || target.value == 'buttonO') {
                toggleXO(target.value);
            } else if (target.value == '' && !gameEndFlag) {
                player.boardArr.push(target.id);
                target.value = player.choice;
                target.textContent = player.choice;
                checkForWinner(player);
                if (!gameEndFlag) {
                    botMove();
                    checkForWinner(bot);
                }
            }
        })
    })();
})();
