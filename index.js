class Website extends React.Component {
    render() {
        return (
            <Canvas><IntroInfo></IntroInfo></Canvas>
            
        );
    }
}

class Particle {
    constructor(x, y) {
        this.x = x; // kinda used as an anchor for the sin behavior
        this.displayXPos = this.x; // where to actually show the text
        this.y = y;
        this.shouldBeDestroyed = false;

        this.possibleText = [
            "this.weon;",
            "this.displayXPos = this.x + this.getSinVal();",
            "y += this.yvel;",
            '<canvas ref="canvas" style={canvasStyling}/>',
            "const canvas = this.refs.canvas;",
            
        ]
        this.text = this.getRandomText();
        this.udpatesPassed = 0;

        this.updatesTilNextChange = null;
        this.recalculateUpdatesTilNextChange(); // calculates above
        
        this.font = ""+ (12 + Math.ceil(Math.random() * 4))+"px Courier New";
        this.yvel = (-Math.random() * 4) - 2;
        this.radVal = Math.random() * Math.PI; // offset initial val to avoid similar paths
        this.radInc = 0.05;
        this.sinAmp = 20; // how many pixels it oscillates over
    }

    update(ctx) {
        if (this.udpatesPassed % this.updatesTilNextChange == 0) {
            this.text = this.getRandomText();
            this.recalculateUpdatesTilNextChange();
        }

        this.y += this.yvel;
        this.displayXPos = this.x + this.getSinVal();

        ctx.font = this.font;
        ctx.fillText(this.text, this.displayXPos, this.y);

        this.radVal += this.radInc;
        this.udpatesPassed++;

        if (this.y <= 0) {
            this.shouldBeDestroyed = true;
        }
    }

    recalculateUpdatesTilNextChange() {
        this.updatesTilNextChange = 20 + Math.floor(Math.random() * 30);
    }

    getSinVal() {
        return Math.sin(this.radVal) * this.sinAmp;
    }

    getRandomText() {
        return this.possibleText[Math.floor(Math.random() * this.possibleText.length)];
    }
}

class Canvas extends React.Component {

    particles = [];
    
    componentDidMount() {
        var canvas = this.refs.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        ctx.font = "12px Courier New";
        ctx.textAlign = "center";

        var updates = 0;
        var updatesTilNextSpawn = 5 + Math.floor(Math.random() * 10);

        setInterval(() => {
            ctx.fillStyle = "#333333";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            
            if (updates % updatesTilNextSpawn == 0) {
                this.particles.push(new Particle(Math.random() * canvas.width, canvas.height));
            }
            for (var i = 0; i < this.particles.length; i++) {
                
                if (this.particles[i].shouldBeDestroyed) {
                    var partIndex = this.particles.indexOf(this.particles[i]);
                    this.particles.splice(partIndex, 1);
                }
                ctx.fillStyle = "#666666";
                this.particles[i].update(ctx);
            }
            console.log(this.particles);
            updates++;
        }, 60);
    }

    render() {

        const canvasStyling = {
            width: "100%",
            height: "100vh",
            "z-index": 1
        };

        return (
            <canvas ref="canvas" style={canvasStyling}/>
        );
    }

}

class IntroInfo extends React.Component {
    render() {
        const infoStyling = {
            "z-index": 2
        }

        return (
            <div ref="infoBox" style={infoStyling}>
                <img src="keon.png" />
            </div>
        );
    }
}


ReactDOM.render(<Website />, document.getElementById("root"));