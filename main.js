fetch('data.json').then((response) => response.json()).then((json) => {
    
    const words = json.words;
    const arr = words.split('\n');
    
    /* Lista parole */
    const btn_create = document.querySelector('.btn-create');
    const wrapper_words = document.querySelector('.wrapper-words');
    
    let check = true;
    let random_number = Math.floor(Math.random() * (1000 - 0) + 0);
    let random_word = arr[random_number];
    let splitted = random_word.split('');
    
    /* Creazione parola da indovinare */
    btn_create.addEventListener('click', () => {
        if(check){
            
            splitted.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('guess-word-div');
                console.log(div);
                div.innerHTML = "<h5 class=" + element +  ">" + element + "</h5>";
                console.log(splitted);
                wrapper_words.appendChild(div);
            });
            
            check = false;
        } 
    })

    /* Tastiera */
    let letters = document.querySelectorAll('.display-6');
    let word_to_check = [];
    
    letters.forEach((letter) => {
        letter.addEventListener('click', () => {
            if(splitted.includes(letter.innerText)){
                word_to_check.push(letter.innerText);
                let h5 = document.querySelectorAll('h5');
                console.log(h5);
                h5.forEach((element) => {
                    if(element.classList[0] == letter.innerText){
                        element.style.opacity = "1";
                    } else {
                        console.log('nope');
                    }
                })
                
                
            } else {
                console.log('nope');
            }
        })
    })
    
    
});

