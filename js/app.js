const time = document.getElementById('timer');
function myCallback() {
	if(time.classList.contains('done')){
		var data = time.innerHTML;
		console.log("data" + data);
		var s = Number(data);
		var insert = s + 1;
		time.innerHTML = insert;
	}
    
}


//icons to be compared
const icons = ["fa-anchor","fa-anchor","fa-android","fa-android",
"fa-apple","fa-apple","fa-balance-scale","fa-balance-scale",
"fa-amazon","fa-amazon","fa-ban",
"fa-ban","fa-ambulance","fa-ambulance","fa-bell", "fa-bell"];


/* reset the game*/
const resett = document.getElementById('reset');
resett.addEventListener('click',function(){
	reset();
	setTimeout(function(){
		randomAiconsAgain();
            }, 200);
	
});


function starGreen(){
	for(let i =0; i < stars.length; i++){
		stars[i].style.color = 'green';
	}
}


function reset(){
	document.getElementById('currentMove').innerHTML='Moves';
	moves = 0;
	time.innerHTML= 0;
	time.classList.remove('done');
	clearInterval(intervalID);
	userClicks = 0;
	starGreen();
	for(let j = 0; j < cardCollections.length; j++){
			cardCollections[j].classList.remove('flipped');
			cardCollections[j].style.backgroundColor ='cyan';
		}
	collectGreen =[];
	clickedCards = [];    
}


const stars = document.querySelectorAll('.fa-star');
let userClicks = 0; /*keep track of user clicks*/
const playAgain = document.getElementById('btn-play-again');


playAgain.addEventListener('click',function(){
	document.getElementById('currentMove').innerHTML='Moves';
	moves = 0;
	document.getElementById('your-seconds').innerHTML="you made it in ";
	time.innerHTML= 0;
	time.classList.remove('done');
	clearInterval(intervalID);
	userClicks = 0;
	starGreen();
	document.getElementById('play-again').style.top='-9999px';
	if(collectGreen.length == 16){
		for(let j = 0; j < collectGreen.length; j++){
			collectGreen[j].classList.remove('flipped');
			collectGreen[j].style.backgroundColor ='cyan';
		}
		setTimeout(function(){
            randomAiconsAgain();
            }, 500);
	}
    collectGreen=[];
})

var num = icons.length;

/*generate random numbers*/
function getRandomInt(num){
	return Math.floor(Math.random() * Math.floor(num));
}


var backIcons = document.querySelectorAll(".back");
console.log(backIcons);


/*generate random icons*/
function randomAiconsAgain(){
	removeIcons();
	let usednums = [];
    for(let i = 0; i < backIcons.length;i++){
	    let x = getRandomInt(num);
	    while(usednums.includes(x)){
		    x = getRandomInt(num)
	    }
	usednums.push(x);
    let randomIcon = icons[x];
	backIcons[i].lastElementChild.classList.add('fa',randomIcon);
  }

}

/*to remove any class in backIcons' last child*/
function removeIcons(){
	for(let i =0;i <backIcons.length;i++){
		backIcons[i].lastElementChild.className ='';
	}
}

var cardCollections = document.getElementsByClassName("card");
console.log(cardCollections);
var intervalID;
var moves = 0;
var clickedCards=[];
function makeClick(card){
	card.addEventListener('click',function(){
		if(userClicks % 2 == 0){
			moves +=1;
			document.getElementById('currentMove').innerHTML=moves+ ' '+'Moves';
		}
		console.log('aaaw'+userClicks)
		if(time.classList.contains('done') == false && userClicks == 0){
			intervalID = window.setInterval(myCallback, 1000);
	    }
	    time.classList.add('done');

		if(userClicks >= 30 && userClicks <= 50){
			document.getElementById('star-five').firstElementChild.style.color='white';
			
		}
		if(userClicks >= 50 && userClicks <= 60){
			document.getElementById('star-four').firstElementChild.style.color='white';
		}

		if(userClicks >= 65 && userClicks <= 80){
			document.getElementById('star-three').firstElementChild.style.color='white';
			document.getElementById('star-two').firstElementChild.style.color='white';
		}
		if(!card.classList.contains('flipped')){
			userClicks += 1;
		}
		
	    console.log(userClicks);
		if(card.classList.value == "card flipped"){
			return;
		}
		card.classList.add('flipped');
		var clickedCardId = card.id;
		clickedCards.push(clickedCardId);
		if(clickedCards.length == 2){
			setTimeout(function(){ /* waiting 500ms then call matching*/
            matching();
            }, 500);
		}


	});

}

for (var i = 0; i < cardCollections.length; i++) {
	makeClick(cardCollections[i]);
}

var matchingCards= [];/*only two cards to be compared*/
var collectGreen =[];/*keep track of the same pair of cards*/

/* compare the two clicked cards*/
function matching(){
	if(document.getElementById(clickedCards[0]).childNodes[3].lastElementChild.classList.value != document.getElementById(clickedCards[1]).childNodes[3].lastElementChild.classList.value){
		document.getElementById(clickedCards[0]).classList.remove('flipped');
		document.getElementById(clickedCards[1]).classList.remove('flipped');
		clickedCards = [];
    }
    else{
    	matchingCards.push(document.getElementById(clickedCards[0]),document.getElementById(clickedCards[1]));
    	collectGreen.push(document.getElementById(clickedCards[0]),document.getElementById(clickedCards[1]));
    	if(collectGreen.length == 16){
    		setTimeout(function(){
            document.getElementById('play-again').style.top='0px';
            }, 100);
            document.getElementById('your-seconds').innerHTML+=timer.innerHTML + 'sec';
            time.innerHTML= time.innerHTML;
	        time.classList.remove('done');
	        clearInterval(intervalID);
    	}
    	if(matchingCards.length == 2){
    	    for(let i = 0; matchingCards.length > i;i++){
    		    matchingCards[i].style.backgroundColor="#26D11D";
    		    
    	    }
        }
        console.log(matchingCards);
        console.log(matchingCards.length);
        matchingCards = [];
    	clickedCards = [];

    }

}

document.getElementById("dbl-arrow").animate([
  // keyframes
  { transform: 'translateY(0px)'},/*solved Github*/
  { transform: 'translateY(50px)'}, 
], { 
  // timing options
  duration: 1000,
  iterations: Infinity
});

document.getElementById("m-rotate").animate([
  // keyframes
  { transform: 'rotateX(0deg)'},/*solved Github*/
  { transform: 'rotateX(360deg)'}, 
], { 
  // timing options
  duration: 1000,
  iterations: Infinity
});

randomAiconsAgain();