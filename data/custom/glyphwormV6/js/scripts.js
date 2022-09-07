// this tracks the current sp
var SP = 1000000;

// this tracks the current cp
var CP = 1000000;

// this tracks the current cp to sp conversion
var SPcounter = 0;

// this tracks the current sp to cp conversion
var CPcounter = 0;

// this tracks how many tier 3 power slots have been bought or sold
var T3counter = 0;

// this tracks how many tier 2 power slots have been bought or sold
var T2counter = 0;

// this tracks how many tier 1 power slots have been bought or sold
var T1counter = 0;

// this tracks how many times crossed wires has been taken
var CWcounter = 0;

// this tracks how many tier 3 slots there are
var maxtier3 = 1000;

// this tracks how many tier 2 slots there are
var maxtier2 = 1000;

// this tracks how many tier 1 slots there are
var maxtier1 = 1000;

// this tracks how many kiss cluster members there are
var kisscounter = 0;

// this tracks how many neutral cluster members there are
var neutralcounter = 0;

// this tracks how many kill cluster members there are
var killcounter = 0;

var CGcounter = 0;

var UGcounter = 0;

var GTcounter = 0;

var NMcounter = 0;

var value = 0;
var value1 = 0;

var maxrooms = 5

var counterids = ['SPcounter', 'CPcounter', 'T3counter', 'T2counter', 'T1counter', 'CWcounter', 'CGcounter', 'UGcounter', 'GTcounter', 'NMcounter', 'kisscounter', 'neutralcounter', 'killcounter']
var counterbuttons = ['SPconvert', 'CPconvert', 'T3convert', 'T2convert', 'T1convert', 'CWconvert', 'CGconvert', 'UGconvert', 'GTconvert', 'NMconvert', 'kissconvert', 'neutralconvert', 'killconvert']
var counteradd = ['addSP', 'addCP', 'addT3', 'addT2', 'addT1', 'addCW', 'addCG', 'addUG', 'addGT', 'addNM', 'addkiss', 'addneutral', 'addkill']
var counterremove = ['removeSP', 'removeCP', 'removeT3', 'removeT2', 'removeT1', 'removeCW', 'removeCG', 'removeUG', 'removeGT', 'removeNM', 'removekiss', 'removeneutral', 'removekill']
var counternames = ['+0 SP -0 CP', '+0 CP -0 SP', 'Less Limited Power (Tier 3) [', 'Less Limited Power (Tier 2) [', 'Less Limited Power (Tier 1) [', 'Crossed Wires [', 'Conscious Geas [', 'Unconscious Geas [', 'Gang Target [', 'Nemesis [', 'Kiss Members [', 'Neutral Members [', 'Kill Members [']
var countervars = [SPcounter, CPcounter, T3counter, T2counter, T1counter, CWcounter, CGcounter, UGcounter, GTcounter, NMcounter, kisscounter, neutralcounter, killcounter]
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

