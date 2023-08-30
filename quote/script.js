const quoteContainer = document.getElementById('mq-container');
const quoteText = document.getElementById('mq');
const authorText = document.getElementById('aut');
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('newqoute');
const loader = document.getElementById('loader');
const whole = document.getElementById('whole_container')

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
    // const qoute = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    const qoute = localQuote[Math.floor(Math.random() * localQuote.length)];
    // check if author name not given 
    let c_author = qoute.author;
    if(!c_author){
       c_author = 'Palani';
    }
    else{
        c_author = c_author.replace(', type.fit', '');
        c_author = c_author.replace('type.fit', 'Palani');
       
    }

    authorText.textContent = c_author;
    // long qoute irutha
    if(qoute.text.length>100){
        quoteText.classList.add('longqoute');
    }
    else{
        quoteText.classList.remove('longqoute');
    }
    // set quote,hide quote
    quoteText.textContent = qoute.text;
    complete();
    bgimg();
    console.log(qoute); 
}

// Get quotes for Api
// async function getquotes(){
//     loading();
//     const apiurl = 'https://type.fit/api/quotes?te';
//     try{
//         const response = await fetch(apiurl);
//         apiQuotes = await response.json();
//         newQuote();  
//     }catch(error){
//         //catch error
//     }     
// }
newQuote();

function tweetquote(){
    const twitterurl = `https://twitter.com/i/flow/login?text=${quoteContainer.textContent} - ${authorText.textContent}`;
    window.open(twitterurl,'_blank');
}

function bgimg(){
    const sethu = inspirationImages[Math.floor(Math.random() * inspirationImages.length)].url;
    whole.style.backgroundImage = `url(${sethu})`;
    console.log(sethu);
}


newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetquote);

//On Load
// getquotes();

