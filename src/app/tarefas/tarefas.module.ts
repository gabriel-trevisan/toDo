import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TarefaListComponent } from './tarefa-list/tarefa-list.component';
import { TarefaComponent } from './tarefa/tarefa.component';

@NgModule({
  declarations: [
    TarefaListComponent,
    TarefaComponent
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
