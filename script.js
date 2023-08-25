$(document).ready(function() {
    let score = 0;
    let currentLevel = 0;
    let maxLevelChange = 15;
    let currentOperators = ['+', '-']; // Operadores padrão para o nível fácil
    let previousCalculation = null;
    let calculationsStarted = false;

    function generateCalculation() {
        const operator = currentOperators[Math.floor(Math.random() * currentOperators.length)];
        let num1, num2;

        if (currentLevel === maxLevelChange) {
            num1 = Math.floor(Math.random() * 21); // Gerar de 0 a 20
            num2 = (num1 % 2 === 0) ? Math.floor(Math.random() * 10) * 2 : Math.floor(Math.random() * 5) * 2 + 1;
        } else {
            num1 = Math.floor(Math.random() * 11) + 10; // Gerar de 10 a 20
            num2 = Math.floor(Math.random() * 11) + 1; // Gerar de 1 a 10
        }

        if (operator === '/' && num1 % num2 !== 0) {
            // Se a divisão não for exata, ajusta num1 para que seja
            num1 -= num1 % num2;
        }

        if (operator === '*' && num1 * num2 > 150) {
            // Se a multiplicação exceder 150, ajusta num2 para que o resultado seja <= 150
            num2 = Math.floor(150 / num1);
        }

        const calculation = {
            equation: `${num1} ${operator} ${num2}`,
            result: eval(`${num1} ${operator} ${num2}`)
        };

        previousCalculation = calculation;
        return calculation;
    }

    function showNewCalculation() {
        const equationElement = $('#equation');
        const calculation = generateCalculation();
        equationElement.text(calculation.equation);

        const characterContainer = $('.character-equation-container');
        characterContainer.css('animation', '');

        if (currentLevel === maxLevelChange) {
            $('#character').attr('src', 'https://i.pinimg.com/originals/0e/4d/60/0e4d6062d1bd7d7a077739f68be05ccd.gif');
            $('body').css('background-image', 'url(https://1.bp.blogspot.com/-PQw48UeOtJA/XuJqya6BIlI/AAAAAAAAdHk/155rmOM6bDgSg6653mp1CnOQO4tWcSUagCLcBGAsYHQ/s1600/skelattack-02.jpg)');
        } else {
            $('#character').attr('src', 'https://i.pinimg.com/originals/75/33/ef/7533efc41868dd51bfd202bd4eb83826.gif');
            $('body').css('background-image', 'url(https://st3.depositphotos.com/5590000/12784/v/450/depositphotos_127844876-stock-illustration-cartoon-vector-nature-landscape-background.jpg)');
        }
    }

    function updateLevelEmoji() {
        let levelEmoji = '&#x1F630;'; // Emoji padrão para 0 acertos

        if (score >= 3 && score < 5) {
            levelEmoji = '&#x1F642;';
        } else if (score >= 5 && score < 10) {
            levelEmoji = '&#x1F603;';
        } else if (score >= 10 && score < 15) {
            levelEmoji = '&#x1F60F;';
        } else if (score >= 15) {
            levelEmoji = '&#x1F451;';
            currentLevel = 15;
        }

        $('#score-value').text(score);
        $('#level-emoji').html(levelEmoji + ' ');
    }

    function checkAnswer() {
        if (!calculationsStarted) {
            return;
        }

        const answerInput = $('#answer');
        const userAnswer = answerInput.val();
        const equationElement = $('#equation');
        const calculation = eval(equationElement.text());

        if (userAnswer === calculation.toString()) {
            $('#message').text('Parabéns, Resposta correta! +1 ponto');
            score++;
            updateLevelEmoji();
        } else {
            $('#message').text('Resposta Errada, score zerado!');
            score = 0;
            updateLevelEmoji();
        }

        answerInput.val('');
        showNewCalculation();
    }

    $('#easy-btn').click(function() {
        currentLevel = 0;
        currentOperators = ['+', '-'];
        previousCalculation = null;
        calculationsStarted = true;
        showNewCalculation();
        $('#message').text(''); // Limpa a mensagem ao iniciar os cálculos
    });

    $('#medium-btn').click(function() {
        currentLevel = 0;
        currentOperators = ['+', '-', '*'];
        previousCalculation = null;
        calculationsStarted = true;
        showNewCalculation();
        $('#message').text(''); // Limpa a mensagem ao iniciar os cálculos

        // Change the background image for medium difficulty
        $('body').css('background-image', 'url(https://img.freepik.com/vetores-premium/fundo-de-jogo-de-noite-dos-desenhos-animados_54887-12.jpg)');
    });

    $('#hard-btn').click(function() {
        currentLevel = maxLevelChange;
        currentOperators = ['/', '*'];
        previousCalculation = null;
        calculationsStarted = true;
        showNewCalculation();
        $('#message').text(''); // Limpa a mensagem ao iniciar os cálculos
    });

    const answerInput = $('#answer');
    answerInput.on('keyup', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    showNewCalculation();
});
