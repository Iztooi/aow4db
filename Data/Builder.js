var searchParams = new URLSearchParams(window.location.search);
var sorting = searchParams.get('sort');
var currentView = "";

var highCultureUnits = ["lightseeker", "dawn_defender", "dusk_hunter", "sun_priest", "daylight_spear", "awakener"];
var barbarianCultureUnits = ["pathfinder", "sunderer", "warrior", "war_shaman", "fury", "berserker"];
var darkCultureUnits = ["outrider", "pursuer", "dark_warrior", "warlock", "night_guard", "dark_knight"];
var feudalCultureUnits = ["scout", "peasant_pikeman", "archer", "bannerman", "defender", "knight"];
var industriousCultureUnits = ["pioneer", "anvil_guard", "arbalest", "steelshaper", "halberdier", "bastion"];
var mysticCultureUnits = ["mystic_projection", "arcane_guard", "arcanist", "soother", "spellshield", "spellbreaker"];


var MountedSpecialList = ["pioneer", "scout", "lightseeker", "bastion", "knight", "outrider", "dark_knight", "spellbreaker", "awakener", "fury", "pathfinder", "tyrant_knight"];

function GetTierAndName(id) {
    for (i in jsonUnits.units) {
        if (id == jsonUnits.units[i].id) {
            return romanize(jsonUnits.units[i].tier) + " - " + getUnitTypeTag(jsonUnits.units[i].secondary_passives) + " " + jsonUnits.units[i].name;
        }
    }

}

function GetTierAndNameTome(id) {
    for (i in jsonTomes.tomes) {
        if (id == jsonTomes.tomes[i].id) {
            return romanize(jsonTomes.tomes[i].tier) + " - " + jsonTomes.tomes[i].name;
        }
    }

}

function ShowUnitFromLink() {
    var unitID = searchParams.get('unit');
    document.title = "Age of Wonders 4 Database - " + GetTierAndName(unitID).split(">")[2];
    showUnitFromString(unitID, "dataHolder");
}

function getUnitTypeTag(passivesList) {
    var i = "";
    for (i in passivesList) {
        if (passivesList[i].slug == "fighter_unit") {
            return "<unitFighter></unitFighter>";
        }
        if (passivesList[i].slug == "shock_unit") {
            return "<unitShock></unitShock>";
        }

        if (passivesList[i].slug == "skirmisher_unit") {
            return "<unitSkirmisher></unitSkirmisher>";
        }
        if (passivesList[i].slug == "support_unit") {
            return "<unitSupport></unitSupport>";
        }
        if (passivesList[i].slug == "scout_unit") {
            return "<unitScout></unitScout>";
        }
        if (passivesList[i].slug == "ranged_unit") {
            return "<unitRanged></unitRanged>";
        }
        if (passivesList[i].slug == "battle_mage_unit") {
            return "<unitBattlemage></unitBattlemage>";
        }
        if (passivesList[i].slug == "polearm_unit") {
            return "<unitPolearm></unitPolearm>";
        }
        if (passivesList[i].slug == "shield_unit") {
            return "<unitShield></unitShield>";
        }
        if (passivesList[i].slug == "tower") {
            return "<unitTower></unitTower>";
        }
        if (passivesList[i].slug == "siegecraft") {
            return "<unitSiegecraft></unitSiegecraft>";
        }
        if (passivesList[i].slug == "mythic_unit") {
            return "<unitMythic></unitMythic>";
        }
    }
}

function SetButtonsAndDivs(list, parent, cardType) {
    var modName, description, cost, type, tier, i, nameString = "";
    for (i in list) {
        var found = false;

        if (parent === undefined) {
            var buttonHolder = document.getElementById("buttonHolder");
        } else {
            var buttonHolder = document.getElementById(parent);
        }

        var dataHolder = document.getElementById("dataHolder");

        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        if (cardType == "unitTomeIcon") {
            var splitIcon = list[i].split(":");
            div.setAttribute("id", splitIcon[0]);
        } else {
            div.setAttribute("id", list[i]);
        }



        dataHolder.appendChild(div);

        var divChild = document.createElement("DIV");
        if (cardType == "unitTomeIcon") {
            var splitIcon = list[i].split(":");
            divChild.setAttribute("id", splitIcon[0] + "_card");

        } else {
            divChild.setAttribute("id", list[i] + "_card");
        }



        div.appendChild(divChild);



        if (cardType == "unitTomeIcon") {
            var splitIcon = list[i].split(":");
            showUnitFromString(splitIcon[0], splitIcon[0]);
        }

        if (cardType == "unit") {
            showUnitFromString(list[i], list[i]);
        }

        if (cardType == "tome") {
            showTomeFromList2(list[i], list[i]);
        }


        if (cardType == "search") {
            showUnitFromString(list[i], list[i]);
        }




        var btn = document.createElement("BUTTON");
        /// tooltipName.style.fontSize = "20px";

        btn.className = "w3-bar-item w3-button tablink";
        btn.type = "button";


        if (cardType == "unitTomeIcon") {
            var splitIcon = list[i].split(":");
            btn.setAttribute("id", splitIcon[0] + "-button");
        } else {
            btn.setAttribute("id", list[i] + "-button");
        }



        if (cardType == "tome") {
            btn.innerHTML = GetTierAndNameTome(list[i]);
        } else if (cardType == "unitTomeIcon") {
            btn.innerHTML = "<img src=\"/aow4db/Icons/TomeIcons/" + splitIcon[1] + ".png\" width='25px'\">" + GetTierAndName(splitIcon[0]);

            if (MountedSpecialList.includes(splitIcon[0])) {
                imag = document.createElement("IMG");
                imag.setAttribute("src", "/aow4db/Icons/Abilities/cavalry.png");
                imag.setAttribute("height", "20px");

                btn.append(imag)
                imag.setAttribute("style", "position:relative; float:right");
            }

        } else {
            btn.innerHTML = GetTierAndName(list[i]);

            if (MountedSpecialList.includes(list[i])) {
                imag = document.createElement("IMG");
                imag.setAttribute("src", "/aow4db/Icons/Abilities/cavalry.png");
                imag.setAttribute("height", "20px");

                btn.append(imag)
                imag.setAttribute("style", "position:relative; float:right");
            }
        }

        buttonHolder.appendChild(btn);
        if (cardType == "unitTomeIcon") {
            btn.setAttribute("onclick", 'openCity(event,\'' + splitIcon[0] + '\')');
        } else {
            btn.setAttribute("onclick", 'openCity(event,\'' + list[i] + '\')');
        }




        if (cardType != "search") {
            var holderHeight = buttonHolder.offsetHeight + 0;
        } else {
            var holderHeight = buttonHolder.offsetHeight;
        }

        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px; margin-left:200px");


    }

}

function SetCollapsibleButtonsAndDivs(overwrite, list, cardType) {
    var modName, description, cost, type, tier, i, nameString = "";

    var buttonHolder = document.getElementById("buttonHolder");


    var btn = document.createElement("BUTTON");
    /// tooltipName.style.fontSize = "20px";


    btn.type = "button";



    btn.innerHTML = overwrite + " (" + list.length + ")";
    if (cardType != "unit") {
        btn.setAttribute("onclick", 'openCity(event,\'' + overwrite + '\')');
        btn.setAttribute("id", overwrite + "-button");
    }



    buttonHolder.appendChild(btn);


    if (cardType == "spell") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight + 50;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {
        showSpellFromList(list, overwrite);

        // }





    }
    if (cardType == "skill") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight + 50;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showSkillFromList(list, overwrite);

        // }





    }



    if (cardType == "unit") {
        btn.className = "collapsibleUnits";
        var content = document.createElement("DIV");
        content.setAttribute("id", overwrite + "-button");
        content.className = "contentUnits";
        buttonHolder.append(content);

    }

    if (cardType == "tome") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {
        showTomeFromList2(list, overwrite);

        // }
    }
}

async function openCity(evt, cityName) {

    if (cityName != undefined) {
        currentView = cityName;
    }


    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    closeTabLinks(cityName);

    var currentEl = document.getElementById(cityName);
    if (currentEl != null) {
        currentEl.style.display = "block";
    }
    if (evt != null) {
        evt.currentTarget.className += " w3-red";
    }
    var currenturl = window.location.href.split('?')[0];
    var currentadditive = currenturl.split('&')[1];
    if (currentadditive === undefined) {
        currentadditive = "";
    }
    window.history.replaceState({}, 'foo', currenturl + "?type=" + cityName + "&" + currentadditive);

    if (sorting != undefined) {
        var splits = sorting.split(":");
        setTimeout(function () {
            sortDivs(splits[0], splits[1]);
        }, 50);
        // console.log(cityName);
    }

}

function closeTabLinks(cityName) {
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].id != cityName + "-button") {
            tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
        }

    }
}


function addUnitTypeIcon(a, b) {
    var icontext, iconsrc, iconName, j, btn, imag, spa = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {
            icontext = jsonUnitAbilities.abilities[j].description;
            iconsrc = a;
            iconName = jsonUnitAbilities.abilities[j].name;


            iconName = iconName.toUpperCase();
            btn = document.createElement("DIV");
            btn.className = "unittype_icon";
            imag = document.createElement("IMG");
            spa = document.createElement("SPAN");
            spa.className = "tooltiptext";
            imag.setAttribute("src", "/aow4db/Icons/Abilities/" + iconsrc + ".png");
            imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");


            spa.innerHTML = "<img style=\"float:left; height:30px; width:30px\" src=\"/aow4db/Icons/Abilities/" + iconsrc + ".png\"><p style=\"color: #d7c297;>" + "<span style=\"font-size=20px;\">" + iconName + "</p>" +
                "</br>" + icontext;
            iconName = jsonUnitAbilities.abilities[j].name;
            if (iconName === "Shock Unit" || iconName === "Shield Unit" ||
                iconName === "Fighter Unit" || iconName === "Support Unit" ||
                iconName === "Battle Mage Unit" || iconName === "Skirmisher Unit" || iconName === "Scout Unit" || iconName === "Polearm Unit" || iconName === "Ranged Unit" || iconName === "Mythic Unit" || iconName === "Tower" || iconName === "Siegecraft") {
                unitRole = document.getElementById("unit_role");

                unitRole.setAttribute("src", "/aow4db/Icons/Text/" + iconsrc + ".png");
            }
            document.getElementById("unitstat").appendChild(btn);

            btn.appendChild(imag);
            btn.append(spa);
        }
    }
}