window.onload = function () {
  // this is a list of all the different categories of choice that can only have 1 selected, like alignment and age
  var max1 = ['.aware', '.target', '.difficulty', '.scenario', '.alignment1', '.alignment2', '.incarnation', '.age', '.sex', '.gender', '.appearance', '.identity', '.job', '.education', '.homelife', '.shard', '.shardranking', '.powercopy', '.tier1', '.oops', '.settinglocation', '.location', '.locationnonearth', '.basesize', '.baseconcealment']

  // this makes a list of all the choices, doesn't include menu buttons
  var choices = document.getElementsByClassName('choice');

  // this just goes through the list
  for (var i = 0; i < choices.length; i++) {

    // this tracks which choice out of the list is currently being looked at
    var choice = choices[i];

    // this basically just makes the choices that have a max of more than 1 exempt from the next bit of code, i don't know why this is necessary but it breaks without it by being able to take unlimited options that should be limited
    if (choice.classList.contains('tier3') == false && choice.classList.contains('tier2') == false && choice.classList.contains('tier1') == false && choice.classList.contains('powercopy') == false && choice.classList.contains('tier1st') == false && choice.classList.contains('tier2st') == false && choice.classList.contains('changerendbringerpower') == false && choice.classList.contains('masterendbringerpower') == false) {

      // if there's more than 1 choice selected in a category that should only have 1 selected at most it will go through the checked choices and uncheck the first one that isn't the thing that was just clicked
      choice.onclick = function () {
        for (var x = 0; x < max1.length; x++) {
          var checkedChecks = document.querySelectorAll(max1[x] + ':checked');
          if (checkedChecks.length >= 2) {
            for (var y = 0; y < checkedChecks.length; y++) {
              if (checkedChecks[y] != this) {
                checkedChecks[y].click();
                break;
              }
            }
          }
        }
      }
    }
  }
  // this makes a list of all the menu buttons that open up another section and don't do anything else
  var tabs = document.getElementsByClassName('tab');
  // this just goes through the list and makes it so a thing happens no matter which one you press
  for (var i = 0; i < tabs.length; i++) {
    // this tracks which menu button out of the list is currently being looked at
    var tab = tabs[i];

    // this takes the id of the menu button, removes the last 2 letters which are id, adds section to the string of text, and uses that to find the id of the related section and removes the hide class from it, which makes the section display
    tab.oninput = function () {
      var section = this.id.substr(0, this.id.length - 2) + 'section';
      if (this.checked == true) document.getElementsByClassName(section)[0].classList.remove('hide');
      else document.getElementsByClassName(section)[0].classList.add('hide');
    }
  }

  // this makes a list of all the main menu buttons
  var maintabs = document.getElementsByClassName('maintab');
  // this just goes through the list and makes it so a thing happens no matter which one you press
  for (var i = 0; i < maintabs.length; i++) {
    // this tracks which menu button out of the list is currently being looked at
    var maintab = maintabs[i];

    // this does exactly what the function above does but it also prevents the section from closing if the open all button is selected when you unselect a menu button
    maintab.oninput = function () {
      var section = this.id.substr(0, this.id.length - 2) + 'section';
      if (this.checked == true) document.getElementsByClassName(section)[0].classList.remove('hide');
      else if (document.getElementById('openallid').checked == false) { document.getElementsByClassName(section)[0].classList.add('hide'); }
    }
  }

  // this section does exactly what the above section does except for the character menu buttons, so i'm not going to comment on it too much
  var characters = document.getElementsByClassName('character');
  for (var i = 0; i < characters.length; i++) {
    var character = characters[i];
    character.oninput = function () {
      var section = this.id.substr(0, this.id.length - 2) + 'section';
      if (this.checked == true) document.getElementsByClassName(section)[0].classList.remove('hide');
      else if (document.getElementById('characteropenallid').checked == false) document.getElementsByClassName(section)[0].classList.add('hide');
    }
  }
  // this section does exactly what the above section does except for the power menu buttons, so i'm not going to comment on it too much
  var powers = document.getElementsByClassName('powers');
  for (var i = 0; i < powers.length; i++) {
    var power = powers[i];
    power.oninput = function () {
      var section = this.id.substr(0, this.id.length - 2) + 'section';
      if (this.checked == true) document.getElementsByClassName(section)[0].classList.remove('hide');
      else if (document.getElementById('powersopenallid').checked == false) document.getElementsByClassName(section)[0].classList.add('hide');
    }
  }
  // this makes a list of all the tier 3 powers
  var tier3s = document.getElementsByClassName('tier3');

  // this just goes through the list and makes it so a thing happens no matter which one you press
  for (var i = 0; i < tier3s.length; i++) {

    // this tracks which choice out of the list is currently being looked at
    var tier3 = tier3s[i];

    tier3.onclick = function () {
      // if there's more tier 3 powers selected than there are tier 3 slots then it will go through the checked choices and uncheck the first one that isn't the thing that was just clicked
      var checkedChecks = document.querySelectorAll(".tier3:checked");
      document.getElementById('t3').innerHTML = checkedChecks.length;
      if (checkedChecks.length >= maxtier3 + 1) {
        for (var i = 0; i < checkedChecks.length; i++) {
          if (checkedChecks[i] != this) {
            checkedChecks[i].click();
            break;
          }
        }
      }

      // this finds what number in the list of tier 3 powers the one just clicked, this is done to find the number of the corresponding second trigger in the list of tier 3 second triggers
      for (var i = 0; i < document.getElementsByClassName('tier3').length; i++) {
        if (this == document.getElementsByClassName('tier3')[i]) {
          var index = i
        }
      }
      // if the option just clicked is being selected it will enable the corresponding second trigger and disable it if the option is being unselected
      if (this.checked == true) {
        document.getElementsByClassName('tier3st')[index].disabled = false
        document.getElementsByName(document.getElementsByClassName('tier3st')[index].id)[0].classList.remove('disabled')
      } else {
        if (document.getElementsByClassName('tier3st')[index].checked) { document.getElementsByClassName('tier3st')[index].click() }
        document.getElementsByClassName('tier3st')[index].disabled = true
        document.getElementsByName(document.getElementsByClassName('tier3st')[index].id)[0].classList.add('disabled')
      }
    }
  }

  // this does basically the same thing as the above section except for tier 2 powers
  var tier2s = document.querySelectorAll(".tier2");
  for (var i = 0; i < tier2s.length; i++) {
    tier2 = tier2s[i]
    tier2.onclick = function () {
      var checkedChecks = document.querySelectorAll(".tier2:checked");
      document.getElementById('t2').innerHTML = checkedChecks.length;
      if (checkedChecks.length >= maxtier2 + 1) {
        for (var i = 0; i < checkedChecks.length; i++) {
          if (checkedChecks[i] != this) {
            checkedChecks[i].click();
            break;
          }
        }
      }
      for (var i = 0; i < document.getElementsByClassName('tier2').length; i++) {
        if (this == document.getElementsByClassName('tier2')[i]) {
          var index = i
        }
      }
      if (this.checked == true) {
        document.getElementsByClassName('tier2st')[index].disabled = false
        document.getElementsByName(document.getElementsByClassName('tier2st')[index].id)[0].classList.remove('disabled')
      } else {
        if (document.getElementsByClassName('tier2st')[index].checked) { document.getElementsByClassName('tier2st')[index].click() }
        document.getElementsByClassName('tier2st')[index].disabled = true
        document.getElementsByName(document.getElementsByClassName('tier2st')[index].id)[0].classList.add('disabled')
      }
    }
  }

  // this is the exact same thing as above but for tier 1 powers
  var tier1s = document.querySelectorAll(".tier1");
  for (var i = 0; i < tier1s.length; i++) {
    tier1 = tier1s[i]
    tier1.onclick = function () {
      var checkedChecks = document.querySelectorAll(".tier1:checked");
      document.getElementById('t1').innerHTML = checkedChecks.length;
      if (checkedChecks.length >= maxtier1 + 1) {
        for (var i = 0; i < checkedChecks.length; i++) {
          if (checkedChecks[i] != this) {
            checkedChecks[i].click();
            break;
          }
        }
      }
      for (var i = 0; i < document.getElementsByClassName('tier1').length; i++) {
        if (this == document.getElementsByClassName('tier1')[i]) {
          var index = i
        }
      }
      if (this.checked == true) {
        document.getElementsByClassName('tier1st')[index].disabled = false
        document.getElementsByName(document.getElementsByClassName('tier1st')[index].id)[0].classList.remove('disabled')
      } else {
        if (document.getElementsByClassName('tier1st')[index].checked) { document.getElementsByClassName('tier1st')[index].click() }
        document.getElementsByClassName('tier1st')[index].disabled = true
        document.getElementsByName(document.getElementsByClassName('tier1st')[index].id)[0].classList.add('disabled')
      }
    }
  }

  var companions = document.querySelectorAll(".companion");
  for (var i = 0; i < companions.length; i++) {
    companion = companions[i]
    companion.onclick = function () {
      var checkedChecks = document.querySelectorAll(".companion:checked");
      if (checkedChecks.length >= 3 + 1) {
        for (var i = 0; i < checkedChecks.length; i++) {
          if (checkedChecks[i] != this) {
            checkedChecks[i].click();
            break;
          }
        }
      }
    }
  }

  var baserooms = document.querySelectorAll(".basefeature");
  for (var i = 0; i < baserooms.length; i++) {
    baseroom = baserooms[i]
    baseroom.onclick = function () {
      var checkedChecks = document.querySelectorAll(".basefeature:checked");
      if (checkedChecks.length >= maxrooms + 1) {
        for (var i = 0; i < checkedChecks.length; i++) {
          if (checkedChecks[i] != this) {
            checkedChecks[i].click();
            break;
          }
        }
      }
    }
  }
  
  // var stbutton = document.getElementsByClassName('stbutton')
  // var dumbbutton = document.getElementsByClassName('dumbbutton')
  // for (var i = 0; i < stbutton.length; i++) {
  //   const circle = document.createElement("h3");
  //   circle.classList.add('header')
  //   circle.innerHTML = "Second Trigger"
  //   const cost = document.createElement("div");
  //   cost.classList.add('subhead')
  //   stbutton[i].prepend(cost);
  //   stbutton[i].prepend(circle);
  //   const circle1 = document.createElement("h3");
  //   circle1.classList.add('dumbheader')
  //   circle1.innerHTML = "Second Trigger"
  //   const cost1 = document.createElement("div");
  //   cost1.classList.add('dumbsubhead')
  //   dumbbutton[i].prepend(cost1);
  //   dumbbutton[i].prepend(circle1);
  //   const price = [];
  //   const price1 = [];
  //   var stchoice = document.getElementsByClassName('stchoice')
  //   for (var x = 0; x < stchoice.length; x++) {
  //     price.push(document.getElementsByName(stchoice[x].id)[0].childNodes[3])
  //     document.getElementById('SP').innerHTML = price[0].innerHTML
  //     // for (var y = 0; y < document.getElementsByName(stchoice[x].id).childNodes[1].length; y++) {
  //     //   for (var i = 0; i < stchoice[x].childNodes.length; i++) {
  //     //     if (stchoice[x].childNodes[i].classlist.contains('cost')) {
  //     //       price.push(stchoice[x].childNodes[i]);
  //     //       break
  //     //     }        
  //     //   }
  //     // }
  //   }
  //   for (var x = 0; x < price.length; ++x) {
  //     price1.push(price[x].innerHTML.replace(/\D/g, ''))
  //   }
  //   cost.innerHTML = "Cost: " + Math.round(price1[i]/2) + " SP"
  //   cost1.innerHTML = "Cost: " + Math.round(price1[i]/2) + " SP"
  // }
}

// this changes how many points you have
function PointChange(SPChange, CPChange, elem) {
  if (document.getElementById('aagr').checked == true && value == 1){
    if (SPChange > 0) SPChange = Math.round (SPChange*2)
    if (CPChange > 0) CPChange = Math.round (CPChange*2)
  }
  if (document.getElementById('aagt').checked == true && value == 1){
    if (SPChange > 0) SPChange = Math.round (SPChange/2)
    if (CPChange > 0) CPChange = Math.round (CPChange/2)
  }
  if (value == 2){
    if (SPChange > 0) SPChange = Math.round (SPChange/2)
    if (CPChange > 0) CPChange = Math.round (CPChange/2)
  }
  if (value == 3){
    if (SPChange > 0) SPChange = Math.round (SPChange*2)
    if (CPChange > 0) CPChange = Math.round (CPChange*2)
  }
  if (elem.checked == true) {
    SP = SP + SPChange;
    CP = CP + CPChange;
  } else {
    SP = SP - SPChange;
    CP = CP - CPChange;
  }
  document.getElementById('SP').innerHTML = SP;
  document.getElementById('CP').innerHTML = CP;
}

