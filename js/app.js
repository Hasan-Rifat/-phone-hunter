// search felid 
const allMobiles = async () => {
    const phoneCard = document.getElementById('phone-card');
    const searchMobiles = document.getElementById('search-mobiles');
    const searchMobilesText = searchMobiles.value;
    // clear 
    searchMobiles.value = '';
    const mobileBox = document.getElementById('mobileBox');
    // clear 
    mobileBox.textContent = '';
    if (searchMobilesText === '') {
        const div = document.createElement('div');
        div.classList.add('col', 'mobile');
        div.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Your writing incorrectly</h4>
            </div>
        </div>
        `;
        phoneCard.appendChild(div);
        // alert('Your writing incorrectly')
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchMobilesText}`;
        const res = await fetch(url);
        const data = await res.json()
        mobilesDisplay(data.data.slice(0, 20));
    }
}

// display all mobiles 

const mobilesDisplay = mobiles => {
    const phoneCard = document.getElementById('phone-card');
    phoneCard.textContent = '';
    if (mobiles[0] == null) {
        const div = document.createElement('div');
        div.classList.add('col', 'mobile');
        div.innerHTML = `
        <div class="card">
            <div class="card-body">
                    <h4 class="card-title">sorry this mobile are not Available</h4>
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

// mobiles full information 

const phoneSlug = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const mobileBox = document.getElementById('mobileBox');
    mobileBox.textContent = '';
    const others = phone.others? phone.others: 'No Data Found!';
    const div = document.createElement('div');
    div.classList.add('row', 'mobile');
    div.innerHTML = `
    <div class="col-md-5">
            <img src="${phone.image}" class="card-img-top images" alt="...">
    </div>
    <div class="col-md-7">
        <div class="p-4 card rounded-3">
            <div class="card-body">
                <h1 class="card-title">Brand: ${phone.brand}</h1>
                <h1 class="card-title">Name: ${phone.name}</h1>
                <p class="card-text"><strong>Release Date:</strong> ${phone.releaseDat? phone.releaseDat: 'No Release Date Found'}</p>
                <h1>Main Features</h1>
                <p><strong>Display Size:</strong> ${phone.mainFeatures.displaySize? phone.mainFeatures.displaySize: 'N/A'}</p>
                <p><strong>ChipSet:</strong> ${phone.mainFeatures.chipSet? phone.mainFeatures.chipSet: 'N/A'}</p>
                <p><strong>Memory:</strong> ${phone.mainFeatures.memory? phone.mainFeatures.memory: 'N/A'}</p>
                <p><strong>storage:</strong> ${phone.mainFeatures.storage? phone.mainFeatures.storage: 'N/A'}</p>
                <p><strong>sensors:</strong> ${phone.mainFeatures.sensors? phone.mainFeatures.sensors: 'N/A'}</p>
                <h1>Other Features</h1>
                <p><strong>Bluetooth Size:</strong> ${others.Bluetooth? others.Bluetooth: 'N/A'}</p>
                <p><strong>GPS:</strong> ${others.GPS? others.GPS: 'N/A'}</p>
                <p><strong>NFC:</strong> ${others.NFC? others.NFC: 'N/A'}</p>
                <p><strong>Radio:</strong> ${others.Radio? others.Radio: 'N/A'}</p>
                <p><strong>USB:</strong> ${others.USB? others.USB: 'N/A'}</p>
                <p><strong>WLAN:</strong> ${others.WLAN? others.WLAN: 'N/A'}</p>
            </div>
        </div>
    </div>
        `;
    mobileBox.appendChild(div);
}