class Website extends React.Component {
    
    
    render() {
        const introStyle = {
            margin: "0px",
            padding: "0px",
            textAlign: "center",
        }

        const contentStyle = {
            margin: "0px",
            padding: "0px",
            zIndex: "3",
            position: "relative"
        }

        const websiteStyling = {
            margin: "0px",
            padding: "0px",
            backgroundColor: "white"
        }
        return (
            <div id="website" style={websiteStyling}>
                <div id="header" style={introStyle}>
                    <Canvas></Canvas>
                    <HeaderInfo></HeaderInfo>
                </div>
                
                <div id="content" style={contentStyle}>
                    <Navbar></Navbar>
                    <Projects></Projects>
                </div>
            </div>
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
            "this.particles.push;",
            "this.text = this.getRandomText();",
            "Math.sin(this.radVal) * this.sinAmp;",
            "particles = [];",
            "this.particles[i].update(ctx);",
            "fiona smells"
            
        ]
        this.text = this.getRandomText();
        this.udpatesPassed = 0;

        this.updatesTilNextChange = null;
        this.recalculateUpdatesTilNextChange(); // calculates above
        
        this.fontSizeMin = 16;
        this.font = ""+ (this.fontSizeMin + Math.ceil(Math.random() * 4))+"px Courier New";
        this.yvel = (-Math.random() * 4) - 2;
        this.radVal = Math.random() * Math.PI; // offset initial val to avoid similar paths
        this.radInc = 0.05;
        this.sinAmp = 10 + Math.random() * 10; // how many pixels it oscillates over
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
            
            if (updates % updatesTilNextSpawn == 0) {
                this.particles.push(new Particle(Math.random() * canvas.width, canvas.height));
            }
            for (var i = 0; i < this.particles.length; i++) {
                
                if (this.particles[i].shouldBeDestroyed) {
                    var partIndex = this.particles.indexOf(this.particles[i]);
                    this.particles.splice(partIndex, 1);
                }
                ctx.fillStyle = "#9FE2BF";
                this.particles[i].update(ctx);
            }
            updates++;
        }, loopInterval);
    }

    render() {

        const canvasStyling = {
            width: "100%",
            height: "50vh",
            margin: "0px",
        };

        return (
            <canvas ref="canvas" style={canvasStyling}/>
        );
    }

}

class HeaderInfo extends React.Component {
    constructor(props) {
        super(props);
        props.nameTitle = "</>";
        props.desc = "</>";
    }

    render() {
        const infoStyling = {
            "font-family": "Consolas",
            "text-align": "center",
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: "1",
        }

        const nameStyling = {
            backgroundColor: "#9FE2BF",
            borderTopLeftRadius: "7px",
            padding: "3px",
            position: "absolute",
            top: "52%",
            left: "42%",
            
        };

        const subtextStyling = {
            color: "#000000",
            backgroundColor: "#9FE2BF",
            position: "absolute",
            top: "58%",
            left: "42%",
            padding: "4px",
            borderBottomLeftRadius: "7px"
        }

        const imageStyling = {
            width: "512px",
            height: "512px",
        }

        return (
            <div id="info" style={infoStyling}>
                <img src="head.png" style={imageStyling} />

                <h1>
                    <span style={nameStyling} ref="nameTitle">{this.props.nameTitle}</span>
                </h1>
                <span style={subtextStyling}>{this.props.desc}</span>
            </div>
        );
    }

    componentDidMount() {
        var desc = "Computer science student at ASU";
        var name = "keon davoudi";
        this.props.nameTitle = "</>";
        this.props.desc = "";

        var i = 0;
        var nameInterval = setInterval(() => {
            if (i <= name.length) {
                this.props.nameTitle = "<"+name.slice(0, i)+"/>";
                // console.log(this.props.nameTitle);
                i++;
                this.setState({});
            }
        }, 100);
        
        var j = 0;
        var descInterval = setInterval(() => {
            if (j < desc.length+1) {
                this.props.desc = desc.slice(0, j);
                j++;
                this.setState({});
                
            }
        }, 50);
    
    }
}