// this just prevents two things that are incompatible with the same thing from conflicting, like if you took both case 53 and servant and unselect one it won't enable handicap
function multiincompatible(SPChange, CPChange, elem, targets, otherincompatible) {
  PointChange(SPChange, CPChange, elem)
  for (var i = 0; i < targets.length; ++i) {
    y = 0
    for (var x = 0; x < otherincompatible.length; ++x) {
      if (elem.checked == true || document.getElementById(otherincompatible[x]).checked == true) {
        if (document.getElementById(targets[i]).checked == true) { document.getElementById(targets[i]).click() }
        document.getElementById(targets[i]).disabled = true;
        document.getElementsByName(targets[i])[0].classList.add('disabled');
        y = 1
      } else if (elem.checked != true && document.getElementById(otherincompatible[x]).checked != true) {
        if (y == 1) return
        document.getElementById(targets[i]).disabled = false
        document.getElementsByName(targets[i])[0].classList.remove('disabled')
      }
    }
  }
}

function insertcopy(SPChange, CPChange, elem, targets){
  PointChange(SPChange, CPChange, elem)
  if (elem.checked) {
    document.getElementById(targets).click()
    document.getElementById(targets).disabled = true
  } else {
    document.getElementById(targets).disabled = false
    document.getElementById(targets).click()
  }
}

function multirequired(SPChange, CPChange, elem, targets, otherincompatible) {
  PointChange(SPChange, CPChange, elem)
  for (var i = 0; i < targets.length; ++i) {
    y = 0
    for (var x = 0; x < otherincompatible.length; ++x) {
      if (elem.checked == true || document.getElementById(otherincompatible[x]).checked == true) {
        if (document.getElementById(targets[i]).checked == true) { document.getElementById(targets[i]).click() }
        document.getElementById(targets[i]).disabled = false;
        document.getElementsByName(targets[i])[0].classList.remove('disabled');
        y = 1
      } else if (elem.checked != true && document.getElementById(otherincompatible[x]).checked != true) {
        if (y == 1) return
        document.getElementById(targets[i]).disabled = true
        document.getElementsByName(targets[i])[0].classList.add('disabled')
      }
    }
  }
}

// this enables and disables choices when you select something, used for both requirements and incompatibilities despite the name
function incompatible(SPChange, CPChange, elem, targets) {
  PointChange(SPChange, CPChange, elem)
  for (var i = 0; i < targets.length; ++i) {
    if (document.getElementById(targets[i]).disabled == true) {
      document.getElementById(targets[i]).disabled = false
      document.getElementsByName(targets[i])[0].classList.remove('disabled')
    } else {
      if (document.getElementById(targets[i]).checked == true) {
        document.getElementById(targets[i]).click()
      }
      document.getElementById(targets[i]).disabled = true;
      document.getElementsByName(targets[i])[0].classList.add('disabled');
    }
  }
}

// this makes requirements for choices that need multiple things, like combo powers, work and it also handles situations where multiple things can work as a requirement
function multiplerequired(SPChange, CPChange, elem, targets, otherrequirements, optionalrequirements) {
  PointChange(SPChange, CPChange, elem)
  for (var i = 0; i < targets.length; ++i) {
    if (optionalrequirements != undefined) {
      document.getElementById(targets[i]).disabled = true;
      document.getElementsByName(targets[i])[0].classList.add('disabled');
      if (otherrequirements.length != 0) {
        for (var i1 = 0; i1 < otherrequirements.length; ++i1) {
          for (var i2 = 0; i2 < optionalrequirements.length; ++i2) {
            if (document.getElementById(optionalrequirements[i2]).checked == true && otherrequirements[i1].checked == true) {
              document.getElementById(targets[i]).disabled = false
              document.getElementsByName(targets[i])[0].classList.remove('disabled')
            } else if (otherrequirements[i1].checked != true) {
              if (document.getElementById(targets[i]).checked == true) {
                document.getElementById(targets[i]).click()
              }
              document.getElementById(targets[i]).disabled = true;
              document.getElementsByName(targets[i])[0].classList.add('disabled');
            }
          }
        }
      } else {
        for (var i2 = 0; i2 < optionalrequirements.length; ++i2) {
          if (document.getElementById(optionalrequirements[i2]).checked == true) {
            document.getElementById(targets[i]).disabled = false
            document.getElementsByName(targets[i])[0].classList.remove('disabled')
          }
        }
      }
    }
    if (elem.checked == true) {
      for (var i1 = 0; i1 < otherrequirements.length; ++i1) {
        if (document.getElementById(otherrequirements[i1]).checked == true && optionalrequirements == undefined) {
          document.getElementById(targets[i]).disabled = false
          document.getElementsByName(targets[i])[0].classList.remove('disabled')
        }
      }
    } else {
      document.getElementById(targets[i]).disabled = true;
      document.getElementsByName(targets[i])[0].classList.add('disabled');
    }
  }
}

// this toggles the visibility of a section
function visible(SPChange, CPChange, elem, targets, incompatibletargets) {
  PointChange(SPChange, CPChange, elem)
  for (var i = 0; i < targets.length; ++i) {
    if (elem.checked == true) {
      document.getElementsByClassName(targets[i])[0].classList.remove('visible')
    } else {
      document.getElementsByClassName(targets[i])[0].classList.add('visible');
    }
  }
  if (incompatibletargets != undefined) incompatible(0, 0, elem, incompatibletargets);
}

// this closes the overlay
function closepopup() {
  document.getElementById('overlay').classList.add('visible');
  document.getElementById("sidenav").style.width = "0";
  document.getElementById('check1').classList.add('visible');
  document.getElementById('check1').classList.remove('grow');
  document.getElementById('check2').innerHTML = "";
  document.getElementById('check2').value = "";
  document.getElementById('list1').classList.add('visible');
  document.getElementById('list1').classList.remove('grow');
  document.querySelectorAll('.ripple').forEach(e => e.remove());
  document.querySelectorAll('.dpl').forEach(e => e.remove())
}

function counter(ind, SPChange, CPChange, limit, add, mult, slot, cost) {
  if (limit == 'CW') {
    limit = 0
    for (var i = 0; i < document.getElementsByClassName('powerchoice').length; ++i) {
      if (document.getElementsByClassName('powerchoice')[i].checked == true) { limit = limit + 1 }
    }
  }
  if (limit == 'CL') {
    limit = 10
    if (kisscounter + neutralcounter + killcounter == 10) {limit = 0}
  }
  if ((add == 'add' && countervars[ind] < limit) || (add == 'remove' && countervars[ind] >= mult)) {
    countervars = [SPcounter, CPcounter, T3counter, T2counter, T1counter, CWcounter, CGcounter, UGcounter, GTcounter, NMcounter, kisscounter, neutralcounter, killcounter]
    if (add == 'add') {
      document.getElementById(counterbuttons[ind]).classList.add('activebutton')
    } else if (add == 'remove' && countervars[ind] == mult) {
      document.getElementById(counterbuttons[ind]).classList.remove('activebutton')
    }
    if (document.getElementById('aagr').checked == true && value == 1 && cost == 'gain'){
      SP = SP + (SPChange*2);
      CP = CP + (CPChange*2);
    } else if (document.getElementById('aagt').checked == true && value == 1 && cost == 'gain'){
      SP = SP + Math.round (SPChange/2);
      CP = CP + Math.round (CPChange/2);
    } else {
      SP = SP + SPChange;
      CP = CP + CPChange;
    }
    if (add == 'add') {
      countervars[ind] = countervars[ind] + mult
    } else {
      countervars[ind] = countervars[ind] - mult
    }
    if (slot == 3) {
      if (add == 'add') {
        maxtier3 = maxtier3 + 1
        document.getElementById('t3slots').innerHTML = maxtier3
      } else {
        maxtier3 = maxtier3 - 1
        document.getElementById('t3slots').innerHTML = maxtier3
      }
    }
    if (slot == 2) {
      if (add == 'add') {
        maxtier2 = maxtier2 + 1
        document.getElementById('t2slots').innerHTML = maxtier2
      } else {
        maxtier2 = maxtier2 - 1
        document.getElementById('t2slots').innerHTML = maxtier2
      }
    }
    if (slot == 1) {
      if (add == 'add') {
        maxtier1 = maxtier1 + 1
        document.getElementById('t1slots').innerHTML = maxtier1
      } else {
        maxtier1 = maxtier1 - 1
        document.getElementById('t1slots').innerHTML = maxtier1
      }
    }
    document.getElementById('SP').innerHTML = SP;
    document.getElementById('CP').innerHTML = CP;
    document.getElementById(counterids[ind]).innerHTML = countervars[ind];
    if (ind > 1) {
      if (add == 'add') {
        const button = document.getElementById(counteradd[ind]);
        const circle = document.createElement("span");
        button.appendChild(circle);
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.classList.add("ripple");
      } else {
        const button = document.getElementById(counterremove[ind]);
        const circle = document.createElement("span");
        button.appendChild(circle);
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.classList.add("ripple");
      }
    }
    SPcounter = countervars[0]
    CPcounter = countervars[1]
    T3counter = countervars[2]
    T2counter = countervars[3]
    T1counter = countervars[4]
    CWcounter = countervars[5]
    CGcounter = countervars[6]
    UGcounter = countervars[7]
    GTcounter = countervars[8]
    NMcounter = countervars[9]
    kisscounter = countervars[10]
    neutralcounter = countervars[11]
    killcounter = countervars[12]
  }
}

