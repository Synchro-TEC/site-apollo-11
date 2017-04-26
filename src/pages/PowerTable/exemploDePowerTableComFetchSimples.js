import React from 'react';
import { PowerTable, PowerColumn } from 'apollo-11';
import _uniqueId from 'lodash/uniqueId';

const data = [
  {
    'codigo': 1,
    'nome': 'Ricardo',
    'endereco': '602 Oliveira Alameda',
    'papel': 'manager',
    'text': 'Voluptatem reprehenderit quia.',
  },
  {
    'codigo': 2,
    'nome': 'Sílvia',
    'endereco': '746 Isabela Travessa',
    'papel': 'admin',
    'descricao': 'Ea corrupti ut est occaecati et.',
  },
  {
	  'codigo': 3,
	  'nome': 'Ígor',
	  'endereco': '4958 Souza Avenida',
	  'papel': 'manager',
	  'descricao': 'Ipsum impedit ipsam.',
  },
  {
    'codigo': 4,
    'nome': 'Eduarda',
    'endereco': '6490 Roberto Avenida',
    'papel': 'manager',
    'descricao': 'Et commodi eaque adipisci et tenetur et ratione consequatur ut.',
  },
  {
    'codigo': 5,
    'nome': 'Tertuliano',
    'endereco': '1191 Melo Ponte',
    'papel': 'admin',
    'descricao': 'Rerum alias reprehenderit non repudiandae.',
  },
];

class ExemploDePowerTableComFetchSimples extends React.Component {

	constructor() {
		super();
		this.fetchSimples = {
			collection: data,
		};
	}

	render() {
		return (
			<div>
				<PowerTable	fetch={this.fetchSimples} key={_uniqueId()}	pageSize={20} rowHeight={39}>
					<PowerColumn columnTitle='Id' dataKey='codigo' dataType='numeric'/>
					<PowerColumn columnTitle='Nome' dataKey='nome'/>
					<PowerColumn columnTitle='Papel' dataKey='papel' />
					<PowerColumn columnTitle='Descrição' dataKey='descricao'/>
					<PowerColumn columnTitle='Endereço' dataKey='endereco'/>
				</PowerTable>
			</div>
		);
	}

}

export default ExemploDePowerTableComFetchSimples;
