"use strict"
let op_arr = [];
let yLower=-10;
let yUpper=10;
let xUpper=10;
let xLower=-10;
var EqnSolver = new BigEval();
let polyPattern = /[0-9]*[A-Za-z][0-9]*/;
let numPattern=/^-?\d+(\.\d+)?$/;
let operatorPattern=/([+\-^])/;
let board = JXG.JSXGraph.initBoard('box', {boundingbox: [xLower, yUpper, xUpper, yLower], axis:true});
let eqn = "x**2";
var graph = board.create('functiongraph',
    [function f(x){return EqnSolver.exec(eqn.replaceAll("x",String(x)))}, xLower, xUpper]
);
function getAlgebraicExpression(equation){
    equation=equation.replaceAll(" ","");
    equation=equation.split(operatorPattern);
    let newstring="";


    for(let i in equation){
        if(equation[i]==="^"){
            newstring+="**"
            continue
        }
        if(/^[A-Za-z]$/.test(equation[i])){
            newstring+="x";
            continue
        }
        // only for 2x^2
        if(polyPattern.test(equation[i])){
            for(let chars in equation[i]){

                if(numPattern.test(equation[i][chars])){

                    newstring+=equation[i][chars];


                }else{
                    newstring+="*x";

                }
            }

        }
        else if(numPattern.test(equation[i]) || operatorPattern.test(equation[i])){
            newstring+=equation[i];
        }
    }
    console.log(newstring)
    return newstring;
}

//submit
document.getElementById("calculate").onclick = function () {
    eqn = document.getElementById("equation-input").value;
    eqn = getAlgebraicExpression(eqn);
    graph = board.create('functiongraph',
        [function f(x){return EqnSolver.exec(eqn.replaceAll("x",String(x)))}, xLower, xUpper]
    );
    board.update();

};
