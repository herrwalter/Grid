<html>
    
    <head>
        <script type="text/javascript" src="javascript/lib/jquery.min.js"></script>
        <script type="text/javascript" src="javascript/Grid.js"></script>
        <script type="text/javascript" src="javascript/Block.js"></script>
    </head>
    <body>
        <div class="kpn-grid" data-grid-width="4" data-grid-height="2">
            <div class="kpn-grid-block" data-grid-block-width="2" data-grid-block-height="1"></div>
            <div class="kpn-grid-block" data-grid-block-width="2" data-grid-block-height="1"></div>
            <div class="kpn-grid-block" data-grid-block-width="1" data-grid-block-height="2"></div>
            <div class="kpn-grid-block" data-grid-block-width="1" data-grid-block-height="1"></div>
            <div class="kpn-grid-block" data-grid-block-width="1" data-grid-block-height="1"></div>
        </div>
        <script>
            var grid = new Grid(4,4);
            grid.addBlock(new Block(1, 2, 1));
            grid.addBlock(new Block(2, 2, 2));
            grid.addBlock(new Block(2, 1, 3));
            console.log(grid.calculate());
        </script>
    </body>
    
        
</html>

