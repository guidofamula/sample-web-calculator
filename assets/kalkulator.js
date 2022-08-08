// Objek utama untuk web kalkulator
const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  isWaitForSecondNumber: false,
};

// Fungi untuk melakukan update tampilan kalkulator
function updateDisplay() {
  document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.isWaitForSecondNumber = false;
}

// fungsi untuk client memasukkan angka pada display number
function inputDigit(digit) {
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// fungsi inverserNumber untuk angka bernilai negatif
function inverseNumber() {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

// fungsi untuk opertator + -
function handleOperator(operator) {
  if (!calculator.isWaitForSecondNumber) {
    calculator.operator = operator;
    calculator.isWaitForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
    calculator.displayNumber = '0';
  } else {
    alert('Operator sudah ditetapkan');
  }
}

// definisi fungsi sama dengan
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Kamu belum menetapkan operator matematika');
    return;
  }

  let result = 0;
  if (calculator.operator === '+') {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // objek yang akan dikirimkan sebagai argumen fungsi putHistory
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  }

  puthHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

// proses menginisialisasikan elemen button dan memberikan event click
const buttons = document.querySelectorAll('.button');

for (const button of buttons) {
  button.addEventListener('click', function (event) {
    // mendapatkan objek elemen yang di klik
    const target = event.target;
    // Proses aktif tombol CE (reset/hapus angka)
    if (target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }
    // Proses aktifkan angka negatif
    if (target.classList.contains('negative')) {
      // masukkan fungsi inverseNumber
      inverseNumber();
      updateDisplay();
      return;
    }
    // Proses aktifkan tombol = (sama dengan)
    if (target.classList.contains('equals')) {
      // masukkan fungsi performCalculation
      performCalculation();
      updateDisplay();
      return;
    }
    // Proses aktifkan operasii matematika kalkulator
    if (target.classList.contains('operator')) {
      // masukkan fungsi handleOperator
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
