class F35_DDI_Map extends MapInstrumentElement {
    constructor() {
        super(...arguments);
        this.zoomRanges = [10, 20, 40, 60, 80];
    }
    onTemplateLoaded() {
        super.onTemplateLoaded();
        this.instrument.rotateWithPlane(true);
        this.instrument.zoomRanges = this.getAdaptiveRanges(F35_DDI_Map.F35_DDI_MAP_ZOOM_FACTOR);
        this.instrument.setZoom(2);
        this.instrument.setPlaneIcon(2);
        diffAndSetAttribute(this.instrument, "show-flightplan-waypoints", "true");
        diffAndSetAttribute(this.instrument, "show-airplane", "true");	
		
        SvgMap.prototype.isLatLongInFrame = function (ll, safetyMarginFactor = 0) {
            let distance = Avionics.Utils.computeGreatCircleDistance(this.centerCoordinates, ll);
            return distance < (this.NMWidth / F35_DDI_Map.F35_DDI_MAP_ZOOM_FACTOR);
        };
    }
    getAdaptiveRanges(_factor) {
        let ranges = Array.from(this.zoomRanges);
        for (let i = 0; i < ranges.length; i++)
            ranges[i] *= _factor;
        return ranges;
    }
    getDisplayRange() {
        return this.zoomRanges[this.instrument.getZoom()];
    }
    incZoom() {
        let newZoom = this.instrument.getZoom() + 1;
        if (newZoom > 4)
            newZoom = 0;
        this.instrument.setZoom(newZoom);
    }	
    decZoom() {
        let newZoom = this.instrument.getZoom() - 1;
        if (newZoom < 0)
            newZoom = this.zoomRanges.length - 1;
        this.instrument.setZoom(newZoom);
    }
    get isFlightPlanShown() {
        return this.instrument.showFlightPlan;
    }
    showFlightPlan() {
        diffAndSetAttribute(this.instrument, "show-flightplan", "true");
    }
    hideFlightPlan() {
        diffAndSetAttribute(this.instrument, "show-flightplan", "false");
    }
    get mapConfigId() {
        return this.instrument.mapConfigId;
    }
    set mapConfigId(_id) {
        this.instrument.mapConfigId = _id;
    }
    set shownWaypointIndex(index) {
        diffAndSetAttribute(this.instrument, "shown-waypoint-index", index + '');
    }
    set shownTacanIdent(ident) {
        if (ident) {
            this.showVors();
            diffAndSetAttribute(this.instrument, "shown-vors-ident-list", ident);
        }
        else {
            diffAndSetAttribute(this.instrument, "shown-vors-ident-list", "");
            this.hideVors();
        }
    }
    hideVors() {
        diffAndSetAttribute(this.instrument, "show-vors", "false");
    }
    showVors() {
        diffAndSetAttribute(this.instrument, "show-vors", "true");
    }
    showBingMap() {
        if (this.gps.instrumentIndex === 3) {
            diffAndSetAttribute(this.instrument, "show-bing-map", "true");
        }
        else {
            diffAndSetAttribute(this.instrument, "show-bing-map", "false");
        }
    }
    hideBingMap() {
        diffAndSetAttribute(this.instrument, "show-bing-map", "false");
    }
    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);
        if (this.isFlightPlanShown && !this.instrument.getFlightPlanIsDashed())
            this.instrument.setFlightPlanAsDashed(true);
    }
}
F35_DDI_Map.F35_DDI_MAP_ZOOM_FACTOR = 4;
//# sourceMappingURL=F35_DDI_Map.js.map