document.addEventListener('DOMContentLoaded', () => {
    // Get the DOM elements
    const balanceInput = document.getElementById('balance-input');
    const totalExpenseInput = document.getElementById('total-expense-input');
    const incomeInput = document.getElementById('income-input');
    const addIncomeButton = document.getElementById('add-income-btn');
    const expenseReasonInput = document.getElementById('expense-reason');
    const expenseInput = document.getElementById('expense-input');
    const addExpenseButton = document.getElementById('add-expense-btn');
    const expenseList = document.getElementById('expense-list');

    // Load existing data from localStorage or initialize
    let balance = parseFloat(localStorage.getItem('balance')) || 0;
    let totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to update the displayed balance
    function updateBalance() {
        balanceInput.innerText = `₵${balance}`;
    }

    // Function to update the total expenses
    function updateTotalExpense() {
        totalExpenseInput.innerText = `₵${totalExpense}`;
    }

    // Function to render the expense list
    function renderExpenses() {
        // Clear the current list
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerText = `${expense.reason}: ₵${expense.amount}`;

            // Add a delete button for each expense
            const deleteButton = document.createElement('span');
            deleteButton.innerText = '❌';
            deleteButton.style.marginLeft = '10px';
            deleteButton.style.cursor = 'pointer';
            deleteButton.onclick = () => removeExpense(index);

            li.appendChild(deleteButton);
            expenseList.appendChild(li);
        });
    }

    // Function to remove an expense
    function removeExpense(index) {
        const removedExpense = expenses[index];
        totalExpense -= removedExpense.amount;
        balance += removedExpense.amount; // Add back the expense to balance

        // Update arrays and localStorage
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        localStorage.setItem('totalExpense', totalExpense);
        localStorage.setItem('balance', balance);

        // Update the UI
        updateTotalExpense();
        updateBalance();
        renderExpenses();
    }

    // Event listener for the "Add Income" button
    addIncomeButton.addEventListener('click', () => {
        const incomeValue = parseFloat(incomeInput.value);

        if (!isNaN(incomeValue) && incomeValue > 0) {
            balance += incomeValue;

            // Save to localStorage
            localStorage.setItem('balance', balance);

            // Update UI
            updateBalance();
            incomeInput.value = '';
        } else {
            alert("Please enter a valid income amount");
        }
    });

    // Event listener for the "Add Expense" button
    addExpenseButton.addEventListener('click', () => {
        const reason = expenseReasonInput.value.trim();
        const expenseValue = parseFloat(expenseInput.value);

        if (reason === '') {
            alert("Please enter a reason for the expense.");
            return;
        }

        if (!isNaN(expenseValue) && expenseValue > 0) {
            // Update total expenses and balance
            totalExpense += expenseValue;
            balance -= expenseValue;

            // Add the expense to the list
            expenses.push({ reason, amount: expenseValue });

            // Save to localStorage
            localStorage.setItem('expenses', JSON.stringify(expenses));
            localStorage.setItem('totalExpense', totalExpense);
            localStorage.setItem('balance', balance);

            // Update UI
            updateTotalExpense();
            updateBalance();
            renderExpenses();

            // Clear inputs
            expenseReasonInput.value = '';
            expenseInput.value = '';
        } else {
            alert("Please enter a valid expense amount.");
        }
    });

    // Initialize the UI on page load
    updateBalance();
    updateTotalExpense();
    renderExpenses();
});
