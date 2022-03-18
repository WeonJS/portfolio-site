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
    
    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillRect(0,0,50,50);
    }

    render() {
        return (
            <canvas ref="canvas"/>
        );
    }

}


ReactDOM.render(<IntroScreen />, document.getElementById("root"));