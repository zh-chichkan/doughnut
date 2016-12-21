import React, { Component } from 'react';
import HalfDoughnut from '../../lib/Library';
import apiData from '../api/view.json';
import Select from 'react-simple-select';


class App extends Component {
  constructor (...args) {
    super(...args);

    this.state = {
      chartData: []
    };

    this._getData();
  }

  componentDidMount () {
    this.setState({ chartData: this.data[0] });
  }

  render () {
    const style = {
      maxWidth: '50%'
    };

    const itemFilter = (item) => { return { key: item.id, value: this.data.indexOf(item), label: item.title }; };
    const onChange = (e) => { this.d = this.data[e.target.value]; this.setState({ chartData: [this.data[e.target.value]] }); };

    return (
      <div>
        <Select items={ this.data } itemFilter={ itemFilter } onChange={ onChange }>
        </Select>
        <HalfDoughnut id="chart" data={ this.d  } style={ style }/>
      </div>
    );
  }

  _getData () {
    const res = apiData['demographic-campaign-info'][0].VIEW;

    this.data = [];

    for (let key in res) {
      if (res.hasOwnProperty(key)) {
        const value = res[key];

        if (Object.prototype.toString.call(value) === "[object Object]") {
          this.data.push(this._parse(key, value));
        }
      }
    }

    this.d = this.data[0];
  }

  _parse (key, item) {
    let title = key.split(/(?=[A-Z])/).join(' ');
    title = title[0].toUpperCase() + title.slice(1);

    return {
      id: key,
      title: title,
      data: item.values.map((item) => { return { name: item.key, y: item.amount }; }),
      dataPoints: item.total
    };
  }
}

export default App;
