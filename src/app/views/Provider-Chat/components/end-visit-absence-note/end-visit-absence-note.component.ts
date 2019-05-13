import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-end-visit-absence-note',
  templateUrl: './end-visit-absence-note.component.html',
  styleUrls: ['./end-visit-absence-note.component.css']
})
export class EndVisitAbsenceNoteComponent implements OnInit {
  @Input('visitId') visitId: number;

  constructor() { }

  ngOnInit() {
  }

}