function addAbilityslot(a, b) {
    var abilityName, abilityIcon, abilityDescr, abilityDam, abilityAcc, abilityRange, abilityType, abilityNote, j, splitDamageString, abilityDamType, abilityReq, abilityMod = "";

    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            if (jsonUnitAbilities.abilities[j].damage === undefined) {
                abilityDam = "";
            } else {
                abilityDam = jsonUnitAbilities.abilities[j].damage;
            }






            abilityType = jsonUnitAbilities.abilities[j].actionPoints;



            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].icon;


            if (jsonUnitAbilities.abilities[j].requisites === undefined) {
                abilityReq = "";
            } else {
                abilityReq = "";
                for (k in jsonUnitAbilities.abilities[j].requisites) {
                    if (k == 0) {
                        abilityReq = "(";
                    }
                    abilityReq += jsonUnitAbilities.abilities[j].requisites[k].requisite;
                    if (k != jsonUnitAbilities.abilities[j].requisites.length - 1) {
                        abilityReq += ",";
                    } else {
                        abilityReq += ")";
                    }
                }

            }

            if (jsonUnitAbilities.abilities[j].modifiers === undefined) {
                abilityMod = "";
            } else {


                for (l in jsonUnitAbilities.abilities[j].modifiers) {
                    abilityName += "&#11049";
                    abilityMod += "<bullet>" + jsonUnitAbilities.abilities[j].modifiers[l].name + "<br>";
                    abilityMod += jsonUnitAbilities.abilities[j].modifiers[l].description + "</bullet><br>";
                }

            }

            // add notes


            abilityNote = "";
            for (l in jsonUnitAbilities.abilities[j].notes) {
                if (jsonUnitAbilities.abilities[j].notes[l] === undefined) {

                } else {
                    abilityNote += "<bullet>" + jsonUnitAbilities.abilities[j].notes[l].note + "</bullet>";

                }

            }




            abilityDam = jsonUnitAbilities.abilities[j].damage;
            abilityRange = jsonUnitAbilities.abilities[j].range + "<range></range>";
            abilityAcc = jsonUnitAbilities.abilities[j].accuracy + "<accuracy></accuracy>";

            var tooltipName = document.createElement("SPAN");
            var btn = document.createElement("DIV");
            /// tooltipName.style.fontSize = "20px";
            tooltipName.innerHTML = "test";
            btn.className = "unit_abilityslot";
            // if (n === true) {
            //   btn.style.backgroundColor = "rgb(73, 0, 80)";
            //} 
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            //  var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            tex.innerHTML = abilityName;
            tex.setAttribute('onclick', '');
            var dam = document.createElement("DIV");
            dam.className = "ability_damage";
            dam.innerHTML = abilityDam;

            abilityDescr = jsonUnitAbilities.abilities[j].description;

            var abilityIconType = "";
            imag.setAttribute("src", "/aow4db/Icons/Abilities/" + abilityIcon + ".png");

            var abilityIconType = GetAbilityBackground(abilityDam);

            imag.setAttribute("style", "background-image: url(\"/aow4db/Icons/Interface/" + abilityIconType + ".png\");background-repeat: no-repeat;background-size: 40px 40px");

            imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");



            var spa = GetAbilityToolTip(jsonUnitAbilities.abilities[j], abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq);

            spa.className = "tooltiptext";

            if (abilityName.indexOf("Defense Mode") > -1) {
                spa.innerHTML = "<div class=\"leftAbility\" style=\"color:#d7c297;\">" + abilityName.toUpperCase();
                spa.innerHTML += "<div style=\"clear:both\"> </div>" + "<br>";
                spa.innerHTML += jsonUnitAbilities.abilities[j].description;
                dam.innerHTML = "";
            }





            document.getElementById("unitabholder").append(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);
            btn.append(dam);

        }
    }

}

function GetAbilityBackground(abilityDam) {
    if (abilityDam != undefined) {
        splitDamageString = abilityDam.split(">");
        if (splitDamageString[0].indexOf("phys") != -1) {
            var abilityIconType = "ability_icon_phys";
        } else if (splitDamageString[0].indexOf("frost") != -1) {
            var abilityIconType = "ability_icon_frost";
        } else if (splitDamageString[0].indexOf("blight") != -1) {
            var abilityIconType = "ability_icon_blight";
        } else if (splitDamageString[0].indexOf("spirit") != -1) {
            var abilityIconType = "ability_icon_spirit";
        } else if (splitDamageString[0].indexOf("fire") != -1) {
            var abilityIconType = "ability_icon_fire";
        } else {
            var abilityIconType = "ability_icon";
        }

    } else {
        var abilityIconType = "ability_icon"
    }
    return abilityIconType;
}

function GetAbilityToolTip(ability, abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq) {
    var abilityDam = "";
    if (ability.damage === undefined) {
        abilityDam = "";
    } else {
        abilityDam = ability.damage;
    }
    // block one, header
    var spa = document.createElement("SPAN");
    spa.innerHTML = "<div style\"display:block\"><img style=\"float:left; height:50px; width:50px; background-image:url(\'/aow4db/Icons/Interface/" + abilityIconType + ".png');background-repeat: no-repeat;background-size: 50px\" src=\"/aow4db/Icons/Abilities/" + ability.icon + ".png\">";

    spa.innerHTML += "<div class=\"leftAbility\" style=\"color:#d7c297;\">" + abilityName.toUpperCase() + "</div>" + "<div class=\"rightAbility\">" + ability.damage + "</div><br>";

    spa.innerHTML += "<div style=\"clear:right\"> </div>";
    spa.innerHTML += "<div class=\"leftAbility\">" + abilityAcc + abilityRange + "</div>" + "<div class=\"rightAbility\">" + ability.actionPoints + "</div></div>";
    spa.innerHTML += "<div style=\"clear:both\"> </div>";


    // block 2, descrp
    spa.innerHTML += "<br>" + ability.description;

    // modifiers
    if (abilityMod != "") {
        spa.innerHTML += "<p style=\"color:#addd9e;font-size: 13px\">" + abilityMod + "</p>";
    }


    // block 3, req
    //notes

    spa.innerHTML += "<p style=\"color:#a4a4a6; font-size: 12px\">" + abilityNote + "</p>";



    spa.innerHTML += abilityReq;
    return spa;
}

function addPassiveslot(a) {
    var abilityName, abilityIcon, abilityDescr, j = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].slug;
            abilityDescr = jsonUnitAbilities.abilities[j].description;

            var btn = document.createElement("DIV");
            btn.className = "unit_passiveslot";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";

            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            tex.setAttribute('onclick', '');
            tex.innerHTML = abilityName;





            imag.setAttribute("src", "/aow4db/Icons/Abilities/" + abilityIcon + ".png");
            imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");




            var spa = CreatePassiveSlotToolTip(abilityIcon, abilityName, abilityDescr);
            spa.className = "tooltiptext";
            document.getElementById("unitabholder").appendChild(btn);

            btn.appendChild(imag);




            tex.appendChild(spa);


            btn.append(tex);

        }
    }

}

function CreatePassiveSlotToolTip(abilityIcon, abilityName, abilityDescr) {
    var spa = document.createElement("SPAN");

    spa.innerHTML = "<img style=\"float:left; height:30px; width:30px\" src=\"/aow4db/Icons/Abilities/" + abilityIcon + ".png\"><p style=\"color: #d7c297;>" + "<span style=\"font-size=20px;\">" + abilityName.toUpperCase() + "</p>" +
        "</br>" + abilityDescr;

    return spa;
}

function addResistanceSlot(a, resistance) {
    var abilityName, abilityIcon, abilityDescr, abilityDam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {

            abilityName = jsonUnitAbilities.abilities[j].name;
            if (abilityName.indexOf("Immu") != -1) {
                var firstPart = abilityName.split(" ")[0];

            } else {
                var nameclean = abilityName.split(">")[1];
                var firstPart = nameclean.split(" ")[0];
            }

            abilityIcon = jsonUnitAbilities.abilities[j].icon;
            abilityDescr = jsonUnitAbilities.abilities[j].description;
            abilityDam = jsonUnitAbilities.abilities[j].damage;
            var btn = document.createElement("DIV");
            btn.className = "resistance_icon";
            btn.setAttribute("id", abilityName);
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";


            spa = document.createElement("SPAN");
            spa.className = "tooltiptext";

            spa.innerHTML = "<p>" + "<span style=\"font-size=20px; text-transform:uppercase; color:#deb887 ;\">" + abilityName + "</p>" + "Added to Resistance <resistance></resistance> to calculate damage sustained from " + firstPart + ".";

            var num = "";
            if (a.indexOf("weakness") !== -1) {
                var split = a.split("weakness_");
                num = "-" + split[1];
            }
            if (a.indexOf("resistance") !== -1) {
                var split = a.split("resistance_");
                num = split[1];
            }

            if (a.indexOf("immun") !== -1) {
                var split = a.split("resistance_");
                num = "x";
            }

            spa.innerHTML += "<br><br>Damage Reduction: <br> " + firstPart + " <span style=\"color:white;\">" + GetDamageReductionPercentage(resistance, num) + "</span> ( From <span style=\"color:white;\">" + resistance + "</span> <resistance> </resistance>";
            if (num != undefined) {
                if (num > 0) {
                    spa.innerHTML += "+";
                }
                spa.innerHTML += num;
            }



            imag.setAttribute("width", "25");
            imag.setAttribute("height", "25");

            if (a.indexOf("frost") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/frost_resistance.png");
                spa.innerHTML += "<defensefrost></defensefrost>";
            }
            if (a.indexOf("blight") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/blight_resistance.png");
                spa.innerHTML += "<defenseblight></defenseblight>";
            }
            if (a.indexOf("fire") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/fire_resistance.png");
                spa.innerHTML += "<defensefire></defensefire>";
            }
            if (a.indexOf("spirit") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/spirit_resistance.png");
                spa.innerHTML += "<defensespirit></defensespirit>";
            }
            if (a.indexOf("lightning") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/lightning_resistance.png");
                spa.innerHTML += "<defenselightning></defenselightning>";
            }

            if (a.indexOf("weakness") !== -1) {
                var split = a.split("weakness_");
                abilityDam = "<p class=\"resistanceNumber\" style=\"color:red;\">-" + split[1];
            }
            if (a.indexOf("resistance") !== -1) {
                var split = a.split("resistance_");
                abilityDam = "<p class=\"resistanceNumber\" style=\"color:lawngreen;\">" + split[1];
            }

            if (a.indexOf("immun") !== -1) {
                var split = a.split("resistance_");
                abilityDam = "<p class=\"resistanceNumber\">IMM";
            }

            spa.innerHTML += ")";

            document.getElementById("resistanceholder").appendChild(btn);
            btn.innerHTML = abilityDam;

            btn.appendChild(imag);

            btn.append(spa);




        }
    }

}

