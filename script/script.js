//WEB DESIGN II // P3. Visualization/Game APP // 2020/21
//Matilde Ferreira & Guilherme Vila Maior

//Variaveis globais
let SummonerID; //Summoner ID do utilizador

let colorVictory; //cor do jogo (se foi ganho azul)
let colorDefeat; //cor do jogo (se foi perdido vermelho)

let GameData; //Variável para ler o local storage geral
let GameDataRankedSolo; //Variável para ler só o local storage Ranked Solo
let GameDataRankedFlex; //Variável para ler só o local storage Ranked Flex
let GameDataNormal; //Variável para ler só o local storage Normal

let ihavegames = false; //Verificar se existem jogos num modo específico de jogo, do utilizador logged in
let ihavegamesALL = false; //Verificar se existem jogos em qualquer modo de jogo, do utilizador logged in

//tamanho do gráfico P5 é igual a largura da div que o contem
let CanvasSize = $("#canvasForHTML").width();

//trocar CSS para Style CSS Dark Mode
function swapStyleSheet(sheet) {
	document.getElementById("pagestyle").setAttribute("href", sheet);
}

//Quanso de clica em Enter (Fazer "Log In")
$("#enterButton").on("click", function () {
	//Se o nome for preenchido, diferente de vazio
	if ($("#summonerNameInput").val() != "") {
		//play audio
		$("#myAudio")[0].play();

		//Guardar o SummonerID na variável
		SummonerID = $("#summonerNameInput").val(); //SummonerID pelo Input

		//Animação do logotipo da app, deixa de estar visível
		$("#logo")
			.addClass("logoAnim")
			.delay(100)
			.fadeOut(400);

		//Animação do input do summoner name, deixa de estar vísivel
		$("#summonerNameInput")
			.addClass("summonerNameInputAnim")
			.delay(100)
			.fadeOut(400);

		//Animação do botão enter ("Log In"), deixa de estar vísivel
		$("#enterButton")
			.addClass("enterButtonAnim")
			.delay(100)
			.fadeOut(400);

		//Verificar se o utilizador já tem jogos guardados
		CheckSummonerDataALL();
		//Se não tiver jogos
		if (ihavegamesALL === false) {
			//página de explicação
			$(".introID").html(SummonerID);
			$(".barra")
				.delay(600)
				.fadeIn(400);
			$(".intro")
				.delay(900)
				.fadeIn(400);
			$("#ok")
				.delay(1300)
				.fadeIn(400);
		} else {
			//se já tiver não aparece a página de explicação
			enter();
		}
		//se o nome não for preenchido
	} else {
		//animação nas bordas do summonerNameInput
		$("#summonerNameInput")
			.animate({
					borderWidth: 5
				},
				200
			)
			.animate({
					borderWidth: 3
				},
				200
			);
	}

	//Função que verifica se há jogos em pelo menos um modo de jogo do summoner logged in, se não houver o see stats fica greyed out
	CheckSummonerDataALL();
});

$("#ok").on("click", function () {
	enter();
	$(".barra").fadeOut(400);
	$(".intro").fadeOut(400);
	$("#ok").fadeOut(400);
});

//carregar no botão das settings
$(document).on("click", "#settings", function () {
	$(".summoner").fadeOut(400);
	$(".seeStats").fadeOut(500);
	$(".addStats").fadeOut(500);
	$(this).fadeOut(800);
	$(".menu")
		.delay(600)
		.fadeIn(800);
	$(".closeP5")
		.delay(800)
		.fadeIn(800);
});

//alterar o tema para DarkMode
$(document).on("click", ".darkB", function () {
	$(".darkB").hide();
	$(".lightB").show();

	$(".select-items").addClass("DarkMode");

	$(".closeP5, #closeP5").attr(
		"src",
		"img/interface/DarkMode/cruz.png"
	);

	$("#backArrowSee, #backArrowAdd, #previousTableChamp, #previousTableMatches").attr(
		"src",
		"img/interface/DarkMode/arrowleft.png"
	);

	$("#nextTableLanes, #nextTableMatche").attr(
		"src",
		"img/interface/DarkMode/arrowright.png"
	);

	$("#powerOff").attr(
		"src",
		"img/interface/DarkMode/powerOff.png"
	);
	$("#audioOn").attr(
		"src",
		"img/interface/DarkMode/audioOn.png"
	);
	$(this).attr(
		"src",
		"img/interface/DarkMode/moon.png"
	);
});

//alterar o tema para LightMode
$(document).on("click", ".lightB", function () {
	$(".darkB").show();
	$(".lightB").hide();
	$(".select-items").removeClass("DarkMode");

	$(".closeP5, #closeP5").attr(
		"src",
		"img/interface/LightMode/cruz.png"
	);

	$("#backArrowSee, #backArrowAdd, #previousTableChamp, #previousTableMatches").attr(
		"src",
		"img/interface/LightMode/arrowleft.png"
	);

	$("#nextTableLanes, #nextTableMatches").attr(
		"src",
		"img/interface/LightMode/arrowright.png"
	);

	$("#powerOff").attr(
		"src",
		"img/interface/LightMode/powerOff.svg"
	);
	$("#audioOn").attr(
		"src",
		"img/interface/LightMode/audioOn.svg"
	);
});

//retirar o som
$(document).on("click", "#audioOn", function () {
	if ($(".select-items").hasClass("DarkMode") === true) {
		$(this).attr(
			"src",
			"img/interface/DarkMode/audioOff.png"
		);
	} else {
		$(this).attr(
			"src",
			"img/interface/LightMode/audioOff.svg"
		);
	}

	$(this).removeAttr("id");
	$(this).attr("id", "audioOff");
	$("#myAudio")[0].pause();
});

//repor o som
$(document).on("click", "#audioOff", function () {
	if ($(".select-items").hasClass("DarkMode") === true) {
		$(this).attr(
			"src",
			"img/interface/DarkMode/audioOn.png"
		);
	} else {
		$(this).attr(
			"src",
			"img/interface/LightMode/audioOn.svg"
		);
	}

	$(this).removeAttr("id");
	$(this).attr("id", "audioOn");
	$("#myAudio")[0].play();
});

//fechar o menu das settings
$(document).on("click", ".closeP5", function () {
	$(".summoner")
		.delay(600)
		.fadeIn(500);
	$(".seeStats")
		.delay(600)
		.fadeIn(800);
	$(".addStats")
		.delay(600)
		.fadeIn(800);
	$(this).fadeOut(800);
	$(".menu").fadeOut(800);
	$("#settings")
		.delay(1400)
		.fadeIn(800);
});

//Quando se clica em "see stats"
$(".seeStats").on("click", function () {
	$("#settings").fadeOut(600);
	//se houver jogos, o see stats tem opacidade 1, se não houver tem a opacidade 0.2
	//se a opacidade for menor ou igual a 0.2 (não há jogos), o botão não faz nada
	//menor ou igual devido ao fade in em que a opacidade não é logo 2
	if ($(this).css("opacity") <= "0.2") {
		//se a opacidade for outra (1)(há jogos), verificar em que modos de jogo existem jogos
	} else {
		//função que verifica se há jogos num modo de jogo específico, retorna ihavegames = false se não houver, e ihavegames = true se houver
		//Verificar em Ranked Flex
		CheckSummonerData("Ranked Flex");
		//Se não houver jogos em Ranked Flex, botão de ver stats em ranked flex fica greyed out
		if (ihavegames === false) {
			$(".rankedFlex").css({
				opacity: "0.2"
			});
		} else {
			$(".rankedFlex").css({
				opacity: "1"
			});
		}

		//Verificar em Ranked Solo
		CheckSummonerData("Ranked Solo");
		//Se não houver jogos em Ranked Solo, botão de ver stats em Ranked Solo fica greyed out
		if (ihavegames === false) {
			$(".rankedSolo").css({
				opacity: "0.2"
			});
		} else {
			$(".rankedSolo").css({
				opacity: "1"
			});
		}

		//Verificar em Normal
		CheckSummonerData("Normal");
		//Se não houver jogos em Normal, botão de ver stats em Normal fica greyed out
		if (ihavegames === false) {
			$(".normal").css({
				opacity: "0.2"
			});
		} else {
			$(".normal").css({
				opacity: "1"
			});
		}

		//Animação geral dos botões com os modos de jogo, passam a ser vísiveis
		$("#modes")
			.removeClass("modesAnimOut")
			.addClass("modesAnim")
			.fadeIn(400);

		//Botão de Ranked Solo, passa a ser vísivel
		$(".rankedSolo")
			.removeClass("modesMarginAnimOut") //retirar animação de margens saída
			.delay(1000)
			.fadeIn(900);

		//Botão de Ranked Flex, passa a ser vísivel
		$(".rankedFlex")
			.removeClass("modesMarginAnimOut") //retirar animação de margens saída
			.delay(1000)
			.fadeIn(500);

		//Botão de Normal, passa a ser vísivel
		$(".normal")
			.delay(1000)
			.fadeIn(100);

		//Seta de voltar para trás, passa a ser vísivel
		$("#backArrowSee").fadeIn(400);

		//Animação do botão "add stats", deixa de estar vísivel
		$(".addStats")
			.addClass("addStatsAnimOut")
			.fadeOut(400);

		//Animação do botão "see stats", deixa de estar vísivel
		$(this)
			.addClass("seeStatsAnimOut")
			.fadeOut(400);
	}
});

