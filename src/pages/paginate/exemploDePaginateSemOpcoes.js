import React from 'react';
import { Paginate } from 'apollo-11';

class ExemploDePaginateSemOpcoes extends React.Component {

  /**
   * Chamada quando o usuário vai para uma próxima página.
  */
  proximaPagina(informacoesDoPaginate) { }

  /**
   * Chamada quando o usuário vai para uma página anterior.
  */
  paginaAnterior(informacoesDoPaginate) { }

  render() {
    return (
      <div>
        <Paginate
          onNextPage={(informacoesDoPaginate) => this.proximaPagina(informacoesDoPaginate)}
          onPreviousPage={(informacoesDoPaginate) => this.paginaAnterior(informacoesDoPaginate)}
          recordsByPage={5}
          totalSizeOfData={yourData.length}
        />
      </div>
    );
  }

}

ExemploDePaginateSemOpcoes.displayName = 'ExemploDePaginateSemOpcoes';
export default ExemploDePaginateSemOpcoes;
