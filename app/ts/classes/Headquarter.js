System.register(["angular2/core", "./RoadService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, RoadService_1;
    var HQ;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (RoadService_1_1) {
                RoadService_1 = RoadService_1_1;
            }],
        execute: function() {
            HQ = (function () {
                function HQ(roadService) {
                    this.roadService = roadService;
                    this.defaultService = null;
                    this.defaultState = "";
                    this.reset();
                }
                HQ.prototype.reset = function () {
                    if (this.currentService) {
                        this.currentService.reset();
                    }
                    this.state = this.defaultState;
                    this.currentService = this.defaultService;
                };
                HQ.prototype.alertMainMouseEvent = function ($event, action) {
                    this.reset();
                    if (this.currentService) {
                        this.currentService.reset();
                    }
                };
                HQ.prototype.alertCellMouseEvent = function ($event, action, cell) {
                    if (this.currentService) {
                        this.currentService.alertCellMouseEvent($event, action, cell);
                    }
                };
                HQ.prototype.notifySelection = function (type, selection) {
                    this.state = type;
                    if (type == "PATHING") {
                        this.currentService = this.roadService;
                        this.currentService.init([selection]);
                    }
                    else {
                        this.reset();
                    }
                };
                HQ = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [RoadService_1.RoadService])
                ], HQ);
                return HQ;
            })();
            exports_1("HQ", HQ);
        }
    }
});
//# sourceMappingURL=Headquarter.js.map