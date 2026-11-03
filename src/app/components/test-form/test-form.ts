import { Component, signal, ɵɵresolveBody } from '@angular/core';
import { DateCompareForm } from '../../../Forms/DateCompareForm';
import { form, FormField, required, validate, FormRoot } from '@angular/forms/signals'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-form',
  imports: [FormField, FormRoot],
  styleUrl: './test-form.css',
  templateUrl: './test-form.html',
})
export class TestForm {
  getDate : () => Date = () => {
    let date : Date = new Date();    
    date.setUTCHours(0, 0, 0, 0);

    console.log(date.toISOString());
    return date;
  }

  constructor(private httpClient: HttpClient) {}

  model = signal<DateCompareForm>({ hireDate : this.getDate(), endDate : null })
  theForm = form(
    this.model,
    path => {
    required(path.hireDate, { message: 'Hire date is Required'});
    validate(path.endDate, ({ value, valueOf }) => {
      const endDateValue : Date | null = value();

      if(!endDateValue)
        return null;

      const hireDateValue : Date = valueOf(path.hireDate);

      if(endDateValue <= hireDateValue)
      {
        return {
          kind: 'Invalid EndDate',
          message: 'End Date must be greater than Hire Date'
        }
      }  
      return null;
    });
  },
  {
    submission: {
      action : async(field) => {
        //pour un DateTime il faut supprimer .substring(0, 10)
        const hireDate : string = this.theForm.hireDate().value().toISOString().substring(0, 10);
        const endDateValue : Date | null = this.theForm.endDate().value();
        const endDate : string | null = (endDateValue) ? endDateValue.toISOString().substring(0, 10) : null;

        await this.httpClient.post('https://localhost:7215/Test', { hireDate : hireDate, endDate : endDate }).subscribe({
          next: (data) => console.log(data),
          error: (e) => console.error(e)
        });
      }
    }
  }); 
}
