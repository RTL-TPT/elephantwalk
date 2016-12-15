(function() {
    var promote = include('createjs.promote'),
        extend = include('createjs.extend'),
        Container = include('createjs.Container');

    function UiContainer(x=0, y=0, width=100, height=100,
                        {borderColor: borderColor, borderWidth: borderWidth=1},
                        {backgroundColor: backgroundColor}) {
        this.Container_constructor();

        this.x = x;
        this.y = y;

        if (borderColor) {
            borderRect = new Shape();
            borderRect.name = 'border';
            borderRect.graphics.beginStroke(borderColor)
                .setStrokeStyle(borderWidth)
                .drawRect(0, 0, width, height);
            this.addChild(borderRect);
        }

        if (backgroundColor) {
            backgroundRect = new Shape();
            backgroundRect.name = 'background';
            backgroundRect.graphics.beginFill(backgroundColor)
                .drawRect(0, 0,  width, height);
            this.addChild(backgroundRect);
        }
    }

    extend(UiContainer, Container);
    window.UiContainer = promote(UiContainer, "Container");
}());
