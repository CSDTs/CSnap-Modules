(function () {
    return function (percent, direction) {
        var dest, delta=radians(this.heading);

        var width = this.costume.contents.width * this.scale;
        var height = this.costume.contents.height * this.scale;

        var newX=0, newY=0, dist=0;

        if(direction[0] === 'height') {
            newY = this.position().y +
                (height * percent/100);
            dist = Math.sqrt(Math.pow(this.position().y-newY, 2));

            if (percent >= 0) {
                dest = this.position().distanceAngle(dist, this.heading-90);
            } else {
                dest = this.position().distanceAngle(
                    Math.abs(dist),
                    (this.heading + 90)
                );
            }

        } else {
            newX = this.position().x + 
                (width * percent/100);
            dist = Math.sqrt(Math.pow(this.position().x-newX, 2));

            if (percent >= 0) {
                dest = this.position().distanceAngle(dist, this.heading);
            } else {
                dest = this.position().distanceAngle(
                    Math.abs(dist),
                    (this.heading - 180)
                );
            }
        }
        this.setPosition(dest);
        this.positionTalkBubble();
    };
}());
