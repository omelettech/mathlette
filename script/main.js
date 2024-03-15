
let yLower=-10;
let yUpper=10;
let xUpper=10;
let xLower=-10;
var EqnSolver = new BigEval();
let polyPattern = /[0-9]*[A-Za-z][0-9]*/;
let numPattern=/^-?\d+(\.\d+)?$/;
let operatorPattern=/([+\-^()*])/;
let board = JXG.JSXGraph.initBoard('box', {boundingbox: [xLower, yUpper, xUpper, yLower], axis:true});
let eqn = "x";
let eqn_prime = "1"
let precision = 2
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
        if(numPattern.test(equation[i]) || operatorPattern.test(equation[i])){
            newstring+=equation[i];
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

    }
    console.log(newstring)
    return newstring;
}
function hide(id){
    let x = document.getElementById(id);
    x.style.display= x.style.display==="none"?"block":"none";

}
function differentiate(equation){
    let ui =math.derivative(equation,"x")
    return ui.toString();
}
//submit
document.getElementById("calculate").onclick = function () {
    eqn = document.getElementById("equation-input").value;
    eqn_prime=getAlgebraicExpression(differentiate(eqn))
    //differentiate(eqn)
    eqn = getAlgebraicExpression(eqn);
    graph = board.create('functiongraph',
        [function f(x){return EqnSolver.exec(eqn.replaceAll("x",String(x)))}, xLower, xUpper]
    );

    board.update();

};
function drawLine(p1,gradient){
    gradient = new Fraction(gradient)
    console.log(gradient.s)
    let point1= [parseFloat(p1[0]),solveForX(eqn,p1[0])]
    let rise=(gradient.n*gradient.s) - point1[1]
    let run=(gradient.d) - (point1[0]*gradient.s)
    let point2=[run,rise]

    console.log(point1,point2)
    graph = board.create('line',[point1,point2]
    );
    board.update()
}
function solveForX(equation,val){
    //equation must be string: "2x**2+3x" with x
    return (EqnSolver.exec(equation.replaceAll("x",String(val)))).toFixed(precision)*1
}

var getMouseCoords = function(e, i) {

    var pos = board.getMousePosition(e, i);
    return new JXG.Coords(JXG.COORDS_BY_SCREEN, pos, board);
    },

    handleDown = function(e) {
        let i,coords;
        coords = getMouseCoords(e, i);
        let point = [coords.usrCoords[1].toFixed(precision),coords.usrCoords[2].toFixed(precision)]
        drawLine(point,solveForX(eqn_prime,point[0]))
    };

board.on('down', handleDown);