// these just make the open all buttons open all the sections in their relevant section and make sure that it doesn't close a section when the button for that section is selected
var ctabs = ['incarnation', 'age', 'sex', 'gender', 'appearance', 'identity', 'civilianidentity']
document.getElementById('characteropenallid').oninput = function () {
  if (this.checked) {
    for (var i = 0; i < ctabs.length; ++i) {
      document.getElementsByClassName(ctabs[i] + 'section')[0].classList.remove('hide');
    }
  } else {
    for (var i = 0; i < ctabs.length; ++i) {
      if (document.getElementById(ctabs[i] + 'id').checked == false) document.getElementsByClassName(ctabs[i] + 'section')[0].classList.add('hide');
    }
  }
}
var mtabs = ['who', 'difficulty', 'scenario', 'alignment', 'character', 'shard', 'conversion', 'perks', 'skills', 'companions', 'powers', 'oops', 'items', 'cluster']
document.getElementById('openallid').oninput = function () {
  if (this.checked) {
    for (var i = 0; i < mtabs.length; ++i) {
      document.getElementsByClassName(mtabs[i] + 'section')[0].classList.remove('hide');
    }
  } else {
    for (var i = 0; i < mtabs.length; ++i) {
      if (document.getElementById(mtabs[i] + 'id').checked == false) document.getElementsByClassName(mtabs[i] + 'section')[0].classList.add('hide');
    }
  }
}
var ptabs = ['classifications', 'tier4', 'tier3', 'powercopy', 'combopowers', 'tier2', 'masterendbringer', 'changerendbringer', 'tier1']
document.getElementById('powersopenallid').oninput = function () {
  if (this.checked) {
    for (var i = 0; i < ptabs.length; ++i) {
      document.getElementsByClassName(ptabs[i] + 'section')[0].classList.remove('hide');
    }
  } else {
    for (var i = 0; i < ptabs.length; ++i) {
      if (document.getElementById(ptabs[i] + 'id').checked == false) document.getElementsByClassName(ptabs[i] + 'section')[0].classList.add('hide');
    }
  }
}


