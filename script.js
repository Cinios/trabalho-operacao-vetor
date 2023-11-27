function criarVetor() {
  const numCasas = parseInt(document.getElementById('numCasas').value);
  const valores = [];

  for (let i = 0; i < numCasas; i++) {
    const valor = prompt(`DIGITE O VALOR PARA A CASA ${i + 1}:`);
    valores.push(parseFloat(valor)); 
  }

  const resultadoDiv = document.getElementById('resultado');
  const resultadoText = document.getElementById('resultado-text');

  const resultado = valores.join(', ');
  resultadoText.textContent = `VALORES DO VETOR: ${resultado}`;

  const calcularOperacoesBtn = document.createElement('button');
  calcularOperacoesBtn.textContent = 'Calcular Operações';
  calcularOperacoesBtn.onclick = function () {
    const media = calcularMedia(valores);
    const mediana = calcularMediana(valores);
    const moda = calcularModa(valores);
    const variancia = calcularVariancia(valores);
    const desvioPadrao = calcularDesvioPadrao(valores);
    const coeficienteVariacao = calcularCoeficienteVariacao(valores);

    const criarHistogramaBtn = document.createElement('button');
    criarHistogramaBtn.textContent = 'Criar Histograma';
    criarHistogramaBtn.onclick = function () {
      criarHistograma(valores);
    };

    resultadoDiv.innerHTML = `
      <p>MÉDIA: ${media}</p>
      <p>MEDIANA: ${mediana}</p>
      <p>MODA: ${moda}</p>
      <p>VARIÂNCIA: ${variancia}</p>
      <p>DESVIO PADRÃO: ${desvioPadrao}</p>
      <p>COEFICIENTE DE VARIAÇÃO: ${coeficienteVariacao}</p>
    `;
    resultadoDiv.appendChild(criarHistogramaBtn);
  };

  resultadoDiv.appendChild(calcularOperacoesBtn);
}

function calcularMedia(valores) {
  const soma = valores.reduce((acc, cur) => acc + cur, 0);
  return (soma / valores.length).toFixed(2);
}

function calcularMediana(valores) {
  const sorted = valores.slice().sort((a, b) => a - b);
  const meio = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return ((sorted[meio - 1] + sorted[meio]) / 2).toFixed(2);
  } else {
    return sorted[meio].toFixed(2);
  }
}

function calcularModa(valores) {
  const frequencia = {};
  valores.forEach(valor => {
    frequencia[valor] = (frequencia[valor] || 0) + 1;
  });

  let moda = [];
  let maxFrequencia = 0;

  for (const valor in frequencia) {
    if (frequencia[valor] > maxFrequencia) {
      moda = [parseFloat(valor)];
      maxFrequencia = frequencia[valor];
    } else if (frequencia[valor] === maxFrequencia) {
      moda.push(parseFloat(valor));
    }
  }

  return moda.join(', ');
}

function calcularVariancia(valores) {
  const media = calcularMedia(valores);
  const sqrDiffs = valores.map(valor => (valor - media) ** 2);
  const variance = calcularMedia(sqrDiffs);
  return variance;
}

function calcularDesvioPadrao(valores) {
  const variance = calcularVariancia(valores);
  const desvioPadrao = Math.sqrt(variance);
  return desvioPadrao.toFixed(2);
}

function calcularCoeficienteVariacao(valores) {
  const desvioPadrao = calcularDesvioPadrao(valores);
  const media = calcularMedia(valores);
  const coeficienteVariacao = (desvioPadrao / media * 100).toFixed(2) + '%';
  return coeficienteVariacao;
}

function criarHistograma(valores) {
  const frequencia = {};
  valores.forEach(valor => {
    frequencia[valor] = (frequencia[valor] || 0) + 1;
  });

  const labels = Object.keys(frequencia).map(parseFloat);
  const data = Object.values(frequencia);

  const ctx = document.getElementById('histograma').getContext('2d');
  const histograma = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Frequência',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Valores'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Frequência'
          }
        }
      }
    }
  });
}

function limparTela() {
  document.getElementById('numCasas').value = '';
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('resultado-text').textContent = '';
  const canvas = document.getElementById('histograma');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  location.reload();
}

document.getElementById('contatos-link').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'block';
});

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

window.addEventListener('click', function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
      fecharModal();
  }
});