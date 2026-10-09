class F35_DDI_Fuel extends F35_DDI_Page {
    get templateID() { return "F35_DDI_Fuel"; }
    show() {
        super.show();
        this._totalValueElement = document.body.querySelector(".fuel-total-value");
        this._internalValueElement = document.body.querySelector(".fuel-internal-value");
        this._tank1ValueElement = document.body.querySelector(".fuel-tk1-value-box span");
        this._tank2ValueElement = document.body.querySelector(".fuel-lfd-value-box span");
        this._tank3ValueElement = document.body.querySelector(".fuel-rfd-value-box span");
        this._tank4ValueElement = document.body.querySelector(".fuel-tk4-value-box span");
        this._tank1PointerElement = document.body.querySelector(".fuel-tk1-pointer");
        this._tank1PointerElement.style.left = "660px";
        this._tank2PointerElement = document.body.querySelector(".fuel-lfd-pointer");
        this._tank2PointerElement.style.left = "660px";
        this._tank3PointerElement = document.body.querySelector(".fuel-rfd-pointer");
        this._tank3PointerElement.style.left = "660px";
        this._tank4PointerElement = document.body.querySelector(".fuel-tk4-pointer");
        this._tank4PointerElement.style.left = "660px";
        this._tankLeftWingValueElement = document.body.querySelector(".fuel-lwg-value-box span");
        this._tankRightWingValueElement = document.body.querySelector(".fuel-rwg-value-box span");
        this._tankLeftWingPointerElement = document.body.querySelector(".fuel-lwg-pointer");
        this._tankLeftWingPointerElement.style.left = "233px";
        this._tankRightWingPointerElement = document.body.querySelector(".fuel-rwg-pointer");
        this._tankRightWingPointerElement.style.left = "899px";
        this.ddi.setPageButton(18, F35_DDI_Page_Type.MenuTactical);
        this.ddi.setPageButton(20, F35_DDI_Page_Type.NotImplemented);
    }
    update(deltaTime) {
        super.update(deltaTime);
        let gallonToPounds = SimVar.GetSimVarValue("FUEL WEIGHT PER GALLON", "lbs");
        diffAndSetText(this._totalValueElement, (SimVar.GetSimVarValue("FUEL TOTAL CAPACITY", "gallons") * gallonToPounds).toFixed(0).padStart(3, "0"));
        diffAndSetText(this._internalValueElement, (SimVar.GetSimVarValue("FUEL TOTAL QUANTITY", "gallons") * gallonToPounds).toFixed(0).padStart(3, "0"));
        let tank1Capacity = SimVar.GetSimVarValue("FUELSYSTEM TANK CAPACITY:1", "gallons");
        let tank2Capacity = SimVar.GetSimVarValue("FUELSYSTEM TANK CAPACITY:2", "gallons");
        let tank3Capacity = SimVar.GetSimVarValue("FUELSYSTEM TANK CAPACITY:3", "gallons");
        let tank4Capacity = SimVar.GetSimVarValue("FUELSYSTEM TANK CAPACITY:4", "gallons");
        let tank1Value = SimVar.GetSimVarValue("FUELSYSTEM TANK TOTAL QUANTITY:1", "gallons");
        let tank2Value = SimVar.GetSimVarValue("FUELSYSTEM TANK TOTAL QUANTITY:2", "gallons");
        let tank3Value = SimVar.GetSimVarValue("FUELSYSTEM TANK TOTAL QUANTITY:3", "gallons");
        let tank4Value = SimVar.GetSimVarValue("FUELSYSTEM TANK TOTAL QUANTITY:4", "gallons");
        diffAndSetText(this._tank1ValueElement, (tank1Value * gallonToPounds).toFixed(0).padStart(3, "0"));
        diffAndSetText(this._tank2ValueElement, (tank2Value * gallonToPounds).toFixed(0).padStart(3, "0"));
        diffAndSetText(this._tank3ValueElement, (tank3Value * gallonToPounds).toFixed(0).padStart(3, "0"));
        diffAndSetText(this._tank4ValueElement, (tank4Value * gallonToPounds).toFixed(0).padStart(3, "0"));
        this._tank1PointerElement.style.top = (27 + (1 - tank1Value / tank1Capacity) * 153).toFixed(0) + "px";
        this._tank2PointerElement.style.top = (217 + (1 - tank2Value / tank2Capacity) * 93).toFixed(0) + "px";
        this._tank3PointerElement.style.top = (346 + (1 - tank3Value / tank3Capacity) * 73).toFixed(0) + "px";
        this._tank4PointerElement.style.top = (460 + (1 - tank4Value / tank4Capacity) * 183).toFixed(0) + "px";
        let tank5Capacity = SimVar.GetSimVarValue("FUELSYSTEM TANK CAPACITY:5", "gallons");
        let tank6Capacity = SimVar.GetSimVarValue("FUELSYSTEM TANK CAPACITY:6", "gallons");
        let tank5Value = SimVar.GetSimVarValue("FUELSYSTEM TANK TOTAL QUANTITY:5", "gallons");
        let tank6Value = SimVar.GetSimVarValue("FUELSYSTEM TANK TOTAL QUANTITY:6", "gallons");
        diffAndSetText(this._tankLeftWingValueElement, (tank5Value * gallonToPounds).toFixed(0).padStart(3, "0"));
        diffAndSetText(this._tankRightWingValueElement, (tank6Value * gallonToPounds).toFixed(0).padStart(3, "0"));
        this._tankLeftWingPointerElement.style.top = (323 + (1 - tank5Value / tank5Capacity) * 98).toFixed(0) + "px";
        this._tankRightWingPointerElement.style.top = (305 + (1 - tank6Value / tank6Capacity) * 98).toFixed(0) + "px";
    }
}
customElements.define("f35-ddi-fuel", F35_DDI_Fuel);
//# sourceMappingURL=F35_DDI_Fuel.js.map