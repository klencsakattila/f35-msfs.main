class F35ACC_DDI extends F35_DDI {
    constructor() {
        super();
        this._latLonDisplayMode = 0;
        this.waypointManager = new F35ACC_DDI_WaypointManager(this);
    }
    get latLonDisplayMode() { return this._latLonDisplayMode; }
    Init() {
        this.pages.set(F35_DDI_Page_Type.HSIAircraftData, document.querySelector("f35-acc-ddi-hsi-aircraft-data"));
        this.pages.set(F35_DDI_Page_Type.HSITacanData, document.querySelector("f35-acc-ddi-hsi-tacan-data"));
        this.pages.set(F35_DDI_Page_Type.HSIWaypointData, document.querySelector("f35-acc-ddi-hsi-waypoint-data"));
        this.pages.set(F35_DDI_Page_Type.Checklist, document.querySelector("f35-acc-ddi-checklist"));
        this.pages.set(F35_DDI_Page_Type.FPAS, document.querySelector("f35-acc-ddi-fpas"));
        this.pages.set(F35_DDI_Page_Type.HSI, document.querySelector("f35-acc-ddi-hsi"));
        this.pages.set(F35_DDI_Page_Type.MenuSupport, document.querySelector("f35-acc-ddi-menu-support"));
        super.Init();
        if (this.instrumentIndex === 2) {

            SimVar.SetSimVarValue("L:F35_DDI_LAT_LON_DISPLAY_MODE", "number", this._latLonDisplayMode);
        }
    }
    coordinatesDisplay(coordinates, isLatitude) {
        let nsew = isLatitude ? ((coordinates < 0) ? "S" : "N") : ((coordinates < 0) ? "W" : "E");
        if (this.latLonDisplayMode == 1) {
            return nsew + ' ' + Utils.decimalDegreesToDMS(coordinates, 2, 0);
        }
        else {
            return nsew + ' ' + Utils.decimalDegreesToDDM(coordinates, 2, 4);
        }
    }
    onUpdate(_deltaTime) {
        this._latLonDisplayMode = SimVar.GetSimVarValue("L:F35_DDI_LAT_LON_DISPLAY_MODE", "number");
        super.onUpdate(_deltaTime);
    }
}
registerInstrument("f35acc-ddi-element", F35ACC_DDI);
//# sourceMappingURL=F35ACC_DDI.js.map