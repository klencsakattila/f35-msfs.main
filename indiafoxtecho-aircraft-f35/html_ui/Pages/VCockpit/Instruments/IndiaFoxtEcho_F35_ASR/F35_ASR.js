class F35_ASR extends BaseAirliners {
    get templateID() { return "F35_ASR"; }
    get IsGlassCockpit() { return true; }
    get isInteractive() { return true; }
    Init() {
        super.Init();
        if (this.radioNav)
            this.radioNav.init(NavMode.FOUR_SLOTS);
        this.pageGroups = [
            new NavSystemPageGroup("Main", this, [
                new F35_ASR_MainPage()
            ]),
        ];
    }
}
class F35_ASR_MainPage extends NavSystemPage {
    constructor() {
        super("Main", "Mainframe", null);
        this.element = new NavSystemElementGroup([
            new F35_ASR_Camera(),            
        ]);
    }
}


class F35_ASR_Camera extends NavSystemElement {
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
			SimVar.SetSimVarValue("L:ASRCameraAltitude", "feet", cameraAltitude);
            return (cameraAltitude - Simplane.getGroundReference());
			SimVar.SetSimVarValue("L:ASRLevels", "number", step);
        }
        return undefined;
    }
    onUpdate(_deltaTime) {
		let changeLevel = SimVar.GetSimVarValue("L:ASRAltitude", "number");
		let currentLevel = this.map.instrument.getTopViewAltitudeLevel();
		let pitch = 28 + (changeLevel * 1.75);
        if (this.map) {
            if (!this.mapTopViewSettings && this.map.instrument.getTopViewSettings())
                this.mapTopViewSettings = this.map.instrument.getTopViewSettings();
            if (this.mapTopViewSettings) {
                if (!this.zoomLevelTestInitialized)
                    this.updateAltitudeLevelText();
                let cameraAltitudeAboveGround = this.computeCameraAltitudeAboveGround(this.altitudeLevel);
            }
            if (this.cameraPositionElement) {
                let latitude = SimVar.GetSimVarValue("PLANE LATITUDE", "degree latitude");
                let longitude = SimVar.GetSimVarValue("PLANE LONGITUDE", "degree longitude");
                diffAndSetText(this.cameraPositionElement, Utils.decimalDegreesToDMS(latitude, 2, 2) + ((latitude > 0) ? " N" : " S") + " / " + Utils.decimalDegreesToDMS(longitude, 2, 2) + ((longitude > 0) ? " E" : " W"));
            }

			if (changeLevel != currentLevel) { 
			this.setAltitudeLevel(changeLevel);
			}
			else {
			}
            

			// SimVar.SetSimVarValue("L:ASRLevel", "number", this.map.instrument.getTopViewAltitudeLevel());
			// SimVar.SetSimVarValue("L:ASRMin", "number", this.map.instrument.getTopViewAltitudeLevel());
			
			this.map.instrument.setTopViewPBH({ pitch: pitch });
			this.map.instrument.setTopViewPBH({ bank: 0 });
			this.map.instrument.setTopViewPBH({ head: 0 });	
			
			this.map.onUpdate(_deltaTime);
        }
    }
    onEnter() { }
    onExit() { }
    onEvent(_event) { }
}
registerInstrument("darkstar-mfd-element", F35_ASR);
//# sourceMappingURL=F35_ASR.js.map