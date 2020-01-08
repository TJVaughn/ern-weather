import React, { Component } from 'react';
import Pie from './Pie'
class PieChart extends Component {
	static defaultProps = {
		colors: [
			'#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C'
		],
		startAngle: 270,
		stroke: '#0000'
	}

	componentDidMount() {
		setInterval(function () {
			let data = this.props.data
			this.setState({ data });

		}.bind(this), 5000);
	}

	render() {
		return (
		  <div>

			<Pie
				data={ this.props.data }
				radius={ 100 }
				hole={ 55 }
				colors={ this.props.colors }
				strokeWidth={ 1 }
				stroke={this.props.stroke}
				content={this.props.content}
				fill={'#fff'}
				startAngle={this.props.startAngle}
			/>

		</div>
		);
	}
};

export default PieChart;