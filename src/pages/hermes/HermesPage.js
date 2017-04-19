import React from 'react';
import { Hermes } from 'apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';

var addMessage = () => {
  Hermes.addMessage(`Mensagem ${Date.now()}`, true);
};

var changeTitle = () => {
  Hermes.setTitle(`Novo titulo ${Date.now()}`);
};

var setContext = (context) => {
  Hermes.setContext(context);
};

const HermesPage = (props) => {

  return (
    <div className='dm-content'>
      <Hermes />
      <h3>Hermes</h3>
      <p>
        É um componente para notificações, com temas (contextos) e uma API para
        manipular as mensagens.
      </p>
      <h5 className='bold'> Adicionando uma mensagem e/ou um titulo</h5>
      <p>
        Para adicionar uma mensagem utilize o método <b>addMessage </b> da API. Por padrão,
        a mensagem vem com o contexto de informação (info) e sem título.
        Para adicionar ou alterar este titulo utilize o método <b>setTitle</b>.
      </p>
      <div className='sv-vertical-marged-25'/>
      <div className='sv-text-center'>
        <button className='sv-button small default marged' onClick={() => addMessage()}>Adicionar mensagem</button>
        <button className='sv-button small default marged' onClick={() => changeTitle()}>Adicionar/Alterar Titulo</button>
      </div>
      <div className='sv-vertical-marged-25'/>
      <ShowCode>
        <PrismCode className='language-js'>
          {require('!raw-loader!./exemploAdicionarMensagemETitulo.js')}
        </PrismCode>
      </ShowCode>
      <h5 className='bold'> Modificando um contexto e/ou uma posição</h5>
      <p>
        Para alterar o contexto, utilize o método <b> setContext </b> da API, passando
        uma das opções: <b> success </b> (sucesso), <b> info </b> (informativo),
        <b> warning </b> (aviso), <b> error </b> (erro).
        Para alterar a posição, utilize o método <b> setPosition </b> passando
        a opção <b> top </b> (cima) ou <b> bottom </b> (baixo).
      </p>
      <div className='sv-vertical-marged-25'/>
      <div className='sv-text-center'>
        <button className='sv-button small default marged' onClick={() => setContext('success')}>Contexto Sucesso</button>
        <button className='sv-button small default marged' onClick={() => setContext('info')}>Contexto Informativo</button>
        <button className='sv-button small default marged' onClick={() => setContext('warning')}>Contexto Aviso</button>
        <button className='sv-button small default marged' onClick={() => setContext('error')}>Contexto Erro</button>
        <button className='sv-button small default marged' onClick={() => Hermes.setPosition('top')}>Superior</button>
        <button className='sv-button small default marged' onClick={() => Hermes.setPosition('bottom')}>Inferior</button>
      </div>
      <div className='sv-vertical-marged-25'/>
      <ShowCode>
        <PrismCode className='language-js'>
          {require('!raw-loader!./exemploContextosEPosicao.js')}
        </PrismCode>
      </ShowCode>
    </div>
  );

};

HermesPage.displayName = 'HermesPage';
export default HermesPage;
