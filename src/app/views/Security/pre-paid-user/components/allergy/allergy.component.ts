//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 	from '@angular/core';
import { OnInit } 		from '@angular/core';
import { Input } 		from '@angular/core';
import { Output } 		from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'app-allergy',
	templateUrl: './allergy.component.html',
	styleUrls: ['./allergy.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class AllergyComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Component Properties Section
	//---------------------------------------------------------------------------
	@Input('allergy') allergy	: string;
	@Output() delete			: EventEmitter<string> = new EventEmitter<string>();
	@Output() update			: EventEmitter<any> = new EventEmitter<any>();

	public updating				: boolean = false;
	public data					: string;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor() { }

	ngOnInit() {
		this.data = this.allergy;
	}

	//---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
	onDelete() {
		this.delete.emit(this.allergy)
	}
	onUpdate() {
		let content = {
			old: this.allergy,
			new: this.data
		}
		this.update.emit(content);
	}
	onEdit() {
		this.updating = true;
	}

}
