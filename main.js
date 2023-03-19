fetch('data.json').then((response) => response.json()).then((json) => {

    const words = json.words;
    const arr = words.split('\n');

    const btn_create = document.querySelector('.btn-create');
    const wrapper_words = document.querySelector('.wrapper-words');

    btn_create.addEventListener('click', () => {
        let random_number = Math.floor(Math.random() * (1000 - 0) + 0);
        let random_word = arr[random_number];
        let splitted = random_word.split('');
        
        splitted.forEach(element => {
            let div = document.createElement('div');
            div.classList.add('guess-word-div');
            div.innerHTML = "<h5>" + element + "</h5>";
            console.log(div);
            wrapper_words.appendChild(div);
        });
        

    })
});

