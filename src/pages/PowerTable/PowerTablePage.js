import React from 'react';
import { PowerTable, PowerColumn } from 'syntec-apollo-11';
import ShowCode from '../../components/ShowCode';
import { PrismCode } from 'react-prism';
import _uniqueId from 'lodash/uniqueId';
import axios from 'axios';
import { generateDataForPowerTable } from '../../utils/generateDataForPowerTable';

class PowerTablePage extends React.Component {

  constructor(props) {
    super();
    this.data = generateDataForPowerTable();
    // this.state = { data: [] };
  }

  componentDidMount() {
    // axios.get('http://localhost:3000/users')
    //   .then((response) => {
    //     this.setState({ data: response.data });
    //   });
  }

  printPrice(row) {
    return `R$ ${row.preco}`;
  }

  printPriceOnFilter(price) {
    return `R$ ${price}`;
  }

  printTotal(row) {
    return `R$ ${parseFloat(row.preco * row.quantidade).toFixed(2)}`;
  }

  render() {
    return (
      <div className='dm-content'>
        {/* <PowerTable
          fetch={{collection: this.state.data}}
          key={_uniqueId('PWT-')}
          pageSize={5}
          rowHeight={39}>
          <PowerColumn columnTitle='Codigo' dataKey='id' dataType='numeric' />
          <PowerColumn columnTitle='Nome' dataKey='firstName' searchable />
          <PowerColumn columnTitle='Papel' dataKey='papel' searchable />
          <PowerColumn columnTitle='Descrição' dataKey='text' searchable />
          <PowerColumn columnTitle='Endereço' dataKey='address' searchable />
          <PowerColumn
            columnTitle='Preço'
            dataKey='price'
            dataType='numeric'
            formatter={this.printPrice}
            formatterOnFilter={this.printPriceOnFilter}
            searchable />
          <PowerColumn columnTitle='Quantidade' dataKey='quantity' dataType='numeric' searchable />
          <PowerColumn columnTitle='Total' formatter={this.printTotal} />
        </PowerTable> */}
        <h3> PowerTable </h3>
        <p>
          O componente irá montar uma tabela à partir dos dados recebidos. Essa
          tabela possui 3 funcionalidades: ordenação, filtro por um ou mais valor(es)
          específico(s) de um conjunto de valores e filtro com condição. É possível passar
          um formatador para uma coluna. Será necessário passar para o PowerTable
          quatro propriedades básicas: <b> fetch</b>, <b> key</b>,
          <b> pageSize</b> e <b> rowHeight </b>. A key será necessária para
          referência, o pageSize é o numero de registros desejados por página e
          rowHeight é a altura fixa de cada linha da tabela.
          O objeto <b>fetch</b> será explicado abaixo.
        </p>
        <h4 className='bold'> O fetch </h4>
        <p>
          O fetch é um objeto de configuração do componente onde é possivel
          especificar a url, o tipo de request, colunas do PowerTable
          (explicadas abaixo) e o caminho da coleção no objeto enviado para o componente.
        </p>
        <h6> Fetch simples </h6>
        <p>
          O fetch simples contém apenas o essencial para o PowerTable,
          os dados que serão consumidos. O objeto é montado assim:
        </p>
        <div className='dm-code-container'>
          <pre>
            <PrismCode className='language-js'>
              {require('!raw-loader!./exemploDeFetchSimples')}
            </PrismCode>
          </pre>
        </div>
        <div className='sv-vertical-marged-25'/>
        <h6> Fetch configurado </h6>
        <p>
          A propriedade <b> fetchUrl </b> especifica uma URL, <b> fetchMethod </b>
          o tipo de requisição que será feita (POST ou GET), <b>fetchParams </b>
          recebe um objeto com as colunas que podem estar sendo criadas dinamicamente,
          <b> responseCollectionPath </b> especifica o caminho dos dados no objeto
          de resposta. Abaixo, segue um exemplo de fetch configurado:
        </p>
        <div className='dm-code-container'>
          <pre>
            <PrismCode className='language-js'>
              {require('!raw-loader!./exemploDeFetchConfigurado')}
            </PrismCode>
          </pre>
        </div>
        <div className='sv-vertical-marged-25'/>
        <h4 className='bold'> O PowerColumn </h4>
        <p>
          O PowerColumn corresponde às colunas da tabela e possui as seguintes propriedades:
        </p>
        <table className='sv-table with--hover'>
          <thead>
            <tr>
              <th> Propriedade </th>
              <th> Tipo </th>
              <th> Descrição </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> columnTitle </td>
              <td> string </td>
              <td> Titulo que aparecerá para essa coluna </td>
            </tr>
            <tr>
              <td> dataKey </td>
              <td> string </td>
              <td> Chave do objeto correspondente à essa coluna </td>
            </tr>
            <tr>
              <td> dataType </td>
              <td> string </td>
              <td> Tipo de dado de uma coluna (numeric, text, ou date) </td>
            </tr>
            <tr>
              <td> formatter </td>
              <td> function </td>
              <td> Função que deve retornar o valor formatado </td>
            </tr>
            <tr>
              <td> formatterOnFilter </td>
              <td> function </td>
              <td>
                Função que deve retornar o valor formatado para este aparecer
                nas opções do filtro
              </td>
            </tr>
            <tr>
              <td> searchable </td>
              <td> boolean </td>
              <td>
                Quando deseja uma coluna com opção de ordenação, filtragem por valores
                e por condições.
              </td>
            </tr>
          </tbody>
        </table>
        <h4 className='bold'> PowerTable com colunas simples </h4>
        <p>
          Este é o tipo mais básico de configuração do componente, contendo
          somente as propriedades necessárias explicadas acima.
        </p>
        <div style={{position: 'relative'}}>
          <PowerTable
            fetch={{collection: this.data}}
            key={_uniqueId('PWT-')}
            pageSize={5}
            rowHeight={39}>
            <PowerColumn columnTitle='Codigo' dataKey='codigo' dataType='numeric'/>
            <PowerColumn columnTitle='Nome' dataKey='nome' />
            <PowerColumn columnTitle='Papel' dataKey='papel' />
            <PowerColumn columnTitle='Descrição' dataKey='descricao' />
            <PowerColumn columnTitle='Endereço' dataKey='endereco' />
          </PowerTable>
        </div>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDePowerTableComFetchSimples.js')}
          </PrismCode>
        </ShowCode>
        <h4 className='bold'> PowerTable com colunas configuradas </h4>
        <p>
          Neste exemplo, foram utilizadas as propriedades do PowerColumn
          explicadas acima para configurar colunas.
        </p>
        <div style={{position: 'relative'}}>
          <PowerTable
            fetch={{collection: this.data}}
            key={_uniqueId('PWT-')}
            pageSize={5}
            rowHeight={39}>
            <PowerColumn columnTitle='Codigo' dataKey='codigo' dataType='numeric' />
            <PowerColumn columnTitle='Nome' dataKey='nome' searchable />
            <PowerColumn columnTitle='Papel' dataKey='papel' searchable />
            <PowerColumn columnTitle='Descrição' dataKey='descricao' searchable />
            <PowerColumn columnTitle='Endereço' dataKey='endereco' searchable />
            <PowerColumn
              columnTitle='Preço'
              dataKey='preco'
              dataType='numeric'
              formatter={this.printPrice}
              formatterOnFilter={this.printPriceOnFilter}
              searchable />
            <PowerColumn columnTitle='Quantidade' dataKey='quantidade' dataType='numeric' searchable />
            <PowerColumn columnTitle='Total' formatter={this.printTotal} />
          </PowerTable>
        </div>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDePowerTableComColunasConfiguradas.js')}
          </PrismCode>
        </ShowCode>
      </div>
    );
  }

}

export default PowerTablePage;
