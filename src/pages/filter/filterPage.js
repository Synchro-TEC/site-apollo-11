/**
 * Created by gnf on 11/01/17.
 */
import React from 'react';
import { Filter, DataTable, DataTableColumn } from 'syntec-apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import _assign from 'lodash/assign';

class FilterPage extends React.Component {

  constructor() {
    super();
    this.immutableData = [
      {
        name: 'Lorraine Barros',
        nationality: 'Rússia',
        gender: 'Feminino',
        weddingDay: '02/03/2017',
        wordlyGoods: 'Bicicleta, carro, helicóptero, mac',
        hadABike: true,
        hadACar: true,
        hadAHelicopter : true,
        hadAMac: true,
      },
      {
        name: 'Núbia Xavier',
        nationality: 'Estados Unidos',
        gender: 'Feminino',
        weddingDay: '28/02/2010',
        wordlyGoods: 'Helicóptero',
        hadAHelicopter : true,
        hadAMac: false,
        hadABike: false,
        hadACar: false,
      },
      {
        name: 'Vitória Braga Filho',
        nationality: 'Austrália',
        gender: 'Feminino',
        weddingDay: '08/02/2005',
        wordlyGoods: 'Bicicleta',
        hadABike: true,
        hadAMac: false,
        hadACar: false,
        hadAHelicopter : false,
      },
      {
        name: 'Ladislau Braga',
        nationality: 'Nova Zelândia',
        gender: 'Masculino',
        weddingDay: '10/01/2000',
        hadABike: true,
        hadAMac: true,
        hadAHelicopter : false,
        hadACar: false,
        wordlyGoods: 'Bicicleta, mac',
      },
      {
        name: 'Pedro Saraiva',
        nationality: 'Itália',
        gender: 'Masculino',
        weddingDay: '07/07/1996',
        wordlyGoods: 'Bicicleta, carro, helicóptero',
        hadABike: true,
        hadACar: true,
        hadAHelicopter : true,
        hadAMac: false,
      },
    ];

    this.state = {
      dataFoundByFilterWithoutOptions: this.immutableData,
      dataFoundByFilterWithOptions: this.immutableData,      
    };

    this.filterValues = {};
  }

  /**
   * toDate - description
   * Converte uma data dd/mm/aaaa para o formato padrão do tipo date: mm/dd/aaaa,
   * para conseguir instanciar uma data com este valor.
   * @param  {type} dateToConvert description
   * @return {type}               description
   */
  toDate(dateToConvert) {
    if(dateToConvert) {
      const regExp = new RegExp('([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})');
      return new Date(dateToConvert.replace(regExp, '$2/$1/$3'));
    }
  }

  /**
   * findDatesLesserThan - description
   * Retorna os dados com data menor do que a data recebida
   * @param  {type} date description
   * @return {type}      description
   */
  findDatesLesserThan(dateLTE) {
    return _filter(this.immutableData, (item) => {
      return dateLTE >= this.toDate(item.weddingDay);
    });
  }

  /**
   * findDatesGreaterThan - description
   * Retorna os dados com data maior do que a data recebida
   * @param  {type} date description
   * @return {type}      description
   */
  findDatesGreaterThan(dateGTE) {
    return _filter(this.immutableData, (item) => {
      return dateGTE <= this.toDate(item.weddingDay);
    });
  }

  /**
   * findDatesBetween - description
   * Retorna os dados com data entre as duas datas recebidas 
   * @param  {type} dateLTE description
   * @param  {type} dateGTE description
   * @return {type}         description
   */
  findDatesBetween(dateLTE, dateGTE) {
    return _filter(this.immutableData, (item) => {
      let itemWeddingDay = this.toDate(item.weddingDay);
      return dateGTE <= itemWeddingDay && dateLTE >= itemWeddingDay;
    });
  }

  /**
   * findByName - description
   * Busca pelo nome no array recebido e retorna o array filtrado caso o nome passado
   * nao seja vazio, caso seja, os dados são retornados sem filtro
   * @param  {type} name description
   * @param  {type} data description
   * @return {type}      description
   */
  findByName(name, data) {
    if(name && name !== '') {
      return _filter(data, (item) => {
        return item.name.includes(name);
      });
    } else {
      return data;
    }
  }

  doAdvancedFilter(value) {    
    let foundData = this.immutableData;

    let dateGTE = this.toDate(this.refs.weddingDayGTE.value);
    let dateLTE = this.toDate(this.refs.weddingDayLTE.value);

    if(!dateLTE && dateGTE) {        
      foundData = this.findDatesGreaterThan(dateGTE);        
    } else if(dateLTE && !dateGTE) {        
      foundData = this.findDatesLesserThan(dateLTE);        
    } else if(dateLTE && dateGTE) {
      foundData = this.findDatesBetween(dateLTE, dateGTE);              
    }

    if(!_isEmpty(foundData)) {
      foundData = this.findByName(value, foundData);
    } else {
      foundData = this.findByName(value, this.immutableData);
    }

    if(!_isEmpty(this.filterValues)) {
      foundData = _filter(foundData, this.filterValues);      
    }

    this.setState({
      dataFoundByFilterWithOptions: foundData,
    });    
  }

  simpleFilter(value) {    
    this.setState({
      dataFoundByFilterWithoutOptions: this.findByName(value, this.immutableData),
    });
  }

  clearAll(value) {    
    this.filterValues = {};
    this.refs.mac.checked = false;
    this.refs.car.checked = false;
    this.refs.helicopter.checked = false;
    this.refs.bike.checked = false;
    this.refs.male.checked = false;
    this.refs.female.checked = false;
    this.refs.weddingDayGTE.value = '';
    this.refs.weddingDayLTE.value = '';
    this.refs.nationality.value = '';    
    this.doAdvancedFilter(value);    
  }

