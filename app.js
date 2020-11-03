let saldo_total = 0
const saque_negativo = false
let movimentos = []

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
    let valor = document.querySelector("#valor_saque").value
    if(!valor){
        triggerToast('Informe o valor à ser sacado.', 'bg-warning')
        return false
    } else {
        if(saldo_total == 0){
            triggerToast("Atenção! \nSem saldo na conta.", 'bg-danger')
            return false
        }

        if(saque_negativo === false){
            if(moeda2float(valor) > saldo_total){
                triggerToast("Saldo insuficiente.", 'bg-danger')
                return false
            }
        }
    }

    saldo_total -= moeda2float(valor)
    _movimentos(novoMovimento('Saque', valor))
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

    saldo_total += moeda2float(valor)

    _movimentos(novoMovimento('Depósito', valor))

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
function _movimentos(obj = null){
    // let movimentos = localStorage.getItem('movimentos')
    
    if(obj != null){
        movimentos.push(obj)
    }
    
    return movimentos
}
function extrato(){
    const element = document.querySelector("#extrato")
    document.querySelector("main").style.display = "none"
    element.style.display = 'block'

    let movimentos = _movimentos(null)
    if(movimentos.length > 0){

        let data = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data</th>
                </tr>
            </thead>
            <tbody>`

            movimentos.forEach((e, c) => {
                
                data += `
                    <tr>
                        <th scope="row">${(c+1)}</th>
                        <td>${e.tipo}</td>
                        <td>R$ ${e.valor}</td>
                        <td>${e.data}</td>
                    </tr>`
            })

            data += `
            </tbody>
        </table>`

        element.childNodes[5].innerHTML = data
    } else {
        element.childNodes[5].innerHTML = `<h5>Sem movimentações para exibir</h5>`
    }
    
}
function novoMovimento(tipo, valor){
    return {tipo: tipo, valor: valor, data: new Date().toLocaleString()}
}
function moeda2float(moeda){
    moeda = moeda.replace(".","")
    moeda = moeda.replace(",",".")
    return parseFloat(moeda)
}
function float2moeda(num) {
    x = 0
  
    if(num < 0) {
        num = Math.abs(num)
        x = 1
    }

    if(isNaN(num)){
        num = "0"
    }

    cents = Math.floor((num*100+0.5) % 100)
  
    num = Math.floor((num*100+0.5)/100).toString()
  
    if(cents < 10){
        cents = "0" + cents
    }

    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
        num = num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3))
    }

    ret = num + ',' + cents
    
    if (x == 1){
        ret = ' - ' + ret
    }
    
    return ret
}