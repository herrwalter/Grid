/* 
 * SetlistGenerator project
 *  @author Wouter Wessendorp
 * 
 */

describe('ElementGrid', function(){
    
    var elementGrid = new ElementGrid($('#test-element-grid'));
    it('Should detect that there is a valid DOM element passed by checking its data-element-grid-id', function(){
        expect(elementGrid.getId()).toBe('test-element-grid');
    });
    
    it('Should set its width by the data-element-grid-width', function(){
        expect(elementGrid.getWidth()).toBe(5);
    });
    
    it('Should set its height by the data-element-grid-height', function(){
        expect(elementGrid.getHeight()).toBe(4);
    });
    
    it('Should find the containing blocks by the siblings that are a DIV', function(){
        expect(elementGrid.getBlocks().length).toBe(5);
    });
    
    it('Knows the width of a block by the set data-element-grid-block-width', function(){
        expect(elementGrid.getBlocks()[0].getWidth()).toBe(1);
    });
    
    it('Knows the height of a block by the set data-element-grid-block-height', function(){
        expect(elementGrid.getBlocks()[0].getHeight()).toBe(4);
    });
    
    it('It positions the element in the most sufficient order', function(){
        var blocks = elementGrid.getBlocks();
        expect(blocks[0].id.css('left')).toBe('0px');
        expect(blocks[0].id.css('top')).toBe('0px');
        expect(blocks[1].id.css('left')).toBe('100px');
        expect(blocks[1].id.css('top')).toBe('0px');
        expect(blocks[2].id.css('left')).toBe('100px');
        expect(blocks[2].id.css('top')).toBe('100px');
        expect(blocks[3].id.css('left')).toBe('300px');
        expect(blocks[3].id.css('top')).toBe('100px');
        expect(blocks[4].id.css('left')).toBe('100px');
        expect(blocks[4].id.css('top')).toBe('300px');
    });
    
});
