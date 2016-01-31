// Other vendor prefix support can be provided by external projects like : autoprefixer embedded into "radium"
// https://github.com/Polymer/layout/blob/master/layout.html

export function extend(...args: any[]): any {
	// Defend against user error
	for (let obj of args) {
        if (obj instanceof Array) {
            throw new Error(`User error: use extend(a,b) instead of extend([a,b]). Object: ${obj}`)
        }
    }

    var newObj = {};
    for (let obj of args) {
        for (let key in obj) {
            //copy all the fields
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

/** If you have more than one child prefer horizontal,vertical */
export var flexRoot = {
    display: 'flex',
};

export var inlineRoot = {
    display: 'inline-flex'
};

export var horizontal, vertical;
horizontal = extend(flexRoot, {
    flexDirection: 'row'
});
vertical = extend(flexRoot, {
    flexDirection: 'column'
});

export var wrap = {
    flexWrap: 'wrap'
};

export var flexNone = {
    flex: 'none'
};

/**
 * If you want items to be sized automatically by their children use this
 * This is because of a bug in various flexbox implementations: http://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
 */
export var content = {
    flexShrink: 0
};

export var flex = {
    flex: 1
};

export var flex1 = flex;
export var flex2 = {
    flex: 2
};
export var flex3 = {
    flex: 3
};
export var flex4 = {
    flex: 4
};
export var flex5 = {
    flex: 5
};
export var flex6 = {
    flex: 6
};
export var flex7 = {
    flex: 7
};
export var flex8 = {
    flex: 8
};
export var flex9 = {
    flex: 9
};
export var flex10 = {
    flex: 10
};
export var flex11 = {
    flex: 11
};
export var flex12 = {
    flex: 12
};

/////////////////////////////
// Alignment in cross axis //
/////////////////////////////

export var start = {
    alignItems: 'flex-start'
};
export var center = {
    alignItems: 'center'
};
export var end = {
    alignItems: 'flex-end'
};

////////////////////////////
// Alignment in main axis //
////////////////////////////

export var startJustified = {
    justifyContent: 'flex-start'
};
export var centerJustified = {
    justifyContent: 'center'
};
export var endJustified = {
    justifyContent: 'flex-end'
};
export var aroundJustified = {
    justifyContent: 'space-around'
};
export var betweenJustified = {
    justifyContent: 'space-between'
};

////////////////////////////
// Alignment in both axes //
////////////////////////////

export var centerCenter = extend(flexRoot, center, centerJustified);

////////////////////
// Self alignment //
////////////////////

export var selfStart = {
    alignSelf: 'flex-start'
};
export var selfCenter = {
    alignSelf: 'center'
};
export var selfEnd = {
    alignSelf: 'flex-end'
};
export var selfStretch = {
    alignSelf: 'stretch'
};

//////////////////
// Other layout //
//////////////////

export var block = {
    display: 'block'
};

export var hidden = {
    display: 'none'
};

export var invisible = {
    visibility: 'hidden'
};

export var relative = {
    position: 'relative'
};

export var fit = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

export var fullBleedBody = {
    margin: 0,
    height: '100vh'
};

export var scroll = {
    // 'webkitOverflowScrolling': 'touch',
    overflow: 'auto'
};

////////////////////
// Fixed position //
////////////////////

/**
 * You don't generally need to use this.
 * Instead use fixedBottom,fixedLeft,fixedRight,fixedTop
 */
export var fixed = {
    position: 'fixed'
};

export var fixedBottom, fixedLeft, fixedRight, fixedTop;
fixedTop = extend(fixed, {
    top: 0,
    left: 0,
    right: 0,
});
fixedRight = extend(fixed, {
    top: 0,
    right: 0,
    bottom: 0,
});
fixedBottom = extend(fixed, {
    right: 0,
    bottom: 0,
    left: 0,
});
fixedLeft = extend(fixed, {
    top: 0,
    bottom: 0,
    left: 0,
});

//////////////////
// A new layer  //
//////////////////
/**
 * New Layer parent
 */
export var newLayerParent = {
    position: 'relative',
};

/**
 *  You can have this anywhere and its like you have opened a new body
 *  This new layer will attach itself to the nearest parent with `position:relative` or `position:absolute` (which is what a new layer is by itself)
 */
export var newLayer = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};

/**
 * Box helpers
 * Having top, left, bottom, right seperated makes it easier to override and maintain individual properties
 */
export namespace Box {
    /**
     * For `number` we assume pixels e.g. 5 => '5px'
     * For `string` you should provide the unit e.g. '5px'
     */
    export type BoxUnit = number | string;
    function boxUnitToString(value: BoxUnit): string {
        if (typeof value === 'number') {
            return value.toString() + 'px';
        }
        else {
            return value;
        }
    }

    /**
     * A box function is something that can take:
     * - all
     * - topAndBottom + leftRight
     * - top + right + bottom + left
     */
    export interface BoxFunction<T> {
        (all: BoxUnit): T;
        (topAndBottom: BoxUnit, leftAndRight: BoxUnit): T;
        (top: BoxUnit, right: BoxUnit, bottom: BoxUnit, left: BoxUnit): T;
    }

    /**
     * For use in simple functions
     */
    type Box = {
        top: string;
        right: string;
        bottom: string;
        left: string;
    }

    /**
     * Takes a function that expects Box to be passed into it
     * and creates a BoxFunction
     */
    function createBoxFunction<T>(mapFromBox: (box: Box) => T): BoxFunction<T> {
        const result: BoxFunction<T> = (a: BoxUnit, b?: BoxUnit, c?: BoxUnit, d?: BoxUnit) => {
            if (b === undefined && c === undefined && d === undefined) {
                b = c = d = a;
            }
            else if (c === undefined && d === undefined) {
                c = a;
                d = b;
            }

            let box = {
                top: boxUnitToString(a),
                right: boxUnitToString(b),
                bottom: boxUnitToString(c),
                left: boxUnitToString(d)
            };

            return mapFromBox(box);
        }
        return result;
    }

    export const padding = createBoxFunction((box) => {
        return {
            paddingTop: box.top,
            paddingRight: box.right,
            paddingBottom: box.bottom,
            paddingLeft: box.left
        };
    });

    export const margin = createBoxFunction((box) => {
        return {
            marginTop: box.top,
            marginRight: box.right,
            marginBottom: box.bottom,
            marginLeft: box.left
        };
    });

    export const border = createBoxFunction((box) => {
        return {
            borderTop: box.top,
            borderRight: box.right,
            borderBottom: box.bottom,
            borderLeft: box.left
        };
    });
}
