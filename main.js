fetch('data.json').then((response) => response.json()).then((json) => {
    
    /* File lista parole */
    const words = json.words;
    const arr = words.split('\n');
    
    /* Lista parole */
    const btn_create = document.querySelector('.btn-create');
    const wrapper_words = document.querySelector('.wrapper-words');
    
    /* Bottoni */
    let btn_play_again = document.querySelectorAll('.btn-play-again');
    let btn_invia = document.querySelector('#btn_invia');
    /* Schermate win e lost */
    let win = document.querySelector('#win');
    let lost = document.querySelector('#lost');
    let missedWord = document.querySelector('#missedWord');
    /* Inserimento parola */
    let insert_col = document.querySelector('#insert_col');
    let create_col = document.querySelector('#create_col');
    let insert = document.querySelector('#insert');
    let insert_btn = document.querySelector('#insert_btn');
    let inserted_word = document.querySelector('#inserted_word');
    let inserted_word_lc;
    let check = true;   
    let banner_spec_char = document.querySelector('#banner_spec_char');
    let splitted = [];
    let random_word;
    
    /* Scelta parola dalla lista */
    function random_word_create() {
        let random_number = Math.floor(Math.random() * (1000 - 0) + 0);
        random_word = arr[random_number];
        splitted = random_word.split('');
        return splitted, random_word;
    }
    
    /* Creazione parola da indovinare CPU */
    btn_create.addEventListener('click', () => {
        /* Scomparsa bottone a seconda della modalità di gioco scelta */
        insert_col.classList.toggle('d-none');
        
        random_word_create();
        
        if(check){
            
            splitted.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('guess-word-div');
                div.innerHTML = "<h5 class=" + element +  ">" + element + "</h5>";
                wrapper_words.appendChild(div);
            });
            
            check = false;
        } 
    })
    
    
    /* Comparsa modale inserimento parola */
    insert_btn.addEventListener('click', () => {
        insert.classList.toggle('d-none');
        create_col.classList.toggle('d-none');
    })
    
    
    /* Creazione parola tramite inserimento */
    btn_invia.addEventListener('click', () => {
        
        if (containsSpecialChars(inserted_word.value)) {
            banner_spec_char.classList.remove('d-none');
        } else {
            banner_spec_char.classList.add('d-none');
            checkCPU = false;
            insert.classList.toggle('d-none');
            inserted_word_lc = inserted_word.value.toLowerCase();
            
            inserted_word_lc.split('').forEach((element, i) => {
                
                let div = document.createElement('div');
                
                if(inserted_word_lc.split('')[i] == ' '){
                    div.classList.add('guess-word-no-border');
                    wrapper_words.appendChild(div);
                } else {
                    div.classList.add('guess-word-div');
                    div.innerHTML = "<h5 class=" + element +  ">" + element + "</h5>";
                    wrapper_words.appendChild(div);
                } 
                
                
            });
            
            return inserted_word_lc;

        }
        
    })
    
    /* Tastiera e completamento parola*/
    let letters = document.querySelectorAll('.display-6');
    let word_to_check = [];
    let counter = 0;
    let checkCPU = true;
    
    letters.forEach((letter) => {
        
        letter.addEventListener('click', () => {
            
            if(checkCPU){ /* Contro CPU */
            check_parola(letter, splitted);
        } else { /* Due giocatori */
        check_parola(letter, inserted_word_lc.split(''));
    }
    
})

})


/* Funzione parola sbagliata */
function wrong_letter(letter){
    letter.innerHTML = `<i class="fa-solid fa-skull-crossbones"></i>`;
}

/* Funzione vittoria */
function win_game() {
    win.classList.remove("d-none");
}

/* Funzione sconfitta */
function lost_game() {
    lost.classList.remove('d-none');
    missedWord.innerText = "La parola era: " + (checkCPU? random_word : inserted_word.value); 
}

/* Funzione gioca ancora */
function play_again() {
    win.classList.add("d-none");
    lost.classList.add('d-none');
    create_col.classList.remove('d-none');
    insert_col.classList.remove('d-none');
    inserted_word.value = [];
    random_word = [];
    word_to_check = [];
    check = true;
    checkCPU = true;
    counter = 0;
    
    /* Ricomponi tastiera senza teschi */
    letters.forEach((element) => {
        element.innerHTML = `<p class="display-6 p-0 m-0">` + element.id + "</p>";
    })
    
    /* Rimouvi parola */
    let remove_words_cpu = document.querySelectorAll('.guess-word-div');
    let remove_words_spaces = document.querySelectorAll('.guess-word-no-border');
    
    remove_words_cpu.forEach((word) => {
        word.remove();
    })
    
    remove_words_spaces.forEach((word) => {
        word.remove();
    })
}

btn_play_again.forEach((element) => {
    element.addEventListener('click', () => {
        play_again();
    })
})


/* Logica check tasti */
function check_parola (letter, splitted_arr){
    /* Filtra array togliendo spazi vuoti */
    let splitted_arr_filtered = splitted_arr.filter(single_letter => single_letter !== ' ');
    
    if(splitted_arr_filtered.includes(letter.innerText)){
        let h5 = document.querySelectorAll('h5');
        h5.forEach((element) => {
            if(element.classList[0] == letter.innerText){
                element.style.opacity = "1";
                word_to_check.push(letter.innerText);
                console.log(splitted_arr);
                if(splitted_arr_filtered.length == word_to_check.length){
                    win_game();
                }
            } 
        })
    } else {
        wrong_letter(letter);
        counter++;
        if (counter >= 6){
            lost_game();
        }
    }
}

/* Check per caratteri spaciali e numeri */
function containsSpecialChars(str) {
    const specialChars =
    /[`1!2@3#4$5%6^7&8*9()0_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

});

