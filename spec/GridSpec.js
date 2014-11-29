describe('GridSpec', function(){
    var grid = new Grid(4,3);
    var block1 = new Block(1,2,'a');
    
    it('has a width that can be set', function(){
        expect(grid.width).toBe(4);
    });
    it('has a height that can be set', function(){
        expect(grid.height).toBe(3);
    });
    
    it('has a method to add block', function(){
            grid.addBlock(block1);
            expect(grid.blocks.length).toBe(1);
            expect(grid.blocks[0]).toBe(block1);
    } );

    it('It knows the blocksize in percentages', function(){
        var grid = new Grid(2,5);
        expect(grid.getBlockSize()).toEqual({width:50, height: 20});
        var grid = new Grid(1,6);
        expect(grid.getBlockSize()).toEqual({width:100, height: 16.666666666666664});
    });
    
    it('Is able to ask if a block is set', function(){
        var grid = new Grid(2,2);
        expect(grid.hasBlock(block1)).toBe(false);
        grid.addBlock(block1);
        expect(grid.hasBlock(block1)).toBe(true);
    });
    
    it('Creates an internal array that corresponds to the grid', function(){
        var grid = new Grid(3,2);
        expect(grid.positions.length).toBe(6);
    });
    it('All of the values of the positions should be set to "empty" on creation', function(){
        var grid = new Grid(3,2);
        for(var i = 0;i < grid.positions.length;i++){
            var pos = grid.positions[i];
            expect(pos).toBe('empty');
        }
    });
    describe('It should calculate the block positions', function(){
        var grid = new Grid(3,3);
        var a = new Block(1,1,'A');
        var b = new Block(2,1,'B');
        var c = new Block(1,2,'C');
        var d = new Block(2,2,'D');
        
        describe('For a 3x3 grid', function(){
            
        describe('When I add a block of 1x1', function(){
            grid.addBlock(a);
            grid.build();
            it('I expect the position index to be 0', function(){
                expect(grid.getBlockPositions(a)).toEqual([0]);
            });
        });
        
        describe('When I add another block of 1x1', function(){
            var e = new Block(1,1);
            grid.addBlock(e);
            grid.build();
            it('I expect the position index to be 1', function(){
                expect(grid.getBlockPositions(e)).toEqual([1]);
            });
        });
        describe('When I add another block of 2x2', function(){
            grid.addBlock(d);
            grid.build();
            it('I expect the position index to be 3,4,6,7', function(){
                expect(grid.getBlockPositions(d)).toEqual([3,4,6,7]);
            });
        });
        describe('When I add another block of 1x2', function(){
            grid.addBlock(c);
            grid.build();
            it('I expect the position index to be 2,5', function(){
                expect(grid.getBlockPositions(c)).toEqual([2,5]);
            });;
        });
        describe('When I add another block of 2x1', function(){
            grid.addBlock(b);
            grid.build();
            it('I expect the position index to be empty', function(){
                expect(grid.getBlockPositions(b)).toEqual([]);
            });
        });
        });
        
        it('When I add a block of 1x1 (WxH) I expect the block to be in the first position on an empty 3x3 grid', function(){
            var grid = new Grid(3,3);
            var blockPositions = grid.calculateBlockPositions(a);
            expect(blockPositions).toEqual([0]);
        });
        it('When I add a block of 2x1 (WxH) I expect the block to be in the first and second position on an empty 3x3 grid', function(){
            var grid = new Grid(3,3);
            var blockPositions = grid.calculateBlockPositions(b);
            expect(blockPositions).toEqual([0,1]);
        });
        it('When I add a block of 1x2 (WxH) I expect the block to be in the first and fourth position on an empty 3x3 grid', function(){
            var grid = new Grid(3,3);
            var blockPositions = grid.calculateBlockPositions(c);
            expect(blockPositions).toEqual([0,3]);
        });
        it('When I add a block of 2x2 (WxH) I expect the block to be in the first, second, fourth and fifth position on an empty 3x3 grid', function(){
            var grid = new Grid(3,3);
            var blockPositions = grid.calculateBlockPositions(d);
            expect(blockPositions).toEqual([0,1,3,4]);
        });
        it('When i add a block of 2x2 on a 3x3 grid with an existing 2x1 block, i expect the b', function(){
            var grid = new Grid(3,3);
            grid.addBlock(b);
            grid.positions[0] = 12;
            grid.positions[1] = 12;
            var blockPositions = grid.calculateBlockPositions(d);
            expect(blockPositions).toEqual([3,4,6,7]);
        });
        it('When i add a block of 1x1 on a 3x3 grid with an existing 2x1', function(){
            var grid = new Grid(3,3);
            grid.addBlock(b);
            grid.build();
            var blockPositions = grid.calculateBlockPositions(a);
            expect(blockPositions).toEqual([2]);
        });
        it('When i add a block of 2x2 on a 3x3 grid with an existing 2x1 and 1x1', function(){
            var grid = new Grid(3,3);
            grid.addBlock(b);
            grid.addBlock(a);
            grid.build();
            var blockPositions = grid.calculateBlockPositions(new Block(2,2));
            expect(blockPositions).toEqual([3,4,6,7]);
        });
        it('When i add a block of 1x2 on a 3x3 grid with an existing 2x2 ', function(){
            var grid = new Grid(3,3);
            grid.addBlock(b);
            grid.build();
            var blockPositions = grid.calculateBlockPositions(new Block(1,2));
            expect(blockPositions).toEqual([2,5]);
        });
        it('When i add a block of 1x2 on a 3x3 grid with an existing 2x2 and 1x2 ', function(){
            var grid = new Grid(3,3);
            grid.addBlock(d);
            grid.addBlock(c);
            grid.build();
            var blockPositions = grid.calculateBlockPositions(new Block(1,2));
            expect(blockPositions).toEqual(false);
        });
        it('When i add a block of 2x1 on a 3x3 grid with an existing 2x2 and 1x2 ', function(){
            var grid = new Grid(3,3);
            grid.addBlock(d);
            grid.addBlock(c);
            grid.build();
            var blockPositions = grid.calculateBlockPositions(new Block(2,1));
            expect(blockPositions).toEqual([6,7]);
        });
        it('When i add a block of 2x2 on a 3x3 grid with an existing 2x1 and 1x1 ', function(){
            var grid = new Grid(3,3);
            grid.addBlock(b);
            grid.addBlock(a);
            grid.build();
            var blockPositions = grid.calculateBlockPositions(new Block(2,2));
            expect(blockPositions).toEqual([3,4,6,7]);
        });
        it('When i add a block of 1x2 on a 3x3 grid with an existing 2x1 and 1x1 and 2x2', function(){
            var grid = new Grid(3,3);
            grid.addBlock(b);
            grid.addBlock(a);
            grid.addBlock(d);
            grid.build();
            var blockPositions = grid.calculateBlockPositions(new Block(1,2));
            expect(blockPositions).toEqual([5,8]);
        });
    });
});
var restToBeEmpty = function(positions){
    it('And the rest of the grid to be empty', function(positions){
        for(var i in positions){
            expect(positions[i]).toBe('empty');
        }
    });
};

