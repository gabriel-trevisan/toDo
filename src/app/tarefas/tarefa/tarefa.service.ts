import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Tarefa } from './tarefa';

const API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class TarefaService{

    constructor(private http: HttpClient){}

    listarTarefas(): Observable<Tarefa[]>{
        return this.http
                .get<Tarefa[]>(`${API}/tarefas`);
    }

}