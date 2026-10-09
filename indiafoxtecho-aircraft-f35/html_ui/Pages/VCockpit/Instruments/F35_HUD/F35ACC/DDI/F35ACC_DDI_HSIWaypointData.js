class F35ACC_DDI_HSIWaypointData extends F35_DDI_Page {
    get templateID() { return "F35ACC_DDI_HSIWaypointData"; }
    show() {
        super.show();
        this.waypointNameElement = this.ddi.getChildById("HsiWaypointDataWaypointName");
        this.latitudeElement = this.ddi.getChildById("HsiWaypointDataWaypointLat");
        this.longitudeElement = this.ddi.getChildById("HsiWaypointDataWaypointLon");
        this.elevationElement = this.ddi.getChildById("HsiWaypointDataWaypointElevation");
        this.currentSequenceOrder = this.ddi.getChildById("HsiWaypointDataWaypointSequenceOrder");
        this.waypointIndexValueElement = this.ddi.getChildById("HsiWaypointDataWaypointIndex");
        this.sequenceNumberElement = this.ddi.getChildById("HsiWaypointDataSequenceNumber");
        for (let i of [2, 3, 4, 9, 11, 14, 16, 17, 19, 20]) {
            this.ddi.setPageButton(i, F35_DDI_Page_Type.NotImplemented);
        }
        this.ddi.onButtonPressed[1] = () => {
            if (this.ddi.waypointManager.initialized)
                SimVar.SetSimVarValue("L:F35_DDI_HSI_DATA_WYPT_SEQUFC_Pressed", "number", 1);
        };
        this.ddi.onButtonPressed[5] = () => {
            if (this.ddi.waypointManager.initialized) {
                SimVar.SetSimVarValue("L:F35_DDI_HSI_DATA_WYPT_UFC_Pressed", "number", 1);
            }
        };
        this.ddi.setPageButton(6, F35_DDI_Page_Type.HSIAircraftData);
        this.ddi.setPageButton(8, F35_DDI_Page_Type.HSITacanData);
        this.ddi.setPageButton(10, F35_DDI_Page_Type.HSI);
        this.ddi.onButtonPressed[12] = () => {
            this.ddi.waypointManager.switchToNextWaypoint();
        };
        this.ddi.onButtonPressed[13] = () => {
            this.ddi.waypointManager.switchToPreviousWaypoint();
        };
        this.ddi.onButtonPressed[15] = () => {
            this.ddi.waypointManager.toggleSequences();
        };
        this.ddi.onButtonPressed[18] = () => {
            this.ddi.showPage(F35_DDI_Page_Type.MenuTactical);
        };
    }
    updateWaypointNumber() {
        let newNumber = this.ddi.waypointManager.currentWaypointNumber;
        if (this.waypointIndexValueElement)
            diffAndSetText(this.waypointIndexValueElement, newNumber + '');
        if (this.waypointNameElement)
            diffAndSetText(this.waypointNameElement, "WYPT " + newNumber);
    }
    updateSequenceNumber() {
        if (this.sequenceNumberElement) {
            if (this.ddi.waypointManager.initialized) {
                diffAndSetText(this.sequenceNumberElement, "S E Q " + this.ddi.waypointManager.currentSequenceNumber);
                if (this.ddi.waypointManager.isCurrentSequenceActive) {
                    this.sequenceNumberElement.classList.add("sk-label-highlight");
                }
                else {
                    this.sequenceNumberElement.classList.remove("sk-label-highlight");
                }
            }
        }
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.ddi.waypointManager.initialized) {
            this.updateSequenceNumber();
            this.updateWaypointNumber();
            let wp = this.ddi.waypointManager.currentWaypoint;
            if (wp) {
                diffAndSetText(this.latitudeElement, this.ddi.coordinatesDisplay(wp.infos.coordinates.lat, true));
                diffAndSetText(this.longitudeElement, this.ddi.coordinatesDisplay(wp.infos.coordinates.long, false));
                diffAndSetText(this.elevationElement, "ELEV " + (wp.infos.coordinates.alt * Avionics.Utils.METER2FEET).toFixed() + " FT");
            }
            let seq = this.ddi.waypointManager.currentSequenceWaypointsNumbers;
            let output = '';
            for (let i = 0; i < seq.length; i++) {
                output += seq[i];
                if (i + 1 != seq.length)
                    output += "- ";
            }
            diffAndSetText(this.currentSequenceOrder, output);
        }
    }
}
customElements.define("f35-acc-ddi-hsi-waypoint-data", F35ACC_DDI_HSIWaypointData);
//# sourceMappingURL=F35ACC_DDI_HSIWaypointData.js.map