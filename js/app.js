/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * highlights section in viewport and active navigate in navbar upon scrolling,
 * Hide fixed navigation bar while not scrolling,
 * and Add a scroll to top button on the page .
 * 
 * Dependencies: None
 * 
 * JS Version: ES6
 * 
*/

/**
 * Define Global Variables
 * 
*/


const navbar = document.querySelector("nav"); //Hold navbar
const navUl = document.getElementById("navbar-list"); //Hold nav list
const sections = document.querySelectorAll("section"); //Hold all page content
const toTopIcon = document.querySelector(".to-top"); //Hold Top button

/**
 * End Global Variables
 * Start main Functions
 * 
*/

//Function push navbar dynamic content

const navbarContent = () => {

    let navContentUi = "";
    //looping on all page content
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionDataNav = section.dataset.nav;
        navContentUi += `<li class="nav-link"><a href="#${sectionId}">${sectionDataNav}</a> </li>`;
    })

    navUl.innerHTML = navContentUi;

}

navbarContent(); //invoic function to build dynamic navbar

//Small functions that can help with main function to Add class 'active' to section when near top of viewport 

const activeBounding = (section) => {
    return Math.floor(section.getBoundingClientRect().top)
}

//Function remove active class
const removeActive = (section) => {
    section.classList.remove("active");
}

//Function add active class
const addActive = (section) => {
    section.classList.add('active');
}
/**
 * End small functions.
 * Start with main function.
 * 
*/

//Function push logic of add and delete of activations

const activationSection = () => {

    const navLi = document.querySelectorAll(".navbar-menu a"); //hold nav links
    sections.forEach((section, i) =>{
        const activeElement = activeBounding(section);
        if(activeElement < 150 && activeElement >= -150){
            navLi.forEach((navElement, navIndex) => {
                if(navIndex === i){
                    navElement.classList.add("active-link")
                }
            })
            addActive(section);
        } else {
            navLi.forEach((navElement, navIndex) => {
                if(navIndex === i){
                    navElement.classList.remove("active-link")
                }
            })
            removeActive(section);
        }
        
    });

}

//fire function with scrolling

window.addEventListener('scroll' ,activationSection);

// Scroll to anchor id 

const scrollingByClick = () => {

    const links = document.querySelectorAll('.navbar-menu a');
    //looping on all nav links
    links.forEach(link => {
        link.addEventListener('click', () => {
            for(i = 0 ; i<sections ; i++){
                sections[i].addEventListener("click",sectionScroll(link));
            }
        });
    });

};

scrollingByClick(); //invoic scrollingByClick function with every user click.

//Handle scroll to top button logice

//Check user is scroll

const userIsScroll = () => {

    window.onscroll = ()=>{
        navbar.style.opacity = 1;
    }
    navbar.style.opacity = 0;

}

window.setInterval(userIsScroll, 4000);//invoic userIsScroll function every 4s to check scrolling.

//scroll to top logic

window.addEventListener("scroll", () => {

    if (window.pageYOffset > 100) {
        toTopIcon.classList.add("active-top");
    } else {
        toTopIcon.classList.remove("active-top");
    }

});

/**
 * End main functions
 * 
*/