// this makes sure that the counter ids are 3 digits
function pad(n, length) {
  var len = length - ('' + n).length;
  if (n > -1) {
    return (len > 0 ? new Array(++len).join('0') : '') + n
  } else {
    return "-" + (len > 0 ? new Array(++len).join('0') : '') + Math.abs(n)
  }
}
// this opens the overlay and displays the names and ids of all the choices
document.getElementById('check').onclick = function () {
  countervars = [SPcounter, CPcounter, T3counter, T2counter, T1counter, CWcounter, CGcounter, UGcounter, GTcounter, NMcounter, kisscounter, neutralcounter, killcounter]
  const selections = [];
  document.getElementById('check2').innerHTML = "";
  document.getElementById('check2').value = "";
  document.getElementById('check3').innerHTML = "";
  document.getElementById('check3').value = "";
  var elements = document.getElementsByClassName('choice')
  const button = document.getElementById('check');
  const circle = document.createElement("span");
  circle.style.width = circle.style.height = `80px`;
  circle.style.left = `${button.offsetLeft - 0}px`;
  circle.style.top = `${button.offsetTop - 22}px`;
  circle.classList.add("ripple");
  button.appendChild(circle);
  for (var i = 0; i < elements.length; ++i) {
    if (document.getElementById(document.getElementsByClassName('choice')[i].getAttribute("id")).checked == true) {
      selections.push(document.getElementsByClassName('choice')[i])
    }
    for (var x = 0; x < counterids.length; ++x) {
      if (elements[i].id == counterids[x] && countervars[x] != 0){
        selections.push(alphabet[x] + pad(countervars[x], 3))
      }
    }
  }
  for (var i = 0; i < selections.length; ++i) {
    if (typeof selections[i] != 'string') {
      document.getElementById('check2').innerHTML = document.getElementById('check2').innerHTML + selections[i].getAttribute('name') + ", ";
      document.getElementById('check2').value = document.getElementById('check2').value + selections[i].getAttribute('name') + ", ";
    } else {
      for (var x = 0; x < counterids.length; ++x) {
        if (selections[i].substr(0, 1) == alphabet[x] && selections[i].substr(1, 3).match(/^[0-9]+$/) != null){
          if (x == 0) {
            document.getElementById('check2').innerHTML = document.getElementById('check2').innerHTML + "+" + countervars[x] + " SP -" + countervars[x]*2 + "CP, "
            document.getElementById('check2').value = document.getElementById('check2').value + "+" + countervars[x] + " SP -" + countervars[x]*2 + "CP, "
          } else if (x == 1) {
            document.getElementById('check2').innerHTML = document.getElementById('check2').innerHTML + "+" + countervars[x] + " CP -" + countervars[x]*2 + "SP, "
            document.getElementById('check2').value = document.getElementById('check2').value + "+" + countervars[x] + " CP -" + countervars[x]*2 + "SP, "
          } else {
            document.getElementById('check2').innerHTML = document.getElementById('check2').innerHTML + counternames[x] + countervars[x] + "], "
            document.getElementById('check2').value = document.getElementById('check2').value + counternames[x] + countervars[x] + "], "
          }
        }
      }
    }
    if (typeof selections[i] != 'string') {
      document.getElementById('check3').innerHTML = document.getElementById('check3').innerHTML + selections[i].id + ", ";
      document.getElementById('check3').value = document.getElementById('check3').value + selections[i].id + ", ";
    } else {
      for (var x = 0; x < counterids.length; ++x) {
        if (selections[i].substr(0, 1) == alphabet[x] && selections[i].substr(1, 3).match(/^[0-9]+$/) != null){
          document.getElementById('check3').innerHTML = document.getElementById('check3').innerHTML + selections[i] + ", "
          document.getElementById('check3').value = document.getElementById('check3').value + selections[i] + ", "
        }
      }
    }
  }
  document.getElementById('check1').classList.remove('visible');
  document.getElementById('check1').classList.add('grow');
  document.getElementById('overlay').classList.remove('visible');
  if (document.getElementById("check2").value == '') {
    document.getElementById('check2label').classList.remove('active');
  } else {
    document.getElementById('check2label').classList.add('active');
  }
  if (document.getElementById("check3").value == '') {
    document.getElementById('check3label').classList.remove('active');
  } else {
    document.getElementById('check3label').classList.add('active');
  }
  if (document.getElementById("check4").value == '') {
    document.getElementById('check4label').classList.remove('active');
  } else {
    document.getElementById('check4label').classList.add('active');
  }
}
// this imports choices from a string
document.getElementById('import').onclick = function () {
  killcounter = 0;
  neutralcounter = 0;
  kisscounter = 0;
  CWcounter = 0;
  CGcounter = 0;
  UGcounter = 0;
  T1counter = 0;
  T2counter = 0;
  T3counter = 0;
  CPcounter = 0;
  SPcounter = 0;
  GTcounter = 0;
  NMcounter = 0;
  maxtier1 = 1;
  maxtier2 = 3;
  maxtier3 = 5;
  document.getElementById('t1slots').innerHTML = 1
  document.getElementById('t2slots').innerHTML = 3
  document.getElementById('t3slots').innerHTML = 5
  document.getElementById('killconvert').classList.remove('activebutton')
  document.getElementById('neutralconvert').classList.remove('activebutton')
  document.getElementById('kissconvert').classList.remove('activebutton')
  document.getElementById('CWconvert').classList.remove('activebutton')
  document.getElementById('CGconvert').classList.remove('activebutton')
  document.getElementById('UGconvert').classList.remove('activebutton')
  document.getElementById('T1convert').classList.remove('activebutton')
  document.getElementById('T2convert').classList.remove('activebutton')
  document.getElementById('T3convert').classList.remove('activebutton')
  document.getElementById('CPconvert').classList.remove('activebutton')
  document.getElementById('SPconvert').classList.remove('activebutton')
  document.getElementById('GTconvert').classList.remove('activebutton')
  document.getElementById('NMconvert').classList.remove('activebutton')
  document.getElementById('T1counter').innerHTML = 0
  document.getElementById('T2counter').innerHTML = 0
  document.getElementById('T3counter').innerHTML = 0
  document.getElementById('killcounter').innerHTML = 0
  document.getElementById('neutralcounter').innerHTML = 0
  document.getElementById('kisscounter').innerHTML = 0
  document.getElementById('CWcounter').innerHTML = 0
  document.getElementById('CGcounter').innerHTML = 0
  document.getElementById('UGcounter').innerHTML = 0
  document.getElementById('CPcounter').innerHTML = 0
  document.getElementById('SPcounter').innerHTML = 0
  document.getElementById('GTcounter').innerHTML = 0
  document.getElementById('NMcounter').innerHTML = 0
  var elements = document.getElementsByClassName('choice')
  var ids = document.getElementById('check4').value;
  var imp = ids.replace(/\s+/g, '');
  document.getElementById('check2').innerHTML = "";
  document.getElementById('check2').value = "";
  document.getElementById('check3').innerHTML = "";
  document.getElementById('check3').value = "";
  for (var i = 0; i < elements.length; ++i) {
    if (elements[i].checked == true) {
      elements[i].click()
    }
  }
  SP = 0
  CP = 0
  const selections = imp.split(",");
  for (var i = 0; i < (selections.length); ++i) {
    if (selections[i] != null) {
      if (document.getElementById('check2label').classList.contains('active') == false) {
        document.getElementById('check2label').classList.add('active')
        document.getElementById('check3label').classList.add('active')
      }
      document.getElementById('check3').innerHTML = document.getElementById('check3').innerHTML + selections[i] + ", ";
      document.getElementById('check3').value = document.getElementById('check3').value + selections[i] + ", ";
      if (document.getElementById(selections[i]) != null) {
        document.getElementById('check2').innerHTML = document.getElementById('check2').innerHTML + document.getElementById(selections[i]).getAttribute('name') + ", ";
        document.getElementById('check2').value = document.getElementById('check2').value + document.getElementById(selections[i]).getAttribute('name') + ", ";
        document.getElementById(selections[i]).click()
      } else {
        for (var x = 0; x < counterids.length; ++x) {
          if (selections[i].substr(0, 1) == alphabet[x] && selections[i].substr(1, 3).match(/^[0-9]+$/) != null){
            for (var y = 0; y < Math.abs(parseInt(selections[i].substr(1, 3))); ++y) {
              document.getElementById(counteradd[x]).click()
            }
          }
        }
        var countervars = [SPcounter, CPcounter, T3counter, T2counter, T1counter, CWcounter, CGcounter, UGcounter, GTcounter, NMcounter, kisscounter, neutralcounter, killcounter]
        for (var x = 0; x < counterids.length; ++x) {
          if (selections[i].substr(0, 1) == alphabet[x] && selections[i].substr(1, 3).match(/^[0-9]+$/) != null){
            if (x == 0) {
              document.getElementById('check2').innerHTML = document.getElementById('check2').innerHTML + "+" + countervars[x] + " SP -" + countervars[x]*2 + "CP, "
              document.getElementById('check2').value = document.getElementById('check2').value + "+" + countervars[x] + " SP -" + countervars[x]*2 + "CP, "
            } else if (x == 1) {
              document.getElementById('check2').innerHTML = document.getElementById('check2').innerHTML + "+" + countervars[x] + " CP -" + countervars[x]*2 + "SP, "
              document.getElementById('check2').value = document.getElementById('check2').value + "+" + countervars[x] + " CP -" + countervars[x]*2 + "SP, "
            } else {
              document.getElementById('check2').innerHTML = document.getElementById('check2').innerHTML + counternames[x] + countervars[x] + "], "
              document.getElementById('check2').value = document.getElementById('check2').value + counternames[x] + countervars[x] + "], "
            }
          }
        }
      }
    }
  }
  document.getElementById('SP').innerHTML = SP;
  document.getElementById('CP').innerHTML = CP;
  for (var i = 0; i < selections.length; ++i) {
    if (selections[i] != null) {
      if (selections[i].checked == false) selections[i].click()
    }
  }
}

document.getElementById('list').onclick = function(){
  document.querySelectorAll('.ripple').forEach(e => e.remove());
  const selections = [];
  var elements = document.getElementsByClassName('choice')
  document.querySelectorAll('.dpl').forEach(e => e.remove())
  const button = document.getElementById('list');
  const circle = document.createElement("span");
  circle.style.width = circle.style.height = `80px`;
  circle.style.left = `${button.offsetLeft - 0}px`;
  circle.style.top = `${button.offsetTop - 22}px`;
  circle.classList.add("ripple");
  button.appendChild(circle);
  for (var i = 0; i < elements.length; ++i) {
    if (elements[i].checked == true && elements[i].classList.contains('tier3st') == false && elements[i].classList.contains('tier2st') == false && elements[i].classList.contains('tier1st') == false) {
      selections.push(elements[i])
    }
    for (var x = 0; x < counterids.length; ++x) {
      if (elements[i].id == counterids[x] && countervars[x] != 0){
        selections.push(alphabet[x] + pad(countervars[x], 3))
      }
    }
  }
  for (var i = 0; i < selections.length; ++i) {
    if (typeof selections[i] == 'string') {
      for (var x = 0; x < counterids.length; ++x) {
        if (selections[i].substr(0, 1) == alphabet[x] && selections[i].substr(1, 3).match(/^[0-9]+$/) != null){
          var dpl = document.getElementById(counterbuttons[x]).cloneNode(true);
          dpl.style.pointerEvents = "none";
          dpl.classList.add('activebutton')
          var con = document.createElement("div");
          if (x == 0){
            con.classList.add('col-8');
          } else if (x == 1){
            con.classList.add('col-8');
          } else {
            con.classList.add('col-4');
          }
          con.classList.add('buttoncon');
          con.classList.add('dpl')
          document.getElementById("listdisplay").appendChild(con);
          con.appendChild(dpl)
        }
      }
    }
    if (typeof selections[i] != 'string') {
      var dpl = document.getElementsByName(selections[i].id)[0].cloneNode(true);
      dpl.style.pointerEvents = "none";
      dpl.classList.add('activebutton')
      var con = document.createElement("div");
      con.classList.add('col-4');
      con.classList.add('buttoncon');
      con.classList.add('dpl')
      document.getElementById("listdisplay").appendChild(con);
      con.appendChild(dpl)
    }
  }
  document.getElementById('overlay').classList.remove('visible');
  document.getElementById('list1').classList.remove('visible');
  document.getElementById('list1').classList.add('grow');
}

