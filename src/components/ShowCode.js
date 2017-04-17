/**
 * Created by gnf on 18/01/17.
 */
import React from 'react';

class ShowCode extends React.Component {

  constructor() {
    super();
    this.state = {isShowing: false}
  }

  toggle() {
    this.setState({ isShowing: !this.state.isShowing });
  }

  render() {
    return (
      <div className={this.state.isShowing ? 'dm-code-container': 'dm-code-container inactive'}>
        <div style={{display: this.state.isShowing ? 'block': 'none'}}>
          <pre className='line-number'>
            {this.props.children}
          </pre>
        </div>
        <button className='dm-code-container__button' onClick={() => this.toggle()}>
          {this.state.isShowing ? 'Esconder código': 'Mostrar código'}
        </button>
      </div>
    );
  }
}

export default ShowCode;
