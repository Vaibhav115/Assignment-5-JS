var form = $("#parent")
productData = [];

function onCallSuccess(data){
    console.log(data);
    productData = data

    for(var i=0; i< productData.length; i++){
        // console.log(productData[i]);

        var Qquestion = $('<div>').addClass('Question');
        var h2 = $('<h2>').text('Q'+(i+1)+'.'+productData[i].question)
          Qquestion.append(h2);

          for(var j=0; j<productData[i].options.length; j++){
            // console.log(productData[i].options);

            var input =`<input type="radio" name="Q${i+1}" value="${j}" id="Q${(i+1)+productData[i].options[j]}">
            <label class="labels" for="Q${(i+1)+productData[i].options[j]}">${data[i].options[j]}</label><br>`
            Qquestion.append(input);
          }

          form.append(Qquestion)
    }

    var btn = `'<input type="submit" id="btn">`;
    form.append(btn)

    var score = $('#score').text("0");
    $("#total").text(productData.length)

    // Form submit handler event

    form.submit(function(e){
        e.preventDefault();
        var input = $("input[type=radio]");
        var selectedAns = [];
        var correctAns = [];
        var count = 0;
        //to get all correct answers in a single array
        for(let j = 0; j<productData.length; j++){
       correctAns.push(data[j].answer)
        }
        for(let i =0; i<input.length; i++){
            if(input[i].checked == true){
                selectedAns.push(Number(input[i].value)); 
            }
        }
        console.log(correctAns);
        console.log(selectedAns);
        if(selectedAns.length != 5){
            alert("Attempt All Questions!")
        }
        else{
            for( var k = 0; k<correctAns.length; k++){
                if(correctAns[k] === selectedAns[k]){
                    count++;
                }
            }
            score.text(count)
        }
    })

}

function onCallFail(){
    console.log('on Call Fail')
}

$.ajax({
    method: 'GET',
    url:'https://5d76bf96515d1a0014085cf9.mockapi.io/quiz',
    success: onCallSuccess,
    error: onCallFail
})