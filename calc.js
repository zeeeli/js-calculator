const activeDisplay = document.querySelector('#active');
const buttons = document.querySelectorAll('#buttons > button');

function add(a, b) {return a + b;}
function sub(a, b) {return a - b;}
function mul(a, b) {return a * b;}
function div(a, b) {return a / b;}

function operate(operator, a , b){
    switch (operator) {
        case '+':
            add(a, b);
            break;
        case '-':
            sub(a, b);
            break;
        case '*':
            mul(a, b);
            break;
        case '/':
            div(a, b);
            break;
        default:
            break;
    }
}

function equalityHandler(){
    const nonNumerics = ['+', '-', 'x', '÷'];
    let operator, newString, a, b;
    
    // get the active operator
    for (let i = 0; i < nonNumerics.length; i++) {
        const element = nonNumerics[i];
        if (activeDisplay.textContent.includes(element)) {
            operator = element;
        }        
    }
    
    // split string to have both operands
    newString = activeDisplay.textContent.replaceAll(' ', '');
    [a, b] = newString.split(operator);
    console.log(a);
    console.log(b);
    
    


}

function displayActiveInput(input){
    const nonNumerics = ['+', '-', 'x', '÷'];
    if (!isNaN(input)) {

        // limit size of display number before using scientific notation
        if (Number(activeDisplay.textContent) >= 1.0e10){
            activeDisplay.textContent = Number(activeDisplay.textContent).toExponential(2);;
            return;
        }

        // set input character limit to 10 and replace 10th value with every new input
        if (activeDisplay.textContent.length >= 14) {
            return;
        }

        if (activeDisplay.textContent === '0' && activeDisplay.textContent.length === 1) {
            activeDisplay.textContent = input;
        }else{
            activeDisplay.textContent+=input;
        }
        
    }else {
        switch (input) {
            case '.':
                if(!activeDisplay.textContent.includes('.')){
                    activeDisplay.textContent+=input;
                }
                break;

            case 'C':
                clearCalculator();
                break;

            case 'DEL':
                // delete full scientific notation when present
                if (activeDisplay.textContent.includes('e')) {
                    activeDisplay.textContent = activeDisplay.textContent.split('e')[0];
                }

                // delete operator (w/ whitespace) when present
                if(activeDisplay.textContent.charAt(activeDisplay.textContent.length - 1) === ' '){
                    activeDisplay.textContent = activeDisplay.textContent.slice(0, -2);
                }

                // delete last character in activeDisplay
                activeDisplay.textContent = activeDisplay.textContent.slice(0, -1);

                //check if activeDisplay is empty after deletion operation and replace empty string with '0'
                if (activeDisplay.textContent.length === 0) {activeDisplay.textContent  = '0';}

                break;

            case '+/-':
                if (activeDisplay.textContent.charAt(0) === '-') {
                    activeDisplay.textContent = activeDisplay.textContent.slice(1);
                }else{
                    activeDisplay.textContent = '-' + activeDisplay.textContent;
                }
                break;

            case '÷':
            case 'x':
            case '-':
            case '+':
                // don't allow multiple operations to be inputted on activeDisplay
                for (let i = 0; i < nonNumerics.length; i++) {
                    if (activeDisplay.textContent.includes(nonNumerics[i])) {return;}
                }          
                activeDisplay.textContent += (' ' + input + ' ');
                break;

            case '=':
                equalityHandler();
                break;
            default:
                break;
        }
    }
    // console.log(activeDisplay.textContent)
}





let input;

buttons.forEach(button => button.addEventListener('click', () => {
    input = button.textContent;
    displayActiveInput(input);
}));