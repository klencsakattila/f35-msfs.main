class F35ACC_DDI_HSIndicator extends F35_DDI_HSIndicator {
    construct() {
        super.construct();
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.selectedHeadingMode) {
            diffAndSetText(this.selectedHeadingMode, (SimVar.GetSimVarValue("L:F35_HEADING_SELECT_MODE", "number") === 1) ? " " : " ");
        }
    }
}
customElements.define("f35-acc-ddi-hs-indicator", F35ACC_DDI_HSIndicator);
//# sourceMappingURL=F35ACC_DDI_HSIndicator.js.map