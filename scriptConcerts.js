"strict mode"

const upcomingConcerts = document.querySelector(".upcomingconcerts");
const pastConcerts = document.querySelector(".pastconcerts");
const today = new Date();
const future = new Date(2024, 10, 1);
const year24 = document.querySelector(".year24");
const year25 = document.querySelector(".year25");
const pastyear24 = document.querySelector(".pastyear24");
const olderpastyears = document.querySelector(".olderpastyears");


fetch("https://concerts-mwi2.onrender.com/concerts/maria").then(res =>{
    if (!res.ok) {
        throw new Error("Network Problem 😢" + res.statusText);
    }
    return res.json();
}).then(concerts => {
    console.log(concerts)
    // const concerts = data.concerts;
    createNewYearHtml(concerts);
    readJSONToPage(concerts);    
}).catch(error => {
    console.error("Fetch Operation Not Working 🦇", error);
});


const createNewYearHtml = function(concerts) {
    const infoYear = concerts.map(function (x) {
        const dateOfConcert = new Date(x.date)
        return dateOfConcert.getFullYear();
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
    // console.log(concerts.description);
        concerts.sort(function(a,b){
            const dateA = readDate(a.date, a.time);
            const dateB = readDate(b.date, b.time);
            return new Date(dateA) - new Date(dateB);
            });
        // console.log(concerts);
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
            // console.log(dateStr, " . ", timeStr);
            const newDate = new Date(dateStr);
            // console.log(newDate);
            const year = newDate.getFullYear();
            const month = newDate.getMonth();
            const day = newDate.getDate();
            // const [monthStr, dayStr, dayOfWeekStr, yearStr] = dateStr.split(' ');
            const { hour, minute } = parseTimeString(timeStr);
            // Convert month abbreviation to month number
            // const months = {
            //     JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
            //     JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
            // };
            // const month = months[monthStr.toUpperCase()];

            // Convert day and year to numbers
            // const day = parseInt(dayStr, 10);
            // const year = parseInt(yearStr, 10);
            // console.log(year, " . ", month, " . ", day, " . ", hour, ":", minute)
            return new Date(year, month, day, hour, minute);
        }

        concerts.forEach(el => {
        const dateOfEl = readDate(el.date, el.time);
        // console.log(dateOfEl);
        const newDate = new Date(el.date);
        const dateInfo = `${new Intl.DateTimeFormat("en-GB", {month: "short", day: "numeric", weekday: "short"}).format(newDate).toUpperCase().replace(",", "")}`;
        const [weekday, day, month] = dateInfo.split(" "); // Extract values correctly
        const noYear = `${month} ${day} ${weekday}`; // Rearrange format
        const html = `<div class="concerts2">
            <box class="ConcDate"><b>${noYear}</b><p>${el.time}</p></box>
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
            const dateA = readDate(a.date, a.time);
            const dateB = readDate(b.date, b.time);
            return new Date(dateB) - new Date(dateA);
            });

        sortedPastConcerts.forEach(el => {
        const dateOfEl = readDate(el.date, el.time);
        const newDate = new Date(dateOfEl);
        const dateInfo = `${new Intl.DateTimeFormat("en-GB", {month: "short", day: "numeric", weekday: "short", year: "numeric"}).format(newDate).toUpperCase().replace(",", "")}`;
        const [weekday, day, month, year] = dateInfo.split(" "); // Extract values correctly
        const yesYear = `${month} ${day} ${weekday} ${year}`; // Rearrange format
        // const noYear = el.date.slice(0, -4);
        // console.log(noYear);
        const html = `<div class="concerts2">
            <box class="ConcDate"><b>${yesYear}</b><p>${el.time}</p></box>
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