function addstatusResistanceSlot(a) {
    var abilityName, abilityIcon, abilityDescr, abilityDam = "";



    var btn = document.createElement("DIV");
    btn.className = "resistance_icon";
    btn.id = "statusResistance";
    var imag = document.createElement("IMG");
    imag.className = "unit_ability_icon";


    spa = document.createElement("SPAN");
    spa.className = "tooltiptext";

    spa.innerHTML = "<p>" + "<span style=\"color: #deb887 ;text-transform: uppercase\">Status Resistance</span></p>";

    spa.innerHTML += "Reduces the chance that the unit will be affeted by negative status effects. <br><br>Current Chance Reduction :  <span style=\"color:white;\">" + GetDamageReductionPercentage(a, undefined) + "</span> ";


    imag.setAttribute("width", "25");
    imag.setAttribute("height", "25");


    imag.setAttribute("src", "/aow4db/Icons/Text/status_resistance.png");

    abilityDam = a;

    document.getElementById("resistanceholder").appendChild(btn);
    btn.innerHTML = "<p class=\"resistanceNumber\">" + abilityDam;

    btn.appendChild(imag);

    btn.append(spa);






}

function EliteSkill(a) {
    var nam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            nam = jsonUnitAbilities.abilities[j].name;
        }

    }
    return nam;
}

function addEliteSkill(a) {
    var abilityName, abilityIcon, abilityDescr = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].slug;
            abilityDescr = jsonUnitAbilities.abilities[j].description;

            var btn = document.createElement("DIV");
            btn.className = "unit_elite_skill";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            tex.setAttribute('onclick', '');
            tex.innerHTML = abilityName;
            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aowp/UI/elite_rank.png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder").appendChild(btn);
            // document.getElementById("unitabholder").setAttribute("id", "unitabholder" + b);

            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);

        }
    }

}
async function spawnCards(list, divID) {
    if (divID === undefined) {
        divID = "units";
    }
    var doc = document.getElementById(divID);
    for (var i = 0; i < list.length; i++) {

        var iDiv = unit_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);
    }

}





async function showUnitsFromList(list, overwritetext) {

    SetCollapsibleButtonsAndDivs(overwritetext, list, "unit");
    SetButtonsAndDivs(list, overwritetext + "-button", "unit");


}

async function showUnitsWithIcon(list) {


    SetButtonsAndDivs(list, "buttonHolder", "unitTomeIcon");
}



async function spawnCard(string, divID) {
    if (divID === undefined) {
        divID = "units";
    }
    var doc = document.getElementById(divID);

    var iDiv = unit_card_template.content.cloneNode(true);
    doc.appendChild(iDiv);


}

async function showUnitFromString(string, divID) {
    await spawnCard(string, divID);
    showUnit(string, divID);
}


var ascendingOrder = false;

function sortDivs(sortType, savedOrder) {
    var i = "";

    // 2 - Detemine the selector
    if (savedOrder != null) {
        ascendingOrder = savedOrder;
    } else {
        ascendingOrder = !ascendingOrder;
    }

    var buttontargets = document.getElementsByClassName("sortingButton");

    for (i in buttontargets) {
        buttontargets[i].className = "sortingButton";
    }
    var currentbutton = document.getElementById(sortType + "-button");

    if (ascendingOrder) {
        currentbutton.className += " activeDown";
    } else {
        currentbutton.className += " activeUp";
    }




    // 3 - Choose the wanted order
    //  ascendingOrder = !ascendingOrder;
    const isNumeric = true;

    // 4 - Select all elements
    if (currentView === "") {
        var container = document.getElementById("dataHolder");
    } else {
        var container = document.getElementById(currentView);
    }


    var element = elements = [...container.querySelectorAll('.mod_card')]



    var selector = element => element.querySelector('.mod_name').innerHTML;
    if (sortType == "tier") {
        selector = element => element.querySelector('.spell_tier').innerHTML;

    }
    if (sortType == "cost") {
        selector = element => element.querySelector('.spell_cost').innerHTML;
    }


    // 5 - Find their parent
    const parentElement = container;

    // 6 - Sort the elements
    const collator = new Intl.Collator(undefined, {
        numeric: isNumeric,
        sensitivity: 'base'
    });


    elements
        .sort((elementA, elementB) => {
            const [firstElement, secondElement] = ascendingOrder ? [elementA, elementB] : [elementB, elementA];

            var textOfFirstElement = selector(firstElement);

            var textOfSecondElement = selector(secondElement);
            if (sortType == "tier") {
                var fields = textOfFirstElement.split('Tier ', 3);
                textOfFirstElement = deromanize(fields[1]);
                var fields2 = textOfSecondElement.split('Tier ', 3);
                textOfSecondElement = deromanize(fields2[1]);

            }

            return collator.compare(textOfFirstElement, textOfSecondElement)
        })
        .forEach(element => parentElement.appendChild(element));


    var currenturl = window.location.href.split('&')[0];

    window.history.replaceState({}, 'foo', currenturl + "&sort=" + sortType + ":" + ascendingOrder);
    sorting = sortType + ":" + ascendingOrder;
}

async function SetCollapsibleStuff() {
    var coll = document.getElementsByClassName("collapsibleUnits");

    var i = "";

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            var contents = document.getElementsByClassName("contentUnits");
            var content = this.nextElementSibling;

            for (j = 0; j < contents.length; j++) {


                if (contents[j].style != null) {
                    if (contents[j].style.display === "grid") {
                        if (contents[j].id === content.id) {

                        } else {

                            coll[j].classList.toggle("active");
                            contents[j].style.display = "none";
                        }

                    }
                }

            }
            this.classList.toggle("active");

            if (content.style.display === "grid") {
                content.style.display = "none";
            } else {
                content.style.display = "grid";
            }




            var buttonHolder = document.getElementById("buttonHolder");
            var holderHeight = buttonHolder.offsetHeight;
            var dataHolder = document.getElementById("dataHolder");
            dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px; margin-left:200px");
        });


    }

    var buttonHolder = document.getElementById("buttonHolder");
    var holderHeight = buttonHolder.offsetHeight;
    var dataHolder = document.getElementById("dataHolder");
    dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;; margin-left:200px");
}

async function SetLevelUpStuff() {
    var coll = document.getElementsByClassName("collapsibleLevelup");
    var content = document.getElementsByClassName("contentLevelup");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            //this.classList.toggle("active");
            for (j in content) {
                coll[j].classList.toggle("active");
                //  var content = this.nextElementSibling;
                if (content[j].style.display === "block") {
                    content[j].style.display = "none";
                } else {
                    content[j].style.display = "block";

                }
            }

        });
    }




    // console.log(product, sorting);

    const urlParams = new URLSearchParams(window.location.search);
    const product = searchParams.get('type');


    if (product != undefined) {
        var splits = product.split("&");
        closeTabLinks(product);

        document.getElementById(splits[0] + "-button").className += " w3-red";


        await openCity(event, splits[0]);


    }



    //if (sorting != undefined) {


    // setTimeout(function () {
    //      sortDivs(sorting);
    //   }, 50);

    //  }


}



async function spawnEquipCards(list, divID) {
    if (divID === undefined) {
        divID = "equip";
    }
    var doc = document.getElementById(divID);
    for (var i = 0; i < list.length; i++) {
        var iDiv = item_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);
    }

}


async function showEquipmentFromList(list, divID) {


    await spawnEquipCards(list, divID);

    /* for (var i = 0; i < list.length; i++) {

         showEquipment(list[i], divID);

     };*/




}

async function showSiegeProjects() {



    await spawnSpellCards(jsonSiegeProjects.projects, "dataHolder");

    for (var i = 0; i < jsonSiegeProjects.projects.length; i++) {
        showSiegeProject(jsonSiegeProjects.projects[i].name);
    }





}

async function spawnTomeCards(list, divID) {
    if (divID === undefined) {
        divID = "tome";
    }
    var doc = document.getElementById(divID);

    var iDiv = tome_card_template.content.cloneNode(true);
    doc.appendChild(iDiv);


}


async function showTomeFromList2(string, divID) {



    await spawnTomeCards(string, divID);



    showTome(string, divID);






}

async function showTomeFromList(list, divID, overwritetext) {


    /* await spawnTomeCards(list, divID);

     for (var i = 0; i < list.length; i++) {

         showTome(list[i], divID);

     };*/
    // SetCollapsibleButtonsAndDivs(overwritetext, list, "tome");
    SetButtonsAndDivs(list, undefined, "tome");
    //  SetCollapsibleButtonsAndDivs(overwritetext, list, "tome");




}

async function spawnSpellCards(list, divID) {
    if (divID === undefined) {
        divID = "spell";
    }
    var doc = document.getElementById(divID);
    for (var i = 0; i < list.length; i++) {
        var iDiv = spell_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);
    }

}

async function spawnStructureCards(list, divID) {
    if (divID === undefined) {
        divID = "spell";
    }
    var doc = document.getElementById(divID);
    for (var i = 0; i < list.length; i++) {
        var iDiv = structure_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);
    }

}

async function showSpellFromList(list, divID) {


    await spawnSpellCards(list, divID);

    for (var i = 0; i < list.length; i++) {

        showSpell(list[i], true);

    };




}

