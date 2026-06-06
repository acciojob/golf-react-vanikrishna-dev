import React, { Component } from "react";
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderBall: false,
            posi : 0,
            ballPosition: { left: "0px" }
        };
    this.renderChoice = this.renderBallOrButton.bind(this)
    this.buttonClickHandler = this.buttonClickHandler.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.playgroundRef = React.createRef()
    };

    buttonClickHandler() {
        this.setState({ renderBall: true }, () => {
            // focus the playground so keydown events are received
            if (this.playgroundRef && this.playgroundRef.current) {
                this.playgroundRef.current.focus()
            }
        });
   }
    renderBallOrButton() {
		if (this.state.renderBall) {
		    return <div className="ball" style={this.state.ballPosition}></div>
		} else {
		    return <button className="start" onClick={this.buttonClickHandler}>Start</button>
		}
    }

        // named handler so we can add/remove listener and debug easily
        componentDidMount() {
            window.addEventListener("keydown", this.handleKeyDown)
        }

        componentWillUnmount() {
            window.removeEventListener("keydown", this.handleKeyDown)
        }

        handleKeyDown(e) {
            // respond to right arrow only
            if (e.key === "ArrowRight" || e.keyCode === 39) {
                    this.setState((prevState) => {
                        const newPos = prevState.posi + 5
                        console.log('handleKeyDown:', e.key, 'newPos=', newPos)
                        return {
                            posi: newPos,
                            ballPosition: { left: newPos + "px" }
                        }
                    })
            }
        }

    render() {
        return (
            <div className="playground" ref={this.playgroundRef} tabIndex="0">
                {this.renderBallOrButton()}
                <div style={{marginTop: '120px'}}>Position: {this.state.posi}</div>
            </div>
        )
    }
}


export default App;
