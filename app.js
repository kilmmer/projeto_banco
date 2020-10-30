let saldo_total = 0
const saque_negativo = false

function saldo(){
    document.querySelector("main").style.display = "none"
    document.querySelector("#saldo saldo").textContent = formatar(saldo_total)
    document.querySelector("#saldo").style.display = 'block'
}
function sacar(){
    document.querySelector("main").style.display = "none"
    document.querySelector("#sacar").style.display = 'block'
}
function saque(){
    let valor = document.querySelector("#valor_saque").value
    if(!valor){
        alert('Atenção! \nInforme o valor à ser sacado.')
        return false
    } else {
        if(saldo_total == 0){
            alert("Atenção! \nSem saldo na conta.")
            return false
        }

        if(saque_negativo == false){
            if(valor > saldo_total){
                alert("Atenção! \nSaldo insuficiente.")
                return false
            }
        }
    }
    saldo_total -= parseFloat(valor.replace(',','.'))
    triggerToast("Saque efetuado com sucesso!")
    menu()
}
function depositar(){
    document.querySelector("main").style.display = "none"
    document.querySelector("#depositar").style.display = 'block'
}
function deposito(){
    let valor = document.querySelector("#valor_deposito").value
    if(!valor){
        alert('Atenção!\nInforme o valor à ser depositado.')
        return false
    }
    saldo_total += parseFloat(valor.replace(',','.'))
    triggerToast("Depósito efetuado com sucesso!")
    menu()
}
function formatar(valor){
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL' 
    })
    const formatted = formatter.format(valor);
    return formatted
}
function menu() {
    document.querySelectorAll('section').forEach(element => {
        element.style.display = 'none'
    })
    document.querySelectorAll('input').forEach(element => {
        element.value = ''
    })
    document.querySelector("main").style.display = ""
}
function triggerToast(content = null){
    if(content != null){
        document.querySelector(".toast .toast-body").innerHTML = content
    }
    new bootstrap.Toast(document.querySelector('.toast'), {autohide: true, animation: true, delay: 3000}).show()
}
function k(i) {
	var v = i.value.replace(/\D/g,'');
	v = (v/100).toFixed(2) + '';
	v = v.replace(".", ",");
	v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
	v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
	i.value = v;
}
