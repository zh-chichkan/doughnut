import React, { Component } from 'react';
import Highcharts from 'highcharts';

class HihgChartsWrapper extends Component {
  constructor (...args) {
    super(...args);
  }

  componentDidMount () {
    if (this.props.modules) {
      this.props.modules.forEach((module) => module(Highcharts));
    }

    this.chart = new Highcharts.chart(this.props.container, this.props.options);

    const redraw = () => {
      const w = document.querySelector(`.${ this.props.parentClass }`).offsetWidth;
      const _h = document.querySelector(`.${ this.props.parentClass }`).offsetHeight;

      this.chart.setSize(w, w * (3/4));
    };

    window.addEventListener('resize', redraw);

    redraw();
  }

  componentWillReceiveProps (nextProps) {
    this.chart = new Highcharts.chart(nextProps.container, nextProps.options);
  }

  render () {
    return <div id = { this.props.container } style = { this.props.style }></div>;
  }
}

export default HihgChartsWrapper;
