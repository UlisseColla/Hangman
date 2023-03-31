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
    
    /* Tastiera e completamento parola*/
    let letters_p = document.querySelectorAll('.display-6');
    let letters = document.querySelectorAll('.letter');
    let word_to_check = [];
    let counter = 0;
    let checkCPU = true;
    let check_tastiera = false;
    let check_tastiera_btn = document.querySelector('#check_tastiera');
    let dismiss = document.querySelector('.dismiss');
    let info = document.querySelector('#info');
    let info_btn = document.querySelector('.info-btn');
    let dismiss_info = document.querySelector('.dismiss-info');
    let try_again = document.querySelector('#try_again');
    
    /* Scelta parola dalla lista */
    function random_word_create() {
        let random_number = Math.floor(Math.random() * (1000 - 0) + 0);
        random_word = arr[random_number];
        splitted = random_word.split('');
        return splitted, random_word;
    }
    
    /* Creazione parola da indovinare CPU */
    btn_create.addEventListener('click', () => {
        try_again.classList.remove('d-none');
        check_tastiera = true;
        /* Scomparsa bottone a seconda della modalità di gioco scelta */
        insert_col.classList.add('d-none');
        create_col.classList.add('d-none');
        
        random_word_create();
        
        if(check){
            
            splitted.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('guess-word-div', 'centered');
                div.innerHTML = "<h5 class=" + element + ">" + element + "</h5>";
                wrapper_words.appendChild(div);
            });
            
            check = false;
        } 
    })
    
    /* Comparsa modale inserimento parola */
    insert_btn.addEventListener('click', () => {
        insert.classList.toggle('d-none');
        insert_col.classList.add('d-none');
        create_col.classList.toggle('d-none');
    })
    
    /* Creazione parola tramite inserimento */
    btn_invia.addEventListener('click', () => {
        try_again.classList.remove('d-none');
        check_tastiera = true;
        
        if (containsSpecialChars(inserted_word.value) || inserted_word.value.split('').length >= 50) {
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
                    div.classList.add('guess-word-div', 'centered');
                    div.innerHTML = "<h5 class= " + element +  ">" + element + "</h5>";
                    wrapper_words.appendChild(div);
                } 
                 
            });
            
            return inserted_word_lc;
            
        }
        
    })
    
    /* Ricomincia */
    try_again.addEventListener('click', ()=> {
        try_again.classList.add('d-none');
        play_again();
    })
    
    /* Tasti dismiss */
    dismiss.addEventListener('click', () => {
        check_tastiera_btn.classList.add('d-none');
    })
    
    info_btn.addEventListener('click', () => {
        info.classList.remove('d-none');
    })
    
    dismiss_info.addEventListener('click', () => {
        info.classList.add('d-none');
    })
    
    
    letters.forEach((letter) => {
        
        letter.addEventListener('click', () => {
            
            if(!check_tastiera){
                check_tastiera_btn.classList.remove('d-none');
            } else {
                if(checkCPU){ /* Contro CPU */
                check_parola(letter.id, splitted);
            } else { /* Due giocatori */
            check_parola(letter.id, inserted_word_lc.split(''));
        }
    }
    
})

})

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
    try_again.classList.add('d-none');
    inserted_word.value = [];
    random_word = [];
    word_to_check = [];
    check = true;
    checkCPU = true;
    counter = 0;
    check_tastiera = false;
    
    hangman.forEach((element) => {
        element.classList.add('d-none');
    })
    
    /* Ricomponi tastiera senza teschi */
    letters_p.forEach((element) => {
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

/* Variabili hangman */
const structure = document.querySelector('.structure');
const structure_1 = document.querySelector('.structure-1');
const structure_1_1 = document.querySelector('.structure-1_1');
const head = document.querySelector('.head');
const body = document.querySelector('.hm-body');
const arms = document.querySelectorAll('.arms');
const legs = document.querySelectorAll('.legs');
const hangman = document.querySelectorAll('.hangman');


/* Logica check tasti */
function check_parola (letter, splitted_arr){
    /* Filtra array togliendo spazi vuoti */
    let splitted_arr_filtered = splitted_arr.filter(single_letter => single_letter !== ' ');
    
    if(splitted_arr_filtered.includes(letter)){
        let h5 = document.querySelectorAll('h5');
        h5.forEach((element) => {
            if(element.classList[0] == letter){
                element.style.opacity = "1";
                word_to_check.push(letter);
                console.log(splitted_arr);
                if(splitted_arr_filtered.length == word_to_check.length){
                    win_game();
                }
            } 
        })
    } else {
        wrong_letter(letter);
        counter++;
        
        /* Comparsa hangman */
        switch(counter){
            case 1:
            structure.classList.remove('d-none');
            break;
            case 2:
            structure_1.classList.remove('d-none');
            structure_1_1.classList.remove('d-none');
            break;
            case 3:
            head.classList.remove('d-none');
            break;
            case 4:
            body.classList.remove('d-none');
            break;
            case 5:
            arms.forEach((arm) => {
                arm.classList.remove('d-none');
            });
            break;
            case 6:
            legs.forEach((leg) => {
                leg.classList.remove('d-none');
            });
            break;
            default:
            break;
        }
        
        if (counter >= 6){
            lost_game();
        }
    }
}

/* Funzione parola sbagliata */
function wrong_letter(letter){
    letters_p.forEach((letter_to_check) => {
        if(letter_to_check.id == letter){
            letter_to_check.innerHTML = `<i class="fa-solid fa-skull-crossbones"></i>`;
        }
    })
}

/* Check per caratteri spaciali e numeri */
function containsSpecialChars(str) {
    const specialChars =
    /[`1!2@3#4$5%6^7&8*9()0_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

});

