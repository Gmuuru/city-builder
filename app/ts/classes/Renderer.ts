import {Injectable} from "angular2/core";

import {ProgressiveLoader} from "./ProgressiveLoader";
import {Line} from "../components/Line";
import {Cell} from "../components/Cell";

@Injectable()
export class Renderer {

	lines : Line[];
	storage : Line[];
	init : boolean;
	
	constructor(public pl :ProgressiveLoader){
		this.lines = [];
	}
	
	render(lines : Line[]) :void {
	
		this.reset();
		this.storage = lines;
		this.storage.forEach(
			(line) => {
				line.cells.forEach(
				
					(cell) => {this.renderCell(cell, false);}
				);
			}
		);
		
		this.pl.load(this.storage, this.lines);
		
		this.init = false;
		
	}
	
	getLines() :Line[]{
		return this.lines;
	}
	
	getCellsInPath(startLinePos :number,startColPos :number,endLinePos :number, endColPos:number) :Cell[] {
		var res = [];
		if(startLinePos == endLinePos && startColPos == endColPos){
			// une seule cell
			res.push(this.lines[startLinePos].cells[startColPos]);
		}
		
		// verification du quadrant
		else if(startLinePos < endLinePos && startColPos <= endColPos){
			// en bas a droite
			for(var i = startLinePos; i <= endLinePos; i++){
				res.push(this.lines[i].cells[startColPos]);
			}
			for(var j = startColPos; j <= endColPos; j++){
				res.push(this.lines[endLinePos].cells[j]);
			}
		} else if(startLinePos >= endLinePos && startColPos < endColPos){
			//en haut a droite
			for(var i = startColPos; i <= endColPos; i++){
				res.push(this.lines[startLinePos].cells[i]);
			}
			for(var j = startLinePos; j >= endLinePos; j--){
				res.push(this.lines[j].cells[endColPos]);
			}
		} else if(startLinePos > endLinePos && startColPos >= endColPos){
			//en haut a gauche
			for(var i = startLinePos; i >= endLinePos; i--){
				res.push(this.lines[i].cells[startColPos]);
			}
			for(var j = startColPos; j >= endColPos; j--){
				res.push(this.lines[endLinePos].cells[j]);
			}
		} else if(startLinePos <= endLinePos && startColPos > endColPos){
			//en bas a gauche
			for(var i = startColPos; i >= endColPos; i--){
				res.push(this.lines[startLinePos].cells[i]);
			}
			for(var j = startLinePos; j <= endLinePos; j++){
				res.push(this.lines[j].cells[endColPos]);
			}
		}
		return res;
	}
	
	reset(){
		this.lines = [];
		this.storage = [];
		this.init = true;
	}
	
	
	
	renderCell(cell:Cell, renderSurroundingCells : boolean):void {
		
		if(cell.ref){
			return;
		}
		var c:string = cell.char; 
		var sc:number = this.getSurroundingConfig(c, cell.lineIndex, cell.colIndex);
		cell.render(sc);
		
		if(cell.width+cell.height > 2){
			this.spreadRefCell(cell);
		}
		
		if(renderSurroundingCells && cell.char != null && (cell.char == '-' || cell.char == 't' || cell.char == '_')){
			// il faut regenerer les cellules environnantes dans le cas des path
			this.renderSurroundingCells(cell, sc);
		}
		
	}
	
