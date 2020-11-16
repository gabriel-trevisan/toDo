import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';

import { TarefaService } from './tarefa.service';
import { Tarefa } from '../tarefa/tarefa';
import { CategoriaService } from '../../categorias/categoria/categoria.service';
import { Categoria } from '../../categorias/categoria/categoria';
import { forkJoin } from "rxjs";
import { map } from 'rxjs/operators';

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
    filter: string = '';

    constructor(
        private http: HttpClient, 
        private formBuilder: FormBuilder,
        private tarefaService: TarefaService,
        private categoriaService: CategoriaService
    ){}

    ngOnInit(): void {

        this.tarefaForm = this.formBuilder.group({
            categoria_id: [],
            descricao: [''],
            data_limite: [''],
            concluido : [false]
        })

        this.categoriaService
            .listarCategorias()
            .subscribe(categorias => this.categorias = categorias);

        forkJoin([
            this.tarefaService.listarTarefas(),
            this.categoriaService.listarCategorias()
        ]).pipe(map(([tarefas, categorias]) => {
                return this.mudarCategoriaIdParaNome(tarefas, categorias);
            })
        ).subscribe(result => this.tarefas = result);

    }

    inserirTarefa(event: any) {
        event.preventDefault();

        let formValue = this.tarefaForm.getRawValue();

        this.http
        .post<any>('http://localhost:3000/tarefas', formValue).subscribe({
            next: data => {
                this.tarefas.push(data);
                this.tarefas = this.mudarCategoriaIdParaNome(this.tarefas, this.categorias);
            },
            error: error => {
                console.error(error.message);
            }
        });

    }

    mudarCategoriaIdParaNome(tarefas: Tarefa[], categorias: Categoria[]): Tarefa[] {
        tarefas.forEach(tarefa => {
            categorias.forEach(categoria => {
                if(tarefa.categoria_id == categoria.id){
                    tarefa.categoria = categoria.nome;
                }
            })
        });
        return tarefas;
    }

}