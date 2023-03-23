fetch('data.json').then((response) => response.json()).then((json) => {
    
    const words = json.words;
    const arr = words.split('\n');
    
    /* Lista parole */
    const btn_create = document.querySelector('.btn-create');
    const wrapper_words = document.querySelector('.wrapper-words');
    
    let btn_invia = document.querySelector('#btn_invia');
    let win = document.querySelector('#win');
    let lost = document.querySelector('#lost');
    let insert = document.querySelector('#insert');
    let missedWord = document.querySelector('#missedWord');
    let insert_btn = document.querySelector('#insert_btn');
    let inserted_word = document.querySelector('#inserted_word');
    let check = true;
    let random_number = Math.floor(Math.random() * (1000 - 0) + 0);
    let random_word = arr[random_number];
    let splitted = random_word.split('');
    let insert_col = document.querySelector('#insert_col');
    let create_col = document.querySelector('#create_col');
    let btn_play_again = document.querySelectorAll('.btn-play-again');
    
    /* Creazione parola da indovinare CPU */
    btn_create.addEventListener('click', () => {
        /* Scomparsa bottone a seconda della modalità di gioco scelta */
        insert_col.classList.toggle('d-none');
        
        if(check){
            
            splitted.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('guess-word-div');
                console.log(div);
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
        checkCPU = false;
        insert.classList.toggle('d-none');
        console.log(inserted_word.value.split(''));
        
        inserted_word.value.split('').forEach((element, i) => {
            
            let div = document.createElement('div');
            
            if(inserted_word.value.split('')[i] == ' '){
                div.classList.add('guess-word-no-border');
                wrapper_words.appendChild(div);
            } else {
                console.log(div);
                div.classList.add('guess-word-div');
                div.innerHTML = "<h5 class=" + element +  ">" + element + "</h5>";
                wrapper_words.appendChild(div);
            } 
            
        });
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
        check_parola(letter, inserted_word.value.split(''));
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
    missedWord.innerText = "La parola è: " + random_word;
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


});

