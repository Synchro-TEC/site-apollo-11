import React from 'react';
import { Hermes } from 'apollo-11';

var setContext = (context) => {
  Hermes.setContext(context);
};

class ExemploContextosEPosicao extends React.Component {

	render() {
		return (
			<div>
				<Hermes />
				<button	className='sv-button small default marged' onClick={() => setContext('success')}>Contexto Sucesso</button>
        		<button className='sv-button small default marged' onClick={() => setContext('info')}>Contexto Informativo</button>
        		<button className='sv-button small default marged' onClick={() => setContext('warning')}>Contexto Aviso</button>
        		<button className='sv-button small default marged' onClick={() => setContext('error')}>Contexto Erro</button>
        		<button className='sv-button small default marged' onClick={() => Hermes.setPosition('top')}>Superior</button>
        		<button className='sv-button small default marged' onClick={() => Hermes.setPosition('bottom')}>Inferior</button>
			</div>
		);
	}

}

ExemploContextosEPosicao.displayName = 'ExemploContextosEPosicao';
export default ExemploContextosEPosicao;
