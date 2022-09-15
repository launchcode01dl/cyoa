function strToVal(sValue) { //converts "-", "" to 0's, else returns the integer value
	if((sValue === "-") || (sValue === "")) {
		return 0;
	} else {
		return parseInt(sValue);
	}
}
function getStr(row, sValueClass) { //pulls the string from the class requested
    for (var i = 0; i < row.cells.length; i++) {
        if(row.cells[i].className === sValueClass) { //ie. "lifeval_col"
			return strToVal(row.cells[i].innerHTML);
        }
    }
    return 0;
}
function getCost(row) {
    for (var i = 0; i < row.cells.length; i++) {
        if(row.cells[i].className == "skillval_col") {
            return parseInt(row.cells[i].innerHTML);
        }
    }
    return 0;
}
function is_taken(tableName, rowNum) {
    var row = document.getElementById(tableName).getElementsByTagName("tr")[rowNum];
    return (row.className == "purchased" || row.className == "rolled");
}

function toggle(itemName, rowNum, canRevert, preReqName1, preReqName2, allowsName1, allowsName2, allowsName3, allowsName4) {
	var summary = document.getElementById("summary");
    var thisItem = document.getElementById(itemName).getElementsByTagName("tr");
	
    var availLifevalCtr = document.getElementById("counter_red");
	var availSkillvalCtr = document.getElementById("counter");
	var availPowervalCtr = document.getElementById("counter_violet");
	var availGoldvalCtr = document.getElementById("counter_gold");
    var availLifeval = parseInt(availLifevalCtr.innerHTML);
	var availSkillval = parseInt(availSkillvalCtr.innerHTML);
	var availPowerval = parseInt(availPowervalCtr.innerHTML);
	var availGoldval = parseInt(availGoldvalCtr.innerHTML);
	var lifeval = getStr(thisItem[rowNum], "lifeval_col");
    var skillval = getStr(thisItem[rowNum], "skillval_col");
	var powerreq = getStr(thisItem[rowNum], "powerreq_col");
	var powerval = getStr(thisItem[rowNum], "powerval_col");
	var goldval = getStr(thisItem[rowNum], "goldval_col");
	var lifevalBack = 0;
	var skillvalBack = 0;
	var powervalBack = 0;
	var goldvalBack = 0;
	
	if(is_taken(itemName, rowNum) == 0) { //was unselected; selecting
		if((preReqName1 == null) || (is_taken(preReqName1, 0) == 1)) { //only select if any pre requisites are selected
			if((preReqName2 == null) || (is_taken(preReqName2, 0) == 1)) {
				//figure out how many skillval would be reimbursed from any selected alternative items
				for (var i = 0; i < thisItem.length; i++) {
					if(i != rowNum) { 
						if(is_taken(itemName, i) == 1) {
							lifevalBack = lifevalBack + getStr(document.getElementById(itemName).getElementsByTagName("tr")[i], "lifeval_col");
							skillvalBack = skillvalBack + getStr(document.getElementById(itemName).getElementsByTagName("tr")[i], "skillval_col");
							powervalBack = powervalBack + getStr(document.getElementById(itemName).getElementsByTagName("tr")[i], "powerval_col");
							goldvalBack = goldvalBack + getStr(document.getElementById(itemName).getElementsByTagName("tr")[i], "goldval_col");
						}
					}
				}
				
				if(availLifeval - lifevalBack + lifeval >= 0) { //only select if can afford it;
					if(availSkillval - skillvalBack + skillval >= 0) {
						if(availPowerval - powervalBack + powerval >= 0) {
							if(availPowerval - powervalBack + powerval >= powerreq) {
								//alert("availGoldval = " + availGoldval + "; goldvalBack = " + goldvalBack + "; goldval = " + goldval);
								if(availGoldval - goldvalBack + goldval >= 0) {
									//refund any already-made selections in same chain
									for (var i = 0; i < thisItem.length; i++) {
										if(is_taken(itemName, i)) {
											var refundResult = refund(itemName, i);
										}
									}
									
									//update available resources as this may have updated as a result of the refunds
									availLifeval = parseInt(availLifevalCtr.innerHTML);
									availSkillval = parseInt(availSkillvalCtr.innerHTML);
									availPowerval = parseInt(availPowervalCtr.innerHTML);
									availGoldval = parseInt(availGoldvalCtr.innerHTML);
									
									//select item
									thisItem[rowNum].className = "purchased";
									availLifeval = availLifeval + lifeval;
									availSkillval = availSkillval + skillval;
									availPowerval = availPowerval + powerval;
									availGoldval = availGoldval + goldval;
									
									summary.innerHTML = summary.innerHTML + itemName + " " + rowNum.toString() + "|"; //update summary
								} else {
									alert("You don't have enough gold to afford this.");
								}
							} else {
								alert("You aren't powerful enough to use this ability. Collect additional spiritite to gain more power.");
							}
						} else {
							alert("You don't have enough spiritite to afford this.");
						}
					} else {
						alert("You don't have enough magicite to afford this.");
					}
				} else {
					alert("You don't have enough vitalite to afford this.");
				}
			} else {
				alert("You can't get this item as you are lacking a prerequisite (" + preReqName2 + ").");
			}
		} else {
			alert("You can't get this item as you are lacking a prerequisite (" + preReqName1 + ").");
		}
	} else { //was selected; deselecting
		if(canRevert == true) { //only deselect if can revert
			if((allowsName1 == null) || (is_taken(allowsName1, 0) == 0)) { //only deselect if no dependents are selected
				if((allowsName2 == null) || (is_taken(allowsName2, 0) == 0)) {
					if((allowsName3 == null) || (is_taken(allowsName3, 0) == 0)) {
						if((allowsName4 == null) || (is_taken(allowsName4, 0) == 0)) {
							//if this was an item that granted skillval, can only deselect if have enough skillval to pay it back
							if(availLifeval - lifeval >= 0) { //only deselect if after deselecting it you still have positive val (in case it's an item that gives val)
								if(availSkillval - skillval >= 0) { 
									if(availPowerval - powerval >= 0) { 
										if(availGoldval - goldval >= 0) { 
											//deselect item
											var refundResult = refund(itemName, rowNum);
											
											//update available resources as this may have updated as a result of the refund
											availLifeval = parseInt(availLifevalCtr.innerHTML);
											availSkillval = parseInt(availSkillvalCtr.innerHTML);
											availPowerval = parseInt(availPowervalCtr.innerHTML);
											availGoldval = parseInt(availGoldvalCtr.innerHTML);
										} else {
											alert("You can't deselect this item as it would leave you with negative gold.");
										}
									} else {
										alert("You can't deselect this item as it would leave you with negative spiritite.");
									}
								} else {
									alert("You can't deselect this item as it would leave you with negative magicite.");
								}
							} else {
								alert("You can't deselect this item as it would leave you with negative vitalite.");
							}
						} else {
							alert("You can't deselect this item. Another item (" + allowsName4 + ") depends on this item.");
						}
					} else {
						alert("You can't deselect this item. Another item (" + allowsName3 + ") depends on this item.");
					}
				} else {
					alert("You can't deselect this item. Another item (" + allowsName2 + ") depends on this item.");
				}
			} else {
				alert("You can't deselect this item. Another item (" + allowsName1 + ") depends on this item.");
			}
		}
	}
	
    availLifevalCtr.innerHTML = availLifeval.toString(); //update counters
	availSkillvalCtr.innerHTML = availSkillval.toString(); 
	availPowervalCtr.innerHTML = availPowerval.toString(); 
	availGoldvalCtr.innerHTML = availGoldval.toString(); 
	return 0;
}

