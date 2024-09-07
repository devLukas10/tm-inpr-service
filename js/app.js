// custom scripts for app
// initialize api
(function(){
    emailjs.init({
      publicKey: "ytc4VP9XcWBQbmXyd",
    });
})();


//
const cambio = document.getElementById('amount_rates');
cambio.addEventListener('keyup', (ev)=>{
    var cambio = ev.target.value;
    var amount_send = document.getElementById('amount_send');
    var amount_receive = document.getElementById('amount_receive');
    var amount_paid = document.getElementById('amount_paid');
    var is_null = parseInt(cambio);
    var is_null_2 = parseInt(amount_send.value);
    var btn = document.getElementById('btn');
    
    if(isNaN(is_null) != true && isNaN(is_null_2) != true){
        let paids = parseFloat(amount_send.value) * parseFloat(cambio);
        amount_receive.value = `${convertCurrencys(amount_send.value)} USDT`
        amount_paid.value = paids;
        btn.removeAttribute('disabled');
        btn.style.backgroundColor = 'orange'
    }else{
        amount_receive.value = '';
        amount_paid.value = '';
        btn.setAttribute('disabled', 'disabled')
        btn.style.backgroundColor = 'gray'
    }

    
})

function convertCurrencys(number){
    const forms = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    const types = forms.format(number);
    const result = types.slice(1, types.length);
    return result
}
//
const formSubmit = document.getElementById('forms-email');
formSubmit.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    var amount_send = document.getElementById('amount_send').value;
    var amount_rates = document.getElementById('amount_rates').value;
    var user_name = document.getElementById('user_name').value;
    var user_email = document.getElementById('user_email').value;
    var user_wallet = document.getElementById('user_wallet').value;
    var user_address = document.getElementById('user_address').value;
    var date = new Date().toLocaleString();
    var trans_id = `tr~${Math.random() * 99999999 * 10}`;
    var subject = `${user_name} Solicitou uma compra de USDT`;
    let paids = parseFloat(amount_send) * parseFloat(amount_rates);

    // user_wallet user_addrecess
    emailjs.send("service_xtf88fm","template_x42rf2q",{
        amount_send: convertCurrencys(amount_send),
        user_wallet,
        user_address,
        amount_receive: convertCurrencys(amount_send),
        amount_paid: convertCurrencys(paids),
        amount_rates: convertCurrencys(amount_rates),
        date,
        trans_id,
        //
        user_email,
        user_name,
        subject,


        }).then(()=>{
            document.getElementById('amount_send').value = '';
            document.getElementById('amount_receive').value = '';
            document.getElementById('amount_paid').value = '';
            document.getElementById('amount_rates').value = '';
            document.getElementById('user_name').value = '';
            document.getElementById('user_email').value = '';
            document.getElementById('user_wallet').value = '';
            document.getElementById('user_address').value =  '';
            sucess();
        }), (err)=>{
            err();
        }
    //
})
//
function sucess(){
    document.getElementById('sucess').classList.toggle('active')
    setTimeout(()=>{ document.getElementById('sucess').classList.toggle('active') }, 2000);
}
function err(){
    document.getElementById('err').classList.toggle('active')
    setTimeout(()=>{ document.getElementById('err').classList.toggle('active') }, 2000);
}