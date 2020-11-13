import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Tarefa } from '../tarefa/tarefa';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'td-tarefa-list',
    templateUrl: './tarefa-list.component.html',
    styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit {

    title: string = 'Tarefas';
    tarefaForm: FormGroup;
    categorias: any[] = [];
    tarefas: Tarefa[] = [];
    tarefasCache: Tarefa[] = [];

    constructor(
        private http: HttpClient, 
        private formBuilder: FormBuilder
    ){}

    ngOnInit(): void {

        this.tarefaForm = this.formBuilder.group({
            categoria: [''],
            descricao: [''],
            data_limite: [''],
            concluido : [false]
        })

        this.getTodasTarefas();
        this.getTodasCategorias();
    }

    getTodasTarefas(){
        this.http
        .get<Tarefa[]>('http://localhost:3000/tarefas')
        .subscribe(tarefas => {
            this.tarefas = tarefas
            this.tarefasCache = tarefas
        });
    }

    getTodasCategorias(){
        this.http
        .get<Tarefa[]>('http://localhost:3000/categorias')
        .subscribe(categorias => {
            this.categorias = categorias
        });
    }

    onKey(event: any) {
        let filter = '' ;
        filter += event.target.value;

        this.tarefas = this.tarefasCache.filter(tarefa => {
            let reg = new RegExp(filter, 'i');
            return tarefa.descricao.match(reg);
        });
    }

    inserirTarefa(event: any) {
        event.preventDefault();

        let formValue = this.tarefaForm.getRawValue();

        this.http
        .post<any>('http://localhost:3000/tarefas', formValue).subscribe({
            next: data => {
                this.tarefas.push(data);
            },
            error: error => {
                console.error(error.message);
            }
        });

    }

}