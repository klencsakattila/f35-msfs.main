class F35_DDI_MenuSupport extends F35_DDI_Page {
    get templateID() { return "F35_DDI_MenuSupport"; }
    show() {
        super.show();
        this.ddi.setPageButton(1, F35_DDI_Page_Type.ADI);
        this.ddi.setPageButton(2, F35_DDI_Page_Type.HSI);
        for (let i of [3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 16, 19]) {
            this.ddi.setPageButton(i, F35_DDI_Page_Type.NotImplemented);
        }
        this.ddi.setPageButton(12, F35_DDI_Page_Type.Engine);
        this.ddi.setPageButton(18, F35_DDI_Page_Type.MenuTactical);
        this.ddi.setPageButton(20, F35_DDI_Page_Type.Fuel);
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
customElements.define("f35-ddi-menu-support", F35_DDI_MenuSupport);
//# sourceMappingURL=F35_DDI_MenuSupport.js.map