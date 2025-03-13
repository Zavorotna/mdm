document.addEventListener("DOMContentLoaded", function () {
    /*move text page*/
    const carousel = document.querySelector('.content-slider')
    if (document.querySelector(".content-slider h3")) {
        let items = [...document.querySelectorAll(".content-slider h3")],
            itemImgWidth = items[0].offsetWidth,
            isAnimatingImg = false
        
        // console.log(itemImgWidth);
        function updateCarouselImg() {
            while (carousel.firstChild) {
                carousel.removeChild(carousel.firstChild)
            }
            for (let i = 0; i < items.length; i++) {
                const cloneImg = items[i].cloneNode(true)
                carousel.appendChild(cloneImg)
            }

        }
        updateCarouselImg()

        function startAutoScroll() {
            let currentOffset = 0

            setInterval(() => {
                if (!isAnimatingImg) {
                    isAnimatingImg = true
                    currentOffset -= 1;

                    carousel.style.transition = 'none'
                    carousel.style.transform = `translateX(${currentOffset}px)`
                    // console.log(currentOffset);
                    if (Math.abs(currentOffset) >= itemImgWidth) {
                        currentOffset = 0;
                        updateCarouselImg()
                    }
                    isAnimatingImg = false
                }
            }, 20)
        }
        startAutoScroll()
        window.addEventListener('resize', () => {
            updateCarouselImg();
        })
    }
    //fade out for main container
    if (document.querySelector('.slider-images-1')) {
        const images1 = document.querySelectorAll('.slider-images-1 img'),
            images2 = document.querySelectorAll('.slider-images-2 img')
        let currentImgIndex = 0;

        images1[0].classList.add('active')
        images2[0].classList.add('active')

        setInterval(() => {
            images1[currentImgIndex].classList.remove('active')
            images2[currentImgIndex].classList.remove('active')
            currentImgIndex = (currentImgIndex + 1) % images1.length
            images1[currentImgIndex].classList.add('active')
            images2[currentImgIndex].classList.add('active')
        }, 3000)
    }

    //burger
    if (document.querySelector(".burger")) {
        const dark = document.querySelector(".dark-bgc"),
            burger = document.querySelector(".burger"),
            menu = document.querySelector(".nav"),
            cancel = document.querySelector(".cancel"),
            listItem = menu.querySelectorAll("a")

        burger.addEventListener("click", function () {
            menu.style.left = "0";
            dark.style.display = "block"
        })

        function cancelBurger() {
            menu.style.left = "-100%";
            dark.style.display = "none"
        }
        listItem.forEach(item => {
            item.addEventListener("click", cancelBurger)
        })
        cancel.addEventListener("click", cancelBurger)
        dark.addEventListener("click", cancelBurger)
    }

    // випадаючі блоки з інформацією
    function toggleVisibility(buttons, visibleClass, activeClass) {
        buttons.forEach((item) => {
            item.addEventListener("click", function (e) {
                e.preventDefault()
                const descriptionMore = item.nextElementSibling
                descriptionMore.classList.toggle(visibleClass)
                item.classList.toggle(activeClass)
            })
        })
    }

    const btnReadMore = document.querySelectorAll(".readmore")

    toggleVisibility(btnReadMore, "visible", "readmore-active")

    //btn for block info
    const buttons = document.querySelectorAll('.nav a '),
        sections = document.querySelectorAll('.description-more')
    let activeSection = null

    function hideAllSections() {
        sections.forEach(section => section.classList.remove('visible'))
    }

    function deactivateAllButtons() {
        buttons.forEach(button => button.classList.remove('visible'))
    }

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            const target = button.getAttribute('data-target')

            hideAllSections()
            deactivateAllButtons()

            const sectionToShow = document.getElementById(target)
            if (sectionToShow) {
                if (activeSection && activeSection.previousElementSibling) {
                    activeSection.previousElementSibling.classList.remove('readmore-active')
                }
    
                sectionToShow.classList.add('visible')
                if (sectionToShow.previousElementSibling) {
                    sectionToShow.previousElementSibling.classList.add('readmore-active')
                }
    
                activeSection = sectionToShow
            }
        })
    })

    hideAllSections()
    deactivateAllButtons()

    //spivpracia popup
    const spivpraciaBtn = document.querySelectorAll(".spivpracia_btn"),
        popupSpivpracia = document.querySelector(".spivpracia_popup"),
        cancelSpevpr = document.querySelector(".cancel_spivpracia"),
        darkBg = document.querySelector(".dark-bgc")


        spivpraciaBtn.forEach(item => {
            item.addEventListener("click", function(e) {
                e.preventDefault()
                popupSpivpracia.style.display = "block"
                darkBg.style.display = "block"
            })
        })

        function cancelPopup(e) {
            e.preventDefault()
            popupSpivpracia.style.display = "none"
            darkBg.style.display = "none"
        }

        cancelSpevpr.addEventListener("click", cancelPopup)
        darkBg.addEventListener("click", cancelPopup)

})