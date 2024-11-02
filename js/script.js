// bar menu responsive mobile version
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// category btn er active class remove
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for(let btn of buttons){
    btn.classList.remove("active")
  }
}

// create load categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err))
}

// create display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('categories');
  categories.forEach((item) => {
      
      // create a buttom
      const buttonContainer = document.createElement("div");
      buttonContainer.classList = "";
      
      buttonContainer.innerHTML = `
         <button id="btn-${item.category}" onclick ="loadCategoryCard('${item.category}')" class="lg:px-20 px-5 py-3 border-2 rounded-lg hover:border-[#0e798188] hover:bg-[#0e7a811a] font-bold flex justify-center gap-3 category-btn">
         <img src="${item.category_icon}" class="w-7 h-7"/> 
         ${item.category}
         </button>
         
      `

      // add button to displayContainer
      categoryContainer.append(buttonContainer);
  });
}

// loading......
const loadShow = () => {

  setTimeout(() => {
   loadCards()
  }, 2000);


}


// create load cards
const loadCards = () => {
   let loading = true;
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => {
      // console.log(data)
     
      setTimeout(() => {
        loading = false;
        displayCards(data.pets,loading)
        
      }, 2000);
      // document.getElementById('loading').style.display = 'none';
    })
    
    .catch(err =>{
      // document.getElementById('loading').style.display = 'none';
      console.log(err);
    })
}

// create displaycards
const displayCards = (cards,loader) => {
  const cardContainer = document.getElementById('cards');
  cardContainer.innerHTML = "" ;
  
  if(cards.length == 0){
    cardContainer.classList.remove('grid');
    cardContainer.innerHTML = `
       <div class="min-h-[400px] flex flex-col gap-5 justify-center items-center bg-[#D2DCFD] rounded-md">
       <img class ="w-16 h-16 sm:w-28 sm:h-28" src="images/error.webp" />
       <h4 class="font-bold text-2xl">No Information Available</h4>
       <p class="px-5 lg:px-10 hidden sm:block">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
       </div>
    `;
  }else{
    cardContainer.classList.add('grid');
  }
  if(loader){
     document.getElementById('loading').style.display = 'block'
  }
  else{
    document.getElementById('loading').style.display = 'none'
    cards.forEach((card) => {
      // console.log(card);
      // create card
      const div = document.createElement('div');
      div.classList = "card border-2 px-3 py-3"
      div.innerHTML = `
             <figure>
                    <img
                      src=${card.image}
                      alt=""
                      class="rounded-xl" />
                  </figure>

                  <div class="text-start space-y-1">
                    <h3 class="pt-3 font-bold">${card.pet_name}</h3>
                    <div>
                      <div class="flex gap-2 items-center">
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=24&id=S9FoMsb5cl4y&format=png" alt="">
                        <h5 class="text-gray-500">Breed: ${card.breed ? card.breed : "N/A"}</h5>
                      </div>
                        <div class="flex gap-2 items-center">
                          <img class="w-5 h-5" src="https://img.icons8.com/?size=80&id=UTe6yKq2hvHK&format=png" alt="">
                          <h5 class="text-gray-500">Birth: ${card.date_of_birth ? new Date(card.date_of_birth).getFullYear() : "N/A"}</h5>
                        </div>
                        <div class="flex gap-2 items-center">
                          <img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=16271&format=png" alt="">
                          <h5 class="text-gray-500">Gender:  ${card.gender ? card.gender : "N/A"}</h5>
                        </div>
                        <div class="flex gap-2 items-center pb-3 border-b-2">
                          <img class="w-5 h-5" src="https://img.icons8.com/?size=64&id=YmwAREsVO2DE&format=png" alt="">
                          <h5 class="text-gray-500">Price :${card.price ? card.price + '$' : "N/A"}</h5>
                        </div>
                    </div>
                    <div class="flex justify-between items-center pt-3">
                      <button onclick ="imageShow('${card.image}')" class="border px-2 sm:px-3 py-2 rounded-lg text-[#0E7A81] font-semibold hover:border-[#0e798188] hover:bg-[#0e7a811a]"><img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=33481&format=png" alt=""></button>
                      <button id="adopt-btn-${card.petId}" onclick ="adoptShow('${card.petId}')" class="border px-3 py-2 rounded-lg font-semibold text-[#0E7A81]  hover:border-[#0e798188] hover:bg-[#0e7a811a]">Adopt</button>
                      <button onclick = "detailShow('${card.petId}')" class="border px-3 py-2 rounded-lg text-[#0E7A81] font-semibold hover:border-[#0e798188] hover:bg-[#0e7a811a]">Details</button>
                    </div>
                    
                  </div>
      `;
      cardContainer.append(div)
  })

  }
 

}

