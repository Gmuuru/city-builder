System.register(["angular2/core", "./Renderer"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Renderer_1;
    var HQ;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Renderer_1_1) {
                Renderer_1 = Renderer_1_1;
            }],
        execute: function() {
            HQ = (function () {
                function HQ(renderer) {
                    this.renderer = renderer;
                    this.state = "";
                    this.highlightedCells = [];
                    this.building = '-';
                }
                HQ.prototype.reset = function () {
                    this.highlightedCells.forEach(function (cell) { cell.highlight(null); });
                    this.highlightedCells = [];
                    this.originCell = null;
                    this.currentCell = null;
                };
                HQ.prototype.alertOnClick = function ($event) {
                    this.reset();
                };
                HQ.prototype.alertOnEnter = function ($event, cell) {
                    this.currentCell = cell;
                    if ($event.buttons == 1) {
                        this.highlighCells();
                    }
                };
                HQ.prototype.alertOnMouseUp = function ($event, cell) {
                    var _this = this;
                    if ($event.button == 0) {
                        //left click
                        if (cell) {
                            this.highlightedCells.forEach(function (hlCell) {
                                hlCell.char = _this.building;
                                _this.renderer.renderCell(hlCell, true);
                            });
                        }
                        this.reset();
                    }
                    else if ($event.button == 1) {
                        this.reset();
                    }
                };
                HQ.prototype.alertOnMouseDown = function ($event, cell) {
                    if ($event.button == 0) {
                        this.originCell = cell;
                        this.state = "tracing path";
                        this.highlighCells();
                    }
                };
                HQ.prototype.highlighCells = function () {
                    var _this = this;
                    var startX = this.originCell.lineIndex;
                    var startY = this.originCell.colIndex;
                    var endX = this.currentCell.lineIndex;
                    var endY = this.currentCell.colIndex;
                    this.highlightedCells.forEach(function (cell) { cell.highlight(null); });
                    this.highlightedCells = [];
                    var cells = this.renderer.getCellsInPath(this.originCell.lineIndex, this.originCell.colIndex, this.currentCell.lineIndex, this.currentCell.colIndex);
                    cells.forEach(function (cell) {
                        _this.highlightedCells.push(cell);
                        cell.highlight("green");
                    });
                };
                HQ = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Renderer_1.Renderer])
                ], HQ);
                return HQ;
            })();
            exports_1("HQ", HQ);
        }
    }
});
//# sourceMappingURL=Headquarter.js.map