async function showSkillFromList(list, divID) {


    await spawnSpellCards(list, divID);

    for (var i = 0; i < list.length; i++) {

        // check if has description
        if ('description' in list[i]) {
            showSkill(list[i], "", list[i].icon, list[i].category_name, list[i].level_name, list[i].group_name);
        } else {
            showSkill(list[i], "true", list[i].icon, list[i].category_name, list[i].level_name, list[i].group_name);
        }


    };




}

async function showWorldStructuresWithArgument(overwrite, argumentType, list, divID) {


    await spawnStructureCards(list, divID);

    for (var i = 0; i < list.length; i++) {

        showWorldStructure(list[i]);

    };




}
async function showStructuresWithArgument(argument, divID, argumentType, includeProvince) {

    var list = new Array();
    list = findStructuresWithArgument(argument, argumentType, includeProvince);

    await spawnStructureCards(list, divID);

    for (var i = 0; i < list.length; i++) {

        showStructure(list[i], true);

    };




}

async function showSkillsWithArgument(signature, argumentType, overwritetext) {

    var list = new Array();
    list = findSkillsWithArgument(signature, argumentType);


    SetCollapsibleButtonsAndDivs(overwritetext, list, "skill");




}

async function showSpellsWithArgument(argument, argumentType, overwritetext) {

    var list = new Array();
    list = findSpellsWithArgument(argument, argumentType);

    if (overwritetext.indexOf(">") != -1) {
        overwritetext = overwritetext.split("/")[1];
        overwritetext = overwritetext.split(">")[1];
    }

    SetCollapsibleButtonsAndDivs(overwritetext, list, "spell");




}

async function showSpellFromString(string, divID) {
    await spawnSpellCards(string, divID);
    showSpell(string, true);

}


function findSkillsWithArgument(signature, argumentType) {
    var j = "";

    var finalCheckedList = new Array();
    if (signature == "") {
        for (j in jsonHeroSkills.skills) {
            if ('category_name' in jsonHeroSkills.skills[j]) {
                if (jsonHeroSkills.skills[j].category_name.indexOf(argumentType) !== -1) {

                    finalCheckedList.push(jsonHeroSkills.skills[j]);
                }
            }





        }
    } else {

        for (j in jsonHeroSkills.skills) {
            if ('type' in jsonHeroSkills.skills[j]) {
                if (jsonHeroSkills.skills[j].type == 'signature') {
                    finalCheckedList.push(jsonHeroSkills.skills[j]);
                }

            }
        }
    }
    return finalCheckedList;
}

function findSpellsWithArgument(argumentaffinity, argumentType) {
    var i, output, affinity, textvalue, j, l, k, x, result = "";

    var finalCheckedList = new Array();
    if (argumentaffinity == "") {
        for (j in jsonSpells.spells) {

            if (jsonSpells.spells[j].spellType.indexOf(argumentType) !== -1) {

                finalCheckedList.push(jsonSpells.spells[j].id);
            }



        }
    } else {
        var listMod = new Array();
        for (i in jsonTomes.tomes) {
            affinity = jsonTomes.tomes[i].affinities;

            if (affinity != undefined) {
                if (affinity.toUpperCase().indexOf(argumentaffinity.toUpperCase()) !== -1) {
                    for (k in jsonTomes.tomes[i].skills) {
                        listMod.push(jsonTomes.tomes[i].skills[k].spell_slug);

                    }

                }
            } else {
                if (argumentaffinity == "General Research") {
                    if (jsonTomes.tomes[i].name.toUpperCase().indexOf("General Research".toUpperCase()) !== -1) {
                        for (k in jsonTomes.tomes[i].skills) {
                            listMod.push(jsonTomes.tomes[i].skills[k].spell_slug);

                        }

                    }
                }

                if (argumentaffinity == "Culture") {
                    if (jsonTomes.tomes[i].name.toUpperCase().indexOf("Mystic".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("Feudal".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("Barbarian".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("Dark".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("High".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("Industrious".toUpperCase()) !== -1) {
                        for (k in jsonTomes.tomes[i].skills) {
                            listMod.push(jsonTomes.tomes[i].skills[k].spell_slug);

                        }

                    }
                }
            }




        }


        for (j in jsonSpells.spells) {
            for (x in listMod) {
                if (listMod[x] == jsonSpells.spells[j].id) {
                    if (jsonSpells.spells[j].spellType.toUpperCase().indexOf(argumentType.toUpperCase()) !== -1) {

                        finalCheckedList.push(jsonSpells.spells[j].id);
                    }
                }
            }

        }
    }

    return finalCheckedList;
}

function findStructuresWithArgument(income, argumentType, includeprovince) {
    var i, output, affinity, textvalue, j, l, k, x, result = "";

    var finalCheckedList = new Array();
    if (argumentType != "") {
        for (j in jsonStructureUpgrades.structures) {

            if (jsonStructureUpgrades.structures[j].name.toUpperCase().indexOf(argumentType.toUpperCase()) !== -1) {
                if (includeprovince == jsonStructureUpgrades.structures[j].is_sector_upgrade) {
                    finalCheckedList.push(jsonStructureUpgrades.structures[j].id);
                }




            }
        }
    }
    if (income != "") {
        for (k in jsonStructureUpgrades.structures) {

            if (jsonStructureUpgrades.structures[k].id.toUpperCase().indexOf(income.toUpperCase()) !== -1) {
                if (includeprovince == jsonStructureUpgrades.structures[k].is_sector_upgrade) {

                    finalCheckedList.push(jsonStructureUpgrades.structures[k].id);
                }



            }



        }
    }




    return finalCheckedList;
}





function checkModRequirements(unit) {
    var j, check, checksplit, checknot, checknotsplit = "";
    for (j in jsonSpells.spells) {
        checksplit = jsonSpells.spells[j].check.split(" ");
        checknotsplit = jsonSpells.spells[j].checknot.split(" ");
        for (k in checksplit) {
            if (divs[i].innerHTML.indexOf(checksplit[k]) !== -1) {
                // something
            }
        }
    }
}






function showModsFromList(list, divId) {
    for (let i = 0; i < list.length; i++) {
        var iDiv = mod_card_template.content.cloneNode(true);
        if (divId === undefined) {
            document.getElementById("mods").appendChild(iDiv);
        } else {
            document.getElementById(divId).appendChild(iDiv);
        }
        showMod(list[i]);

    };
}

function showUnit(a, divID) {
    var hp, mp, shield, armor, descr, j, k, x, y, z, unitName, unitRole, icon, imagelink, prodcost, tier, research, building, reward, evolveTarget = "";
    var found = false;
    for (i in jsonUnits.units) {
        if (a == jsonUnits.units[i].id) {

            unitName = document.getElementById("unitstring");
            unitName.setAttribute("id", "unitstring" + a);

            unitName.innerHTML += jsonUnits.units[i].name.toUpperCase();


            imagelink = document.getElementById("vid");
            imagelink.setAttribute("id", "vid" + a);
            imagelink.setAttribute('src', "/aow4db/Previews/" + jsonUnits.units[i].id + ".mp4");
            if (imagelink.getAttribute('src') === "/aow4db/Previews/undefined") {
                imagelink.setAttribute('src', "/aow4db/Previews/placeholder.mp4");
            }

            hp = document.getElementById("hp")
            hp.setAttribute("id", "hp" + a);
            hp.innerHTML = jsonUnits.units[i].hp;
            armor = document.getElementById("armor");
            armor.setAttribute("id", "armor" + a);
            armor.innerHTML = jsonUnits.units[i].armor;
            shield = document.getElementById("resistence");
            shield.setAttribute("id", "shield" + a);
            shield.innerHTML = jsonUnits.units[i].resistance;
            mp = document.getElementById("mp");
            mp.setAttribute("id", "mp" + a);
            mp.innerHTML = jsonUnits.units[i].mp;
            tier = document.getElementById("tier");



            //


            var defenseDiv = document.getElementById("damageReduction");

            defenseDiv.innerHTML = "Physical :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].armor) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].armor + "</span> <defense> </defense>)";
            defenseDiv.setAttribute("id", "damageReduction" + a);







            tier.innerHTML = "Tier " + romanize(jsonUnits.units[i].tier) + ": " + jsonUnits.units[i].upkeep;


            prodcost = document.getElementById("productioncost");
            prodcost.setAttribute("id", "productioncost" + a);
            prodcost.innerHTML = "Cost: " + jsonUnits.units[i].cost;


            var additionalBlight, additionalShock, additionalFire, additionalSpirit, additionalFrost;

            var movementDiv = document.getElementById("movement");



            for (j in jsonUnits.units[i].secondary_passives) {
                addUnitTypeIcon(jsonUnits.units[i].secondary_passives[j].slug, a);

                if (jsonUnits.units[i].secondary_passives[j].slug.indexOf("floating") != -1) {
                    movementDiv.innerHTML = "Movement Abilities :  <span style=\"color:white;\"> <bullet>Floating</bullet></span><br>";
                }

                if (jsonUnits.units[i].secondary_passives[j].slug.indexOf("flying") != -1) {
                    movementDiv.innerHTML = "Movement Abilities :  <span style=\"color:white;\"> <bullet>Flying</bullet></span><br>";
                }



            }

            movementDiv.setAttribute("id", "movement" + a);

            for (k in jsonUnits.units[i].abilities) {
                addAbilityslot(jsonUnits.units[i].abilities[k].slug);

            }

            if (jsonUnits.units[i].status_resistance != "0") {
                addstatusResistanceSlot(jsonUnits.units[i].status_resistance);
            }

            for (z in jsonUnits.units[i].resistances) {
                addResistanceSlot(jsonUnits.units[i].resistances[z].slug, jsonUnits.units[i].resistance);



                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("BLIGHT") != -1) {
                    additionalBlight = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }
                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("FIRE") != -1) {
                    additionalFire = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }
                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("FROST") != -1) {
                    additionalFrost = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }

                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("LIGHTNING") != -1) {
                    additionalShock = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }
                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("SPIRIT") != -1) {
                    additionalSpirit = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }



            }



            for (x in jsonUnits.units[i].primary_passives) {
                addPassiveslot(jsonUnits.units[i].primary_passives[x].slug);
            }

            var y = "";


            var resistanceholder = document.getElementById("resistanceholder");
            resistanceholder.setAttribute("id", "resistanceholder" + a);




            var resistanceDiv = document.getElementById("resistanceReduction");
            resistanceDiv.innerHTML = "Blight :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalBlight) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalBlight != undefined) {
                if (additionalBlight > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalBlight + "<defenseblight></defenseblight>";
                if (additionalBlight == "immune") {
                    resistanceDiv.innerHTML = "Blight: Immune";
                }
            }

            resistanceDiv.innerHTML += ")<br>";

            resistanceDiv.innerHTML += "Shock :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalShock) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalShock != undefined) {
                if (additionalShock > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalShock + "<defenselightning></defenselightning>";
            }

            resistanceDiv.innerHTML += ")<br>";


            resistanceDiv.innerHTML += "Fire :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalFire) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalFire != undefined) {
                if (additionalFire > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalFire + "<defensefire></defensefire>";
            }

            resistanceDiv.innerHTML += ")<br>";

            resistanceDiv.innerHTML += "Spirit :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalSpirit) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalSpirit != undefined) {
                if (additionalSpirit > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalSpirit + "<defensespirit></defensespirit>";
            }

            resistanceDiv.innerHTML += ")<br>";

            resistanceDiv.innerHTML += "Frost :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalFrost) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalFrost != undefined) {
                if (additionalFrost > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalFrost + "<defensefrost></defensefrost>";
            }

            resistanceDiv.innerHTML += ")";


            resistanceDiv.setAttribute("id", "resistanceReduction" + a);


            document.getElementById("unitabholder").setAttribute("id", "unitabholder" + a);

            document.getElementById("unitstat").setAttribute("id", "unitstat" + a);


            document.getElementById("unit_role").setAttribute("id", "unit_role" + a);
            addLevelUpInfo(jsonUnits.units[i], a);

            // backtrack origin;
            backtrackUnitOrigins(a);
            tier.setAttribute("id", "tier" + a);
            document.getElementById("originHolder").setAttribute("id", "originHolder" + a);




            found = true;
            // break;
        }


    }
    if (found == false) {
        console.log("Couldn't find unit: " + a + i);
    }

}


