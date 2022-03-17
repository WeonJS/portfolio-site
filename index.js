class IntroScreen extends React.Component {
    render() {
        return (
            <Canvas></Canvas>
            
        );
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radVal = 0;
        this.radInc = 0.05;
    }

    update() {
        y--;
        this.radVal += this.radInc;
    }

    getSinVal() {
        return Math.sin(this.radVal);
    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.props.canvas = <canvas></canvas>
        this.props.ctx = this.props.canvas.getContext('2d');
        ctx.fillRect(0, 0, 50, 50);
    }

    render() {
        return (
            this.props.canvas
        );
    }

}


ReactDOM.render(<IntroScreen />, document.getElementById("root"));