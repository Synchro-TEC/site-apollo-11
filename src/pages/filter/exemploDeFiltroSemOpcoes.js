import React from 'react';
import { Filter } from 'apollo-11';

class ExemploDeFiltroSemOpcoes extends React.Component {

  /**
    * Função que recebe o valor do campo de busca.
  */
  filtrando(valorDoCampoDeBusca) { }

  render() {
    return (
      <div>
        <Filter name='filtroSimples' onFilter={(valorDoCampoDeBusca) => this.filtrando(valorDoCampoDeBusca)}/>
      </div>
    );
  }
}

ExemploDeFiltroSemOpcoes.displayName = 'ExemploDeFiltroSemOpcoes';
export default ExemploDeFiltroSemOpcoes;
