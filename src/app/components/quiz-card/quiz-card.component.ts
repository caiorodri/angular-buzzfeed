import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent {

  @Input()
  Id: number = 0;
  @Input()
  title: string = "";
  @Input()
  image: string = "";

}
