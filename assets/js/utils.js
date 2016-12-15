(function() {
    var promote = include('createjs.promote'),
        extend = include('createjs.extend'),
        Container = include('createjs.Container');

    function UiContainer(x=0, y=0, width=100, height=100,
                        {borderColor: borderColor, borderWidth: borderWidth=1}={},
                        {backgroundColor: backgroundColor}={}) {
        this.Container_constructor();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        if (borderColor && borderColor !== 'transparent') {
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
    promote(UiContainer, "Container");

    window.UiContainer = UiContainer;
}());

(function() {
    var promote = include('createjs.promote'),
        extend = include('createjs.extend'),
        Bitmap = include('createjs.Bitmap');

    function ScaledBitmap(imageOrUri, {maxWidth: maxWidth,
                          maxHeight: maxHeight,
                          width: width,
                          height: height}) {
        this.Bitmap_constructor(imageOrUri);

        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.width = width;
        this.height = height;

        scaleTo(this, {
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            width: width,
            height: height,
        });
    }

    extend(ScaledBitmap, Bitmap);
    promote(ScaledBitmap, "Bitmap");

    window.ScaledBitmap = ScaledBitmap;
}());

function ucFirst(value) {
    return value.slice(0,1).toUpperCase() + value.slice(1);
}

function scaleTo(object, { maxWidth: maxWidth,
                           maxHeight: maxHeight,
                           width: width,
                           height: height }) {
    let bounds = object.getBounds();

    if (width || bounds.width > maxWidth) {
        object.scaleX = (width || maxWidth) / bounds.width;
    }
    if (height || bounds.height > maxHeight) {
        object.scaleY = (height || maxHeight) / bounds.height;
    }
}

function toCenterX(object, availableWidth=0) {
    let objectWidth = object.getBounds().width;

    if (object.scaleX) {
        objectWidth *= object.scaleX;
    }

    if (availableWidth > objectWidth) {
        return (availableWidth - objectWidth) / 2;
    }
    else {
        return 0;
    }
}
