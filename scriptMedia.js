const buttons = document.querySelectorAll(".slider > button");
const gallery = document.querySelector("[data-slides]");

fetch("./photos.json")
.then(res => res.json())
.then(data => {
    // console.log(data);
    const photos = data.map(obj => {
        // console.log(obj);
        renderGallery(obj);
        // Fazer com que o primeiro filho seja data-active
        gallery.firstElementChild.dataset.active = true;
        renderAccordeon(obj);
    });
    // console.log(photos);

});

async function renderAccordeon (objeto) {
    const divElement = document.createElement("div");
    const descriptionElement = document.createElement("h5");
    const accordeonDivElement = document.createElement("div");
    accordeonDivElement.classList.add("image-div");
    descriptionElement.textContent = objeto.description;
    let index = 50;
    let translate = 0;
    let pixel = 20;
    
    objeto.photos.forEach(photo => {
        const imgElement = document.createElement("img");
        imgElement.style.zIndex = index;
        imgElement.classList.add("accordeon-photo")
        imgElement.src = `${photo.srcSmall}.jpg`;
        imgElement.alt = photo.name;
        imgElement.style.transform = `translate(${translate}px, -${translate}px)`;
        accordeonDivElement.appendChild(imgElement);
        translate += pixel;
        pixel = pixel - 2;
        index --;
    })

    divElement.classList.add("accordeon-div");
    divElement.appendChild(accordeonDivElement);
    divElement.appendChild(descriptionElement);
    document.querySelector(".accordeon").appendChild(divElement);

};

async function renderGallery(objeto) {
    objeto.photos.forEach(photo => {
        // console.log(photo.name, photo.srcGallery, objeto.description)
        const html = `
        <div class="slide" data-name="${photo.name}">
            <img class="picture-slide" src="${photo.srcGallery}.jpg" alt="Picture ${photo.name}">
            <p class="slide-text">${objeto.description}</p>
        </div>
        `;
        gallery.insertAdjacentHTML("beforeend", html);
    })
}

//EventListener
document.querySelector(".accordeon").addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
        const image = event.target;
        selectPicture(image.alt)
    }
});

function selectPicture(picsName) {
    const slides = document.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    const clickedSlide = slides.querySelector(`[data-name="${picsName}"]`);
    delete activeSlide.dataset.active;
    clickedSlide.dataset.active = true;
    clearInterval(intervalID);
} 



buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = document.querySelector("[data-slides]");
        const activeSlide = slides.querySelector ("[data-active]");

        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length -1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
        clearInterval(intervalID);
    })
})

function nextSlide() {
    const offset = 1;
    const slides = document.querySelector("[data-slides]");
    const activeSlide = slides.querySelector ("[data-active]");

    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length -1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active; 
}

let intervalID = setInterval(nextSlide, 2500);