import * as React from 'react'
import {Icon, Card} from 'antd'
import './NumberCard.less'
interface NumberCardState {
    number: number
}
interface NumberCardProps {
    title:string,
    color:string,
    icon:string,
    end: number,
}
export default class NumberCard extends React.Component<NumberCardProps, NumberCardState> {
    constructor(props) {
        super(props)
        this.state = {
            number: 0
        }
    }

    setNum(num: number) {
        this.setState({number: num})
    }

    render() {
        return (
            <Card className="numberCard" bordered={false} bodyStyle={{padding: 0}}>
                <Icon className="iconWrap" style={{color:this.props.color}} type={this.props.icon}/>
                <div className="content">
                    <p className="title">{this.props.title}</p>
                    <div className="number">
                        <Count end={this.props.end} number={this.state.number}
                                updateNumber={num => this.setNum(num)}/>
                    </div>
                </div>
            </Card>
        )
    }
}

interface CountState {
    curNumber: number
}
interface CountProps {
    number: number,
    end: number,
    updateNumber(num: number): void
}
class Count extends React.Component<CountProps, CountState> {
    private $timer: any;

    constructor(pros) {
        super(pros)
        this.$timer = null;
        this.state = {
            curNumber: this.props.end-100
        }
    }

    componentWillMount() {
        this.$timer = setInterval(() => {
            this.setState(state => {
                this.props.updateNumber(this.state.curNumber + 1)
                return {curNumber: state.curNumber + 1}
            })
        }, 10)
    }

    componentWillReceiveProps(nextProps) {
        let {number} = nextProps;
        if (number >= this.props.end) {
            clearInterval(this.$timer);
        }
    }

    render() {
        return <div>{this.state.curNumber}</div>
    }
}
