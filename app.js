
(function() {
    'use strict';
    
    const gridContainer = document.getElementsByClassName('game-container')[0];
    
    const backgroundImage = {
        'background-question-image': 'images/question.png',
        'background-diamond-image': 'images/diamond.png',        
        'background-question-position': '600px',
        'background-diamond-position': '5px',        
        'background-size': 'contain',
        'background-repeat': 'no-repeat'
    };

    let flippedCount = 0;
    let randomPositions = [];
    let maxScore;

   
    function generateRandomNumbers() {
        const totalDiamonds  = 8;
        
        
        randomPositions.length = 0;
        
        for (let index = 0; index < totalDiamonds; index++ ) {
            let position = Math.ceil(Math.random() * 61);
            
            if (randomPositions.includes(`box-${position}`)) {
                console.log('prevent repeating numbers');
                continue;
            }
            randomPositions.push(`box-${position}`);
        }

        if (randomPositions.length !== 8) {
            let length = 8 - randomPositions.length;
            for (let index = 1; index <= length; index++) {
                randomPositions.push(`box-${61 + index}`);
            }
        }
        console.log(randomPositions);
    }

   
    function init() {
        console.info('loading the basic setup');
        
        
        flippedCount = 0;
        maxScore = 56;

        
        generateRandomNumbers();
        
        for (let gridItem of gridContainer.children) {
            // adds Eventlistener for flipping the image
            gridItem.addEventListener('click', flipImage);
            
            let box = gridItem.getAttribute('id');
            
            // adds multiple background image to few boxes with both question and diamond
            // and remaining with single question background        
            if (randomPositions.includes(box)) {
                gridItem.style.backgroundImage      = `url(${backgroundImage['background-diamond-image']}), url(${backgroundImage['background-question-image']})`;
                gridItem.style.backgroundPosition   = `${backgroundImage['background-question-position']}, ${backgroundImage['background-diamond-position']}`;
                gridItem.style.backgroundSize       = `${backgroundImage['background-size']}`;
                gridItem.style.backgroundRepeat     = `${backgroundImage['background-repeat']}`;
            } else {
                gridItem.style.backgroundImage      = `url(${backgroundImage['background-question-image']})`;
                gridItem.style.backgroundPosition   = `center`;
                gridItem.style.backgroundSize       = `${backgroundImage['background-size']}`;
                gridItem.style.backgroundRepeat     = `${backgroundImage['background-repeat']}`;
            }
        }

        console.info('Apps loads with the basic layout and setup');
    }

    function flipImage(event) {        
        
        let id = event.target.id;
        let element = document.getElementById(id);
        
        if (randomPositions.includes(id)) {
            flippedCount++;
            if (flippedCount !== 8) {                
                element.style.backgroundPosition = `
                    ${backgroundImage['background-diamond-position']},
                    ${backgroundImage['background-question-position']}
                `;          
            } else {
                element.style.backgroundPosition = `
                    ${backgroundImage['background-diamond-position']},
                    ${backgroundImage['background-question-position']}
                `;
                element.removeEventListener('click', flipImage);
                calculateScore(maxScore);
                init();
                return;
            }
            
        } else {
            maxScore--;
            element.style.background = 'none';
        }

        element.removeEventListener('click', flipImage);
    }

    function calculateScore(total) {
        
        let template = document.getElementById('template');
        let score = document.getElementById('current-score');

        template.style.display = 'block';
        score.innerHTML = `Your Score is ${total}`;
    }

    init();
})();
