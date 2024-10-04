
// Time show avabeo kora jaito >>> line 56-60
/*
                <span class="absolute bottom-2 right-2 bg-gray-700 rounded text-white px-2">${video.others.posted_date}</span>
*/

// Second to Hours, Minute, Second Convert
function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

// Active Class Remove
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    // console.log(buttons);
    for(const btn of buttons){
        btn.classList.remove('active');
    }
}


// loadCatagories API
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

 
// loadVideos API
const loadVideos = (searchText = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

// Click to Btn and Load Category Videos API
const loadCategoryVideos = (id) => {
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            const activeBtn = document.getElementById(`btn-${id}`);
            // console.log(activeBtn);

            // Remove Category Btn Active Class
            removeActiveClass();

            // Active Class Added Category Btn
            activeBtn.classList.add('active');
            displayVideos(data.category);
        })
        .catch(error => console.log(error))
}

// Click Details Btn Show DeTails
const showDetails = async(videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.video);
    displayDetails(data.video)
}
const displayDetails = (videoDtl) => {
    // console.log(videoDtl);
    const detailContainer = document.getElementById('modal-content');
    detailContainer.innerHTML = `
        <img class='w-full' src=${videoDtl.thumbnail}/>
        <p class='p-2' >${videoDtl.description}</p>
    `;
    document.getElementById('customModal').showModal();
}


// Show Display Categories
const displayCategories = (categories) => {
    // console.log(categories);
    const categoryContainer = document.getElementById('categories');
    categories.forEach(item => {
        // console.log(item);
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
        `;
        categoryContainer.append(buttonContainer);

        // button.classList = 'btn';
        // button.innerText = item.category;
        // // console.log(button);
        // categoryContainer.append(button);
    })

    // for(const item of categories){
    //     console.log(item);
    // }
}

// Show Display Videos
const displayVideos = (videos) => {
    // console.log(videos);
    const displayContainers = document.getElementById('display-videos');
    displayContainers.innerHTML = "";

    // Drawing Btn Container here
    if(videos.length === 0){
        displayContainers.classList.remove('grid')
        displayContainers.innerHTML = `
            <div class=" mt-10">
                <img class="w-[100px] mx-auto" src="../assests/Icon.png"/>
                <h1 class='text-center font-bold text-2xl mt-10'>Oops!! Sorry, There is no content here</h1>
            </div>
        `;
    }else{
        displayContainers.classList.add('grid');
    }

    videos.forEach(video => {
        // console.log(video);
        const card = document.createElement('div');
        card.classList = 'card shadow';
        card.innerHTML = `
            <figure class="relative">
                <img class="w-full h-[250px] lg:h-[200px] object-cover"
                src=${video.thumbnail} />
                ${video.others.posted_date?.length === 0
                ? ""
                : `<span class="absolute bottom-2 right-2 bg-gray-700 rounded text-white px-2 py-1 text-xs">${getTimeString(video.others.posted_date)}</span>`
            }
            </figure>
            <div class="flex gap-5 py-5 px-2">
                <div class="">
                    <img class="w-10 h-10 rounded-full" src=${video.authors[0].profile_picture} />
                </div>
                <div>
                    <h2 class="card-title font-bold">${video.title}</h2>
                    <div class="flex gap-2">
                        <p class="text-gray-500">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified === true ? `<img class="w-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" />` : ""}
                    </div>
                    <p class="text-gray-500 text-sm">${video.others.views}</p>
                </div>
            </div>
            <div class='flex justify-center pb-3'>
                <button onclick="showDetails('${video.video_id}')" class='bg-pink-500 hover:bg-pink-300 hover:text-black transition duration-200 py-1 px-3 rounded text-white'>Details</button>
            </div>
        `;
        displayContainers.append(card);
    })
}

// Search Filed Query
document.getElementById('search-input').addEventListener('keyup', (event) => {
    // console.log(event.target.value);
    loadVideos(event.target.value);
})

loadCategories();
loadVideos();