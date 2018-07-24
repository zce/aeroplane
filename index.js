// 定义所有游戏参与者
// { name: '张三', position: 0 }
const players = []
const map = []
const luckTurn = [ 7, 55, 69, 51, 83, 98 ]
const landMine = [ 5, 13, 17, 33, 38, 50, 64, 80, 94 ]
const pause = [ 9, 27, 60, 93 ]
const timeTunnel = [ 20, 25, 45, 63, 72, 88, 90 ]

function initMap () {
  for (let i = 0; i < 100; i++) {
    map[i] = 0
  }
  for (let i = luckTurn.length; i > -1; i--) {
    map[luckTurn[i]] = 1 // 幸运轮盘 1 ○
  }
  for (let i = landMine.length; i > -1; i--) {
    map[landMine[i]] = 2 // 地雷 2 ★
  }
  for (let i = pause.length; i > -1; i--) {
    map[pause[i]] = 3 // 暂停 3  △
  }
  for (let i = timeTunnel.length; i > -1; i--) {
    map[timeTunnel[i]] = 4 // 时空隧道 4 卐
  }
}

function renderLogo () {
  console.write('\u001b[2J\u001b[0;0H')
  console.writeline('*******************************************************')
  console.writeline('*                                                     *')
  console.writeline('*                   Aeroplane  Chess                  *')
  console.writeline('*                                                     *')
  console.writeline('*******************************************************')
}

async function recivePlayers () {
  console.write(`请输入Ａ玩家的名称：`)
  const username1 = await console.readline()
  players.push({ name: username1, position: 0 })
  console.writeline(`===== 热烈欢迎Ａ玩家【${username1}】 =====`)
  console.write(`请输入Ｂ玩家的名称：`)
  const username2 = await console.readline()
  players.push({ name: username2, position: 0 })
  console.writeline(`===== 热烈欢迎Ｂ玩家【${username2}】 =====`)
}

async function renderMeta () {
  console.writeline(`${players.map(p => p.name).join('、')}欢迎你们来到飞行棋的世界，你们将在这里一决高下！`)
  console.writeline(`玩家A：${players[0].name}用A表示。`)
  console.writeline(`玩家B：${players[1].name}用B表示。`)
  console.writeline(`如果在一起,就用<>表示。`)
  console.writeline(`干起来.......`)
  console.writeline(`请按下任意键开始游戏~`)
  await console.read()
}

function getMapChar (i) {
  // □☉▩卍☢❈〓
  if (players[0].position === i && players[1].position === i) {
    return console.colors.red.bgWhite('<>')
  } else if (players[0].position == i) {
    return console.colors.red.bgWhite('Ａ')
  } else if (players[1].position == i) {
    return console.colors.red.bgWhite('Ｂ')
  } else {
    switch (map[i]) {
      case 1:
        return console.colors.magenta.bgWhite('炸')
      case 2:
        return console.colors.yellow.bgWhite('定')
      case 3:
        return console.colors.blue.bgWhite('幸')
      case 4:
        return console.colors.green.bgWhite('卐')
      default:
        return console.colors.bgWhite('　')
    }
  }
  return mapString;
}

function renderMap () {
  renderLogo()
  // 打印第1组的地图
  for (let i = 0; i < 30; i++)// 这1组有1行,有30个方框
  {
    console.write(getMapChar(i))
  }
  console.writeline()
  //打印第2组
  for (let i = 30; i < 35; i++)//这组有5行
  {
    for (let j = 0; j < 29; j++)//打印这五行前面的空格
    {
      console.write('  ')
    }
    console.write(getMapChar(i))
    console.writeline()
  }
  //打印第三组
  for (let i = 64; i >= 35; i--)//这一组和第一组一样
  {
    console.write(getMapChar(i))
  }
  console.writeline()
  //打印第四组
  for (let i = 65; i < 70; i++)
  {
    console.write(getMapChar(i))
    console.writeline()
  }
  //打印第五组
  for (let i = 70; i < 100; i++)
  {
    console.write(getMapChar(i))
  }
  console.writeline()
}

function randomStep () {
  return Math.floor(Math.random() * 6) + 1
}

async function startGame () {
  let isStop = [false, false]
  let switcher = 0
  while (players[0].position < 99 && players[1].position < 99) {
    // 轮流操作
    switcher = 1 - switcher
    if (isStop[switcher]) {
      // 如果这个玩家停止 则再轮到下一个玩家操作
      switcher = 1 - switcher
      isStop[switcher] = false
    }
    var player = players[switcher]
    console.write(`玩家【${player.name}】按回车键开始掷骰子~`)
    await console.readline()
    let step = randomStep()
    console.write(`玩家【${player.name}】扔出了[${step}]，按回车键开始移动~`)
    await console.readline()
    player.position += step
    renderMap()
    switch (map[player.position]) {
      case 1:
        console.write(`玩家【${player.name}】猜到了暂停，将暂停一回合~`)
        isStop[switcher] = true
        await console.readline()
        break
      case 2:
        console.write(`玩家【${player.name}】猜到了暂停，将暂停一回合~`)
        isStop[switcher] = true
        await console.readline()
        break
      case 3:
        console.write(`玩家【${player.name}】猜到了暂停，将暂停一回合~`)
        isStop[switcher] = true
        await console.readline()
        break
      case 4:
        console.write(`玩家【${player.name}】猜到了暂停，将暂停一回合~`)
        isStop[switcher] = true
        await console.readline()
        break
    }
  }
}

module.exports = async function () {
  try {
    initMap()
    renderLogo()
    await recivePlayers()
    await renderMeta()
    renderMap()
    await startGame()
  } catch (e) {
    console.log(e)
    process.exit()
  }
}
