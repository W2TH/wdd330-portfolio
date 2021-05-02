function calculateMinimum() { 
    let a = document.getElementById('first-number').value; 
    let b = document.getElementById('second-number').value; 
    const min = (num1, num2) => { document.getElementById("output").innerHTML = "The minimum number is: " + Math.min(num1, num2); } 
    min(a, b);
}