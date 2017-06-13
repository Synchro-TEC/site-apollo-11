import React from 'react';
import { Paginate } from 'syntec-apollo-11';

class ExemploDePaginateSemOpcoes extends React.Component {

  /**
   * Chamada quando o usuário vai para uma próxima página.
  */
  proximaPagina(informacoesDoPaginate) { }

  /**
   * Chamada quando o usuário vai para uma página anterior.
  */
  paginaAnterior(informacoesDoPaginate) { }

  /**
   * Função que volta para a primeira página
  */
  voltarParaPrimeiraPagina() {
    this.refs.paginate.reset();
  }

  render() {
    return (
      <div>
        <Paginate
          onNextPage={(informacoesDoPaginate) => this.proximaPagina(informacoesDoPaginate)}
          onPreviousPage={(informacoesDoPaginate) => this.paginaAnterior(informacoesDoPaginate)}
          recordsByPage={5}
          ref='paginate'
          totalSizeOfData={seusDados.length}
        />
      </div>
    );
  }

}

ExemploDePaginateSemOpcoes.displayName = 'ExemploDePaginateSemOpcoes';
export default ExemploDePaginateSemOpcoes;
