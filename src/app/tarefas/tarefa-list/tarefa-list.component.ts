import { Component, OnInit, Input } from "@angular/core";
import { Tarefa } from '../tarefa/tarefa';

@Component({
    selector: 'todo-tarefa-list',
    templateUrl: './tarefa-list.component.html',
    styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit {

    @Input() tarefas: Tarefa[] = [];

    constructor(){}

    ngOnInit(): void {

    }

}