  mountWordlyGoodsObject(value) {
    let hadABike = this.refs.bike.checked; 
    let hadACar = this.refs.car.checked;
    let hadAMac = this.refs.mac.checked;
    let hadAHelicopter = this.refs.helicopter.checked;

    if(hadABike || hadACar || hadAMac || hadAHelicopter) {
      let wordlyGoods = _assign({
        hadABike: hadABike, 
        hadACar: hadACar, 
        hadAMac: hadAMac, 
        hadAHelicopter : hadAHelicopter, 
      }, {});  
      this.filterValues = _assign(this.filterValues, wordlyGoods);  
    }           
  }

  mountFilterObject(value) {              
    this.filterValues = _assign(this.filterValues, value);
    if(value['nationality'] == '') {
      delete this.filterValues['nationality'];
    }        
    delete this.filterValues['wordlyGoods'];
  }

  render() {        
    return (
      <div className='dm-content'>
        <h3>Filter</h3>
        <p>
          Quando o filtro é aplicado, a propriedade chamada <b> onFilter </b> retorna o valor
          do campo de busca. Quando o campo de busca é limpo, a mesma função da propriedade
          onFilter é executada retornando um valor vazio.
        </p>
        <h5 className='bold'>
          Filtro com opções
        </h5>
        <p>
          Você pode configurá-las do jeito que quiser, basta colocar as opções dentro do
          componente. Com esta configuração, existirá uma propriedade chamada <b> onClearAll </b>
          que executará a função recebida como propriedade quando as opções do filtro forem limpas
          e retornará o valor do campo de busca.
        </p>
        <Filter
          onClearAll={(value) => this.clearAll(value)}
          onFilter={(value) => this.doAdvancedFilter(value)}          
          placeholder='Buscar por nome...'>
          <label>
            <span> Nacionalidade: </span>
            <div className='sv-select'>
              <select 
                onChange={(e) => this.mountFilterObject({'nationality': e.target.value})}
                ref='nationality'>
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
                  <input
                    placeholder='dd/mm/yyyy'
                    ref='weddingDayGTE'
                    type='text'
                  />                  
                </label>
              </div>
              <div className='sv-column'>
                <label>                  
                  <input
                    placeholder='dd/mm/yyyy'
                    ref='weddingDayLTE'
                    type='text'
                   />                    
                </label>
              </div>
            </div>
          </label>
          <label>
            <span>Sexo:</span>
          </label>
          <label>
            <input              
              name='gender'
              onChange={(e) => this.mountFilterObject({'gender': e.target.value})}
              ref='male'        
              type='radio'
              value='Masculino'
            /> Masculino
          </label>
          <label>
            <input              
              name='gender'        
              onChange={(e) => this.mountFilterObject({'gender': e.target.value})}
              ref='female'
              type='radio' 
              value='Feminino' 
            /> Feminino
          </label>
          <label>
            <span>Bens materiais: </span>
          </label>
          <label>
            <input              
              onChange={() => this.mountWordlyGoodsObject()}
              ref='bike'
              type='checkbox'
              value='bike'
            /> Bicicleta
          </label>
          <label>
            <input               
              onChange={() => this.mountWordlyGoodsObject()}
              ref='car' 
              type='checkbox' 
              value='car' 
            /> Carro
          </label>
          <label>
            <input                
              onChange={() => this.mountWordlyGoodsObject()}
              ref='helicopter' 
              type='checkbox' 
              value='helicóptero' 
            /> Helicóptero
          </label>
          <label>
            <input              
              onChange={() => this.mountWordlyGoodsObject()} 
              ref='mac'
              type='checkbox' 
              value='mac' 
            /> Mac
          </label>
        </Filter>
        <div className='sv-vertical-marged-15'/>
        <DataTable data={this.state.dataFoundByFilterWithOptions}>
          <DataTableColumn dataKey='name'>Nome</DataTableColumn>
          <DataTableColumn dataKey='nationality'>Nacionalidade</DataTableColumn>
          <DataTableColumn dataKey='gender'>Sexo</DataTableColumn>
          <DataTableColumn dataKey='weddingDay'>Dia do Casamento</DataTableColumn>
          <DataTableColumn dataKey='wordlyGoods'>Bens</DataTableColumn>
        </DataTable>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDeFiltroComOpcoes.js')}
          </PrismCode>
        </ShowCode>        
        <div className='sv-vertical-marged-25'/>
        <h5 className='bold'>
          Filtro simples
        </h5>
        <p>
          Com esta configuração você obterá o valor atual do campo de busca a 
          partir da propriedade onFilter, assim que usuário começa a digitar.          
        </p>
        <Filter
          onFilter={(value) => this.simpleFilter(value)}
          placeholder='Buscar por nome...'
        />
        <div className='sv-vertical-marged-15'/>
        <DataTable data={this.state.dataFoundByFilterWithoutOptions}>
          <DataTableColumn dataKey='name'>Nome</DataTableColumn>
          <DataTableColumn dataKey='nationality'>Nacionalidade</DataTableColumn>
          <DataTableColumn dataKey='gender'>Sexo</DataTableColumn>
          <DataTableColumn dataKey='weddingDay'>Dia do casamento</DataTableColumn>
          <DataTableColumn dataKey='wordlyGoods'>Bens</DataTableColumn>
        </DataTable>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDeFiltroSemOpcoes.js')}
          </PrismCode>
        </ShowCode>
      </div>
    );
  }
}

FilterPage.displayName = 'FilterPage';
export default FilterPage;
