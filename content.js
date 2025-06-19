document.getElementById("CaptchaInputText").addEventListener("click", function () {
    let expression = prompt("Enter a expression:");

    if (expression) {
        expression = expression.trim();

        let match = expression.match(/^(\d+)\s*([\+\-\*\/])\s*(\d+)$/);

        if (match) {
            let num1 = parseFloat(match[1]);
            let operator = match[2];
            let num2 = parseFloat(match[3]);
            let result;

            switch (operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                default:
                    return alert("Unsupported operation.");
            }
            this.value = result;
        } else {
            alert("Bro !! Invalid Expression");
        }
    }
});
