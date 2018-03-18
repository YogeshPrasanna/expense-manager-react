import React , { Component } from 'react';
import DoughnutChartCategory from './DoughnutChartCategory'
import BarChartAllMonths from './BarChartAllMonths'

class StatisticsPage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <DoughnutChartCategory expenses={this.props.expenses} authUser={this.props.user} />
                        <span className="badge badge-info">Total Expense for each category</span>
                    </div>
                    <div className="col-sm-6">
                        <BarChartAllMonths expenses={this.props.expenses} authUser={this.props.user} />
                        <span className="badge badge-info">Monthly expenses for this year</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default StatisticsPage;