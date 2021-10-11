const allProductsUrl = ''

const singleProductUrl =
''

const getElement = (selection) => {
const element = document.querySelector(selection)
if (element) return element
throw new Error(`Please check "${selection}" selector, no such element exist`)
}

const formatPrice = () => {}

const getStorageItem = () => {}
const setStorageItem = () => {}

export {
allProductsUrl,
singleProductUrl,
getElement,
formatPrice,
getStorageItem,
setStorageItem,
}

const toggleNav = getElement('.toggle-nav');
const sidebarOverlay = getElement('.sidebar-overlay');
const closeBtn = getElement('.sidebar-close');


toggleNav.addEventListener('click', () => {
    sidebarOverlay.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    sidebarOverlay.classList.remove('show');
});