function backtrackUnitOrigins(unitID) {
    var holder = document.getElementById("originHolder");
    var culture = (CheckIfInCulture(unitID));
    if (culture != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";
        spa.innerHTML = "Culture Unit from " + culture;
        imag.setAttribute("src", "/aow4db/Icons/Text/" + culture + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }
    var tomes = CheckIfInTomes(unitID);
    if (tomes != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";

        spa.innerHTML = "Unit Unlocked from Tier " + romanize(tomes.tier) + " - " + tomes.affinities + " " + tomes.name;
        imag.setAttribute("src", "/aow4db/Icons/TomeIcons/" + tomes.id + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }

    var spells = CheckIfInSpells(unitID);
    if (spells != "") {
        var btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        var imag = document.createElement("IMG");
        var spa = document.createElement("SPAN");
        spa.className = "tooltiptext";

        var tierandnameoftome = backtraceTomeNameAndTier(spells.id);
        if (tierandnameoftome != "") {
            spa.innerHTML = "Unit from Spell: " + spells.name + "<br>in Tier " + romanize(tierandnameoftome[1]) + " - " + tierandnameoftome[0];
        } else {
            spa.innerHTML = "Unit from Spell: " + spells.name;
        }

        // var tier = document.getElementById("tier");
        //if (spells.upkeep != "") {
        //    tier.innerHTML += spells.upkeep;
        //}


        imag.setAttribute("src", "/aow4db/Icons/SpellIcons/" + spells.id + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }
    var wonder = CheckIfInAncientWonder(unitID);
    if (wonder != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";


        spa.innerHTML = "Rally Unit Unlocked from " +
            wonder.type + " : " + wonder.name;
        imag.setAttribute("src", "/aow4db/Icons/StructurePics/" + wonder.id + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }

}




function CheckIfInCulture(unitID) {
    var culture = "";
    if (highCultureUnits.includes(unitID)) {
        culture = "high";
    }
    if (mysticCultureUnits.includes(unitID)) {
        culture = "mystic";
    }
    if (darkCultureUnits.includes(unitID)) {
        culture = "dark";
    }
    if (feudalCultureUnits.includes(unitID)) {
        culture = "feudal";
    }
    if (industriousCultureUnits.includes(unitID)) {
        culture = "industrious";
    }
    if (barbarianCultureUnits.includes(unitID)) {
        culture = "barbarian";
    }
    return culture;
}

function CheckIfInSpells(unitID) {
    var spell = "";
    for (i in jsonSpells.spells) {

        if ('summoned_units' in jsonSpells.spells[i]) {
            for (k in jsonSpells.spells[i].summoned_units) {
                if (unitID == jsonSpells.spells[i].summoned_units[k].slug) {
                    spell = jsonSpells.spells[i];
                }
            }

        }

    }


    return spell;
}

function CheckIfInTomes(unitID) {
    var tome = "";
    for (i in jsonTomes.tomes) {
        for (k in jsonTomes.tomes[i].skills) {
            if ('unit_slug' in jsonTomes.tomes[i].skills[k]) {
                if (unitID == jsonTomes.tomes[i].skills[k].unit_slug) {
                    tome = jsonTomes.tomes[i];
                }
            }


        }

    }
    return tome;
}

function CheckIfInAncientWonder(unitID) {
    var wonder = "";
    var i, k = "";
    for (i in jsonWorldStructures.structures) {

        if ('unit_unlocks' in jsonWorldStructures.structures[i]) {

            for (k in jsonWorldStructures.structures[i].unit_unlocks) {

                if (unitID == jsonWorldStructures.structures[i].unit_unlocks[k].slug) {
                    wonder = jsonWorldStructures.structures[i];
                }
            }


        }



    }
    return wonder;
}

function ReturnWeaknessOrResistanceNumber(slug) {

    if (slug.indexOf("weakness") !== -1) {
        var split = slug.split("weakness_");
        abilityDam = "-" + split[1];
    }
    if (slug.indexOf("resistance") !== -1) {
        var split = slug.split("resistance_");
        abilityDam = split[1];
    }
    if (slug.indexOf("immunity") !== -1) {
        abilityDam = "immune";
    }

    return abilityDam;

}

function GetDamageReductionPercentage(number, additionalNumber) {
    if (additionalNumber === undefined) {
        additionalNumber = 0;
    }
    var combinedDefense = parseInt(number) + parseInt(additionalNumber);

    if (combinedDefense >= 0) {
        var defensePercentage = 1 - Math.pow(0.9, combinedDefense);
    } else {

        var defensePercentage = -(1 - Math.pow(0.9, -combinedDefense));
    }

    var percentage = Math.round(defensePercentage * 100);
    if (percentage > 0) {
        percentage = "<span style=\"color:lawngreen\">" + percentage + "%</span>";
    }
    if (percentage < 0) {
        percentage = "<span style=\"color:red\">" + percentage + "%</span>";
    }

    if (additionalNumber == "x") {
        percentage = "Immune";
    }
    return percentage;
}

function addLevelUpInfo(units, a) {
    var levelup = document.getElementById("levelup");
    levelup.setAttribute("id", "levelup" + a);
    evolveTarget = units.evolve_target;

    if (units.tier == 1) {
        xpNeeded = 4;
    }
    if (units.tier == 2) {
        xpNeeded = 6;
    }
    if (units.tier == 3) {
        xpNeeded = 8;
    }
    if (units.tier == 4) {
        xpNeeded = 10;
    }
    if (units.tier == 5) {
        xpNeeded = 12;
    }

    var levelText = "";
    levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_soldier.png\" width='20'\"> Soldier - " + xpNeeded + "<xp></xp></p>";
    for (i in units.medal_rewards_2) {
        levelText += "<bullet>" + lookupSlug(units.medal_rewards_2[i].slug) + "</bullet>";

    }
    levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_veteran.png\" width='20'\"> Veteran - " + (xpNeeded * 2) + "<xp></xp></p>";
    for (i in units.medal_rewards_3) {
        levelText += "<bullet>" + lookupSlug(units.medal_rewards_3[i].slug) + "</bullet>";

    }
    levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_elite.png\" width='20'\"> Elite - " + (xpNeeded * 3) + "<xp></xp></p>";

    for (i in units.medal_rewards_4) {

        if (units.medal_rewards_4[i].slug.indexOf("medal") != -1) {
            levelText += "<p class=\"levelup_medal\">" + "<bullet>" + lookupSlug(units.medal_rewards_4[i].slug);
            levelText += "<span class=\"tooltiptext\" style=\"font-size=20px\">" + lookupSlugDescription(units.medal_rewards_4[i].slug) + "</span>  </p> </bullet> ";
        } else {
            levelText += "<bullet>" + lookupSlug(units.medal_rewards_4[i].slug) + "</bullet>";
        }

    }
    if (evolveTarget != undefined) {
        levelText += "<bullet> Evolves into <hyperlink> <a href=\"/aow4db/HTML/Units.html?unit=" + evolveTarget + "\" target=\"_blank\">" + lookupUnit(evolveTarget) + "</a></hyperlink></bullet>";
    }

    if (evolveTarget === undefined) {


        levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_champion.png\" width='20'\"> Champion - " + (xpNeeded * 4) + "<xp></xp></p>";

        for (i in units.medal_rewards_5) {
            levelText += "<bullet>" + lookupSlug(units.medal_rewards_5[i].slug) + "</bullet>";

        }

        levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_legend.png\" width='20'\"> Legend - " + (xpNeeded * 10) + "<xp></xp></p>";
        for (i in units.medal_rewards_6) {
            if (units.medal_rewards_6[i].slug.indexOf("medal") != -1) {
                levelText += "<p class=\"levelup_medal\">" + "<bullet>" + lookupSlug(units.medal_rewards_6[i].slug);
                levelText += "<span class=\"tooltiptext\" style=\"font-size=20px\">" + lookupSlugDescription(units.medal_rewards_6[i].slug) + "</span>  </p> </bullet> ";
            } else {
                levelText += "<bullet>" + lookupSlug(units.medal_rewards_6[i].slug) + "</bullet>";
            }


        }
    }

    levelup.innerHTML = levelText;


}

function lookupUnit(id) {
    for (j in jsonUnits.units) {
        if (id == jsonUnits.units[j].id) {
            return jsonUnits.units[j].name;
        }

    }
    return "Couldn't find this";
}

function lookupSlugDescription(slug) {
    for (j in jsonUnitAbilities.abilities) {
        if (slug == jsonUnitAbilities.abilities[j].slug) {
            return jsonUnitAbilities.abilities[j].description;
        }

    }
    return "Couldn't find this";
}

function lookupSlug(slug) {
    for (j in jsonUnitAbilities.abilities) {
        if (slug == jsonUnitAbilities.abilities[j].slug) {
            return jsonUnitAbilities.abilities[j].name;
        }

    }
    return "Couldn't find this";
}

function romanize(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
               "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
               "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize(str) {
    var str = str.toUpperCase();
    var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    var token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    var key = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var num = 0,
        m;
    if (!(str && validator.test(str))) return false;
    while (m = token.exec(str)) num += key[m[0]];
    return num;
}


function showSiegeProject(id) {

    var modName, description, cost, type, tier, i = "";
    var found = false;

    for (i in jsonSiegeProjects.projects) {
        if (id == jsonSiegeProjects.projects[i].name) {


            modName = document.getElementById("modname");
            modName.innerHTML = jsonSiegeProjects.projects[i].name.toUpperCase();
            modName.setAttribute("id", "modname" + jsonSiegeProjects.projects[i].name);
            descriptionDiv = document.getElementById("moddescription");
            description = jsonSiegeProjects.projects[i].description;

            description += "<br>Fortification Damage:<br> +" + jsonSiegeProjects.projects[i].siege_health_damage + " <siegehealthdamage></siegehealthdamage> Fortification Damage";

            imagelink = document.getElementById("modicon");


            unitTypesDiv = document.getElementById("affectUnitTypes");
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + jsonSiegeProjects.projects[i].name);


            imagelink.setAttribute("src", "/aow4db/Icons/SiegeIcons/" + jsonSiegeProjects.projects[i].id + ".png");
            imagelink.setAttribute("id", "modicon" + jsonSiegeProjects.projects[i].name);
            descriptionDiv.innerHTML = description;
            descriptionDiv.setAttribute("id", "modicon" + jsonSiegeProjects.projects[i].name);

            tier = document.getElementById("modtier");

            tier.innerHTML = "<garrison></garrison> Siege Project";

            tier.setAttribute("id", "modtier" + jsonSiegeProjects.projects[i].name);

            cost = document.getElementById("modcost");
            cost.innerHTML = "Cost:<br>" + jsonSiegeProjects.projects[i].cost;
            cost.setAttribute("id", "modcost" + jsonSiegeProjects.projects[i].name);


            found = true;


        }
    }
}


function showTome(a, div) {
    var modName, description, cost, type, tier, k, j, l, descriptionDiv = "";
    var found = false;
    for (j in jsonTomes.tomes) {
        if (a == jsonTomes.tomes[j].id) {

            modName = document.getElementById("tomename");
            modName.innerHTML = "";




            modName.innerHTML += jsonTomes.tomes[j].name;
            modName.setAttribute("id", "tomename" + a);
            descriptionDiv = document.getElementById("tomedescription");
            description = jsonTomes.tomes[j].gameplay_description;
            if ('affinities' in jsonTomes.tomes[j]) {
                var affinities = jsonTomes.tomes[j].affinities.split(" ");

                descriptionDiv.innerHTML = "Tier " + romanize(jsonTomes.tomes[j].tier) + " " + affinities[0] + " " + "<br>" + description;
            } else {
                descriptionDiv.innerHTML = description;
            }



            descriptionDiv.setAttribute("id", "tomedescription" + a);
            loreDescription = jsonTomes.tomes[j].lore_description;
            loreDescription = loreDescription.replace(String.fromCharCode(92), "");
            loreDescription = loreDescription.replace(String.fromCharCode(92), "");

            loreDescription += "<br> -" + jsonTomes.tomes[j].lore_author;
            descriptionLoreDiv = document.getElementById("tomeloredescription");
            descriptionLoreDiv.innerHTML = loreDescription;

            unitTypesDiv = document.getElementById("initialBonusList");

            var div = document.createElement("DIV");

            if ('affinities' in jsonTomes.tomes[j]) {
                div.innerHTML = "+" +
                    affinities[1] + affinities[0] + " Affinity"
                unitTypesDiv.appendChild(div);
            }

            if ('passives' in jsonTomes.tomes[j]) {
                for (l in jsonTomes.tomes[j].passives) {
                    var div = document.createElement("DIV");
                    div.className = "initialBonusText";
                    if ('structure_slug' in jsonTomes.tomes[j].passives[l]) {
                        var name = GetStructureName(jsonTomes.tomes[j].passives[l].structure_slug);
                        div.innerHTML = name;

                        var spa = document.createElement("SPAN");
                        spa.className = "tooltiptext";
                        spa.innerHTML = "<span style=\"color: #deb887 ;text-transform: uppercase\">" + name + "</span>" + GetStructureDescription(jsonTomes.tomes[j].passives[l].structure_slug);

                        div.appendChild(spa);
                    } else if ('hero_skill_slug' in jsonTomes.tomes[j].passives[l]) {
                        var name = GetHeroSkillName(jsonTomes.tomes[j].passives[l].hero_skill_slug);
                        div.innerHTML = "<hero></hero>" + name;






                        var heroSkillIconAndDesc = GetHeroSkillDescription(jsonTomes.tomes[j].passives[l].hero_skill_slug);

                        // its a ability
                        if (heroSkillIconAndDesc[0] != "") {

                            var spa2 = GetAbilityInfo(heroSkillIconAndDesc[0]);


                            spa2.className = "tooltiptext";
                        } else {
                            // its a passive
                            var spa2 = CreatePassiveSlotToolTip(heroSkillIconAndDesc[1].icon, heroSkillIconAndDesc[1].name, heroSkillIconAndDesc[1].description);
                            spa2.className = "tooltiptext";
                        }

                        var title = document.createElement("SPAN");
                        title.innerHTML = heroSkillIconAndDesc[1].name.toUpperCase();
                        title.setAttribute("style", "color:#deb887 ");


                        title.innerHTML += "<br>" + heroSkillIconAndDesc[1].category_name + " - " + heroSkillIconAndDesc[1].level_name + "<br><br>";

                        spa2.prepend(title);


                        div.appendChild(spa2);
                    } else {
                        div.innerHTML = jsonTomes.tomes[j].passives[l].name;

                        var spa = document.createElement("SPAN");
                        spa.className = "tooltiptext";
                        spa.innerHTML = jsonTomes.tomes[j].passives[l].type + "<br>";
                        spa.innerHTML += jsonTomes.tomes[j].passives[l].description;
                        div.appendChild(spa);
                    }
                    unitTypesDiv.appendChild(div);



                }

            }
            // casting points
            var div = document.createElement("DIV");
            div.className = "initialBonusText";
            if (jsonTomes.tomes[j].tier == "1" || jsonTomes.tomes[j].tier == "2") {
                var amount = 5;
            }
            if (jsonTomes.tomes[j].tier == "3" || jsonTomes.tomes[j].tier == "4") {
                var amount = 10;
            }
            if (jsonTomes.tomes[j].tier == "5") {
                var amount = 15;
            }

            if (amount != undefined) {
                div.innerHTML = "+" + amount + "<casttactical></casttactical>" + "+" + amount + "<caststrategic></caststrategic>";
            }

            unitTypesDiv.appendChild(div);

            unitTypesDiv.setAttribute("id", "initialBonusList" + a);



            descriptionLoreDiv.setAttribute("id", "tomeloredescription" + a);
            skillHolder = document.getElementById("tome_unlocks");

            for (k in jsonTomes.tomes[j].skills) {
                if ('spell_slug' in jsonTomes.tomes[j].skills[k]) {
                    var iDiv = spell_card_template.content.cloneNode(true);
                    skillHolder.appendChild(iDiv);
                    showSpell(jsonTomes.tomes[j].skills[k].spell_slug, false);
                }
                if ('unit_slug' in jsonTomes.tomes[j].skills[k]) {
                    var iDiv = spell_card_template.content.cloneNode(true);
                    skillHolder.appendChild(iDiv);
                    showUnitUnlock(jsonTomes.tomes[j].skills[k]);
                }

                if ('upgrade_slug' in jsonTomes.tomes[j].skills[k]) {
                    var iDiv = spell_card_template.content.cloneNode(true);
                    skillHolder.appendChild(iDiv);
                    showStructure(jsonTomes.tomes[j].skills[k].upgrade_slug, false);
                }
                if (jsonTomes.tomes[j].skills[k].type.indexOf("Siege") != -1) {
                    var iDiv = spell_card_template.content.cloneNode(true);
                    skillHolder.appendChild(iDiv);
                    showSiegeProject(jsonTomes.tomes[j].skills[k].name, false);
                }

            }
            skillHolder.setAttribute("id", "tome_unlocks" + a);



            imagelink = document.getElementById("tomeicon");
            imagelink.setAttribute("src", "/aow4db/Icons/TomeIcons/" + a + ".png");
            imagelink.setAttribute("id", "tomeicon" + a);

            // backtraceTomeOriginAndTier(jsonSpells.spells[j].id);


            found = true;
        }
    }
    if (found == false) {
        console.log("Couldn't find tome: " + a);
    }
}

function GetAbilityInfo(ability) {
    if ('accuracy' in ability) {
        var abilityName = ability.name.toUpperCase();
        if (ability.requisites === undefined) {
            var abilityReq = "";
        } else {
            var abilityReq = "";
            for (k in ability.requisites) {
                if (k == 0) {
                    abilityReq = "(";
                }
                abilityReq += ability.requisites[k].requisite;
                if (k != ability.requisites.length - 1) {
                    abilityReq += ",";
                } else {
                    abilityReq += ")";
                }
            }

        }

        if (ability.modifiers === undefined) {
            var abilityMod = "";
        } else {


            for (l in ability.modifiers) {
                abilityName += "&#11049";
                abilityMod += "<bullet>" + ability.modifiers[l].name + "<br>";
                abilityMod += ability.modifiers[l].description + "</bullet><br>";
            }

        }

        // add notes


        var abilityNote = "";
        for (l in ability.notes) {
            if (ability.notes[l] === undefined) {

            } else {
                abilityNote += "<bullet>" + ability.notes[l].note + "</bullet>";

            }

        }





        abilityRange = ability.range + "<range></range>";
        abilityAcc = ability.accuracy + "<accuracy></accuracy>";

        var abilityIconType = GetAbilityBackground(ability.damage);
        var spa = GetAbilityToolTip(ability, abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq);
    } else {
        var spa = CreatePassiveSlotToolTip(ability.icon, ability.name, ability.description);
    }
    return spa;
}



function GetStructureName(structureID) {
    for (j in jsonStructureUpgrades.structures) {
        if (jsonStructureUpgrades.structures[j].id.indexOf(structureID) != -1) {
            return jsonStructureUpgrades.structures[j].name;
        }
    }
}

function GetHeroSkillName(skillID) {
    for (j in jsonHeroSkills.skills) {
        if (jsonHeroSkills.skills[j].id.indexOf(skillID) != -1) {
            return jsonHeroSkills.skills[j].name;
        }
    }
}

function GetHeroSkillDescription(skillID) {
    var array = ["", ""];
    for (j in jsonHeroSkills.skills) {
        if (jsonHeroSkills.skills[j].id.indexOf(skillID) != -1) {
            if ('abilities' in jsonHeroSkills.skills[j]) {
                for (k in jsonUnitAbilities.abilities) {
                    if (jsonUnitAbilities.abilities[k].slug.indexOf(jsonHeroSkills.skills[j].abilities[0].slug) != -1) {
                        array[0] = jsonUnitAbilities.abilities[k];


                    }
                }
            }
            array[1] = jsonHeroSkills.skills[j];

            return array;

        }

    }
}



function GetStructureDescription(structureID) {
    for (j in jsonStructureUpgrades.structures) {
        if (jsonStructureUpgrades.structures[j].id.indexOf(structureID) != -1) {
            return jsonStructureUpgrades.structures[j].description;
        }
    }
}

function showStructure(a) {
    var modName, description, cost, type, tier, j, nameString = "";
    var found = false;
    for (j in jsonStructureUpgrades.structures) {
        if (a == jsonStructureUpgrades.structures[j].id) {

            modName = document.getElementById("modname");
            nameString = "";
            nameString = jsonStructureUpgrades.structures[j].name.toUpperCase();

            if (nameString.indexOf("<br>")) {
                nameString = nameString.replace("<br>", "");
                nameString = nameString.replace("<br>", "");
            }



            modName.innerHTML = nameString;
            // backtracktome
            var tomeNameandTier = backtraceStructureToTomeNameAndTier(a);

            modName.setAttribute("id", "modname" + a);
            modName.className = "mod_name";
            descriptionDiv = document.getElementById("moddescription");
            description = "";

            if (jsonStructureUpgrades.structures[j].requirement_description != "") {
                description = jsonStructureUpgrades.structures[j].requirement_description + "<br>";
            }
            description += jsonStructureUpgrades.structures[j].description;


            if (jsonStructureUpgrades.structures[j].prediction_description != "") {
                description += "<br>" + jsonStructureUpgrades.structures[j].prediction_description;
            }


            imagelink = document.getElementById("modicon");

            if (a.startsWith("_")) {
                a = a.replace("_", "");
            }

            imagelink.setAttribute("src", "/aow4db/Icons/UpgradeIcons/" + a + ".png");
            imagelink.setAttribute("id", "modicon" + a);
            descriptionDiv.innerHTML = description;
            descriptionDiv.setAttribute("id", "modicon" + a);

            unitTypesDiv = document.getElementById("affectUnitTypes");
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);

            tier = document.getElementById("modtier");
            if (jsonStructureUpgrades.structures[j].is_sector_upgrade) {
                if (tomeNameandTier != "") {
                    tier.innerHTML = "<br> Tier " + romanize(tomeNameandTier[1]) + " - " + tomeNameandTier[0] + "<br>";
                }
                tier.innerHTML += "Province Improvement";

            } else {
                tier.innerHTML = "Building";
            }
            tier.setAttribute("id", "modtier" + a);

            cost = document.getElementById("modcost");
            cost.className = "spell_cost";
            cost.innerHTML = "Build Cost:<br>" + jsonStructureUpgrades.structures[j].cost;
            cost.setAttribute("id", "modcost" + a);


            found = true;
        }
    }
    if (found == false) {
        console.log("Couldn't find mod: " + a);
    }
}

function showWorldStructure(a) {
    var modName, description, cost, type, tier, j, nameString = "";
    var found = false;
    for (j in jsonWorldStructures.structures) {
        if (a == jsonWorldStructures.structures[j].id) {

            modName = document.getElementById("modname");
            nameString = "";
            nameString = jsonWorldStructures.structures[j].name.toUpperCase();

            if (nameString.indexOf("<br>")) {
                nameString = nameString.replace("<br>", "");
                nameString = nameString.replace("<br>", "");
            }
            modName.innerHTML = nameString;
            modName.setAttribute("id", "modname" + a);
            modName.className = "mod_name";
            descriptionDiv = document.getElementById("moddescription");
            description = "";

            if (jsonWorldStructures.structures[j].type.indexOf("wonder") != -1) {
                description = jsonWorldStructures.structures[j].type + "<br>";
            } else {

            }


            description += jsonWorldStructures.structures[j].description;


            if (jsonWorldStructures.structures[j].prediction_description != "") {
                description += "<br>" + jsonStructureUpgrades.structures[j].prediction_description;
            }



            imagelink = document.getElementById("modicon");





            if (jsonWorldStructures.structures[j].type.indexOf("wonder") != -1) {
                imagelink.remove();

            } else {
                imagelink.setAttribute("src", "/aow4db/Icons/WorldStructures/" + a + ".png");
                imagelink.setAttribute("id", "modicon" + a);
                imagelink.setAttribute("style", "background-image: none");

            }

            unitTypesDiv = document.getElementById("affectUnitTypes");


            if ('unit_unlocks' in jsonWorldStructures.structures[j]) {
                description += "<br>Summoned Units:<br>";
                for (x in jsonWorldStructures.structures[j].unit_unlocks) {
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + jsonWorldStructures.structures[j].unit_unlocks[x].slug + "\" target=\"_blank\">" + GetTierAndName(jsonWorldStructures.structures[j].unit_unlocks[x].slug) + "</a>" + "</bullet>";
                    unitTypesDiv.appendChild(div);
                }
            }
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);

            descriptionDiv.innerHTML = description;
            descriptionDiv.setAttribute("id", "modicon" + a);



            preview = document.getElementById("structurepreview");
            preview.setAttribute("src", "/aow4db/Icons/StructurePics/" + a + ".png");
            preview.setAttribute("id", "structurepreview" + a);




            found = true;
        }
    }
    if (found == false) {
        console.log("Couldn't find structure world: " + a);
    }
}


function GetCostUnit(id) {
    for (i in jsonUnits.units) {
        if (id == jsonUnits.units[i].id) {
            return jsonUnits.units[i].cost;
        }
    }

}

function showUnitUnlock(a) {
    var modName, description, cost, type, tier, j = "";
    var found = false;



    modName = document.getElementById("modname");
    modName.innerHTML = a.name.toUpperCase();
    modName.setAttribute("id", "modname" + a);
    descriptionDiv = document.getElementById("moddescription");

    description = a.description;



    imagelink = document.getElementById("modicon");

    unitTypesDiv = document.getElementById("affectUnitTypes");
    var div = document.createElement("DIV");
    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + a.unit_slug + "\" target=\"_blank\">" + GetTierAndName(a.unit_slug) + "</a>" + "</bullet>";
    unitTypesDiv.appendChild(div);

    unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);


    imagelink.setAttribute("src", "/aow4db/Icons/SpellIcons/" + a.unit_slug + ".png");
    imagelink.setAttribute("id", "modicon" + a);
    descriptionDiv.innerHTML = description;
    descriptionDiv.setAttribute("id", "modicon" + a);

    tier = document.getElementById("modtier");

    tier.innerHTML = "Unit Unlock";

    tier.setAttribute("id", "modtier" + a);

    cost = document.getElementById("modcost");
    cost.innerHTML = "Recruit Cost:<br>" + GetCostUnit(a.unit_slug);

    cost.setAttribute("id", "modcost" + a);


    found = true;


}



