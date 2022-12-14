const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const que_palette = document.querySelector(".que_palette");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
//timer
const startingMinutes = 5;
let time = startingMinutes * 60;
const countdownEl = document.getElementById('countdown');
setInterval(updateCountdown, 1000);
function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
}
//start_btn
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
     next_btn.classList.add("show");
     prev_btn.classList.add("show");
     clear_btn.classList.add("show")     
     flag_btn.classList.add("show")     
}
//exit_btn
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}
//continuebutton
continue_btn.onclick = ()=>{
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  next_btn.classList.add("show");
     prev_btn.classList.add("show");
     clear_btn.classList.add("show")     
     flag_btn.classList.add("show")
     showQuetions(0);
     queCounter(1);
}
//submit_btn
function confirmSubmit(yes){
    if (yes == 1) {
      let final = "Are You confident you want to submit?";
      let val = confirm(final);
      if (val == true) {
        console.log("confirm submitted");
        showResult();
      }
    }
}
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    que_palette.classList.add("activeQue")
    result_box.classList.remove("activeResult");
    document.getElementById("a").style.display="block"; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count);
    queCounter(que_numb);
    colourCounter();
    setInterval(updateCountdown, 1000);
    clearInterval(counter);
    timeText.textContent = "Time Left";
}
//quit_quiz
quit_quiz.onclick = ()=>{
    window.location.reload();
}
//prev_btn
const prev_btn = document.querySelector("footer .prev_btn");
const top_ques_counter = document.querySelector("footer .total_que");
prev_btn.onclick = ()=>{
    if(que_count < questions.length){
        que_count--;
        que_numb--;
        showQuestions(que_count);
        queCounter(que_numb);
        colourCounter();
        timeText.textContent = "Time Left";
    }else{
        showResult();
    }
}
//next_btn
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        colourCounter();
        timeText.textContent = "Time Left"; 
    }else{
        showResult();
    }
}
//clear_btn
const clear_btn = document.querySelector("footer .clear_btn");
clear_btn.onclick = ()=>{
  if(que_count < questions.length - 1){
    colourCounter();
    timeText.textContent = "Time Left";
  }else{
        showResult();
  }
}

// function clear_btn(){
//   document.getElementById('button_clear').value = "";
// }

//flag_btn
const flag_btn = document.querySelector("footer .flag_btn");
flag_btn.onclick = ()=>{
  if(que_count < questions.length - 1){
    colourCounter();
    timeText.textContent = "Time Left";
  }else{
        showResult();
  }
}
//Questions
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
function colourCounter() {
    var answered = 0;
    var notanswered = 0;
    var flagged = 0;
    for (let i = 0; i < 10; i++){
      if (
        document.getElementById(`grid-item-${i + 1}`).style.backgroundColor ==="green"
      ) {
        ++answered;
      } else if (
        document.getElementById(`grid-item-${i + 1}`).style.backgroundColor ==="red"
      ) {
        ++notanswered;
      } else if (
        document.getElementById(`grid-item-${i + 1}`).style.backgroundColor ==="yellow"
      ) {
        ++flagged;
      }
    }
    document.getElementById("greens").innerHTML = answered;
    document.getElementById("yellows").innerHTML = flagged;
    document.getElementById("reds").innerHTML = notanswered;
    document.getElementById("whites").innerHTML = 10 - answered - flagged - notanswered;
  }
function optionSelected(answer){
    colourCounter();
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    if(userAns == correcAns){ 
        userScore += 1;
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
      userScore += 0;
    }
    next_btn.classList.add("show");
    prev_btn.classList.add("show");
}
//result_box
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    que_palette.classList.remove("activeQue");
    result_box.classList.add("activeResult");
    document.getElementById("a").style.display="none";
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 4){
        let scoreTag = '<span>and congrats! ????, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore >2){
        let scoreTag = '<span>and you scorede well ????, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry ????, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}
document.getElementById("b").onclick=displayq;
function displayq(){
   document.getElementById("a").style.display="block";
   info_box.classList.remove("activeInfo");
   quiz_box.classList.add("activeQuiz");
   showQuestions();
   queCounter(1);
   colourCounter();
}