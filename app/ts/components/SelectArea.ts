import { Component, ViewChild, ElementRef } from "angular2/core";
import {SelectService} from "../services/SelectService";
import {ContextMenuDirective} from "../directives/contextmenu.directive";
import {Cell} 				from "../components/Cell";


@Component(
{
	selector: 'select-zone-holder',
	directives:[ContextMenuDirective],
	template: `<selected-zone #SelectedZone
		(mousedown)="onDeselect($event)"
		[context-menu]="'select'" [contextData]="selectedCells"
		[ngStyle]="{'top': top+'px', 'left': left+'px', 'width': width+'px','height': height+'px'}"
	></selected-zone>
	`
}
)
export class SelectAreaHolder {
	
	top :number;
	left :number;
	width :number;
	height :number;
	selectedCells : Cell[];
	misteryOffset :number = 9.5;

	first : any;

	@ViewChild('SelectedZone') selectedZone : ElementRef;

	constructor(public selectService : SelectService){
		this.first = null;
		this.top = 0;
		this.left = 0;
		this.width = 0;
		this.height = 0;
	}

	ngAfterViewInit(){
		this.selectService.selectChange$.subscribe(
			($event) => {
				if($event.type == "mousedown"){
					this.handleMouseDown($event);
				} else if($event.type=="mouseenter"){
					this.handleMouseEnter($event);
				} else if($event.type=="mouseup"){
					this.handleMouseUp($event);
				}
			}
		);

		this.selectService.action$.subscribe(
			(action) => {
				if(action == "reset"){
					this.onDeselect(null);
				}
			}
		);
	}

	onDeselect($event){
		if(!$event || $event.button == 0){
			this.top = 0;
			this.left = 0;
			this.width = 0;
			this.height = 0
		}
	}

	handleMouseDown($event){
		var target = $event.target.getBoundingClientRect();
		this.first = {};
		this.first.left = target.left - this.misteryOffset;
		this.first.top = target.top + window.scrollY;
		this.first.width = 16;
		this.first.height = 16;
		this.top = this.first.top;
		this.left = this.first.left;
		this.width = this.first.width;
		this.height = this.first.height;
	}

	handleMouseEnter($event){
		var targetPos = $event.target.getBoundingClientRect();
		var targetPosLeft = targetPos.left - this.misteryOffset;
		var targetPosTop = targetPos.top + window.scrollY;
		if(this.first.top < targetPosTop){
			this.height = targetPosTop - this.first.top + 16;
		} else if(this.first.top > targetPosTop) {
			this.top = targetPosTop;
			this.height = this.first.top - this.top + this.first.height;
		} else {
			this.top = this.first.top;
			this.height = this.first.height;
		}

		if(this.first.left < targetPosLeft){
			this.width = targetPosLeft - this.first.left + 16;
		} else if(this.first.left > targetPosLeft) {
			this.left = targetPosLeft;
			this.width = this.first.left - this.left + this.first.width;
		} else {
			this.left = this.first.left
			this.width = this.first.width;
		}
	}

	handleMouseUp($event){
		this.selectedCells = this.selectService.highlightedCells;
	}
}