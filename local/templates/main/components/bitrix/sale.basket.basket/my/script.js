$(function(){

	$(document).on('click','.js-delete',function(){
		id = $(this).data('id');		
		$.ajax({
			url: '/local/ajax/basket.php',
			method: 'post',
			dataType: 'html',
			data: {action: 'delete',id: id},
			success: function(data){
				location.reload();
			}
		});
	})

	function refreshBasket(){

		console.log('refreshBasket');	

		if(!$('.loaderMy').hasClass('loaderMyActive')){
			$('.loaderMy').addClass('loaderMyActive')
		}

		$.ajax({
			url: '/local/ajax/basket.php',
			method: 'post',
			dataType: 'json',
			data: $('#basketForm').serialize() + '&action=refreshBasket',
			success: function(data){
				$('#itemsCount').text(data.itemsCount);
				$('#positionsCount').text(data.positionsCount);
				$('#sumBasketFormated').text(data.sumBasketFormated);

				if($('.loaderMy').hasClass('loaderMyActive')){
					$('.loaderMy').removeClass('loaderMyActive')
				}

			}
		});
		
	}

	$(document).on('change','.count_i_basket',function(){
		refreshBasket()
	})

	$(document).on('click','.count_m, .count_p',function(){
		refreshBasket()
	})
	
	
	$(document).on('submit','#orderForm',function(e){
		e.preventDefault();
		$('#orderForm input').removeClass('errorInput');
		$('#orderFormErr').text('');
		$.ajax({
			url: 'local/ajax/order.php',
			method: 'post',
			dataType: 'json',
			data: $('#orderForm').serialize(),
			beforeSend: function(){
				$('#orderFormSubmit').hide();
			},
			complete:function(){
				$('#orderFormSubmit').show();
			},
			success: function(data){
				console.log(data);
				if(data.SUCCESS == 'Y'){
					location.href = '/basket/success/?ORDER_ID='+data.ORDER_ID;
				}
				else if(data.INPUT_ERROR !== undefined){
					$.each(data.INPUT_ERROR , function(index, val) { 
						console.log(index, val);
						$('#'+val).addClass('errorInput');
                        $('html, body').animate({'scrollTop': $('.errorInput').eq(0).offset().top - $('header:visible').height() - 20});
					});
				}
				else{
					$('#orderFormErr').text(data.MESSAGE);
                    $('html, body').animate({'scrollTop': $('#orderFormErr').offset().top - $('header:visible').height() - 20});
				}
			}
		});
	})


})