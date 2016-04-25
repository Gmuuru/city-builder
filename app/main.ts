/// <reference path="../node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } 		from "angular2/platform/browser";
import { Component } 		from "angular2/core";
import { Injectable } 		from "angular2/core";

import {Headquarter} 		from "./ts/services/Headquarter";
import {PathService} 		from "./ts/services/PathService";
import {BuildService} 		from "./ts/services/BuildService";
import {DeleteService} 		from "./ts/services/DeleteService";
import {SplashService} 		from "./ts/services/SplashService";

import {Parser} 			from "./ts/classes/Parser";
import {ProgressiveLoader} 	from "./ts/classes/ProgressiveLoader";
import {Renderer} 			from "./ts/classes/Renderer";

import {BuildMenuComponent} from "./ts/components/BuildMenu";
import {Line} 				from "./ts/components/Line";
import {LineComponent} 		from "./ts/components/Line";
import {ServiceLoader} 		from "./ts/components/ServiceLoader";

//############################ APP #########################################

@Component(
{
	selector: 'reader',
	template: `
    <!-- Menu Bar -->
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a style="color:#DDDDDD" href="#" class="navbar-brand">Emperor City Planner</a>
        </div>
        <div>
          <ul class="nav navbar-nav">
            <li>
				<a href="javascript:void(0)" onclick="$('#upload').click()">Open</a>
				<form>
					<input id="upload" type="file" name=test style="visibility:hidden;position:absolute;top:0;left:0;width:0px" (change)="fileChangeEvent($event)">
				</form>
			
			</li>
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
					New 
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<li><a href="javascript:void(0)" (click)="newMap(10,10)">Tiny</a></li>
					<li><a href="javascript:void(0)" (click)="newMap(25,25)">Small</a></li>
					<li><a href="javascript:void(0)" (click)="newMap(50,50)">Normal</a></li>
					<li><a href="javascript:void(0)" (click)="newMap(75,75)">Big</a></li>
					<li><a href="javascript:void(0)" (click)="newMap(90,90)">Huge</a></li>
					<li><a href="javascript:void(0)" (click)="newMap(120,120)">Enormous</a></li>
				</ul>
			</li>
          </ul>
        </div>
		<current-action class="pull-right">
			{{currentAction}}
			<span *ngIf="currentAction && currentMessage">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
			{{currentMessage}}
		</current-action>
      </div>
    </nav>
	<map-container class="panel panel-primary" (click)="click($event)" (contextmenu)="click($event)" [ngClass]="{expanded: toggled, collapsed: !toggled}">
		<map>
			<line-block *ngFor="#line of getLines()" [line]="line" style="width:{{line.getWidth()}}px"></line-block>
		</map>
	</map-container>
	
	<build-menu *ngIf="getLines().length > 0" [ngClass]="{expanded: toggled, collapsed: !toggled}">
		<collapse-button>
			<button *ngIf="!toggled" class="btn btn-primary btn-xs glyphicon glyphicon-backward" (click)="toggle()"></button>
		</collapse-button>
		<div class="accordion-container panel panel-primary">
			<div class="panel-heading clearfix">
				<span *ngIf="toggled" class="btn btn-primary btn-xs glyphicon glyphicon-forward pull-left" (click)="toggle()"></span>
				<span class="menu-title">Build Menu</span>
			</div>
			<build-accordion></build-accordion>
		</div>
	</build-menu>
	<service-loader></service-loader>
	`,
	host: {
		'(document:keypress)': 'onKeyPress($event)'
	},
	directives: [LineComponent, BuildMenuComponent, ServiceLoader],
	providers : [ProgressiveLoader, Renderer, Headquarter, PathService, BuildService, DeleteService, SplashService]
}
)
class mainApp {
	
	file : File;
	contentText : string;
	toggled : boolean;
	currentAction : string;
	currentMessage : string;
	
	constructor(public renderer: Renderer, public HQ :Headquarter){
		this.toggled = false;
		this.file = null;
		this.currentAction = "";
		this.currentMessage = "";
		this.HQ.actionChange$.subscribe(
			(action) => {
				this.currentAction = action;
			}
		);
		this.HQ.messageChange$.subscribe(
			(msg) => {
				this.currentMessage = msg;
			}
		);
		this.HQ.toggle$.subscribe(
			(action) => {
				this.toggle();
			}
		);
	}
	getLines() :Line[]{
		return this.renderer.getLines();
	}
	
	newMap(x:number, y:number) : void{
		this.toggled = true;
		var lines : Line[] = [];
		for(var i = 0; i < y; i++){
			var line:Line = new Line(i, x);
			line.complete();
			lines.push(line);
		}
		this.renderer.render(lines);
		
	}
	
	//events
	
	onKeyPress($event){
		this.HQ.keyPress($event);
	}
	
	click($event){
		var target = $event.target;
		if(target.tagName == 'MAP' || target.tagName == 'MAP-CONTAINER'){
			this.HQ.alertMainMouseEvent($event, "click");
		}
	}
	
	// file reading
	fileChangeEvent(fileInput: any){
        this.file = (<File[]> fileInput.target.files)[0];
		this.read();
    }
	
	read(): void {
		var reader : FileReader = new FileReader();
		reader.onload  = (e) => {
			this.toggled = true;
			var lines = Parser.parse(reader.result);
			this.renderer.render(lines);
		};
		reader.readAsText(this.file);
	}
	
	toggle() :void{
		this.toggled = !this.toggled;
	}
}

bootstrap(mainApp);