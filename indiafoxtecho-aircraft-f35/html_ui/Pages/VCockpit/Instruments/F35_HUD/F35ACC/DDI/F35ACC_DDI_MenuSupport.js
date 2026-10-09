class F35ACC_DDI_MenuSupport extends F35_DDI_MenuSupport {
    show() {
        super.show();
        this.ddi.setPageButton(11, F35_DDI_Page_Type.Checklist);
        this.ddi.setPageButton(19, F35_DDI_Page_Type.FPAS);
    }
}
customElements.define("f35-acc-ddi-menu-support", F35ACC_DDI_MenuSupport);
//# sourceMappingURL=F35ACC_DDI_MenuSupport.js.map