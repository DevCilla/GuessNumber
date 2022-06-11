var attemp = 1;
var answer = Math.round ( Math.random() * 100, 0 );
var usrInput;
var msgField;
//console.log('answer: ' + answer);			

function init() {
	usrInput = document.getElementById('guessVal');
	msgField = document.getElementById('msgField');
}

function guess() {
	var guessVal = usrInput.value;

	if (!validate(guessVal)) {
		//console.log("invalidate value");	
		updateChance();
		return;
	}

    if (attemp < 10){
        if (guessVal < answer){
        	updateMinMaxVal(guessVal);
        	updateChance();
	    } else if (guessVal > answer){
	    	updateMinMaxVal(guessVal);
	    	updateChance();
	    } else {
	        msgField.innerHTML += guessVal + ' is the answer!<br>'; 
	        showAgainBtn();  
	    }   	    	   

    } else if (attemp == 10){
    	if (guessVal == answer){
    		msgField.innerHTML += guessVal + ' is the answer!<br>'; 
	        msgField.innerHTML += '<br>Finally you\' ve got the answer!<br>' + 'Thanks for playing this game!'
	    } else {
	        msgField.innerHTML += '<br>The answer is ' + answer + '!<br>' + 'Thanks for playing this game!'
	    } 
	    showAgainBtn();                  

    } else {
		restart();
    }
	
}

function validate(val) {
	clearInvalid();
	if (val.length > 0 && (val >= 0 && val <= 100)) {		
		return  true;
	} else if (val.length > 0 && (val < 0 || val > 100)){
		showInvalid("Please input a number between 0 to 100.");
		return false;
	} else {
		showInvalid("The field is required.");
		return false;	
	}	
}

function updateChance() {	
	if(attemp < 10 && attemp != 9){
        $('#chance').text((10 - attemp) + " chances");
	} else if(attemp == 9) {
        $('#chance').text("one last chance");
    }else {
    	// remains unchange
    }
    attemp++;
}

function updateMinMaxVal(currVal) {
	var preMinVal = $('#minNum').text();
	var preMaxVal = $('#maxNum').text();

	if(preMinVal != 0 || preMaxVal != 100){
        if (currVal < answer && currVal > preMinVal){
        	$('#minNum').text(currVal);

	    } else if (currVal > answer && currVal < preMaxVal){
	    	$('#maxNum').text(currVal);

	    } else {
	    	// remains unchange
	    }   

	}else {
        if (currVal < answer){
        	$('#minNum').text(currVal);

	    } else if (currVal > answer){
	    	$('#maxNum').text(currVal);

	    } else {
	    	// remains unchange
	    }   
	}
}

function showModal() {
	$('#modal').modal('show');
}

function hideModal() {
	$('#modal').modal('hide');
}

function showInvalid(msg) {
	$('input#guessVal').addClass('is-invalid');
    $('div#validMsg').text(msg);
	$('div#validMsg').css('visibility', 'visible');
}

function clearInvalid() {
	$('input#guessVal').removeClass('is-invalid');
	$('div#validMsg').text("");
	$('div#validMsg').css('visibility', 'hidden');
}

function showAgainBtn() {
	$('p#footer')[0].setAttribute('style', 'display:block;');         
}

function hideAgainBtn() {
    $('p#footer')[0].setAttribute('style', 'display:none;');  
}

function restart() {
    answer = Math.round ( Math.random() * 100, 0 );
    usrInput.value = '';
    msgField.innerHTML = '';
    attemp = 1;
    $('#minNum').text("0");
    $('#maxNum').text("100");
    $('#chance').text("10 chances");
	clearInvalid();
	hideAgainBtn();
	hideModal(); 
}
