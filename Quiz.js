class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    var endHeading = createElement("h1");
    endHeading.html("RESULT");
    endHeading.position(350, 25);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined) {
      fill("blue");
      textSize(20);
      text("NOTE: Contestants who answered in green colour are highlighted in GREEN", 130, 230);

      var display_position = 250;
      for(var cntstnt in allContestants) {
        var correctAnswer = "2";
        if(allContestants[cntstnt].answer === correctAnswer) {
          fill("green");
        }
        else {
          fill("red");
        }
      
      display_position += 20;
      text(allContestants[cntstnt].name + ": " + allContestants[cntstnt].answer, 200, display_position); 
      }
    }
    //write code to highlight contest who answered correctly
    
  }

}