document.getElementById('menu').onclick = function(){
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById('overlay').classList.remove('visible');
  const button = document.getElementById('menu');
  const circle = document.createElement("span");
  circle.style.width = circle.style.height = `80px`;
  circle.style.left = `${button.offsetLeft - 0}px`;
  circle.style.top = `${button.offsetTop - 22}px`;
  circle.classList.add("ripple");
  button.appendChild(circle);
}

// these just do minor animation stuff
document.getElementById('check2').onfocus = function () {
  document.getElementById('check2label').classList.add('active');
  document.getElementById('check2label').classList.add('focus');
  document.getElementById('check2label').classList.add('transition');
}
document.getElementById('check3').onfocus = function () {
  document.getElementById('check3label').classList.add('active');
  document.getElementById('check3label').classList.add('focus');
  document.getElementById('check3label').classList.add('transition');
}
document.getElementById('check4').onfocus = function () {
  document.getElementById('check4label').classList.add('active');
  document.getElementById('check4label').classList.add('focus');
  document.getElementById('check4label').classList.add('transition');
}
document.getElementById('check2').onblur = function () {
  document.getElementById('check2label').classList.remove('focus');
  if (document.getElementById("check2").value == '') {
    document.getElementById('check2label').classList.remove('active');
  }
}
document.getElementById('check3').onblur = function () {
  document.getElementById('check3label').classList.remove('focus');
  if (document.getElementById("check3").value == '') {
    document.getElementById('check3label').classList.remove('active');
  }
}
document.getElementById('check4').onblur = function () {
  document.getElementById('check4label').classList.remove('focus');
  if (document.getElementById("check4").value == '') {
    document.getElementById('check4label').classList.remove('active');
  }
}
document.getElementById('addSP').onblur = function () {
  document.querySelectorAll('.ripple').forEach(e => e.remove())
}
document.getElementById('removeSP').onblur = function () {
  document.querySelectorAll('.ripple').forEach(e => e.remove())
}
document.getElementById('addCP').onblur = function () {
  document.querySelectorAll('.ripple').forEach(e => e.remove())
}
document.getElementById('removeCP').onblur = function () {
  document.querySelectorAll('.ripple').forEach(e => e.remove())
}