//Quando se clica na seta de voltar para trás de "see stats"
$(document).on("click", "#backArrowSee", function () {
	$("#settings")
		.delay(400)
		.fadeIn(600);
	//Animação do botão "see stats", passa a estar vísivel
	$(".seeStats")
		.removeClass("seeStatsAnimOut") //retirar animação de saída
		.addClass("seeStatsAnim") //adicionar animação de entrada
		.delay(100)
		.fadeIn(2000);

	//Animação do botão "add stats", passa a estar vísivel
	$(".addStats")
		.removeClass("addStatsAnimOut") //retirar animação de saída
		.addClass("addStatsAnim") //adicionar animação de entrada
		.delay(100)
		.fadeIn(2000);

	//Animação geral dos botões com os modos de jogo, deixam de estar vísiveis
	$("#modes")
		.removeClass("modesAnim") //retirar animação de entrada
		.addClass("modesAnimOut"); //adicionar animação de saída

	//Botão de ranked solo, deixa de estar vísivel
	$(".rankedSolo")
		.addClass("modesMarginAnimOut") //adicionar animação das margens de saída
		.delay(200)
		.fadeOut(400);

	//Botão de ranked flex, deixa de estar vísivel
	$(".rankedFlex")
		.addClass("modesMarginAnimOut") //adicionar animação das margens de saída
		.delay(200)
		.fadeOut(400);

	//Botão de normal, deixa de estar vísivel
	$(".normal").fadeOut(400);

	//Seta de voltar para trás de "see stats", deixa de estar vísivel
	$(this).fadeOut(400);
});

//Quando se clica em "add stats"
$(".addStats").on("click", function () {
	$(".indicacao")
		.delay(1400)
		.fadeIn(600);

	//Botão de settings desaparece
	$("#settings").fadeOut(200);

	//Animação do botão "see stats", deixa de ser vísivel
	$(".seeStats")
		.addClass("seeStatsAnimOut")
		.fadeOut(400);

	//Animação do botão "add stats", deixa de ser vísivel
	$(this)
		.addClass("addStatsAnimOut")
		.fadeOut(400);

	//Nome, Nível e Icon do Summoner, deixam de ser vísiveis
	$("#summonerName").fadeOut(400);
	$("#summonerLevel").fadeOut(400);
	$("#summonerIcon").fadeOut(400);

	//Animação do menu de adicionar jogo, passa a ser vísivel
	$(".gameInfoMenus")
		.removeClass("gameInfoMenusAnimOut") //remover a animação de saída
		.addClass("gameInfoMenusAnim") //adicionar animação de entrada
		.delay(400)
		.fadeIn(400);

	//Seta de voltar para trás da página "add game", passa a ser vísivel
	$("#backArrowAdd").fadeIn(400);

	//Botão de adicionar jogo, passa a ser vísivel
	$("#addGame")
		.delay(1400)
		.fadeIn(1000);
});

// Menu de adicionar jogo --- ínicio
//código retirado de https://www.w3schools.com/howto/howto_custom_select.asp
let x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
	selElmnt = x[i].getElementsByTagName("select")[0];
	ll = selElmnt.length;
	/* For each element, create a new DIV that will act as the selected item: */
	a = document.createElement("DIV");
	a.setAttribute("class", "select-selected");
	a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	x[i].appendChild(a);
	/* For each element, create a new DIV that will contain the option list: */
	b = document.createElement("DIV");
	b.setAttribute("class", "select-items select-hide");
	for (j = 1; j < ll; j++) {
		/* For each option in the original select element,
		create a new DIV that will act as an option item: */
		c = document.createElement("DIV");
		c.innerHTML = selElmnt.options[j].innerHTML;
		c.addEventListener("click", function (e) {
			/* When an item is clicked, update the original select box,
			  and the selected item: */
			var y, i, k, s, h, sl, yl;
			s = this.parentNode.parentNode.getElementsByTagName("select")[0];
			sl = s.length;
			h = this.parentNode.previousSibling;
			for (i = 0; i < sl; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName("same-as-selected");
					yl = y.length;
					for (k = 0; k < yl; k++) {
						y[k].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-selected");
					break;
				}
			}
			h.click();
		});
		b.appendChild(c);
	}
	x[i].appendChild(b);
	a.addEventListener("click", function (e) {
		/* When the select box is clicked, close any other select boxes,
		and open/close the current select box: */
		e.stopPropagation();
		closeAllSelect(this);
		this.nextSibling.classList.toggle("select-hide");
	});
}

function closeAllSelect(elmnt) {
	/* A function that will close all select boxes in the document,
	except the current select box: */
	var x,
		y,
		i,
		xl,
		yl,
		arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("select-selected");
	xl = x.length;
	yl = y.length;
	for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i);
		}
	}
	for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
		}
	}
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

// Menu de adicionar jogo --- fim

//Quando se seleciona vitória no menu de adicionar jogo
$(".victory").on("click", function () {
	$(".victory").addClass("victoryselected");
	$(".defeat").removeClass("defeatselected");
});

//Quando se seleciona derrota no menu de adicionar jogo
$(".defeat").on("click", function () {
	$(".defeat").addClass("defeatselected");
	$(".victory").removeClass("victoryselected");
});

//Quando se seleciona um champion, header fica com imagem desse champion
$("#champsbox > .select-items").on("click", function () {
	//variável com a source da imagem, dependendo do champion selecionado
	let imgurl =
		"img/splash/" +
		$("#champs").val()+"_1.jpg";

	//Alterar header
	$(".summoner")
		.css("background-image", "url(" + imgurl + ")") //imagem de fundo passa a ser a imagem do champion selecionado
		.removeClass("summonerAnimUp") //remover animação do Header a subir
		.addClass("summonerAnimDown"); //adicionar animaçã do Header a descer, revelando mais a imagem

	//trocar a source do audio para o do champion
	$("#champAudio").attr(
		"src",
		"sound/champions/" +
		$("#champs").val() +
		".mp3"
	);
	//tocar o audio do champion
	$("#champAudio")[0].play();
});

//Quando se seleciona um mode, header fica com border da cor do mode
$("#modebox > .select-items").on("click", function () {
	let ColorMode; //Variável com a cor do modo de jogo

	if ($("#mode").val() === "Ranked Solo") {
		ColorMode = " #C922A3"; //cor de ranked solo
	} else if ($("#mode").val() === "Normal") {
		ColorMode = " #73EDFC"; //cor de normal
	} else {
		ColorMode = " #9221A7"; //cor de ranked flex
	}
	//Alterar header
	$(".summoner").css("border-bottom", "10px solid" + ColorMode); //border da cor do modo de jogo
});

