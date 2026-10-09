class F35ACC_DDI_HSI extends F35_DDI_HSI {
    get templateID() { return "F35ACC_DDI_HSI"; }
    show() {
        super.show();
        this.ddi.onButtonPressed[10] = () => {
            this.ddi.showPage(F35_DDI_Page_Type.HSIWaypointData);
        };
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (SimVar.GetSimVarValue("NAV HAS TACAN:1", "Bool") && SimVar.GetSimVarValue("L:Glasscockpit_TACAN_Mode", "number") == 1) {
            this.ddi.map.shownTacanIdent = SimVar.GetSimVarValue("TACAN STATION IDENT:1", "string");
        }
        else {
            this.ddi.map.shownTacanIdent = "";
        }
    }
}
customElements.define("f35-acc-ddi-hsi", F35ACC_DDI_HSI);
//# sourceMappingURL=F35ACC_DDI_HSI.js.map