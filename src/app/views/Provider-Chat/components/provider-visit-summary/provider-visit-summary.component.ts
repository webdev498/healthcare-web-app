import { Component, OnInit, Input } from '@angular/core';
import { PatientVisitDTO } from '../../../../models/interfaces/visits/patient-visitDTO.interface';

@Component({
  selector: 'app-provider-visit-summary',
  templateUrl: './provider-visit-summary.component.html',
  styleUrls: ['./provider-visit-summary.component.css']
})
export class ProviderVisitSummaryComponent implements OnInit {
                    date    :string;
                    summary : string;
  @Input('patient') patient : PatientVisitDTO;

  constructor() { }

  ngOnInit() {
    this.summary = this.patient.EncounterNotes;
    this.date    = this.patient.StartTime;
  }

}
