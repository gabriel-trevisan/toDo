import { Component, OnInit, Input } from "@angular/core";
import { Tarefa } from './tarefa';

@Component({
    selector: 'td-tarefa',
    templateUrl: './tarefa.component.html',
    styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

    @Input() tarefas: Tarefa[] = [];

    constructor(){}

    ngOnInit(): void {

    }

}