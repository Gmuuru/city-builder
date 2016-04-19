import { Component } from "angular2/core";
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {HQ} from "../classes/Headquarter";

@Component(
{
	selector: 'build-accordion',
	directives:[ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
	templateUrl: 'app/templates/BuildMenu.html',
}
)
export class BuildMenuComponent {

	public oneAtATime:boolean = true;

	public selected : string;
	
	
	constructor(public HQ : HQ){
		this.sections.forEach(
			(section) => {
				section.colsize = 12 / Math.min(3, Math.max(section.content.length, 1));
				section.rowsize = Math.ceil(Math.max(1, section.content.length / 3));
			}
		);
	}
	
	select(selected:string){
		this.selected = selected;
		var type = "";
		if(selected == 'road' || selected == 'rw' || selected == ''){
			type = "PATHING";
		}
		this.HQ.notifySelection(type, selected);
	}
	
	reset(){
		this.selected = null;
	}
	
	public sections:Array<any> = [
    {
      title: 'General Features',
      content: [
		{
			name : 'road',
			label: 'Road'
		},
		{
			name : 'rw',
			label: 'Wall'
		}
	  ]
    },
    {
      title: 'Housing',
      content: [
	    {
			name : 'house-hi',
			label: 'House'
		},
		{
			name : 'elite-hi',
			label: 'Elite House'
		}
	  ]
    },
    {
      title: 'Agriculture',
      content: [
	  {
			name : 'house-hi',
			label: 'House'
		},
		{
			name : 'elite-hi',
			label: 'Elite House'
		},
		{
			name : 'house-hi',
			label: 'House'
		},
		{
			name : 'elite-hi',
			label: 'Elite House'
		},
		{
			name : 'house-hi',
			label: 'House'
		},
		{
			name : 'elite-hi',
			label: 'Elite House'
		},
		{
			name : 'house-hi',
			label: 'House'
		},
		{
			name : 'elite-hi',
			label: 'Elite House'
		}
	  ]
    },
    {
      title: 'Industry',
      content: []
    },
    {
      title: 'Commerce',
      content: []
    },
    {
      title: 'Safety',
      content: []
    },
    {
      title: 'Government',
      content: []
    },
    {
      title: 'Entertainment',
      content: []
    },
    {
      title: 'Religion',
      content: []
    },
    {
      title: 'Defence',
      content: []
    },
    {
      title: 'Landscape',
      content: []
    },
    {
      title: 'Monuments',
      content: []
    }
	];
}