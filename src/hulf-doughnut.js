import React, { Component } from 'react';
import HihgChartsWrapper from './hihg-charts-wrapper';

class HalfDoughnut extends Component {
  constructor (...args) {
    super(...args);

    this.state = {
      options: {}
    }
  }

  render () {
    return (
      <div className="chart-wrapper" style={ this.props.style }>
        <HihgChartsWrapper parentClass="chart-wrapper" container={ this.props.id } options={ this._createChartConfig() }/>
      </div>
    );
  }

  _createChartConfig () {
    const { title, data, dataPoints } = this.props.data;

    return {
      chart: {
        margin: [0,0,0,0],
        spacing: [0,0,0,0],
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: true
      },
      title: {
        margin: 0,
        text: title,
        align: 'center',
        verticalAlign: 'middle',
        y: 0,
        size: '100%'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          margin: [0,0,0,0],
          spacing: [0,0,0,0],
          dataLabels: false,
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '50%'],
          size: '100%'
        }
      },
      legend: {
        layout: 'horizontal',
        verticalAlign: 'middle',
        labelFormatter: function () { return `${ this.name }: ${ Math.ceil(((this.y * 100) / dataPoints) * 100 )/100 }%`; },
        y: 60
      },
      series: [{
        type: 'pie',
        name: title,
        innerSize: '85%',
        data: data
      }],
    };
  }
}

export default HalfDoughnut;
