import { Component, OnInit }    from '@angular/core';
import { ProvidersService }     from '../../../../services/providers.service';

@Component({
  selector: 'app-end-visit-diagnosis',
  templateUrl: './end-visit-diagnosis.component.html',
  styleUrls: ['./end-visit-diagnosis.component.css']
})
export class EndVisitDiagnosisComponent implements OnInit {

  constructor(
    private provider: ProvidersService
  ) { }

  ngOnInit() {
  }

}
