const btn_addcart = document.querySelector('#cart_icon');
const side = document.querySelector('.side');
const btn_close = document.querySelector('#close');

btn_addcart.addEventListener('click',()=>{
    side.classList.add('side-active');
});


btn_close.addEventListener('click',()=>{
    side.classList.remove('side-active');
})

document.addEventListener('DOMContentLoaded',loadfood);

function loadfood(){
    loadcontent();
}


function loadcontent(){
    //remove food item from side bar
    let btnRemove = document.querySelectorAll('#remove_icon');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click',removeitem);
    });

    // howmany items changing 
    let qtyelements = document.querySelectorAll('.orderfood');
    qtyelements.forEach((input) => {
        input.addEventListener('change',changeqty);
    });


    // add to cart
    let btn_addcart = document.querySelectorAll('#add_cart');
    btn_addcart.forEach(btn=>{
        btn.addEventListener('click',addcart);
    });

    updatetotal();
}

//removeItem
function removeitem(){
    if(confirm('Do you want to remove this item')){
        let title = this.parentElement.querySelector('.added_title').innerHTML;
        extra_item=extra_item.filter(el=>el.title!=title);
        this.parentElement.remove();  
        loadcontent();
    }
}

function changeqty(){
    if(isNaN(this.value) || this.value<1){
        this.value = 1;
    }
    loadcontent();
}

let extra_item = [];

// founction of add cart

function addcart(){
    let food = this.parentElement;
    let title = food.querySelector('.food_title').innerHTML;
    let price = food.querySelector('.food_price').innerHTML;
    let fimage = food.querySelector('.food_img').src;
    // console.log(title,price,fimage);

    let already_item = {title,price,fimage}
    if(extra_item.find((el)=>el.title == already_item.title)){
        alert("Already added");
        return;
    }else{
        extra_item.push(already_item);
    }

    let newadded = createcart(title,price,fimage);
    //  next element is change content to element
    let newelement  = document.createElement('div');
    newelement.innerHTML = newadded;
    
    let side_open = document.querySelector('.side_container');
    side_open.append(newelement);
    loadcontent();
}

// creating a cart  for adding elements
function createcart(title,price,fimage){

    return `
    <div class="side_box">
                    <img src="${fimage}" alt="dosa" class="added_img">
                    <div class="side_detail">
                        <div class="added_title">${title}</div>
                        <div class="side_price">
                            <div class="rate">${price}</div>
                            <div class="order_rate">${price}</div>
                        </div>
                        <input type="number" value="1" class="orderfood">
                    </div>
                    <i class="fa-solid fa-trash-can" id="remove_icon"></i>
                </div>`
}

function updatetotal(){
    const side_item = document.querySelectorAll('.side_box');
    const fulltotal_price = document.querySelector('.total_price');

    let total = 0;
    side_item.forEach(p=>{
        let priceElement = p.querySelector('.rate').innerHTML;
        let price = parseFloat(priceElement.replace("Rs.",""));
        let inputqty = p.querySelector('.orderfood').value;
        total += (price * inputqty);
        p.querySelector('.order_rate').innerText = "Rs."+ (price*inputqty);
    });
    fulltotal_price.innerHTML="Rs."+ total;

    let cartcount = document.querySelector('.cart_count');
    let count = extra_item.length;
    cartcount.innerHTML = count;

    if(count == 0){
        cartcount.style.display = 'none';
    }else{
        cartcount.style.display = 'block';
    }
}