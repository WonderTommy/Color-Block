function Functionality(board, level) {
    this.board = board;
    this.level = level;
    this.increasePixel = function (original, increment) { // the "original" and the "increment" should be like, such as "100px"
        var num = Number(original.substr(0, (original.length - 2)));
        var change = Number(increment.substr(0, (increment.length - 2)));
        num += change;
        var newPixel = num.toString() + "px";
        return newPixel;
    }

    this.generateRandomColor = function () {
        var source = "0123456789ABCDEF".split("");
        var color = "#"
        for (var i = 0; i < 6; ++i) {
            var index = Math.random();
            index *= 16;
            index = Math.floor(index);
            color += source[index];
        }
        return color;
    }

    this.destoryBoard = function () {
        for (var i = 0; i < board.length; ++i) {
            document.body.removeChild(board[i].division);
        }
    }

    this.changeSideLength = function () {
    }
}

function Node(position, top, left, height, width, color, className, type, functions) {
    this.position = position; // positioning of the block
    this.top = top; // the "top" positioning of the block
    this.left = left; // the "left" positioning of the block
    this.height = height; // the height of the block
    this.width = width; // the width of the block
    this.color = color; // the color of the block
    this.className = className;
    this.type = type; // the type of the node
    this.functions = functions;
    this.division = undefined;
    //this.next = null; // 


    this.printNode = function () {
        //alert("Here end");
        var div = document.createElement("div");
        div.style.className = "sample";
        div.style.position = this.position;
        div.style.top = this.top;
        div.style.left = this.left;
        div.style.height = this.height;
        div.style.width = this.width;
        div.style.background = this.color;
        div.className = this.className;
        if (this.type == "normal") {
            div.onclick = function () {
                // alert("normal");
            }
        } else if (this.type == "special") {
            var newLevel = this.functions.level + 1;
            div.onclick = function () {
                //alert("special");
                //alert("deleting");
                functions.destoryBoard();
                // create New board
                var board = new Board(undefined, "absolute", "100px", "350px", "600px", "600px", "5px", undefined, undefined, newLevel);
                board.createBoard();
                //refreshBoard();
                // var len = document.getElementsByClassName("block").length;
                // alert(len);
                // for(var i = 0; i < len; ++i){
                //     document.getElementsByClassName("block")[i].style.display = "none";
                // }
                //Board(2, block_position, start_top, start_left, board_height, board_width, grid_border, main_color, special_block)
            }
        }
        document.body.appendChild(div);
        this.division = div;
    }
}

function Board(sidelength, block_position, start_top, start_left, board_height, board_width, grid_border, main_color, special_block, level) {
    this.sidelength = sidelength; // number of blocks on the side (square root of the total number of blocks)
    this.block_position = block_position; // the positioning of the blocks (div), "absolute" or "relative"            
    this.start_top = start_top; // the "top" position of the top-left corner of the board
    this.start_left = start_left; // the "left" position of the top-left corner of the board
    this.board_height = board_height; // the height of a single block (div)
    this.board_width = board_width; // the width of a single block (div)
    this.grid_border = grid_border; // the styling of the seperation line between the blocks
    this.main_color = main_color; // undefined at the begining
    this.special_block = special_block; // undefined at the begining
    this.board = new Array(); // the array of nodes
    this.level = level;
    this.functions = new Functionality(this.board, this.level); // the set of functions that provides functionalities 
    //this.start = null; // the linked list of blocks
    //this.calculateTop = function(index){ // calculate the "top" of the positioning of the block

    //}

    //this.calculateLeft = function(index){ // calculate the "left" of the positioning of the block

    //}

    this.blockHeight = function () { // return the block height
        var tmp_height = Number(this.board_height.substr(0, (this.board_height.length - 2)));
        var tmp_grid_border = Number(this.grid_border.substr(0, (this.grid_border.length - 2)));
        tmp_height -= ((this.sidelength - 1) * tmp_grid_border);
        tmp_height /= this.sidelength;
        var block_Height = tmp_height.toString() + "px";
        return block_Height;
    }

    this.blockWidth = function () { // return the block width
        var tmp_width = Number(this.board_width.substr(0, (this.board_width.length - 2)));
        var tmp_grid_border = Number(this.grid_border.substr(0, (this.grid_border.length - 2)));
        tmp_width -= ((this.sidelength - 1) * tmp_grid_border);
        tmp_width /= this.sidelength;
        var block_Width = tmp_width.toString() + "px";
        return block_Width;


    }

    this.setMainColor = function () {
        this.main_color = this.functions.generateRandomColor();
        // 1. use the color function to generate the RGB color
    }

    this.generateSpecialColor = function () {
        var special_color = this.main_color.substr(0, 5);
        special_color += "fd"
        return special_color;
    }

    // this.setPos = function(){
    //     // 1. set the "top" and the "left" field for the block
    // }

    this.setSpecialBlock = function () {
        // 1. generate index for the "special" block
        var index = Math.random();
        index *= this.board.length;
        index = Math.floor(index);
        // 2. modify the .type field of the "special" block;
        this.board[index].type = "special"; // try to use enum
        // 3. generate a different color
        var specialColor = this.generateSpecialColor();
        // 4. change the color for the "special" block
        // alert(specialColor);
        this.board[index].color = specialColor;
    }

    // this.setNode = function (index){
    //     // calculate and set the "top" positioning
    //     this.board[index].height = this.calculateTop;
    //     // calculate and set the "left" positioning
    // }
    // this.appendNode = function (top, left, color){
    //     // var newNode = new Node(top, left, "100px");
    // }
    this.createBoard = function () {
        this.sidelength = 2;
        this.sidelength += Math.floor(this.level / 5);
        var blockHeight = this.blockHeight();
        var blockWidth = this.blockWidth();
        // call the setColor function to set the color property
        this.setMainColor();
        var vertical = this.start_top;
        var horizontal = this.start_left;
        for (var vertical_index = 0; vertical_index < this.sidelength; ++vertical_index) {
            horizontal = this.start_left;
            for (var horizontal_index = 0; horizontal_index < this.sidelength; ++horizontal_index) {
                var newNode = new Node(this.block_position, vertical, horizontal, blockHeight, blockWidth, undefined, "block", "normal", this.functions);
                newNode.color = this.main_color;
                this.board.push(newNode);
                //newNode.printNode();
                horizontal = this.functions.increasePixel(horizontal, this.functions.increasePixel(blockWidth, this.grid_border));
            }
            vertical = this.functions.increasePixel(vertical, this.functions.increasePixel(blockHeight, this.grid_border));
        }
        this.setSpecialBlock();
        // append the Node to the body
        for (var i = 0; i < this.board.length; ++i) {
            this.board[i].printNode();
        }
    }
}

var initial_level = 1
var board = new Board(undefined, "absolute", "100px", "350px", "600px", "600px", "5px", undefined, undefined, initial_level);
board.createBoard();

        // function setFields(color, top, left){
        //     var div = document.createElement("div");
        //     div.style.className = "sample";
        //     div.style.position = "absolute";
        //     div.style.top = top;
        //     div.style.left = left;
        //     div.style.height = "100px";
        //     div.style.width = "100px";
        //     div.style.background = color;
        //     document.body.appendChild(div);
        // }
        // var div = document.createElement("div");
        // setFields(div, "red");
        // var div1 = document.createElement("div");
        // setFields(div1, "blue");
        // setFields("red", "0px", "0px");
        // setFields("blue", "110px", "0px");
        // setFields("yellow", "0px", "110px");
        //setFields("blue", )