// these are just choices that need to do multiple functions since you can't really do that in the html file
document.getElementById('tjz1').oninput = function () {
  multiplerequired(-7, 0, this, ['o80q'], ['uwde'])
  multiplerequired(0, 0, this, ['2f3c'], ['m981', 'lv3m'])
}
document.getElementById('vll5').oninput = function () {
  incompatible(-7, 0, this, ['kb60', '6zrd'])
  multiplerequired(0, 0, this, ['1mnn'], ['woqj'])
}
document.getElementById('woqj').oninput = function () {
  multiplerequired(-12, 0, this, ['l4kr'], [], ['iofn', 'rnkx'])
  multiplerequired(0, 0, this, ['1mnn'], [], ['vll5', '1x6x'])
}
document.getElementById('k1xt').oninput = function () {
  multiplerequired(-12, 0, this, ['uxkw'], ['cpi7'])
  multiplerequired(0, 0, this, ['mypd'], ['g2oz', 'w67q', '38m6'])
}
document.getElementById('cpi7').oninput = function () {
  multiplerequired(-25, 0, this, ['uxkw'], ['k1xt'])
  multiplerequired(0, 0, this, ['0ze9'], ['aaaa'])
}
document.getElementById('b8h1').oninput = function () {
  PointChange(-9, 0, this)
  if (this.checked == true) {
    if (document.getElementById('974r').checked == true || document.getElementById('idq4').checked == true) {
      document.getElementById('5elz').disabled = false;
      document.getElementsByName('5elz')[0].classList.remove('disabled')
    } else {
      document.getElementById('5elz').disabled = true;
      document.getElementsByName('5elz')[0].classList.add('disabled')
    }
  } else {
    document.getElementById('5elz').disabled = true;
    document.getElementsByName('5elz')[0].classList.add('disabled')
  }
  if (this.checked == true) {
    if (document.getElementById('1b1s').checked == true || document.getElementById('etl7').checked == true) {
      document.getElementById('wo5e').disabled = false;
      document.getElementsByName('wo5e')[0].classList.remove('disabled')
    } else {
      document.getElementById('wo5e').disabled = true;
      document.getElementsByName('wo5e')[0].classList.add('disabled')
    }
  } else {
    document.getElementById('wo5e').disabled = true;
    document.getElementsByName('wo5e')[0].classList.add('disabled')
  }
}
document.getElementById('974r').oninput = function () {
  multiplerequired(-30, 0, this, ['5elz'], ['b8h1']);
  if (this.checked == true) {
    if (document.getElementById('vp1e').checked == true) {
      document.getElementById('o1kp').disabled = false;
      document.getElementsByName('o1kp')[0].classList.remove('disabled')
    } else {
      document.getElementById('o1kp').disabled = true;
      document.getElementsByName('o1kp')[0].classList.add('disabled')
    }
  } else {
    document.getElementById('o1kp').disabled = true;
    document.getElementsByName('o1kp')[0].classList.add('disabled')
  }
}
document.getElementById('pxsf').oninput = function () {
  PointChange(-18, 0, this);
  if (this.checked == true) {
    if (document.getElementById('vp1e').checked == true) {
      document.getElementById('o1kp').disabled = false;
      document.getElementsByName('o1kp')[0].classList.remove('disabled')
    } else {
      document.getElementById('o1kp').disabled = true;
      document.getElementsByName('o1kp')[0].classList.add('disabled')
    }
  } else {
    document.getElementById('o1kp').disabled = true;
    document.getElementsByName('o1kp')[0].classList.add('disabled')
  }
}
document.getElementById('vp1e').oninput = function () {
  PointChange(-4, 0, this)
  if (this.checked == true) {
    if (document.getElementById('974r').checked == true || document.getElementById('pxsf').checked == true) {
      document.getElementById('o1kp').disabled = false;
      document.getElementsByName('o1kp')[0].classList.remove('disabled')
    } else {
      document.getElementById('o1kp').disabled = true;
      document.getElementsByName('o1kp')[0].classList.add('disabled')
    }
  } else {
    document.getElementById('o1kp').disabled = true;
    document.getElementsByName('o1kp')[0].classList.add('disabled')
  }
}
document.getElementById('s7sb').oninput = function () {
  multiplerequired(-9, 0, this, ['gw54'], ['48m6'])
  multiplerequired(0, 0, this, ['nx9r'], ['nhgo'])
}
document.getElementById('euib').oninput = function () {
  incompatible(0, 50, this, ['mkit', 'akit', 'pkit', 'wwb1', 'fy08', 'uh4g', '42jg', 'w0ll', '48m6', '2b7c', 'pr2q', 'whrm', '6s5p', 'l8bx', 'aaam', 'aabi', 'aabc', 'aaaa', 'aafn', 'aagn', 'aabx', 'pjir'])
  if (this.checked == true) {
    document.getElementById('T3convert').classList.add('disabled')
  } else {
    document.getElementById('T3convert').classList.remove('disabled')
  }
}
document.getElementById('ttv5').oninput = function () {
  visible(0, 0, this, ['tier3section', 'powercopysection', 'tier2section'], ['1b1s', 'aade', 'm4be'])
  if (this.checked == true) {
    document.getElementById('T2convert').classList.remove('disabled')
  } else {
    document.getElementById('T2convert').classList.add('disabled')
  }
}
document.getElementById('sxhj').oninput = function () {
  visible(-10, 0, this, ['tier3section', 'powercopysection', 'tier2section', 'tier1section'], ['ngod', '1b1s', 'aade', 'm4be'])
  if (this.checked == true) {
    document.getElementById('T2convert').classList.remove('disabled')
    document.getElementById('T1convert').classList.remove('disabled')
  } else {
    document.getElementById('T2convert').classList.add('disabled')
    document.getElementById('T1convert').classList.add('disabled')
  }
}
document.getElementById('whrm').oninput = function () {
  incompatible(5, 8, this, ['mash', 'aabf', 'aabw'])
  if (this.checked == true) {
    if (document.getElementById('kht1').checked !=  true && document.getElementById('qpwm').checked !=  true) {
      document.getElementsByClassName('appearancesection')[0].classList.remove('visible')
    }
  } else {
    if (document.getElementById('kht1').checked !=  true && document.getElementById('qpwm').checked !=  true) {
      document.getElementsByClassName('appearancesection')[0].classList.add('visible')
    }
  }
}
document.getElementById('kht1').oninput = function () {
  visible(0, -5, this, ['agesection', 'sexsection', 'civilianidentitysection'])
  if (this.checked == true) {
    if (document.getElementById('whrm').checked !=  true && document.getElementById('qpwm').checked !=  true) {
      document.getElementsByClassName('appearancesection')[0].classList.remove('visible')
    }
  } else {
    if (document.getElementById('whrm').checked !=  true && document.getElementById('qpwm').checked !=  true) {
      document.getElementsByClassName('appearancesection')[0].classList.add('visible')
    }
  }
}
document.getElementById('qpwm').oninput = function () {
  if (this.checked == true) {
    if (document.getElementById('whrm').checked !=  true && document.getElementById('kht1').checked !=  true) {
      document.getElementsByClassName('appearancesection')[0].classList.remove('visible')
    }
  } else {
    if (document.getElementById('whrm').checked !=  true && document.getElementById('kht1').checked !=  true) {
      document.getElementsByClassName('appearancesection')[0].classList.add('visible')
    }
  }
}
document.getElementById('r1r7').oninput = function () {
  PointChange(15, 15, this)
  if (this.checked) {
    if (document.getElementById('pfjj').checked == false) {
      document.getElementById('aaad').disabled = false
      document.getElementsByName('aaad')[0].classList.remove('disabled')
    }
  } else {
    if (document.getElementById('aaad').checked) {document.getElementById('aaad').click()}
    document.getElementById('aaad').disabled = true
    document.getElementsByName('aaad')[0].classList.add('disabled')
  }
}
document.getElementById('pfjj').oninput = function () {
  PointChange(5, 10, this)
  if (this.checked) {
    if (document.getElementById('aaad').checked) {document.getElementById('aaad').click()}
    document.getElementById('aaad').disabled = true
    document.getElementsByName('aaad')[0].classList.add('disabled')
  } else {
    if (document.getElementById('r1r7').checked == true) {
      document.getElementById('aaad').disabled = false
      document.getElementsByName('aaad')[0].classList.remove('disabled')
    }
  }
}
const values = [];
document.getElementById('aagr').oninput = function () {
  for (var i = 0; i < document.getElementsByClassName('cost').length; ++i) {
    if (value1 == 0) {
      values.push(document.getElementsByClassName('cost')[i].innerHTML.replace(/\D/g, ''))
    }
  }
  value1 = 1
  var choices = []
  for (var i = 0; i < document.getElementsByClassName('choice').length; ++i) {
    if (document.getElementsByClassName('choice')[i].checked && document.getElementsByClassName('choice')[i].id != 'aagr') {
      choices.push(document.getElementsByClassName('choice')[i].id)
    }
  }
  if (this.checked) {
    value = 0
    for (var i = 0; i < choices.length; ++i) {
      document.getElementById(choices[i]).click()
    }
    value = 1
    for (var i = 0; i < choices.length; ++i) {
      document.getElementById(choices[i]).click()
    }
  }
  if (this.checked == false) {
    value = 3
    for (var i = 0; i < choices.length; ++i) {
      document.getElementById(choices[i]).click()
    }
    value = 0
    for (var i = 0; i < choices.length; ++i) {
      document.getElementById(choices[i]).click()
    }
  }
  if (this.checked) {
    for (var i = 0; i < document.getElementsByClassName('cost').length; ++i) {
      if (document.getElementsByClassName('cost')[i].innerHTML.substr(0, 4) == "Gain") {
        var str = document.getElementsByClassName('cost')[i].innerHTML;
        document.getElementsByClassName('cost')[i].innerHTML = "Gain: " + Math.round(values[i]*2) + " " + document.getElementsByClassName('cost')[i].innerHTML.substr(document.getElementsByClassName('cost')[i].innerHTML.length - 2, 2)
      }
    }
  } else {
    for (var i = 0; i < document.getElementsByClassName('cost').length; ++i) {
      if (document.getElementsByClassName('cost')[i].innerHTML.substr(0, 4) == "Gain") {
        var str = document.getElementsByClassName('cost')[i].innerHTML;
        document.getElementsByClassName('cost')[i].innerHTML = "Gain: " + values[i] + " " + document.getElementsByClassName('cost')[i].innerHTML.substr(document.getElementsByClassName('cost')[i].innerHTML.length - 2, 2)
      }
    }
  }
}
document.getElementById('aagt').oninput = function () {
  for (var i = 0; i < document.getElementsByClassName('cost').length; ++i) {
    if (value1 == 0) {
      values.push(document.getElementsByClassName('cost')[i].innerHTML.replace(/\D/g, ''))
    }
  }
  value1 = 1
  var choices = []
  for (var i = 0; i < document.getElementsByClassName('choice').length; ++i) {
    if (document.getElementsByClassName('choice')[i].checked && document.getElementsByClassName('choice')[i].id != 'aagt') {
      choices.push(document.getElementsByClassName('choice')[i].id)
    }
  }
  if (this.checked) {
    value = 0
    for (var i = 0; i < choices.length; ++i) {
      document.getElementById(choices[i]).click()
    }
    value = 1
    for (var i = 0; i < choices.length; ++i) {
      document.getElementById(choices[i]).click()
    }
  }
  if (this.checked == false) {
    value = 2
    for (var i = 0; i < choices.length; ++i) {
      document.getElementById(choices[i]).click()
    }
    value = 0
    for (var i = 0; i < choices.length; ++i) {
      document.getElementById(choices[i]).click()
    }
  }
  if (this.checked) {
    for (var i = 0; i < document.getElementsByClassName('cost').length; ++i) {
      if (document.getElementsByClassName('cost')[i].innerHTML.substr(0, 4) == "Gain") {
        document.getElementsByClassName('cost')[i].innerHTML = "Gain: " + Math.round(values[i]/2) + " " + document.getElementsByClassName('cost')[i].innerHTML.substr(document.getElementsByClassName('cost')[i].innerHTML.length - 2, 2)
      }
    }
  } else {
    for (var i = 0; i < document.getElementsByClassName('cost').length; ++i) {
      if (document.getElementsByClassName('cost')[i].innerHTML.substr(0, 4) == "Gain") {
        document.getElementsByClassName('cost')[i].innerHTML = "Gain: " + values[i] + " " + document.getElementsByClassName('cost')[i].innerHTML.substr(document.getElementsByClassName('cost')[i].innerHTML.length - 2, 2)
      }
    }
  }
}
document.getElementById('aagu').oninput = function () {
  multiincompatible(0, -5, this, ['aahl'], ['aahb'])
  if (this.checked) {
    maxrooms = 5
  } else maxrooms = 5
  
}
document.getElementById('aagv').oninput = function () {
  PointChange(0, -10, this)
  if (this.checked) {
    maxrooms = 10
  } else maxrooms = 5
}
document.getElementById('aagw').oninput = function () {
  PointChange(0, -15, this)
  if (this.checked) {
    maxrooms = 18
  } else maxrooms = 5
}
document.getElementById('aagx').oninput = function () {
  multiincompatible(0, -20, this, ['aahb'], ['aaha'])
  if (this.checked) {
    maxrooms = 99
  } else maxrooms = 5
}
document.getElementById('ar45').oninput = function () {
  visible(5, 0, this, ['shardrankingsection', 'powerdrawbacks'], ['r1r7'])
  if (this.checked) {
    if (document.getElementById('icne').checked == false) {
      document.getElementById('aapq').disabled = false
      document.getElementsByName('aapq')[0].classList.remove('disabled')
    }
  } else {
    if (document.getElementById('aapq').checked) document.getElementById('aapq').click();
    document.getElementById('aapq').disabled = true
    document.getElementsByName('aapq')[0].classList.add('disabled')
  }
}
document.getElementById('icne').oninput = function () {
  incompatible(5, 5, this, ['6zrd', 'vrqv', '87du', 'aaae', 'aaba'])
  if (this.checked) {
    if (document.getElementById('aapq').checked) document.getElementById('aapq').click();
    document.getElementById('aapq').disabled = true
    document.getElementsByName('aapq')[0].classList.add('disabled')
  } else {
    if (document.getElementById('ar45').checked == true) {
      document.getElementById('aapq').disabled = false
      document.getElementsByName('aapq')[0].classList.remove('disabled')
    }
  }
}
document.getElementById('n8fi').oninput = function () {
  incompatible(0, 0, this, ['kb60'])
  insertcopy(0, 0, this, 'bcj3')
}
document.getElementById('ee5n').oninput = function () {
  multiplerequired(0, 0, this, ['aeq3'], ['qmoi'])
  insertcopy(0, 0, this, 'bytu')
}
document.getElementById('f7ta').oninput = function () {
  incompatible(0, 0, this, ['kb60', '6zrd'])
  insertcopy(0, 0, this, 'gq95')
}
document.getElementById('vll5').oninput = function () {
  incompatible(0, 0, this, ['kb60', '6zrd'])
  insertcopy(0, 0, this, '1x6x')
}
document.getElementById('yzm3').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'ljdq')
}
document.getElementById('iek5').oninput = function () {
  multiplerequired(0, 0, this, ['ccoz'], ['fy08'])
  insertcopy(0, 0, this, 'aaex')
}
document.getElementById('wohf').oninput = function () {
  incompatible(0, 0, this, ['kb60'])
  insertcopy(0, 0, this, 'nho5')
}
document.getElementById('aadf').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'aach')
}
document.getElementById('aacx').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'woqj')
}
document.getElementById('1b1s').oninput = function () {
  multiplerequired(0, 0, this, ['wo5e'], ['b8h1'])
  insertcopy(0, 0, this, 'etl7')
}
document.getElementById('rau8').oninput = function () {
  incompatible(0, 0, this, ['kb60'])
  insertcopy(0, 0, this, 'iqqe')
}
document.getElementById('aabm').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'aaez')
}
document.getElementById('aacy').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'xzo0')
}
document.getElementById('p4k9').oninput = function () {
  multiplerequired(0, 0, this, ['ccoz'], ['fy08'])
  insertcopy(0, 0, this, 'snlc')
}
document.getElementById('rbpk').oninput = function () {
  incompatible(0, 0, this, ['kb60'])
  insertcopy(0, 0, this, 'tipt')
}
document.getElementById('ax8h').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'aafb')
}
document.getElementById('aadg').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'aafc')
}
document.getElementById('k9xa').oninput = function () {
  incompatible(0, 0, this, ['kb60', '6zrd'])
  insertcopy(0, 0, this, 'aaev')
}
document.getElementById('ab2s').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'zwy8')
}
document.getElementById('g9pl').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'aaew')
}
document.getElementById('iofn').oninput = function () {
  multiplerequired(0, 0, this, ['l4kr'], ['woqj'])
  insertcopy(0, 0, this, 'rnkx')
}
document.getElementById('aade').oninput = function () {
  incompatible(0, 0, this, ['6zrd'])
  insertcopy(0, 0, this, 'joh4') 
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById('overlay').classList.add('visible');
}

