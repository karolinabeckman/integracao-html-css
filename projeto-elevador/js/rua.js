
// -> função auto invocada
(function() {
  function criarFaixas(){
    const elementosComFaixas = document.querySelectorAll('[faixas]')
    elementosComFaixas.forEach(el => {
      const qtde = +el.getAttribute('faixas')
      for(let i = 0; i < qtde; i++){
        const faixa = document.createElement('div')
        faixa.classList.add('faixa')
        el.appendChild(faixa)
      }
    })
  }
  criarFaixas()
})()

// // -> Minha solução
// const rua = document.querySelector('.rua')
// const quantidadeFaixas = rua.getAttribute('faixas')
// for(let i = 0; i< quantidadeFaixas; i++){
//   rua.innerHTML += `<div class="faixa"></div>`
// }