//Quando se seleciona uma role, icon da role aparece no header
$("#rolebox > .select-items").on("click", function () {
	//variável com a source da imagem, dependendo da role selecionada
	let imgroleurl =
		"img/roles/" +
		$("#role").val() +
		".svg";

	//Animação da role escolhida, passa a ser vísivel
	$("#roleIcon")
		.attr("src", imgroleurl) //Alterar imagem do role Icon
		.addClass("roleIconAnim")
		.fadeIn(500);
});

//Quando se preenche o KDA, KDA aparece no header
$(".kda").keyup(function () {
	let kills = $("#kills").val(); //valor de kills inserido
	let deaths = $("#deaths").val(); //valor de deaths inserido
	let assists = $("#assists").val(); //valor de assists inserido
	//Se todos os valores forem  preenchidos
	if (kills != "" && deaths != "" && assists != "") {
		//Se não houver deaths o valor passa a ser 1 para que a equação seja possível
		if (deaths === "0") {
			deaths = "1";
		}
		//calculo do KDA - (kills+assists)/deaths com apenas uma casa décimal
		let kda = Number.parseFloat(
			(Number(kills) + Number(assists)) / deaths
		).toFixed(1);

		//KDA passa a ser vísivel
		$("#KDA")
			.html("KDA: " + kda) //Preencher no HTML
			.fadeIn(400)
			.addClass("KDAanim"); //Animação do KDA
	}
});

//Quando uma opção é selecionada
$(".select-items").on("click", function () {
	//Variável com a id do item selecionado (se foi o champion, modo de jogo etc)
	let selectedID = $(this)
		.parent()
		.attr("id");
	//em dark mode o seu input torna-se branco
	if ($(this).hasClass("DarkMode") === true) {
		$("#" + selectedID + ">.select-selected").css("color", "rgb(250,250,250)");
	} else {
		//em light mode o seu input torna-se preto
		$("#" + selectedID + ">.select-selected").css("color", "rgb(0,0,0)");
	}
});

//Clicar em adicionar jogo
$("#addGame").on("click", function () {
	//Variáveis para verificar se foi selecionado vitória ou defeat
	colorVictory = $(".victory").css("background-color");
	colorDefeat = $(".defeat").css("background-color");

	//Se todos os parametros forem respondidos
	if (
		($("#modebox > .select-selected").html() != "mode" &&
			$("#champsbox > .select-selected").html() != "champion" &&
			$("#rolebox > .select-selected").html() != "role" &&
			$("#kills").val() != "" &&
			$("#deaths").val() != "" &&
			$("#assists").val() != "" &&
			colorVictory === "rgb(41, 168, 237)") ||
		colorDefeat === "rgb(255, 59, 39)"
	) {
		$("#lockInAudio")[0].play();

		//Guardar o jogo com a key relativa ao modo de jogo escolhido no local storage
		saveGame($("#mode").val());

		//volta ao menu com as opções de "see stats" e "add game"
		//acontece o mesmo que quando se clica na seta de voltar para trás
		backArrowAddGame();

		//se nem todos os parametros forem respondidos
	} else {
		//surge aviso de nem todos estarem preenchidos, piscando
		$("#notallfilled")
			.fadeIn(400)
			.fadeOut(200)
			.fadeIn(400)
			.delay(4000)
			.fadeOut(1000);
	}

	//see stats passa a ter opacidade 1, porque já há pelo menos um jogo guardado
	$(".seeStats").css({
		opacity: "1"
	});
});

//Quano se clica na seta para voltar para trás do menu add game
$("#backArrowAdd").on("click", function () {
	$("#settings")
		.delay(400)
		.fadeIn(600);
	//Corre a função
	backArrowAddGame();
});

//Quando se clica em Ranked Solo
$(".rankedSolo").on("click", function () {
	//Corre a função para este modo de jogo em que desenha o gráfico e surge o header de baixo
	AnimData(
		"Ranked Solo",
		"#C922A3",
		"ranked <span class='modeOutline'>solo</span>"
	);
});

//Clicar em "See Full Stats" de Ranked Solo
$(document).on("click", ".Ranked.Solo", function () {
	$("#fullstats").html("Click Here For Graphic"); //Mudar o HTML de "See Full Stats" para "See Graphic"
	$(this).removeClass("Ranked Solo"); //Remover as classes Ranked Solo do header
	$(this).addClass("RSGraph"); //Adicionar a class RSGraph do header
	$(".tables").fadeIn(800); //Tabelas passam a ser vísiveis
	$(".setaUm").html("most played");
	$(".setaUm").addClass("setaA");
	$(".setaDois").html("lane matches");
	$(".setaDois").addClass("setaB");

	//Gráfico deixa de ser vísivel, e o sketch P5 é limpo
	$("#canvasForHTML").fadeOut(800);
	setTimeout(function () {
		clearAll();
	}, 800);
});

//Clicar em "See Graphic" de Ranked Solo
$(document).on("click", ".RSGraph", function () {
	$("#fullstats").html("Click Here For Full Stats"); //Mudar o HTML de "See Graphic" para "See Full Stats"
	$(this).removeClass("RSGraph"); //remover a classe RSGRaph do header
	$(this).addClass("Ranked Solo"); //adicionar as classes Ranked Solo
	$(".tables").fadeOut(800); //Tabelas deixam de ser vísiveis

	//Corre a função para este modo de jogo em que desenha o gráfico
	AnimData(
		"Ranked Solo",
		"#C922A3",
		"ranked <span class='modeOutline'>solo</span>"
	);
});

//Quando se clica em Ranked Flex
$(".rankedFlex").on("click", function () {
	//Corre a função para este modo de jogo em que desenha o gráfico e surge o header de baixo
	AnimData(
		"Ranked Flex",
		"#9221A7",
		"ranked <span class='modeOutline'>flex</span>"
	);
});

//Quando se clica em "See Full Stats" de Ranked Flex
$(document).on("click", ".Ranked.Flex", function () {
	$("#fullstats").html("Click Here For Graphic"); //Mudar o HTML de "See Full Stats" para "See Graphic"
	$(this).removeClass("Ranked Flex"); //Remover as classes Ranked Flex do header
	$(this).addClass("RFGraph"); ///Adicionar a class RFGraph do header
	$(".tables").fadeIn(800); //Tabelas passam a ser vísiveis
	$(".setaUm").html("most played");
	$(".setaUm").addClass("setaA");
	$(".setaDois").html("lane matches");
	$(".setaDois").addClass("setaB");
	//Gráfico deixa de ser vísivel, e o sketch P5 é limpo
	$("#canvasForHTML").fadeOut(800);
	setTimeout(function () {
		clearAll();
	}, 800);
});

//Quando se clica em "See Graphic" de Ranked Flex
$(document).on("click", ".RFGraph", function () {
	$("#fullstats").html("Click Here For Full Stats"); //Mudar o HTML de "See Graphic" para "See Full Stats"
	$(this).removeClass("RFGraph"); ///Remover a class RFGraph do header
	$(this).addClass("Ranked Flex"); //Adicionar as classes Ranked Flex ao header
	$(".tables").fadeOut(800); //Tabelas passam a ser invísiveis

	//Corre a função para este modo de jogo em que desenha o gráfico
	AnimData(
		"Ranked Flex",
		"#9221A7",
		"ranked <span class='modeOutline'>flex</span>"
	);
});

//Clicar em Normal
$(".normal").on("click", function () {
	//Corre a função para este modo de jogo em que desenha o gráfico
	AnimData("Normal", "#73EDFC", "normal");
});

//Quando se clica em "See Full Stats" de Normal
$(document).on("click", ".Normal", function () {
	$("#fullstats").html("Click Here For Graphic"); //Mudar o HTML de "See Full Stats" para "See Graphic"
	$(".Normal").addClass("NGraph"); ///Adicionar a class NGraph ao header
	$(".Normal").removeClass("Normal"); //Remover a classe Normal do header
	$(".tables").fadeIn(800); //Tabelas passam a ser vísiveis
	$(".setaUm").html("most played");
	$(".setaUm").addClass("setaA");
	$(".setaDois").html("lane matches");
	$(".setaDois").addClass("setaB");

	//Gráfico deixa de ser vísivel, e o sketch P5 é limpo
	$("#canvasForHTML").fadeOut(800);
	setTimeout(function () {
		clearAll();
	}, 800);
});

