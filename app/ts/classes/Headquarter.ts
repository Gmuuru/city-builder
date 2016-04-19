import {Injectable} from "angular2/core";

import {Service} from "./Service";
import {RoadService} from "./RoadService";
import {Cell} from "../components/Cell";

@Injectable()
export class HQ {

	state : string;
	defaultState : string;
	currentService : Service;
	defaultService : Service;
	
	constructor(public roadService :RoadService){
		this.defaultService = null;
		this.defaultState = "";
		this.reset();
	}
	
	reset() :void {
		if(this.currentService){
			this.currentService.reset();
		}
		this.state = this.defaultState;
		this.currentService = this.defaultService;
	}
	
	alertMainMouseEvent($event, action:string) :void {
		this.reset();
		if(this.currentService){
			this.currentService.reset();
		}
	}
	
	alertCellMouseEvent($event, action :string, cell :Cell) :void {
		if(this.currentService){
			this.currentService.alertCellMouseEvent( $event , action , cell );
		}
	}
	
	notifySelection(type :string, selection :string){
		this.state = type;
		if(type == "PATHING"){
			this.currentService = this.roadService;
			this.currentService.init([selection]);
		} else {
			this.reset();
		}
	}
}