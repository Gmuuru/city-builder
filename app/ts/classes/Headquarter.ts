import {Injectable} from "angular2/core";

import {Line} from "../components/Line";
import {Cell} from "../components/Cell";
import {Renderer} from "./Renderer";

@Injectable()
export class HQ {

	state : string;
	
	currentCell : Cell;
	originCell : Cell;
	
	building : string;
	
	highlightedCells : Cell[];
	
	constructor(public renderer :Renderer){
		this.state = "";
		this.highlightedCells = [];
		this.building = '-';
	}
	
	reset() :void {
		
		this.highlightedCells.forEach(
			(cell) => {cell.highlight(null)}
		);
		this.highlightedCells = [];
		this.originCell = null;
		this.currentCell = null;
	}
	
	alertOnClick($event) :void {
		this.reset();
	}
	
	alertOnEnter($event, cell : Cell) :void {
		this.currentCell = cell;
		if($event.buttons == 1){
			this.highlighCells();
		}
	}
	
	alertOnMouseUp($event, cell : Cell) :void {
		if($event.button == 0){
			//left click
			if(cell){
				this.highlightedCells.forEach(
					(hlCell) => {
						hlCell.char = this.building;
						this.renderer.renderCell(hlCell, true);
					}
				);
			}
			this.reset();
		} else if($event.button == 1){
			this.reset();
		}
	}
	
	alertOnMouseDown($event, cell : Cell) :void {
		if($event.button == 0){
			this.originCell = cell;
			this.state = "tracing path";
			this.highlighCells();
		}
	}
	
	highlighCells() :void {
		var startX = this.originCell.lineIndex;
		var startY = this.originCell.colIndex;
		var endX = this.currentCell.lineIndex;
		var endY = this.currentCell.colIndex;
		
		this.highlightedCells.forEach(
			(cell) => {cell.highlight(null)}
		);
		this.highlightedCells = [];
		
		var cells = this.renderer.getCellsInPath(
			this.originCell.lineIndex,
			this.originCell.colIndex,
			this.currentCell.lineIndex,
			this.currentCell.colIndex );
		
		cells.forEach(
			(cell) => {
				this.highlightedCells.push(cell);
				cell.highlight("green");}
		);
	}
	
}