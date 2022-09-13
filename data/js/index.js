const mainList = [
  {name: "Brigade", index: "1"},
  {name: "Glyph", index: "2"},
  {name: "Goodworld", index: "3"},
  {name: "Infaera", index: "4"},
  {name: "Kondor", index: "5"},
  {name: "Lennkaz", index: "6"},
  {name: "Lt. Ouroumov", index: "7"},
  {name: "Hikiller", index: "8"},
  {name: "PixelGMS", index: "9"},
  {name: "Pasadena", index: "10"},
  {name: "Punch", index: "11"},
  {name: "Serenity", index: "12"},
  {name: "Traveller", index: "13"}
]

const childList =[
  {index: "1", path: 'custom/brigadewormV6/index', size: '0', name: "Worm V6"},
  {index: "2", path: 'custom/glyphwormV6/index', size: '0', name: "Worm V6"},
  {index: "2", path: 'glyphmha', size: '1.1', name: "MHA"},
  {index: "3", path: 'goodworldmysticmartialarts', size: '3.6', name: "Mystic Martial Arts"},
  {index: "4", path: 'infaeraharrypotter', size: '1', name: "Harry Potter"},
  {index: "4", path: 'infaeraopisekai', size: '6', name: "OP Isekai"},
  {index: "5", path: 'kondorhp', size: '10', name: "Harry Potter"},
  {index: "6", path: 'lennkazjedi', size: '75', name: "SW Jedi"},
  {index: "6", path: 'lennkazsithlord', size: '3.5', name: "SW Sith Lord"},
  {index: "6", path: 'lennkazwarlord', size: '15.5', name: "SW Warlord"},
  {index: "7", path: 'ltouroumovwormv6', size: '45', name: "Worm V6"},
  {index: "10", path: 'pasadenalg', size: '21', name: "Living God"},
  {index: "10", path: 'pasadenawormv3', size: '12', name: "Worm V3"},
  {index: "11", path: 'punchgamer', size: '1', name: "Interactive Gamer"},
  {index: "11", path: 'punchnaruto', size: '30', name: "Naruto"},
  {index: "12", path: 'serenityhp', size: '57', name: "Harry Potter"},
  {index: "13", path: 'travellerpsychic', size: '13', name: "Psychic"}
]

mainList.map(v=>{
  console.log(v);
  var parentList = document.getElementsByClassName('main_side')[0];
  parentList.innerHTML += "<li><a href='#' id='" + v.index + "'>" + v.name +
   "'s CYOAs <span class='fas fa-caret-down'></span></a><ul class='item-show-" + v.index + "'></ul></li>"
})

childList.map(v=>{
  console.log(v);
  var subList = document.getElementsByClassName('item-show-'+v.index)[0];
  if(v.size == "0"){
    subList.innerHTML += "<li><a href='#' value='" + v.path + "' onclick=customSite(this.getAttribute('value'))>" + v.name + "</a></li>"
  }
  else{
    subList.innerHTML += "<li><a href='#' name='" + v.path + "' size='" + v.size +
     "' onclick=commonSite(this.getAttribute('name'),this.getAttribute('size'))>" + v.name + "</a></li>"
  }
})

$('.btn').click(function(){
    $(this).toggleClass("click");
    $('.sidebar').toggleClass("show");
});
$('.sidebar ul li a').click(function(){
  var id = $(this).attr('id');
  $('nav ul li ul.item-show-'+id).toggleClass("show");
  $('nav ul li #'+id+' span').toggleClass("rotate");
});
$('nav ul li').click(function(){
  $(this).addClass("active").siblings().removeClass("active");
});

function commonSite(name,size) { 
  var i = document.getElementById('myIframe');
  i.src = "data/common.html";
  i.name = 'jsons/' + name + '.json';
  i.size = size*(1024**2);
}

function customSite(value) { 
  document.getElementById('myIframe').src = "data/" + value + ".html";
}

function githubSite() {   
  var target= "https://github.com/launchcode01dl/cyoa";
  window.open(target, '_blank')
}
