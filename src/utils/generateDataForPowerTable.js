function generateDataForPowerTable() {
  let data = [];

  for (let i = 1; i <= 130; i++) {
    data.push({
      codigo: i,
      nome: [
				'Rafaela',
				'Felícia',
				'Ofélia',
				'Maria',
				'Ricardo',
				'Tertuliano',
				'Marcelo',
				'Deneval',
				'Jorge',
				'Raul',
			][Math.floor((Math.random() * 10))],
			papel: ['admin', 'manager', 'user'][Math.floor((Math.random() * 3))],
			descricao: [
				'Ex nostrum aspernatur.',
				'Assumenda amet maiores.',
				'Quia ex soluta quidem.',
				'Repellat vitae qui vitae eos itaque.',
				'Assumenda amet maiores.',
				'Sequi aut doloremque.',
				'Architecto voluptatem ullam aut.',
				'Est eum sapiente veritatis.',
				'Dolorem ab eos est rem ducimus quas rem.',
				'Qui autem rerum.',
			][Math.floor((Math.random() * 10))],
			endereco: [
				'87016 Alessandra Viela',
				'6402 Pereira Marginal',
				'5421 Eduarda Ponte',
				'727 Moraes Viela',
				'437 Salvador Viela',
				'754 Júlia Alameda',
				'069 Carvalho Marginal',
				'661 Karla Rua',
				'60618 Carvalho Rodovia',
				'598 Macedo Alameda',
			][Math.floor((Math.random() * 10))],
      quantidade: Math.floor((Math.random() * 5)),
      preco: (Math.random() * 1000).toFixed(2),
    });
  }

  return data;
}

export { generateDataForPowerTable };
