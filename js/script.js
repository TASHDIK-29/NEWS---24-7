const fetchingCategory = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    //console.log(data.data.news_category);
    const categoriesArray = data.data.news_category;
    //console.log(categoriesArray);

    const categoryContainer = document.querySelector('#Category-container');
    //console.log(categoryContainer)

    categoriesArray.forEach((element) => {
        //console.log(element);
        
        const anchor = document.createElement('a');
        anchor.innerHTML =`<a onclick="fetchingCardsByCategory('${element.category_id}')" class="btn btn-ghost text-base">${element.category_name}</a>`

        categoryContainer.appendChild(anchor);
    })
}


const fetchingCardsByCategory = async (id) =>{

    document.getElementById('loading-container').classList.remove('hidden');

    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const {data} = await res.json();
    //console.log(data);

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    //console.log(cardsContainer)

    data.forEach((element) => {
        console.log(element);
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        <figure><img src="${element.thumbnail_url}" alt="Album" />
                </figure>
                <div class="card-body">
                    <div class="space-y-5">
                        <h2 class="card-title">${element.title}</h2>
                        <p>${element.details.slice(0, 300)}</p>
                        <div class="flex flex-col lg:flex-row justify-between gap-2">
                            <!-- author -->
                            <div class="flex gap-1">
                                <div>
                                    <img  class="w-10  rounded-full" src="${element.author.img}" alt="">
                                </div>
                                <div>
                                    <h1>${element.author.name}</h1>
                                    <p>${element.author.published_date}</p>
                                </div>
                            </div>
                            <!-- views -->
                            <div class="flex gap-1 items-center">
                                <div>
                                    <i class="fa-regular fa-eye"></i>
                                </div>
                                <div>
                                    <h1>${element.total_view}</h1>
                                </div>
                            </div>
                            <!-- ratings -->
                            <div> 
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star-half-stroke"></i>
                            </div>
                            <!-- arrow -->
                            <div>
                                <i class="fa-solid fa-arrow-right text-[#5D5FEF]"></i>
                            </div>
                        </div>
                    </div>
                </div>
        `
        newCard.className =`card lg:card-side bg-base-100 shadow-xl`;

        document.getElementById('loading-container').classList.add('hidden');

        cardsContainer.appendChild(newCard);
    })

}

fetchingCategory();