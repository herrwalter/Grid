var ElementGrid = function( grid ){
    var grid = $(grid);
    
    // check if the right element data-attributes are set 
    if(grid.data('element-grid-id') && 
       grid.data('element-grid-width') && 
       grid.data('element-grid-height')){
   
       this.blocks = [];
       this.id = grid.data('element-grid-id');
       this.width = parseInt(grid.data('element-grid-width'));
       this.height = parseInt(grid.data('element-grid-height'));
       this.gridElement = grid;
       this.grid = new Grid(this.width, this.height);
       
       this.setBlocks();
       this.grid.addBlocks(this.blocks);
       this.grid.build();
       this.positionElements();
    } else {
        throw new Error('data-element-grid-(id,width or height) is not defined');
    }
};

/**
 * Gets the id
 * @returns {ElementGrid.id}
 */
ElementGrid.prototype.getId = function(){
    return this.id;
};
/**
 * @returns {ElementGrid.width}
 */
ElementGrid.prototype.getWidth = function(){
    return this.width;
};
/**
 * @returns {ElementGrid.height}
 */
ElementGrid.prototype.getHeight = function(){
    return this.height;
};

/**
 * @returns {undefined}
 */
ElementGrid.prototype.setBlocks = function(){
    this.blocks = [];
    var blockElements = this.gridElement.find('> div');
    var self = this;
    blockElements.each(function(index){
        var element = blockElements.eq(index);
        var blockWidth = element.data('element-grid-block-width');
        var blockHeight = element.data('element-grid-block-height');
        if( blockWidth && blockHeight){
            self.blocks.push(new Block(blockWidth, blockHeight, element));
        }
    });
};

/**
 * @returns {Array[Block]}
 */
ElementGrid.prototype.getBlocks = function(){
    return this.blocks;
};

/**
 * @returns {Array[Block]}
 */
ElementGrid.prototype.positionElements = function(){
    this.gridElement.find('> div').hide();
    var positions = this.grid.getPositions();
    var blockSize = this.grid.getBlockSize();
    var blocksSet = [];
    for(var i = 0; i <= positions.length; ++i){
        var block = positions[i];
        if( block && blocksSet.indexOf(block) === -1 && block !== 'empty' ){
            var width = (block.getWidth() * blockSize.width);
            var height = (block.getHeight() * blockSize.height);
            var left = ((i % this.grid.width) / this.grid.width) * 100;
            var top = (Math.floor((i / this.grid.width)) / this.grid.height) * 100;
            block.id.show();
            block.id.css('position', 'absolute');
            block.id.css('border-radius', '8px');
            block.id.animate({'left': left + '%',
                              'height': height + '%',
                              'width': width + '%',
                              'top': top + '%'}, 0);
            block.id.css('background-color', '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +  (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4));
            blocksSet.push(block);
            
        }
    }
};