import React from 'react';
import { PowerTable, PowerColumn } from 'apollo-11';
import _uniqueId from 'lodash/uniqueId';

const data = [
  {
    'id': 5,
    'nome': 'Ricardo',
    'endereco': '602 Oliveira Alameda',
    'papel': 'manager',
    'text': 'Voluptatem reprehenderit quia.',
  },
  {
    'id': 6,
    'nome': 'Sílvia',
    'endereco': '746 Isabela Travessa',
    'papel': 'admin',
    'descricao': 'Ea corrupti ut est occaecati et.',
  },
  {
	  'id': 7,
	  'nome': 'Ígor',
	  'endereco': '4958 Souza Avenida',
	  'papel': 'manager',
	  'descricao': 'Ipsum impedit ipsam.',
  },
  {
    'id': 8,
    'nome': 'Eduarda',
    'endereco': '6490 Roberto Avenida',
    'papel': 'manager',
    'descricao': 'Et commodi eaque adipisci et tenetur et ratione consequatur ut.',
  },
  {
    'id': 9,
    'nome': 'Tertuliano',
    'endereco': '1191 Melo Ponte',
    'papel': 'admin',
    'descricao': 'Rerum alias reprehenderit non repudiandae.',
  },
  {
  	'id': 10,
  	'nome': 'Deneval',
  	'endereco': '563 Ofélia Avenida',
  	'papel': 'usuario',
  	'descricao': 'Non optio excepturi soluta laudantium.',
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
				<PowerTable	fetch={this.fetchSimples} key={_uniqueId()}	pageSize={20}>
					<PowerColumn columnTitle='Id' dataKey='id'/>
					<PowerColumn columnTitle='Nome' dataKey='nome'/>
					<PowerColumn columnTitle='Papel' dataKey='papel' dataType='numeric' />
					<PowerColumn columnTitle='Descrição' dataKey='descricao'/>
					<PowerColumn columnTitle='Endereço' dataKey='endereco'/>
				</PowerTable>
			</div>
		);
	}

}

export default ExemploDePowerTableComFetchSimples;
