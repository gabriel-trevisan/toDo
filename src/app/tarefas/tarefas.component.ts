import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
    selector: 'td-tarefas',
    templateUrl: './tarefas.component.html',
    styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent {

    tarefas: Object[] = [];

    constructor(http: HttpClient){

        http
            .get<Object[]>('http://localhost:3000/tarefas')
            .subscribe(tarefas => this.tarefas = tarefas);

    }
}