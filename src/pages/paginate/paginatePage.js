import React from 'react';
import { Paginate, DataTable, DataTableColumn } from 'syntec-apollo-11';
import { generateData } from '../../utils/generateData';
import { PrismCode } from 'react-prism';
import { NavLink } from 'react-router-dom';
import ShowCode from '../../components/ShowCode';

class PaginatePage extends React.Component {

  constructor() {
    super();
    this.dataToPaginateAList = [
      { task: 'Tarefa 1', priority: 'Crítica' },
      { task: 'Tarefa 2', priority: 'Crítica' },
      { task: 'Tarefa 3', priority: 'Baixa' },
      { task: 'Tarefa 4', priority: 'Alta' },
      { task: 'Tarefa 5', priority: 'Média' },
      { task: 'Tarefa 6', priority: 'Alta' },
      { task: 'Tarefa 7', priority: 'Crítica' },
      { task: 'Tarefa 8', priority: 'Baixa' },
      { task: 'Tarefa 9', priority: 'Média' },
      { task: 'Tarefa 10', priority: 'Crítica' },
      { task: 'Tarefa 11', priority: 'Alta' },
      { task: 'Tarefa 12', priority: 'Crítica' },
      { task: 'Tarefa 13', priority: 'Média' },
      { task: 'Tarefa 14', priority: 'Crítica' },
      { task: 'Tarefa 15', priority: 'Baixa' },
      { task: 'Tarefa 16', priority: 'Média' },
      { task: 'Tarefa 17', priority: 'Alta' },
      { task: 'Tarefa 18', priority: 'Média' },
      { task: 'Tarefa 19', priority: 'Baixa' },
      { task: 'Tarefa 20', priority: 'Crítica' },
    ];
    this.dataToPaginateWithOptions = generateData();
    this.state = {
      dataToPaginateAList: this.dataToPaginateAList.slice(0,5),
      dataToPaginateWithOptions: this.dataToPaginateWithOptions.slice(0,5),
    }
  }

  doPaginate(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    let filteredData = this.dataToPaginateAList.slice(startOfSlice, endOfSlice);
    return filteredData;
  }

  paginateAction(paginateInfo) {
    this.setState({
      dataToPaginateAList: this.doPaginate(paginateInfo),
    });
  }

  powerfullPaginateAction(paginateInfo) {
    this.setState({
      dataToPaginateWithOptions: this.doPaginate(paginateInfo),
    });
  }

  render() {

    let tasks = this.state.dataToPaginateAList.map((task, i) => {
      return (
        <li className='sv-vertical-marged-5' key={i}>
          {task.task} - {task.priority}
        </li>
      );
    });

    return (
      <div className='dm-content'>
        <h3> Paginate </h3>
        <p>
          Será necessário dividir os dados de acordo com a quantidade desejada por página para o
          carregamento inicial mostrar a quantidade configurada.
          A propriedade <b> recordsByPage </b> servirá para o componente retornar as informações
          quando uma das ações ocorrerem. Em qualquer que seja a ação, as propriedades correspondentes
          às estas ações retornarão um objeto com informações que são úteis para realizar a paginação: limit,
          offset e página atual.
        </p>
        <h4 className='bold'> Paginate simples </h4>
        <p>
          Nessa configuração existem apenas duas ações, ir para uma próxima página ou para uma
          página anterior. O componente possui duas propriedades para receber callbacks quando uma
          dessas ações acontece: <b> onNextPage </b> e <b> onPreviousPage</b>.
        </p>
        <div className='sv-vertical-marged-25'/>
        <Paginate />
        <div className='sv-vertical-marged-25'/>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDePaginateSemOpcoes.js')}
          </PrismCode>
        </ShowCode>
        <div className='sv-vertical-marged-25'/>
        <h4 className='bold'> Paginate com opções </h4>
        <p>
          Se você quiser opções para selecionar as páginas,
          basta adicionar ao componente uma propriedade chamada <b> onSelectASpecifPage</b>, que será
          a própria propriedade que recebe o callback.
        </p>
        <div className='sv-vertical-marged-25'/>
        <Paginate
          onNextPage={(paginateInfo) => this.powerfullPaginateAction(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.powerfullPaginateAction(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.powerfullPaginateAction(paginateInfo)}
          recordsByPage={5}
          totalSizeOfData={this.dataToPaginateWithOptions.length}
        />
        <div className='sv-vertical-marged-25'/>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDePaginateComOpcoes.js')}
          </PrismCode>
        </ShowCode>
        <div className='sv-vertical-marged-25'/>
        <h4 className='bold'> Paginate flexível </h4>
        <p>
          O Paginate não necessariamente precisa ser utilizado em conjunto ao
          <NavLink activeClassName='active' to='data-table'> DataTable</NavLink>.
          No exemplo abaixo, ele foi utilizado em uma lista simples.
        </p>
        <div className='sv-text-center'>
          <ul>
            {tasks}
          </ul>
        </div>
        <div className='sv-vertical-marged-25'/>
        <Paginate
          onNextPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          recordsByPage={5}
          totalSizeOfData={this.dataToPaginateAList.length}
        />
        <div className='sv-vertical-marged-25'/>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDePaginateSemDataTable.js')}
          </PrismCode>
        </ShowCode>
      </div>
    );
  }
}

PaginatePage.displayName = 'PaginatePage';
export default PaginatePage;
