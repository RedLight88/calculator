const btn = document.querySelector('.open');
btn.addEventListener('click', function(){
    this.remove();
    rendCalculator();
});

function rendCalculator(){
    let divCalc = document.createElement('div');
    divCalc.className = 'calculator';
    document.body.appendChild(divCalc);

   
    let divBtns = document.createElement('button');
    divBtns.className = 'clear';
    divBtns.textContent = 'Clear';  
    divCalc.appendChild(divBtns);

    let newDiv = document.createElement('div');
    newDiv.className = 'buttons';
    divCalc.appendChild(newDiv)


    for (let i = 0; i < 9; i++){
        let button = document.createElement('button');
        button.className = 'btns';
        button.textContent = '' + (i+1);
        newDiv.appendChild(button);

    }
}
