import React from 'react';
import { Filter } from 'syntec-apollo-11';

class ExemploDeFiltroSemOpcoes extends React.Component {

  /**
    * Função que recebe o valor do campo de busca.
  */
  filtrar(valorDoCampoDeBusca) { }

  render() {
    return (
      <div>
        <Filter onFilter={(valorDoCampoDeBusca) => this.filtrar(valorDoCampoDeBusca)}/>
      </div>
    );
  }
}

ExemploDeFiltroSemOpcoes.displayName = 'ExemploDeFiltroSemOpcoes';
export default ExemploDeFiltroSemOpcoes;
