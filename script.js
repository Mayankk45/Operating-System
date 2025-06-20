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
createFolder.addEventListener("click",function(){

    let div = document.createElement('div')

    let img = document.createElement('img')
    img.setAttribute("src","./assets/folder.png")

    let p = document.createElement('p')
    p.innerHTML = "New folder"

    div.appendChild(img)
    div.appendChild(p)
    folderContainer.appendChild(div)

    // hide all menu
    menu_newClicked.style.display = "none"
    customMenu.style.display = "none"
})

// update wallpaper
changeWallpaper.addEventListener('click',function(){
    wallpaperContainer.style.display = 'flex'
})

wallpaperContainer.addEventListener('dblclick',function(e){
    let bgImg = desktopImg.querySelector("img")
    desktopImg.removeChild(bgImg)
    let newBgImg = document.createElement('img')
    if(e.target.name == "img1"){
        newBgImg.setAttribute("src","./assets/wallpaper1.jpg")
        desktopImg.appendChild(newBgImg)
    }
    else if(e.target.name == "img2"){
        newBgImg.setAttribute("src","./assets/wallpaper2.jpg")
        desktopImg.appendChild(newBgImg)
    }
    else if(e.target.name == "img3"){
        newBgImg.setAttribute("src","./assets/wallpaper3.jpg")
        desktopImg.appendChild(newBgImg)
    }
    else{
        newBgImg.setAttribute("src","./assets/wallpaper4.jpg")
        desktopImg.appendChild(newBgImg)
    }

    wallpaperContainer.style.display = "none"
    customMenu.style.display = "none"
    menu_newClicked.style.display = 'none'
})