
class Website extends React.Component {
    
    render() {
        const websiteStyling = {
            
        }

        return (
            <div id="website" style={websiteStyling}>
                <InfoSection></InfoSection>
                <VisualSection></VisualSection>
            </div>
        );
    }
}

class InfoSection extends React.Component {
    
    
    render() {

        var infoStyling = {
            width: "35%",
            // borderStyle: "solid", 
            position: "absolute",
            top: "30vh",
            fontFamily: "Arial",
        }

        var headerStyle = {
            fontSize: "5vw",
            margin: "10px"
        }

        var subtextStyle = {
            margin: "10px",
            color: "#575757",
            letterSpacing: "2px",
            wordSpacing: "5px"
        }

        var learnMoreStyle = {
            backgroundColor: "#383d39",
            color: "white",
            borderStyle: "none",
            padding: "10px",
            marginLeft: "10px",
            borderRadius: "10px"
        }

        var contactStyle = {
            borderStyle: "solid",
            borderColor: "#383d39",
            padding: "8px",
            marginLeft: "10px",
            borderRadius: "10px",
            backgroundColor: "#dae3da"
        }


        return (
            <div id="info" style={infoStyling}>
                <h1 style={headerStyle}>I'm Keon.</h1>
                <p style={subtextStyle}>I am a sohpomore <strong>computer science</strong> student at Arizona State Univeristy. 
                    I've been interested in programming for a while. I am excited to elevate my passion into a professional career.
                </p>
                <button style={learnMoreStyle}>Learn More</button>
                <button style={contactStyle}>Contact</button>
            </div>
        );
    }
}

class Point {
    constructor(rot, canvas) {
        this.minRadius = canvas.width*0.2;
        this.maxRadius = canvas.width/2 - this.minRadius;
        this.pos = {x: 0, y: 0};
        this.radiusTheta = Math.random() * (Math.PI * 2); // random value in period of sin, changes radius with sin wave
        this.rotation = rot; // rotation in radians
        this.radius =  this.minRadius + this.maxRadius * ((Math.sin(this.radiusTheta) + 1)/2);;
        this.time = 0;
        this.rate = 0.0005 + Math.random()/400;
    }
    
    update() {
        this.radius =  this.minRadius + this.maxRadius * ((Math.sin(this.radiusTheta) + 1)/2);
        this.pos.x = this.radius * Math.cos(this.rotation);
        this.pos.y = this.radius * Math.sin(this.rotation);
        this.time += this.rate;
        this.radiusTheta += this.rate;
    }
}

class VisualSection extends React.Component {
    
    render() {

        var imgStyle = {
            width: "25%",
            position: "absolute",
            left: "55%",
            top: "27%"
        }

        var canvasStyle = {
            position: "absolute",
            left: "45%",
            top: "07%"
        }

        return (
            <div id="visuals">
                <canvas ref="canvas" style={canvasStyle} width="640px" height="640px">
                    
                </canvas>
                <img src="code.png" style={imgStyle}></img>
            </div>
        );
    }

    componentDidMount() {
        var canvas = this.refs.canvas;
        
        const ctx = canvas.getContext('2d');

        var numPoints = 12;
        var points = [];

        for (var i = 0; i < numPoints; i++) {
            var randomRot = (i / numPoints) * (Math.PI * 2);
            points.push(new Point(randomRot, canvas));
        }

        setInterval(() => {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            

            ctx.fillStyle = "#abffab";
            ctx.beginPath();
            for (var i = 0; i < points.length; i++) {
                points[i].update();
                ctx.lineTo(points[i].pos.x+canvas.width/2, points[i].pos.y+canvas.height/2);
                
            }
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#909990";
            
            for (var i = 0; i < points.length; i++) {
                ctx.beginPath();
                ctx.arc(points[i].pos.x+canvas.width/2, points[i].pos.y+canvas.height/2 , 5, 5, 0, 2 * Math.PI);
                ctx.fill();
            }


            ctx.fillStyle = "#363b36";
            ctx.beginPath();
            ctx.ellipse(canvas.width/2, canvas.height*0.66, canvas.width*0.4, canvas.height*0.05, 0, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
            
            
        }, 10)
    }
}


ReactDOM.render(<Website />, document.getElementById("root"));