// create sort card
const sortCards = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
  .then(res => res.json())
  .then(data => {
      // Filter cards by active category if it exists
      const filteredCards = activeCategory
          ? data.pets.filter(card => card.category === activeCategory) 
          : data.pets;

      // Sort the filtered cards by price
      const sortedCards = filteredCards.sort((a, b) => b.price - a.price);
      displayCards(sortedCards);
  })
  .catch(err => console.log(err));
}

let activeCategory = null;

// create buttonclick card
const loadCategoryCard = (id) => {
  activeCategory = id;

  // jokhn ami category click korbo kisu show korbe nah
    const cardContainer = document.getElementById('cards');
    cardContainer.innerHTML = '';

  document.getElementById('loading').style.display = 'block';
  setTimeout(() => {

    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(res => res.json())
    .then(data => {
      // All active class remove
      removeActiveClass();
      // id er active class add
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");

      displayCards(data.data)
    })
    .catch(err => console.log(err))
    .finally(() => {
      document.getElementById('loading').style.display = 'none';
  });
    
  }, 2000);
}

// like imageShow
const imageShow = (id) => {
  // console.log(id);
  const imageContainer = document.getElementById('image');

  const images = document.createElement('div');
  images.innerHTML = `
      <img class="rounded-md " src = "${id}"/>
  `
  imageContainer.appendChild(images)
}

// details btn detailShow api fetch
const detailShow = async (id) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.petData);
}

// details btn display modal
const displayDetails = (card) => {
  const detailContainer = document.getElementById('modal-content');
  detailContainer.innerHTML = `
  <figure>
         <img
           src=${card.image}
           alt=""
           class="rounded-xl w-full" />
       </figure>

       <div class="text-start space-y-1">
         <h3 class="pt-3 font-bold">${card.pet_name}</h3>
         <div class ="grid grid-cols-2 gap-1">
           <div class="flex gap-2 items-center">
             <img class="w-5 h-5" src="https://img.icons8.com/?size=24&id=S9FoMsb5cl4y&format=png" alt="">
             <h5 class="text-gray-500">Breed: ${card.breed ? card.breed : "N/A"}</h5>
           </div>
             <div class="flex gap-2 items-center">
               <img class="w-5 h-5" src="https://img.icons8.com/?size=80&id=UTe6yKq2hvHK&format=png" alt="">
               <h5 class="text-gray-500">Birth: ${card.date_of_birth ? new Date(card.date_of_birth).getFullYear() : "N/A"}</h5>
             </div>
             <div class="flex gap-2 items-center">
               <img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=16271&format=png" alt="">
               <h5 class="text-gray-500">Gender:  ${card.gender ? card.gender : "N/A"}</h5>
             </div>
             <div class="flex gap-2 items-center">
               <img class="w-5 h-5" src="https://img.icons8.com/?size=64&id=YmwAREsVO2DE&format=png" alt="">
               <h5 class="text-gray-500">Price :${card.price ? card.price + '$' : "N/A"}</h5>
             </div>
             <div class="flex gap-2 items-center">
               <img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=16271&format=png" alt="">
               <h5 class="text-gray-500">vaccinated_status:  ${card.vaccinated_status ? card.vaccinated_status : "N/A"}</h5>
               
             </div>
         </div>
             <div class="">
                <h3 class="pt-3 font-bold">Details Information</h3>
                <h5 class="text-gray-500 py-2">${card.pet_details ? card.pet_details : "N/A"}</h5>
             </div>
         
       </div>
`;

  document.getElementById('detailsModal').showModal()

}

// adopt show modal
const adoptShow = (petId) => {
  let counter = 4;

  const countdown = setInterval(() => {
    counter--; 
    const adoptContainer = document.getElementById('count');
    adoptContainer.innerHTML = `${counter}` 
    if (counter <= 0) {
       clearInterval(countdown);
        adoptContainer.innerHTML = `3`
       document.getElementById('adopt').close();

      //  document.getElementById('adopt-btn').disable = true;
      const adoptBtn = document.getElementById(`adopt-btn-${petId}`);
       if (adoptBtn) {
        adoptBtn.disabled = true
         adoptBtn.innerText = 'Adopted';
         adoptBtn.classList.remove('text-[#0E7A81]', 'hover:border-[#0e798188]', 'hover:bg-[#0e7a811a]');
         adoptBtn.classList.add('cursor-not-allowed', 'bg-gray-400');
       }
    }
}, 1000);
 
  document.getElementById('adopt').showModal()

}



loadCategories();
loadCards();
loadShow();