	renderSurroundingCells(cell:Cell, sc:number){
		if(sc == 0){
			return;
		}
		var cellToRender = null;
		var scToRender = null;
		var c = cell.char;
		if(sc == 1 || sc == 5 || sc == 7 || sc == 8 || sc == 11 || sc == 12 || sc == 14 || sc == 15){
			// top cell
			cellToRender = this.lines[cell.lineIndex-1].cells[cell.colIndex];
			scToRender = this.getSurroundingConfig(c, cellToRender.lineIndex, cellToRender.colIndex);
			cellToRender.render(scToRender);
		}
		if(sc == 2 || sc == 6 || sc == 8 || sc == 9 || sc == 11 || sc == 13 || sc == 14 || sc == 15){
			//right cell
			cellToRender = this.lines[cell.lineIndex].cells[cell.colIndex+1];
			scToRender = this.getSurroundingConfig(c, cellToRender.lineIndex, cellToRender.colIndex);
			cellToRender.render(scToRender);
		}
		if(sc == 3 || sc == 5 || sc == 9 || sc == 10 || sc == 12 || sc == 13 || sc == 14 || sc == 15){
			//bottom cell
			cellToRender = this.lines[cell.lineIndex+1].cells[cell.colIndex];
			scToRender = this.getSurroundingConfig(c, cellToRender.lineIndex, cellToRender.colIndex);
			cellToRender.render(scToRender);
		}
		if(sc == 4 || sc == 6 || sc == 7 || sc == 10 || sc == 11 || sc == 12 || sc == 13 || sc == 15){
			//left cell
			cellToRender = this.lines[cell.lineIndex].cells[cell.colIndex-1];
			scToRender = this.getSurroundingConfig(c, cellToRender.lineIndex, cellToRender.colIndex);
			cellToRender.render(scToRender);
		}
	}
	
	/*	0   1				5		  7  8			 b		 c			 e		 f
	 * 0c0  c	c2	c	4c	c	6c6	 7c	 c8	c9	ac	bcb		cc	dcd		 ce		fcf
	 *  0			3		5				9	 a			 c	 d		 e		 f
	 *  
	 *  
	 */
	
	getSurroundingConfig(c : string, x:number, y:number) : number{
		var top:boolean = this.isIdentic(c, x-1, y);
		var bottom:boolean = this.isIdentic(c, x+1, y);
		var right:boolean = this.isIdentic(c, x, y+1);
		var left:boolean = this.isIdentic(c, x, y-1);
		
		if(!top && !bottom && !left && !right){
			//tout seul
			return 0;
		}
		if(top){
			if(bottom){
				if(right){
					if(left){
						return 15;
					} else {
						return 14;
					}
				} else {
					if(left){
						return 12;
					} else {
						return 5;
					}
				}
			} else {
				// !bottom
				if(right){
					if(left){
						return 11;
					} else {
						return 8;
					}
				} else {
					//!right
					if(left){
						return 7;
					} else {
						return 1;
					}
				}
			}
		} else {
			//!top
			if(bottom){
				if(right){
					if(left){
						return 13;
					} else {
						return 9;
					}
				} else {
					if(left){
						return 10;
					} else {
						return 3;
					}
				}
			} else {
				// !bottom
				if(right){
					if(left){
						return 6;
					} else {
						return 2;
					}
				} else {
					//!right
					if(left){
						return 4;
					} else {
						return 0;
					}
				}
			}
		}
	}
	
	isIdentic(c : string, x:number, y:number) : boolean{
	
		var source = this.init ? this.storage : this.lines;
		
		if(x < 0 || x == source.length || y < 0 || y == source[0].cells.length){
			return false;
		}
		return c == source[x].cells[y].char;
	}
	
	spreadRefCell(ref:Cell){
		var source = this.init ? this.storage : this.lines;
		var refLine:number = ref.lineIndex;
		var refCol:number = ref.colIndex;
		var refWidth:number = ref.width;
		var refHeight:number = ref.height;
		var lineOffset:number = 0;
		var colOffset:number = 0;
		
		
		while(lineOffset < refHeight && (refLine + lineOffset) < source.length){
			colOffset = (lineOffset == 0) ? 1 : 0;
			while(colOffset < refWidth && (refCol + colOffset) < source[0].cells.length){
				source[refLine + lineOffset].cells[refCol + colOffset].setRef(ref);
				colOffset++;
			}
			lineOffset++;
		}
	}
	
}