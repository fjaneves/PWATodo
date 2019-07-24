import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class CardsService {
    constructor(public db: AngularFirestore){ }

    getPerguntas(){
        return this.db.collection('/perguntas').snapshotChanges()
    }
}