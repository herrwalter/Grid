

var Block = function(width, height, id){
    this.width = width;
    this.height = height;
    this.id = id;
};

Block.prototype.getWidth = function(){
    return this.width;
};
Block.prototype.getHeight = function(){
    return this.height;
};
Block.prototype.getId = function(){
    return this.id;
};