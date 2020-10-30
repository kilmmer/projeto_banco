let saldo_total = 0
const saque_negativo = false

function saldo(){
    document.querySelector("main").style.display = "none"
    document.querySelector("#saldo #valor_saldo").value = formatar(saldo_total, false)
    document.querySelector("#saldo").style.display = 'block'
}
function sacar(){
    document.querySelector("main").style.display = "none"
    document.querySelector("#sacar").style.display = 'block'
}
function saque(){
    let valor = document.querySelector("#valor_saque").value.replace(',', '.')
    if(!valor){
        triggerToast('Informe o valor à ser sacado.', 'bg-warning')
        return false
    } else {
        if(saldo_total == 0){
            triggerToast("Atenção! \nSem saldo na conta.", 'bg-danger')
            return false
        }

        if(saque_negativo === false){
            if(valor.replace(",", ".") > saldo_total){
                triggerToast("Saldo insuficiente.", 'bg-danger')
                return false
            }
        }
    }
    saldo_total -= parseFloat(valor.replace(',','.'))
    triggerToast("Saque efetuado com sucesso!", 'bg-success')
    menu()
}
function depositar(){
    document.querySelector("main").style.display = "none"
    document.querySelector("#depositar").style.display = 'block'
}
function deposito(){
    let valor = document.querySelector("#valor_deposito").value
    if(!valor){
        triggerToast('Informe o valor à ser depositado.', 'bg-warning')
        return false
    }
    saldo_total += parseFloat(valor.replace(',','.'))
    triggerToast("Depósito efetuado com sucesso!", 'bg-success')
    menu()
}
function formatar(valor, mask = true){
    if(mask){
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(valor)
    } else {
        return new Intl.NumberFormat('pt-BR', {style: 'decimal', minimumFractionDigits: 2}).format(valor)
    }
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
function triggerToast(content = null, type = "bg-success"){
    const toast = document.querySelector('.toast')
    if(content != null){
        document.querySelector(".toast .toast-body").innerHTML = content
    }
    
    toast.classList.add(type)
    
    new bootstrap.Toast(toast, {autohide: true, animation: true, delay: 3000}).show()
    
    toast.addEventListener('hidden.bs.toast', function () {
        toast.classList.remove(type)
    })
}
function k(i) {
	var v = i.value.replace(/\D/g,'');
	v = (v/100).toFixed(2) + '';
	v = v.replace(".", ",");
	v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
	v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
	i.value = v;
}
