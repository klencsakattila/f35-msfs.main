class F35ACC_DDI_Checklist extends F35_DDI_Page {
    get templateID() { return "F35ACC_DDI_Checklist"; }
    show() {
        super.show();
        this._checklistACElement = document.body.querySelector(".checklist-ac-value");
        this._checklistMaxNZElement = document.body.querySelector(".checklist-max-nz-value");
        this._checklistStabPosLeftElement = document.body.querySelector(".checklist-stab-pos-left-value");
        this._checklistStabPosRightElement = document.body.querySelector(".checklist-stab-pos-right-value");
        this.ddi.setPageButton(18, F35_DDI_Page_Type.MenuTactical);
    }
    update(deltaTime) {
        super.update(deltaTime);
        diffAndSetText(this._checklistACElement, Simplane.getWeight().toFixed(0));
        let trim = Simplane.getTrimPos();
        let trimString = Math.abs(trim).toFixed(0) + Avionics.Utils.DEGREE_SYMBOL + (trim >= 0 ? "NU" : "ND");
        diffAndSetText(this._checklistStabPosLeftElement, trimString);
        diffAndSetText(this._checklistStabPosRightElement, trimString);
    }
}
customElements.define("f35-acc-ddi-checklist", F35ACC_DDI_Checklist);
//# sourceMappingURL=F35ACC_DDI_Checklist.js.map