function showSpell(a, showOrigin) {
    var modName, description, cost, type, tier = "";
    var found = false;
    for (j in jsonSpells.spells) {
        if (a == jsonSpells.spells[j].id) {

            modName = document.getElementById("modname");
            modName.innerHTML = jsonSpells.spells[j].name.toUpperCase();
            modName.setAttribute("id", "modname" + a);
            descriptionDiv = document.getElementById("moddescription");
            description = jsonSpells.spells[j].description;

            unitTypesDiv = document.getElementById("affectUnitTypes");
            if (jsonSpells.spells[j].enchantment_requisites != undefined) {
                description += "<br>Affected Unit Types: <br>";
            }
            for (l in jsonSpells.spells[j].enchantment_requisites) {
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + jsonSpells.spells[j].enchantment_requisites[l].requisite + "</bullet>"
                unitTypesDiv.appendChild(div);
            }

            if ('summoned_units' in jsonSpells.spells[j]) {
                description += "<br>Summoned Units:<br>";
                for (x in jsonSpells.spells[j].summoned_units) {
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + jsonSpells.spells[j].summoned_units[x].slug + "\" target=\"_blank\">" + GetTierAndName(jsonSpells.spells[j].summoned_units[x].slug) + "</a>" + "</bullet>";
                    unitTypesDiv.appendChild(div);
                }
            }

            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);
            descriptionDiv.innerHTML = description;

            descriptionDiv.setAttribute("id", "moddescription" + a);
            //type = document.getElementById("modtype");
            //type.innerHTML = "Mod Type: " + jsonSpells.spells[j].type;
            //type.setAttribute("id", "modtype" + a);
            tier = document.getElementById("modtier");
            tier.innerHTML = jsonSpells.spells[j].spellType;
            tier.setAttribute("id", "modtier" + a);

            cost = document.getElementById("modcost");
            cost.innerHTML = "Casting Cost:<br>" + jsonSpells.spells[j].casting_cost;

            if (jsonSpells.spells[j].tactical === true) {
                cost.innerHTML += " " + jsonSpells.spells[j].operation_point_cost + "<casttactical></casttactical>"
            } else {
                cost.innerHTML += " " + jsonSpells.spells[j].operation_point_cost + "<caststrategic></caststrategic>"
            }
            cost.setAttribute("id", "modcost" + a);

            imagelink = document.getElementById("modicon");



            imagelink.setAttribute("src", "/aow4db/Icons/SpellIcons/" + a + ".png");
            imagelink.setAttribute("id", "modicon" + a);
            tier.innerHTML += " Tier " + romanize(backtraceTomeOriginAndTier(jsonSpells.spells[j].id, showOrigin));
            if (showOrigin === true) {

                var tomeOrigin = document.getElementById("originTome");
                tomeOrigin.setAttribute("id", "originTome" + jsonSpells.spells[j].id);
                var tomeOriginIcon = document.getElementById("originTomeIcon");
                tomeOriginIcon.setAttribute("id", "originTomeIcon" + jsonSpells.spells[j].id);

            }



            found = true;
        }
    }
    if (found == false) {
        console.log("Couldn't find mod: " + a);
    }
}


