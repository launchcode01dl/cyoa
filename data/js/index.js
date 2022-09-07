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

  function newSite(value) {   
    document.getElementById('myIframe').src = "data/" + value + ".html";
  }
  function githubSite() {   
    var target= "https://github.com/launchcode01dl/interactive-cyoas-withpointcheat";
    window.open(target, '_blank')
  }