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

    particles = [];
    
    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#333333";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    render() {

        const canvasStyling = {
            width: "100%",
            height: "100%"
        };

        return (
            <canvas ref="canvas" style={canvasStyling}/>
        );
    }

}


ReactDOM.render(<IntroScreen />, document.getElementById("root"));