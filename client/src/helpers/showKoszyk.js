const showKoszykUtil = () => {
    if(typeof document !== "undefined") {
        let koszykBottom = document.querySelector(".bottomKoszyk");
        let koszykMobileWrapper = document.querySelector(".bottomKoszykMobileWrapper");
        let koszykMobile = document.querySelector(".bottomKoszykMobile");
        let elements = document.querySelectorAll(".bottomKoszyk>*");

        if(window.innerWidth > 800) {
            document.querySelector("#root").style.paddingBottom = "350px";
        }
        else {
            koszykMobile.style.opacity = 1;
            koszykMobileWrapper.style.display = "flex";
        }
        koszykBottom.style.transform = "scaleY(1)";
        koszykBottom.style.opacity = 1;
        koszykBottom.style.zIndex = 10001;
        koszykBottom.style.top = window.innerHeight - 350 + "px";
        setTimeout(() => {
            elements.forEach(item => {
                item.style.opacity = '1';
            });
        }, 500);
    }
}

export default showKoszykUtil;
