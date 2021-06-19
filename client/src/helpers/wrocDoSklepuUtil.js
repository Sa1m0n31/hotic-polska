const wrocDoSklepuUtil = () => {
    if(typeof document !== "undefined") {
        let koszykBottom = document.querySelector(".bottomKoszyk");
        let koszykMobileWrapper = document.querySelector(".bottomKoszykMobileWrapper");
        let elements = document.querySelectorAll(".bottomKoszyk>*");
        document.querySelector("#root").style.paddingBottom = "0";

        if(koszykMobileWrapper) koszykMobileWrapper.style.display = "none";
        elements.forEach(item => {
            item.style.opacity = "0";
        });
        setTimeout(() => {
            koszykBottom.style.transform = "scaleY(0)";
            koszykBottom.style.zIndex = 0;
            koszykBottom.style.opacity = 0;
        }, 500);
    }
}

export default wrocDoSklepuUtil;
