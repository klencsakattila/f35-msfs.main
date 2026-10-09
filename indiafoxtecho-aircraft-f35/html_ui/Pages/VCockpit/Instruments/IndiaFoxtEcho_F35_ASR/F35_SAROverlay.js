class F35_TSD extends BaseInstrument {
    constructor() {
        super(...arguments);
    }
    get templateID() { return "AS04F_HMD"; }
    connectedCallback() {
        super.connectedCallback();
        diffAndSetStyle(this, "display", "none");
	
		this._ownshipNorth = this.getChildById("OwnshipNorth");
		this._hudlatitude = this.getChildById("hud-latitude");
		this._hudlongitude = this.getChildById("hud-longitude");
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

			let tflirCSmode = SimVar.GetSimVarValue("L:SARCSMode", "boolean");
			let headingReference = SimVar.GetSimVarValue("L:AircraftHeadingReference", "degrees");
			let tflirCameraPitch = SimVar.GetSimVarValue("L:SARCameraPitch", "degrees");
			let currentLatitude = SimVar.GetSimVarValue("GPS POSITION LAT", "degrees");
			let currentLongitude = SimVar.GetSimVarValue("GPS POSITION LON", "degrees");
            const heading = Simplane.getHeadingMagnetic(); 

		diffAndSetText(this._hudlatitude, "Pippo"); 
		diffAndSetText(this._hudlongitude, "Pluto"); 

		diffAndSetAttribute(this._ownshipNorth, "transform", "rotate(" + (-headingReference).toFixed(0) + " 380 400)");
	}

}
registerInstrument("fa18-hmd", F35_TSD);
//# sourceMappingURL=F35_TSD.js.map