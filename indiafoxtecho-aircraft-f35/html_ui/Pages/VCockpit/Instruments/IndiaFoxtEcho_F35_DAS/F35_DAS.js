class F35_DAS extends BaseAirliners {
    get templateID() { return "F35_DAS"; }
    get IsGlassCockpit() { return true; }
    get isInteractive() { return true; }
    Init() {
        super.Init();
        if (this.radioNav)
            this.radioNav.init(NavMode.FOUR_SLOTS);
        this.pageGroups = [
            new NavSystemPageGroup("Main", this, [
                new F35_DAS_MainPage()
            ]),
        ];
    }
}
class F35_DAS_MainPage extends NavSystemPage {
    constructor() {
        super("Main", "Mainframe", null);
        this.element = new NavSystemElementGroup([
            new F35_DAS_Camera(),            
        ]);
    }
}


class F35_DAS_Camera extends NavSystemElement {
    constructor() {
        super(...arguments);
        this.zoomLevelTestInitialized = false;
        this.mapTopViewSettings = undefined;
    }
    init(root) {
        this.mapMask = this.gps.getChildById("CameraMask");
        this.cameraPositionElement = this.gps.getChildById("CameraPosition");
        this.cameraAltitudeElement = this.gps.getChildById("CameraAltitude");
        this.altitudeLevelText = this.gps.getChildById("CameraAltitudeLevel");
        this.initMap();
        this.initRangeButtons();
        this.setAltitudeLevel(SimVar.GetSimVarValue("L:AS03D_MFD_Camera_Zoom_Level", "number"));
    }
    initMap() {
        this.map = new MapInstrumentElement();
        if (this.map) {
            this.map.setGPS(this.gps);
            this.map.init(this.gps.getChildById("Camera"));
            this.map.isInitialized = true;
            this.mapTopViewSettings = this.map.instrument.getTopViewSettings();
        }
    }
    initRangeButtons() {
        this.zoomIncreaseButton = this.gps.getChildById("CameraZoomIncreaseButton");
        this.zoomDecreaseButton = this.gps.getChildById("CameraZoomDecreaseButton");
        if (this.zoomIncreaseButton) {
            this.zoomIncreaseButton.addEventListener("mouseup", () => {
                this.gps.playInstrumentSound("tone_touchscreen_PFD_touch");
                this.decreaseAltitudeLevel();
            });
            this.zoomIncreaseButton.addEventListener("mousedown", () => { this.zoomIncreaseButton.classList.add("active"); });
            this.zoomIncreaseButton.addEventListener("mouseup", () => { this.zoomIncreaseButton.classList.remove("active"); });
            this.zoomIncreaseButton.addEventListener("mouseenter", () => { this.zoomIncreaseButton.classList.add("highlight"); });
            this.zoomIncreaseButton.addEventListener("mouseleave", () => { this.zoomIncreaseButton.classList.remove("highlight"); });
        }
        if (this.zoomDecreaseButton) {
            this.zoomDecreaseButton.addEventListener("mouseup", () => {
                this.gps.playInstrumentSound("tone_touchscreen_PFD_touch");
                this.increaseAltitudeLevel();
            });
            this.zoomDecreaseButton.addEventListener("mousedown", () => { this.zoomDecreaseButton.classList.add("active"); });
            this.zoomDecreaseButton.addEventListener("mouseup", () => { this.zoomDecreaseButton.classList.remove("active"); });
            this.zoomDecreaseButton.addEventListener("mouseenter", () => { this.zoomDecreaseButton.classList.add("highlight"); });
            this.zoomDecreaseButton.addEventListener("mouseleave", () => { this.zoomDecreaseButton.classList.remove("highlight"); });
        }
        this.updateAltitudeLevelText();
    }
    get altitudeLevel() {
        if (this.map && this.map.instrument)
            return this.map.instrument.getTopViewAltitudeLevel();
        return 0;
    }
    set altitudeLevel(_value) {
        if (this.map && this.map.instrument) {
            this.map.instrument.setTopViewAltitudeLevel(_value);
        }
    }
    increaseAltitudeLevel() {
        this.setAltitudeLevel(this.altitudeLevel + 1);
    }
    decreaseAltitudeLevel() {
        this.setAltitudeLevel(this.altitudeLevel - 1);
    }
    setAltitudeLevel(level) {
        if (this.altitudeLevel != level) {
            this.altitudeLevel = Utils.Clamp(level, 0, this.mapTopViewSettings.altitudeLevels - 1);
            SimVar.SetSimVarValue("L:AS03D_MFD_Camera_Zoom_Level", "number", this.altitudeLevel);
            this.updateAltitudeLevelText();
        }
    }
    updateAltitudeLevelText() {
        if (this.altitudeLevelText && this.mapTopViewSettings) {
            diffAndSetText(this.altitudeLevelText, (this.altitudeLevel + 1) + "/" + this.mapTopViewSettings.altitudeLevels);
            if (!this.zoomLevelTestInitialized)
                this.zoomLevelTestInitialized = true;
        }
    }
    computeCameraAltitudeAboveGround(altitudeLevel) {
        if (this.mapTopViewSettings) {
            let cameraAltitude = Utils.Clamp(Simplane.getAltitude(), this.mapTopViewSettings.altitudeMin, this.mapTopViewSettings.altitudeMax);
            if (this.mapTopViewSettings.altitudeLevels > 1) {
                let step = (cameraAltitude - this.mapTopViewSettings.altitudeMin) / this.mapTopViewSettings.altitudeLevels;
                let level = Utils.Clamp(altitudeLevel, 0, (this.mapTopViewSettings.altitudeLevels - 1));
                cameraAltitude -= (step * level);
            }
            return (cameraAltitude - Simplane.getGroundReference());
        }
        return undefined;
    }
	
