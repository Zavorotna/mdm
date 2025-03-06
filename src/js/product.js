fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const container = document.querySelector(".catalog_container")

        function createProductCard(product) {
            const card = document.createElement("figure"),
                cardContainer = document.createElement("figcaption")

            card.classList.add("card")

            const img = document.createElement("img"),
                picture = document.createElement("picture"),
                title = document.createElement("h2"),
                price = document.createElement("p")
            price.classList.add("price")
            picture.appendChild(img)
            img.src = product.img
            img.alt = product.alt
            title.textContent = product.head
            price.textContent = product.price

            //color
            const btnColorContainer = document.createElement("div"),
                colorContainer = document.createElement("div")
            colorContainer.classList.add("color")
            colorContainer.classList.add("flex")
            btnColorContainer.classList.add("flex-between")
            btnColorContainer.classList.add("items-center")

            Object.entries(product.color).forEach(([color, name], index) => {
                // console.log(color, name, index);
                const label = document.createElement("label"),
                    input = document.createElement("input"),
                    span = document.createElement("span")

                input.type = "radio";
                input.name = `color-${product.id}`;
                input.value = color;
                input.setAttribute("data-color-name", name);
                if (index === 0) input.checked = true;

                input.style.backgroundColor = color;
                label.appendChild(input)
                if (color == "#fff") {
                    label.appendChild(span)
                }
                colorContainer.appendChild(label);
            });

            //size
            const sizeContainer = document.createElement("div"),
                sizeLabel = document.createElement("label"),
                sizeSelect = document.createElement("select")

            sizeContainer.classList.add("size")
            product.size.forEach(size => {
                const option = document.createElement("option")
                option.value = size
                option.textContent = size
                sizeSelect.appendChild(option)
            })
            sizeContainer.appendChild(sizeLabel)
            sizeContainer.appendChild(sizeSelect)

            // create local storage cart
            const addToCartBtn = document.createElement("button"),
                btnSpan = document.createElement("span")

            addToCartBtn.innerHTML = `
                    <span>в кошик</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13rem" height="16rem" viewBox="0 0 13 16" fill="none">
                        <path d="M4.14821 4.11111H3.21837C2.36083 4.11111 1.64909 4.74181 1.588 5.55584L1.00424 13.3336C0.936654 14.2341 1.68602 15 2.63461 15H10.5654C11.514 15 12.2633 14.2341 12.1958 13.3336L11.612 5.55584C11.5509 4.74181 10.8392 4.11111 9.98163 4.11111H9.05178M4.14821 4.11111V2.55556C4.14821 1.69645 4.88002 1 5.78274 1H7.41726C8.31998 1 9.05178 1.69645 9.05178 2.55556V4.11111M4.14821 4.11111H9.05178" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`

            addToCartBtn.classList.add("flex")

            addToCartBtn.addEventListener("click", () => {
                const selectedColor = card.querySelector(`input[name='color-${product.id}']:checked`).value,
                    selectedSize = sizeSelect.value,
                    selectedColorAtr = card.querySelector(`input[name='color-${product.id}']:checked`).getAttribute("data-color-name")
                cartItem = {
                    id: product.id,
                    img: product.img,
                    alt: product.alt,
                    head: product.head,
                    price: product.price,
                    color: selectedColor,
                    colorName: selectedColorAtr,
                    size: selectedSize
                }

                let cart = [cartItem]

                localStorage.setItem("cart", JSON.stringify(cart))
                // console.log(cart)
                // alert("Товар додано в кошик!")
                openCart()
            })
            card.appendChild(cardContainer)
            cardContainer.appendChild(picture)
            cardContainer.appendChild(title)
            cardContainer.appendChild(price)
            cardContainer.appendChild(sizeContainer)
            cardContainer.appendChild(btnColorContainer)
            btnColorContainer.appendChild(colorContainer)
            btnColorContainer.appendChild(addToCartBtn)

            container.appendChild(card)
        }

        Object.values(products).forEach(createProductCard)
    })
    .catch(error => console.error("Помилка завантаження JSON:", error))

//cart
const cartPopup = document.querySelector(".cart_popup"),
    darkBg = document.querySelector(".dark-bgc"),
    cartContainer = document.querySelector(".order_container"),
    errorCart = document.querySelector(".error_cart")
