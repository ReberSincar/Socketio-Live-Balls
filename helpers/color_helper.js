const colors = ['blue', 'red', 'green', "pink", "yellow", "purple"];

const randomColor = () => { 
    return colors[Math.floor(Math.random() * colors.length)];
};

module.exports = randomColor;