var market_left_arrow = 10;
var market_right_arrow = 10;
var market_plus = 10;
var market_moins = 10;
var market_point = 10;
var market_comma = 10;
var market_left_bracket = 10;
var market_right_bracket = 10;

var p_left_arrow = 10;
var p_right_arrow = 10;
var p_plus = 10;
var p_moins = 10;
var p_point = 10;
var p_comma = 10;
var p_left_bracket = 10;
var p_right_bracket = 10;

var p_currency = 1000;

var poss_r_arrow = 25;
var poss_l_arrow = 25;
var poss_plus = 150;
var poss_moins = 50;
var poss_point = 250;
var poss_comma = 25;
var poss_lbracket = 25;
var poss_rbracket = 25;

function bf_interpreter() {

    var code = document.getElementById('ide').value;
    var tableau = Array(30000).fill(0);
    var data_pointeur = 0;
    var instr_pointeur = 0;
    var output = [];

    while (instr_pointeur < code.length - 1) {
        var current_instr = code[instr_pointeur];
        if (current_instr == ">") {
            data_pointeur += 1;

        } else if (current_instr == "<") {
            data_pointeur -= 1;

        } else if (current_instr == "+") {
            tableau[data_pointeur] += 1;

        } else if (current_instr == "-") {
            tableau[data_pointeur] -= 1;

        } else if (current_instr == ".") {
            var temp = String.fromCharCode(tableau[data_pointeur]);
            output.push(temp);

        } else if (current_instr == ",") {
            var input = window.prompt("Enter one byte of data: ");
            tableau[data_pointeur] = input[0];

        } else if (current_instr == "[") {
            // var test = window.prompt("test [");

            if (tableau[data_pointeur] == 0) {
                var temp_stack = ["["];
                var current_instrc = instr_pointeur;
                while (temp_stack.length > 0) {

                    current_instrc += 1;
                    if (code[current_instrc] == "[") {
                        temp_stack.push(current_instrc);

                    } else if (code[current_instrc] == "]") {
                        temp_stack.pop();
                    }
                }
                instr_pointeur = current_instrc;


            }
        } else if (current_instr == "]") {
            // var test = window.prompt("test ]");
            if (tableau[data_pointeur] != 0) {
                var temp_stack = ["]"];
                var current_instrc = instr_pointeur;
                while (temp_stack.length > 0) {

                    current_instrc -= 1;
                    if (code[current_instrc] == "]") {
                        temp_stack.push(current_instrc);
                    } else if (code[current_instrc] == "[") {
                        temp_stack.pop();
                    }
                }
                instr_pointeur = current_instrc;
            }
        }
        instr_pointeur += 1;

    }
    document.getElementById('terminal').innerHTML = output.join('');
    return 0;
}


function updateTTType() {

    updateMarket();
    updatePortefeuille();

}

function updateMarket() {
    market_left_arrow = newValue(market_left_arrow);
    market_right_arrow = newValue(market_right_arrow);
    market_plus = newValue(market_plus);
    market_moins = newValue(market_moins);
    market_point = newValue(market_point);
    market_comma = newValue(market_comma);
    market_left_bracket = newValue(market_left_bracket);
    market_right_bracket = newValue(market_right_bracket);


    document.getElementById("m_left_arrow").innerHTML = market_left_arrow;
    document.getElementById("m_right_arrow").innerHTML = market_right_arrow;
    document.getElementById("m_+").innerHTML = market_plus;
    document.getElementById("m_-").innerHTML = market_moins;
    document.getElementById("m_.").innerHTML = market_point;
    document.getElementById("m_,").innerHTML = market_comma;
    document.getElementById("m_[").innerHTML = market_left_bracket;
    document.getElementById("m_]").innerHTML = market_right_bracket;

}

