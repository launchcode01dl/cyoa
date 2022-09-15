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
