import React, { Component } from 'react'
import Slice from './Slice'

class Pie extends Component {
	static defaultProps = {
		startAngle: 270
	}

	render() {
		var colors = this.props.colors,
			colorsLength = colors.length,
			labels = this.props.labels,
			hole = this.props.hole,
			radius = this.props.radius,
			diameter = radius * 2,
			self = this,
      		// content = this.props.content,
			sum, startAngle;

		sum = this.props.data.reduce(function (carry, current) { return carry + current }, 0);
		startAngle = this.props.startAngle;


		return (
			<svg width={ diameter } height={ diameter } viewBox={ '0 0 ' + diameter + ' ' + diameter } xmlns="http://www.w3.org/2000/svg" version="1.1">
				{ this.props.data.map(function (slice, sliceIndex) {
					var angle, nextAngle, percent;

					nextAngle = startAngle;
					angle = (slice / sum) * 360;
					percent = (slice / sum) * 100;
					startAngle += angle;

					return <Slice
						key={ sliceIndex }
						value={ slice }
						percent={ self.props.percent }
						percentValue={ percent.toFixed(1) }
						startAngle={ nextAngle }
						angle={ angle }
						radius={ radius }
						hole={ radius - hole }
						trueHole={ hole }
						showLabel= { labels }
						fill={ colors[sliceIndex % colorsLength] }
						stroke={ self.props.stroke }
						strokeWidth={ self.props.strokeWidth }
            content={self.props.content}
					/>
				}) }

			</svg>
      
		);
	}
};

export default Pie;