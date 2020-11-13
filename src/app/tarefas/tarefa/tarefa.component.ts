import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';

import { TarefaService } from './tarefa.service';
import { Tarefa } from '../tarefa/tarefa';
import { CategoriaService } from '../../categorias/categoria/categoria.service';
import { Categoria } from '../../categorias/categoria/categoria';

@Component({
    selector: 'todo-tarefa',
    templateUrl: './tarefa.component.html',
    styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

    title: string = 'Tarefas';
    
    tarefaForm: FormGroup;
    categorias: Categoria[] = [];
    tarefas: Tarefa[] = [];

    constructor(
        private http: HttpClient, 
        private formBuilder: FormBuilder,
        private tarefaService: TarefaService,
        private categoriaService: CategoriaService
    ){}

    ngOnInit(): void {

        this.tarefaForm = this.formBuilder.group({
            categoria: [''],
            descricao: [''],
            data_limite: [''],
            concluido : [false]
        })

        this.tarefaService
            .listarTarefas()
            .subscribe(tarefas => this.tarefas = tarefas);

        this.categoriaService
            .listarCategorias()
            .subscribe(categorias => this.categorias = categorias);
    }

    onKey(event: any) {
        let filter = '' ;
        filter += event.target.value;

        /*this.tarefas = this.tarefasCache.filter(tarefa => {
            let reg = new RegExp(filter, 'i');
            return tarefa.descricao.match(reg);
        });*/
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