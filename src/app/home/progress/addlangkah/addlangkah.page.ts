import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService, Langkah, Waktu } from '../../home.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Plugins} from '@capacitor/core';
import { NullAstVisitor } from '@angular/compiler';
import { AngularFirestore } from 'angularfire2/firestore';
const{Storage} = Plugins;

@Component({
  selector: 'app-addlangkah',
  templateUrl: './addlangkah.page.html',
  styleUrls: ['./addlangkah.page.scss'],
})
export class AddlangkahPage implements OnInit {
  todoId:null;
  index:string;
  term = [];
  langkahs:Langkah[];
  langkah: Langkah= {
    idl:null,
    langkah: null,
    val: null,
    date: Date.now(),
  
  }


  waktus:Waktu[];
  waktu: Waktu= {
    idw:null,
    takaransaji: null,
    waktupersiapan:null,
    totalwaktu: null,
    val:null,
    id:null,
    date: Date.now(),
  
  }
  Idaj
  datakos;

  constructor(private dataSvc : HomeService, 
    private loading:LoadingController, 
    private nav: NavController, 
    private route: ActivatedRoute, 
    private router : Router,
    public afstore: AngularFirestore ) { }

  async ngOnInit() {
    const IdTl = await Storage.get({ key : 'IdTl'});
    this.index = IdTl.value;
    this.dataSvc.getLangkahs().subscribe(res => {
      this.langkahs = res;
      this.term = [];
      
      for(let data of this.langkahs){
        if(data.idl == this.index ){
         this.term.push(data);
         console.log(this.datakos)
        }
      }
    });

  }

  async ionViewWillEnter(){
    const IdTl = await Storage.get({ key : 'IdTl'});
    this.index = IdTl.value;
    this.dataSvc.getLangkahs().subscribe(res => {
      this.langkahs = res;
      this.term = [];
      
      for(let data of this.langkahs){
        if(data.idl == this.index ){
         this.term.push(data);

        }
      }
    });
  }

  async savelangkah(){
      this.datakos = Date.now()
      this.langkah.val = this.datakos
       const IdTl = await Storage.get({ key : 'IdTl'});
       this.langkah.idl = IdTl.value;
       this.dataSvc.addLangkah(this.langkah).then(()=>{
       })
       console.log(this.datakos)
   }

   remove(item){
    this.dataSvc.removeLangkah(item.id);
    
  }

  async upload(){
    const loading = await this.loading.create({
      message: 'Add timeline'
    });
    await loading.present();
 
     if(this.todoId){
 
      //  this.dataSvc.updateTodo(this.todo, this.todoId).then(()=>{
      //    loading.dismiss();
      //    this.router.navigateByUrl('/home/tabs/progress');
      //  });
      
     }
     else{
       const Iduser = await Storage.get({ key : 'IdTl'});
       this.Idaj = Iduser.value;
       this.waktu.idw = Iduser.value;
       this.dataSvc.addWaktu(this.waktu).then(()=>{
         loading.dismiss();
         this.router.navigateByUrl('/home/tabs/progress/'+this.Idaj);
       })
       //this.dataSvc.addTodo(this.todo);
       this.afstore.doc(`todos/${this.Idaj}`).update({
        langkah : 1
      })
     }
   }


}
