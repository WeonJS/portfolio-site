
class Website extends React.Component {
    
    render() {
        const websiteStyling = {
            
        }

        const aboutInfoStyling = {
            top: "50%"
        }

        return (
            <div id="website" style={websiteStyling}>
                
            </div>
        );
    }
}

class AboutInfo extends React.Component {
    render() {
        const infoStyling = {
            fontSize: "36px",
            fontFamily: "Consolas"
        }

        const textStyling = {
            margin: "0px"
        }

        const keyWordStyling = {
            color: "#1194f0",
            margin: "0px"
        }


        return (
            <div id="info" style={infoStyling}>
                <p style={textStyling}>hi my name is</p>
                <h1 style={textStyling}><span style={keyWordStyling}>keon</span>.</h1>
                <p style={textStyling}>cs <span style={keyWordStyling}>student</span> + hobbyist at <span style={keyWordStyling}>asu</span>.</p>
            </div>
        );
    }
}

class Canvas extends React.Component {
    componentDidMount() {
        var canvas = this.refs.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight/2;

        const ctx = canvas.getContext('2d');
        ctx.font = "12px Courier New";
        ctx.textAlign = "center";

        var updates = 0;
        var updatesTilNextSpawn = 3 + Math.floor(Math.random() * 7);

        var loopInterval = 30;
        setInterval(() => {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            
        }, loopInterval);
    }

    render() {

        const canvasStyling = {
            
        };

        return (
            <canvas ref="canvas" style={canvasStyling}/>
        );
    }

}


ReactDOM.render(<Website />, document.getElementById("root"));