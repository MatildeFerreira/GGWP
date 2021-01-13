//WEB DESIGN II // P3. Visualization/Game APP // 2020/21
//Matilde Ferreira & Guilherme Vila Maior

//função para carregar as imagens antes de correr o resto
function preload() {
  //imagens com as roles
  ADC = loadImage(
    "https://cdn.glitch.com/3b78a30b-b6d9-49a8-9ccc-c3cff4a45fa5%2FADC.svg?v=1609344493090"
  );
  Top = loadImage(
    "https://cdn.glitch.com/3b78a30b-b6d9-49a8-9ccc-c3cff4a45fa5%2FTop.svg?v=1609344493090"
  );
  Support = loadImage(
    "https://cdn.glitch.com/3b78a30b-b6d9-49a8-9ccc-c3cff4a45fa5%2FSupport.svg?v=1609344493090"
  );
  Mid = loadImage(
    "https://cdn.glitch.com/3b78a30b-b6d9-49a8-9ccc-c3cff4a45fa5%2FMid.svg?v=1609344493090"
  );
  Jungle = loadImage(
    "https://cdn.glitch.com/3b78a30b-b6d9-49a8-9ccc-c3cff4a45fa5%2FJungle.svg?v=1609344493090"
  );

  //array com as imagens dos champions
  images = [];

  //Array com o nome dos champs para carregar as imagens
  Champ = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Alistar",
    "Amumu",
    "Anivia",
    "Aphelios",
    "Ashe",
    "AurelionSol",
    "Azir",
    "Bard",
    "Blitzcrank",
    "Brand",
    "Braum",
    "Caitlyn",
    "Camille",
    "Cassiopeia",
    "Chogath",
    "Corki",
    "Darius",
    "Diana",
    "DrMundo",
    "Draven",
    "Ekko",
    "Elise",
    "Evelynn",
    "Ezreal",
    "FiddleSticks",
    "Fiora",
    "Fizz",
    "Galio",
    "Gangplank",
    "Garen",
    "Gnar",
    "Gragas",
    "Graves",
    "Hecarim",
    "Heimerdinger",
    "Illaoi",
    "Irelia",
    "Ivern",
    "Janna",
    "JarvanIV",
    "Jax",
    "Jayce",
    "Jhin",
    "Jinx",
    "Kaisa",
    "Kalista",
    "Karma",
    "Karthus",
    "Kassadin",
    "Katarina",
    "Kayle",
    "Kayn",
    "Kennen",
    "Khazix",
    "Kindred",
    "Kled",
    "KogMaw",
    "Leblanc",
    "LeeSin",
    "Leona",
    "Lillia",
    "Lissandra",
    "Lucian",
    "Lulu",
    "Lux",
    "Malphite",
    "Malzahar",
    "Maokai",
    "MasterYi",
    "MissFortune",
    "Mordekaiser",
    "Morgana",
    "Nami",
    "Nasus",
    "Nautilus",
    "Neeko",
    "Nidalee",
    "Nocturne",
    "Nunu",
    "Olaf",
    "Orianna",
    "Ornn",
    "Pantheon",
    "Poppy",
    "Pyke",
    "Qiyana",
    "Quinn",
    "Rakan",
    "Rammus",
    "RekSai",
    "Rell",
    "Renekton",
    "Rengar",
    "Riven",
    "Rumble",
    "Ryze",
    "Samira",
    "Sejuani",
    "Senna",
    "Seraphine",
    "Sett",
    "Shaco",
    "Shen",
    "Shyvana",
    "Singed",
    "Sion",
    "Sivir",
    "Skarner",
    "Sona",
    "Soraka",
    "Swain",
    "Sylas",
    "Syndra",
    "TahmKench",
    "Taliyah",
    "Talon",
    "Taric",
    "Teemo",
    "Thresh",
    "Tristana",
    "Trundle",
    "Tryndamere",
    "TwistedFate",
    "Twitch",
    "Udyr",
    "Urgot",
    "Varus",
    "Vayne",
    "Veigar",
    "Velkoz",
    "Vi",
    "Viktor",
    "Vladimir",
    "Volibear",
    "Warwick",
    "Wukong",
    "Xayah",
    "Xerath",
    "XinZhao",
    "Yasuo",
    "Yone",
    "Yorick",
    "Yuumi",
    "Zac",
    "Zed",
    "Ziggs",
    "Zilean",
    "Zoe",
    "Zyra"
  ];

  //Carregamento das imagens
  for (i = 0; i < Champ.length; i++) {
    imgURL =
      "https://cdn.glitch.com/3b78a30b-b6d9-49a8-9ccc-c3cff4a45fa5%2F" +
      Champ[i] +
      ".png";
    //carregamento das imagens no array de imagens
    images[Champ[i]] = loadImage(imgURL);
  }
}

