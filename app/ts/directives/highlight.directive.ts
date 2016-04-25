import { Directive, ElementRef, Input}	from "angular2/core";

@Directive({
  selector: '[classSwitch]',
  host: {
	'(mouseenter)': 'onMouseEnter()',
	'(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
	private _el:HTMLElement;
	
	constructor(el: ElementRef) { 
		this._el = el.nativeElement;
	}
	
	onMouseEnter() { this.setClass("panel panel-primary"); }
	onMouseLeave() { this.setClass("panel panel-default"); }
	
	private setClass(cssClass: string) {
		this._el.parentElement.className = cssClass;
	}
}