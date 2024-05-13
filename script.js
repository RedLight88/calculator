const btn = document.querySelector('.open');
btn.addEventListener('click', function(){
    this.remove();
    rendCalculator();
});

let resultDisplay;  // Declare resultDisplay at a higher scope

function rendCalculator() {
    let divCalc = document.createElement('div');
    divCalc.className = 'calculator';
    document.body.appendChild(divCalc);

    let topBar = document.createElement('div');
    topBar.className = 'top-bar';
    divCalc.appendChild(topBar);

    let divBtns = document.createElement('button');
    divBtns.className = 'clear';
    divBtns.textContent = 'Clear';
    topBar.appendChild(divBtns);
    divBtns.addEventListener('click', function() {
        resultDisplay.textContent = 'Result: 0';  // Reset the display on clear
    });

    let equalBtn = document.createElement('button');
    equalBtn.className = 'btn equal';
    equalBtn.textContent = '=';
    topBar.appendChild(equalBtn);
    equalBtn.addEventListener('click', calculateResult);  // Properly reference the function without calling it

    resultDisplay = document.createElement('div');  // Initialize resultDisplay here
    resultDisplay.className = 'result-display';
    resultDisplay.textContent = 'Result: 0';
    divCalc.appendChild(resultDisplay);

    let buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';
    divCalc.appendChild(buttonsDiv);

    let numButtonsDiv = document.createElement('div');
    numButtonsDiv.className = 'num-buttons';
    buttonsDiv.appendChild(numButtonsDiv);

    for (let i = 1; i <= 9; i++) {
        let button = document.createElement('button');
        button.className = 'btns';
        button.textContent = i.toString();
        numButtonsDiv.appendChild(button);
        button.addEventListener('click', function() {
            if (resultDisplay.textContent === 'Result: 0') {
                resultDisplay.textContent = 'Result: ' + button.textContent;
            } else {
                resultDisplay.textContent += button.textContent;
            }
        });
    }

    let opButtonsDiv = document.createElement('div');
    opButtonsDiv.className = 'op-buttons';
    buttonsDiv.appendChild(opButtonsDiv);

    ['+', '-', '*', '/'].forEach(op => {
        let button = document.createElement('button');
        button.className = 'btn';
        button.textContent = op;
        opButtonsDiv.appendChild(button);
        button.addEventListener('click', function() {
            resultDisplay.textContent += ' ' + button.textContent + ' ';
        });
    });
}

// ///////////////////////////////////////////////////////////

function calculateResult() {
   
    let displayContent = resultDisplay.textContent.replace('Result: ', '').trim();
    if (!displayContent) return;

    // Split the input 
    const tokens = displayContent.split(/\s+/);
    const operators = [];
    const values = [];

    function applyOperator(operator, b, a) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b ;
            default: return b; // if no operator matches
        }
    }

    function getPrecedence(op) {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        return 0;
    }

    // Process each token and store them in a stack
    tokens.forEach(token => {
        if (!isNaN(parseFloat(token))) {
            values.push(parseFloat(token));
        } else {
            while (operators.length !== 0 && getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)) {
                const val2 = values.pop();
                const val1 = values.pop();
                const op = operators.pop();
                values.push(applyOperator(op, val2, val1));
            }
            operators.push(token);
        }
    });
s
    while (operators.length !== 0) {
        const val2 = values.pop();
        const val1 = values.pop();
        const op = operators.pop();
        values.push(applyOperator(op, val2, val1));
    }

    
    resultDisplay.textContent = 'Result: ' + values.pop();
}

















