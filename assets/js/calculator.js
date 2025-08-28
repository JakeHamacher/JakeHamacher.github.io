document.getElementById('paymentCalculator').addEventListener('submit', function (e) {
    e.preventDefault(); // Stop page refresh

    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const years = parseInt(document.getElementById('loanTerm').value);
    const propertyTax = parseFloat(document.getElementById('propertyTax').value) || 0;
    const homeInsurance = parseFloat(document.getElementById('homeInsurance').value) || 0;

    const resultDiv = document.getElementById('calculatorResult');
    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    // Validation
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(years) || loanAmount <= 0 || years <= 0) {
        resultDiv.textContent = '⚠ Please enter valid values for loan amount, interest rate, and term.';
        return;
    }

    const monthlyRate = interestRate / 12;
    const months = years * 12;

    let monthlyPayment;
    if (monthlyRate === 0) {
        // No interest loan
        monthlyPayment = loanAmount / months;
    } else {
        // Standard mortgage payment formula
        monthlyPayment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    }

    const totalMonthly = monthlyPayment + (propertyTax / 12) + (homeInsurance / 12);

    resultDiv.textContent = `Estimated Monthly Payment: ${formatCurrency.format(totalMonthly)}`;
});
