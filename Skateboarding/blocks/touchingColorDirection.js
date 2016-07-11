(function () {
    return function (aColor) {
		var stage, touching;
		stage = this.parentThatIsA(StageMorph);

			if (stage) {
				touching = this.isTouchingDirection(stage.colorFiltered(aColor, this));
				if (touching) {
					return touching;
				}
				return this.parentThatIsA(SpriteMorph).parts.some(
					function (any) {
						return any.isTouching(stage.colorFiltered(aColor, any));
					}
				);
			}
		return null;
	};
}());


//# sourceURL=touchingColorDirection.js