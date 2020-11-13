import { Pipe, PipeTransform } from '@angular/core';
import { Tarefa } from '../tarefa/tarefa';

@Pipe({
    name: 'filtrarPorDescricao'
})
export class FiltrarPorDescricao implements PipeTransform{
    
    transform(tarefas: Tarefa[], descricaoQuery: string) {
        descricaoQuery = descricaoQuery
                .trim()
                .toLowerCase();

        if(descricaoQuery){
            return tarefas.filter(tarefa => 
                tarefa.descricao.toLowerCase().includes(descricaoQuery)
            )
        } else {
            return tarefas;
        }
    }

}