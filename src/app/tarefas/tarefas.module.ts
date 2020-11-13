import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TarefaListComponent } from './tarefa-list/tarefa-list.component';
import { TarefaComponent } from './tarefa/tarefa.component';
import { FiltrarPorDescricao } from './tarefa-list/filtrar-por-descricao.pipe';

@NgModule({
  declarations: [
    TarefaListComponent,
    TarefaComponent,
    FiltrarPorDescricao
  ],
  exports: [
    TarefaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class TarefasModule { }
