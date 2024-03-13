let op_arr = [];
let yLower=-10
let yUpper=10
let xUpper=10
let xLower=-10
var EqnSolver = new BigEval();

let board = JXG.JSXGraph.initBoard('box', {boundingbox: [xLower, yUpper, xUpper, yLower], axis:true});

function getAlgebraicExpression(equation){
    equation=equation.replaceAll(" ","");
    equation=equation.split(/([+\-])/);
    console.log(equation)
    let newstring="";
    let polyPattern = /[0-9]*[A-Za-z][0-9]*/;

    for(let i in equation){
        if(polyPattern.test(equation[i])){
            for(let chars in equation[i]){

                if(/[0-9]/.test(equation[i][chars])){

                    newstring+=equation[i][chars]
                }else{
                    newstring+="*x"
                    if(i.length!==chars){
                        newstring+="**"

                    }
                }
            }

        }
    }
    console.log(newstring)
}
getAlgebraicExpression("1x3+23")
//submit
document.getElementById("calculate").onclick = function () {
    let eqn = document.getElementById("equation-input").value
    let operation = document.querySelector('input[name="operation"]:checked').value;


};
var graph = board.create('functiongraph',
    [function f(x){return x*x}, xLower, xUpper]
);