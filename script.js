const desktopImg = document.querySelector(".desktopImg");
const customMenu = document.querySelector("#customMenu");
const customMenu_new = document.querySelector("#customMenu_new");
const menu_newClicked = document.querySelector(".menu_newClicked");
const createFolder = document.querySelector("#createFolder")
const folderContainer = document.querySelector('.folderContainer')
const changeWallpaper = document.querySelector('#changeWallpaper')
const wallpaperContainer = document.querySelector(".wallpaperContainer")
const bin = document.querySelector(".bin")

// navbar icon click
const navbarIcons = document.querySelector(".navbarBottom").querySelectorAll('div')
const navIconClickedModal = document.querySelector(".navIconClickedModal")
navbarIcons.forEach((icon) => {
    icon.addEventListener('click',function(e){
        let p = navIconClickedModal.querySelector("p")
        let iconClicked = false

        if (e.target.name === "chrome") {
            navIconClickedModal.innerHTML = getChromeDummy()
            navIconClickedModal.style.backgroundColor = "rgb(57, 56, 58)"
            iconClicked = true
        } else if (e.target.name === "file") {
            navIconClickedModal.innerHTML = getFileDummy()
            navIconClickedModal.style.backgroundColor = "white"
            iconClicked = true
        } else if (e.target.name === "edge") {
            navIconClickedModal.innerHTML = getEdgeDummy()
            navIconClickedModal.style.backgroundColor = "rgb(57, 56, 58)"
            iconClicked = true
        } else if (e.target.name === "start") {
             navIconClickedModal.innerHTML = getStartDummy()
             navIconClickedModal.style.backgroundColor = "rgb(173, 159, 159)"
             iconClicked = true
        } else if (e.target.name === "store"){
             navIconClickedModal.innerHTML = getStoreDummy()
             navIconClickedModal.style.backgroundColor = "rgb(181, 112, 181)"
             iconClicked = true
        }
        
        if(iconClicked){
            navIconClickedModal.style.display = "flex"
            calendarContainer.style.display = "none"
        }

        // close modal
        const closeIcon = document.querySelector(".closeIcon")
        closeIcon.addEventListener('click',function(){
        navIconClickedModal.style.display = 'none'
        })
    })
})

function getChromeDummy() {
    return `
        <div class="closeIcon">
            <p>close</p>
        </div>
        <div class="chrome-browser-dummy">
            <div class="top-bar">
                <div class="circle red"></div>
                <div class="circle yellow"></div>
                <div class="circle green"></div>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="Search Google or type a URL" disabled />
            </div>
        </div>
    `;
}

function getEdgeDummy() {   
    return `
        <div class="closeIcon">
            <p>close</p>
        </div>
        <div class="edge-browser-dummy">
            <div class="top-bar">
                <div class="circle red"></div>
                <div class="circle yellow"></div>
                <div class="circle green"></div>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="Search with Bing or enter address" disabled />
            </div>
        </div>
    `;
}

function getStartDummy() {
    return `
         <div class="closeIcon">
            <p>close</p>
        </div>
        <div class="start-menu-dummy">
            <h2>Start Menu</h2>
            <div class="menu-grid">
                <div class="tile">Mail</div>
                <div class="tile">Calendar</div>
                <div class="tile">Photos</div>
                <div class="tile">Settings</div>
            </div>
        </div>
    `;
}

function getStoreDummy() {
    return `
        <div class="closeIcon">
            <p>close</p>
        </div>
        <div class="store-dummy">
            <h2>Microsoft Store</h2>
            <div class="store-items">
                <div class="item">App 1</div>
                <div class="item">App 2</div>
                <div class="item">App 3</div>
            </div>
        </div>
    `;
}

function getFileDummy() {
    return `
        <div class="closeIcon">
            <p>close</p>
        </div>
        <div class="file-dummy">
            <div class="top-bar">
                <div class="circle red"></div>
                <div class="circle yellow"></div>
                <div class="circle green"></div>
            </div>
            <div class="file-content">
                <div class="sidebar">
                    <p>Quick Access</p>
                    <p>Desktop</p>
                    <p>Documents</p>
                    <p>Downloads</p>
                </div>
                <div class="main-view">
                    <div class="file-item">📄 File1.txt</div>
                    <div class="file-item">📁 FolderA</div>
                    <div class="file-item">📄 Report.pdf</div>
                </div>
            </div>
        </div>
    `;
}

// right click functionality
let customMenu_posY = 0
let customMenu_posX = 0
desktopImg.addEventListener("contextmenu", function (e) {
    e.preventDefault();

    menu_newClicked.style.display = "none"
    customMenu.style.display = "block"
    customMenu.style.top = e.clientY + "px"
    customMenu.style.left = e.clientX + "px"
    customMenu_posY = e.clientY
    customMenu_posX = e.clientX
})

