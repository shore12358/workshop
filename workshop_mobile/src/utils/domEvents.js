class ElePosi {
    constructor (ele) {
        this.posi = {
            x: [],
            y: []
        };
        this.ele = ele;
        this.elePosi = this.getElePosi();
    }
    elePosiInit (ele) {
        if (ele.offsetParent === null) {
            return;
        }
        // console.log(ele);
        const p_node = ele.parentNode;
        const { offsetLeft, offsetTop } = ele;
        if (this.posi.x[this.posi.x.length - 1] !== offsetLeft && this.posi.y[this.posi.y.length - 1] !== offsetTop) {
            this.posi.x.push(ele.offsetLeft);
            this.posi.y.push(ele.offsetTop);
        }
        return this.elePosiInit(p_node);
    }
    getElePosi () {
        if (this.elePosi) {
            return this.elePosi;
        }
        this.elePosiInit(this.ele);
        const x = this.posi.x.reduce((result, item) => result + item, 0);
        const y = this.posi.y.reduce((result, item) => result + item, 0);
        this.elePosi = { x, y };
        console.log(this.elePosi);
        return this.elePosi;
    }
    judgeInArea (dotPosi) {
        const eleX = this.getElePosi().x;
        const eleY = this.getElePosi().y;
        const { x, y } = dotPosi;
        if (x > eleX && x < (this.ele.offsetWidth + eleX) && y > eleY && y < (this.ele.offsetHeight + eleY)) {
            return true;
        }
        return false;

    }
}
export {
    ElePosi
}