import { Component, OnInit, Input } from '@angular/core';
import { PatientVisitDTO } from '../../../../models/interfaces/visits/patient-visitDTO.interface';

@Component({
  selector: 'app-end-visit-encounter-note',
  templateUrl: './end-visit-encounter-note.component.html',
  styleUrls: ['./end-visit-encounter-note.component.css']
})
export class EndVisitEncounterNoteComponent implements OnInit {
  @Input('patient') patient :PatientVisitDTO;
  encouterValue             : string  = "";
  constructor() { }

  ngOnInit() {
    this.encouterValue = this.patient.EncounterNotes
  }

}
