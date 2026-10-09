class F35_DDI_HSI extends F35_DDI_Page {
    constructor() {
        super(...arguments);
        this.isModeMenuActive = false;
        this.modeMenuTimer = -1;
    }
    init(ddi) {
        super.init(ddi);
        this.ddi.map.init(this);
        SimVar.SetSimVarValue("L:F35_DDI_HSI_BING_MAP_SHOWN", "Bool", true);
        this._hsi = this.ddi.getChildById("Compass");
        this._hsi.setInstrument(this.ddi);
        this.scaleValue = this.ddi.getChildById("HsiScaleButton");
        this.currentWaypointNumberValue = this.ddi.getChildById("HsiCurrentWaypointIndex");
        this.sequenceNumber = this.ddi.getChildById("HsiSequenceNumber");
        this.label1 = this.getElementsByClassName("sk-label-1")[0];
        this.label2 = this.getElementsByClassName("sk-label-2")[0];
        this.label3 = this.getElementsByClassName("sk-label-3")[0];
        this.label4 = this.getElementsByClassName("sk-label-4")[0];
        this.label5 = this.getElementsByClassName("sk-label-5")[0];
        this.label11 = this.getElementsByClassName("sk-label-11")[0];
        this.updateWaypointIndex();
        this.updateSequenceNumber();
    }
    show() {
        super.show();
        for (let i of [1, 2, 6, 7, 9, 10, 14, 16, 17, 20]) {
            this.ddi.setPageButton(i, F35_DDI_Page_Type.NotImplemented);
        }
        this.ddi.onButtonPressed[8] = () => {
            this.ddi.map.decZoom();
        };
        this.ddi.onButtonPressed[11] = () => {
            if (this.ddi.waypointManager.initialized && this.ddi.waypointManager.isCurrentWaypointValid) {
                if (SimVar.GetSimVarValue("L:F35_DDI_STEERING_SOURCE", "number") === F35_DDI_Steering_Source.WYPT)
                    SimVar.SetSimVarValue("L:F35_DDI_STEERING_SOURCE", "number", F35_DDI_Steering_Source.None);
                else
                    SimVar.SetSimVarValue("L:F35_DDI_STEERING_SOURCE", "number", F35_DDI_Steering_Source.WYPT);
            }
        };
        this.ddi.onButtonPressed[12] = () => {
            this.ddi.waypointManager.switchToNextWaypoint();
        };
        this.ddi.onButtonPressed[13] = () => {
            this.ddi.waypointManager.switchToPreviousWaypoint();
        };
        this.ddi.onButtonPressed[15] = () => {
            this.ddi.waypointManager.toggleSequences();
        };
        this.ddi.setPageButton(18, F35_DDI_Page_Type.MenuTactical);
        this.switchToRootMenu();
    }
    switchToRootMenu() {
    }
	
    switchToModeMenu() {
    }
	
    update(deltaTime) {
        super.update(deltaTime);
        if (this.modeMenuTimer > 0) {
            this.modeMenuTimer -= (deltaTime / 1000);
        }
        else {
            if (this.isModeMenuActive)
                this.switchToRootMenu();
        }
        let bingMapShown = SimVar.GetSimVarValue("L:F35_DDI_HSI_BING_MAP_SHOWN", "Bool");
        if (bingMapShown) {
            this.ddi.map.showBingMap();
        }
        else {
            this.ddi.map.hideBingMap();
        }
        this.ddi.map.instrument.rotateWithPlane(!SimVar.GetSimVarValue("L:F35_DDI_HSI_NORTH_UP", "Bool"));

        let steeringSource = SimVar.GetSimVarValue("L:F35_DDI_STEERING_SOURCE", "number");


        this.updateSequenceNumber();
        this.updateWaypointIndex();
        if (this._hsi) {
            this._hsi.update(deltaTime);
        }

		// Check Map zoom
		let mapinc = SimVar.GetSimVarValue("L:TSDMapInc", "Bool");
		let mapdec = SimVar.GetSimVarValue("L:TSDMapDec", "Bool");	

        if (mapdec) {
            this.ddi.map.decZoom();
			SimVar.SetSimVarValue("L:TSDMapDec", "Bool", false);
        }

        if (mapinc) {
            this.ddi.map.incZoom();
			SimVar.SetSimVarValue("L:TSDMapInc", "Bool", false);
        }
	
		//SimVar.SetSimVarValue("L:TSD_MAP_Range", "number", this.ddi.map.getDisplayRange());
    }

    updateWaypointIndex() {
    }
	
    updateSequenceNumber() {
    }
}
//# sourceMappingURL=F35_DDI_HSI.js.map