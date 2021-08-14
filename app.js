const app = Vue.createApp({
    data() {
        return {
            projects: [
                {
                    title: "Sample Proj",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique nisl tempor fermentum aliquet. Praesent ligula arcu, suscipit et posuere at, cursus sed turpis. Donec congue vitae magna et venenatis. Donec sed blandit nisl, et posuere magna. Maecenas ante lorem, consectetur nec accumsan eu, tempor quis est. In pretium sollicitudin ante, ac euismod turpis rutrum eu. Nunc ut fermentum magna, vitae ornare erat. Nunc in feugiat urna. Donec in sapien dolor. Aenean vel lobortis dui. Maecenas feugiat ligula vitae arcu posuere, a tempor quam elementum",
                    imgLink: "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg"
                },
                {
                    title: "Sample v2",
                    desc: "Donec quis consequat augue. Phasellus commodo condimentum tincidunt. Donec est nunc, porttitor ac scelerisque sed, sollicitudin volutpat magna. Etiam tristique sollicitudin dictum. Vestibulum non enim a lacus viverra fermentum. Aenean enim diam, rhoncus ut consectetur ut, congue ac est. Donec laoreet urna id massa efficitur, sed luctus purus porta. Pellentesque eu nisl vel enim vulputate luctus at eu nulla. Cras felis quam, semper at arcu nec, bibendum consequat erat.",
                    imgLink: "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg"
                }
            ]
        }
    },
    methods: {
        changeTitle(title) {
            this.title = title;
        }
    }
});

app.component('glitchtext', {
    props: ['txt', 'freq', 'colorglitch', 'textglitch', 'positionglitch', 'typeout', 'typeoutspeed', 'delay'],
    template: `<p></p>`,
    data() {
        return {
            typed: false
        }
    },
    mounted() {
        if (this.txt !== null) {
            setTimeout(() => {
                if (this.typeout === 'true') {
                    this.typeOut();
                }
            }, this.delay);
            
        } else {
            // do nothing lul because no text to glitch
        }
        
    },
    methods: {
        addLetter(l) {
            this.$el.innerHTML += l;
        },
        typeOut() {
            var c = this.txt.split("");
            var i = 0;
            var typeoutInterval = setInterval(() => {
                this.addLetter(c[i]);
                if (this.$el.innerHTML.length === c.length) {
                    clearInterval(typeoutInterval);
                    this.typed = true;
                    
                }
                i++;
                
            }, 500 / this.typeoutspeed);
        }
    }
})

app.mount("#app");