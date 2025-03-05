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
                alert("Товар додано в кошик!")
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
