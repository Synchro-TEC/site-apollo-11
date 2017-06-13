import React from 'react';
import { Paginate } from 'syntec-apollo-11';

const dados = [
  {tarefa: 'Tarefa 1',  prioridade: 'Crítica'},
  {tarefa: 'Tarefa 2',  prioridade: 'Crítica'},
  {tarefa: 'Tarefa 3',  prioridade: 'Baixa'},
  {tarefa: 'Tarefa 4',  prioridade: 'Alta'},
  {tarefa: 'Tarefa 5',  prioridade: 'Média'},
  {tarefa: 'Tarefa 6',  prioridade: 'Alta'},
  {tarefa: 'Tarefa 7',  prioridade: 'Crítica'},
  {tarefa: 'Tarefa 8',  prioridade: 'Baixa'},
  {tarefa: 'Tarefa 9',  prioridade: 'Média'},
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

class ExemploDePaginateSemDataTable extends React.Component {

  constructor() {
    super();
    this.state = { dadosFiltradosPeloPaginate: dados.slice(0,5) }
  }

  /**
   * Função que utiliza as informações de retorno das propriedades de ação do Paginate
   * (onNextPage, onPreviousPage, onSelectASpecifPage) para realizar a paginação.
  */
  fazerPaginacao(informacoesDoPaginate) {
    let comeco = informacoesDoPaginate.offset;
    let fim = informacoesDoPaginate.offset + informacoesDoPaginate.limit;
    let dadosFiltradosPeloPaginate = dados.slice(comeco, fim);
    return dadosFiltradosPeloPaginate;
  }

  /**
   * Chamada quando o usuário vai para uma próxima página.
  */
  proximaPagina(informacoesDoPaginate) {
    this.setState({dadosFiltradosPeloPaginate: this.fazerPaginacao(informacoesDoPaginate)});
  }

  /**
   * Chamada quando o usuário vai para uma página anterior.
  */
  paginaAnterior(informacoesDoPaginate) {
    this.setState({dadosFiltradosPeloPaginate: this.fazerPaginacao(informacoesDoPaginate)});
  }

  /**
   * Chamada quando o usuário seleciona uma página pelas opções.
  */
  paginaEspecifica(informacoesDoPaginate) {
    this.setState({dadosFiltradosPeloPaginate: this.fazerPaginacao(informacoesDoPaginate)});
  }

  /**
   * Função que volta para a primeira página
  */
  voltarParaPrimeiraPagina() {
    this.refs.paginate.reset();  
  }

  render() {

    let itens = this.state.dadosFiltradosPeloPaginate.map((tarefa, i) => {
      return (
        <li key={i}> {tarefa.tarefa} - {tarefa.prioridade} </li>
      );
    });

    return (
      <div>
        <ul>
          {itens}
        </ul>
        <Paginate          
          onNextPage={(paginateInfo) => this.proximaPagina(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginaAnterior(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginaEspecifica(paginateInfo)}
          recordsByPage={5}
          ref='paginate'
          totalSizeOfData={this.dataForPaginateExample.length}
        />
      </div>
    );
  }

}

ExemploDePaginateSemDataTable.displayName = 'ExemploDePaginateSemDataTable';
export default ExemploDePaginateSemDataTable;