//Quando se clica em "See Graphic" de normal
$(document).on("click", ".NGraph", function () {
	$("#fullstats").html("Click Here For Full Stats"); //Mudar o HTML de "See Graphic" para "See Full Stats"
	$(".NGraph").addClass("Normal"); //Adicionar a class Normal ao header
	$(".NGraph").removeClass("NGraph"); ///Remover a class NGraph ao header
	$(".tables").fadeOut(800); //Tabelas passam a ser invísiveis

	//Corre a função para este modo de jogo em que desenha o gráfico
	AnimData("Normal", "#73EDFC", "normal");
});

//Quando se clica na seta que revela a tabela de lanes
$(document).on("click", "#nextTableLanes, .setaB", function () {
	//Seta clicada deixa de ser vísivel, porque já não há mais tabelas há direita
	$("#nextTableLanes").fadeOut(400);
	$(".setaB").fadeOut(400);

	//Remover animações das restantes tabelas, acrescentar animação de deslizar da tabela anterior
	$("#matches")
		.removeClass("matchesAnimIn")
		.removeClass("matchesAnimIn2")
		.removeClass("matchesAnimOut2")
		.addClass("matchesAnimOut");

	//Tabela de lanes passa a ser vísivel
	$("#matchesLanes")
		.fadeIn(800)
		.removeClass("matchesLanesAnimOut") //remover animação que a remove
		.addClass("matchesLanesAnimIn"); //adicionar animação que a revela

	//Seta que revelava a tabela de champions passa a revelar a tabela de matches
	$("#previousTableChamp").attr("id", "previousTableMatches");
	$(".setaUm").html("all matches");
	$(".setaDois").fadeOut();
	$(".setaUm").removeClass("setaA");
	$(".setaUm").addClass("setaD");
});

//Quando se clica na seta que revela a tabela de Champions
$(document).on("click", "#previousTableChamp, .setaA", function () {
	//Seta clicada deixa de ser vísivel, porque já não há mais tabelas há esquerda
	$("#previousTableChamp").fadeOut(400);
	$(".setaA").fadeOut(400);
	//Remover animações das restantes tabelas, acrescentar animação de deslizar da tabela anterior
	$("#matches")
		.removeClass("matchesAnimIn")
		.removeClass("matchesAnimOut")
		.removeClass("matchesAnimIn2")
		.addClass("matchesAnimOut2");

	//Tabela de Champions passa a ser vísivel
	$("#matchesChamp")
		.fadeIn(400)
		.addClass("matchesChampAnimIn") //adicionar animação que a revela
		.removeClass("matchesChampAnimOut"); //remover animação que a remove

	//Seta que revelava a tabela de lanes passa a revelar a tabela de matches
	$("#nextTableLanes").attr("id", "nextTableMatches");

	$(".setaDois").removeClass("setaB");
	$(".setaDois").addClass("setaC");
	// $(".setaUm").html("most played");
	$(".setaDois").html("all matches");
});

//Quando se clica na seta da direita que revela a tabela de matches
$(document).on("click", "#nextTableMatches, .setaC", function () {
	//Seta à esquerda da clicada passa a ser vísivel, porque há outra tabela à esquerda
	$("#previousTableChamp").fadeIn(400);

	//Remover animações das restantes tabelas, acrescentar animação de deslizar da tabela anterior
	$("#matches")
		.removeClass("matchesAnimIn")
		.removeClass("matchesAnimOut")
		.removeClass("matchesAnimOut2")
		.addClass("matchesAnimIn2");

	//Tabela de Champions deixa de ser vísivel
	$("#matchesChamp")
		.removeClass("matchesChampAnimIn") //remover animação que a revela
		.addClass("matchesChampAnimOut"); //adicionar animação que a remove

	//Seta que revelava a tabela de matches passa a revelar a tabela de lanes
	$("#nextTableMatches").attr("id", "nextTableLanes");
	$(".setaUm").html("most played");
	$(".setaDois").html("lane matches");
	$(".setaUm").fadeIn();
	$(".setaDois").removeClass("setaC");
	$(".setaDois").addClass("setaB");
});

//Quando se clica na seta da esquerda que revela a tabela de matches
$(document).on("click", "#previousTableMatches, .setaD", function () {
	//Seta à direita da clicada passa a ser vísivel, porque há outra tabela à direita
	$("#nextTableLanes").fadeIn(400);

	//Remover animações das restantes tabelas, acrescentar animação de deslizar da tabela anterior
	$("#matches")
		.removeClass("matchesAnimOut")
		.removeClass("matchesAnimOut2")
		.removeClass("matchesAnimIn2")
		.addClass("matchesAnimIn");

	//Tabela de lanes deixa de ser vísivel
	$("#matchesLanes")
		.removeClass("matchesLanesAnimIn")
		.addClass("matchesLanesAnimOut");

	//Seta que revelava a tabela de matches passa a revelar a tabela de champions
	$("#previousTableMatches").attr("id", "previousTableChamp");
	// $(".setaDois").html("lane matches");
	$(".setaUm").html("most played");
	$(".setaDois").fadeIn();
	$(".setaUm").removeClass("setaD");
	$(".setaUm").addClass("setaA");
});

//---------------------------------------------------------FUNÇÕES--------------------------------------------------------
function enter() {
	//Animação de botão "see stats", passa a ser vísivel
	$(".seeStats")
		.addClass("seeStatsAnim")
		.delay(100)
		.fadeIn(2000);

	//Animação de botão "add stats", passa a ser vísivel
	$(".addStats")
		.addClass("addStatsAnim")
		.delay(100)
		.fadeIn(2000);

	//Animação do header, passa a ser vísivel
	$(".summoner")
		.addClass("summonerAnim")
		.delay(600)
		.fadeIn(2000);

	//Nome, Nivel e Icon, passam a ser vísiveis
	$("#summonerName")
		.delay(1600)
		.fadeIn(400);
	$("#summonerLevel")
		.delay(1800)
		.fadeIn(400);
	$("#summonerIcon")
		.delay(2000)
		.fadeIn(400);

	//Botão de log off, passa a ser vísivel
	$("#settings")
		.delay(2400)
		.fadeIn(400);

	$("#summonerName").html(SummonerID); //Substitui no HTML

	//Calcular Summoner Level aleatório
	let SummonerLevel = 1 + Math.floor(Math.random() * 350);
	$("#summonerLevel").html("lvl " + SummonerLevel); //Substituti no HTML

	//Calcular um Summoner Icon aleatório
	let SummonerIcon = 0 + Math.floor(Math.random() * 262);
	$("#summonerIcon").attr(
		"src",
		"img/icon/Icon_" +
		SummonerIcon +
		".png"
	); //Substituti no HTML
}
//Função para voltar para o menu que contêm os botões de "See stats" e "Add Game" depois de se ter entrado no menu de Add Game
function backArrowAddGame() {
	$(".indicacao").fadeOut(200);

	//Seta clicada deixa de ser vísivel
	$("#backArrowAdd").fadeOut(400);

	//Botão de log out passa a estar vísivel
	$("#settings")
		.delay(1400)
		.fadeIn(400);

	//Nome, nível e icon torna-se vísivel
	$("#summonerName").fadeIn(400);
	$("#summonerLevel").fadeIn(400);
	$("#summonerIcon").fadeIn(400);

	//Header perde a borda do Mode adicionada no menu Add Game
	$(".summoner").css("border-bottom", "4px solid #64D8A9");

	//Role escolhida desaparece do header
	$("#roleIcon").css("display", "none");

	//KDA desaparece do header
	$("#KDA").css("display", "none");

	//Reiniciar menu Add Game
	setTimeout(function () {
		//Warning de não estar tudo preenchido desaparece
		$("#notallfilled")
			.delay(800)
			.css("display", "none");

		//Cor dos inputs volta a cinza
		if ($(".select-items").hasClass("DarkMode") === true) {
			$(".select-selected").css("color", "rgb(200,200,200)");
		} else {
			$(".select-selected").css("color", "rgb(150,150,150)");
		}

		//Restart dos valores originais
		$("#modebox > .select-selected").html("mode");
		$("#champsbox > .select-selected").html("champion");
		$("#rolebox > .select-selected").html("role");
		$("#kills").val("");
		$("#deaths").val("");
		$("#assists").val("");
		$(".defeat").removeClass("defeatselected");
		$(".victory").removeClass("victoryselected");
	}, 1000);

	//Botão de adicionar jogo torna-se invísivel
	$("#addGame")
		.delay(400)
		.fadeOut(400);

	//Animação do Menu de adicionar jogos, torna-se invísivel
	$(".gameInfoMenus")
		.removeClass("gameInfoMenusAnim") //remover classe que o torna visivel
		.addClass("gameInfoMenusAnimOut") //adicionar classe que o torna invisivel
		.delay(200)
		.fadeOut(500);

	//Se o Header estiver aberto, anima-lo para cima
	if ($(".summoner").hasClass("summonerAnimDown")) {
		$(".summoner")
			.removeClass("summonerAnimDown") //remover a classe que o anima para baixo
			.addClass("summonerAnimUp") //acrescentar a classe que o anima para cima
			.css("background-image", "none"); //remover a imagem de fundo do champion
	}

	//Animação do botão "See Stats", torna-se vísivel
	$(".seeStats")
		.removeClass("seeStatsAnimOut") //remover a classe que o torna invisivel
		.addClass("seeStatsAnim") //acrescentar a class que o torna visivel
		.delay(100)
		.fadeIn(2000);

	//Animação do botão "Add Stats", torna-se vísivel
	$(".addStats")
		.removeClass("addStatsAnimOut") //remover a classe que o torna invisivel
		.addClass("addStatsAnim") //acrescentar a class que o torna visivel
		.delay(100)
		.fadeIn(2000);
}

