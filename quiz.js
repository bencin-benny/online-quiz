(function() 
 {
  let allQuestions = [{
    question: "Evaluate the following Java expression, if x=3, y=5, and z=10:<br>++z + y - y + z + x++",
    options: ["23", "20", "25", "26"],
    answer: 1
  }, {
    question: "Which of the following is not a Java features",
    options: ["Architecture Neutral", "Use of pointers", "Object-oriented", "None of the above"],
    answer: 1
  }, {
    question: "_____ is used to find and fix bugs in the Java programs",
    options: ["JVM", "JRE", "JDB","None of the above"],
    answer: 2
  },{
    question: "What is the return type of the hashCode() method in the Object class?",
    options: ["Object", "int", "long", "None of the above"],
    answer: 1
  }, {
    question: "What does the expression float a=35/0 return?",
    options: ["0", "Not a number", "Infinity", "None of the above"],
    answer: 2
  },{
    question: "Which of the following tool is used to generate API documentation in HTML format from doc comments in source code?",
    options: ["javap tool", "javah command", "Javadoc tool", "None of the above"],
    answer: 2
  },{
    question: "Which of the following creates a List of 3 visible items and multiple selections abled?",
    options: ["new List(3, true)", "new List(false,3)", "new List(true,3)", "None of the above"],
    answer: 0
  },{
    question: "Which of the following for loop declaration is not valid?",
    options: ["for ( int i = 2; i <= 20; i = 2* i )", "for ( int i = 99; i >= 0; i / 9 )", "for ( int i = 7; i <= 77; i += 7 )", "None of the above"],
    answer: 1
  },{
    question: "Which method of the Class.class is used to determine the name of a class represented by the class object as a String?",
    options: ["getName()", "toString()", "getClass()", "None of the above"],
    answer: 0
  },{
    question: "In which process, a local variable has the same name as one of the instance variables?",
    options: ["Serialization", "Variable Shadowing", "Abstraction", "None of the above"],
    answer: 1
    }];
	


  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
  var endtest=false;
  var quessubmit=false;
  var result=false;
    
  nextQuestion();
    
	$('#submit').click(function()
	{
		chooseOption();
		
		quessubmit=true;
		
	});
  $('#next').click(function () 
    {
        
        if (quessubmit) 
        {
            quesCounter++;
			quessubmit=false;
			nextQuestion();
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        
        quesCounter--;
        nextQuestion();
    });
	
	$('#end_test').click(function () 
    {
		endtest=true;
		nextQuestion();
    });
	
	$('#srelt').click(function () 
    {
		result=true;
		nextQuestion();
    });
	
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = -1;
		if($('input[name="answer"]:checked').val() > -1)
		{
			selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
		}
		
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(!endtest&&quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
					 if(quesCounter == allQuestions.length -1)
                    {
                      $('#prev').show();
					  $('#submit').show();
					  $('#next').hide();
					  $('#goto').hide();
					  $('#srelt').hide();
                    }
                    else if(quesCounter === 1)
                    {
                      $('#prev').show();
					  $('#submit').show();
					  $('#next').show();
					  $('#goto').hide();
					  $('#srelt').hide();
					  
                    } 
					
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
					  $('#submit').show();
					  $('#next').show();
					  $('#goto').hide();
					  $('#srelt').hide();
                    }
					
                }
              else 
                {
					if(!result)
					{
						var scoreRslt = displayResult();
						quizSpace.append(scoreRslt).fadeIn();
						$('#next').hide();
						$('#prev').hide();
						$('#submit').hide();
						$('#end_test').hide();
						$('#srelt').show();
						$('#goto').show();
					}
					else
					{
						var showRslt = showResult();
						quizSpace.append(showRslt).fadeIn();
						$('#next').hide();
						$('#prev').hide();
						$('#submit').hide();
						$('#end_test').hide();
						$('#srelt').hide();
						$('#goto').show();
					}
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
		var quesAnswered = 0;
        var correct = 0;
		var wrong = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] > -1) 
		  {
			quesAnswered++;  
			 if (selectOptions[i] === allQuestions[i].answer) 
			{
				correct++;
			}
			else{
				wrong++;
			} 
		  }

        }
		quesAnswered=correct+wrong;
		var Result = correct - (0.25 * wrong);
		score.append('The total answered questions : '+quesAnswered);
        score.append('</br></br>The Correct answers : '+correct);
		score.append('</br></br>The Wrong Answers : '+wrong);
		score.append('</br></br>You scored ' + Result + ' out of ' +allQuestions.length);
        $('#end_test').hide();
		$('#goto').show();
		return score;
    }
	function showResult ()
	{
		var reslt = $('<p>',{id: 'question'});
		for (var i = 0; i < allQuestions.length; i++) 
		{
			if (selectOptions[i] != allQuestions[i].answer)
			{
				var question = $('<p>').append(allQuestions[i].question);
				reslt.append(question);
				var temp = allQuestions[i].answer;
				var ans = $('<p>').append(allQuestions[i].options[temp]);
				reslt.append(ans);
			}
		}
		return reslt;
	}
  
})();
