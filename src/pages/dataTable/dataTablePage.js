import React from 'react';
import { DataTable, DataTableColumn, Paginate } from 'syntec-apollo-11';
import { PrismCode } from 'react-prism';
import { NavLink } from 'react-router-dom';
import ShowCode from '../../components/ShowCode';
import { generateDataForDataTable } from '../../utils/generateDataForDataTable';
import _sortBy from 'lodash/sortBy';
import _cloneDeep from 'lodash/cloneDeep';

class DataTablePage extends React.Component {

  constructor() {
    super();
    this.dataForDataTableWithPaginateExample = generateDataForDataTable();
    this.dataForSimpleDataTableExample = [
      {task: 'Tarefa 0', priority: 'Crítica'},
      {task: 'Tarefa 1', priority: 'Baixa'},
      {task: 'Tarefa 2', priority: 'Média'},
      {task: 'Tarefa 3', priority: 'Alta'},
      {task: 'Tarefa 4', priority: 'Crítica'},
    ];
    this.state = {
      dataForSortableColumnDataTableExample: [
        {task: 'Tarefa 0', priority: 'Baixa',   startDate: '28/08/2002'},
        {task: 'Tarefa 1', priority: 'Crítica', startDate: '13/05/1996'},
        {task: 'Tarefa 2', priority: 'Média',   startDate: '31/01/2010'},
        {task: 'Tarefa 3', priority: 'Crítica', startDate: '14/02/2017'},
        {task: 'Tarefa 4', priority: 'Alta',    startDate: '14/01/2016'},
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
    this.setState({
      dataFilteredByPaginate: this.doPaginate(paginateInfo),
    });
  }

  executeSort(sortInfo) {    
    let clone = _cloneDeep(this.state.dataForSortableColumnDataTableExample);
    let sortedData;

    if(sortInfo.direction === 'asc') {
      sortedData = _sortBy(clone, (obj) => {
        if(sortInfo.columnKey === 'startDate') {
          let dateToConvert = obj[sortInfo.columnKey];
          let convertedDate = dateToConvert.replace(
            /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/, '$3/$2/$1'
          );
          return new Date(convertedDate);
        } else {
          return obj[sortInfo.columnKey];
        }
      });
    } else {
      sortedData = clone.reverse();
    }

    this.setState({
      dataForSortableColumnDataTableExample: sortedData,
    });
  }

  render() {
    return (
      <div className='dm-content'>
        <h3>Data Table</h3>
        <p>
          O componente espera um array de objetos, mas só serão visíveis na tabela os atributos que estão configurados
          no componente <b> DataTableColumn</b>. Por exemplo, se você tem um objeto com os campos "nome" e "idade" e
          deseja que estes valores apareçam no DataTable, você precisará configurar duas colunas adicionando à dois
          componentes DataTableColumn uma propriedade chamada <b> dataKey </b> com as respectivas chaves
          do objeto. O filho do componente DataTableColumn será o título da célula na tabela.
        </p>
        <h4 className='bold'> Colunas simples </h4>
        <p>
          Será necessário apenas configurar o DataTableColumn com a propriedade datakey correspondente à sua
          chave no objeto, como mencionado acima.
        </p>
        <DataTable data={this.dataForSimpleDataTableExample}>
          <DataTableColumn dataKey='task'>Tarefa</DataTableColumn>
          <DataTableColumn dataKey='priority'>Prioridade</DataTableColumn>
        </DataTable>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDeDataTableComColunaSimples.js')}
          </PrismCode>
        </ShowCode>
        <div className='sv-vertical-marged-25'/>
        <h4 className='bold'> Colunas ordenáveis </h4>
        <p>
          Se você deseja uma coluna que tenha opção de ordenação, será necessário passar uma propriedade a mais para o DataTableColumn,
          chamada <b> sortable</b>. Dessa forma, o DataTable terá uma propriedade chamada <b> onSort </b>
          que receberá um callback e retornará um objeto com a chave da coluna (valor do título da célula na tabela)
          que esta sendo ordenada e a direção. Lembrando que, apenas uma coluna pode ser ordenada por vez.
        </p>
        <DataTable data={this.state.dataForSortableColumnDataTableExample} onSort={(sortInfo) => this.executeSort(sortInfo)}>
          <DataTableColumn dataKey='task' sortable>Tarefa</DataTableColumn>
          <DataTableColumn dataKey='priority' sortable>Prioridade</DataTableColumn>
          <DataTableColumn dataKey='startDate' sortable>Data de inicio</DataTableColumn>
        </DataTable>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDeDataTableComColunaOrdenavel.js')}
          </PrismCode>
        </ShowCode>
        <div className='sv-vertical-marged-25'/>
        <h4 className='bold'> Com Paginate </h4>
        <p>
          Sendo configurado com colunas simples ou ordenáveis, o DataTable pode ser utilizado
          com o componente <NavLink activeClassName='active' to='paginate'> Paginate</NavLink>.
        </p>
        <DataTable data={this.state.dataFilteredByPaginate}>
          <DataTableColumn dataKey='task'>Tarefa</DataTableColumn>
          <DataTableColumn dataKey='priority'>Prioridade</DataTableColumn>
        </DataTable>
        <Paginate
          onNextPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          recordsByPage={5}
          totalSizeOfData={this.dataForDataTableWithPaginateExample.length}
        />
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDeDataTableComPaginate.js')}
          </PrismCode>
        </ShowCode>
      </div>
    );
  }
}

DataTablePage.displayName = 'DataTablePage';
export default DataTablePage;