function refund(tableName, rowNum) { //refunds the requested item
    var summary = document.getElementById("summary");
    var row = document.getElementById(tableName).getElementsByTagName("tr")[rowNum];
	var wasTaken = false;
	
    var availLifevalCtr = document.getElementById("counter_red");
	var availSkillvalCtr = document.getElementById("counter");
	var availPowervalCtr = document.getElementById("counter_violet");
	var availGoldvalCtr = document.getElementById("counter_gold");
    var availLifeval = parseInt(availLifevalCtr.innerHTML);
	var availSkillval = parseInt(availSkillvalCtr.innerHTML);
	var availPowerval = parseInt(availPowervalCtr.innerHTML);
	var availGoldval = parseInt(availGoldvalCtr.innerHTML);

    if(is_taken(tableName, rowNum)) {
		wasTaken = true;
        availLifeval = availLifeval - getStr(row, "lifeval_col");
		availSkillval = availSkillval - getStr(row, "skillval_col");
		availPowerval = availPowerval - getStr(row, "powerval_col");
		availGoldval = availGoldval - getStr(row, "goldval_col");
        
        //update summary
        var sumText = summary.innerHTML;
        var key = tableName + " " + rowNum;
        var key_start = sumText.indexOf(key);
        //grab everything before and after the refunded choice
        summary.innerHTML = sumText.slice(0, key_start) + sumText.slice(key_start + key.length + 1);
    }
    row.className = "";
    availLifevalCtr.innerHTML = availLifeval.toString();
	availSkillvalCtr.innerHTML = availSkillval.toString();
	availPowervalCtr.innerHTML = availPowerval.toString();
	availGoldvalCtr.innerHTML = availGoldval.toString();
    
    return wasTaken;
}

