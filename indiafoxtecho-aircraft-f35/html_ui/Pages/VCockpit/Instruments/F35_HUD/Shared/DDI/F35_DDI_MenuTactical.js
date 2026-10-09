class F35_DDI_MenuTactical extends F35_DDI_Page {
    get templateID() { return "F35_DDI_MenuTactical"; }
    show() {
        super.show();
        for (let i of [1, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 16, 17, 20]) {
            this.ddi.setPageButton(i, F35_DDI_Page_Type.NotImplemented);
        }
        this.ddi.setPageButton(3, F35_DDI_Page_Type.HUD);
        this.ddi.setPageButton(18, F35_DDI_Page_Type.MenuSupport);
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
customElements.define("f35-ddi-menu-tactical", F35_DDI_MenuTactical);
//# sourceMappingURL=F35_DDI_MenuTactical.js.map