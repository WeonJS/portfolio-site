const app = Vue.createApp({
    data() {
        return {
            projects: [
                {
                    title: "Sample Proj",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique nisl tempor fermentum aliquet. Praesent ligula arcu, suscipit et posuere at, cursus sed turpis. Donec congue vitae magna et venenatis. Donec sed blandit nisl, et posuere magna. Maecenas ante lorem, consectetur nec accumsan eu, tempor quis est. In pretium sollicitudin ante, ac euismod turpis rutrum eu. Nunc ut fermentum magna, vitae ornare erat. Nunc in feugiat urna. Donec in sapien dolor. Aenean vel lobortis dui. Maecenas feugiat ligula vitae arcu posuere, a tempor quam elementum",
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

app.mount("#app");