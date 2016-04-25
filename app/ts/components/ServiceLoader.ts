import { Component } from "angular2/core";
import {PathService} 		from "../services/PathService";
import {BuildService} 		from "../services/BuildService";
import {DeleteService} 		from "../services/DeleteService";
import {SplashService} 		from "../services/SplashService";

@Component(
{
	selector: 'service-loader',
	template: ``
}
)
export class ServiceLoader {
	
	constructor(public buildService : BuildService,
				public deleteService : DeleteService,
				public pathService : PathService,
				public splashService : SplashService){}
}