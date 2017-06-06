import _times from 'lodash/times';

let generateDataForPowerTable = () => {  
	return _times(130, (i) => {
		return {
			id: i,
			name: [
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
			type: ['admin', 'manager', 'user'][Math.floor((Math.random() * 3))],
			description: [
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
			address: [
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
      quantity: Math.floor((Math.random() * 5) + 1),
      price: (Math.random() * 1000).toFixed(2), 
		}
	});
}

export { generateDataForPowerTable };
