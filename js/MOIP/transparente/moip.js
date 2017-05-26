(function($) {
setBrandMoip = function(e) {
        i = {
          AMEX: /^3[47]/,
          HIPERCARD: /^(3841|6370)/,
          DINERS: /^3(?:0[0-5]|[68][0-9])/,
          ELO: /^6(401178|636368|401179|431274|438935|451416|457393|457631|457632|504175|636297|627780|6500(3[5-9]|4[0-9]|5[0-1])|6504(0[5-9]|[1-3][0-9])|650(48[5-9]|49[0-9]|5[0-2][0-9]|53[0-8])|6505(4[1-9]|[5-8][0-9]|9[0-8])|6507(0[0-9]|1[0-8])|6507(2[0-7])|6509(0[1-9]|1[0-9]|20)|506(699|7([0-6][0-9]|7[0-8]))|6516(5[2-9]|[6-7][0-9])|509([0-9][0-9][0-9])|6550([0-1][0-9])|6550(2[1-9]|[3-4][0-9]|5[0-8])|65003[1-3])/,
          HIPER:/^6(606282)/,
          VISA: /^4/,
          MASTERCARD: /^5[1-5]/,
        };

        for (var t in i) if (e.match(i[t])) return t;
        return !1
};


MoipPagamentosCc = function(){
              jQuery('#moip_cc_brand').removeClass();
              jQuery('.save-card').prop( "checked", true );
              jQuery('.save-card').val(1);
              jQuery('#onestep_form :input').blur(function() {
                Validation.validate(jQuery(this).attr('id'));
              });
              jQuery('#moip_cc_number').on("paste keyup", function() {
                    jQuery("#moip_cc_number").removeClass("validation-failed");
                    card_data = jQuery('#moip_cc_number').val();
                    card = setBrandMoip(card_data);
                    if(card){
                      jQuery('#moip_cc_brand').show();
                      jQuery('#moip_cc_brand').removeClass();
                       switch(card) {
                        case 'VISA':
                          jQuery('#moip_cc_brand').addClass('VI');
                          jQuery("input[id=moip_cc_type]").val('VI');
                         break;
                        case 'MASTERCARD':
                          jQuery('#moip_cc_brand').addClass('MC');
                          jQuery("input[id=moip_cc_type]").val('MC');
                         break;
                        case 'AMEX':
                          jQuery('#moip_cc_brand').addClass('AE');
                          jQuery("input[id=moip_cc_type]").val('AE');
                         break;
                        case 'DINERS':
                          jQuery('#moip_cc_brand').addClass('DC');
                          jQuery("input[id=moip_cc_type]").val('DC');
                         break;
                        case 'ELO':
                          jQuery('#moip_cc_brand').addClass('EO');
                          jQuery("input[id=moip_cc_type]").val('EO');
                         break;
                        case 'HIPERCARD':
                          jQuery('#moip_cc_brand').addClass('HP');
                          jQuery("input[id=moip_cc_type]").val('HP');
                         break;
                        case 'HIPER':
                          jQuery('#moip_cc_brand').addClass('HI');
                          jQuery("input[id=moip_cc_type]").val('HI');
                         break;
                     };
                   } else {
                     jQuery('#moip_cc_brand').removeClass().fadeOut()
                   }
                     
              });
              
             
              jQuery('#moip_cc_number').focusout(function() {

                  

                  var cc = new Moip.CreditCard({
                    number  : jQuery("#moip_cc_number").val(),
                  });
                  var brand_moip = cc.cardType();
                  if(brand_moip){
                    jQuery("#moip_cc_number").removeClass("validation-failed");
                    jQuery('#moip_cc_brand').show();
                    jQuery('#moip_cc_brand').removeClass();
                    switch(cc.cardType()) {
                      case 'VISA':
                        jQuery('#moip_cc_brand').addClass('VI');
                        jQuery("input[id=moip_cc_type]").val('VI');
                       break;
                      case 'MASTERCARD':
                        jQuery('#moip_cc_brand').addClass('MC');
                        jQuery("input[id=moip_cc_type]").val('MC');
                       break;
                      case 'AMEX':
                        jQuery('#moip_cc_brand').addClass('AE');
                        jQuery("input[id=moip_cc_type]").val('AE');
                       break;
                      case 'DINERS':
                        jQuery('#moip_cc_brand').addClass('DC');
                        jQuery("input[id=moip_cc_type]").val('DC');
                       break;
                      case 'ELO':
                        jQuery('#moip_cc_brand').addClass('EO');
                        jQuery("input[id=moip_cc_type]").val('EO');
                       break;
                      case 'HIPERCARD':
                        jQuery('#moip_cc_brand').addClass('HP');
                        jQuery("input[id=moip_cc_type]").val('HP');
                       break;
                      case 'HIPER':
                        jQuery('#moip_cc_brand').addClass('HI');
                        jQuery("input[id=moip_cc_type]").val('HI');
                       break;
                   };
                  } else {
                    jQuery("#moip_cc_number").removeClass("validation-passed");
                    jQuery("#moip_cc_number").addClass("validation-failed");
                  }
                  
                   
            });
            jQuery("#moip_cc_number").on('change', function() {
                      var cc = new Moip.CreditCard({
                        number  : jQuery("#moip_cc_number").val(),
                        cvc     : jQuery("#moip_cc_cid").val(),
                        expMonth: jQuery("#credito_expiracao_mes").val(),
                        expYear : jQuery("#credito_expiracao_ano").val(),
                        pubKey  : jQuery("#id-chave-publica").val()
                      });
                      if(cc.isValid()){
                          jQuery("#encrypted_value").val(cc.hash());
                          jQuery("#moip_cc_number").removeClass('validation-failed-moip');
                          jQuery("#moip_cc_cid").removeClass('validation-failed-moip');
                          jQuery("#credito_expiracao_ano").removeClass('validation-failed-moip');
                      }
                      else{
                          jQuery("#encrypted_value").val('');
                      }
            });
            jQuery("#moip_cc_cid").on('change', function() {
                      var cc = new Moip.CreditCard({
                        number  : jQuery("#moip_cc_number").val(),
                        cvc     : jQuery("#moip_cc_cid").val(),
                        expMonth: jQuery("#credito_expiracao_mes").val(),
                        expYear : jQuery("#credito_expiracao_ano").val(),
                        pubKey  : jQuery("#id-chave-publica").val()
                      });
                      if(cc.isValid()){
                          jQuery("#encrypted_value").val(cc.hash());
                          jQuery("#moip_cc_number").removeClass('validation-failed-moip');
                          jQuery("#moip_cc_cid").removeClass('validation-failed-moip');
                          jQuery("#credito_expiracao_ano").removeClass('validation-failed-moip');
                      }
                      else{
                          jQuery("#encrypted_value").val('');
                      }
            });

            jQuery("#credito_expiracao_mes").on('change', function() {
                      var cc = new Moip.CreditCard({
                        number  : jQuery("#moip_cc_number").val(),
                        cvc     : jQuery("#moip_cc_cid").val(),
                        expMonth: jQuery("#credito_expiracao_mes").val(),
                        expYear : jQuery("#credito_expiracao_ano").val(),
                        pubKey  : jQuery("#id-chave-publica").val()
                      });
                      if(cc.isValid()){
                          jQuery("#encrypted_value").val(cc.hash());
                          jQuery("#moip_cc_number").removeClass('validation-failed-moip');
                          jQuery("#moip_cc_cid").removeClass('validation-failed-moip');
                          jQuery("#credito_expiracao_ano").removeClass('validation-failed-moip');
                      }
                      else{
                          jQuery("#encrypted_value").val('');
                      }
            });
            jQuery("#credito_expiracao_ano").on('change', function() {          
                      var cc = new Moip.CreditCard({
                        number  : jQuery("#moip_cc_number").val(),
                        cvc     : jQuery("#moip_cc_cid").val(),
                        expMonth: jQuery("#credito_expiracao_mes").val(),
                        expYear : jQuery("#credito_expiracao_ano").val(),
                        pubKey  : jQuery("#id-chave-publica").val()
                      });
                      if(cc.isValid()){
                          jQuery("#encrypted_value").val(cc.hash());
                          jQuery("#moip_cc_number").removeClass('validation-failed-moip');
                          jQuery("#moip_cc_cid").removeClass('validation-failed-moip');
                          jQuery("#credito_expiracao_ano").removeClass('validation-failed-moip');
                      }
                      else{
                          jQuery("#encrypted_value").val('');
                      }
            });

            jQuery('.card-port').fadeOut('slow');

            jQuery('.titular-card').change(function(){
              if(this.checked)
                  jQuery('.card-port').fadeOut('slow');
              else
                  jQuery('.card-port').fadeIn('slow');
            });

            jQuery('.save-card').change(function(){
              if(this.checked)
                  jQuery('.save-card').val(1);
              else
                  jQuery('.save-card').val('');
            });

            jQuery('.new-card').change(function(){
                    if(this.checked){
                        jQuery('.payment-cofre').fadeOut('slow');
                        jQuery('.new-card').val(1);
                        jQuery('.payment-card').fadeIn('slow');
                    }
                      
                    else{
                          jQuery('.new-card').val(0);
                          jQuery('.payment-card').fadeOut('slow');
                          jQuery('.payment-cofre').fadeIn('slow');
                    }
                }
            );

            jQuery('#personal-card-info-control').change(function(){
              if(this.checked){
                 jQuery('#personal-card-info-control').val(1);
                 jQuery(".personal-card-info").addClass('no-display');
                 jQuery(".personal-card-info").fadeOut();
              }
              else
              {
                 jQuery('#personal-card-info-control').val(0);
                 jQuery(".personal-card-info").removeClass('no-display');
                 jQuery(".personal-card-info").fadeIn();
                 

              }
            });
};

SetCofre = function(){
  jQuery('.payment-card').fadeOut('fast');
  jQuery('.save-card').prop( "checked", false );
  jQuery('.save-card').val(0);
};
validaCPFMOIP = function(cpf,pType){
    var cpf_filtrado="",valor_1=" ",valor_2=" ",ch="";var valido=false;for(i=0;i<cpf.length;i++){ch=cpf.substring(i,i+1);if(ch>="0"&&ch<="9"){cpf_filtrado=cpf_filtrado.toString()+ch.toString()
    valor_1=valor_2;valor_2=ch;}
    if((valor_1!=" ")&&(!valido))valido=!(valor_1==valor_2);}
    if(!valido)cpf_filtrado="12345678910";if(cpf_filtrado.length<11){for(i=1;i<=(11-cpf_filtrado.length);i++){cpf_filtrado="0"+cpf_filtrado;}}
    if(pType<=1){if((cpf_filtrado.substring(9,11)==checkCPFMOIP(cpf_filtrado.substring(0,9)))&&(cpf_filtrado.substring(11,12)=="")){return true;}}
    if((pType==2)||(pType==0)){if(cpf_filtrado.length>=14){if(cpf_filtrado.substring(12,14)==checkCNPJ(cpf_filtrado.substring(0,12))){return true;}}}
  return false;
};
checkCPFMOIP = function(vCPF){
    var mControle=""
    var mContIni=2,mContFim=10,mDigito=0;for(j=1;j<=2;j++){mSoma=0;for(i=mContIni;i<=mContFim;i++)
    mSoma=mSoma+(vCPF.substring((i-j-1),(i-j))*(mContFim+1+j-i));if(j==2)mSoma=mSoma+(2*mDigito);mDigito=(mSoma*10)%11;if(mDigito==10)mDigito=0;mControle1=mControle;mControle=mDigito;mContIni=3;mContFim=11;}
  return((mControle1*10)+mControle);
};
MoipPagamentosRecurring = function(){
              jQuery('#moip_cc_brand').removeClass();
             
           
              jQuery('#onestep_form :input').blur(function() {
                
                    Validation.validate(jQuery(this).attr('id'));
                
              });
              jQuery('#moip_ccrecurring_number').keyup(function(){
                        if(!jQuery("#moip_ccrecurring_number").val().length){
                          jQuery('#moip_ccrecurring_type li').addClass('active');
                        } 
                        
                      }
              );
              jQuery('#moip_ccrecurring_number').focusout(function() {
                  jQuery("#type-payment").empty();
                  jQuery('#moip_cc_brand').removeClass();
                  
                  var ccrecurring = new Moip.CreditCard({
                    number  : jQuery("#moip_ccrecurring_number").val(),
                  });
                  var brand_moip = ccrecurring.cardType();
                  if(brand_moip){
                    
                    switch(ccrecurring.cardType()) {
                      case 'VISA':
                        jQuery('#moip_cc_brand').addClass('VI');
                        jQuery("input[id=moip_ccrecurring_type]").val('VI');
                       break;
                      case 'MASTERCARD':
                        jQuery('#moip_cc_brand').addClass('MC');
                        jQuery("input[id=moip_ccrecurring_type]").val('MC');
                       break;
                      case 'AMEX':
                        jQuery('#moip_cc_brand').addClass('AE');
                        jQuery("input[id=moip_ccrecurring_type]").val('AE');
                       break;
                      case 'DINERS':
                        jQuery('#moip_cc_brand').addClass('DC');
                        jQuery("input[id=moip_ccrecurring_type]").val('DC');
                       break;
                      case 'ELO':
                        jQuery('#moip_cc_brand').addClass('EO');
                        jQuery("input[id=moip_ccrecurring_type]").val('EO');
                       break;
                      case 'HIPERCARD':
                        
                        alert('Ainda nao estamos trabalhando com o HIPERCARD, por favor escolha outro cartão');
                       break;
                      case 'HIPER':
                       
                        alert('Ainda nao estamos trabalhando com o HIPER, por favor escolha outro cartão');
                       break;
                   };
                  } else {
                    
                    jQuery("#type-payment").html("Número do cartão inválido");
                    jQuery("#moip_ccrecurring_number").removeClass("validation-passed");
                    jQuery("#moip_ccrecurring_number").addClass("validation-failed");
                  }
                  
                   
            });
           
           
};
})(jQuery);