function showSkill(a, checkInAbilities, icon_slug, category, level, group_name) {
    var modName, description, cost, type, tier = "";
    var found = false;

    if (checkInAbilities != "") {
        for (j in jsonUnitAbilities.abilities) {
            if (jsonUnitAbilities.abilities[j].slug.indexOf(a.abilities[0].slug) != -1) {
                var abilityName = jsonUnitAbilities.abilities[j].name;
                modName = document.getElementById("modname");
                modName.innerHTML = a.name.toUpperCase();
                if (category != undefined) {
                    modName.innerHTML += "<br>" + category + " - " + level;
                    modName.innerHTML += "<br>" + group_name;
                }

                modName.setAttribute("id", "modname" + a.id);
                descriptionDiv = document.getElementById("moddescription");

                //   description = jsonUnitAbilities.abilities[j].description;

                if ('accuracy' in jsonUnitAbilities.abilities[j]) {
                    if (jsonUnitAbilities.abilities[j].requisites === undefined) {
                        var abilityReq = "";
                    } else {
                        var abilityReq = "";
                        for (k in jsonUnitAbilities.abilities[j].requisites) {
                            if (k == 0) {
                                abilityReq = "(";
                            }
                            abilityReq += jsonUnitAbilities.abilities[j].requisites[k].requisite;
                            if (k != jsonUnitAbilities.abilities[j].requisites.length - 1) {
                                abilityReq += ",";
                            } else {
                                abilityReq += ")";
                            }
                        }

                    }

                    if (jsonUnitAbilities.abilities[j].modifiers === undefined) {
                        var abilityMod = "";
                    } else {


                        for (l in jsonUnitAbilities.abilities[j].modifiers) {
                            abilityName += "&#11049";
                            abilityMod += "<bullet>" + jsonUnitAbilities.abilities[j].modifiers[l].name + "<br>";
                            abilityMod += jsonUnitAbilities.abilities[j].modifiers[l].description + "</bullet><br>";
                        }

                    }

                    // add notes


                    var abilityNote = "";
                    for (l in jsonUnitAbilities.abilities[j].notes) {
                        if (jsonUnitAbilities.abilities[j].notes[l] === undefined) {

                        } else {
                            abilityNote += "<bullet>" + jsonUnitAbilities.abilities[j].notes[l].note + "</bullet>";

                        }

                    }





                    abilityRange = jsonUnitAbilities.abilities[j].range + "<range></range>";
                    abilityAcc = jsonUnitAbilities.abilities[j].accuracy + "<accuracy></accuracy>";

                    var abilityIconType = GetAbilityBackground(jsonUnitAbilities.abilities[j].damage);
                    var spa = GetAbilityToolTip(jsonUnitAbilities.abilities[j], abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq);
                } else {
                    var spa = CreatePassiveSlotToolTip(jsonUnitAbilities.abilities[j].icon, jsonUnitAbilities.abilities[j].name, jsonUnitAbilities.abilities[j].description);
                }






                spa.className = "itemAbility";
                unitTypesDiv = document.getElementById("affectUnitTypes");



                unitTypesDiv.setAttribute("id", "affectUnitTypes" + a.id);
                descriptionDiv.innerHTML = "";
                descriptionDiv.append(spa);

                descriptionDiv.setAttribute("id", "moddescription" + a.id);
                //type = document.getElementById("modtype");
                //type.innerHTML = "Mod Type: " + jsonSpells.spells[j].type;
                //type.setAttribute("id", "modtype" + a);
                tier = document.getElementById("modtier");
                tier.innerHTML = "";
                tier.setAttribute("id", "modtier" + a.id);

                cost = document.getElementById("modcost");
                cost.innerHTML = "";


                cost.setAttribute("id", "modcost" + a.id);


                imagelink = document.getElementById("modicon");
                if (a.type == "signature") {
                    imagelink.className = "smallerIcon";
                    imagelink.setAttribute("src", "/aow4db/Icons/Abilities/" + icon_slug + ".png");
                    imagelink.setAttribute("id", "modicon" + a.id);
                    spa.setAttribute("style", "width: 310px");

                } else {

                    imagelink.remove();
                }




                found = true;
                break;
            }
        }
    } else {
        for (j in jsonHeroSkills.skills) {
            if (jsonHeroSkills.skills[j].id == a.id) {

                modName = document.getElementById("modname");

                modName.innerHTML = jsonHeroSkills.skills[j].name.toUpperCase();
                if (category != undefined) {
                    modName.innerHTML += "<br>" + category + " - " + level;
                }

                modName.setAttribute("id", "modname" + a.id);
                descriptionDiv = document.getElementById("moddescription");

                description = jsonHeroSkills.skills[j].description;

                unitTypesDiv = document.getElementById("affectUnitTypes");



                unitTypesDiv.setAttribute("id", "affectUnitTypes" + a.id);

                var spa = CreatePassiveSlotToolTip(jsonHeroSkills.skills[j].icon, jsonHeroSkills.skills[j].name, jsonHeroSkills.skills[j].description);
                spa.className = "itemAbility";
                descriptionDiv.innerHTML = "";

                descriptionDiv.append(spa);

                descriptionDiv.setAttribute("id", "moddescription" + a.id);
                //type = document.getElementById("modtype");
                //type.innerHTML = "Mod Type: " + jsonSpells.spells[j].type;
                //type.setAttribute("id", "modtype" + a);
                tier = document.getElementById("modtier");
                tier.innerHTML = "";
                tier.setAttribute("id", "modtier" + a.id);

                cost = document.getElementById("modcost");
                cost.innerHTML = "";


                cost.setAttribute("id", "modcost" + a.id);

                imagelink = document.getElementById("modicon");


                imagelink.remove();





                found = true;
                break;
            }
        }
    }

    if (found == false) {
        console.log("Couldn't find skill: " + a.id);
    }
}