function setup() {
  //append a canvas do P5 a div "canvasForHTML" do HTML
  //variavel para o tamanho da canvas, definida no jquery como sendo igual a largura da div CanvasForHTML
  var canvas = createCanvas(CanvasSize, CanvasSize);
  canvas.parent("canvasForHTML");

  //variaveis dos tamanhos das diferentes formas dependem sempre da CanvasSize, para ser responsivo
  RCircle = CanvasSize / 3; //Tamanho do raio do circulo principal com as roles
  imgSizeRoles = CanvasSize / 10; //Tamanho das imagens das roles
  RCircleChamps = CanvasSize / 2.5; //Raio do círculo que contem todos os champions
  imgSize = RCircleChamps / 4; //Tamanho das imagens do champions é metade o raio do circulo dos champions
  CircleGamesSize = CanvasSize / 45; //Tamanho dos circulos de cada jogo

  //mascara para as imagens ficarem em circulo
  circleMask = createGraphics(imgSize, imgSize);
}

//Função que desenha o circulo principal dividido com as roles
function draw() {
  noLoop(); //desenhar só uma vez

  nrDivison = 5; //nr de divisões do circulo (5 roles)
  DivisonAngle = 360 / nrDivison; //anglo entre as divisões
  c = width / 2; //centro do circulo é no centro do canvas

  //propriedades do circulo principal
  fill(17, 18, 23);
  stroke(255);
  strokeWeight(4);

  //circulo principal dividido com as roles
  ellipse(c, c, RCircle * 2);

  //desenhar as 5 linhas divisórias do circulo
  for (i = 0; i < nrDivison; i++) {
    //o ângulo de cada linha é igual a 72 (DivisionAngel 360/5) * o nr da linha + 270
    //270 para a primeira linha ser no centro, reta
    //As seguintes vão de 72 em 72
    angle = DivisonAngle * i + 270;

    //converter anglo em radianos para as coordenadas de x e y
    //multiplicar pelo raio do circulo == tamanho das linhas
    x = cos(radians(angle)) * RCircle;
    y = sin(radians(angle)) * RCircle;

    //desenhar linhas com as coordenadas de x e y até ao centro do circulo
    line(c, c, x + c, y + c);

    //imagens das roles em cada secção
    //Array com o nome de cada role
    role = [Mid, Jungle, Top, Support, ADC];

    //Angulo entre as imagens das roles (a primeira em 90º para ficar centrado em cada divisão do círculo)
    ImageAngle = DivisonAngle * i + 90;

    //posição x das imagens
    imgx = (cos(radians(ImageAngle)) * RCircle) / 1.7;
    //posição y das imagens
    imgy = (sin(radians(ImageAngle)) * RCircle) / 1.7;

    //imagens centradas
    imageMode(CENTER);

    //opacidade das imagens de 50%
    tint(255, 50);

    //desenhar as imagens
    image(role[i], imgx + c, imgy + c, imgSizeRoles, imgSizeRoles);
  }
}

//função para desenhar cada champion jogado
//chamda dentro de um for each loop no jquery
//drawChamps(número total de champions jogados, nome do champion, posição do champion no array que contem todos os champions (no jquery))
function drawChamps(nrChamps, Champ, ChampPos) {
  ChampsAngle = 360 / nrChamps; // anglo entre os champions (circulos)

  angle = ChampsAngle * ChampPos + 90; // anglo de cada champion, a começar em 90 para não ficarem na mesma direção das linhas das roles

  //converter anglo em radianos para as coordenadas de x e y
  //multiplicar pelo raio do circulo dos champions -> distância dos champs ao centro do circulo principal
  x = cos(radians(angle)) * RCircleChamps;
  y = sin(radians(angle)) * RCircleChamps;

  //mascara em circulo da imagem do champion
  circleMask.ellipse(imgSize / 2, imgSize / 2, imgSize);

  //aplicar mascara a imagem do champion
  images[Champ].mask(circleMask);

  //opacidade 100%
  tint(255, 255);

  //Imagem centrada
  imageMode(CENTER);

  //desenhar imagem do champion
  image(images[Champ], x + c, y + c, imgSize, imgSize);

  //desenhar circulo a volta da imagem do champion
  //propriedades
  noFill();
  stroke(17, 18, 23);
  strokeWeight(3);
  //desenhar
  ellipse(x + c, y + c, imgSize, imgSize);
}

//Array que vai conter as posições já preenchidas com jogos
let FilledSpots = [];
//Index das posições no array
let index = 0;

