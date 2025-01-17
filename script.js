"strict mode"

const upcomingConcerts = document.querySelector(".upcomingconcerts");
const pastConcerts = document.querySelector(".pastconcerts");
const today = new Date();
const future = new Date(2024, 10, 1);
const year24 = document.querySelector(".year24");
const year25 = document.querySelector(".year25");
const pastyear24 = document.querySelector(".pastyear24");
const olderpastyears = document.querySelector(".olderpastyears");


fetch("concerts.json").then(res =>{
    if (!res.ok) {
        throw new Error("Network Problem 😢" + res.statusText);
    }
    return res.json();
}).then(data => {
    const concerts = data.concerts;
    createNewYearHtml(concerts);
    readJSONToPage(concerts);    
}).catch(error => {
    console.error("Fetch Operation Not Working 🦇", error);
});


const createNewYearHtml = function(concerts) {
    const infoYear = concerts.map(function (x) {
        return x.date.slice(-4);
        });
    // console.log(infoYear)
    const infoYearReal = [...new Set(infoYear.sort((a, b) => a - b))];
    // console.log(infoYearReal);
    infoYearReal.forEach( function (ano){
        // console.log(ano)
        if (ano >= today.getFullYear()) {
          const html = `<div class="year${ano}"><h2 id="year">${ano}</h2></div>`
          upcomingConcerts.insertAdjacentHTML("beforeend", html)
        }
    })
}

const readJSONToPage = function(concerts) {
    // console.log(concerts);
        concerts.sort(function(a,b){
            const dateA = readDate(a.date, a.hour);
            const dateB = readDate(b.date, b.hour);
            return new Date(dateA) - new Date(dateB);
            });

        function parseTimeString(timeStr) {
            // Split the time string into hours and minutes
            const [hourStr, minuteStr] = timeStr.split(':');
            
            // Convert the parts to numbers
            const hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);

            return { hour, minute };
            }

        function readDate(dateStr, timeStr) {
            // Split the string into components
            const [monthStr, dayStr, dayOfWeekStr, yearStr] = dateStr.split(' ');
            const { hour, minute } = parseTimeString(timeStr);
            // Convert month abbreviation to month number
            const months = {
                JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
                JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
            };
            const month = months[monthStr.toUpperCase()];

            // Convert day and year to numbers
            const day = parseInt(dayStr, 10);
            const year = parseInt(yearStr, 10);

            return new Date(year, month, day, hour, minute);
        }

        concerts.forEach(el => {
        const dateOfEl = readDate(el.date, el.hour);
        // console.log(dateOfEl);
        const noYear = el.date.slice(0, -4);
        const html = `<div class="concerts2">
            <box class="ConcDate"><b>${noYear}</b><p>${el.hour}</p></box>
            <box class="ConcInfo"><h5>${el.description}</h5><p>${el.location}</p></box>
            <box class="ConcLink"><a href =${el.link? el.link : " "} target="_blank">Info & Tickets</a></box>
        </div>`;
        if (dateOfEl >= today)
        {
            // if (dateOfEl)
        const selector = `.year${dateOfEl.getFullYear()}`
        document.querySelector(selector).insertAdjacentHTML("beforeend", html);

        // dateOfEl.getFullYear() === 2024? year24.insertAdjacentHTML("beforeend", html) : year25.insertAdjacentHTML("beforeend", html)
        }
        });

        const sortedPastConcerts = concerts.sort(function(a,b){
            const dateA = readDate(a.date, a.hour);
            const dateB = readDate(b.date, b.hour);
            return new Date(dateB) - new Date(dateA);
            });

        sortedPastConcerts.forEach(el => {
        const dateOfEl = readDate(el.date, el.hour);
        // const noYear = el.date.slice(0, -4);
        // console.log(noYear);
        const html = `<div class="concerts2">
            <box class="ConcDate"><b>${el.date}</b><p>${el.hour}</p></box>
            <box class="ConcInfo"><h5>${el.description}</h5><p>${el.location}</p></box>
            <box class="ConcLink"><a href =${el.link} target="_blank">Info & Tickets</a></box>
        </div>`;

        if (dateOfEl < today)
            {
                pastConcerts.insertAdjacentHTML("beforeend", html)
                // if (dateOfEl.getFullYear() === 2024) {
                    
                //     pastyear24.insertAdjacentHTML("beforeend", html);
                // } else {
                //     olderpastyears.insertAdjacentHTML("beforeend", html)
                // }
            ;    
            }})
};


// _____________________________________TOGGLE MENU FOR NAVIGATION______________________________________

    function toggleMenu() {
        var x = document.getElementById("collapse--menu");
        x.classList.toggle("responsive");
      }