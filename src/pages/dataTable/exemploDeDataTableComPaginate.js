import React from 'react';
import { DataTable, DataTableColumn, Paginate } from 'apollo-11';

class ExemploDeDataTableComPaginate extends React.Component {

  constructor(props) {
    super(props);
    this.dados = [
      {tarefa: 'Tarefa 1', prioridade: 'Crítica'},
      {tarefa: 'Tarefa 2', prioridade: 'Crítica'},
      {tarefa: 'Tarefa 3', prioridade: 'Baixa'},
      {tarefa: 'Tarefa 4', prioridade: 'Alta'},
      {tarefa: 'Tarefa 5', prioridade: 'Média'},
      {tarefa: 'Tarefa 6', prioridade: 'Alta'},
      {tarefa: 'Tarefa 7', prioridade: 'Crítica'},
      {tarefa: 'Tarefa 8', prioridade: 'Baixa'},
      {tarefa: 'Tarefa 9', prioridade: 'Média'},
      {tarefa: 'Tarefa 10', prioridade: 'Crítica'},
      {tarefa: 'Tarefa 11', prioridade: 'Alta'},
      {tarefa: 'Tarefa 12', prioridade: 'Crítica'},
      {tarefa: 'Tarefa 13', prioridade: 'Média'},
      {tarefa: 'Tarefa 14', prioridade: 'Crítica'},
      {tarefa: 'Tarefa 15', prioridade: 'Baixa'},
      {tarefa: 'Tarefa 16', prioridade: 'Média'},
      {tarefa: 'Tarefa 17', prioridade: 'Alta'},
      {tarefa: 'Tarefa 18', prioridade: 'Média'},
      {tarefa: 'Tarefa 19', prioridade: 'Baixa'},
      {tarefa: 'Tarefa 20', prioridade: 'Crítica'},
      //E mais...
    ];
    //Slice inicial necessário (mencionado na documentação do Paginate)
    this.state = { dadosFiltradosPeloPaginate: this.dados.slice(0,5) };
  }

  fazerPaginacao(informacoesDoPaginate) {
    let comeco = informacoesDoPaginate.offset;
    let fim = informacoesDoPaginate.offset + informacoesDoPaginate.limit;
    let dadosFiltradosPeloPaginate = this.dados.slice(comeco, fim);
    return dadosFiltradosPeloPaginate;
  }

  //Function to execute when user go to next page
  proximaPagina(informacoesDoPaginate) {
    this.setState({dadosFiltradosPeloPaginate: this.fazerPaginacao(informacoesDoPaginate)});
  }

  //Function to execute when user go to previous page
  paginaAnterior(informacoesDoPaginate) {
    this.setState({dadosFiltradosPeloPaginate: this.fazerPaginacao(informacoesDoPaginate)});
  }

  //Function to execute when user select a specific page
  paginaEspecifica(informacoesDoPaginate) {
    this.setState({dadosFiltradosPeloPaginate: this.fazerPaginacao(informacoesDoPaginate)});
  }

  render() {
    return (
      <div>
        <DataTable data={this.state.dadosFiltradosPeloPaginate}>
          <DataTableColumn dataKey='tarefa'>Tarefa</DataTableColumn>
          <DataTableColumn dataKey='prioridade'>Prioridade</DataTableColumn>
        </DataTable>
        <Paginate
          onNextPage={(informacoesDoPaginate) => this.proximaPagina(informacoesDoPaginate)}
          onPreviousPage={(informacoesDoPaginate) => this.paginaAnterior(informacoesDoPaginate)}
          onSelectASpecifPage={(informacoesDoPaginate) => this.paginaEspecifica(informacoesDoPaginate)}
          recordsByPage={5}
          totalSizeOfData={this.dados.length}
        />
      </div>
    );
  }

}

ExemploDeDataTableComPaginate.displayName = 'ExemploDeDataTableComPaginate';
export default ExemploDeDataTableComPaginate;
