const desktopImg = document.querySelector(".desktopImg");
const customMenu = document.querySelector("#customMenu");
const customMenu_new = document.querySelector("#customMenu_new");
const menu_newClicked = document.querySelector(".menu_newClicked");
const createFolder = document.querySelector("#createFolder")
const folderContainer = document.querySelector('.folderContainer')
const changeWallpaper = document.querySelector('#changeWallpaper')
const wallpaperContainer = document.querySelector(".wallpaperContainer")

let customMenu_posY = 0
let customMenu_posX = 0
// right click functionality
desktopImg.addEventListener("contextmenu", function (e) {
    e.preventDefault();

    menu_newClicked.style.display = "none"
    customMenu.style.display = "block"
    customMenu.style.top = e.clientY + "px"
    customMenu.style.left = e.clientX + "px"
    customMenu_posY = e.clientY
    customMenu_posX = e.clientX
})

// hiding custom_menu
window.addEventListener("click",function(e){
    if(!customMenu.contains(e.target) && !menu_newClicked.contains(e.target) && !wallpaperContainer.contains(e.target)){
        customMenu.style.display = "none"
        menu_newClicked.style.display = "none"
        wallpaperContainer.style.display = 'none'
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
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    folder.addEventListener('dblclick', (e) => {
        offsetX = e.clientX - folder.offsetLeft;
        offsetY = e.clientY - folder.offsetTop;

        folder.style.cursor = 'grabbing';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // runs on mouse move
    function onMouseMove(e) {
        folder.style.left = `${e.clientX - offsetX}px`;
        folder.style.top = `${e.clientY - offsetY}px`;
    }

    // runs when mouse gets released
    function onMouseUp() {
        folder.style.cursor = 'pointer';

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

