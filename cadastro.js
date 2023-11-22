/*nome = document.querySelector(".nome")
nascimento = document.querySelector(".nascimento")
cep = document.querySelector(".cep")
email = document.querySelector(".email")
senha = document.querySelector(".senha")

var itens = []

let id

document.querySelector(".button").addEventListener('click', (e)=>{
    console.log({'nome': nome.value, 'nascimento': nascimento.value, 'cep': cep.value, 'email': email.value, 'senha':senha.value})
    itens.push({'nome': nome.value, 'nascimento': nascimento.value, 'cep': cep.value, 'email': email.value, 'senha':senha.value})
    setItensBD()
})

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

itens = getItensBD()

module.exports(itens)*/