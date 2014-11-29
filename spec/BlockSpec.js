describe('Block', function(){
   
    var b = new Block(1,2,'specBlock');
    it('has a width property that can be set', function(){
        expect(b.width).toBe(1);
    });
    it('has a height property that can be set', function(){
        expect(b.height).toBe(2);
    });
    it('has a id property that can be set', function(){
        expect(b.id).toBe('specBlock');
    });
    
});