document.querySelector("#orderWebsiteURL").value = window.location
document.querySelector("#orderWebsiteURL1").value = window.location
document.querySelector("#orderWebsiteURL2").value = window.location
function openCart() {
    cartPopup.style.display = "block"
    darkBg.style.display = "block"
    
    const cartProduct = JSON.parse(localStorage.getItem("cart"))
    // console.log(cartProduct);
    document.querySelector("#cartData").value = JSON.stringify(cartProduct)
    
    if (Array.isArray(cartProduct) && cartProduct.length > 0) {
        cartContainer.style.display = "grid"
        errorCart.style.display = "none"

        const firstProduct = cartProduct[0],
            imgCart = cartPopup.querySelector(".cart_img img"),
            titleCart = cartPopup.querySelector(".title_cart"),
            colorText = cartPopup.querySelector(".color_text"),
            colorCircle = cartPopup.querySelector(".color_circle"),
            sizeCart = cartPopup.querySelector(".size"),
            priceCart = cartPopup.querySelector(".price")


        imgCart.src = firstProduct.img
        imgCart.alt = firstProduct.alt
        titleCart.innerText = firstProduct.head
        colorText.innerText = firstProduct.colorName
        colorCircle.style.backgroundColor = `${firstProduct.color}`
        sizeCart.innerText = firstProduct.size
        priceCart.innerText = firstProduct.price
    } else {
        errorCart.style.display = "flex"
    }
}
const cartBtn = document.querySelector(".cart"),
    deleteCta = document.querySelector(".delete_cta"),
    cancelCart = document.querySelector(".cancel_cart")

cartBtn.addEventListener("click", function (e) {
    e.preventDefault()
    openCart()
    
})

cancelCart.addEventListener("click", function (e) {
    e.preventDefault()
    cartPopup.style.display = "none"
    darkBg.style.display = "none"
})

darkBg.addEventListener("click", function (e) {
    e.preventDefault()
    cartPopup.style.display = "none"
    darkBg.style.display = "none"
})

deleteCta.addEventListener("click", function (e) {
    e.preventDefault()
    localStorage.removeItem("cart")
    errorCart.style.display = "flex"
    cartContainer.style.display = "none"
})


//перевірка відправки форми для телефону і імені
const inputField = document.querySelectorAll('name'),
    maxLength = 30,
    minLength = 3

const phoneInput = document.querySelectorAll('.phoneInput'),
    errorName = document.querySelectorAll('.error-name'),
    errorTel = document.querySelectorAll('.error-tel')
phoneInput.forEach(item => {
    item.addEventListener('input', function () {
        let phoneNumber = item.value.trim()
        const mask = "+380"
    
        if (!phoneNumber.startsWith(mask)) {
            phoneNumber = mask + phoneNumber
        }
    
        let cleanedValue = phoneNumber.replace(/[^\d+]/g, "")
    
        if (cleanedValue.length > 13) {
            cleanedValue = cleanedValue.slice(0, 13)
        }
    
        const validInput = isValidPhoneNumber(cleanedValue)
    
        if (validInput && cleanedValue.length === 13) {
            item.style.borderColor = 'green'
            item.style.color = '#121212'

            errorTel.forEach(item => { 
                item.innerText = ""
            })
        } else {
            item.style.borderColor = '#EB4242'
            item.style.color = '#EB4242'
            errorTel.forEach(item => { 
                item.innerText = "Введіть коректний номер телефону"
            })
        }
    })
})

function validateForm(form) {
    const phoneInput = form.querySelector("input[name='userPhone']"),
        phoneNumber = phoneInput.value.trim()

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber) || phoneNumber.length < 13) {
        errorTel.forEach(item => { 
            item.innerText =  "Введіть коректний номер телефону"
        })
        return false
    }
    
    const inputFields = form.querySelectorAll("input[name='userName']")
    for (const inputField of inputFields) {
        const userInput = inputField.value.trim()
        if (userInput.length < 3) {
            errorName.forEach(item => { 
                item.innerText =  'Мінімальна кількість символів для імені: 3'
            })
            return false
        }
        if (userInput.length > 30) {
            errorName.forEach(item => { 
                item.innerText =  'Максимальна кількість символів для імені: 30'
            })
            return false
        }
    }
    return true
}

document.querySelectorAll("form[action='sendorder.php'], form[action='senddata.php'], form[action='sendcontact.php']").forEach(form => {
    form.addEventListener("submit", (e) => {
        if (!validateForm(form)) {
            e.preventDefault()
        }
    })
})


function isValidPhoneNumber(phoneNumber) {
    return /^\+?(\d{2})?([(]?\d{3}[)]?)\s?[-]?\s?(?:\d{3})\s?[-]?(?:\s?\d{2})\s?[-]?(?:\s?\d{2})$/.test(phoneNumber)
}

const inputMasks = document.querySelectorAll(".inputMask");

inputMasks.forEach(function (inputMask) {
    inputMask.addEventListener("click", function () {
        if (!inputMask.value) {
            inputMask.value = "+380";
        }
    });

    inputMask.addEventListener("input", function () {
        let inputValue = inputMask.value;
        let cleanedValue = inputValue.replace(/[^\d+]/g, "");

        inputMask.value = cleanedValue;

        if (cleanedValue.length > 13) {
            inputMask.value = cleanedValue.slice(0, 13);
        }

        if (!cleanedValue.startsWith("+380")) {
            inputMask.value = "+380" + cleanedValue.slice(3);
        }
    });
});