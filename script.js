const quoteContainer = document.getElementById('mq-container');
const quoteText = document.getElementById('mq');
const authorText = document.getElementById('aut');
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('newqoute');
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading  
function loading(){
     loader.hidden = false;
     quoteContainer.hidden = true;
}

// hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show a new quotes
function newQuote(){
    loading();
    const qoute = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author name not given 
    if(!qoute.author){
       authorText.textContent = 'Palani' 
    }
    else{
        authorText.textContent = qoute.author; 
    }
    // set quote,hide quote
    quoteText.textContent = qoute.text;
    complete();
    console.log(qoute); 
}

// Get quotes for Api
async function getquotes(){
    loading();
    const apiurl = 'https://type.fit/api/quotes?te';
    try{
        const response = await fetch(apiurl);
        apiQuotes = await response.json();
        newQuote();  
    }catch(error){
        //catch error
    }     
}

function tweetquote(){
    const twitterurl = `http://twitter.com/intent/tweet?text=${quoteContainer.textContent} - ${authorText.textContent}`;
    window.open(twitterurl,'_blank');
}

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetquote);

//On Load
getquotes();

