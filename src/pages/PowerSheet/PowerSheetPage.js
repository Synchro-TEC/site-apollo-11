import React from 'react';
import { PowerSheet, SheetColumn } from 'syntec-apollo-11';
import ShowCode from '../../components/ShowCode';
import { PrismCode } from 'react-prism';
import { powerSheetData } from '../../utils/generateDataForPowerSheet';

class PowerSheetPage extends React.Component {

  constructor() {
    super();
    this.powerSheetData = powerSheetData();
  }

  printPrice(row) {
    return `R$ ${parseFloat(row.value).toFixed(2)}`;
  }

  printPriceOnFilter(price) {
    return `R$ ${price}`;
  }

  // printTotal(row) {
  //     return `R$ ${parseFloat(row.preco * row.quantidade).toFixed(2)}`;
  // }

  render() {    
    return (
      <div className='dm-content'>
        <h3> PowerSheet </h3>
          <p> 
            O PowerSheet possui 3 funcionalidades: ordenação, filtro por um ou mais valor(es) 
            específico(s) de um conjunto de valores e filtro com condição. É também possivel passar um
            formatador para uma coluna. As propriedades do componente são:
          </p>
          <table className='sv-table with--hover'>
            <thead>
              <tr>
                <th> Propriedade </th>
                <th> Tipo </th>
                <th> Valor padrão </th>
                <th> Descrição </th>
                <th> Obrigatória </th>
              </tr>
            </thead>
            <tbody>
              <tr> 
                <td> containerHeight </td>
                <td> int </td>
                <td> undefined </td>
                <td> altura fixa do container  </td>
                <td> sim </td>
              </tr>
              <tr> 
                <td> fetch </td>
                <td> object </td>
                <td> undefined </td>
                <td> Objeto com os dados ou com a url (explicado com mais detalhes abaixo) </td>
                <td> sim </td>
              </tr>     
              <tr> 
                <td> pageSize </td>
                <td> int </td>
                <td> undefined </td>
                <td> Quantidade de registros por página </td>
                <td> sim </td>
              </tr>          
              <tr>
                <td> rowHeight </td>
                <td> int </td>
                <td> undefined </td>
                <td> Altura fixa de uma linha </td>
                <td> sim </td>
              </tr>
            </tbody>
          </table>          
          <h4 className='bold'> O fetch </h4>
          <p>
            O fetch é um objeto de configuração onde é possivel especificar a url e o tipo de request
            ou o próprio conjunto de dados.
          </p>
          <h6> Fetch simples </h6>
          <p>
            O fetch simples contém apenas o conjunto de dados
          </p>
          <div className='dm-code-container'>
            <pre>
              <PrismCode className='language-js'>
                {require('!raw-loader!./exemploDeFetchSimples')}
              </PrismCode>
            </pre>
          </div>
          <h6> Fetch configurado </h6>
          <p>
            O fetch configurado recebe uma url e o tipo de requisão que compete à esta url (GET ou POST)         
          </p>
          <div className='dm-code-container'>
            <pre>
              <PrismCode className='language-js'>
                {require('!raw-loader!./exemploDeFetchConfigurado')}
              </PrismCode>
            </pre>
          </div>
          <div className='sv-vertical-marged-10'/>
          <h4 className='bold'> SheetColumn </h4>
          <p> 
            São as colunas da tabela, configuradas de acordo com os dados recebidos.
            As propriedades são:
          </p>
          <table className='sv-table with--hover'>
            <thead>
              <tr>
                <th> Propriedade </th>
                <th> Tipo </th>
                <th> Valor padrão </th>
                <th> Descrição </th>
                <th> Obrigatória </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> columnTitle </td>
                <td> string </td>
                <td> undefined </td>
                <td> Titulo que aparecerá para a coluna </td>
                <td> sim </td>
              </tr>
              <tr>
                <td> dataKey </td>
                <td> string </td>
                <td> undefined </td>
                <td> Chave do objeto correspondente à coluna </td>
                <td> não </td>
              </tr>
              <tr>
                <td> dataType </td>
                <td> string </td>
                <td> 'numeric' </td>
                <td> Tipo de dado da coluna (numeric, text, ou date) </td>
                <td> não </td>
              </tr>
              <tr>
                <td> formatter </td>
                <td> function </td>
                <td> undefined </td>                
                <td> Função que retorna o valor formatado para a coluna </td>
                <td> não </td>
              </tr>
              <tr>
                <td> formatterOnFilter </td>
                <td> function </td>
                <td> undefined </td>
                <td> Função que retorna o valor formatado para as opções do filtro </td>
                <td> não </td>
              </tr>
              <tr> 
                <td> groupBy </td>
                <td> boolean </td>
                <td> false </td>
                <td> Agrupa linhas de acordo com o valor da coluna </td>
                <td> não </td>
              </tr>              
              <tr>
                <td> searchable </td>
                <td> boolean </td>
                <td> false </td>  
                <td> Coluna com opção de filtro por valores e condições </td>
                <td> não </td>
              </tr>
              <tr> 
                <td> width </td>
                <td> int </td>
                <td> undefined </td>
                <td> Largura fixa de uma coluna </td>
                <td> não </td>
              </tr>
            </tbody>
          </table>
          <h4 className='bold'> PowerSheet com colunas simples e fetch simples </h4>
          <p> 
            Esse é o tipo mais simples de configuração do componente, contendo apenas o comportamento
            padrão de ordenação das colunas e fetch simples.
          </p>
          <PowerSheet
            containerHeight={290}
            fetch={{data: this.powerSheetData}}
            pageSize={10}
            rowHeight={35}>
            <SheetColumn columnTitle='Codigo' dataKey='id' dataType='numeric' />
            <SheetColumn columnTitle='Responsável' dataKey='responsible' />
            <SheetColumn columnTitle='Obrigação' dataKey='obrigation' />
            <SheetColumn columnTitle='Estado' dataKey='state' />
            <SheetColumn columnTitle='Papel' dataKey='type' />     
            <SheetColumn columnTitle='Valor' dataKey='value' dataType='numeric' />
          </PowerSheet>
          <div className='sv-vertical-marged-25' />
          <ShowCode>
            <PrismCode className='language-js'>
              {require('!raw-loader!./exemploDePowerSheetComColunasSimples.js')}
            </PrismCode>
          </ShowCode>
          <h4 className='bold'> PowerSheet com colunas configuradas e fetch configurado </h4>
          <p> 
            Neste exemplo, algumas colunas foram configuradas com a propriedade <b> searchable</b>,
            <b> groupBy</b> e formatadores. Para o fetch foi especificado uma URL e o método da requisição.
          </p>          
          <PowerSheet
            containerHeight={290}
            fetch={{data: this.powerSheetData}}
            pageSize={10}
            rowHeight={35}>
            <SheetColumn columnTitle='Codigo' dataKey='id' dataType='numeric' />
            <SheetColumn columnTitle='Responsável' dataKey='responsible' searchable />
            <SheetColumn columnTitle='Obrigação' dataKey='obrigation' groupBy searchable />
            <SheetColumn columnTitle='Estado' dataKey='state' searchable />
            <SheetColumn columnTitle='Papel' dataKey='type' searchable />     
            <SheetColumn
              columnTitle='Valor'
              dataKey='value'
              dataType='numeric'
              formatter={this.printPrice}
              formatterOnFilter={this.printPriceOnFilter}
              searchable
              width={120}
            />
          </PowerSheet>
          <div className='sv-vertical-marged-25' />
          <ShowCode>
            <PrismCode className='language-js'>
              {require('!raw-loader!./exemploDePowerSheetComColunasConfiguradas.js')}
            </PrismCode>
          </ShowCode>          
      </div>
    );
  }

}

PowerSheetPage.displayName = 'PowerSheetPage';
export default PowerSheetPage;