//Função Logout chamada no HTML quando se clica na imagem de poweroff
function logOut() {
	//fazer log out
	window.location.reload();
}

//Função para guardar os jogos, variando a key consoante o modo de jogo escolhido
function saveGame(GameMode) {
	//ler a string existente de dados
	GameData = localStorage.getItem(GameMode);

	//Dados do novo jogo
	const GameChampion = $("#champs").val(); //nome do champion jogado
	const GameRole = $("#role").val(); //nome da role jogada
	const GameKills = Number($("#kills").val()); //numero de kills no jogo
	let GameDeaths = Number($("#deaths").val()); //numbero de deaths no jogo
	const GameAssists = Number($("#assists").val()); //numero de assists no jogo
	let GameStatus; //Se o jogo foi ganho ou perdido

	//verificar se o jogo foi ganho ou perdido pela cor da seleção
	if (colorVictory === "rgb(41, 168, 237)") {
		GameStatus = "Victory";
	} else {
		GameStatus = "Defeat";
	}
	//Se não houver mortes no jogo guardado, as mortes passam a ser 1 para que a operação seja possível
	if (GameDeaths === 0) {
		GameDeaths = 1;
	}

	const GameKDA = (GameKills + GameAssists) / GameDeaths; //KDA do jogo

	//se já houver jogos no array
	if (GameData != null) {
		//converter a string em array
		GameData = JSON.parse(GameData);

		//acrescentar jogo novo
		GameData.push({
			newGame: {
				SummonerID: SummonerID,
				Status: GameStatus,
				Champion: GameChampion,
				Role: GameRole,
				KDA: GameKDA
			}
		});
		//Guardar jogo novo com a key igual ao modo de jogo escolhido (Ranked Solo, Ranked Flex ou Normal);
		localStorage.setItem(GameMode, JSON.stringify(GameData));

		//se ainda não houver jogos no array
	} else {
		//criar array com o novo jogo
		let GameData = [
			{
				newGame: {
					SummonerID: SummonerID,
					Status: GameStatus,
					Champion: GameChampion,
					Role: GameRole,
					KDA: GameKDA
				}
      }
    ];

		//Guardar jogo novo com a key igual ao modo de jogo escolhido (Ranked Solo, Ranked Flex ou Normal);
		localStorage.setItem(GameMode, JSON.stringify(GameData));
	}
}

//verificar se há jogos guardados em pelo menos um modo de jogo
function CheckSummonerDataALL() {
	//verifica o local storage se há jogos no Ranked Solo
	GameDataRankedSolo = localStorage.getItem("Ranked Solo");
	GameDataRankedSolo = JSON.parse(GameDataRankedSolo);

	//verifica o local storage se há jogos no Ranked Flex
	GameDataRankedFlex = localStorage.getItem("Ranked Flex");
	GameDataRankedFlex = JSON.parse(GameDataRankedFlex);

	//verifica o local storage se há jogos em normal
	GameDataNormal = localStorage.getItem("Normal");
	GameDataNormal = JSON.parse(GameDataNormal);

	//para cada jogo em Ranked solo verificar se algum é do utilizador com sessão iniciada
	$.each(GameDataRankedSolo, function (index, value) {
		if (value.newGame.SummonerID === SummonerID) {
			ihavegamesALL = true;
		}
	});

	//para cada jogo em Ranked flex verificar se algum é do utilizador com sessão iniciada
	$.each(GameDataRankedFlex, function (index, value) {
		//somente se o utilizador já tiver jogos guardados com o mesmo SummonerID
		if (value.newGame.SummonerID === SummonerID) {
			ihavegamesALL = true;
		}
	});

	//para cada jogo em Normal verificar se algum é do utilizador com sessão iniciada
	$.each(GameDataNormal, function (index, value) {
		//somente se o utilizador já tiver jogos guardados com o mesmo SummonerID
		if (value.newGame.SummonerID === SummonerID) {
			ihavegamesALL = true;
		}
	});

	//Se não houver nenhum jogo em nenhum modo de jogo
	if (ihavegamesALL === false) {
		//Botão "See Stats" fica com greyed out
		$(".seeStats").css("opacity", "0.2");
		//Se houver pelo menos um jogo em algum modo de jogo
	} else {
		//Botão "See Stats" não fica greyed out
		$(".seeStats").css("opacity", "1");
	}
}