function trade_gems(gemType, buyOrSell, goldval) { //handles buying and selling of gems
	var availLifevalCtr = document.getElementById("counter_red");
	var availSkillvalCtr = document.getElementById("counter");
	var availPowervalCtr = document.getElementById("counter_violet");
	var availGoldvalCtr = document.getElementById("counter_gold");
    var availLifeval = parseInt(availLifevalCtr.innerHTML);
	var availSkillval = parseInt(availSkillvalCtr.innerHTML);
	var availPowerval = parseInt(availPowervalCtr.innerHTML);
	var availGoldval = parseInt(availGoldvalCtr.innerHTML);
	
	if(buyOrSell === "buy") {
		if(availGoldval - goldval >= 0) { //check if can afford it
			//update quantities
			if(gemType === "vitalite") {
				availLifeval = availLifeval + 1;
			} else if(gemType === "magicite") {
				availSkillval = availSkillval + 1;
			} else if(gemType === "spiritite") {
				availPowerval = availPowerval + 1;
			}
			availGoldval = availGoldval - goldval;
		} else {
			alert("You don't have enough gold to afford this.");
		}
	} else { //sell
		if(gemType == "vitalite") {
			if(availLifeval > 0) { //check if can afford it
				availLifeval = availLifeval - 1;
				availGoldval = availGoldval + goldval;
			} else {
				alert("You don't have any vitalite to sell.");
			}
		} else if(gemType == "magicite") {
			if(availSkillval > 0) { //check if can afford it
				availSkillval = availSkillval - 1;
				availGoldval = availGoldval + goldval;
			} else {
				alert("You don't have any magicite to sell.");
			}
		} else if(gemType == "spiritite") {
			if(availPowerval > 0) { //check if can afford it
				availPowerval = availPowerval - 1;
				availGoldval = availGoldval + goldval;
			} else {
				alert("You don't have any spiritite to sell.");
			}
		}
	}
	
	availLifevalCtr.innerHTML = availLifeval.toString(); //update counters
	availSkillvalCtr.innerHTML = availSkillval.toString(); 
	availPowervalCtr.innerHTML = availPowerval.toString(); 
	availGoldvalCtr.innerHTML = availGoldval.toString(); 
	return 0;
}

