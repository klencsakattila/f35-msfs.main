class F35_TSD extends BaseInstrument {
    constructor() {
        super(...arguments);
    }
    get templateID() { return "AS04F_HMD"; }
    connectedCallback() {
        super.connectedCallback();
        diffAndSetStyle(this, "display", "none");
	
		this._tflirCS = this.getChildById("TFLIRCS");
		this._tflirNoCS = this.getChildById("TFLIRNOCS");
		this._ownshipNorth = this.getChildById("OwnshipNorth");
		this._tflirCameraAngle = this.getChildById("TFLIRCameraAngle");
    }
    Init() {
        super.Init();
    }
    onInteractionEvent(_args) {
        super.onInteractionEvent(_args);
    }
    Update() {
            diffAndSetStyle(this, "display", "inherit");
            super.Update();

			let tflirCSmode = SimVar.GetSimVarValue("L:TFLIRCSMode", "boolean");
			let headingReference = SimVar.GetSimVarValue("L:AircraftHeadingReference", "degrees");
			let tflirCameraPitch = SimVar.GetSimVarValue("L:TFLIRCameraPitch", "degrees");
            const heading = Simplane.getHeadingMagnetic(); 

		if (tflirCSmode) {
		  diffAndSetStyle(this._tflirCS, "visibility", "visible");
		  diffAndSetStyle(this._tflirNoCS, "visibility", "hidden");
		}
		else {
		  diffAndSetStyle(this._tflirCS, "visibility", "hidden");
		  diffAndSetStyle(this._tflirNoCS, "visibility", "visible");
		}
		diffAndSetAttribute(this._ownshipNorth, "transform", "rotate(" + (-headingReference).toFixed(0) + " 380 400)");
		diffAndSetAttribute(this._tflirCameraAngle, "transform", "translate( 0 , " + (tflirCameraPitch * 1.65).toFixed(0) + " )");
	}

}
registerInstrument("fa18-hmd", F35_TSD);
//# sourceMappingURL=F35_TSD.js.map