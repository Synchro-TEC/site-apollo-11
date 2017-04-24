import React from 'react';
import { Hermes } from 'apollo-11';

/**
  * Função que adiciona uma mensagem.
 */
var adicionarMensagem = () => {
  Hermes.addMessage(`Mensagem ${Date.now()}`, true);
};

/**
  * Função que adiciona ou altera o titulo da mensagem.
 */
var adicionarTitulo = () => {
  Hermes.setTitle(`Novo titulo ${Date.now()}`);
};

class ExemploAdicionarMensagemETitulo extends React.Component {

	render() {
		return (
			<div>
				<Hermes />
				<button className='sv-button small default marged' onClick={() => adicionarMensagem()}> Adicionar mensagem </button>
				<button className='sv-button small default marged' onClick={() => adicionarTitulo()}> Adicionar/Alterar titulo </button>
			</div>
		);
	}

}

ExemploAdicionarMensagemETitulo.displayName = 'ExemploAdicionarMensagemETitulo';
export default ExemploAdicionarMensagemETitulo;
