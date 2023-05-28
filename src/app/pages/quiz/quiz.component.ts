import { Component, Input, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz-questions.json'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute){
  }

  id: number = 0;
  quizQuestions = quiz_questions.quiz[this.id];

  image: string = "../../../assets/images/logo.png";
  title: string = "Sem Titulo";

  questions: any;
  questionSelected: any;

  anwsers: string[] = [];

  questionIndex: number = 0;
  questionsLenght: number = 0;

  finished: boolean = false;
  result: string = "Sem Resultado";

  ngOnInit(): void {

    this.route.paramMap.subscribe(value => {this.id = Number(value.get("id"))})

    this.quizQuestions = quiz_questions.quiz[this.id];

    if (quiz_questions){

      this.title = this.quizQuestions.title;
      this.questions = this.quizQuestions.questions;

      this.questionSelected = this.questions[this.questionIndex];
      this.questionsLenght = this.questions.length;

    }

  }

  userChoose(value: string){

    this.anwsers.push(value);
    console.log(this.anwsers)
    console.log(this.questionIndex)

    this.nextStep()

  }

  async nextStep(){

    this.questionIndex += 1;

    if (this.questionsLenght > this.questionIndex){

      this.questionSelected = this.questions[this.questionIndex];

    } else {

      const finalResult: string = await this.checkResult(this.anwsers);
      this.result = this.quizQuestions.results[finalResult as keyof typeof this.quizQuestions.results];
      this.finished = true;

    }
  }

  restart(){

    this.router.navigate(['/'])

  }

  async checkResult(anwsers: string[]){

    const result = anwsers.reduce((previous, current, i, array) => {

      if(
        array.filter(item => item == previous).length > array.filter(item => item == previous).length 
      ){
        return previous;
      } else {
        return current;
      }
    })

    return result;

  }

}