//função para desenhar cada jogo consoante role, a cor do jogo(vitoria/defeat), o nr de champions ja jogados (para calcular a ligação entre o circulo do jogo e o champion desse circulo) e a posição do champion desse jogo no array do jquery
function drawRoles(role, StatusColor, nrChamps, ChampPos) {
  //Array para as filas, com o número de jogos q cada file contem e a distancia ao centro do circulo dessa fila, consoante o tamanho do circulo do jogo
  //Em cada role eixtem 13 filas de jogos
  //Cada file pode conter um número diferente de jogos
  //[nr de jogos por fila][distancia da fila ao centro do circulo principal]
  rows = [
    [15, CircleGamesSize * 14], //fila 0 (a mais afastada do centro), cabem 15 jogos e encontra-se a 14x a largura do circulo do jogo de distância do centro do circulo principal
    [14, CircleGamesSize * 13],
    [13, CircleGamesSize * 12],
    [12, CircleGamesSize * 11],
    [11, CircleGamesSize * 10],
    [10, CircleGamesSize * 9],
    [9, CircleGamesSize * 8],
    [8, CircleGamesSize * 7],
    [7, CircleGamesSize * 6],
    [6, CircleGamesSize * 5],
    [5, CircleGamesSize * 4],
    [4, CircleGamesSize * 3],
    [3, CircleGamesSize * 2]
  ];

  //calculo de uma fila aleatoria para cada jogo
  row = int(random(0, 13));

  //posicionamento aleatorio nessa fila, consoante o numero de jogos que a fila pode ter
  //nunca pode ter a primeira nem a ultima posição, para assegurar margem entre roles diferentes
  pos = int(random(1, rows[row][0] - 1));

  //variavel para averiguar se já foi posicionado algum jogo na mesma fila e na mesma posição dessa fila
  //a primeira vez que a função corre a posição é sempre nova
  newPos = true;

  //a partir da primeira vez, corre um loop pelo array de posições
  for (let i = 0; i < FilledSpots.length; i++) {
    //se já existir um jogo na mesma fila e na mesma posição
    if (row === FilledSpots[i][0] && pos === FilledSpots[i][1]) {
      //a posição não é nova
      newPos = false;
    }
  }
  //Se a posição for nova desenha o jogo
  if (newPos === true) {
    newSpot();
    //se a posição não for nova, corre esta função outra vez para encontrar uma nova posição
  } else {
    drawRoles(role, StatusColor, nrChamps, ChampPos);
  }

  function newSpot() {
    //se a posição é nova, colocá-la no array
    FilledSpots[index] = [row, pos];
    //próxima posição será inserida no index+1
    index += 1;

    //calculo do ângulo que existe entre os jogos da fila que calhou
    //72 (valor do angulo entre as linhas de cada lane) a dividir pelo número de jogos que a filha que calhou pode conter
    JogosAngle = 72 / rows[row][0];

    //angulo de cada jogo é igual ao ângulo entre os jogos da fila que calhou * a posição do jogo nessa fila + o ângulo da role (270 no caso do support)
    angle = JogosAngle * pos + role;

    //converter anglo em radianos para as coordenadas de x e y
    //multiplicar pela distancia de cada fila ao centro do circulo (contida no array com a fila)
    x = cos(radians(angle)) * rows[row][1];
    y = sin(radians(angle)) * rows[row][1];

    //desenhar circulo de cada jogo
    //com a cor consoante foi vitória ou defeat (azul ou vermelho)
    fill(StatusColor);
    noStroke();

    //desenhar o circulo
    ellipse(x + c, y + c, CircleGamesSize, CircleGamesSize);

    //Linha entre cada jogo e o champion desse jogo
    ChampsAngle = 360 / nrChamps; // anglo entre os champions (circulos) (360 a dividir pelo total de champion jogados)
    CHangle = ChampsAngle * ChampPos + 90; //anglo da posição de cada champion (a ChampPos é a posição do champion usado nesse jogo no array do JQuery)

    //converter anglo em radianos para as coordenadas de x e y
    //multiplicar pela distância dos champs ao centro do circulo principal
    ChampX = cos(radians(CHangle)) * RCircleChamps;
    ChampY = sin(radians(CHangle)) * RCircleChamps;

    //desenhar linhas que ligam cada jogo ao champion desse jogo
    //com a cor consoante foi vitória ou defeat (azul ou vermelho)
    stroke(StatusColor);
    //com um stroke de 2
    strokeWeight(2);
    //desenhar a linha
    line(x + c, y + c, ChampX + c, ChampY + c);
  }
}
//Função que limpa o canvas
function clearAll() {
  clear();

  //Array de posições preenchidas é reiniciado
  FilledSpots = [];

  //Index reinicia
  index = 0;
}

//Função que deteta se foi clicado nalgum champion e devolve a posição desse champion (i) no array de champions do jquery
function ChampionName(nrChamps) {
  ChampsAngle = 360 / nrChamps; // anglo entre os champions (circulos)

  for (i = 0; i < nrChamps; i++) {
    angle = ChampsAngle * i + 90; // anglo de cada champion, a começar em 90 para não ficarem na mesma direção das linhas das roles
    
    //converter anglo em radianos para as coordenadas de x e y
    //multiplicar pelo raio do circulo dos champions -> distância dos champs ao centro do circulo principal
    x = cos(radians(angle)) * RCircleChamps;
    y = sin(radians(angle)) * RCircleChamps;

    maxClickx = x + c + imgSize/2;
    minClickx = x + c - imgSize/2;
    minClicky = y + c - imgSize/2;
    maxClicky = y + c + imgSize/2;
    
    if (
      mouseX > minClickx &&
      mouseX < maxClickx &&
      mouseY > minClicky &&
      mouseY < maxClicky
    ) {
      index = i;
    return index;
    }
  }
}