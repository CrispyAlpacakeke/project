import "../less/normalized.less"
import "../less/header-footer.less"
import "../less/login.less"

let tabBtns = [...$(".loginContent_nav a")]
let tabCons = [...$(".loginContent .lC")]
console.log(tabBtns)
console.log(tabCons)
tabBtns.forEach(function (item, index) {
    item.dataset.index = index;
    item.onclick = function () {
        console.log(this);
        let index = this.dataset.index;
        console.log(index);
        for (let key in tabBtns) {
            console.log(tabBtns[key]);
            if (tabBtns[key].classList.contains("now")) {
                tabBtns[key].classList.remove("now")
                tabCons[key].classList.add("hide")
            }
        }
        item.classList.add("now")
        console.log(tabCons[index])
        tabCons[index].classList.remove("hide")
    }
})

