//var biodb_server = 'http://darwin.di.uminho.pt:8080';
var biodb_server = 'http://localhost:8080';
var rest_end_point = biodb_server + '/biomass-web/';

//CORS
$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = rest_end_point + options.url;
});

var aa = {
  "A": "Ala",
  "R": "Arg",
  "N": "Asn",
  "D": "Asp",
  "C": "Cys",
  "Q": "Gln",
  "E": "Glu",
  "G": "Gly",
  "H": "His",
  "I": "Ile",
  "L": "Leu",
  "K": "Lys",
  "M": "Met",
  "F": "Phe",
  "P": "Pro",
  "S": "Ser",
  "T": "Thr",
  "W": "Trp",
  "Y": "Tyr",
  "V": "Val"
};

var proteinInput;
var geneInput;

var dnaInput;

var mrnaInput;
var trnaInput;
var rrnaInput;

var proteinRatio;
var dnaRatio;
var rnaRatio;

var mrnaRatio;
var trnaRatio;
var rrnaRatio;

var proteinTemplate;
var dnaTemplate;
var rnaTemplate;

var resultContainer;

var htmlLoading = '<div class="text-center"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading... </div>';

var estimateProtein = function() {
  resultContainer.html(htmlLoading);
  var ajaxData = new FormData();
  ajaxData.append('proteinFile', proteinInput[0].files[0]);
  ajaxData.append('exprFile', geneInput[0].files[0]);
  
  return $.ajax({
    type: "POST",
    url: "predict/protein?ratio=" + proteinRatio.val(),
    cache: false,
    contentType: false,
    processData: false,
    data: ajaxData,
    headers : { 'Accept' : 'application/json'}
  }).done(function(e) {
    resultContainer.html(proteinTemplate(e));
  });
};

var estimateDna = function() {
  resultContainer.html(htmlLoading);
  var ajaxData = new FormData();
  ajaxData.append('dnaFile', dnaInput[0].files[0]);
  return $.ajax({
    type: "POST",
    url: "predict/dna?ratio=" + dnaRatio.val(),
    cache: false,
    contentType: false,
    processData: false,
    data: ajaxData,
    headers : { 'Accept' : 'application/json'}
  }).done(function(e) {
    //console.log(e);
    resultContainer.html(dnaTemplate(e));
  });
};

var estimateRna = function() {
  resultContainer.html(htmlLoading);
  var ajaxData = new FormData();
  ajaxData.append('mrnaFile', mrnaInput[0].files[0]);
  ajaxData.append('trnaFile', trnaInput[0].files[0]);
  ajaxData.append('rrnaFile', rrnaInput[0].files[0]);
  var mrnaVal = mrnaRatio.val();
  var trnaVal = trnaRatio.val();
  var rrnaVal = rrnaRatio.val();
  return $.ajax({
    type: "POST",
    url: "predict/rna?ratio=" + rnaRatio.val() + "&mrnaRatio=" + mrnaVal + "&trnaRatio=" + trnaVal + "&rrnaRatio=" + rrnaVal,
    cache: false,
    contentType: false,
    processData: false,
    data: ajaxData,
    headers : { 'Accept' : 'application/json'}
  }).done(function(e) {
    //console.log(e);
    resultContainer.html(rnaTemplate(e));
  });
};

$(function() {
  proteinTemplate = _.template($('#protein-template').html());
  dnaTemplate = _.template($('#dna-template').html());
  rnaTemplate = _.template($('#rna-template').html());

  resultContainer = $('#result');
  proteinInput = $('#protein_input');
  geneInput = $('#gene_input');

  dnaInput = $('#dna_input');

  proteinRatio = $('#protein_ratio');
  dnaRatio = $('#dna_ratio')
  rnaRatio = $('#rna_ratio');
  
  mrnaInput = $('#mrna_input')
  trnaInput = $('#trna_input')
  rrnaInput = $('#rrna_input')
  
  mrnaRatio = $('#mrna_ratio');
  trnaRatio = $('#trna_ratio');
  rrnaRatio = $('#rrna_ratio');

  console.log("page_loaded");
});