class IntroScreen extends React.Component {
    render() {
        
    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        setInterval(() => {

        }, 60);
    }

    createCanvas() {
        var canvas = <canvas id="canvas"></canvas>     
    }
}


ReactDOM.render(<IntroScreen />, document.getElementById("root"));