class Navbar extends React.Component {
    render() {
        const navbarStyle = {
            textAlign: "center",
            fontFamily: "Consolas",
            backgroundColor: "black",
            marginTop: "2vw"
        };

        const listItemStyle = {
            display: "inline-block",
            borderRadius: "0px",
            backgroundColor: "#9FE2BF",
            padding: "5px",
            margin: "8px",
        }

        const listStyle = {
            listStyle: "none",
            margin: "0px"
        }

        return (
            <div id="navbar" style={navbarStyle}>
                <ul style={listStyle}>
                    <li style={listItemStyle}><a>About</a></li>
                    <li style={listItemStyle}><a>Projects</a></li>
                    <li style={listItemStyle}><a>Contact</a></li>
                </ul>
            </div>
        );
    }
}

class ProjectLinks extends React.Component {
    renderProjectLinks() {
        var icons = [];
        for (var i = 0; i < this.props.linksArray.length; i++) {
            icons.push(<a href={this.props.linksArray[i]}>{this.createImgFromLink(this.props.linksArray[i])}</a>);
        }

        return (
            icons
        );
    }

    createImgFromLink(link) {
        
        var imgLink = "https://s2.googleusercontent.com/s2/favicons?domain="+link;
        const imgStyle = {
            margin: "3px",
            width: "16px",
            height: "16px"
        }
        return (
            <img src={imgLink} style={imgStyle} title={link}/>
        );
    }
    
    render() {
        const linksStyling = {
            borderStyle: "solid",
            float: "right",
            bottom: "0",
            padding: "1px",
        }

        return (
            <div id="links" style={linksStyling}>
                {this.renderProjectLinks()}
            </div>
        );
    }
}

class Projects extends React.Component {

    render() {
        const projectsStyling = {
            padding: "10px",
        }
        return (
            <div id="projects" style={projectsStyling}>
                <ProjectListing projTitle="FTC Robotics Competition" 
                projDesc="Code base of team ACE robotics for 2020 FTC competition." 
                projImagePath="ftc.jpg" linksArray={[
                    "https://github.com/WeonJS/Complete-Ace-Robotics-Team-Source",
                    ]}>
                    
                </ProjectListing>

                <ProjectListing projTitle="Texthole" 
                projDesc="A typing game that tests typing speed and accuracy." 
                projImagePath="texthole.png" linksArray={[
                    "https://github.com/WeonJS/texthole"
                    ]}>
                </ProjectListing>

                <ProjectListing projTitle="Community Plant" 
                projDesc="A twitter bot that grows a digital plant depending on the amount of likes, follows, and retweets it receives. No longer operating." 
                projImagePath="plant.jpg" linksArray={[
                    "https://github.com/WeonJS/Twitter-Community-Plant",
                    "https://twitter.com/CommunityPlant"
                    ]}>
                    
                </ProjectListing>

                
            </div>
        );
    }
}

class ProjectListing extends React.Component {

    render() {
        const projListingStyle = {
            margin: "5px",
            height: "10vw",
            backgroundColor: "white",
            padding: "25px",
            borderStyle: "solid",
            borderColor: "black",
            width: "42vw",
            float: "left",
            
        };

        const thumbnailStyle = {
            height: "100%",
            width: "22%",
            borderStyle: "solid",
            borderColor: "black"
        };

        const projTitleStyle = {

        };

        const projDescStyle = {
            borderLeftStyle: "solid",
            borderLeftColor: "#9FE2BF",
            borderLeftWidth: "10px",
            paddingLeft: "1vw"
        };

        const projTextStyle = {
            fontSize: "1vw",
            color: "black",
            width: "50%",
            fontFamily: "Consolas",
            display: "inline-block",
        };

        return (
            <div class="project" style={projListingStyle}>
                <img src={this.props.projImagePath} style={thumbnailStyle}/>
                <div id="projText" style={projTextStyle}>
                    <h1 style={projTitleStyle}>{this.props.projTitle}</h1>
                    <div style={projDescStyle}>
                        {this.props.projDesc}
                    </div>
                </div>
                <ProjectLinks linksArray={this.props.linksArray}></ProjectLinks>
            </div>
        );
    }
}


ReactDOM.render(<Website />, document.getElementById("root"));