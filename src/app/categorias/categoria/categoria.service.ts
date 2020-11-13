import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Categoria } from './categoria';

const API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService{

    constructor(private http: HttpClient){}

    listarCategorias(): Observable<Categoria[]>{
        return this.http
        .get<Categoria[]>(`${API}/categorias`);
    }

}