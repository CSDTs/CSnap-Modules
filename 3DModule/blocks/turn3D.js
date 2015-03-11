(function () {
   return function (degX, degY, degZ) {
	if (this.is3D && (0 < this.parts.length)) {
		this.turn3dWithNesting(degX, degY, degZ);
	}
	else if (this.is3D && (this.parts.length == 0)) {
		this.xRotation += degX;
		this.yRotation += degY;
		this.zRotation += degZ;

		if (isShowingLine) {
			this.line.rotation.x += radians(degX);
			this.line.rotation.y += radians(degY);
			this.line.rotation.z += radians(degZ);
		}

		this.update3dObject();
	}
};
}());
