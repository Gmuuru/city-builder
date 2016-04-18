System.register(["angular2/core", "../classes/Headquarter"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2, Headquarter_1;
    var Cell, CellComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (Headquarter_1_1) {
                Headquarter_1 = Headquarter_1_1;
            }],
        execute: function() {
            Cell = (function () {
                function Cell(lineIndex, colIndex, char) {
                    this.lineIndex = lineIndex;
                    this.colIndex = colIndex;
                    this.char = char;
                }
                Cell.prototype.render = function (sc) {
                    var data = this.MAP_TABLE[this.char];
                    if (!data) {
                        console.log("Error : unknown char " + this.char + " (" + this.char.charCodeAt(0) + ")");
                    }
                    else {
                        this.char = data[0];
                        this.width = data[2];
                        this.height = data[3];
                        this.label = data[4];
                        this.setName(data[1], sc);
                        this.ref = null;
                    }
                };
                Cell.prototype.setName = function (name, sc) {
                    var nameStr = name;
                    if (this.char != null && (this.char == '-' || this.char == 't' || this.char == '_')) {
                        nameStr += this.adaptToSurroundings(sc);
                    }
                    this.name = nameStr;
                };
                Cell.prototype.setRef = function (ref) {
                    this.ref = ref;
                    this.name = null;
                };
                Cell.prototype.getTitle = function () {
                    if (this.ref) {
                        return this.ref.label;
                    }
                    return this.label;
                };
                Cell.prototype.isEmpty = function () {
                    return this.char == '' || this.char == ' ' || this.char == '.';
                };
                Cell.prototype.highlight = function (hl) {
                    this.hl = hl;
                };
                Cell.prototype.adaptToSurroundings = function (sc) {
                    if (sc == 1 || sc == 3 || sc == 5) {
                        return "-v";
                    }
                    else if (sc == 8) {
                        return "-l1";
                    }
                    else if (sc == 9) {
                        return "-l2";
                    }
                    else if (sc == 10) {
                        return "-l3";
                    }
                    else if (sc == 7) {
                        return "-l4";
                    }
                    else if (sc == 11) {
                        return "-t1";
                    }
                    else if (sc == 14) {
                        return "-t2";
                    }
                    else if (sc == 13) {
                        return "-t3";
                    }
                    else if (sc == 12) {
                        return "-t4";
                    }
                    else if (sc == 15) {
                        return "-x";
                    }
                    else {
                        return "-h";
                    }
                };
                Cell = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Number, Number, String])
                ], Cell);
                return Cell;
            })();
            exports_1("Cell", Cell);
            CellComponent = (function () {
                function CellComponent(HQ) {
                    this.HQ = HQ;
                }
                CellComponent.prototype.cellWidth = function () {
                    return 16 * this.cell.width;
                };
                CellComponent.prototype.cellHeigth = function () {
                    return 16 * this.cell.height;
                };
                CellComponent.prototype.mouseEnter = function ($event) {
                    this.HQ.alertOnEnter($event, this.cell);
                };
                CellComponent.prototype.mouseDown = function ($event) {
                    this.HQ.alertOnMouseDown($event, this.cell);
                };
                CellComponent.prototype.mouseUp = function ($event) {
                    this.HQ.alertOnMouseUp($event, this.cell);
                };
                CellComponent = __decorate([
                    core_2.Component({
                        selector: 'cell-block',
                        inputs: ['cell'],
                        template: "\n\t\t<div style=\"width:{{cellWidth()}}px; height:{{cellHeigth()}}px\" class=\"{{cell.name}}\" \n\t\t\t(mousedown)=\"mouseDown($event)\"\n\t\t\t(mouseup)=\"mouseUp($event)\"\n\t\t\t(mouseenter)=\"mouseEnter($event)\"></div>\n\t\t<div [hidden]=\"!cell.hl\" class=\"hl hl-{{cell.hl}}\"\n\t\t\t(mousedown)=\"mouseDown($event)\"\n\t\t\t(mouseup)=\"mouseUp($event)\"\n\t\t\t(mouseenter)=\"mouseEnter($event)\"></div>\n\t"
                    }), 
                    __metadata('design:paramtypes', [Headquarter_1.HQ])
                ], CellComponent);
                return CellComponent;
            })();
            exports_1("CellComponent", CellComponent);
            Cell.prototype.MAP_TABLE = {};
            Cell.prototype.MAP_TABLE[""] = [" ", "grass", 1, 1, "grass"];
            Cell.prototype.MAP_TABLE[" "] = [" ", "grass", 1, 1, "grass"];
            Cell.prototype.MAP_TABLE["."] = [".", "1x1", 1, 1, "arid"];
            Cell.prototype.MAP_TABLE["Œ"] = ["Œ", "rocks", 1, 1, "rocks"];
            Cell.prototype.MAP_TABLE["œ"] = ["œ", "water", 1, 1, "water"];
            Cell.prototype.MAP_TABLE["Ÿ"] = ["Ÿ", "dunes", 1, 1, "beach/dunes"];
            Cell.prototype.MAP_TABLE["¹"] = ["¹", "saltmarsh", 1, 1, "salt marsh"];
            Cell.prototype.MAP_TABLE["²"] = ["²", "ore", 1, 1, "ore"];
            Cell.prototype.MAP_TABLE["³"] = ["³", "quarry", 1, 1, "quarry"];
            // trade
            Cell.prototype.MAP_TABLE["0"] = ["0", "m-empty", 2, 2, "Empty Shop"];
            Cell.prototype.MAP_TABLE["1"] = ["1", "m-food", 2, 2, "Food Shop"];
            Cell.prototype.MAP_TABLE["2"] = ["2", "m-hemp", 2, 2, "Hemp Shop"];
            Cell.prototype.MAP_TABLE["3"] = ["3", "m-silk", 2, 2, "Silk Shop"];
            Cell.prototype.MAP_TABLE["4"] = ["4", "m-pottery", 2, 2, "Ceramics Shop"];
            Cell.prototype.MAP_TABLE["5"] = ["5", "m-laquer", 2, 2, "Wares Shop"];
            Cell.prototype.MAP_TABLE["6"] = ["6", "m-tea", 2, 2, "Tea Shop"];
            Cell.prototype.MAP_TABLE["7"] = ["7", "mill", 5, 5, "Mill"];
            Cell.prototype.MAP_TABLE["8"] = ["8", "warehouse", 3, 3, "Warehouse"];
            Cell.prototype.MAP_TABLE["9"] = ["9", "tradepost", 4, 4, "Trading Station"];
            Cell.prototype.MAP_TABLE["~"] = ["~", "tradepier-n", 4, 7, "Trading Pier"];
            Cell.prototype.MAP_TABLE["`"] = ["`", "tradepier-e", 7, 4, "Trading Pier"];
            Cell.prototype.MAP_TABLE["("] = ["(", "improad-v", 1, 3, "Imperial Way (V)"];
            Cell.prototype.MAP_TABLE[")"] = [")", "improad-h", 3, 1, "Imperial Way (H)"];
            Cell.prototype.MAP_TABLE["["] = ["[", "market-h", 4, 3, "Common Market (H)"];
            Cell.prototype.MAP_TABLE["]"] = ["]", "market-v", 3, 4, "Common Market (V)"];
            Cell.prototype.MAP_TABLE["{"] = ["{", "market3-h", 6, 3, "Grand Market (H)"];
            Cell.prototype.MAP_TABLE["}"] = ["}", "market3-v", 3, 6, "Grand Market (V)"];
            // roads
            Cell.prototype.MAP_TABLE[";"] = [";", "grandroad-s", 1, 2, "Grand Way (S)"];
            Cell.prototype.MAP_TABLE[":"] = [":", "grandroad-e", 2, 1, "Grand Way (E)"];
            Cell.prototype.MAP_TABLE["¶"] = ["¶", "grandroad-n", 1, 2, "Grand Way (N)"];
            Cell.prototype.MAP_TABLE["°"] = ["°", "grandroad-w", 2, 1, "Grand Way (W)"];
            Cell.prototype.MAP_TABLE["="] = ["=", "road", 1, 1, ""];
            Cell.prototype.MAP_TABLE["+"] = ["+", "roadblock", 1, 1, "Roadblock"];
            Cell.prototype.MAP_TABLE["ç"] = ["ç", "rw-gate-h", 1, 1, "RW Gate (H)"];
            Cell.prototype.MAP_TABLE["Ç"] = ["Ç", "rw-gate-v", 1, 1, "RW Gate (V)"];
            Cell.prototype.MAP_TABLE["×"] = ["×", "gate-h", 5, 3, "City Gate (H)"];
            Cell.prototype.MAP_TABLE["÷"] = ["÷", "gate-v", 3, 5, "City Gate (V)"];
            // decoration
            Cell.prototype.MAP_TABLE["!"] = ["!", "garden1", 1, 1, "Garden"];
            Cell.prototype.MAP_TABLE["@"] = ["@", "garden2", 2, 2, "Garden"];
            Cell.prototype.MAP_TABLE["#"] = ["#", "garden3", 3, 3, "Garden"];
            Cell.prototype.MAP_TABLE["$"] = ["$", "pond", 3, 3, "Pond"];
            Cell.prototype.MAP_TABLE["%"] = ["%", "pavilion", 2, 2, "Pavilion"];
            Cell.prototype.MAP_TABLE["^"] = ["^", "statue1", 1, 1, "Small Statue"];
            Cell.prototype.MAP_TABLE["&"] = ["&", "statue2", 2, 2, "Statue"];
            Cell.prototype.MAP_TABLE["*"] = ["*", "pinktree", 1, 1, "Aesthetic Tree"];
            Cell.prototype.MAP_TABLE["|"] = ["|", "privategarden", 5, 5, "Private Garden"];
            Cell.prototype.MAP_TABLE["\\"] = ["\\", "taichipark", 4, 4, "T'ai Chi Park"];
            // other buildings
            Cell.prototype.MAP_TABLE["a"] = ["a", "admincity-h", 8, 4, "Administrative City (H)"];
            Cell.prototype.MAP_TABLE["A"] = ["A", "admincity-v", 4, 8, "Administrative City (V)"];
            Cell.prototype.MAP_TABLE["b"] = ["b", "smelter", 3, 3, "Smelter/Furnace"];
            Cell.prototype.MAP_TABLE["B"] = ["B", "bronzewaremaker", 2, 2, "Bronzeware Maker"];
            Cell.prototype.MAP_TABLE["ð"] = ["ð", "weaponsmith", 2, 2, "Weaponsmith"];
            Cell.prototype.MAP_TABLE["c"] = ["c", "ancestor", 2, 2, "Ancestral Shrine"];
            Cell.prototype.MAP_TABLE["C"] = ["C", "claypit", 2, 2, "Clay Pit"];
            Cell.prototype.MAP_TABLE["©"] = ["©", "saltmine", 2, 2, "Salt Mine"];
            Cell.prototype.MAP_TABLE["d"] = ["d", "daoshrine", 2, 2, "Daoist Shrine"];
            Cell.prototype.MAP_TABLE["D"] = ["D", "daotemple", 4, 4, "Daoist Temple"];
            Cell.prototype.MAP_TABLE["e"] = ["e", "ferry-e", 3, 2, "Ferry (E)"];
            Cell.prototype.MAP_TABLE["E"] = ["E", "ferry-s", 2, 3, "Ferry (S)"];
            Cell.prototype.MAP_TABLE["f"] = ["f", "wharf-e", 3, 2, "Fishing Quay (E)"];
            Cell.prototype.MAP_TABLE["F"] = ["F", "wharf-s", 2, 3, "Fishing Quay (S)"];
            Cell.prototype.MAP_TABLE["«"] = ["«", "militarycamp-h", 6, 4, "Fort (H)"];
            Cell.prototype.MAP_TABLE["»"] = ["»", "militarycamp-v", 4, 6, "Fort (V)"];
            Cell.prototype.MAP_TABLE["g"] = ["g", "buddhashrine", 2, 2, "Buddhist Shrine"];
            Cell.prototype.MAP_TABLE["G"] = ["G", "buddhatemple", 4, 4, "Buddhist Pagoda"];
            Cell.prototype.MAP_TABLE["h"] = ["h", "house-hi", 2, 2, "Common Housing"];
            Cell.prototype.MAP_TABLE["H"] = ["H", "elite-hi", 4, 4, "Elite Housing"];
            Cell.prototype.MAP_TABLE["i"] = ["i", "ironsmelter", 3, 3, "Iron Smelter"];
            Cell.prototype.MAP_TABLE["I"] = ["I", "irrigationpump", 2, 2, "Irrigation Pump"];
            Cell.prototype.MAP_TABLE["j"] = ["j", "jadecarver", 2, 2, "Jade Carver"];
            Cell.prototype.MAP_TABLE["J"] = ["J", "watchtower", 2, 2, "Watchtower"];
            Cell.prototype.MAP_TABLE["k"] = ["k", "kiln", 2, 2, "Kiln"];
            Cell.prototype.MAP_TABLE["K"] = ["K", "guardtower", 2, 2, "Inspector's Tower"];
            Cell.prototype.MAP_TABLE["l"] = ["l", "loggingshed", 2, 2, "Logging Shed"];
            Cell.prototype.MAP_TABLE["L"] = ["L", "laquerwaremaker", 2, 2, "Laquerware Maker"];
            Cell.prototype.MAP_TABLE["m"] = ["m", "mint", 3, 3, "Mint"];
            Cell.prototype.MAP_TABLE["M"] = ["M", "moneyprinter", 3, 3, "Money Printer"];
            Cell.prototype.MAP_TABLE["µ"] = ["µ", "weaver", 3, 3, "Weaver"];
            Cell.prototype.MAP_TABLE["n"] = ["n", "hunter", 2, 2, "Hunter's Tent"];
            Cell.prototype.MAP_TABLE["N"] = ["N", "papermaker", 2, 2, "Paper Maker"];
            Cell.prototype.MAP_TABLE["o"] = ["o", "tree", 1, 1, "Tree/Bush"];
            Cell.prototype.MAP_TABLE["O"] = ["O", "dramaschool", 3, 3, "Drama School"];
            Cell.prototype.MAP_TABLE["p"] = ["p", "palace-h", 10, 5, "Palace (H)"];
            Cell.prototype.MAP_TABLE["P"] = ["P", "palace-v", 5, 10, "Palace (V)"];
            Cell.prototype.MAP_TABLE["q"] = ["q", "herbalist", 2, 2, "Herbalist"];
            Cell.prototype.MAP_TABLE["Q"] = ["Q", "accupuncturist", 2, 2, "Acupuncturist"];
            Cell.prototype.MAP_TABLE["r"] = ["r", "refinery", 2, 2, "Lacquer Refinery"];
            Cell.prototype.MAP_TABLE["R"] = ["R", "acrobatschool", 3, 3, "Acrobat School"];
            Cell.prototype.MAP_TABLE["s"] = ["s", "silkwormshed", 2, 2, "Silkworm Shed"];
            Cell.prototype.MAP_TABLE["ß"] = ["ß", "teashed", 2, 2, "Tea Curing Shed"];
            Cell.prototype.MAP_TABLE["S"] = ["S", "theater", 4, 4, "Theater Pavilion"];
            Cell.prototype.MAP_TABLE["T"] = ["T", "tower", 2, 2, "Tower"];
            Cell.prototype.MAP_TABLE["u"] = ["u", "musicschool", 2, 2, "Music School"];
            Cell.prototype.MAP_TABLE["U"] = ["U", "confusianacademy", 3, 3, "Confusian Academy"];
            Cell.prototype.MAP_TABLE["v"] = ["v", "hempfarm", 2, 2, "Hemp Farm"];
            Cell.prototype.MAP_TABLE["V"] = ["V", "farm", 3, 3, "Farm House"];
            Cell.prototype.MAP_TABLE["w"] = ["w", "wheat", 1, 1, "Wheat"];
            Cell.prototype.MAP_TABLE["W"] = ["W", "well", 2, 2, "Well"];
            Cell.prototype.MAP_TABLE["å"] = ["å", "rice", 1, 1, "Rice"];
            Cell.prototype.MAP_TABLE["é"] = ["é", "hemp", 1, 1, "Hemp"];
            Cell.prototype.MAP_TABLE["è"] = ["è", "soybeans", 1, 1, "Hemp"];
            Cell.prototype.MAP_TABLE["á"] = ["á", "cabbage", 1, 1, "Cabbage"];
            Cell.prototype.MAP_TABLE["à"] = ["à", "millet", 1, 1, "Millet"];
            Cell.prototype.MAP_TABLE["x"] = ["x", "taxoffice", 2, 2, "Tax Office"];
            Cell.prototype.MAP_TABLE["X"] = ["X", "stoneworks", 2, 2, "Stoneworks"];
            Cell.prototype.MAP_TABLE["y"] = ["y", "masonsguild", 2, 2, "Masons Guild"];
            Cell.prototype.MAP_TABLE["Y"] = ["Y", "ceramistsguild", 2, 2, "Ceramist Guild"];
            Cell.prototype.MAP_TABLE["z"] = ["z", "carpenterguild", 2, 2, "Carpenter Guild"];
            Cell.prototype.MAP_TABLE["Z"] = ["Z", "workcamp", 4, 4, "Labourers' Camp"];
            //lignes
            Cell.prototype.MAP_TABLE["-"] = ["-", "rw", 1, 1, "RW"];
            Cell.prototype.MAP_TABLE["t"] = ["t", "wall", 1, 1, "City Wall Segment"];
            Cell.prototype.MAP_TABLE["_"] = ["_", "id", 1, 1, "ID"];
        }
    }
});
//# sourceMappingURL=Cell.js.map