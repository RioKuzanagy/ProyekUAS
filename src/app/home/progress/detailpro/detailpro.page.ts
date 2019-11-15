import { Component, OnInit } from '@angular/core';
import { Todo, HomeService } from '../../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Plugins} from '@capacitor/core';
const{Storage} = Plugins;

@Component({
  selector: 'app-detailpro',
  templateUrl: './detailpro.page.html',
  styleUrls: ['./detailpro.page.scss'],
})
export class DetailproPage implements OnInit {
  todoId = null;

  todo: Todo= {
    idd:null,
    title: null,
    deskripsi: null,
    nmbahan: null,
    takaran: null,
    langkah: null,
    takasaji: null,
    waktusiap: null,
    totalmasak: null,
    createdAt: new Date().getTime(),
    name: null,
    date: null,
    alamat: null,
    phone: null,
    time: null,
    random:null
  }
  
  constructor(private dataSvc: HomeService, 
    private route: ActivatedRoute,
    private loading:LoadingController, 
    private nav: NavController, 
    private router : Router) { }

  async ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){
      this.loadTodo();
    }
    await Storage.set({
      key: 'IdUser',
      value: this.todoId
    });
   }
   async loadTodo(){
    const loading = await this.loading.create({
      message: 'Loading...'
    });
    await loading.present();
    this.dataSvc.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  console.log(this.todoId);
   }


}
