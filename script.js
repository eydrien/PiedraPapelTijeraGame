        // Game state
        let playerScore = 0;
        let botScore = 0;
        let ties = 0;

        // Choice mappings
        const choices = {
            rock: { emoji: '🗿', name: 'Piedra' },
            paper: { emoji: '📄', name: 'Papel' },
            scissors: { emoji: '✂️', name: 'Tijera' }
        };

        const choiceKeys = Object.keys(choices);

        // Game logic
        function getWinner(playerChoice, botChoice) {
            if (playerChoice === botChoice) {
                return 'tie';
            }
            
            const winConditions = {
                rock: 'scissors',
                paper: 'rock',
                scissors: 'paper'
            };
            
            return winConditions[playerChoice] === botChoice ? 'win' : 'lose';
        }

        function getBotChoice() {
            return choiceKeys[Math.floor(Math.random() * choiceKeys.length)];
        }

        function updateScore() {
            document.getElementById('player-score').textContent = playerScore;
            document.getElementById('bot-score').textContent = botScore;
            document.getElementById('ties').textContent = ties;
        }

        function playGame(playerChoice) {
            // Disable buttons during game
            const buttons = document.querySelectorAll('.choice-btn');
            buttons.forEach(btn => btn.classList.add('loading'));

            // Simulate thinking delay
            setTimeout(() => {
                const botChoice = getBotChoice();
                const result = getWinner(playerChoice, botChoice);

                // Update scores
                if (result === 'win') {
                    playerScore++;
                } else if (result === 'lose') {
                    botScore++;
                } else {
                    ties++;
                }

                // Update display
                displayResult(playerChoice, botChoice, result);
                updateScore();

                // Re-enable buttons
                buttons.forEach(btn => btn.classList.remove('loading'));
            }, 800);
        }

        function displayResult(playerChoice, botChoice, result) {
            // Hide initial message and show game display
            document.getElementById('initial-message').classList.add('hidden');
            document.getElementById('game-display').classList.remove('hidden');

            // Update choice displays
            document.getElementById('player-emoji').textContent = choices[playerChoice].emoji;
            document.getElementById('bot-emoji').textContent = choices[botChoice].emoji;

            // Add animation
            document.getElementById('player-emoji').classList.add('animate-choice');
            document.getElementById('bot-emoji').classList.add('animate-choice');

            // Update result message
            const resultElement = document.getElementById('result-message');
            let resultText, resultClass;

            switch (result) {
                case 'win':
                    resultText = `¡Ganaste! ${choices[playerChoice].name} vence a ${choices[botChoice].name}`;
                    resultClass = 'result-win';
                    break;
                case 'lose':
                    resultText = `¡Perdiste! ${choices[botChoice].name} vence a ${choices[playerChoice].name}`;
                    resultClass = 'result-lose';
                    break;
                case 'tie':
                    resultText = `¡Empate! Ambos eligieron ${choices[playerChoice].name}`;
                    resultClass = 'result-tie';
                    break;
            }

            resultElement.textContent = resultText;
            resultElement.className = `result-text ${resultClass}`;

            // Remove animation classes after animation completes
            setTimeout(() => {
                document.getElementById('player-emoji').classList.remove('animate-choice');
                document.getElementById('bot-emoji').classList.remove('animate-choice');
            }, 600);
        }

        function resetGame() {
            playerScore = 0;
            botScore = 0;
            ties = 0;
            
            updateScore();
            
            // Reset display
            document.getElementById('game-display').classList.add('hidden');
            document.getElementById('initial-message').classList.remove('hidden');
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const choiceButtons = document.querySelectorAll('.choice-btn');
            
            choiceButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const choice = this.getAttribute('data-choice');
                    playGame(choice);
                });
            });
            
            updateScore();
        });

        // API simulation for future backend integration
        async function playGameAPI(playerChoice) {
            try {
                // This would be your actual API call
                const response = await fetch('/api/play', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ playerChoice: playerChoice })
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error:', error);
                // Fallback to local game logic
                return {
                    botChoice: getBotChoice(),
                    result: getWinner(playerChoice, getBotChoice())
                };
            }
        }