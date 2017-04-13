import React from 'react';
import { Filter } from 'apollo-11';

class FilterWithOptionsExample extends React.Component {

  constructor(props){
    super(props);
  }

  filtrando(filterValues) {
    // Faça algo com os valores do filtro.
  }

  limpandoCampos() {
    // Função para executar quando o usuário limpa os campos.
  }

  render() {
    return (
      <div>
        <Filter
            applyFilterButtonLabel='O valor do botão aplicar filtro'
            cancelButtonLabel='O valor do botão cancelar'
            clearAllButtonLabel='O valor do botão limpar filtro'
            filterButtonLabel='O valor do botão de opções do filtro'
            name='nome'
            onClearAll={() => this.limpandoCampos()}
            onFilter={(filterValues) => this.filtrando(filterValues)}>
          <label>
            <span> Nacionalidade: </span>
            <div className='sv-select'>
              <select name='nacionalidade'>
                <option value=''/>
                <option value='Itália'>Itália</option>
                <option value='Estados Unidos'>Estados Unidos</option>
                <option value='Austrália'>Austrália</option>
                <option value='Rússia'>Rússia</option>
                <option value='Nova Zelândia'>Nova Zelândia</option>
              </select>
              <label>
                <i className='fa fa-angle-down fa-fw'/>
              </label>
            </div>
          </label>
          <label>
            <span> Dia de casamento entre: </span>
            <div className='sv-row--with-gutter'>
              <div className='sv-column'>
                <label>
                  <div className='sv-select'>
                    <input
                      name='diaDoCasamentoGTE'
                      placeholder='dd/mm/yyyy'
                      type='text'
                    />
                    <label>
                      <i className='fa fa-calendar'/>
                    </label>
                  </div>
                </label>
              </div>
              <div className='sv-column'>
                <label>
                  <div className='sv-select'>
                    <input
                      name='diaDoCasamentoLTE'
                      placeholder='dd/mm/yyyy'
                      type='text'
                     />
                    <label>
                      <i className='fa fa-calendar'/>
                    </label>
                  </div>
                </label>
              </div>
            </div>
          </label>
          <label>
            <span>Sexo:</span>
          </label>
          <label>
            <input name='sexo' type='radio' value='Masculino' /> Masculino
          </label>
          <label>
            <input name='sexo' type='radio' value='Feminino' /> Feminino
          </label>
          <label>
            <span>Bens materiais: </span>
          </label>
          <label>
            <input name='bens' type='checkbox' value='bicicleta' /> Bicicleta
          </label>
          <label>
            <input name='bens' type='checkbox' value='carro' /> Carro
          </label>
          <label>
            <input name='bens' type='checkbox' value='helicóptero' /> Helicóptero
          </label>
          <label>
            <input name='bens' type='checkbox' value='mac' /> Mac
          </label>
      </Filter>
      </div>
    );
  }
}

FilterWithOptionsExample.displayName = 'FilterWithOptionsExample';

export default FilterWithOptionsExample;
