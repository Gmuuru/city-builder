import {Injectable} 	from "angular2/core";
import {Subject}    	from 'rxjs/Subject';

import {Service} 		from "./Service";
import {Cell} 			from "../components/Cell";

@Injectable()
export class Headquarter {

	currentService : Service;
	defaultService : Service;
	
	constructor(){
		this.defaultService = null;
		this.reset();
	}
	
	private _kbShortcutEventSource = new Subject<number>();
	private _menuToggleEventSource = new Subject<string>();
	private _globalEventSource = new Subject<string>();
	private _serviceActivationSource = new Subject<any>();
	private _currentActionSource = new Subject<string>();
	private _currentMessageSource = new Subject<string>();
	
	kbShortcut$ = this._kbShortcutEventSource.asObservable();
	toggle$ = this._menuToggleEventSource.asObservable();
	globalEventFired$ = this._globalEventSource.asObservable();
	serviceChange$ = this._serviceActivationSource.asObservable();
	actionChange$ = this._currentActionSource.asObservable();
	messageChange$ = this._currentMessageSource.asObservable();
	
	reset() :void {
		this._globalEventSource.next("reset");
		this._currentActionSource.next("");
		this._currentMessageSource.next("");
		this.switchService(this.defaultService);
	}
	
	alertMainMouseEvent($event, action:string) :void {
		this.reset();
	}
	
	alertCellMouseEvent($event, action :string, cell :Cell) :void {
		if(this.currentService){
			this.currentService.alertCellMouseEvent( $event , action , cell );
		}
	}
	
	switchService(service : Service){
		if(this.currentService){
			this.currentService.reset();
		}
		this.currentService = service;
	}
	
	sendMessage(msg :string){
		this._currentMessageSource.next(msg);
	}
	
	activateService(service : Service){
		this.switchService(service);
	}
	
	notifySelection(item){
		this._serviceActivationSource.next(item);
		if(item.name == "delete"){
			this._currentActionSource.next(`Deleting`);
		} else {
			this._currentActionSource.next(`Building ${item.longLabel}`);
		}
	}
	
	keyPress($event){
		if($event.keyCode != 0){
			switch($event.keyCode){
				case 27 : {
					// escape
					this.reset();
					return;
				}
				case 46 : {
					// delete
					this._kbShortcutEventSource.next(-1);
					return;
				}
				default : {
					return;
				}
			}
		} else {
			switch($event.charCode){
				case 60 : case 62 : {
					// < et >
					this._menuToggleEventSource.next("");
					return;
				}
				case 116 : {
					// t pour tourner un element
					if(this.currentService){
						var newBuilding = this.currentService.rotate();
						this._currentActionSource.next(`Building ${newBuilding}`);
					}
					return;
				}
				default : {
					this._kbShortcutEventSource.next($event.charCode);
					return;
				}
			}
		}
	}
}