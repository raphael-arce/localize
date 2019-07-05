import React, {Component} from 'react'

export default class NotFound extends Component {

    render() {
        return (
            <div className="d-flex justify-content-center">
                <h3>This page {/*<code>{this.props.location.state}</code>*/} does not exist.</h3>
            </div>
        )
    }
}
