import React from 'react';
import { PowerTable, PowerColumn } from 'apollo-11';

const data = [
  {
    'id': 1,
    'nome': 'Ricardo',
    'endereco': '602 Oliveira Alameda',
    'papel': 'manager',
    'text': 'Voluptatem reprehenderit quia.',
	'preco': 40.10,
  },
  {
    'id': 2,
    'nome': 'Sílvia',
    'endereco': '746 Isabela Travessa',
    'papel': 'admin',
    'descricao': 'Ea corrupti ut est occaecati et.',
	'preco': 39.59,
  },
  {
	'id': 3,
 	'nome': 'Ígor',
	'endereco': '4958 Souza Avenida',
	'papel': 'manager',
	'descricao': 'Ipsum impedit ipsam.',
	'preco': 8.40,
  },
  {
    'id': 4,
    'nome': 'Eduarda',
    'endereco': '6490 Roberto Avenida',
    'papel': 'manager',
    'descricao': 'Et commodi eaque adipisci et tenetur et ratione consequatur ut.',
	'preco': 11.32,
  },
  {
    'id': 5,
    'nome': 'Tertuliano',
    'endereco': '1191 Melo Ponte',
    'papel': 'admin',
    'descricao': 'Rerum alias reprehenderit non repudiandae.',
	'preco': 30.50,
  },
];

class ExemploDePowerTableComColunasConfiguradas extends React.Component {

  /**
   * Função que formata o preço na tabela.
  */
  formatarPreco(linha) {
    return `R$ ${linha.preco}`;
  }

  /**
   * Função que formata o preço nas opções do filtro.
  */
  formatarPrecoNasOpcoesDoFiltro(preco) {
    return `R$ ${preco}`;
  }

  /**
   * Função que retorna o valor do total para a coluna correspondente.
  */
  formatarTotal(linha) {
    return `R$ ${parseFloat(linha.preco * linha.quantidade).toFixed(2)}`;
  }

	render() {
		return (
			<div>
				<PowerTable fetch={{collection: data}} key={_uniqueId('PWT-')} pageSize={5} rowHeight={39}>
				  <PowerColumn columnTitle='Id' dataKey='id' dataType='numeric'/>
				  <PowerColumn columnTitle='Nome' dataKey='nome'/>
			 	  <PowerColumn columnTitle='Papel' dataKey='papel' />
				  <PowerColumn columnTitle='Descrição' dataKey='descricao'/>
				  <PowerColumn columnTitle='Endereço' dataKey='endereco'/>
          		  <PowerColumn
	          			columnTitle='Preço'
	          			dataKey='preco'
			          	dataType='numeric'
			          	formatter={this.formatarPreco}
			          	formatterOnFilter={this.formatarPrecoNasOpcoesDoFiltro}
		          		searchable />
          		  <PowerColumn columnTitle='Total' formatter={this.formatarTotal} />
        		</PowerTable>
			</div>
		);
	}

}

ExemploDePowerTableComColunasConfiguradas.displayName = 'ExemploDePowerTableComColunasConfiguradas';
export default ExemploDePowerTableComColunasConfiguradas;
