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
        ctx.fillStyle = "#333333";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    render() {

        const canvasStyling = {
            padding: "0px",
            margin: "0px",
            width: "100vw",
            height: "100vh"
        };

        return (
            <canvas ref="canvas" style={canvasStyling}/>
        );
    }

}


ReactDOM.render(<IntroScreen />, document.getElementById("root"));