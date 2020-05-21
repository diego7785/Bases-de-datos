import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';


export default class Chart extends PureComponent {

    constructor(props) {
        super(props)
        console.log(props)
    }

    state = {
        data: this.props.data,
    }
    render() {
        return (
          <BarChart
            width={500}
            height={300}
            data={this.state.data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calificacion" fill="#F50057" />
          </BarChart>
        );
      }
}
