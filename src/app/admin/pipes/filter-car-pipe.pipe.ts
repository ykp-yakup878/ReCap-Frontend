import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';

@Pipe({
  name: 'filterCarPipe'
})
export class FilterCarPipePipe implements PipeTransform {

  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:CarDetail)=>c.carName.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
