(function(){

  // ------------------- Pavimentos
  function criarTerreo() {
    const janela = document.createElement('div')
    janela.classList.add('janela')

    const terreo = document.createElement('div')
    terreo.classList.add('terreo')
    terreo.setAttribute('andar', "T")
    terreo.appendChild(janela)

    return terreo
  }

  function criarAndar(numeroAndar) {
    const porta = document.createElement('div')
    porta.classList.add('porta')

    const andar = document.createElement('div')
    andar.classList.add('andar')
    andar.setAttribute('andar', numeroAndar)

    andar.appendChild(porta)

    return andar
  }

  function criarPavimentos() {
    const elementosComAndares = document.querySelectorAll('[andares]')
    elementosComAndares.forEach(elComAndares => {
      const qtde = +elComAndares.getAttribute('andares')
      for(let i = qtde; i > 0 ; i--){
        elComAndares.appendChild(criarAndar(i))
      }
      elComAndares.appendChild(criarTerreo())
    })
  }

  // function criarPavimentos(){
  //   const coluna = document.querySelectorAll('[andares]')
  //   coluna.forEach(el => {
  //     const qtdeAndares = +el.getAttribute('andares')
  //     el.appendChild(criarTerreo())
  //     for (let i = 0; i < qtdeAndares; i++){
  //       el.appendChild(criarAndar())
  //     }
  //   })
  // }

  criarPavimentos()

  // ------------------- Elevador
  
  function criarElevador() {
    const poco = document.querySelector('.poco')

    const elevador = document.createElement('div')
    elevador.classList.add('Elevador')
    elevador.style.height = obterTamanhoDoElevador() 

    poco.appendChild(elevador)
  }

  function iniciarMovimentação() {
    const elevador = document.querySelector('.elevador')
    elevador.setAttribute('em-movimentacao', '')
  }

  function finalizarMovimentação() {
    const elevador = document.querySelector('.elevador')
    elevador.removeAttribute('em-movimentacao')
  }

  function iniciarComando(comando) {
    const botao = document.querySelector(`[comando="${comando}"]`)
    botao.classList.add('destaque')
  }
  
    function finalizarComando(comando) {
      const botao = document.querySelector(`[comando="${comando}"]`)
      botao.classList.remove('destaque')
    }

  function emMovimentação() {
    const elevador = document.querySelector('.elevador')
    return elevador.hasAttribute('em-movimentacao')
  }

  function obterTamanhoDoElevador() {
    const terreo = document.querySelector('[andar="T"]')
    // clientHeight retorna a altura sem a borda
    // console.log(terreo.clientHeight)
    return terreo.offsetHeight // offsetHeight retorna a altura com a borda

  }

  function obterPosicaoAtual() {
    const elevador = document.querySelector('.elevador')
    // console.log(elevador.style.bottom.replace(/\D/g, '')) //-> Expressão regular, /D: retira tudo que não é número (Mais robusto)
    return +elevador.style.bottom.replace('px', '') //retirando o px e convertendo para um valor numérico
  }


  function moverElevadorPara(andar) {
    if(emMovimentação()) return

    iniciarMovimentação()
    iniciarComando(andar)
    const numero = andar === 'T' ? 0 : +andar
    const elevador = document.querySelector('.elevador')

    const posicaoInicial = obterPosicaoAtual()
    const posicaoFinal = (numero * obterTamanhoDoElevador())
    const subindo = posicaoFinal > posicaoInicial

    atualizarMostrador(subindo ? 'Subindo' : 'Descendo')

    let temporizador = setInterval(() => {
      const novaPosicao = obterPosicaoAtual() + (subindo ? 10 : -10)
      const terminou = subindo ? novaPosicao >= posicaoFinal : novaPosicao <= posicaoFinal
      elevador.style.bottom = terminou ? posicaoFinal : novaPosicao
      if(terminou){
        clearInterval(temporizador)
        atualizarMostrador(andar === 'T' ? 'Térreo' : `${andar} Andar`)
        finalizarMovimentação()
        finalizarComando(andar)
      }
    },30)

  }

  function aplicarControlesElevador(){
    const botoes = document.querySelectorAll('[comando]')
    botoes.forEach(botao => {
      const comando = botao.getAttribute('comando')
      botao.onclick = function() {
        moverElevadorPara(comando)
      }
    })
  }

  function atualizarMostrador(texto) {
    const mostrador = document.querySelector('.mostrador')
    mostrador.innerHTML = texto
  }

  criarElevador()
  aplicarControlesElevador()
})()