import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import { Order } from '../models/order';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { distinct, flatMap, map, take, max} from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { FileUpload } from '../models/fileupload';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataUrl = 'https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/dictionary%2Flanguage.json?alt=media&token=2305b3a6-93d3-4035-9a93-d71557f80d2d';
  
  obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  items: Observable<Order[]> = this.obsArray.asObservable();

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  getMenuList() {
    return this.firestore.collection('menulist').snapshotChanges();
  }

  getOrders() {
    //return this.http.get<Order[]>(this.dataUrl);
    return this.firestore.collection('orders').snapshotChanges();
  }
  


  async fillItems(urlToUserFile: string) {
    /*let url: string;
    let newstr: string;
    newstr = name.slice(0, name.indexOf('@'));
    switch (newstr) {
      case 'mytest2':
      //url = "https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/uploads%2Fmytest2.json?alt=media&token=8b15caaa-64fb-49b4-b3c0-c104102aacbd";
        url = "https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/uploads%2Fmytest2.json?alt=media&token=a855403a-2c11-4871-bd28-d22b5895066d";
        break;
      case 'mytest' :
        url = "https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/uploads%2Fmytest.json?alt=media&token=78285f98-c477-4f39-9f25-5c78bc9afcf1";
        break;
      default:
        break;
    }*/
    console.log(urlToUserFile);
    this.items = this.http.get<Order[]>(urlToUserFile);
  }
  /*getPhrases2() {
    this.items = this.getPhrases();
  }*/






  getMaxIdFromItems() {
    return this.items.pipe(
      map(v => v),
      flatMap(a => a),
      max(this.comparer), // Phrase object whit max ID
      map(a => a.id), // return Max(Id)
    )
    
  }

  comparer(x: Order, y: Order) {
    if( x.id > y.id ) {
      return 1;
    } else if( x.id < y.id ) {
      return -1;
    } else return 0;
  }

  addPhrase(phrase: Order) {
    this.items.pipe(take(1)).subscribe(val => {
      //const newArr = [...val, phrase];
      //this.obsArray.next(newArr);
      val.push(phrase);
      //console.log(val);
      this.obsArray.next(val);
    })
  }

  deletePhrase(id) {
    let emps = JSON.parse(localStorage.getItem('employees'));
    for(let i = 0; i <emps.length; i++) {
      if(emps[i].id == id) {
        emps.splice(i, 1);
      }
    }
    localStorage.setItem('employees', JSON.stringify(emps));
  }

  updatePhrase(oldEmp, newEmp){  let emps = JSON.parse(localStorage.getItem('employees'));
    for(let i = 0; i <emps.length; i++) {
      if(emps[i].id == oldEmp.id) {
        emps[i] = newEmp;
      }
    }
    localStorage.setItem('employees', JSON.stringify(emps));
  }

}