function slidePanel(id) {
    var panel = document.getElementById(id);
    if(panel.className == "infocus") {
        panel.className = "nodisplay";
    } else {
        panel.className = "infocus";
    }
}

function gen_summary() {
    //tableName rowNum|
    var sumText = document.getElementById("summary").innerHTML;
    var outText = "<b>Background</b><br>";
	var outSummary = "(Options selected: ";
    var str_tokOrig = sumText.split("|"); //str_tok is an array of 'name id, name id'
	str_tok = str_tokOrig.sort();
    var cur_tok = "";
	var nextTokExists = false;
	var next_tok = "";
    var row;
	
    for (var i=1; i<str_tok.length; i++) {    //started at 0 originally
        cur_tok = str_tok[i].split(" "); //cur_tok[0] is name of the current item, cur_tok[1] is the ID of the item
		if(i == str_tok.length - 1) { //we're already at the last one
			nextTokExists = false;
		} else {
			next_tok = str_tok[i+1].split(" "); 
			nextTokExists = true;
		}
        
		row = document.getElementById(cur_tok[0]).getElementsByTagName("tr")[cur_tok[1]];
		//alert("item name is " + cur_tok[0] + ", ID is " + cur_tok[1]);

        for (var j=0; j<row.cells.length; j++) {
            if(row.cells[j].className == "name_col") {
                outSummary = outSummary + "" + row.cells[j].innerHTML + ", ";
            }
			if(row.cells[j].className == "desc_col") {
				var sDesc = row.cells[j].innerHTML;
				var iTrimLoc = sDesc.indexOf("Req");
				if(iTrimLoc>0) {
					sDesc = sDesc.substring(0, iTrimLoc);
				}
                //outText = outText + sName.substring(0, iTrimLoc) + " ";
				//alert(cur_tok[0] + "; " + cur_tok[0].substring(1,2));
				
				//outText = outText + row.cells[j].innerHTML + " ";
				outText = outText + sDesc + " ";
				
				if(nextTokExists) { //section transitions
					if((cur_tok[0].substring(1, 3) === "1b") && (next_tok[0].substring(1, 3) === "1c")) {
						outText = outText + "<br><br>";
					} else if((cur_tok[0].substring(1, 2) === "1") && (next_tok[0].substring(1, 2) === "2")) {
						outText = outText + "<br><br><b>Personality</b><br>";
					} else if((cur_tok[0].substring(1, 2) === "2") && (next_tok[0].substring(1, 2) === "3")) {
						outText = outText + "<br><br><b>Innate abilities</b><br> - ";
					} else if((cur_tok[0].substring(1, 2) === "3") && (cur_tok[0].substring(1, 2) === next_tok[0].substring(1, 2)) && (cur_tok[0].substring(2, 3) != next_tok[0].substring(2, 3))) {
						outText = outText + "<br> - ";
					} else if((cur_tok[0].substring(1, 2) === "3") && (next_tok[0].substring(1, 2) === "4")) {
						outText = outText + "<br><br><b>Spellcasting abilities</b><br> - ";
					} else if((cur_tok[0].substring(1, 2) === "4") && (cur_tok[0].substring(1, 2) === next_tok[0].substring(1, 2)) && (cur_tok[0].substring(2, 3) != next_tok[0].substring(2, 3))) {
						outText = outText + "<br> - ";
					} else if((cur_tok[0].substring(1, 2) === "4") && (next_tok[0].substring(1, 2) === "5")) {
						outText = outText + "<br><br><b>Accomplishments</b><br> - ";
					} else if((cur_tok[0].substring(1, 2) === "5")) { //list all accomplishments separately.
						outText = outText + "<br> - ";
					}
				}

            }
        }
    }
	outSummary = outSummary.substring(0, outSummary.length - 2);
    document.getElementById("p_summary").innerHTML = outText + "<br><br>" + outSummary + ".)";
}

