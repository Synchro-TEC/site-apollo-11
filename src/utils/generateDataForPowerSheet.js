import _times from 'lodash/times';

let powerSheetData = () => {  
	return _times(1000, (i) => {
		return {
			id: i+1,
			type: ['admin', 'manager', 'user'][Math.floor((Math.random() * 3))],
			responsible: [
				'Rafaela_Braga@gmail.com',
				'Natlia.Carvalho@hotmail.com',
				'Margarida_Reis34@live.com',
				'Feliciano.Franco@live.com',
				'Marcelo_Souza11@gmail.com',
				'Rafaela65@gmail.com',
				'Lorena.Martins@hotmail.com',
				'Pedro_Moraes@bol.com.br',
				'Hlio_Melo@live.com',
				'Sulen_Batista72@yahoo.com',
			][Math.floor((Math.random() * 10))],
			obrigation: [
				'IOF',
				'IRPF',
				'COFINS',
				'ICMS',
				'IRPJ',
				'PIS',
			][Math.floor((Math.random() * 6))],
			state: [
				'AC', 
				'AL', 
				'ES', 
				'PB', 
				'PE', 
				'PI', 
				'RJ', 
				'RR', 
				'SC', 
				'SP',
			][Math.floor((Math.random() * 10))],      
      value: [
				912.21, 
				11.21, 
				0.21, 
				343.07, 
				121.23, 
				342.32, 
				33.00, 
				33.13, 
				34.90, 
				45.90,
			][Math.floor((Math.random() * 10))], 
		}
	});
}

export { powerSheetData };