document.getElementById('pjir').oninput = function () {
  if (this.checked == true) {
    if (document.getElementById('ffrg').checked == true && document.getElementById('fy08').checked == true && document.getElementById('tn6g').checked == true && document.getElementById('aapn').checked == true && document.getElementById('aaba').checked == true && document.getElementById('aabv').checked == true) {
      document.getElementsByClassName("abdn")[0].classList.remove('visible');
    } else {
      document.getElementsByClassName("abdn")[0].classList.add('visible');
    }
  } else {
    document.getElementsByClassName("abdn")[0].classList.add('visible');
  }
}

document.getElementById('ffrg').oninput = function () {
  if (this.checked == true) {
    if (document.getElementById('pjir').checked == true && document.getElementById('fy08').checked == true && document.getElementById('tn6g').checked == true && document.getElementById('aapn').checked == true && document.getElementById('aaba').checked == true && document.getElementById('aabv').checked == true) {
      document.getElementsByClassName("abdn")[0].classList.remove('visible');
    } else {
      document.getElementsByClassName("abdn")[0].classList.add('visible');
    }
  } else {
    document.getElementsByClassName("abdn")[0].classList.add('visible');
  }
}

document.getElementById('fy08').oninput = function () {
  if (this.checked == true) {
    if (document.getElementById('ffrg').checked == true && document.getElementById('pjir').checked == true && document.getElementById('tn6g').checked == true && document.getElementById('aapn').checked == true && document.getElementById('aaba').checked == true && document.getElementById('aabv').checked == true) {
      document.getElementsByClassName("abdn")[0].classList.remove('visible');
    } else {
      document.getElementsByClassName("abdn")[0].classList.add('visible');
    }
  } else {
    document.getElementsByClassName("abdn")[0].classList.add('visible');
  }
}

document.getElementById('tn6g').oninput = function () {
  if (this.checked == true) {
    if (document.getElementById('ffrg').checked == true && document.getElementById('pjir').checked == true && document.getElementById('fy08').checked == true && document.getElementById('aapn').checked == true && document.getElementById('aaba').checked == true && document.getElementById('aabv').checked == true) {
      document.getElementsByClassName("abdn")[0].classList.remove('visible');
    } else {
      document.getElementsByClassName("abdn")[0].classList.add('visible');
    }
  } else {
    document.getElementsByClassName("abdn")[0].classList.add('visible');
  }
}

document.getElementById('aapn').oninput = function () {
  if (this.checked == true) {
    if (document.getElementById('ffrg').checked == true && document.getElementById('pjir').checked == true && document.getElementById('fy08').checked == true && document.getElementById('tn6g').checked == true && document.getElementById('aaba').checked == true && document.getElementById('aabv').checked == true) {
      document.getElementsByClassName("abdn")[0].classList.remove('visible');
    } else {
      document.getElementsByClassName("abdn")[0].classList.add('visible');
    }
  } else {
    document.getElementsByClassName("abdn")[0].classList.add('visible');
  }
}

document.getElementById('aaba').oninput = function () {
  if (this.checked == true) {
    if (document.getElementById('ffrg').checked == true && document.getElementById('pjir').checked == true && document.getElementById('fy08').checked == true && document.getElementById('tn6g').checked == true && document.getElementById('aapa').checked == true && document.getElementById('aabv').checked == true) {
      document.getElementsByClassName("abdn")[0].classList.remove('visible');
    } else {
      document.getElementsByClassName("abdn")[0].classList.add('visible');
    }
  } else {
    document.getElementsByClassName("abdn")[0].classList.add('visible');
  }
}

document.getElementById('aabv').oninput = function () {
  if (this.checked == true) {
    if (document.getElementById('ffrg').checked == true && document.getElementById('pjir').checked == true && document.getElementById('fy08').checked == true && document.getElementById('tn6g').checked == true && document.getElementById('aapa').checked == true && document.getElementById('aaba').checked == true) {
      document.getElementsByClassName("abdn")[0].classList.remove('visible');
    } else {
      document.getElementsByClassName("abdn")[0].classList.add('visible');
    }
  } else {
    document.getElementsByClassName("abdn")[0].classList.add('visible');
  }
}