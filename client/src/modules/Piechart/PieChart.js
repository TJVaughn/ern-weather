import React, { Component } from 'react';
import Pie from './Pie'
class PieChart extends Component {
	static defaultProps = {
		colors: [
			'#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C'
		],
		startAngle: 270,
		stroke: '#0000',
		strokeWidth: 1,
		radius: 100,
		animate: true,
		hole: 55
	}

	// componentDidMount() {
	// 	setInterval(function () {
	// 		let data = this.props.data
	// 		this.setState({ data });

	// 	}.bind(this), 5000);
	// }

	render() {
		return (
		  <div>

			<Pie
				data={ this.props.data }
				radius={ this.props.radius }
				hole={ this.props.hole }
				colors={ this.props.colors }
				strokeWidth={ this.props.strokeWidth }
				stroke={this.props.stroke}
				content={this.props.content}
				fill={'#fff'}
				startAngle={this.props.startAngle}
				animate={this.props.animate}
			/>

		</div>
		);
	}
};

export default PieChart;