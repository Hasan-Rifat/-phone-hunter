// search felid 


const allMobiles = async () => {
    const searchMobiles = document.getElementById('search-mobiles');
    const searchMobilesText = searchMobiles.value;
    // clear 
    searchMobiles.value = '';
    const mobileBox = document.getElementById('mobileBox');
    mobileBox.textContent = '';
    if (searchMobilesText === '') {
        alert('Your writing incorrectly')
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchMobilesText}`;
        const res = await fetch(url);
        const data = await res.json()
        mobilesDisplay(data.data.slice(0, 20));
    }
}

const mobilesDisplay = mobiles => {
    const phoneCard = document.getElementById('phone-card');
    phoneCard.textContent = '';
    console.log(mobiles)
    if (mobiles[0] == null) {
        const div = document.createElement('div');
        div.classList.add('col', 'mobile');
        div.innerHTML = `
        <div class="card">
            <div class="card-body">
                    <h5 class="card-title">sorry this mobile are not Available</h5>
            </div>
        </div>
        `;
        phoneCard.appendChild(div);
    } else {
        mobiles.forEach(mobile => {
            // console.log(mobile.slug)
            const div = document.createElement('div');
            div.classList.add('col-md-4', 'mobile');
            div.innerHTML = `
        <div class="p-4 card rounded-3">
        <img src="${mobile.image}" class="card-img-top images" alt="...">
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
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const mobileBox = document.getElementById('mobileBox');
    mobileBox.textContent = '';
    console.log(phone)
    const div = document.createElement('div');
    div.classList.add('row', 'mobile');
    div.innerHTML = `
    <div class="col-md-6">
            <img src="${phone.image}" class="card-img-top images" alt="...">
    </div>
    <div class="col-md-6">
        <div class="p-4 card rounded-3">
            <div class="card-body">
                <h1 class="card-title">Brand: ${phone.brand}</h1>
                <h1 class="card-title">Name: ${phone.name}</h1>
                <p class="card-text"><strong>Release Date:</strong> ${phone.releaseDate}</p>
                <h1>Main Features</h1>
                <p><strong>Display Size:</strong> ${phone.mainFeatures.displaySize}</p>
                <p><strong>ChipSet:</strong> ${phone.mainFeatures.chipSet}</p>
                <p><strong>Memory:</strong> ${phone.mainFeatures.memory}</p>
                <p><strong>storage:</strong> ${phone.mainFeatures.storage}</p>
                <p><strong>sensors:</strong> ${phone.mainFeatures.sensors}</p>

                <h1>Other Features</h1>
                <p><strong>Bluetooth Size:</strong> ${phone.others.Bluetooth}</p>
                <p><strong>GPS:</strong> ${phone.others.GPS}</p>
                <p><strong>NFC:</strong> ${phone.others.NFC}</p>
                <p><strong>Radio:</strong> ${phone.others.Radio}</p>
                <p><strong>USB:</strong> ${phone.others.USB}</p>
                <p><strong>WLAN:</strong> ${phone.others.WLAN}</p>
            </div>
        </div>
    </div>
        `;
    mobileBox.appendChild(div);
}