System.register(["angular2/platform/browser", "angular2/core", "./ts/classes/Parser", "./ts/classes/ProgressiveLoader", "./ts/classes/Renderer", "./ts/classes/Headquarter", "./ts/components/Line"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, Parser_1, ProgressiveLoader_1, Renderer_1, Headquarter_1, Line_1, Line_2;
    var mainApp;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Parser_1_1) {
                Parser_1 = Parser_1_1;
            },
            function (ProgressiveLoader_1_1) {
                ProgressiveLoader_1 = ProgressiveLoader_1_1;
            },
            function (Renderer_1_1) {
                Renderer_1 = Renderer_1_1;
            },
            function (Headquarter_1_1) {
                Headquarter_1 = Headquarter_1_1;
            },
            function (Line_1_1) {
                Line_1 = Line_1_1;
                Line_2 = Line_1_1;
            }],
        execute: function() {
            //############################ APP #########################################
            mainApp = (function () {
                function mainApp(renderer, HQ) {
                    this.renderer = renderer;
                    this.HQ = HQ;
                    this.toggled = true;
                    this.file = null;
                    this.loaded = false;
                }
                mainApp.prototype.getLines = function () {
                    return this.renderer.getLines();
                };
                mainApp.prototype.newMap = function (x, y) {
                    var lines = [];
                    for (var i = 0; i < y; i++) {
                        var line = new Line_1.Line(i, x);
                        line.complete();
                        lines.push(line);
                    }
                    this.renderer.render(lines);
                };
                //events
                mainApp.prototype.click = function ($event) {
                    this.HQ.alertOnClick($event);
                };
                // file reading
                mainApp.prototype.fileChangeEvent = function (fileInput) {
                    this.file = fileInput.target.files[0];
                    this.read();
                };
                mainApp.prototype.read = function () {
                    var _this = this;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var lines = Parser_1.Parser.parse(reader.result);
                        _this.renderer.render(lines);
                    };
                    reader.readAsText(this.file);
                };
                mainApp.prototype.toggle = function () {
                    this.toggled = !this.toggled;
                };
                mainApp = __decorate([
                    core_1.Component({
                        selector: 'reader',
                        template: "\n\t\n    <!-- Menu Bar -->\n    <nav class=\"navbar navbar-inverse\">\n      <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n          <a style=\"color:#DDDDDD\" href=\"#\" class=\"navbar-brand\">Angular2 testing</a>\n        </div>\n        <div>\n          <ul class=\"nav navbar-nav\">\n            <li>\n\t\t\t\t<a href=\"javascript:void(0)\" onclick=\"$('#upload').click()\">Open</a>\n\t\t\t\t<form>\n\t\t\t\t\t<input id=\"upload\" type=\"file\" name=test style=\"visibility:hidden;position:absolute;top:0;left:0;width:0px\" (change)=\"fileChangeEvent($event)\">\n\t\t\t\t</form>\n\t\t\t\n\t\t\t</li>\n\t\t\t<li class=\"dropdown\">\n\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t\t\tNew \n\t\t\t\t\t<span class=\"caret\"></span>\n\t\t\t\t</a>\n\t\t\t\t<ul class=\"dropdown-menu\">\n\t\t\t\t\t<li><a href=\"javascript:void(0)\" (click)=\"newMap(10,10)\">Tiny</a></li>\n\t\t\t\t\t<li><a href=\"javascript:void(0)\" (click)=\"newMap(25,25)\">Small</a></li>\n\t\t\t\t\t<li><a href=\"javascript:void(0)\" (click)=\"newMap(50,50)\">Normal</a></li>\n\t\t\t\t\t<li><a href=\"javascript:void(0)\" (click)=\"newMap(75,75)\">Big</a></li>\n\t\t\t\t\t<li><a href=\"javascript:void(0)\" (click)=\"newMap(90,90)\">Huge</a></li>\n\t\t\t\t\t<li><a href=\"javascript:void(0)\" (click)=\"newMap(120,120)\">Enormous</a></li>\n\t\t\t\t</ul>\n\t\t\t</li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n\t<map-container (click)=\"click($event)\" (contextmenu)=\"click($event)\" [ngClass]=\"{expanded: toggled, collapsed: !toggled}\">\n\t\t<div class='map'>\n\t\t\t<line-block *ngFor=\"#line of getLines()\" [line]=\"line\" style=\"width:{{line.getWidth()}}px\"></line-block>\n\t\t</div>\n\t</map-container>\n\t\n\t<build-menu *ngIf=\"getLines().length > 0\" class=\"panel panel-primary\" [ngClass]=\"{expanded: toggled, collapsed: !toggled}\">\n\t\t<collapse-button>\n\t\t\t<button class=\"btn btn-primary btn-xs glyphicon\" (click)=\"toggle()\" [ngClass]=\"{'glyphicon-forward': toggled, 'glyphicon-backward': !toggled}\"></button>\n\t\t</collapse-button>\n\t</build-menu>\n\t",
                        directives: [Line_2.LineComponent],
                        providers: [Renderer_1.Renderer, ProgressiveLoader_1.ProgressiveLoader, Headquarter_1.HQ]
                    }), 
                    __metadata('design:paramtypes', [Renderer_1.Renderer, Headquarter_1.HQ])
                ], mainApp);
                return mainApp;
            })();
            browser_1.bootstrap(mainApp);
        }
    }
});
//# sourceMappingURL=main.js.map