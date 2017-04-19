import React from 'react';
import { Hermes } from 'apollo-11';

var addMessage = () => {
  Hermes.addMessage(`Mensagem ${Date.now()}`, true);
};

var changeTitle = () => {
  Hermes.setTitle(`Novo titulo ${Date.now()}`);
};

class ExemploAdicionarMensagemETitulo extends React.Component {

	render() {
		return (
			<div>
				<Hermes />
				<button className='sv-button small default marged' onClick={() => addMessage()}> Adicionar mensagem </button>
				<button className='sv-button small default marged' onClick={() => changeTitle()}> Adicionar/Alterar titulo </button>
			</div>
		);
	}

}

ExemploAdicionarMensagemETitulo.displayName = 'ExemploAdicionarMensagemETitulo';
export default ExemploAdicionarMensagemETitulo;