//Verificar se há jogos guardados em determinado GameMode, do summoner com sessão iniciada
function CheckSummonerData(GameMode) {
	//ihavegames começa sempre como falso
	ihavegames = false;
	//verifica o local storage se há jogos no GameMode pedido
	GameData = localStorage.getItem(GameMode);
	//converte os dados de TEXTO em JSON para objeto JS na memória
	GameData = JSON.parse(GameData);

	//para cada jogo verificar se algum é do utilizador com sessão iniciada
	$.each(GameData, function (index, value) {
		if (value.newGame.SummonerID === SummonerID) {
			ihavegames = true; //se for, o ihavegames passa a ser verdadeiro
		}
	});
}
//Função que processa os dados para determinado modo de jogo
function AnimData(GameMode, ModeColor, ModeSpan) {
	//verifica se há jogos guardados nesse modo de jogo
	CheckSummonerData(GameMode);

	//Se houver
	if (ihavegames != false) {
		//Animação geral da pagina de Modos de Jogo, tornam-se invisiveis
		$("#modes")
			.removeClass("modesAnim") //remover a classe que os torna visiveis
			.addClass("modesAnimOut"); //adicionar a classe que os torna invisiveis

		//Animação das margens do botão "Ranked Solo", torna-se invisivel
		$(".rankedSolo")
			.addClass("modesMarginAnimOut")
			.delay(200)
			.fadeOut(400);

		//Animação das margens do botão "Ranked Flex", torna-se invisivel
		$(".rankedFlex")
			.addClass("modesMarginAnimOut")
			.delay(200)
			.fadeOut(400);

		//Botão "Normal", torna-se invisivel
		$(".normal").fadeOut(400);

		setTimeout(function () {
			//função que desenha os jogos e processa a informação guardada
			DrawData(GameMode);
		}, 600);

		//Header deixa de ser vísivvel
		$("#profilePage").animate({
				"margin-top": "-250px"
			},
			1000
		);

		//botão de log out desaparece
		$("#settings").fadeOut(200);

		//Div com o modo de jogo torna-se vísivel, com a classe desse modo de jogo e a border da cor desse modo de jogo
		$("#Mode")
			.addClass(GameMode)
			.css("background-color", ModeColor)
			.delay(1400)
			.fadeIn(800);
		$(".tables td").css("border", "1px solid" + ModeColor);
		$(".tables th").css("border", "1px solid" + ModeColor);
		$(".tabelas").css("border", "3px solid" + ModeColor);

		$("#fullstats")
			.addClass(GameMode)
			.delay(1400)
			.fadeIn(800);

		$("#modeP5")
			.delay(800)
			.fadeIn(600);

		//    $("#fullstats")
		//      .delay(1000)
		//      .fadeIn(600);

		//preencher a div com o modo de jogo selecionado
		$("#modeP5").html(ModeSpan);

		//Seta para voltar atrás deixa de ser vísivel
		$("#backArrowSee").fadeOut(200);

		//Cruz para fechar os gráfico torna-se vísivel
		$("#closeP5")
			.delay(1200)
			.fadeIn(400);

		//Quando se clica na cruz que fecha o P5
		$("#closeP5").on("click", function () {
			//Cruz de fechar o P5 torna-se invísivel
			$(this).fadeOut(800);

			//Seta de voltar para trás torna-se vísivel
			$("#backArrowSee")
				.delay(800)
				.fadeIn(400);

			//Gráfico P5 deixa de ser vísivel
			$("#canvasForHTML").fadeOut(800);

			setTimeout(function () {
				//Sketch P5 é limpo
				clearAll();
			}, 800);

			//Animação geral dos modos de jogo, tornam-se vísiveis
			$("#modes")
				.removeClass("modesAnimOut") //remover a animação que as torna invisiveis
				.addClass("modesAnim") //adicionar animação que as torna vísiveis
				.fadeIn(400);

			//Remover animação das margens do botão "Ranked Solo"
			//Botão "Ranked Solo" torna-se vísivel
			$(".rankedSolo")
				.removeClass("modesMarginAnimOut")
				.delay(1000)
				.fadeIn(900);

			//Remover animação das margens do botão "Ranked Flex"
			//Botão "Ranked Flex" torna-se vísivel
			$(".rankedFlex")
				.removeClass("modesMarginAnimOut")
				.delay(1000)
				.fadeIn(500);

			//Botão "Normal" torna-se vísivel
			$(".normal")
				.delay(1000)
				.fadeIn(100);

			//Header da página torna-se vísivel
			$("#profilePage").animate({
					"margin-top": "0px"
				},
				1000
			);

			//Div que contem o modo de jogo torna-se invísivel e perde as classes
			$("#Mode")
				.removeClass(GameMode)
				.removeClass("NGraph")
				.removeClass("RSGraph")
				.removeClass("RFGraph");

			$("#fullstats")
				.removeClass(GameMode)
				.removeClass("NGraph")
				.removeClass("RSGraph")
				.removeClass("RFGraph")
				.fadeOut(300)
				.html("Click Here For Full Stats");

			$("#modeP5").fadeOut(300);
			$("#Mode").fadeOut(300);

			//Tabelas tornam-se invisíveis
			$(".tables").fadeOut(800);
		});
	}
}
//Função que processa e desenha os dados dos jogos consoante o modo pretendido
function DrawData(GameMode) {
	//desenhar o sketch P5
	draw();

	// verifica o local storage se há jogos no modo pretendido
	GameData = localStorage.getItem(GameMode);
	//converte os dados de TEXTO em JSON para objeto JS na memória
	GameData = JSON.parse(GameData);

	let ArrayChampions = []; //Array com todos os champions jogados

	let ChampionsNumber = []; //Array com o nr de vezes que o champion foi jogado

	let ChampionWR = []; //Array com o winrate do champion jogado
	let ChampionWin = []; //Nr de wins do champion

	//Arrays com o nr de vezes que os champions são jogados em cada lane
	let ChampMid = [];
	let ChampTop = [];
	let ChampJungle = [];
	let ChampADC = [];
	let ChampSupp = [];

	//Array com a soma dos KDAs de cada champion
	let KDA = [];
	//Array com o Average KDA de cada champion
	let ChampKDA = [];

	//Array com a role mais jogada de cada champion
	let ChampLane = [];

	let MTotal = 0; //total de matches
	let VTotal = 0; //total de vitorias
	let DTotal = 0; //total de defeats

	let TTop = 0; //total jogos no top
	let TJungle = 0; //total jogos na jungle
	let TMid = 0; //total jogos no mid
	let TADC = 0; //total jogos como ADC
	let TSupp = 0; //Total jogos como support

	let VTop = 0; //Vitorias no top
	let VJungle = 0; //Vitorias na jungle
	let VMid = 0; //Vitorias no mid
	let VADC = 0; //Vitorias como ADC
	let VSupp = 0; //Vitorias como support

	//para cada jogo verificar o nr de jogos jogados, nr de wins, nr de defeats e os champions jogados com o mesmo summoner ID
	$.each(GameData, function (index, value) {
		//somente para os jogos do utilizador logged in
		if (value.newGame.SummonerID === SummonerID) {
			//nome do champion jogado
			let champion = value.newGame.Champion;

			//se o champion ainda não estiver no array de champions jogados, inseri-lo
			if (ArrayChampions.indexOf(champion) === -1) {
				ArrayChampions.push(champion);

				//inserir no array o nr de vezes que o champion foi jogado (1)
				ChampionsNumber.push(1);

				//inserir no array a wr em percentagem do champion
				if (value.newGame.Status === "Victory") {
					ChampionWin[ArrayChampions.indexOf(champion)] = 1;
					ChampionWR.push("100");
				} else {
					ChampionWin[ArrayChampions.indexOf(champion)] = 0;
					ChampionWR.push("0");
				}

				//Valor de jogos por lane do champion, inicialmente é  0
				ChampMid[ArrayChampions.indexOf(champion)] = 0;
				ChampTop[ArrayChampions.indexOf(champion)] = 0;
				ChampJungle[ArrayChampions.indexOf(champion)] = 0;
				ChampADC[ArrayChampions.indexOf(champion)] = 0;
				ChampSupp[ArrayChampions.indexOf(champion)] = 0;

				//inserir no array relativo a posição jogada, um jogo no mesmo index do champion jogado
				if (value.newGame.Role === "Mid") {
					ChampMid[ArrayChampions.indexOf(champion)] = 1; //1 jogo no Mid
				} else if (value.newGame.Role === "Top") {
					ChampTop[ArrayChampions.indexOf(champion)] = 1; //1 jogo no Top
				} else if (value.newGame.Role === "Jungle") {
					ChampJungle[ArrayChampions.indexOf(champion)] = 1; //1 jogo no Jungle
				} else if (value.newGame.Role === "ADC") {
					ChampADC[ArrayChampions.indexOf(champion)] = 1; //1 jogo no ADC
				} else if (value.newGame.Role === "Support") {
					ChampSupp[ArrayChampions.indexOf(champion)] = 1; //1 jogo no Support
				}

				//inserir no array o KDA do champion
				KDA[ArrayChampions.indexOf(champion)] = value.newGame.KDA;

				//inserir no array o average KDA do champion com uma casa decimal (igual ao KDA pois ainda só foi analisado um jogo)
				ChampKDA[ArrayChampions.indexOf(champion)] = Number.parseFloat(
					KDA[ArrayChampions.indexOf(champion)]
				).toFixed(1);

				//se o champion já estiver no array, atualizar valores dos outros arrays
			} else {
				//Atualizar no array o nr de vezes que o champion foi jogado;
				ChampionsNumber[ArrayChampions.indexOf(champion)] += 1;

				//Atualizar a winrate do champion
				if (value.newGame.Status === "Victory") {
					//se for vitória mais uma win
					ChampionWin[ArrayChampions.indexOf(champion)] += 1;

					//calcular a percentagem de vitórias para o número total de jogos jogados, com uma casa decimal
					ChampionWR[ArrayChampions.indexOf(champion)] = Number.parseFloat(
						(ChampionWin[ArrayChampions.indexOf(champion)] /
							ChampionsNumber[ArrayChampions.indexOf(champion)]) *
						100
					).toFixed(1);
				} else {
					//se for perda calcular novamente, havendo mais um jogo no número total de jogos jogados
					ChampionWR[ArrayChampions.indexOf(champion)] = Number.parseFloat(
						(ChampionWin[ArrayChampions.indexOf(champion)] /
							ChampionsNumber[ArrayChampions.indexOf(champion)]) *
						100
					).toFixed(1);
				}
				//Se a Win Rate do champion for 0, a percentagem é 0% não aparecendo a casa decimal
				if (ChampionWR[ArrayChampions.indexOf(champion)] === "0.0") {
					ChampionWR[ArrayChampions.indexOf(champion)] = "0";
				}

				//Se a Win Rate do champion for 100, a percentagem é 100% não aparecendo a casa decimal
				if (ChampionWR[ArrayChampions.indexOf(champion)] === "100.0") {
					ChampionWR[ArrayChampions.indexOf(champion)] = "100";
				}

				//Atualizar os arrays da lane jogada no mesmo index do champion jogado
				if (value.newGame.Role === "Mid") {
					ChampMid[ArrayChampions.indexOf(champion)] += 1; //+1 jogo no Mid
				} else if (value.newGame.Role === "Top") {
					ChampTop[ArrayChampions.indexOf(champion)] += 1; //+1 jogo no Top
				} else if (value.newGame.Role === "Jungle") {
					ChampJungle[ArrayChampions.indexOf(champion)] += 1; //1 jogo na Jungle
				} else if (value.newGame.Role === "ADC") {
					ChampADC[ArrayChampions.indexOf(champion)] += 1; //+1 jogo de ADC
				} else if (value.newGame.Role === "Support") {
					ChampSupp[ArrayChampions.indexOf(champion)] += 1; //+1 jogo de Support
				}

				//Atualizar KDA do champion
				//Acrescentar o novo KDA ao array que contem a soma total dos KDAs dos champions
				KDA[ArrayChampions.indexOf(champion)] += value.newGame.KDA;

				//Calcular a média do KDA, dividindo a soma total dos KDA (contida no array KDA[] pelo total de jogos jogados com esse champion), com uma casa decimal
				ChampKDA[ArrayChampions.indexOf(champion)] = Number.parseFloat(
					KDA[ArrayChampions.indexOf(champion)] /
					ChampionsNumber[ArrayChampions.indexOf(champion)]
				).toFixed(1);
			}

			//Calculo da lane mais jogada de cada champion
			//Calcular qual o nr mais altos de jogos de todas as lanes jogadas c este champion
			let NRChampLane = Math.max(
				ChampMid[ArrayChampions.indexOf(champion)],
				ChampTop[ArrayChampions.indexOf(champion)],
				ChampJungle[ArrayChampions.indexOf(champion)],
				ChampADC[ArrayChampions.indexOf(champion)],
				ChampSupp[ArrayChampions.indexOf(champion)]
			);
			//se o nr mais alto for de mid, preencher array que contem as lanes mais jogadas de cada champion, com MID
			if (NRChampLane === ChampMid[ArrayChampions.indexOf(champion)]) {
				ChampLane[ArrayChampions.indexOf(champion)] = "Mid";
				//se o nr mais alto for de top, preencher array que contem as lanes mais jogadas de cada champion, com Top
			} else if (NRChampLane === ChampTop[ArrayChampions.indexOf(champion)]) {
				ChampLane[ArrayChampions.indexOf(champion)] = "Top";
				//se o nr mais alto for de jungle, preencher array que contem as lanes mais jogadas de cada champion, com jungle
			} else if (
				NRChampLane === ChampJungle[ArrayChampions.indexOf(champion)]
			) {
				ChampLane[ArrayChampions.indexOf(champion)] = "Jungle";
				//se o nr mais alto for de ADC, preencher array que contem as lanes mais jogadas de cada champion, com ADC
			} else if (NRChampLane === ChampADC[ArrayChampions.indexOf(champion)]) {
				ChampLane[ArrayChampions.indexOf(champion)] = "ADC";
				//se o nr mais alto for de Support, preencher array que contem as lanes mais jogadas de cada champion, com Support
			} else if (NRChampLane === ChampSupp[ArrayChampions.indexOf(champion)]) {
				ChampLane[ArrayChampions.indexOf(champion)] = "Supp";
			}

			//-------------------------CALCULO DOS VALORES DA TABELA----------------------
			MTotal += 1; //total de matches

			if (value.newGame.Status === "Victory") {
				VTotal += 1; //total de vitorias
			} else {
				DTotal += 1; //total de defeats
			}

			if (value.newGame.Role === "Mid") {
				TMid += 1; //Total jogos no Mid

				if (value.newGame.Status === "Victory") {
					VMid += 1; //total de vitorias no Mid
				}
			} else if (value.newGame.Role === "Top") {
				TTop += 1; //Total jogos no Top

				if (value.newGame.Status === "Victory") {
					VTop += 1; //total de vitorias no Top
				}
			} else if (value.newGame.Role === "Jungle") {
				TJungle += 1; //Total jogos na Jungle

				if (value.newGame.Status === "Victory") {
					VJungle += 1; //total de vitorias na Jungle
				}
			} else if (value.newGame.Role === "ADC") {
				TADC += 1; //Total jogos ADC

				if (value.newGame.Status === "Victory") {
					VADC += 1; //total de vitorias ADC
				}
			} else if (value.newGame.Role === "Support") {
				TSupp += 1; //Total jogos Supp
				if (value.newGame.Status === "Victory") {
					VSupp += 1; //total de vitorias de Support
				}
			}
		}
	});

	//Calcular Role mais jogada
	//Array com valores do total de jogos jogados em cada role
	let TRoles = [TMid, TTop, TJungle, TADC, TSupp];
	//Array com o nome de cada role
	let RolesNames = ["Mid", "Top", "Jungle", "ADC", "Supp"];
	//Variavel com o nr de jogos jogados da lane mais jogada
	let MPRole = Math.max(...TRoles);
	//O nome da role mais jogada tem o mesmo index do  valor mais alto no array TRoles
	let Role = RolesNames[TRoles.indexOf(MPRole)];

	//Calcular Champion mais jogado
	//Variavel com o nr de vezes que foi jogado o champion mais jogado
	let MPChamp = Math.max(...ChampionsNumber);
	//O nome do champion mais jogado tem o mesmo index do valor mais alto no array de ChampionsNumber
	let ChampName = ArrayChampions[ChampionsNumber.indexOf(MPChamp)];

	//Variáveis com as Win Rates
	let WRTotal = parseInt((VTotal / MTotal) * 100) + "%"; //Win Rate total
	let WRTop = parseInt((VTop / TTop) * 100) + "%"; //Win Rate no top
	let WRJungle = parseInt((VJungle / TJungle) * 100) + "%"; //Win Rate na jungle
	let WRMid = parseInt((VMid / TMid) * 100) + "%"; //Win Rate no mid
	let WRADC = parseInt((VADC / TADC) * 100) + "%"; //Win Rate como ADC
	let WRSupp = parseInt((VSupp / TSupp) * 100) + "%"; //Win Rate como support

	//Se não houver jogos com a posição, aparece um traço na tabela
	if (TMid === 0) {
		TMid = "-";
	}
	if (TTop === 0) {
		TTop = "-";
	}
	if (TJungle === 0) {
		TJungle = "-";
	}
	if (TADC === 0) {
		TADC = "-";
	}
	if (TSupp === 0) {
		TSupp = "-";
	}

	if (WRMid === "NaN%") {
		WRMid = "-";
	}
	if (WRTop === "NaN%") {
		WRTop = "-";
	}
	if (WRJungle === "NaN%") {
		WRJungle = "-";
	}
	if (WRADC === "NaN%") {
		WRADC = "-";
	}
	if (WRSupp === "NaN%") {
		WRSupp = "-";
	}

	//Preencher as tabelas no HTML
	$("#MTotal").html(MTotal); //Total Matches Jogadas
	$("#VTotal").html(VTotal); //Total de Victories
	$("#DTotal").html(DTotal); //Total de de Defeats
	$("#WRTotal").html(WRTotal); //Win Rate no mid

	$("#TMid").html(TMid); //Total jogos no Mid
	$("#TTop").html(TTop); //Total jogos no Top
	$("#TJungle").html(TJungle); //Total jogos na Jungle
	$("#TADC").html(TADC); //Total jogos ADC
	$("#TSupp").html(TSupp); //Total jogos Supp

	$("#WRMid").html(WRMid); //Win Rate no mid
	$("#WRTop").html(WRTop); //Win Rate no top
	$("#WRJungle").html(WRJungle); //Win Rate na jungle
	$("#WRADC").html(WRADC); //Win Rate como ADC
	$("#WRSupp").html(WRSupp); //Win Rate como support

	$("#MPRole").html(Role); //Role mais jogada

	$("#MPChamp").html(ChampName); //Champion mais jogado
	//Desenhar cada jogo (ponto)
	$.each(GameData, function (index, value) {
		//somente para os jogos do utilizador logged in
		if (value.newGame.SummonerID === SummonerID) {
			let role;
			let StatusColor;
			let champion = value.newGame.Champion;

			//cor do ponto consoante é victory ou defeat
			if (value.newGame.Status === "Victory") {
				StatusColor = color(41, 168, 237);
			} else {
				StatusColor = color(255, 59, 39);
			}

			//posição do ponto consoante a role, ângulo de cada divisão do círculo
			if (value.newGame.Role === "Mid") {
				role = 414;
			} else if (value.newGame.Role === "Top") {
				role = 558;
			} else if (value.newGame.Role === "Jungle") {
				role = 486;
			} else if (value.newGame.Role === "ADC") {
				role = 342;
			} else if (value.newGame.Role === "Support") {
				role = 270;
			}

			//Desenhar pontos e linhas que os ligam aos champions jogados
			drawRoles(
				role,
				StatusColor,
				ArrayChampions.length,
				ArrayChampions.indexOf(champion)
			);
		}
	});

	//desenhar champions jogados
	for (i = 0; i < ArrayChampions.length; i++) {
		drawChamps(ArrayChampions.length, ArrayChampions[i], i);
	}

	//canvas torna-se vísivel
	$("#canvasForHTML").fadeIn(400);

	//Clicar na canvas revela mais informação sobre os champions, se tiver sido clicado um champion
	$("#canvasForHTML").click(function () {
		let checkclick = ChampionName(ArrayChampions.length); //função que devolve o valor do champion no array se um champion for clicado, se o click for fora dos champions devolve undefined

		//se tiver sido clicado um champion
		if (checkclick != undefined) {
			//trocar a source do audio para o do champion
			$("#champAudio").attr(
				"src",
				"sound/champions" +
				ArrayChampions[checkclick] +
				".mp3"
			);
			//tocar o audio do champion
			$("#champAudio")[0].play();

			//preencher com nome do champion clicado

			//se o champion tiver espaço ou aspas no nome, corrigir para o nome correto, se não manter o nome presente no array
			if (ArrayChampions[checkclick] === "AurelionSol") {
				$("#ChampName").html("Aurelion Sol");
			} else if (ArrayChampions[checkclick] === "Chogath") {
				$("#ChampName").html("Cho'Gath");
			} else if (ArrayChampions[checkclick] === "DrMundo") {
				$("#ChampName").html("Dr. Mundo");
			} else if (ArrayChampions[checkclick] === "FiddleSticks") {
				$("#ChampName").html("Fiddlesticks");
			} else if (ArrayChampions[checkclick] === "JarvanIV") {
				$("#ChampName").html("Jarvan IV");
			} else if (ArrayChampions[checkclick] === "Kaisa") {
				$("#ChampName").html("Kai 'Sa");
			} else if (ArrayChampions[checkclick] === "Khazix") {
				$("#ChampName").html("Kha 'Zix");
			} else if (ArrayChampions[checkclick] === "KogMaw") {
				$("#ChampName").html("Kog 'Maw");
			} else if (ArrayChampions[checkclick] === "Leblanc") {
				$("#ChampName").html("LeBlanc");
			} else if (ArrayChampions[checkclick] === "LeeSin") {
				$("#ChampName").html("Lee Sin");
			} else if (ArrayChampions[checkclick] === "MasterYi") {
				$("#ChampName").html("Master Yi");
			} else if (ArrayChampions[checkclick] === "MissFortune") {
				$("#ChampName").html("Miss Fortune");
			} else if (ArrayChampions[checkclick] === "Nunu") {
				$("#ChampName").html("Nunu and Willump");
			} else if (ArrayChampions[checkclick] === "RekSai") {
				$("#ChampName").html("Rek 'Sai");
			} else if (ArrayChampions[checkclick] === "TahmKench") {
				$("#ChampName").html("Tahm Kench");
			} else if (ArrayChampions[checkclick] === "TwistedFate") {
				$("#ChampName").html("Twisted Fate");
			} else if (ArrayChampions[checkclick] === "Velkoz") {
				$("#ChampName").html("Vel 'Koz");
			} else if (ArrayChampions[checkclick] === "XinZhao") {
				$("#ChampName").html("Xin Zhao");
			} else {
				$("#ChampName").html(ArrayChampions[checkclick]);
			}
			//preencher com imagem do champion clicado
			$("#ChampIMG").attr(
				"src",
				"img/loading/" +
				ArrayChampions[checkclick] +
				"_0.jpg"
			);
			//valor da WR do champion
			$(".ChampWRvalue").html(ChampionWR[checkclick] + " %");

			//alterar largura da div de Win
			$("#W").css("width", ChampionWR[checkclick] + "%");
			//alterar largura da div de Defeat
			$("#D").css("width", "100" - ChampionWR[checkclick] + "%");

			//se a win for 100%
			if (ChampionWR[checkclick] === "100") {
				//win tem border radius dos dois lados
				$("#W").css({
					"border-bottom-right-radius": "30px",
					"border-top-right-radius": "30px"
				});
				//se não for 100%
				//win não tem border radius do lado direito
			} else {
				$("#W").css({
					"border-bottom-right-radius": "0px",
					"border-top-right-radius": "0px"
				});
			}
			//se a defeat for 100%
			if (ChampionWR[checkclick] === "0") {
				//defeat tem border dos dois lados
				$("#D").css({
					"border-bottom-left-radius": "30px",
					"border-top-left-radius": "30px"
				});
				//se não for 100%
				//defeat não tem border do lado esquerdo
			} else {
				$("#D").css({
					"border-bottom-left-radius": "0px",
					"border-top-left-radius": "0px"
				});
			}
			//preencher com a lane mais jogada
			$(".ChampLanevalue").html(ChampLane[checkclick]);

			//preencher com o KDA
			$(".ChampKDAvalue").html(ChampKDA[checkclick]);

			//canvas fica invisivel
			$(this).fadeOut(400);

			//div com info do mode fica invisivel
			$("#Mode").fadeOut(400);
			$("#modeP5").fadeOut(400);
			$("#fullstats").fadeOut(400);

			//cruz de fechar o P5 fica invisivel
			$("#closeP5").fadeOut(400);

			//Surge div com a info do champion
			$("#ChampStats").fadeIn(400);
		}
	});
	//se a div do champion for clicada
	$("#ChampStats").click(function () {
		//surge o grafico do P5
		$("#canvasForHTML").fadeIn(400);

		//surge a div com a info do mode
		$("#Mode").fadeIn(400);

		//div com info do mode fica invisivel
		$("#modeP5").fadeIn(400);
		$("#fullstats").fadeIn(400);

		//surge a cruz de fechar o p5
		$("#closeP5").fadeIn(400);

		//div com info do champion fica invisivel
		$(this).fadeOut(400);
	});
}