function updatePortefeuille() {
    var code = document.getElementById('ide').value;
    p_left_arrow = (code.match(/</g) || []).length;
    p_right_arrow = (code.match(/>/g) || []).length;
    p_plus = (code.match(/\+/g) || []).length;
    p_moins = (code.match(/-/g) || []).length;
    p_point = (code.match(/./g) || []).length;
    p_comma = (code.match(/,/g) || []).length;
    p_left_bracket = (code.match(/\[/g) || []).length;
    p_right_bracket = (code.match(/\]/g) || []).length;

    document.getElementById("p_right_arrow").innerHTML = p_right_arrow;
    document.getElementById("p_left_arrow").innerHTML = p_left_arrow;
    document.getElementById("p_+").innerHTML = p_plus;
    document.getElementById("p_-").innerHTML = p_moins;
    document.getElementById("p_.").innerHTML = p_point;
    document.getElementById("p_,").innerHTML = p_comma;
    document.getElementById("p_[").innerHTML = p_left_bracket;
    document.getElementById("p_]").innerHTML = p_right_bracket;
}

function decideExecution() {

    if ((poss_l_arrow - p_left_arrow) < 0 ||
        (poss_r_arrow - p_right_arrow) < 0 ||
        (poss_plus - p_plus) < 0 ||
        (poss_moins - p_moins) < 0 ||
        (poss_point - p_point) < 0 ||
        (poss_comma - p_comma) < 0 ||
        (poss_lbracket - p_left_bracket) < 0 ||
        (poss_rbracket - p_right_bracket) < 0

    ) {
        document.getElementById("terminal").innerHTML = "ERROR: Cannot execute this code, symbols are missing from the portfolio.";
    } else {
        var done_exec = bf_interpreter();
        if (done_exec == 0) {
            updatePossession();
        }
    }

}

function updatePossession() {
    poss_l_arrow -= p_left_arrow;
    poss_r_arrow -= p_right_arrow;
    poss_plus -= p_plus;
    poss_moins -= p_moins;
    poss_point -= p_point;
    poss_comma -= p_comma;
    poss_rbracket -= p_right_bracket;
    poss_lbracket -= p_left_bracket;
    updatePossessionValues()
}

function updatePossessionValues() {
    document.getElementById("possession_right_arrow").innerHTML = poss_r_arrow;
    document.getElementById("poss_left_arrow").innerHTML = poss_l_arrow;
    document.getElementById("poss_plus").innerHTML = poss_plus;
    document.getElementById("poss_moins").innerHTML = poss_moins;
    document.getElementById("poss_point").innerHTML = poss_point;
    document.getElementById("poss_comma").innerHTML = poss_comma;
    document.getElementById("poss_lbracket").innerHTML = poss_lbracket;
    document.getElementById("poss_rbracket").innerHTML = poss_rbracket;
}

function newValue(nb) {
    nb = parseFloat(nb);
    return Math.round(Math.max(2.0 * Math.random(), (nb * (1 + randn_bm()))));

}

