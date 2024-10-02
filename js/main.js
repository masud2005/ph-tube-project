

// Create loadCatagories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}


// Create loadVideos
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

// Create Display Categories
const displayCategories = (categories) => {
    // console.log(categories);
    const categoryContainer = document.getElementById('categories');
    categories.forEach(item => {
        // console.log(item);
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;
        // console.log(button);
        categoryContainer.append(button);
    })


    // for(const item of categories){
    //     console.log(item);
    // }
}

// Show Display Videos
const displayVideos = (videos) => {
    console.log(videos);
    const displayContainers = document.getElementById('display-videos');
    videos.forEach(video => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = 'card'
        card.innerHTML = `
            <figure>
                <img class="w-full h-[250px] lg:h-[200px] object-cover"
                src=${video.thumbnail} />
            </figure>
            
            <div class="flex gap-5 py-5">
                <div>
                    <img class="w-10 h-10 rounded-full" src=${video.authors[0].profile_picture} />
                </div>
                <div>
                    <h2 class="card-title font-bold">${video.title}</h2>
                    <p class="text-gray-500">${video.authors[0].profile_name}</p>
                    <p class="text-gray-500 text-sm">${video.others.views}</p>
                </div>
            </div>
        `;
        displayContainers.append(card);
    })
}

loadCategories();
loadVideos();