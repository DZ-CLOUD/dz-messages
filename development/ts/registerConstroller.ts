enum PAGES {
    EMAIL,
    USERNAME,
    PERSONALIZATION,
    PASSWORD,
}

let currentPage:number = 0;
function nextPage() {
    currentPage++
}

function previousPage() {
    currentPage--
}

function pageController() {
    switch (currentPage) {
        case 1:
            
            break;
    
        default:
            break;
    }
}