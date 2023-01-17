const activeDisplay = document.querySelector('#active');
const storedDisplay = document.querySelector('#stored');
const buttons = document.querySelectorAll('#buttons > button');
const nonNumerics = ['+', '-', 'x', '÷'];

function add(a, b) {return a + b;}
function sub(a, b) {return a - b;}
function mul(a, b) {return a * b;}
function div(a, b) {return a / b;}

function operate(operator, a , b){
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = sub(a, b);
            break;
        case 'x':
            result = mul(a, b);
            break;
        case '÷':
            result = div(a, b);
            break;
        default:
            break;
    }
    return result;
}

function equalityHandler(){
    let operator, newString, a, b, result;
    
    // display value in the storedDisplay
    storedDisplay.textContent = activeDisplay.textContent + ' =';

    // get the active operator
    for (let i = 0; i < nonNumerics.length; i++) {
        const element = nonNumerics[i];
        if (activeDisplay.textContent.slice(1).includes(element)) {
            operator = element;
        }        
    }

    if (operator === undefined) {
        result = activeDisplay.textContent;
        result = Number(result).toFixed(2);
        result = result.replace(/\.00$/, '');
        activeDisplay.textContent = result;
        return;
    }else{

        // split string to have both operands
        newString = activeDisplay.textContent.replaceAll(' ', '');
        [a, b] = newString.split(operator);
        a = Number(a);
        b = Number(b);

        // get and display result of operation
        result = operate(operator, a, b);
        result = Number(result).toFixed(2);
        result = result.replace(/\.00$/, '');
        activeDisplay.textContent = result;
    }
    

}

function decimalHandler(input){
    let activeOperation = null;
    for (let i = 0; i < nonNumerics.length; i++) {
        if (activeDisplay.textContent.slice(1).includes(nonNumerics[i])) {
            activeOperation = nonNumerics[i];
        }
    }   
    if(!activeDisplay.textContent.includes('.')){
        activeDisplay.textContent+=input;
    }else if (activeOperation !== null) {
        if (!activeDisplay.textContent.split(activeOperation)[1].includes('.')) {
            activeDisplay.textContent+=input;                        
        }
    }

}

function deleteHandler(){

    // delete operator (w/ whitespace) when present
    if(activeDisplay.textContent.charAt(activeDisplay.textContent.length - 1) === ' '){
        activeDisplay.textContent = activeDisplay.textContent.slice(0, -2);
    }

    // delete last character in activeDisplay
    activeDisplay.textContent = activeDisplay.textContent.slice(0, -1);

    //check if activeDisplay is empty after deletion operation and replace empty string with '0'
    if (activeDisplay.textContent.length === 0) {activeDisplay.textContent  = '0';}
}

function plusMinusHandler(){
    if (activeDisplay.textContent.charAt(0) === '-') {
        activeDisplay.textContent = activeDisplay.textContent.slice(1);
    }else if (activeDisplay.textContent.charAt(0) === '0') {
        return;
    }else{
        activeDisplay.textContent = '-' + activeDisplay.textContent;
    }
}

function operatorHandler(input){
    // don't allow multiple operations to be inputted on activeDisplay except for prefix '-'
    for (let i = 0; i < nonNumerics.length; i++) {
        if (activeDisplay.textContent.slice(1).includes(nonNumerics[i])) {
            equalityHandler();
            activeDisplay.textContent += (' ' + input + ' ')
            return;
        }
    }      
    activeDisplay.textContent += (' ' + input + ' ');
}

function clearCalculator(){
    activeDisplay.textContent = '0';
    storedDisplay.textContent = '';
}

function displayActiveInput(input){
    if (!isNaN(input)) {
        // set input character limit to 10 and replace 10th value with every new input
        if (activeDisplay.textContent.length >= 14) {
            return;
        }

        // replace default 0 with input rather then appending the input
        if (activeDisplay.textContent === '0' && activeDisplay.textContent.length === 1) {
            activeDisplay.textContent = input;
        }else{
            activeDisplay.textContent+=input;
        }

    }else {
        switch (input) {
            case '.':
                decimalHandler(input);
                break;

            case 'C':
                clearCalculator();
                break;

            case 'DEL':
                deleteHandler();
                break;

            case '+/-':
                plusMinusHandler();
                break;

            case '÷':
            case 'x':
            case '-':
            case '+':
                operatorHandler(input);
                break;

            case '=':
                equalityHandler();
                break;

            default:
                break;
        }
    }
}

window.onload = () => {
    let input;
    buttons.forEach(button => button.addEventListener('click', () => {
        input = button.textContent;
        displayActiveInput(input);
    }));

    document.addEventListener('keyup', (event) => {
        let target = event.keyCode;
        keyMap = { 96:  '0', 97:  '1', 98:  '2', 99:  '3', 100: '4',
                   101: '5', 102: '6', 103: '7', 104: '8', 105: '9',
                   106: 'x', 107: '+', 109: '-', 110: '.', 111: '÷',
                   13:  '=', 61:  '=', 8: 'DEL', 67: 'C', 80: '+/-',
                   68:  '÷',
        }
        input = keyMap[target];
        displayActiveInput(input);
    })
}