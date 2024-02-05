import { Component, OnInit } from '@angular/core';
import quizQuestions from '../../../assets/data/quizz_questions.json'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title:string = ""

  questions: any
  questionselected: any

  answers: string[] = []
  answerSelected: string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor(){}
  
  ngOnInit(): void {
    if(quizQuestions){
      this.finished = false
      this.title = quizQuestions.title

      this.questions = quizQuestions.questions
      this.questionselected =  this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      
    }
  }

  playerChoose(value: string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex = this.questionIndex + 1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionselected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizQuestions.results[finalAnswer as keyof typeof quizQuestions.results]
    }
  }

  async checkResult(answers: string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length ){
        return previous
      }else{
        return current
      }
    })

    return result
  }
}
