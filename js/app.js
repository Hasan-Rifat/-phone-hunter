// search felid 

// error 
const searchNotFund = document.getElementById('search-not-found').style.display = 'none';
const phonNotAvailableError = document.getElementById('phone-not-available-error').style.display = 'none';

const allMobiles = async () => {
    const searchMobiles = document.getElementById('search-mobiles');
    const searchMobilesText = searchMobiles.value;
    // clear 
    searchMobiles.value = '';

    if (searchMobilesText === '' && searchMobilesText === Number) {
        const searchField = document.getElementById('search-not-found').style.display = 'block';
        alert('a')
        // console.log('first')
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchMobilesText}`;
        const res = await fetch(url);
        const data = await res.json()
        mobilesDisplay(data.data);
    }
}

const mobilesDisplay = mobiles => {
    const phoneCard = document.getElementById('phone-card');
    phoneCard.textContent = '';

    if (mobiles.length === 0 && typeof mobiles.length === '') {
        const phonNotAvailableError = document.getElementById('phone-not-available-error').style.display = 'block';
    } else {
        const phonNotAvailableError = document.getElementById('phone-not-available-error').style.display = 'none';
        mobiles.forEach(mobile => {
            // console.log(mobile.slug)
            const div = document.createElement('div');
            div.classList.add('col-md-4', 'mobile');
            div.innerHTML = `
        <div class="card">
            <img src="${mobile.image}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${mobile.phone_name}</h5>
                    <p class="card-text">${mobile.brand}</p>
                    <button onclick="phoneSlug('${mobile.slug}')" class="btn btn-primary">details</button>
            </div>
        </div>
        `;
            phoneCard.appendChild(div);
        });
    };
};

const phoneSlug = async id => {
    // const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    // const res = await fetch(url);
    // const data = await res.json()
    // displayPhoneDetails(data);
}

const displayPhoneDetails = phone => {
    console.log(phone)
}