import {Cell} from "../components/Cell";

export interface Service {
	
	
	alertCellMouseEvent($event, action :string, cell :Cell) :void;
	reset() :void;
	init( args? : string[] ) :void;
	
}