// Standard Normal variate using Box-Muller transform. (stackoverflow)
function randn_bm() {
    var u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function buy_arrow_r() {
    if (p_currency < market_plus) {

        document.getElementById("terminal").innerHTML = "Cannot buy a > sign: not enough money.";
    } else {
        poss_r_arrow += 1;
        p_currency -= market_right_arrow;
        updatePossessionValues();
        updateMonnaie();
    }
    updateMarket();
}

function buy_arrow_l() {
    if (p_currency < market_plus) {

        document.getElementById("terminal").innerHTML = "Cannot buy a < sign: not enough money.";
    } else {
        poss_l_arrow += 1;
        p_currency -= market_left_arrow;
        updatePossessionValues();
        updateMonnaie();
    }
    updateMarket();
}

function buy_plus() {
    if (p_currency < market_plus) {

        document.getElementById("terminal").innerHTML = "Cannot buy a + sign: not enough money.";
    } else {
        poss_plus += 1;
        p_currency -= market_plus;
        updatePossessionValues();
        updateMonnaie();
    }
    updateMarket();
}


function buy_moins() {
    if (p_currency < market_plus) {

        document.getElementById("terminal").innerHTML = "Cannot buy a - sign: not enough money.";
    } else {
        poss_moins += 1;
        p_currency -= market_moins;
        updatePossessionValues();
        updateMonnaie();
    }
    updateMarket();
}


function buy_point() {
    if (p_currency < market_plus) {

        document.getElementById("terminal").innerHTML = "Cannot buy a , sign: not enough money.";
    } else {
        poss_point += 1;
        p_currency -= market_point;
        updatePossessionValues();
        updateMonnaie();
    }
    updateMarket();
}

function buy_comma() {
    if (p_currency < market_plus) {

        document.getElementById("terminal").innerHTML = "Cannot buy a , sign: not enough money.";
    } else {
        poss_comma += 1;
        p_currency -= market_comma;
        updatePossessionValues();
        updateMonnaie();
    }
    updateMarket();
}

function buy_lbracket() {
    if (p_currency < market_plus) {

        document.getElementById("terminal").innerHTML = "Cannot buy a [ sign: not enough money.";
    } else {
        poss_lbracket += 1;
        p_currency -= market_left_bracket;
        updatePossessionValues();
        updateMonnaie();
    }
    updateMarket();
}

function buy_rbracket() {
    if (p_currency < market_plus) {

        document.getElementById("terminal").innerHTML = "Cannot buy a plus sign: not enough money.";
    } else {
        poss_rbracket += 1;
        p_currency -= market_right_bracket;
        updatePossessionValues();
        updateMonnaie();
    }
    updateMarket();
}

//////////////////////////////////////////// SELL

function sell_arrow_r() {
    if (poss_r_arrow < 1) {
        document.getElementById("terminal").innerHTML = "Cannot sell a > sign : not any in posession.";
    } else {
        poss_r_arrow -= 1;
        p_currency += market_right_arrow;
        updatePossessionValues();
        updateMonnaie();

        updateMarket();
    }
}

function sell_arrow_l() {
    if (poss_l_arrow < 1) {
        document.getElementById("terminal").innerHTML = "Cannot sell a < sign : not any in posession.";
    } else {
        poss_l_arrow -= 1;
        p_currency += market_left_arrow;
        updatePossessionValues();
        updateMonnaie();

        updateMarket();
    }
}

function sell_plus() {
    if (poss_plus < 1) {
        document.getElementById("terminal").innerHTML = "Cannot sell a + sign : not any in posession.";
    } else {
        poss_plus -= 1;
        p_currency += market_plus;
        updatePossessionValues();
        updateMonnaie();

        updateMarket();
    }
}

function sell_moins() {
    if (poss_moins < 1) {
        document.getElementById("terminal").innerHTML = "Cannot sell a - sign : not any in posession.";
    } else {
        poss_moins -= 1;
        p_currency += market_moins;
        updatePossessionValues();
        updateMonnaie();

        updateMarket();
    }
}

function sell_point() {
    if (poss_point < 1) {
        document.getElementById("terminal").innerHTML = "Cannot sell a . sign : not any in posession.";
    } else {
        poss_point -= 1;
        p_currency += market_point;
        updatePossessionValues();
        updateMonnaie();

        updateMarket();
    }
}

function sell_comma() {
    if (poss_comma < 1) {
        document.getElementById("terminal").innerHTML = "Cannot sell a , sign : not any in posession.";
    } else {
        poss_comma -= 1;
        p_currency += market_comma;
        updatePossessionValues();
        updateMonnaie();

        updateMarket();
    }
}

function sell_lbracket() {
    if (poss_lbracket < 1) {
        document.getElementById("terminal").innerHTML = "Cannot sell a [ sign : not any in posession.";
    } else {
        poss_lbracket -= 1;
        p_currency += market_left_bracket;
        updatePossessionValues();
        updateMonnaie();

        updateMarket();
    }
}

function sell_rbracket() {
    if (poss_rbracket < 1) {
        document.getElementById("terminal").innerHTML = "Cannot sell a ] sign : not any in posession.";
    } else {
        poss_rbracket -= 1;
        p_currency += market_right_bracket;
        updatePossessionValues();
        updateMonnaie();

        updateMarket();
    }
}

function updateMonnaie() {
    document.getElementById("monnaie").innerHTML = p_currency;
}