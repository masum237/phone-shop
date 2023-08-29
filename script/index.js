const loadData = async (searchBox, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("card-container");
  phoneContainer.textContent = "";

  const showAllResults = document.getElementById("show-all");
  if (phones.length > 12 && !isShowAll) {
    showAllResults.classList.remove("hidden");
  } else {
    showAllResults.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    const createDiv = document.createElement("div");
    createDiv.classList = `card bg-base-100 shadow-xl border-[1px]`;
    createDiv.innerHTML = `
    <figure class="p-5">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.brand}</h2>
    <p>${phone.phone_name}</p>
    <h2 class="card-title">$999</h2>
    <div class="card-actions">
      <button onclick="showDetailsHandler('${phone.slug}')" class="btn text-white bg-[#0D6EFD] hover:bg-[#0D6EFD]">Show Details</button>
    </div>
    `;
    phoneContainer.appendChild(createDiv);
  });
  loadingAnimation(false);
};

const searchHandler = (isShowAll) => {
  const searchBox = document.getElementById("search-box");
  const searchText = searchBox.value;
  loadingAnimation(true);
  loadData(searchText, isShowAll);
};

const loadingAnimation = (isLoading) => {
  const getLoadingAnimation = document.getElementById("loading-animation");
  if (isLoading) {
    getLoadingAnimation.classList.remove("hidden");
  } else {
    getLoadingAnimation.classList.add("hidden");
  }
};

const showDetailsHandler = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phoneData = data.data;
  showPhoneDetails(phoneData);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const showAllDetailContainer = document.getElementById("show-all-details-container");
  showAllDetailContainer.innerHTML = `
  <div class="card bg-base-100">
  <figure class="p-5 bg-[#0D6EFD0D]">
    <img src="${phone?.image}" alt="" />
  </figure>
  <div class="items-center text-left pt-3 space-y-2">
    <h2 class="card-title text-center justify-center items-center">${phone?.name}</h2>
        <p class="text-base font-semibold">Brand : <span class="font-normal">${phone.brand}</span></p>
    <p class="text-base font-semibold">Storage : <span class="font-normal">${phone?.mainFeatures?.storage}</span></p>
    <p class="text-base font-semibold">Display Size : <span class="font-normal">${phone?.mainFeatures?.displaySize}</span></p>
    <p class="text-base font-semibold">Chipset : <span class="font-normal">${phone?.mainFeatures?.chipSet}</span></p>
    <p class="text-base font-semibold">Chipset : <span class="font-normal">${phone?.mainFeatures?.memory}</span></p>
    <p class="text-base font-semibold">Bluetooth : <span class="font-normal">${phone?.others?.Bluetooth || "NO Bluetooth"}</span></p>
    <p class="text-base font-semibold">WiFi : <span class="font-normal">${phone?.others?.WLAN || "NO WiFi"}</span></p>
    <p class="text-base font-semibold">GPS : <span class="font-normal">${phone?.others?.GPS || "NO GPS"}</span></p>
    <p class="text-base font-semibold">Release data : <span class="font-normal">${phone?.releaseDate}</span></p>
  </div>
</div>
  `;

  show_details_modal.showModal();
};

const showAllHandler = () => {
  searchHandler(true);
};
// loadData();
