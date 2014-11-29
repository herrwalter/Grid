
var Grid = function ( width, height ){
    this.positions = [];
    this.blocks = [];
    this.height = height;
    this.width = width;
    this.setPositionIndexes();
};

/**
 * Add a block to the grid
 * @param {Block} block
 */
Grid.prototype.addBlock = function(block){
    this.blocks.push(block);
};

Grid.prototype.addBlocks = function(blocks){
    for(var i = 0; i <= blocks.length; ++i){
        var block = blocks[i];
        if( block instanceof Block){
            this.addBlock(block);
        }
    }
};
/**
 * Indicates if the grid has this block.
 * @param {Block} block
 * @returns {Boolean}
 */
Grid.prototype.hasBlock = function(block){
    for( var b in this.blocks ){
        var bl = this.blocks[b];
        if(bl === block){
            return true;
        }
    }
    return false;
};

Grid.prototype.build = function(){
    this.setPositionIndexes();
    for( var i = 0; i < this.blocks.length; i++ ){
        var block = this.blocks[i];
        this.blockLoop = 0;
        var blockPositions = this.calculateBlockPositions(block);
        // fill positions
        for( var p = 0; p < blockPositions.length; p++){
            this.positions[blockPositions[p]] = block;
        }
    }
    return this.positions;
};

/**
 * @param {Block} block
 * @param {Int} positionIndex
 * @returns {Array}
 */

Grid.prototype.calculateBlockPositions = function(block, positionIndex){
    var positionIndex = positionIndex || this.getFirstEmptyPositionIndex();
    var positions = [];
    var gridWidth = this.width;
    // stop searching if we checked all positions
    if(positionIndex > this.positions.length){
        return false;
    }
    // for each block height
    for( var h = 0; h < block.height; h++){
        // if the height is 0 , the height index to the position array should be 0
        // as for height is 1, the height index should add the grid width to move 
        // on that extra row.
        var heightIndex = h * gridWidth;
        // check if width positions are available
        for( var w = 0; w < block.width; w++){
            // calculate the position that we need to check in the width.
            var positionInGrid = positionIndex + heightIndex + w;
            // calculate the position row. 
            var positionInRow = positionInGrid % gridWidth;
            // 2 %3 = 2 + 2
            if( w === 0 && positionInRow + block.width > gridWidth){
                return this.calculateBlockPositions(block, ++positionIndex);
            }
            // if the position is not available, search the next.
            if( !this.positionAvailable(positionInGrid) ){
                return this.calculateBlockPositions(block, ++positionIndex);
            } else {
                positions.push(positionInGrid);
            }
        }
    }
    return positions;
};

/**
 * Gets the block positions in the grid
 * @param {Block} block
 * @returns {Number|Boolean}
 */
Grid.prototype.getBlockPositions = function(block){
    var positions = [];
    for( var i = 0; i < this.positions.length; i++ ){
        var positionValue = this.positions[i];
        if( block === positionValue ){
            positions.push(i);
        }
    }
    return positions;
};

Grid.prototype.getPositions = function(){
    return this.positions;
};

Grid.prototype.getFirstEmptyPositionIndex = function(){
    for( var i = 0; i <= this.positions.length; i++){
        if( this.positions[i] === 'empty' ){
            return i;
        }
    }
    return false;
};

Grid.prototype.getBlockSize = function(){
    return {
        width: (1 / this.width) * 100,
        height: (1 / this.height) * 100
    };
};

Grid.prototype.positionAvailable = function(index){
    return this.positions[index] === 'empty';
};

Grid.prototype.setPositionIndexes = function(){
    for(var i = 0; i < (this.width*this.height) ; i++){
        this.positions[i] = 'empty';
    }
};


