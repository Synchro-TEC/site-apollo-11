import React from 'react';
import { DataTable, DataTableColumn } from 'apollo-11';
import _cloneDeep from 'lodash/cloneDeep';
import _sortBy from 'lodash/sortBy';

class ExemploDeDataTableComColunaOrdenavel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dados: [
        {tarefa: 'Tarefa 1', prioridade: 'Baixa', dataDeInicio: '28/08/2002'},
        {tarefa: 'Tarefa 2', prioridade: 'Crítica', dataDeInicio: '13/05/1996'},
        {tarefa: 'Tarefa 3', prioridade: 'Média', dataDeInicio: '31/01/2010'},
        {tarefa: 'Tarefa 4', prioridade: 'Crítica', dataDeInicio: '14/02/2017'},
        {tarefa: 'Tarefa 5', prioridade: 'Alta', dataDeInicio: '14/01/2016'},
      ],
    }
  }

  /**
   * Função que utiliza as informações de retorno da propriedade onSort para realizar a ordernação.
  */
  realizarOrdenacao(informacoesDoSort) {
    let clone = _cloneDeep(this.state.dados);
    let dadosOrdenados;

    if(informacoesDoSort.direction === 'asc') {
      dadosOrdenados = _sortBy(clone, (obj) => {
        if(informacoesDoSort.columnKey === 'dataDeInicio') {
          let dataAConverter = obj[informacoesDoSort.columnKey];
          //RegEx para converter data do formato dd/mm/aaaa para o formato mm/dd/aaaa
          let dataConvertida = dataAConverter.replace(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/, '$2/$1/$3');
          return new Date(dataConvertida);
        } else {
          return obj[informacoesDoSort.columnKey];
        }
      });
    } else {
      dadosOrdenados = clone.reverse();
    }

    this.setState({dados: dadosOrdenados});
  }

  render() {
    return (
      <div>
        <DataTable data={this.state.dados} onSort={(informacoesDoSort) => this.realizarOrdenacao(informacoesDoSort)}>
          <DataTableColumn dataKey='tarefa' sortable>Tarefa</DataTableColumn>
          <DataTableColumn dataKey='prioridade' sortable>Prioridade</DataTableColumn>
          <DataTableColumn dataKey='dataDeInicio' sortable>Data de inicio</DataTableColumn>
        </DataTable>
      </div>
    );
  }

}

ExemploDeDataTableComColunaOrdenavel.displayName = 'ExemploDeDataTableComColunaOrdenavel';
export default DataTableWithSortExample;
