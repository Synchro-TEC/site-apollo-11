function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function generateData() {
  let data = [];

  for (let i = 1; i <= 130; i++) {
    data.push({
      id: i,
      task: 'Tarefa ' + i,
      priority: ['Crítica', 'Alta', 'Média', 'Baixa'][Math.floor((Math.random() * 4))],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
    });
  }

  return data;
}

export { generateData };
