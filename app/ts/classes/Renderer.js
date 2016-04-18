System.register(["angular2/core", "./ProgressiveLoader"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ProgressiveLoader_1;
    var Renderer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ProgressiveLoader_1_1) {
                ProgressiveLoader_1 = ProgressiveLoader_1_1;
            }],
        execute: function() {
            Renderer = (function () {
                function Renderer(pl) {
                    this.pl = pl;
                    this.lines = [];
                }
                Renderer.prototype.render = function (lines) {
                    var _this = this;
                    this.reset();
                    this.storage = lines;
                    this.storage.forEach(function (line) {
                        line.cells.forEach(function (cell) { _this.renderCell(cell, false); });
                    });
                    this.pl.load(this.storage, this.lines);
                    this.init = false;
                };
                Renderer.prototype.getLines = function () {
                    return this.lines;
                };
                Renderer.prototype.getCellsInPath = function (startLinePos, startColPos, endLinePos, endColPos) {
                    var res = [];
                    if (startLinePos == endLinePos && startColPos == endColPos) {
                        // une seule cell
                        res.push(this.lines[startLinePos].cells[startColPos]);
                    }
                    else if (startLinePos < endLinePos && startColPos <= endColPos) {
                        // en bas a droite
                        for (var i = startLinePos; i <= endLinePos; i++) {
                            res.push(this.lines[i].cells[startColPos]);
                        }
                        for (var j = startColPos; j <= endColPos; j++) {
                            res.push(this.lines[endLinePos].cells[j]);
                        }
                    }
                    else if (startLinePos >= endLinePos && startColPos < endColPos) {
                        //en haut a droite
                        for (var i = startColPos; i <= endColPos; i++) {
                            res.push(this.lines[startLinePos].cells[i]);
                        }
                        for (var j = startLinePos; j >= endLinePos; j--) {
                            res.push(this.lines[j].cells[endColPos]);
                        }
                    }
                    else if (startLinePos > endLinePos && startColPos >= endColPos) {
                        //en haut a gauche
                        for (var i = startLinePos; i >= endLinePos; i--) {
                            res.push(this.lines[i].cells[startColPos]);
                        }
                        for (var j = startColPos; j >= endColPos; j--) {
                            res.push(this.lines[endLinePos].cells[j]);
                        }
                    }
                    else if (startLinePos <= endLinePos && startColPos > endColPos) {
                        //en bas a gauche
                        for (var i = startColPos; i >= endColPos; i--) {
                            res.push(this.lines[startLinePos].cells[i]);
                        }
                        for (var j = startLinePos; j <= endLinePos; j++) {
                            res.push(this.lines[j].cells[endColPos]);
                        }
                    }
                    return res;
                };
                Renderer.prototype.reset = function () {
                    this.lines = [];
                    this.storage = [];
                    this.init = true;
                };
                Renderer.prototype.renderCell = function (cell, renderSurroundingCells) {
                    if (cell.ref) {
                        return;
                    }
                    var c = cell.char;
                    var sc = this.getSurroundingConfig(c, cell.lineIndex, cell.colIndex);
                    cell.render(sc);
                    if (cell.width + cell.height > 2) {
                        this.spreadRefCell(cell);
                    }
                    if (renderSurroundingCells && cell.char != null && (cell.char == '-' || cell.char == 't' || cell.char == '_')) {
                        // il faut regenerer les cellules environnantes dans le cas des path
                        this.renderSurroundingCells(cell, sc);
                    }
                };
                Renderer.prototype.renderSurroundingCells = function (cell, sc) {
                    if (sc == 0) {
                        return;
                    }
                    var cellToRender = null;
                    var scToRender = null;
                    var c = cell.char;
                    if (sc == 1 || sc == 5 || sc == 7 || sc == 8 || sc == 11 || sc == 12 || sc == 14 || sc == 15) {
                        // top cell
                        cellToRender = this.lines[cell.lineIndex - 1].cells[cell.colIndex];
                        scToRender = this.getSurroundingConfig(c, cellToRender.lineIndex, cellToRender.colIndex);
                        cellToRender.render(scToRender);
                    }
                    if (sc == 2 || sc == 6 || sc == 8 || sc == 9 || sc == 11 || sc == 13 || sc == 14 || sc == 15) {
                        //right cell
                        cellToRender = this.lines[cell.lineIndex].cells[cell.colIndex + 1];
                        scToRender = this.getSurroundingConfig(c, cellToRender.lineIndex, cellToRender.colIndex);
                        cellToRender.render(scToRender);
                    }
                    if (sc == 3 || sc == 5 || sc == 9 || sc == 10 || sc == 12 || sc == 13 || sc == 14 || sc == 15) {
                        //bottom cell
                        cellToRender = this.lines[cell.lineIndex + 1].cells[cell.colIndex];
                        scToRender = this.getSurroundingConfig(c, cellToRender.lineIndex, cellToRender.colIndex);
                        cellToRender.render(scToRender);
                    }
                    if (sc == 4 || sc == 6 || sc == 7 || sc == 10 || sc == 11 || sc == 12 || sc == 13 || sc == 15) {
                        //left cell
                        cellToRender = this.lines[cell.lineIndex].cells[cell.colIndex - 1];
                        scToRender = this.getSurroundingConfig(c, cellToRender.lineIndex, cellToRender.colIndex);
                        cellToRender.render(scToRender);
                    }
                };
                /*	0   1				5		  7  8			 b		 c			 e		 f
                 * 0c0  c	c2	c	4c	c	6c6	 7c	 c8	c9	ac	bcb		cc	dcd		 ce		fcf
                 *  0			3		5				9	 a			 c	 d		 e		 f
                 *
                 *
                 */
                Renderer.prototype.getSurroundingConfig = function (c, x, y) {
                    var top = this.isIdentic(c, x - 1, y);
                    var bottom = this.isIdentic(c, x + 1, y);
                    var right = this.isIdentic(c, x, y + 1);
                    var left = this.isIdentic(c, x, y - 1);
                    if (!top && !bottom && !left && !right) {
                        //tout seul
                        return 0;
                    }
                    if (top) {
                        if (bottom) {
                            if (right) {
                                if (left) {
                                    return 15;
                                }
                                else {
                                    return 14;
                                }
                            }
                            else {
                                if (left) {
                                    return 12;
                                }
                                else {
                                    return 5;
                                }
                            }
                        }
                        else {
                            // !bottom
                            if (right) {
                                if (left) {
                                    return 11;
                                }
                                else {
                                    return 8;
                                }
                            }
                            else {
                                //!right
                                if (left) {
                                    return 7;
                                }
                                else {
                                    return 1;
                                }
                            }
                        }
                    }
                    else {
                        //!top
                        if (bottom) {
                            if (right) {
                                if (left) {
                                    return 13;
                                }
                                else {
                                    return 9;
                                }
                            }
                            else {
                                if (left) {
                                    return 10;
                                }
                                else {
                                    return 3;
                                }
                            }
                        }
                        else {
                            // !bottom
                            if (right) {
                                if (left) {
                                    return 6;
                                }
                                else {
                                    return 2;
                                }
                            }
                            else {
                                //!right
                                if (left) {
                                    return 4;
                                }
                                else {
                                    return 0;
                                }
                            }
                        }
                    }
                };
                Renderer.prototype.isIdentic = function (c, x, y) {
                    var source = this.init ? this.storage : this.lines;
                    if (x < 0 || x == source.length || y < 0 || y == source[0].cells.length) {
                        return false;
                    }
                    return c == source[x].cells[y].char;
                };
                Renderer.prototype.spreadRefCell = function (ref) {
                    var source = this.init ? this.storage : this.lines;
                    var refLine = ref.lineIndex;
                    var refCol = ref.colIndex;
                    var refWidth = ref.width;
                    var refHeight = ref.height;
                    var lineOffset = 0;
                    var colOffset = 0;
                    while (lineOffset < refHeight && (refLine + lineOffset) < source.length) {
                        colOffset = (lineOffset == 0) ? 1 : 0;
                        while (colOffset < refWidth && (refCol + colOffset) < source[0].cells.length) {
                            source[refLine + lineOffset].cells[refCol + colOffset].setRef(ref);
                            colOffset++;
                        }
                        lineOffset++;
                    }
                };
                Renderer = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ProgressiveLoader_1.ProgressiveLoader])
                ], Renderer);
                return Renderer;
            })();
            exports_1("Renderer", Renderer);
        }
    }
});
//# sourceMappingURL=Renderer.js.map