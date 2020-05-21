import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



export default class Chart extends PureComponent {

    constructor(props){
        super(props)
        console.log(props)
    }

    state = {
        data: this.props.data,
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

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
                <XAxis dataKey="labor_nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="labores" fill="#5E72E4" />
            </BarChart>
        );
    }
}