function backtraceTomeOriginAndTier(spell, showorigin) {
    for (j in jsonTomes.tomes) {
        {
            for (k in jsonTomes.tomes[j].skills) {
                if (jsonTomes.tomes[j].skills[k].spell_slug == spell) {
                    if (showorigin) {
                        var tomeOrigin = document.getElementById("originTome");
                        if ('affinities' in jsonTomes.tomes[j]) {
                            tomeOrigin.innerHTML = jsonTomes.tomes[j].affinities + "<br>";
                        }
                        tomeOrigin.innerHTML += jsonTomes.tomes[j].name;
                        var tomeOriginIcon = document.getElementById("originTomeIcon");
                        tomeOriginIcon.setAttribute("src", "/aow4db/Icons/TomeIcons/" + jsonTomes.tomes[j].id + ".png");
                    }

                    return jsonTomes.tomes[j].skills[k].tier;
                }
            }
        }
    }
}



function backtraceStructureToTomeNameAndTier(structure) {
    var array = new Array();
    console.log(structure);
    for (j in jsonTomes.tomes) {
        {
            for (k in jsonTomes.tomes[j].passives) {
                if ('structure_slug' in jsonTomes.tomes[j].passives[k]) {
                    if (structure.indexOf(jsonTomes.tomes[j].passives[k].structure_slug) != -1) {

                        array.push(jsonTomes.tomes[j].affinities + " " + jsonTomes.tomes[j].name);
                        if (jsonTomes.tomes[j].tier != "") {
                            array.push(jsonTomes.tomes[j].tier);
                        } else {
                            array.push("");
                        }

                        return array;

                    }
                }

            }
        }
    }
    return "";
}

function backtraceTomeNameAndTier(spell) {
    var array = new Array();
    for (j in jsonTomes.tomes) {
        {
            for (k in jsonTomes.tomes[j].skills) {
                if (jsonTomes.tomes[j].skills[k].spell_slug == spell) {

                    array.push(jsonTomes.tomes[j].affinities + " " + jsonTomes.tomes[j].name);
                    array.push(jsonTomes.tomes[j].tier);
                    return array;

                }
            }
        }
    }
    return "";
}



function addAbilityList(a) {
    var dam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {
            if (jsonUnitAbilities.abilities[j].damage) {
                dam = jsonUnitAbilities.abilities[j].damage;
            }
            return jsonUnitAbilities.abilities[j].name + dam + "<br>"
        }
    }
}

function addTypesList(a) {
    var dam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a == jsonUnitAbilities.abilities[j].slug) {

            return jsonUnitAbilities.abilities[j].name + "<br>"
        }
    }
}
