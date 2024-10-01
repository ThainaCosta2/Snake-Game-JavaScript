console.log('DOM Content Loaded...')

function init() {

  // Pop-ups & botões
  const rules = document.querySelector('#rules')
  // Botão de regras
  const rulesButton = document.querySelector('#rules-btn')
  // Botão Sair
  const exitbtn = document.querySelector('.exit')
  // -------------
  // Botão novo jogo
  const newGame = document.querySelector('#new-game')
  const newRegular = document.querySelector('#new')
  // Perder pop-up
  const losePopUp = document.querySelector('#lose')
  // -------------
  // Audio/música
  const music = document.querySelector('#music')
  const musicbtn = document.querySelector('#musicbtn')

  // Criar variáveis para a grade e células
  const grid = document.querySelector('#grid')
  const width = 20
  const cellCount = width * width
  console.log(cellCount)

  const cells = []

  // Criar variável para a comida
  // Criar variável para os botões, 'novo jogo', 'iniciar', 'pausar-retomar' & 'regras'
  // Criar variável para as regras e o div do pop-up de perder
  // Criar variável para o botão de saída do pop-up
  // Criar variável para o elemento span que atualiza os pontos
  // Criar variável para o botão de música e o elemento de áudio


  // * Grade
  // Criar uma grade 10 x 10 
  // Criar uma grade 10 x 10 usando uma função que tem um for Loop

  function createGrid() {

    for (let i = 0; i < cellCount; i++) {
      // Criar a célula
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cell.id = i
      // cell.innerText = i
      cells.push(cell)

    }
    // Adicione a cobra no início do jogo
    addSnake(currentPosition)

  }

  // * Funções Pupups
  // As Regras
  function handleRulesClick(event) {
    rules.style.visibility = 'visible'
    rules.style.transform = 'scaleX(1) scaleY(1)'
    rules.style.opacity = '1'
  }
  // Função do botão sair
  function exitPopUp() {
    rules.style.visibility = 'hidden'
    rules.style.transform = 'scaleX(0.7) scaleY(0.7)'
    rules.style.opacity = '0'
  }
  // Iniciar novo jogo / função de atualização
  function handleStartAgain() {
    console.log('new game')
    losePopUp.style.visibility = 'hidden'
    losePopUp.style.transform = 'scaleX(0.7) scaleY(0.7)'
    losePopUp.style.opacity = '0'
    window.location.reload(false)
  }

  // Novo jogo regular
  function handleNewGame() {
    console.log('new game')
    window.location.reload(false)
  }

  // * O Aúdio
  // A função da música
  function toggleMusic() {

    if (music.paused) {
      music.play()
      musicbtn.innerText = 'Pause'
    } else {
      music.pause()
      // music.src = ''

      console.log('the music')
      musicbtn.innerText = 'Play'
    }
  }

  // Sons do jogo
  const foodSound = document.querySelector('#food')
  function playSound() {
    // foodSound.src = ''
    foodSound.play()
  }

  const loseSound = document.querySelector('#lose-sound')
  function playLose() {
    loseSound.play()
  }


  // * O personagem Snake
  // Criar variável para a cobra (cabeça)
  const snakeClass = 'snake'

  const startPosition = 44 // Posição INICIAL da cobra
  let currentPosition = [startPosition, startPosition + width] // Posição da cobra que muda


  let snakeMove // variável global acessível - em qualquer lugar

  // Determina a velocidade do intervalo (setInterval)
  let snakeSpeed = 250

  // Faça com que a cobra fique maior a cada pedaço de comida
  // Função com uma instrução if
  // O jogador ganha um ponto para cada pedaço de comida
  const snakeArray = []

  // funçao growBody(posição){
  // snakeArray.push(snakeClass)
  // }

  // * A comida
  const foodClass = 'food'
  // Para a comida
  let randomIndex = Math.floor(Math.random() * 100)

  // ? Acompanhe quanto alimento é consumido para converter no comprimento da cobra ?
  let snakeLength = 0

  // Adicionando a cobra
  function addSnake(positions) {
    positions.forEach((i) => {
      cells[i].classList.add(snakeClass)
    })

  }

  // Removendo a cobra
  function removeSnake(positions) {
    // cells[positions].classList.remove(snakeClass)
    positions.forEach((i) => {
      cells[i].classList.remove(snakeClass)
    })
  }

  // Adicionando classe de comida a células aleatórias
  function addFood() {

    let looping = true
    console.log('snake position', currentPosition)
    console.log('the random number', randomIndex)


    while (looping) {
      randomIndex = Math.floor(Math.random() * 100)
      if (currentPosition.includes(randomIndex)) { // Faça com que a comida não seja adicionada no mesmo lugar que a cobra
        console.log('we don\'t want ->', currentPosition[randomIndex])
        console.log('contains snake body')
      } else {
        cells[randomIndex].classList.add(foodClass) // Adicione comida a esse número de célula aleatório
        console.log('new position')
        looping = false // Pare o loop
      }
    }
  }

  // Coma a comida e faça com que novos alimentos apareçam em uma célula aleatória (após o antigo ser consumido (repetido))
  function eatFood(positions) {
    if (cells[positions[0]].classList.contains(foodClass)) {
      // console.log('snakeArray ->', snakeArray)

      cells[positions[0]].classList.remove(foodClass)
      playSound()
      currentScore += 1
      scoreSpan.innerText = currentScore

      addFood(randomIndex)
      snakeSpeed -= 5
      return true
    }
    return false
  }

  // Se a cobra 'bater' em si mesma -> 'morre'
  function snakeDie(positions) {
    // console.log('snakeDie position ->', currentPosition[0])
    if (currentPosition.includes(positions[0], 1)) {
      playLose()
      console.log('you lose')
      return true
    }
    return false
  }


  // * Os pontos
  const startScore = 0
  let currentScore = startScore
  const scoreSpan = document.querySelector('#score-span')
  scoreSpan.innerText = currentScore

  // Verifique se a classe food está presente - .contains() method
  // condicional
  // se presente , então remova e adicione pontuação

  // Direção anterior
  let oldDirection

  console.log('old direction ->', oldDirection)

  // Permita que o jogador mova a cobra pela grade usando as setas do teclado
  // Evento Keydown

  function handleKeyDown(event) {

    const key = event.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39


    if (oldDirection === up && key === down) {
      return
    } else if (oldDirection === down && key === up) {
      return
    } else if (oldDirection === left && key === right) {
      return
    } else if (oldDirection === right && key === left) {
      return
    } else if (key !== up && key !== down && key !== left && key !== right) {
      return
    }


    // Definir a posição antiga para a tecla pressionada
    oldDirection = key

    // Se não tivesse uma variável global para snakeMove,
    // Não seria possível clearInterval(snakeMove) antes do snakeMove abaixo
    if (snakeMove) {
      clearInterval(snakeMove) // se snakeMove tiver um valor, limpe o intervalo
    }

    // Faça com que a cobra continue se movendo na direção indicada
    snakeMove = setInterval(() => {


      // remove snake na posição antiga
      removeSnake(currentPosition)


      // fluxo de controle

      if (key === up) {
        if (currentPosition[0] - width < 0) {
          currentPosition.unshift(currentPosition[0] + (cellCount - width))
        } else {
          currentPosition.unshift(currentPosition[0] - width)
        }
      } else if (key === down) {
        if (currentPosition[0] + width >= cellCount) {
          currentPosition.unshift(currentPosition[0] - (cellCount - width))
        } else {
          currentPosition.unshift(currentPosition[0] + width)
        }
      } else if (key === left) {
        if (currentPosition[0] % width === 0) {
          currentPosition.unshift(currentPosition[0] + (width - 1))
        } else {
          currentPosition.unshift(currentPosition[0] - 1)
        }
      } else if (key === right) {
        if (currentPosition[0] % width === 19) {
          currentPosition.unshift(currentPosition[0] - (width - 1))
        } else {
          currentPosition.unshift(currentPosition[0] + 1)
        }
      } else {
        console.log('invalid key')
      }

      // impede que o jogador se mova diretamente contra si mesmo
      const snakeCrash = snakeDie(currentPosition)

      if (!!snakeCrash) {
        // window.location.reload(false)
        currentPosition = []
        // snakeMove = false
        losePopUp.style.visibility = 'visible'
        losePopUp.style.transform = 'scaleX(1) scaleY(1)'
        losePopUp.style.opacity = '1'
      }

      // Faça com que novos alimentos apareçam em uma célula  aleatória após o alimento antigo ser consumido(repetido)
      const foodEaten = eatFood(currentPosition)
      // console.log(foodEaten)

      if (!foodEaten) {
        currentPosition.pop()
      }
      // adicione a cobra à nova posição

      addSnake(currentPosition)

      // console.log('modulus', currentPosition[0] % width)

      // console.log('snake speed ->', snakeSpeed)

    }, snakeSpeed)

  }


  // Faça a cobra acelerar enquanto come mais
  // O jogador 'morre' quando 'atinge' a borda da grade ou a si mesmo
  // Um pop-up que informa ao jogador se ele morrer

  // Botão iniciar/Novo jogo
  // - a cada clique, o texto alterna entre 'iniciar' & 'Novo Jogo'


  // ? Eventos
  // Um evento que inicia o jogo(ou inicia um novo jogo)


  // Evento keyDown para que o usuário possa controlar a cobra
  document.addEventListener('keydown', handleKeyDown)

  // Um evento que pausa e retorna o jogo

  // Um evento que mostra as regras
  rulesButton.addEventListener('click', handleRulesClick)
  // Um evento que fecha o pop-up
  exitbtn.addEventListener('click', exitPopUp)
  // Um evento que inicia um novo jogo
  newGame.addEventListener('click', handleStartAgain)

  // Página inicial novo jogo
  newRegular.addEventListener('click', handleNewGame)

  // Um evento para silenciar e ativar o som da música

  musicbtn.addEventListener('click', toggleMusic)


  createGrid()


  // Faça uma célula de comida aparecer em um local aleatório na grade quando o jogo começar
  addFood()

  // * Bônus

  // Botão Pausar/Continuar
  // - a cada clique, o texto alerna entre 'Pausar' e 'Continuar'

  // Criar elementos de portal que permitam ao jogador saltar para diferentes áreas da grade

  // O jgador pode escolher o modo Fácil ou Difícil:
  // Modo Fácil ---> a cobra pode atravessar paredes para o outro lado, morre quando atinge a si mesma
  // Modo Difícil ---> a cobra morre ao bater na parede

  // Dê ao jogador a escolha entre o estilo 'Nova Escola' e 'Velha Escola' 
  // Design Responsivo
  // Modo Multi-jogador
  // Tabela de pontuação máxima
}


window.addEventListener('DOMContentLoaded', init)