	updateMapPitch() {
    this.map.instrument.setTopViewPBH({ pitch: 45 });
    SimVar.SetSimVarValue("L:" + this.instrument.instrumentIdentifier + "_CAMERA_PITCH_VALUE", "number", this.currentPitch);
    }
	
    onUpdate(_deltaTime) {
		let pitch = Simplane.getPitch() + SimVar.GetSimVarValue("L:DASCameraPitch", "degrees");
        let bank = Simplane.getBank();
		
		let DASAnglePitch = SimVar.GetSimVarValue("L:DASCameraPitchCommanded", "degrees");
		let DASAngleRoll = SimVar.GetSimVarValue("L:DASCameraBankCommanded", "degrees");
		
		let DASMode = SimVar.GetSimVarValue("L:DASCameraMode", "number");
		
        if (this.map) {
            if (!this.mapTopViewSettings && this.map.instrument.getTopViewSettings())
                this.mapTopViewSettings = this.map.instrument.getTopViewSettings();
            if (this.mapTopViewSettings) {
                if (!this.zoomLevelTestInitialized)
                    this.updateAltitudeLevelText();
                let cameraAltitudeAboveGround = this.computeCameraAltitudeAboveGround(this.altitudeLevel);
                if (cameraAltitudeAboveGround) {
                    if (this.cameraAltitudeElement) {
                        if (cameraAltitudeAboveGround < this.mapTopViewSettings.altitudeMin)
                            diffAndSetText(this.cameraAltitudeElement, "N/A");
                        else
                            diffAndSetText(this.cameraAltitudeElement, fastToFixed(cameraAltitudeAboveGround, 0) + "ft");
                    }
                    if (this.mapMask) {
                        if (cameraAltitudeAboveGround < this.mapTopViewSettings.altitudeMin)
                            diffAndSetStyle(this.mapMask, StyleProperty.display, "flex");
                        else
                            diffAndSetStyle(this.mapMask, StyleProperty.display, "none");
                    }
                }
            }
            if (this.cameraPositionElement) {
                let latitude = SimVar.GetSimVarValue("PLANE LATITUDE", "degree latitude");
                let longitude = SimVar.GetSimVarValue("PLANE LONGITUDE", "degree longitude");
                diffAndSetText(this.cameraPositionElement, Utils.decimalDegreesToDMS(latitude, 2, 2) + ((latitude > 0) ? " N" : " S") + " / " + Utils.decimalDegreesToDMS(longitude, 2, 2) + ((longitude > 0) ? " E" : " W"));
            }
			
			if (DASMode == 0) {
			this.map.instrument.setTopViewPBH({ pitch: pitch });
			this.map.instrument.setTopViewPBH({ bank: bank });		
			}
			else {
			if (DASMode == 2) {
			this.map.instrument.setTopViewPBH({ pitch: 90 });
			this.map.instrument.setTopViewPBH({ bank: 0 });
			}
			}
            this.map.onUpdate(_deltaTime);
        }
    }
    onEnter() { }
    onExit() { }
    onEvent(_event) { }
}
registerInstrument("darkstar-mfd-element", F35_DAS);
//# sourceMappingURL=F35_DAS.js.map