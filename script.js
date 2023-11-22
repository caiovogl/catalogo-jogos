let modalKey = 0

let quantPizzas = 1

let cart = []

const preencherDadosPizza = (pizzaItem,item,index)=>{
    pizzaItem.setAttribute("data-key", index)
    pizzaItem.querySelector("img").src = item.img
    pizzaItem.querySelector("h3").innerHTML = item.name
    //pizzaItem.querySelector(".descricao").innerHTML = item.description
    pizzaItem.querySelector(".preco").innerHTML = `R$${item.price[0].toFixed(2)}`
}

const preencherModal = (item) =>{
    document.querySelector(".pizzaInfo h1").innerHTML = item.name
    document.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$${item.price[0].toFixed(2)}`
    document.querySelector(".pizzaBig img").src = item.img
    document.querySelector(".pizzaInfo--desc").innerHTML = item.description
}

const fecharModal = ()=>{
    document.querySelector(".pizzaWindowArea").style.display = "none"
    console.log("opa")
    
}

const pegarKey = (e)=>{
    let key = e.target.closest(".card-item").getAttribute("data-key")
    
    quantPizzas = 1

    modalKey = key

    return key
}

const adicionarCarrinho = ()=>{
    document.querySelector(".pizzaInfo--addButton").addEventListener("click", (e)=>{

        /*let price = document.querySelector(".pizzaInfo--actualPrice").innerHTML.replace("R$","")
    
        let identificador = catalogoJson[modalKey].id+"t"
        
        let key = cart.findIndex((item)=> item.identificador == identificador)

        if(key > -1){
            cart[key].qt += quantPizzas
        }else{
            let pizza = {
                identificador,
                id: catalogoJson[modalKey].id,
                qt: quantPizzas,
                price: parseFloat(price)
            }
            cart.push(pizza)

        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()*/
        window.location.replace("cadastro.html")
    })
}

/*const fecharCarrinho = ()=>{
    document.querySelector('.menu-closer').addEventListener("click", (e)=>{
        document.querySelector("aside").classList.remove("show")
        document.querySelector("aside").style.left = "100vw"
    })
}*/

document.querySelector(".login").addEventListener("click", ()=>{
    window.location.replace("cadastro.html")
})

const atualizarCarrinho = ()=>{
    document.querySelector('.menu-openner span').innerHTML = cart.length

    if(cart.length>0){
        document.querySelector("aside").classList.add("show")
        document.querySelector('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart){
            let pizzaItem = catalogoJson.find((item)=> item.id == cart[i].id)

            subtotal+=cart[i].price * cart[i].qt

            let cartItem = document.querySelector('.models .cart--item').cloneNode(true)
            document.querySelector('.cart').append(cartItem)

            let pizzaName = `${pizzaItem.name}`

            cartItem.querySelector("img").src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            cartItem.querySelector('.cart--item-qtmais').addEventListener("click", (e)=>{
                cart[i].qt++
                atualizarCarrinho()
            })
            cartItem.querySelector('.cart--item-qtmenos').addEventListener("click", (e)=>{
                if(cart[i].qt>1){
                    cart[i].qt--  
                }else{
                    cart.splice(i,1)
                }

                //if(cart.length<1) document.querySelector("header").style.display = "flex"

                atualizarCarrinho()
            })
            document.querySelector('.cart').append(cartItem)
        }

        desconto = subtotal*0
        total = subtotal - desconto

        document.querySelector('.subtotal span:last-child').innerHTML = `R$${subtotal.toFixed(2)}`
        document.querySelector('.desconto span:last-child').innerHTML = `R$${desconto.toFixed(2)}`
        document.querySelector('.total span:last-child').innerHTML = `R$${total.toFixed(2)}`
    }else{
        document.querySelector("aside").classList.remove("show")
        console.log(document.querySelector("aside").classList)
        document.querySelector("aside").style.left = "100vw"
    }
}

const abrirCarrinho = ()=>{
    if(cart.length>0){
        document.querySelector("aside").classList.add("show")
    }

    document.querySelector(".menu-openner").addEventListener("click", (e)=>{
        if(cart.length>0){
            if(document.querySelector('aside').classList.contains("show")){
                document.querySelector("aside").classList.remove("show")
                document.querySelector("aside").style.left = "100vw"
            }else{
                document.querySelector('aside').classList.add('show')
                document.querySelector('aside').style.left = '0'
            }
        }
        console.log(cart.length)
    })
}

jogos = []

catalogoJson.forEach((jogo) => {
    jogos.push([jogo.id,jogo.fama])
})

jogos.sort(function(a,b) {
    return a[1]-b[1]
});

catalogoJson.map((item, index) => {
    let pizzaItem = document.querySelector(".models .card-item").cloneNode(true);  

    document.querySelector(".card-wrapper").append(pizzaItem)

    if(index === jogos[jogos.length-1][0]){
        jogo = catalogoJson[jogos[jogos.length-1][0]-1]
        document.querySelector(".destaque").src = jogo.img
        document.querySelector(".destaque_nome").innerHTML = jogo.name
    }

    preencherDadosPizza(pizzaItem,item,index)

    pizzaItem.querySelector(".card-item button").addEventListener("click", (e)=>{
        e.preventDefault()

        let chave = pegarKey(e)

        document.querySelector(".pizzaWindowArea").style.display = "flex"

        preencherModal(item)
    })

    document.querySelectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton, .finishBuy--cancelButton, .finishBuy--cancelMobileButton").forEach((item)=>{
        item.addEventListener("click", ()=>{
            fecharModal()
            //fecharCompra()
        })
    })
})

adicionarCarrinho()
//fecharCarrinho()

