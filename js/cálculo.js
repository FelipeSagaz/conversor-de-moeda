const tabela = $(".tabela").find("tbody");
const moedaOrigem = $("#origem");
const quantiaOrigem = $("#quantiaOrigem");
const moedaConversora = $("#convertor");
const taxaConversao = $("#taxa");
const botaoCalcula = $("#calcula");

botaoCalcula.click(function(){
	
	event.preventDefault();

	let invalidos = validaForm();

	if(invalidos.length > 0){
		alert(invalidos);
		return;
	}
	
	realizaProcesso();
	limpaForm();

});
	

function realizaProcesso(){
	calculaQuantiaConvertida();
	criaNovaLinha(tabela);
};

function calculaQuantiaConvertida(){
	let valorQuantia = quantiaOrigem.val();
	let valorTaxa = taxaConversao.val();
	let resultado = (valorQuantia/valorTaxa).toFixed(2);

	return resultado;
};

function criaNovaLinha(tabela){
	const linha = $("<tr>");
	let colunaOrigem = $("<td>").text(moedaOrigem.val());
	let colunaQuantiaOrigem = $("<td>").text(quantiaOrigem.val());
	let colunaMoedaParaConversao = $("<td>").text(moedaConversora.val());
	let colunaTaxa = $("<td>").text(taxaConversao.val());
	let colunaCalculo = $("<td>").text(calculaQuantiaConvertida());

	
	linha.append(colunaOrigem);
	linha.append(colunaQuantiaOrigem);
	linha.append(colunaMoedaParaConversao);
	linha.append(colunaTaxa);
	linha.append(colunaCalculo);

	tabela.append(linha);
};

function limpaForm(){
	quantiaOrigem.val("");
	taxaConversao.val("");
	botaoCalcula.val("");
};

function validaQuantiaOrigem(){
	if(quantiaOrigem.val() <= 0){
		return false;
	}else{
		return true;
	}
}

function validaTaxaConversão(){
	if(taxaConversao.val() <= 0){
		return false;
	}else{
		return true;
	}
}

function validaForm(){
	let erros = [];

	if(moedaOrigem.val() == "") erros.push("A moeda de origem não foi digitada\n");
	if(quantiaOrigem.val() == "") erros.push("A quantia para ser convertida não foi digitada\n");
	if(moedaConversora.val() == "") erros.push("A moeda para convversão não foi digitada\n");
	if(taxaConversao.val() == "") erros.push("A taxa para conversão não foi digitada\n");
	if(validaQuantiaOrigem() == false) erros.push("A quantia para ser convertida não pode ser menor que 0\n");
	if(validaTaxaConversão() == false) erros.push("A taxa de conversão não pode ser menor que 0\n");

	return erros;
}
