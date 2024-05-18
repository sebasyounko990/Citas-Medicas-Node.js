
$(document).ready(function(){

    $('.btnactualizar').on('click',function(){
    let btn=$('.btnactualizar').index(this);
    
    let nom=$('.nom').eq(btn);
    let ape=$('.ape').eq(btn);
    let tel=$('.tel').eq(btn);
    let corre=$('.corr').eq(btn);
    let usu=$('.usu').eq(btn);
    let clav=$('.cla').eq(btn);
   
    let n=nom.val();
    let a=ape.val();
    let t=tel.val();
    let c=corre.val();
    let u=usu.val();
    let cl=clav.val();

    
    $.ajax({
        type:"POST",
        url:'/actuaMedico',
        data:{
            nn:n,aa:a,tt:t,cc:c,uu:u,cll:cl
        }
    });

    });
});