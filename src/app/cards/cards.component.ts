import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';

import { timer } from 'rxjs';

import { CardsService } from './cards.service'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => wobble', animate(1000, keyframes(kf.wobble))),
      transition('* => swing', animate(1000, keyframes(kf.swing))),
      transition('* => jello', animate(1000, keyframes(kf.jello))),
      transition('* => zoomOutRight', animate(1000, keyframes(kf.zoomOutRight))),
      transition('* => slideOutLeft', animate(600, keyframes(kf.slideOutLeft))),
      transition('* => slideOutRight', animate(600, keyframes(kf.slideOutRight))),
      transition('* => rotateOutUpRight', animate(1000, keyframes(kf.rotateOutUpRight))),
      transition('* => flipOutY', animate(500, keyframes(kf.flipOutY))),
    ])
  ]
})
export class CardsComponent implements OnInit {

  pontuacao = 0
  erros = 0
  acabou = false
  currentIndex:number = 0;
  PerguntaAtual:any;
  timerlabel
  subscription
  timerpercent
  Perguntas

  animationState: string;

  constructor(private cardsService:CardsService){}

  ngOnInit(){

    this.cardsService.getPerguntas().subscribe(
      res => {
        this.Perguntas = res.map(item => {
          return item.payload.doc.data()
        })
        this.startTimer()
      }
    )
  }

  startTimer(){    
    this.PerguntaAtual = this.Perguntas[this.currentIndex]
    this.subscription = timer(0, 1000).subscribe(
      (x) => {
        this.timerlabel = x;
        this.timerpercent = (this.timerlabel * 100) / 5
        if(this.timerlabel == 5){
          this.startAnimation('flipOutY', undefined)
        }
      }
    );
  }

  stopTimer(){
    this.subscription.unsubscribe();
  }
  
  startAnimation(state, resposta) {
    if (!this.animationState) {
      this.stopTimer()
      this.animationState = state;

      if(this.PerguntaAtual.resposta == resposta){
        this.pontuacao++
      }
      else{
        this.erros++
      }
    }
  }

  resetAnimationState() {
    if(this.animationState){
      if(this.currentIndex == this.Perguntas.length - 1){
        this.acabou = true
      }
      else{
        this.currentIndex++;        
        this.animationState = '';
        this.startTimer();
      }
    }
  }
}
