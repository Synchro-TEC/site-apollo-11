import React from 'react';
import { DataTable, DataTableColumn, Paginate } from 'apollo-11';
import { PrismCode } from 'react-prism';
import { Link } from 'react-router';
import ShowCode from '../../components/ShowCode';
import {generateData} from '../../utils/generateData';
import _sortBy from 'lodash/sortBy';
import _cloneDeep from 'lodash/cloneDeep';

class DataTablePage extends React.Component {

  constructor() {
    super();
    this.dataForDataTableWithPaginateExample = generateData();
    this.dataForSimpleDataTableExample = [
      {tarefa: 'Tarefa 1', prioridade: 'Crítica'},
      {tarefa: 'Tarefa 2', prioridade: 'Baixa'},
      {tarefa: 'Tarefa 3', prioridade: 'Média'},
      {tarefa: 'Tarefa 4', prioridade: 'Alta'},
      {tarefa: 'Tarefa 5', prioridade: 'Crítica'},
    ];
    this.state = {
      dataForSortableColumnDataTableExample: [
        {tarefa: 'Task 1', prioridade: 'Baixa', dataDeInicio: '28/08/2002'},
        {tarefa: 'Task 2', prioridade: 'Crítica', dataDeInicio: '13/05/1996'},
        {tarefa: 'Task 3',  prioridade: 'Média', dataDeInicio: '31/01/2010'},
        {tarefa: 'Task 4',  prioridade: 'Crítica', dataDeInicio: '14/02/2017'},
        {tarefa: 'Task 5', prioridade: 'Alta', dataDeInicio: '14/01/2016'},
      ],
      dataFilteredByPaginate: this.dataForDataTableWithPaginateExample.slice(0,5),
    };
  }

  doPaginate(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    let filteredData = this.dataForDataTableWithPaginateExample.slice(startOfSlice, endOfSlice);
    return filteredData;
  }

  paginateAction(paginateInfo) {
    this.setState({dataFilteredByPaginate: this.doPaginate(paginateInfo)});
  }

  executeSort(sortInfo) {
    let clone = _cloneDeep(this.state.dataForSortableColumnDataTableExample);
    let sortedData;

    if(sortInfo.direction === 'asc') {
      sortedData = _sortBy(clone, (obj) => {
        if(sortInfo.columnKey === 'startDate') {
          let dateToConvert = obj[sortInfo.columnKey];
          let convertedDate = dateToConvert.replace(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/, '$3/$2/$1');
          return new Date(convertedDate);
        } else {
          return obj[sortInfo.columnKey];
        }
      });
    } else {
      sortedData = clone.reverse();
    }

    this.setState({dataForSortableColumnDataTableExample: sortedData});
  }

  render() {
    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3>Data Table</h3>
            <h6 className='sv-vertical-marged'>
              Monta uma tabela baseada na configuração do usuário, a tabela pode ter colunas
              simples ou ordenáveis. O DataTable pode estar em conjunto com o componente
              <Link to='docs/paginate'> Paginate. </Link>
            </h6>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Colunas simples
            </h5>
            <p>
              O componente espera um array de objetos, mas só serão visíveis na tabela os atributos que estão configurados
              no componente <b> DataTableColumn</b>. Por exemplo, se você tem um objeto com os campos "nome" e "idade" e
              deseja que estes valores apareçam no DataTable, você precisará configurar duas colunas adicionando à dois
              componentes DataTableColumn uma propriedade chamada <b> dataKey </b> com as respectivas chaves
              do objeto. O filho do componente DataTableColumn será o título da célula na tabela.
            </p>
          </div>
        </div>
        <DataTable data={this.dataForSimpleDataTableExample}>
          <DataTableColumn dataKey='tarefa'>Tarefa</DataTableColumn>
          <DataTableColumn dataKey='prioridade'>Prioridade</DataTableColumn>
        </DataTable>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./exemploDeDataTableComColunaSimples.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Colunas ordenáveis
            </h5>
            <p>
              Se você deseja uma coluna que tenha opção de ordenação, basta adicionar ao DataTableColumn
              uma propriedade chamada <b> sortable</b>. Agora, o DataTable tem uma propriedade chamada <b> onSort </b>
              que recebe um callback e retorna um objeto com a coluna que esta sendo ordenada e a direção.
              Lembrando que apenas uma coluna pode ser ordenada por vez.
            </p>
          </div>
        </div>
        <DataTable data={this.state.dataForSortableColumnDataTableExample} onSort={(sortInfo) => this.executeSort(sortInfo)}>
          <DataTableColumn dataKey='tarefa' sortable>Tarefa</DataTableColumn>
          <DataTableColumn dataKey='prioridade' sortable>Prioridade</DataTableColumn>
          <DataTableColumn dataKey='dataDeInicio' sortable>Data de inicio</DataTableColumn>
        </DataTable>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./exemploDeDataTableComColunaOrdenavel.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Com Paginate
            </h5>
            <p>
              Sendo configurado com colunas simples ou ordenáveis, o DataTable pode ser utilizado
              com o componente <Link to='docs/paginate'> Paginate</Link>.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <DataTable data={this.state.dataFilteredByPaginate}>
              <DataTableColumn dataKey='task'>Task</DataTableColumn>
              <DataTableColumn dataKey='priority'>Priority</DataTableColumn>
            </DataTable>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Paginate
              onNextPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              onPreviousPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              onSelectASpecifPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              recordsByPage={5}
              totalSizeOfData={this.dataForDataTableWithPaginateExample.length}
            />
          </div>
        </div>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDeDataTableComPaginate.js')}
          </PrismCode>
        </ShowCode>
      </div>
    );
  }
}

export default DataTablePage;