// hiding custom_menu and modals
window.addEventListener("click",function(e){
    if (
        !customMenu.contains(e.target) &&
        !menu_newClicked.contains(e.target) &&
        !wallpaperContainer.contains(e.target)
    ) {
        customMenu.style.display = "none";
        menu_newClicked.style.display = "none";
        wallpaperContainer.style.display = "none";
    }

    if(!calendarContainer.contains(e.target)){
        calendarContainer.style.display = 'none'
    }
})

// new clicked menu
customMenu_new.addEventListener("mouseenter",function(e){
    menu_newClicked.style.display = 'block'
    menu_newClicked.style.top = customMenu_posY+ 130 + "px"
    if(customMenu_posX < 1100){
        menu_newClicked.style.left = customMenu_posX + 245 + "px"
    }
    else{
        menu_newClicked.style.left = customMenu_posX - 245 + "px"
    }
})

// creating folder dynamically
let folderCount = 0;
createFolder.addEventListener("click", function () {
    let div = document.createElement('div');
    div.style.position = 'absolute';

    // folder should not overlap
    const offset = folderCount * 15;
    div.style.left = (customMenu_posX + offset) + 'px';
    div.style.top = (customMenu_posY + offset) + 'px';

    let img = document.createElement('img');
    img.setAttribute("src", "./assets/folder.png");

    let p = document.createElement('p');
    p.innerHTML = "New folder";

    div.appendChild(img);
    div.appendChild(p);
    folderContainer.appendChild(div);

    // Hide all menus
    menu_newClicked.style.display = "none";
    customMenu.style.display = "none";

    dragFolder(div);

    folderCount++; 
});

// folder drag functionality
function dragFolder(folder) {
    let offsetX = 0;
    let offsetY = 0;

    // capturing folder
    folder.addEventListener('dblclick', (e) => {
        holdFolder = true
        offsetX = e.clientX - folder.offsetLeft;
        offsetY = e.clientY - folder.offsetTop;

        folder.style.cursor = 'grabbing';
        bin.style.display = 'block'
        clock.style.display = 'none'

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // runs on mouse move
    function onMouseMove(e) {
        folder.style.left = `${e.clientX - offsetX}px`;
        folder.style.top = `${e.clientY - offsetY}px`;

        if(e.clientX >= 1350 && e.clientX < 1460 && e.clientY >= 550 && e.clientY < 650){
           bin.style.animation = "pulse 1.5s infinite"
           folder.style.opacity = ".6"
        }
        else{
            folder.style.opacity = "1"
            bin.style.animation = ""
        }
    }

    // runs when mouse gets released
    function onMouseUp(e) {
        folder.style.cursor = 'pointer';
        
        // removing folder 
        const binRect = bin.getBoundingClientRect();
        const inBin =
            e.clientX >= binRect.left &&
            e.clientX <= binRect.right &&
            e.clientY >= binRect.top &&
            e.clientY <= binRect.bottom;

        if (inBin && folderContainer.contains(folder)) {
            folderContainer.removeChild(folder);
            bin.style.animation = "";
        }

        setTimeout(()=>{
            bin.style.display = 'none'
            clock.style.display = 'block'
        },1000)

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// update wallpaper
changeWallpaper.addEventListener('click',function(){
    wallpaperContainer.style.display = 'flex'
})

wallpaperContainer.addEventListener('dblclick',function(e){
    let bgImg = desktopImg.querySelector("img")
    if(e.target.name == "img1"){
        bgImg.setAttribute("src","./assets/wallpaper1.jpg")
    }
    else if(e.target.name == "img2"){
        bgImg.setAttribute("src","./assets/wallpaper2.jpg")
    }
    else if(e.target.name == "img3"){
        bgImg.setAttribute("src","./assets/wallpaper3.jpg")
    }
    else{
        bgImg.setAttribute("src","./assets/wallpaper4.jpg")
    }

    wallpaperContainer.style.display = "none"
    customMenu.style.display = "none"
    menu_newClicked.style.display = 'none'
})


// navbar clock functionality
function updateClock() {
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');

    const now = new Date();

    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    timeEl.textContent = timeStr;
    dateEl.textContent = dateStr;
}

// Initial call and then update every second
updateClock();
setInterval(updateClock, 1000);


// calender funcationality
const datesContainer = document.getElementById('dates');
const monthYear = document.getElementById('monthYear');
var calendarContainer = document.querySelector('.calendarContainer');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYear.innerText = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    datesContainer.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        datesContainer.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        datesContainer.innerHTML += `<div class="date ${isToday ? 'today' : ''}">${day}</div>`;
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

renderCalendar(currentMonth, currentYear);

var clock = document.querySelector('.clockContainer')
clock.addEventListener('click',function(e){
    e.stopPropagation();
    calendarContainer.style.display =
        calendarContainer.style.display === 'block' ? 'none' : 'block';
})