document.getElementById('fraudForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const resultDiv = document.getElementById('result');
    const statusText = document.getElementById('statusText');

    // 1. Basic Luhn Algorithm for card validation
    const isValidCard = (num) => {
        let arr = num.split('').reverse().map(x => parseInt(x));
        let lastDigit = arr.shift();
        let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) > 9 ? (val * 2) - 9 : val * 2)), 0);
        return (sum + lastDigit) % 10 === 0;
    };

    // 2. Fraud Logic Simulation (In reality, this sends data to a Python/Flask API)
    resultDiv.classList.remove('hidden', 'safe', 'fraud');
    
    if (!isValidCard(cardNumber)) {
        statusText.innerText = "Error: Invalid card number format.";
        resultDiv.classList.add('fraud');
    } else if (amount > 5000) { // Simulating a fraud rule: High transaction amount
        statusText.innerText = "Warning: High-risk transaction detected!";
        resultDiv.classList.add('fraud');
    } else {
        statusText.innerText = "Transaction Verified: Safe.";
        resultDiv.classList.add('safe');
    }
});
