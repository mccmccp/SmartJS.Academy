window.addEventListener('load', function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    function Segment(start, end) {
        this.start = start;
        this.end = end;
    }

    Segment.prototype.intersects = function (segment2) {
        var intersectionX = ((this.start.x * this.end.y - this.start.y * this.end.x) * (segment2.start.x - segment2.end.x) -
            (this.start.x - this.end.x) * (segment2.start.x * segment2.end.y - segment2.start.y * segment2.end.x)) /
            ((this.start.x - this.end.x)*(segment2.start.y-segment2.end.y)-(this.start.y - this.end.y)*(segment2.start.x - segment2.end.x));
        var intersectionY = ((this.start.x * this.end.y - this.start.y * this.end.x) * (segment2.start.x - segment2.end.x) -
            (this.start.y - this.end.y) * (segment2.start.x * segment2.end.y - segment2.start.y * segment2.end.x)) /
            ((this.start.x - this.end.x)*(segment2.start.y-segment2.end.y)-(this.start.y - this.end.y)*(segment2.start.x - segment2.end.x));
        return new Point (intersectionX, intersectionY);
    };

    var p1 = new Point(80, 60);
    var p2 = new Point(40, 20);
    var p3 = new Point(20, 80);
    var line1 = new Segment(p1, p2);
    var line2 = new Segment(p2, p3);
    var line3 = new Segment(p3, p1);
    var arrLines = [line1, line2, line3];

    var p4 = new Point(60, 10);
    var p5 = new Point(10, 80);
    var p6 = new Point(60, 80);
    var line4 = new Segment(p4, p5);
    var line5 = new Segment(p5, p6);
    var line6 = new Segment(p6, p4);
    var arrLines2 = [line4, line5, line6];


    var svgNode = document.querySelector('svg');
    var color = "#445566";


    function Polygon(array) {
        this.array = array;
    }

    Polygon.prototype.render = function (svg, hex) {
        var points = '';
        for (var i = 0; i < this.array.length; i++){

           points = points + this.array[i].start.x + ',' + this.array[i].start.y + ' ' + this.array[i].end.x + ',' + this.array[i].end.y + ' ';
        };

        var svgPaint = document.createElementNS('http://www.w3.org/2000/svg','polygon');
        svgPaint.setAttribute('points', points);
        svgPaint.setAttribute('stroke', hex);
        svg.appendChild(svgPaint);
    };

    Polygon.prototype.intersects = function(polig){
        var intersectsPoints = [];
        for (var i = 0; i < this.array.length; i++){
            for (var j = 0; j < polig.array.length; j++){
                intersectsPoints.push(this.array[i].intersects(polig.array[j]));
            }
        }
        console.log(intersectsPoints);
    };

    var pol = new Polygon(arrLines);
    pol.render(svgNode, color);

    var pol2 = new Polygon(arrLines2);
   // pol2.render(svgNode, color);
    pol.intersects(pol2);
})
