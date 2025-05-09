document.getElementById('orderForm').addEventListener('submit', function (e) {
    let valid = true;

    const mezok = [
        {
            elem: document.getElementById('nev'),
            feltetel: value => value.length >= 8 && value.length <= 30,
            uzenet: 'A név 8–30 karakter hosszú legyen!'
        },
        {
            elem: document.getElementById('email'),
            feltetel: value => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value),
            uzenet: 'Hibás e-mail cím!'
        },
        {
            elem: document.getElementById('darab'),
            feltetel: value => !isNaN(value) && value >= 1 && value <= 10,
            uzenet: 'A darabszám 1 és 10 közötti szám legyen!'
        }
    ];

    const napElem = document.getElementById('nap');

    // Hibák törlése
    mezok.forEach(({ elem }) => {
        elem.style.backgroundColor = '';
        const hiba = document.querySelector(`#hiba-${elem.id}`);
        if (hiba) hiba.remove();
    });

    const mutatHibat = (mezo, uzenet) => {
        const hiba = document.createElement('div');
        hiba.id = 'hiba-' + mezo.id;
        hiba.style.color = 'red';
        hiba.style.fontSize = '0.9em';
        hiba.textContent = uzenet;
        mezo.parentNode.appendChild(hiba);
        mezo.style.backgroundColor = '#f99';
        valid = false;
    };

    // Mezők ellenőrzése
    mezok.forEach(({ elem, feltetel, uzenet }) => {
        const value = elem.value.trim();
        if (!feltetel(value)) {
            mutatHibat(elem, uzenet);
        }
    });

    // Nap ellenőrzés
    const napHiba = document.querySelector('#hiba-nap');
    if (napHiba) napHiba.remove();

    if (napElem.value === "") {
        const hiba = document.createElement('div');
        hiba.id = 'hiba-nap';
        hiba.style.color = 'red';
        hiba.style.fontSize = '0.9em';
        hiba.textContent = 'Válassz egy napot!';
        napElem.parentNode.appendChild(hiba);
        napElem.style.backgroundColor = '#f99';
        valid = false;
    } else {
        napElem.style.backgroundColor = '';
    }

    if (!valid) e.preventDefault();
});
