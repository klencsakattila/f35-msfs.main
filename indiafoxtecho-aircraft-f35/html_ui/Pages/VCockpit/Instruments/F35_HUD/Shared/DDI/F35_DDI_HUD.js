class F35_DDI_HUD extends F35_DDI_Page {
    constructor() {
        super(...arguments);
        this.vVectorMinX = -9;
        this.vVectorMaxX = 9;
        this.vVectorMinY = -8;
        this.vVectorMaxY = 10;
        this._hudPeakGValue = 0;
        this.projectionOffset = 0;
        this._drawn = false;
        this.clutterLevel = -1;
        this.isCoupled = false;
        this.coupledTimer = -1;
    }
    get templateID() { return "F35_DDI_HUD"; }
    show() {
        super.show();
        F35_DDI_HUD.DEBUG_INSTANCE = this;
        if (!this._drawn) {
            this._waterLineElement = this.ddi.getChildById("hud-waterline");
            this._hudMainElement = this.ddi.getElementsByClassName("hud-display")[0];
            diffAndSetAttribute(this._hudMainElement, "main_hud", (this.ddi.instrumentIndex == 4) ? "True" : "False");
            this._hudAirspeedElement = this.ddi.getChildById("hud-airspeed");
            this._hudVerticalSpeedElement = this.ddi.getChildById("hud-vertical-speed");
			this._hudAltitudeElement = this.ddi.getChildById("hud-altitude");
            this._hudAltitudeLargeElement = this.ddi.getChildById("hud-altitude-large");
            this._hudAltitudeSmallElement = this.ddi.getChildById("hud-altitude-small");
            this._hudAltitudeModeElement = this.ddi.getChildById("hud-altitude-mode");
			this._hudHeadingElement = this.ddi.getChildById("hud-heading");
			this._hudHeadingGroundTrack = this.ddi.getChildById("hud-groundtrack");	
			this._hudTacanDiamond = this.ddi.getChildById("hud-tacandiamond");				
			this._hudHeadingCMD = this.ddi.getChildById("hud-cmd-heading");
			this._hudAirspeedCMD = this.ddi.getChildById("hud-cmd-airspeed");
			this._hudAltitudeCMD = this.ddi.getChildById("hud-cmd-altitude");			
            this._hudAOAElement = this.ddi.getChildById("hud-aoa-value");
            this._hudMachLabel = this.ddi.getChildById("hud-mach-label");
            this._hudMachElement = this.ddi.getChildById("hud-mach-value");
            this._hudCurrentGLabel = this.ddi.getChildById("hud-current-g-label");
            this._hudCurrentGElement = this.ddi.getChildById("hud-current-g-value");
            this._hudPeakGElement = this.ddi.getChildById("hud-peak-g-value");
            this._hudCplModeElement = this.ddi.getChildById("hud-cpl-mode");
            this._hudSteeringDataElement = this.ddi.getChildById("hud-steering-data");
            this._headingElement = this.ddi.getChildById("heading-tape-group");
            this._headingCursorElement = this.ddi.getChildById("heading-cursor");
            this._headingClipElement = this.ddi.getChildById("heading-clip");
            this._headingSteeringBugElement = this.ddi.getChildById("heading-steering-bug");
            this._horizonElement = this.ddi.getChildById("hud-horizon-group");
            this._horizonContainerElement = this.ddi.getChildById("hud-horizon-container-group");
            this._horizonClipElement = this.ddi.getChildById("hud-horizon-clip");
            this._eBracketElement = this.ddi.getChildById("e-bracket-group");
            this._bankCursorElement = this.ddi.getChildById("bank-cursor");
            this._sideslipCursorElement = this.ddi.getChildById("slip-cursor");
            this._bankElement = this.ddi.getChildById("bank-tape-group");
			this._bankElementExt = this.ddi.getChildById("bank-tape-group-extended");
			this._bankElementRA = this.ddi.getChildById("bank-tape-group-extended2");			
            this._velocityElement = this.ddi.getChildById("velocity-vector-group");
			this._velocitySymbol = this.ddi.getChildById("velocity-vector-symbol");
			this._climbDiveSymbol = this.ddi.getChildById("climb-dive-symbol");
            this._ghostVelocityElement = this.ddi.getChildById("ghost-velocity-vector-group");
            this._energyCaret = this.ddi.getChildById("energy-caret");
			this._speedBrake = this.ddi.getChildById("speed-brake");
			this._speedBrakep1 = this.ddi.getChildById("speed-brakep1");
			this._speedBrakep2 = this.ddi.getChildById("speed-brakep2");
			this._speedBrakep3 = this.ddi.getChildById("speed-brakep3");
			this._speedBrakep4 = this.ddi.getChildById("speed-brakep4");
			this._speedBrakep5 = this.ddi.getChildById("speed-brakep5");			
            this._altitudeWarningElement = this.ddi.getChildById("hud-altitude-warning");
			this._pullupWarningElement = this.ddi.getChildById("hud-flyup-warning");
			this._ilslocatorbar = this.ddi.getChildById("ils-steering-bar");
			this._ilsglideslopebar = this.ddi.getChildById("ils-glideslope-bar");
			this._pulluparrow = this.ddi.getChildById("pull-up-arrow");
			this._pullupchevronlt = this.ddi.getChildById("pull-up-chevron-lt");
			this._pullupchevronrt = this.ddi.getChildById("pull-up-chevron-rt");			
			this._stovlplane = this.ddi.getChildById("stovl-plane");
			this._stovlarrow1 = this.ddi.getChildById("stovl-arrow1");
			this._stovlarrow2 = this.ddi.getChildById("stovl-arrow2");
			this._dialsgraphics = this.ddi.getChildById("dials-graphics");
			this._needleairspeed = this.ddi.getChildById("needle-airspeed");
			this._needlealtitude = this.ddi.getChildById("needle-altitude");
			this._hudleftpanel = this.ddi.getChildById("hud-left-panel");
			this._hudrightpanel = this.ddi.getChildById("hud-right-panel");			
			this._radioaltitude = this.ddi.getChildById("hud-radio-altitude");
			this._clock = this.ddi.getChildById("hud-newclock");
			this._stopwatch = this.ddi.getChildById("hud-stopwatch");
			this._timetosteer = this.ddi.getChildById("hud-time-to-steer");
			this._refuel = this.ddi.getChildById("hud-refuel");
			this._fuelq = this.ddi.getChildById("hud-fuelq");
			this._fdump = this.ddi.getChildById("hud-dump");
			this._armsafe = this.ddi.getChildById("hud-arm-safe");
			this._nws = this.ddi.getChildById("hud-nws");	
			this._brake = this.ddi.getChildById("hud-brake-application");			
			this._stovlrpmbig = this.ddi.getChildById("stovl-rpmbig");
			this._stovlrpmsmall1 = this.ddi.getChildById("stovl-rpmsmall1");
			this._stovlrpmsmall2 = this.ddi.getChildById("stovl-rpmsmall2");
			this._hudGSLabel = this.ddi.getChildById("hud-groundspeed-label");
			this._hudGroundSpeedElement = this.ddi.getChildById("hud-groundspeed-value");
            this._cselGroupElement = this.ddi.getChildById("csel-group");
            this._cselDotsLeftGroupElement = this.ddi.getChildById("csel-dots-left-group");
            this._cselDotsRightGroupElement = this.ddi.getChildById("csel-dots-right-group");
            this._cselArrowElement = this.ddi.getChildById("csel-arrow");
	
			this._targetSmall = this.ddi.getChildById("hud-target-small");
	
            for (let i = -3; i < 39; i++) {
                let text = document.createElementNS(Avionics.SVG.NS, "text");
                let s = ((i + 36) % 36).toFixed(0);
                let Xspacing = 125;
                let yBottom = 145;
                s = s.padStart(2, "0");
                diffAndSetText(text, s);
                diffAndSetAttribute(text, "x", (500 + i * Xspacing).toFixed(0));
                diffAndSetAttribute(text, "y", (yBottom - 18) + "");
                diffAndSetAttribute(text, "font-size", "33");
                diffAndSetAttribute(text, "font-weight", "regular");
                diffAndSetAttribute(text, "text-anchor", "middle");
                diffAndSetAttribute(text, "fill", "#00ff00");
                diffAndSetAttribute(text, "clip-path", "url(#heading-clip)");
                this._headingElement.appendChild(text);
                let lineL = document.createElementNS(Avionics.SVG.NS, "line");
                diffAndSetAttribute(lineL, "x1", (500 + i * Xspacing).toFixed(0));
                diffAndSetAttribute(lineL, "y1", (yBottom - 12) + '');
                diffAndSetAttribute(lineL, "x2", (500 + i * Xspacing).toFixed(0));
                diffAndSetAttribute(lineL, "y2", (yBottom) + '');
                diffAndSetAttribute(lineL, "stroke", "#00ff00");
                diffAndSetAttribute(lineL, "stroke-width", "3");
                diffAndSetAttribute(lineL, "clip-path", "url(#heading-clip)");
                this._headingElement.appendChild(lineL);
                let lineS = document.createElementNS(Avionics.SVG.NS, "line");
                diffAndSetAttribute(lineS, "x1", (500 + i * Xspacing + Xspacing / 2).toFixed(0));
                diffAndSetAttribute(lineS, "y1", (yBottom - 8) + '');
                diffAndSetAttribute(lineS, "x2", (500 + i * Xspacing + Xspacing / 2).toFixed(0));
                diffAndSetAttribute(lineS, "y2", (yBottom) + '');
                diffAndSetAttribute(lineS, "stroke", "#00ff00");
                diffAndSetAttribute(lineS, "stroke-width", "3");
                diffAndSetAttribute(lineS, "clip-path", "url(#heading-clip)");
                this._headingElement.appendChild(lineS);
            }
            for (let i = -17; i < 18; i++) {
                let h = 20;
                if (i === 0) {
                    h = 35;
                }
                else if (i < 0) {
                    h = -20;
                }
                let y = 420 - F35_DDI_HUD.YPERDEGREE * 5 * i;
                let path = document.createElementNS(Avionics.SVG.NS, "g");
                if (i === 0) {
                    let p1 = "0 " + y.toFixed(0);
                    let p2 = "450 " + y.toFixed(0);
                    let p3 = "550 " + y.toFixed(0);
                    let p4 = "1000 " + y.toFixed(0);
                    let d1 = "M" + p1 + " L" + p2 + " M" + p3 + " L" + p4;
                    let path1 = document.createElementNS(Avionics.SVG.NS, "path");
                    diffAndSetAttribute(path1, "d", d1);
                    diffAndSetAttribute(path1, "stroke", "#00ff00");
                    diffAndSetAttribute(path1, "stroke-width", "4");
                    diffAndSetAttribute(path1, "fill", "none");
                    diffAndSetAttribute(path1, "clip-path", "url(#hud-horizon-clip)");
                    this._horizonZeroElement = path1;
                    path.appendChild(path1);
                }
                else {
			
                    let p1 = "335 " + (y + h - 2).toFixed(0);
                    let p2 = "335 " + y.toFixed(0);
                    let p3 = "450 " + (y + h / 5).toFixed(0);
                    let p4 = "550 " + (y + h / 5).toFixed(0);
                    let p5 = "665 " + y.toFixed(0);
                    let p6 = "665 " + (y + h - 2).toFixed(0);
                    let d1 = "M" + p1 + " L" + p2;
                    let d2 = "M" + p2 + " L" + p3;
                    let d3 = "M" + p4 + " L" + p5;
                    let d4 = "M" + p5 + " L" + p6;
					
					if (i < 0) {
						p1 = "450 " + (y + h - 4).toFixed(0);
						p2 = "320 " + y.toFixed(0);
						p3 = "450 " + (y + h / 4).toFixed(0);
						p4 = "550 " + (y + h / 4).toFixed(0);
						p5 = "680 " + y.toFixed(0);
						p6 = "550 " + (y + h - 4).toFixed(0);
						d1 = "M" + p1 + " L" + p3;
						d2 = "M" + p3 + " L" + p2;
						d3 = "M" + p4 + " L" + p5;
						d4 = "M" + p6 + " L" + p4;
                    }			
					
                    let path1 = document.createElementNS(Avionics.SVG.NS, "path");
                    let path2 = document.createElementNS(Avionics.SVG.NS, "path");
                    let path3 = document.createElementNS(Avionics.SVG.NS, "path");
                    let path4 = document.createElementNS(Avionics.SVG.NS, "path");
                    diffAndSetAttribute(path1, "d", d1);
                    diffAndSetAttribute(path2, "d", d2);
                    diffAndSetAttribute(path3, "d", d3);
                    diffAndSetAttribute(path4, "d", d4);
                    diffAndSetAttribute(path1, "stroke", "#00ff00");
                    diffAndSetAttribute(path1, "stroke-width", "4");
                    diffAndSetAttribute(path1, "fill", "none");
                    diffAndSetAttribute(path1, "transform", "translate(0, -1.8)");
                    diffAndSetAttribute(path1, "clip-path", "url(#hud-horizon-clip)");
                    diffAndSetAttribute(path2, "stroke", "#00ff00");
                    diffAndSetAttribute(path2, "stroke-width", "4");
                    diffAndSetAttribute(path2, "fill", "none");
                    diffAndSetAttribute(path2, "clip-path", "url(#hud-horizon-clip)");
                    diffAndSetAttribute(path3, "stroke", "#00ff00");
                    diffAndSetAttribute(path3, "stroke-width", "4");
                    diffAndSetAttribute(path3, "fill", "none");
                    diffAndSetAttribute(path3, "clip-path", "url(#hud-horizon-clip)");
                    diffAndSetAttribute(path4, "stroke", "#00ff00");
                    diffAndSetAttribute(path4, "stroke-width", "4");
                    diffAndSetAttribute(path4, "fill", "none");
                    diffAndSetAttribute(path4, "transform", "translate(0, -1.8)");
                    diffAndSetAttribute(path4, "clip-path", "url(#hud-horizon-clip)");
                    if (i < 0) {
                        diffAndSetAttribute(path1, "transform", "translate(0, 1.8)");
                        diffAndSetAttribute(path4, "transform", "translate(0, 1.8)");
                        diffAndSetAttribute(path2, "stroke-dasharray", "23, 22");
                        diffAndSetAttribute(path3, "stroke-dasharray", "23, 22");
                    }
                    path.appendChild(path1);
                    path.appendChild(path2);
                    path.appendChild(path3);
                    path.appendChild(path4);
                }
                diffAndSetAttribute(path, "id", "attitude-line-" + (i < 0 ? "minus-" : "") + Math.abs(i * 5).toFixed(0));
                this._horizonElement.appendChild(path);
                if (i != 0) {
                    let textPosition = -7;
					let textPositionX = 357;
                    if (i > 0) {
                        textPosition = 32;
						textPositionX = 341;	
                    }
                    let textL = document.createElementNS(Avionics.SVG.NS, "text");
                    diffAndSetText(textL, (i * 5).toFixed(0));
                    diffAndSetAttribute(textL, "id", "attitude-textl-" + (i < 0 ? "minus-" : "") + Math.abs(i * 5).toFixed(0));
                    diffAndSetAttribute(textL, "x", (textPositionX).toFixed(0));
                    diffAndSetAttribute(textL, "y", (y + textPosition).toFixed(0));
                    diffAndSetAttribute(textL, "font-size", "35");
                    diffAndSetAttribute(textL, "font-weight", "bold");
                    if (i < 0) {
                        diffAndSetAttribute(textL, "text-anchor", "end");
                    } else {
                        diffAndSetAttribute(textL, "text-anchor", "left");
                    }
                    diffAndSetAttribute(textL, "fill", "#00ff00");
                    diffAndSetAttribute(textL, "clip-path", "url(#hud-horizon-clip)");
                    this._horizonElement.appendChild(textL);
                }
            }
            this._drawn = true;
        }
        this.ddi.onButtonPressed[18] = () => {
            this.ddi.showPage(F35_DDI_Page_Type.MenuTactical);
        };
    }
    update(deltaTime) {
        super.update(deltaTime);
        let airspeed = Simplane.getIndicatedSpeed();
        let verticalSpeed = Simplane.getVerticalSpeed();
        let bank = Simplane.getBank();
        this._cagedVelocityVector = SimVar.GetSimVarValue("L:HUDCage", "boolean");
        if (this.coupledTimer >= 0) {
            this.coupledTimer -= (deltaTime / 1000);
        }
        if (this.ddi.instrumentIndex === 4) {
            this.updateProjection(deltaTime);
        }
        
		this.updateHudWithGearPosition();
		this.updateClutterLevel();

        diffAndSetText(this._hudAirspeedElement, airspeed.toFixed(0));
		
		if (this.clutterLevel != 2) {
        diffAndSetText(this._hudVerticalSpeedElement, verticalSpeed.toFixed(0));
		}
        else {
		diffAndSetText(this._hudVerticalSpeedElement, " ");
		}	

        let altitude;
        if (SimVar.GetSimVarValue("L:XMLVAR_AS04F_HUD_Alt_Selector", "number") == 1) {
            altitude = SimVar.GetSimVarValue("RADIO HEIGHT", "feet");
            if (altitude > 5000) {
                altitude = Simplane.getAltitude();
                diffAndSetText(this._hudAltitudeModeElement, "B");
                diffAndSetAttribute(this._hudAltitudeModeElement, "state", "blink");
            }
            else {
                diffAndSetText(this._hudAltitudeModeElement, "R");
                diffAndSetAttribute(this._hudAltitudeModeElement, "state", "");
            }
        }
        else {
            altitude = Simplane.getAltitude();
            diffAndSetText(this._hudAltitudeModeElement, "");
        }
        let formatedAltitude = Avionics.Utils.computeThousandsAltitude(altitude);
		let smallAltitude = (Math.abs(altitude) % 1000);
		diffAndSetText(this._hudAltitudeLargeElement, formatedAltitude);
		
		smallAltitude = Math.round(smallAltitude / 10) * 10;
		
		if (smallAltitude > 990) { smallAltitude = 990; }
		if (smallAltitude < 10) { smallAltitude = 0; }			
		
        diffAndSetText(this._hudAltitudeSmallElement, smallAltitude.toFixed(0).padStart(3, "0"));

		diffAndSetAttribute(this._needlealtitude, "transform", "rotate(" + (Math.abs(altitude) % 1000 * 0.36).toFixed(0) + " 895 325)");
		diffAndSetAttribute(this._needleairspeed, "transform", "rotate(" + (Math.abs(airspeed) % 1000 * 3.6).toFixed(0) + " 140 325)");

        let heading = SimVar.GetSimVarValue("L:AircraftHeadingReference", "degrees");
		let gtrackdifference = SimVar.GetSimVarValue("L:groundTrackDifference", "degrees");
		let tacandifference = SimVar.GetSimVarValue("L:tacanBearing", "number");
		let tacandetected = SimVar.GetSimVarValue("L:tacanSignalDetected", "boolean");		
        diffAndSetAttribute(this._headingElement, "transform", "translate(" + (-heading * 12.5) + ", 0)");
        diffAndSetAttribute(this._hudHeadingGroundTrack, "transform", "translate(" + (gtrackdifference * 12.5) + ", 0)");
		diffAndSetAttribute(this._hudTacanDiamond, "transform", "translate(" + (tacandifference * 12.5) + ", 0)");	
	
        diffAndSetAttribute(this._headingClipElement, "transform", "translate(" + (heading * 12.5) + ", 0)");
        diffAndSetText(this._hudHeadingElement, (Math.abs(heading)).toFixed(0).padStart(3, "0"));
	
		let radalt = SimVar.GetSimVarValue("RADIO HEIGHT", "feet");		
		let alowWarning = SimVar.GetSimVarValue("L:ALOW", "boolean");
		let alowTimer = SimVar.GetSimVarValue("L:ALOWTimer", "number");
		let alowTimer2 = SimVar.GetSimVarValue("L:ALOW2Timer", "number");
		let radaltvisible = SimVar.GetSimVarValue("L:IsRadaltVisible", "boolean");
        if (radaltvisible == true){		
		diffAndSetText(this._radioaltitude, "R "+ (Math.abs(radalt)).toFixed(0)); 
        }
        else {
			if ((radalt > 11000) || (alowWarning == true) || ((alowTimer2 > 0) && (alowTimer2 < 60)) || ((alowTimer > 0) && (alowTimer < 60))) {		
			diffAndSetText(this._radioaltitude, " "); 
			}		
			else { diffAndSetText(this._radioaltitude, "R ---- ");
			}
        }

	
        let commandedAirspeed = SimVar.GetSimVarValue("AUTOPILOT AIRSPEED HOLD VAR", "knots");
        let commandedMach = SimVar.GetSimVarValue("AUTOPILOT MACH HOLD VAR", "number");		
        let commandedAltitude = SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK VAR", "feet");
        let commandedHeading = SimVar.GetSimVarValue("AUTOPILOT HEADING LOCK DIR", "degrees");	 
		
		let isATEngaged = SimVar.GetSimVarValue("AUTOPILOT THROTTLE ARM", "boolean");	 
		let isAPEngaged = SimVar.GetSimVarValue("AUTOPILOT MASTER", "boolean");
		let isHeadingHoldEngaged = SimVar.GetSimVarValue("AUTOPILOT HEADING LOCK", "boolean");		
		let isAirspeedHoldEngaged = SimVar.GetSimVarValue("AUTOPILOT AIRSPEED HOLD", "boolean");
		let isMachHoldEngaged = SimVar.GetSimVarValue("AUTOPILOT MACH HOLD", "boolean");		
		let isAltitudeHoldEngaged = SimVar.GetSimVarValue("AUTOPILOT ALTITUDE LOCK", "boolean");
		let isNavLockEngaged = SimVar.GetSimVarValue("AUTOPILOT NAV1 LOCK", "boolean");
		let isApproachLockEngaged = SimVar.GetSimVarValue("AUTOPILOT APPROACH HOLD", "boolean");
		let isNavGPSLockEngaged = SimVar.GetSimVarValue("GPS DRIVES NAV1", "boolean");
		let isAPAltMode = SimVar.GetSimVarValue("L:AP_AltMode", "boolean");
		let refuelDoorPosition = SimVar.GetSimVarValue("L:IFR_doors_status", "number");
		let fuelDumpSwitch = SimVar.GetSimVarValue("FUEL DUMP SWITCH", "boolean");
		let inFlightRefuel = SimVar.GetSimVarValue("L:InFlightRefuel", "boolean");
		let fuelQuantity = SimVar.GetSimVarValue("FUEL TOTAL QUANTITY WEIGHT", "pounds") / 1000;


		diffAndSetText(this._hudHeadingCMD, " ");
		if (isHeadingHoldEngaged && isAPEngaged) { diffAndSetText(this._hudHeadingCMD, "CMD " + (Math.abs(commandedHeading)).toFixed(0).padStart(3, "0")); }
		if (isAPEngaged && isNavLockEngaged ) { diffAndSetText(this._hudHeadingCMD, "CMD VOR"); }
		if (isAPEngaged && isNavGPSLockEngaged && isNavLockEngaged) { diffAndSetText(this._hudHeadingCMD, "CMD RTE"); }
		if (isAPEngaged && isApproachLockEngaged) { diffAndSetText(this._hudHeadingCMD, "CMD APP"); }

		diffAndSetText(this._hudAltitudeCMD, " ");
		if (isAltitudeHoldEngaged && isAPEngaged) { diffAndSetText(this._hudAltitudeCMD, "CMD " + (Math.abs(commandedAltitude)).toFixed(0).padStart(3, "0")); }
		if (isAltitudeHoldEngaged && isAPEngaged && isAPAltMode) { diffAndSetText(this._hudAltitudeCMD, "CMD ALT" ); }

		diffAndSetText(this._hudAirspeedCMD, " ");
		if (isAirspeedHoldEngaged && isATEngaged) {	diffAndSetText(this._hudAirspeedCMD, "CMD " + (Math.abs(commandedAirspeed)).toFixed(0) + " I");  }
		if (isMachHoldEngaged && isATEngaged) {	diffAndSetText(this._hudAirspeedCMD, "CMD " + (Math.abs(commandedMach)).toFixed(2) + " M");  }

		diffAndSetText(this._fuelq, "");
		if ((fuelDumpSwitch == true) || ((refuelDoorPosition) > 95)) { diffAndSetText(this._fuelq, fuelQuantity.toFixed(1)); } 	 
		diffAndSetText(this._refuel, "");
		if ((inFlightRefuel == false) && ((refuelDoorPosition) > 95)) { diffAndSetText(this._refuel, "RDY"); }
		diffAndSetText(this._fdump, "");
		if (fuelDumpSwitch == true) { diffAndSetText(this._fdump, "DUMP IN PROGRESS"); }

        let aoa = SimVar.GetSimVarValue("L:AOADegrees", "number");		
        let aoaUnits = SimVar.GetSimVarValue("L:AOAUnits", "number");
        let mach = Simplane.getMachSpeed();
        let pitch = Simplane.getPitch();
        let g = Simplane.getGForce();
		let gs = Simplane.getGroundSpeed();
		let tas = SimVar.GetSimVarValue("AIRSPEED TRUE", "knots");
		let speedMode = SimVar.GetSimVarValue("L:HMDSpeed", "boolean");
        this._hudPeakGValue = Utils.Clamp(this._hudPeakGValue, g, 99);
		
		if (speedMode) {
		 diffAndSetText(this._hudGSLabel, "TAS");
		 diffAndSetText(this._hudGroundSpeedElement, tas.toFixed(0));
		 }
		 else { 
		 diffAndSetText(this._hudGSLabel, "GS");
		 diffAndSetText(this._hudGroundSpeedElement, gs.toFixed(0));
		 } 	 
	

        diffAndSetText(this._hudCurrentGElement, g.toFixed(1));
        diffAndSetText(this._hudPeakGElement, this._hudPeakGValue.toFixed(1));
        diffAndSetText(this._hudAOAElement, aoa.toFixed(1));
        diffAndSetText(this._hudMachElement, mach.toFixed(2));
		
		let clockhours = SimVar.GetSimVarValue("L:ClockHours", "Number");
		let clockminutes = SimVar.GetSimVarValue("L:ClockMinutes", "Number");
		let clockseconds = SimVar.GetSimVarValue("L:ClockSeconds", "Number");
		let swsecondsrunning = SimVar.GetSimVarValue("L:TotalRunning", "seconds");
		let swclockhours = SimVar.GetSimVarValue("L:StopwatchHours", "Number");
		let swclockminutes = SimVar.GetSimVarValue("L:StopwatchMinutes", "Number");
		let swclockseconds = SimVar.GetSimVarValue("L:StopwatchSeconds", "Number");
		let clockmode = SimVar.GetSimVarValue("L:MenuTime", "Number");
		if (clockmode == 0) { diffAndSetText(this._clock, (clockhours).toFixed(0).padStart(2, "0")+":"+(clockminutes).toFixed(0).padStart(2, "0")+":"+(clockseconds).toFixed(0).padStart(2, "0")+"Z"); }   
		if (clockmode > 0) { diffAndSetText(this._clock, (clockhours).toFixed(0).padStart(2, "0")+":"+(clockminutes).toFixed(0).padStart(2, "0")+":"+(clockseconds).toFixed(0).padStart(2, "0") ); } 
		
		if (swsecondsrunning > 0) {
		diffAndSetText(this._stopwatch, (swclockhours).toFixed(0).padStart(2, "0")+":"+(swclockminutes).toFixed(0).padStart(2, "0")+":"+(swclockseconds).toFixed(0).padStart(2, "0") );
		}
		else {
		diffAndSetText(this._stopwatch, "");
		}

		let ttshours = SimVar.GetSimVarValue("L:TimeToSteerHours", "Number");
		let ttsminutes = SimVar.GetSimVarValue("L:TimeToSteerMinutes", "Number");
		let ttsseconds = SimVar.GetSimVarValue("L:TimeToSteerSeconds", "Number");
		diffAndSetText(this._timetosteer, (ttshours).toFixed(0).padStart(2, "0")+":"+(ttsminutes).toFixed(0).padStart(2, "0")+":"+(ttsseconds).toFixed(0).padStart(2, "0"));	
	
        this.updateLeftInfosVisibility();
        this.updateSteeringInfos(heading);
		this.updateCselIndicator(heading);
        this.updateSituation(pitch, aoa, bank);
		this.updateILS();
		this.updateautopilot();
		let brakePosition = SimVar.GetSimVarValue("SPOILERS LEFT POSITION", "percent");
        let acceleration = SimVar.GetSimVarValue("ACCELERATION BODY Z", "feet per second squared");
        diffAndSetAttribute(this._energyCaret, "transform", "translate(0, " + (-acceleration * 4).toFixed(1) + ")");        
		diffAndSetAttribute(this._speedBrake, "visibility", ((this.clutterLevel == 0) && (brakePosition >= 1)) ? "visible" : "hidden");
		diffAndSetAttribute(this._speedBrakep1, "visibility", ((this.clutterLevel == 0) && (brakePosition >= 10)) ? "visible" : "hidden");
		diffAndSetAttribute(this._speedBrakep2, "visibility", ((this.clutterLevel == 0) && (brakePosition >= 30)) ? "visible" : "hidden");
		diffAndSetAttribute(this._speedBrakep3, "visibility", ((this.clutterLevel == 0) && (brakePosition >= 50)) ? "visible" : "hidden");
		diffAndSetAttribute(this._speedBrakep4, "visibility", ((this.clutterLevel == 0) && (brakePosition >= 70)) ? "visible" : "hidden");
		diffAndSetAttribute(this._speedBrakep5, "visibility", ((this.clutterLevel == 0) && (brakePosition >= 90)) ? "visible" : "hidden");		
        this.updateMiscWarnings();
		this.updateStovl();
	
        this._hudAirspeedElement.style.top = "280px";	
		this._hudAirspeedElement.style.left = "50px";
		this._hudAltitudeElement.style.top = "280px";
		this._hudAltitudeElement.style.left = "750px";

		this._hudVerticalSpeedElement.style.top = "420px";
		this._hudVerticalSpeedElement.style.left = "830px";
		this._radioaltitude.style.top = "460px";
		this._radioaltitude.style.left = "750px";
		
		this._hudleftpanel.style.left = "0px"
		this._hudleftpanel.style.top = "450px"

		this._hudrightpanel.style.left = "645px"
		this._hudrightpanel.style.top = "660px"
    }
	
	updateStovl() {
	let nozzleAngle = SimVar.GetSimVarValue("L:NozzleAngle", "number");
	let enginen2rpm = SimVar.GetSimVarValue("TURB ENG1 N2", "percent");
	
	if (nozzleAngle > 0) {
	diffAndSetAttribute(this._stovlplane, "visibility", "visible");	
	diffAndSetAttribute(this._stovlarrow1, "visibility", "visible");	
	diffAndSetAttribute(this._stovlarrow2, "visibility", "visible");
    diffAndSetText(this._stovlrpmbig, (enginen2rpm).toFixed(0));
    diffAndSetText(this._stovlrpmsmall1, (enginen2rpm).toFixed(0));
    diffAndSetText(this._stovlrpmsmall2, (enginen2rpm).toFixed(0));	
	}
	else {
	diffAndSetAttribute(this._stovlplane, "visibility", "hidden");	
	diffAndSetAttribute(this._stovlarrow1, "visibility", "hidden");	
	diffAndSetAttribute(this._stovlarrow2, "visibility", "hidden");	
	diffAndSetText(this._stovlrpmbig, " ");
    diffAndSetText(this._stovlrpmsmall1, " ");
    diffAndSetText(this._stovlrpmsmall2, " ");	
	}
	diffAndSetAttribute(this._stovlarrow1, "transform", "rotate(" + (nozzleAngle).toFixed(0) + " 150 820)");
	diffAndSetAttribute(this._stovlarrow2, "transform", "rotate(" + (nozzleAngle).toFixed(0) + " 220 820)");

	}
	
    updateMiscWarnings() {
		let fuel = SimVar.GetSimVarValue("L:FuelWarning", "number");
		let bingo = SimVar.GetSimVarValue("L:BingoWarning", "number");
		let decel = SimVar.GetSimVarValue("L:DECELL", "boolean");
		let checkGear = SimVar.GetSimVarValue("L:CHECK_GEAR_WARNING", "boolean");
		let pullUp = SimVar.GetSimVarValue("L:PULL_UP_WARNING", "boolean");
		let icawswarning = SimVar.GetSimVarValue("L:ICAWS_HUD", "number");	
		let stall = SimVar.GetSimVarValue("Stall Warning", "boolean");
		let alow = SimVar.GetSimVarValue("L:AltitudeAlert", "boolean");
		let recovery = SimVar.GetSimVarValue("L:SwitchAutoRecovery", "boolean");	
		let masterarm = SimVar.GetSimVarValue("L:MasterArmSwitch", "number");
		let gcas = SimVar.GetSimVarValue("L:GCASActive", "boolean");		
		let stickcontrol = SimVar.GetSimVarValue("L:AutopilotWarningSC", "number");	
		let brakePercent = SimVar.GetSimVarValue("BRAKE LEFT POSITION EX1", "position") * 50 + SimVar.GetSimVarValue("BRAKE RIGHT POSITION EX1", "position") * 50 ;
		let isRadiating = SimVar.GetSimVarValue("L:RadarIsRadiating", "boolean");
		let pullupchevronshift = SimVar.GetSimVarValue("L:PullUpChevronShift", "number");	
		
        diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, SimVar.GetSimVarValue("L:F35_Alert_Triggered", "boolean") ? "block" : "none");

		if ( stickcontrol > 0 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "STICK CONTROL");
		}

		if ( icawswarning == 1 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "FIRE ENG");
		}

		if ( icawswarning == 4 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "FUEL CRITICAL");
		}
		
		if ( icawswarning == 5 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "ENGINE");
		}
		
		if ( icawswarning == 6 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "BINGO");
		}

		if ( icawswarning == 7 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "GEN FAIL ALL");
		}

		if ( icawswarning == 8 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "ENG LIMITS");
		}

		if ( icawswarning == 9 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "WEAPON DOOR");
		}

		if ( icawswarning == 10 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "REFUEL DOOR");
		}

		if ( icawswarning == 10 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "BATT LO 270V");
		}

		if ( icawswarning == 11 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "REFUEL DOOR");
		}

		if ( icawswarning == 14 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "ENGINE RPM LOW");
		}

		if ( icawswarning == 15 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "LADDER UNLOCKED");
		}
		
		if ( icawswarning == 16 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "ENGINE FAIL");
		}
		
		if ( icawswarning == 18 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "BATT LO 28V");
		}
		
		if ( icawswarning == 20 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "WINGS FOLDED");
		}
		
		if ( icawswarning == 21 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "SEAT UNARMED");
		}
		
		if ( icawswarning == 22 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "PARKING BRAKE");
		}
		
		if ( icawswarning == 23 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "CANOPY OPEN");
		}
		
		if ( icawswarning == 24 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "GEN FAIL 1 AND 2");
		}
		
		if ( icawswarning == 25 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "GEN FAIL 1");
		}
		
		if ( icawswarning == 26 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "GEN FAIL 2");
		}
		
		if ( icawswarning == 27 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "CABIN PRESS");
		}
		
		if ( icawswarning == 29 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "FCS DEGRD");
		}
		
		if ( icawswarning == 30 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "MFSOV OPEN");
		}
		
		if ( icawswarning == 37 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "OVERSPEED AAR");
		}
		
		if ( icawswarning == 38 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "OVERSPEED GEAR");
		}
		
		if ( icawswarning == 39 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "OVERSPEED");
		}

		if ( icawswarning == 40 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "OVERSPEED HOOK");
		}

		if ( icawswarning == 41 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "AIR DATA DEGD");
		}

		if ( icawswarning == 42 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "FUEL DUMP OPEN");
		}

		if ( icawswarning == 43 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "GEAR FAIL");
		}		

		if ( icawswarning == 48 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "GEN FAIL 3");
		}

		if ( icawswarning == 51 ) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "ENG ICE DETECTED");
		}		
		

		if (decel) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "DECEL");
		}		
		
		if (checkGear) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "CHECK GEAR");
		}

		
		
		if (alow) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "ALTITUDE");
		}		
		
		if (pullUp) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");				
		diffAndSetAttribute(this._pullupchevronlt, "visibility", "visible");
		diffAndSetAttribute(this._pullupchevronrt, "visibility", "visible");
		diffAndSetAttribute(this._pullupchevronlt, "transform", "translate(" + (-pullupchevronshift).toFixed(1) + ",0 )");
		diffAndSetAttribute(this._pullupchevronrt, "transform", "translate(" + (pullupchevronshift).toFixed(1) + ",0 )");
			if ((pullupchevronshift) < 50 )
			{ diffAndSetAttribute(this._pulluparrow, "visibility", "visible"); diffAndSetText(this._pullupWarningElement, "FLY UP"); }
			else { diffAndSetAttribute(this._pulluparrow, "visibility", "hidden"); diffAndSetText(this._pullupWarningElement, ""); }
		}
		else {
		 diffAndSetText(this._pullupWarningElement, "");
		diffAndSetAttribute(this._pullupchevronlt, "visibility", "hidden");
		diffAndSetAttribute(this._pullupchevronrt, "visibility", "hidden");
		diffAndSetAttribute(this._pullupWarningElement, "visibility", "hidden");
		diffAndSetAttribute(this._pulluparrow, "visibility", "hidden");
		}

		if (gcas) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "GCAS RECOVERY");
		}

		if (recovery) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "AUTO RECOVERY");
		}
		
		if (stall) {
		diffAndSetStyle(this._altitudeWarningElement, StyleProperty.display, "block");
		diffAndSetText(this._altitudeWarningElement, "STALL");
		}
		
		if (masterarm > 0) {
		diffAndSetStyle(this._armsafe, StyleProperty.display, "block");
		diffAndSetText(this._armsafe, "ARM");
		}
		else {
		diffAndSetStyle(this._armsafe, StyleProperty.display, "block");
		diffAndSetText(this._armsafe, " ");
		}


        if (SimVar.GetSimVarValue("L:NWSMode", "numer") == 0 ) {
			diffAndSetText(this._nws, " ");
        }

        if (SimVar.GetSimVarValue("L:NWSMode", "numer") == 1 ) {
			diffAndSetText(this._nws, "NWS");
        }

        if (SimVar.GetSimVarValue("L:NWSMode", "numer") == 2 ) {
			diffAndSetText(this._nws, "NWS HI");
        }

		
		if (brakePercent < 2) {
			diffAndSetText(this._brake, "");			
		}
		
		else {
			diffAndSetText(this._brake, "BRK "+brakePercent.toFixed(1)+"%");		
		}

		if ( SimVar.GetSimVarValue("BRAKE PARKING POSITION", "boolean") ) {
			diffAndSetText(this._brake, "PARK BK");			
		}		
		

        if ( ! SimVar.GetSimVarValue("SIM ON GROUND", "boolean") ) {
			diffAndSetText(this._nws, " ");
			diffAndSetText(this._brake, " ");
        }		
		
    }

    updateLeftInfosVisibility() {
        let visibility = "visible";
        if (this.clutterLevel != 0 || this._gearPosition >= 50)
            visibility = "hidden";
		diffAndSetStyle(this._hudGSLabel, StyleProperty.visibility, visibility);
		diffAndSetStyle(this._hudGroundSpeedElement, StyleProperty.visibility, visibility);		
        diffAndSetStyle(this._hudMachLabel, StyleProperty.visibility, visibility);
        diffAndSetStyle(this._hudMachElement, StyleProperty.visibility, visibility);
        diffAndSetStyle(this._hudCurrentGLabel, StyleProperty.visibility, visibility);
        diffAndSetStyle(this._hudCurrentGElement, StyleProperty.visibility, visibility);
        diffAndSetStyle(this._hudPeakGElement, StyleProperty.visibility, visibility);
        diffAndSetStyle(this._hudPeakGElement, StyleProperty.visibility, (this._hudPeakGValue < 4) ? "hidden" : visibility);
    }

    updateHudWithGearPosition() {
        let gearPosition = Simplane.getGearPosition();
		let declutterStatus = SimVar.GetSimVarValue("L:HUDDeclutter", "number");
        if (gearPosition != this._gearPosition) {
            this._gearPosition = gearPosition;
            if (this._gearPosition < 50) {
                diffAndSetAttribute(this._horizonZeroElement, "d", "M0 420 L450 420 M550 420 L1000 420");
                diffAndSetAttribute(this._horizonZeroElement, "clip-path", "");
                diffAndSetAttribute(this._waterLineElement, "visibility", "hidden");
                diffAndSetAttribute(this._eBracketElement, "visibility", "hidden");
				diffAndSetStyle(this._hudAirspeedElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetStyle(this._hudAltitudeLargeElement.parentElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetAttribute(this._dialsgraphics, "visibility", "hidden");				
            }
            else {
                diffAndSetAttribute(this._horizonZeroElement, "d", "M0 420 L450 420 M550 420 L1000 420");
                diffAndSetAttribute(this._horizonZeroElement, "clip-path", "");
                diffAndSetAttribute(this._waterLineElement, "visibility", "visible");
                diffAndSetAttribute(this._eBracketElement, "visibility", "visible");
				if (declutterStatus == 0) {
				diffAndSetStyle(this._hudAirspeedElement, StyleProperty.border, "none");
                diffAndSetStyle(this._hudAltitudeLargeElement.parentElement, StyleProperty.border, "none");
                diffAndSetAttribute(this._dialsgraphics, "visibility", "visible");
				}
				else {
				diffAndSetStyle(this._hudAirspeedElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetStyle(this._hudAltitudeLargeElement.parentElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetAttribute(this._dialsgraphics, "visibility", "hidden");
				}
            }
        }
    }

    updateClutterLevel() {
        let clutterLevel = SimVar.GetSimVarValue("L:HUDDeclutter", "number");
        if (clutterLevel != this.clutterLevel) {
            this.clutterLevel = clutterLevel;
			
            if (clutterLevel == 0) {
				diffAndSetAttribute(this._energyCaret, "visibility", "visible");
                diffAndSetAttribute(this._headingElement, "visibility", "visible");
                diffAndSetAttribute(this._headingCursorElement, "visibility", "visible");
				diffAndSetAttribute(this._hudHeadingGroundTrack, "visibility", "visible");
                diffAndSetAttribute(this._hudTacanDiamond, "visibility", "visible");
				diffAndSetAttribute(this._hudVerticalSpeedElement, "visibility", "visible");
				diffAndSetAttribute(this._headingSteeringBugElement, "visibility", "visible");
				
				if (this._gearPosition < 50) {
				diffAndSetStyle(this._hudAirspeedElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetStyle(this._hudAltitudeLargeElement.parentElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetAttribute(this._dialsgraphics, "visibility", "hidden");		
				}
				else {
				diffAndSetStyle(this._hudAirspeedElement, StyleProperty.border, "none");
                diffAndSetStyle(this._hudAltitudeLargeElement.parentElement, StyleProperty.border, "none");
                diffAndSetAttribute(this._dialsgraphics, "visibility", "visible");		
				}
            }

            if (clutterLevel == 1) {
                diffAndSetAttribute(this._energyCaret, "visibility", "hidden");
				diffAndSetAttribute(this._headingElement, "visibility", "hidden");
                diffAndSetAttribute(this._headingCursorElement, "visibility", "hidden");
				diffAndSetAttribute(this._hudHeadingGroundTrack, "visibility", "hidden");
                diffAndSetAttribute(this._hudTacanDiamond, "visibility", "hidden");
				diffAndSetAttribute(this._hudVerticalSpeedElement, "visibility", "hidden");
				diffAndSetStyle(this._hudAirspeedElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetStyle(this._hudAltitudeLargeElement.parentElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetAttribute(this._dialsgraphics, "visibility", "hidden");
				diffAndSetAttribute(this._headingSteeringBugElement, "visibility", "visible");	
            }
			
			if (clutterLevel == 2) {
                diffAndSetAttribute(this._energyCaret, "visibility", "hidden");
				diffAndSetAttribute(this._headingElement, "visibility", "hidden");
                diffAndSetAttribute(this._headingCursorElement, "visibility", "hidden");
				diffAndSetAttribute(this._hudHeadingGroundTrack, "visibility", "hidden");
                diffAndSetAttribute(this._hudTacanDiamond, "visibility", "hidden");
				diffAndSetAttribute(this._hudVerticalSpeedElement, "visibility", "hidden");
                diffAndSetStyle(this._hudAirspeedElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetStyle(this._hudAltitudeLargeElement.parentElement, StyleProperty.border, "4px solid #00FF00");
                diffAndSetAttribute(this._dialsgraphics, "visibility", "hidden");								
            }	

        }
    }



    updateSituation(pitch, aoa, bank) {
        let vBodyX = SimVar.GetSimVarValue("VELOCITY BODY X", "feet per second");
        let vBodyY = SimVar.GetSimVarValue("VELOCITY BODY Y", "feet per second");
        let vBodyZ = SimVar.GetSimVarValue("VELOCITY BODY Z", "feet per second");
		let sideSlip = 0 - SimVar.GetSimVarValue("INCIDENCE BETA", "degrees"); 
		let aoaReference = SimVar.GetSimVarValue("L:HUDAOAReference", "number");
        let vVectorX = (vBodyX != 0) ? Math.atan(vBodyX / vBodyZ) * Avionics.Utils.RAD2DEG : 0;
        let vVectorY = (vBodyY != 0) ? Math.atan(vBodyY / vBodyZ) * Avionics.Utils.RAD2DEG : 0;
		let glideslopeDeviation = SimVar.GetSimVarValue("NAV GSI:1", "number"); 
		let locatorDeviation = SimVar.GetSimVarValue("NAV CDI:1", "number");
        let blink = false;
        if (SimVar.GetSimVarValue("SIM ON GROUND", "boolean") && Simplane.getGroundSpeed() < 50) {
            vVectorX = 0;
            vVectorY = pitch;
        }
        if (Simplane.getIndicatedSpeed() < 50) {
            vVectorX = 0;
            vVectorY = pitch;
        }		
		
        else {
            let minY = this.vVectorMinY + this.projectionOffset / F35_DDI_HUD.YPERDEGREE;
            let maxY = this.vVectorMaxY + this.projectionOffset / F35_DDI_HUD.YPERDEGREE;
            blink = (vVectorX < this.vVectorMinX || vVectorX > this.vVectorMaxX || vVectorY < minY || vVectorY > maxY);
            vVectorX = Utils.Clamp(vVectorX, this.vVectorMinX, this.vVectorMaxX);
            vVectorY = Utils.Clamp(vVectorY, minY, maxY);
        }
        diffAndSetAttribute(this._horizonContainerElement, "transform", "rotate(" + bank.toFixed(1) + " 500 " + (500 + this.projectionOffset + this.rotationOffset).toFixed(1) + ")");
		diffAndSetAttribute(this._pulluparrow, "transform", "rotate(" + bank.toFixed(1) + " 500 " + (500) + ")");
        diffAndSetAttribute(this._waterLineElement, "transform", "translate(0, " + (this.projectionOffset) + ")");
        if (this._cagedVelocityVector) {
            diffAndSetAttribute(this._velocityElement, "transform", "translate(0," + (-vVectorY * F35_DDI_HUD.YPERDEGREE + this.projectionOffset).toFixed(1) + ")");
            diffAndSetAttribute(this._horizonElement, "transform", "translate(0, " + (-pitch * F35_DDI_HUD.YPERDEGREE + this.projectionOffset).toFixed(1) + ")");
            diffAndSetAttribute(this._horizonClipElement, "transform", "translate(0, " + (pitch * F35_DDI_HUD.YPERDEGREE + -this.projectionOffset).toFixed(1) + ")");
			diffAndSetAttribute(this._ilslocatorbar, "transform", "translate( 0, " + (-vVectorY * F35_DDI_HUD.YPERDEGREE + this.projectionOffset).toFixed(1) + ")");
			diffAndSetAttribute(this._ilsglideslopebar, "transform","translate( 0, " + (-vVectorY * F35_DDI_HUD.YPERDEGREE + this.projectionOffset + glideslopeDeviation).toFixed(1) + ")");		
            if (Math.abs(vVectorX) > 2) {
                diffAndSetAttribute(this._ghostVelocityElement, "transform", "translate(" + (vVectorX * F35_DDI_HUD.YPERDEGREE).toFixed(0) + ", " + (-vVectorY * F35_DDI_HUD.YPERDEGREE + this.projectionOffset).toFixed(1) + ")");
                diffAndSetAttribute(this._ghostVelocityElement, "visibility", "visible");
				diffAndSetAttribute(this._climbDiveSymbol, "visibility", "visible");
				diffAndSetAttribute(this._velocitySymbol, "visibility", "hidden");
            }
            else {
                diffAndSetAttribute(this._ghostVelocityElement, "visibility", "hidden");
				diffAndSetAttribute(this._climbDiveSymbol, "visibility", "visible");
				diffAndSetAttribute(this._velocitySymbol, "visibility", "hidden");
            }
            diffAndSetAttribute(this._ghostVelocityElement, "state", (blink) ? "blink" : "");
            diffAndSetAttribute(this._velocityElement, "state", "");
        }
        else {
            diffAndSetAttribute(this._velocityElement, "transform", "translate(" + (vVectorX * F35_DDI_HUD.YPERDEGREE).toFixed(0) + ", " + (-vVectorY * F35_DDI_HUD.YPERDEGREE + this.projectionOffset).toFixed(1) + ")");
            diffAndSetAttribute(this._horizonElement, "transform", "translate(" + (vVectorX * F35_DDI_HUD.YPERDEGREE).toFixed(0) + ", " + (-pitch * F35_DDI_HUD.YPERDEGREE + this.projectionOffset).toFixed(1) + ")");
            diffAndSetAttribute(this._horizonClipElement, "transform", "translate(" + (vVectorX * F35_DDI_HUD.YPERDEGREE).toFixed(0) + ", " + (pitch * F35_DDI_HUD.YPERDEGREE + -this.projectionOffset).toFixed(1) + ")");
            diffAndSetAttribute(this._velocityElement, "state", (blink) ? "blink" : "");
            diffAndSetAttribute(this._ghostVelocityElement, "visibility", "hidden");
			diffAndSetAttribute(this._climbDiveSymbol, "visibility", "hidden");
			diffAndSetAttribute(this._velocitySymbol, "visibility", "visible");
			diffAndSetAttribute(this._ilslocatorbar, "transform", "translate(" + (vVectorX * F35_DDI_HUD.YPERDEGREE + locatorDeviation).toFixed(0) + ", " + (-vVectorY * F35_DDI_HUD.YPERDEGREE + this.projectionOffset).toFixed(1) + ")");
			diffAndSetAttribute(this._ilsglideslopebar, "transform","translate(" + (vVectorX * F35_DDI_HUD.YPERDEGREE).toFixed(0) + ", " + (-vVectorY * F35_DDI_HUD.YPERDEGREE + this.projectionOffset + glideslopeDeviation).toFixed(1) + ")");			
        }
        let aoaDiff = aoa - aoaReference; // ON SPEED at 17 units, 7.2 degrees for F-35C, lower for A and B depending on model.xml

        diffAndSetAttribute(this._eBracketElement, "transform", "translate(" + (vVectorX * F35_DDI_HUD.YPERDEGREE).toFixed(0) + ", " + ((-vVectorY + aoaDiff) * F35_DDI_HUD.YPERDEGREE + this.projectionOffset) + ")");
        if (Math.abs(bank) > 135) {
            diffAndSetAttribute(this._bankCursorElement, "transform", "rotate(" + (Math.sign(bank) * 135) + " 500 500)");
            diffAndSetAttribute(this._sideslipCursorElement, "transform", "rotate(" + (Math.sign(bank) * 135 + sideSlip) + " 500 500)");
			diffAndSetAttribute(this._bankCursorElement, "state", "blink");
        }
        else {
            diffAndSetAttribute(this._bankCursorElement, "transform", "rotate(" + (bank).toFixed(1) + " 500 500)");
            diffAndSetAttribute(this._sideslipCursorElement, "transform", "rotate(" + (bank + sideSlip).toFixed(1) + " 500 500)");			
            diffAndSetAttribute(this._bankCursorElement, "state", "");
        }
		
		if (Math.abs(bank) > 25) {
		diffAndSetAttribute(this._bankElementExt, "visibility", "visible");
		}
 		else {
		diffAndSetAttribute(this._bankElementExt, "visibility", "hidden");
		}

		if (Math.abs(bank) > 55) {
		diffAndSetAttribute(this._bankElementRA, "visibility", "visible");
		}
 		else {
		diffAndSetAttribute(this._bankElementRA, "visibility", "hidden");
		}
 
		let targetValid = SimVar.GetSimVarValue("L:TargetValid", "boolean");	 
		let targetAzimuth = SimVar.GetSimVarValue("L:TargetAzimuth", "degree");	 
		let targetElevation = SimVar.GetSimVarValue("L:TargetElevation", "degree");	 

		diffAndSetAttribute(this._targetSmall, "transform", "rotate(" + bank.toFixed(1) + " 500 " + (500 + this.projectionOffset) + ")");			
		diffAndSetAttribute(this._targetSmall, "transform", "translate(" + (targetAzimuth * F35_DDI_HUD.YPERDEGREE).toFixed(0) + ", " + ((-pitch - targetElevation + 8) * F35_DDI_HUD.YPERDEGREE + this.projectionOffset).toFixed(1) + ")");
		diffAndSetAttribute(this._targetSmall, "visibility", "hidden");
    }
	
// STEERING TRANSLATION	
    computeSteeringTranslation(planeHeading, steeringBearing) {
        let steeringError = Avionics.Utils.diffAngle(planeHeading, steeringBearing);
        let translationBase = 0;
        if (Math.abs(steeringError) <= 5) {
            translationBase = steeringError;
        }
        else if (Math.abs(steeringError) > 30) {
            translationBase = 15 * Math.sign(steeringError);
        }
        else {
            translationBase = 0.4 * steeringError + (Math.sign(steeringError) * 3);
        }
        return translationBase * 12.5;
    }

// CDI indicator	
	
    updateCselIndicator(planeHeading) {
	let steeringMode = SimVar.GetSimVarValue("L:CDIMode", "number");	
	
        if (SimVar.GetSimVarValue("L:MFD_EFIS_CDI", "boolean")) {
            let deviation;
            let obs;
			
            if (steeringMode == 1) {
            deviation = Utils.Clamp(SimVar.GetSimVarValue("GPS WP CROSS TRK", "nautical mile"), -2, 2) / 2 * 8;
            obs = SimVar.GetSimVarValue("GPS WP DESIRED TRACK", "degrees");
            }
            if (steeringMode == 2) {
            let cdi = SimVar.GetSimVarValue("NAV CDI:1", "number") / 127 * 10;
            deviation = Utils.Clamp(cdi, -8, 8);
			obs = SimVar.GetSimVarValue("NAV1 OBS", "degrees");
            }
            if (steeringMode == 3) {
            let cdi = SimVar.GetSimVarValue("TACAN STATION CDI:2", "number") / 127 * 10;
            deviation = Utils.Clamp(cdi, -8, 8);
            obs = SimVar.GetSimVarValue("NAV2 OBS", "degrees");
            }			
 
			if (deviation != null && obs != null) {
                diffAndSetAttribute(this._cselGroupElement, "visibility", "visible");
                diffAndSetAttribute(this._cselDotsLeftGroupElement, "visibility", (deviation < -1.25) ? "visible" : "hidden");
                diffAndSetAttribute(this._cselDotsRightGroupElement, "visibility", (deviation > 1.25) ? "visible" : "hidden");
                diffAndSetAttribute(this._cselArrowElement, "transform", "translate(" + Utils.mapValue(deviation, -8, 8, -100, 100) + ", 0)");
                diffAndSetAttribute(this._cselGroupElement, "transform", "translate(500,420) rotate(" + (obs - Simplane.getHeadingMagnetic()) + ")");
            }
            else {
                diffAndSetAttribute(this._cselGroupElement, "visibility", "hidden");
                diffAndSetAttribute(this._cselDotsLeftGroupElement, "visibility", "hidden");
                diffAndSetAttribute(this._cselDotsRightGroupElement, "visibility", "hidden");
            }
        }
        else {
            diffAndSetAttribute(this._cselGroupElement, "visibility", "hidden");
            diffAndSetAttribute(this._cselDotsLeftGroupElement, "visibility", "hidden");
            diffAndSetAttribute(this._cselDotsRightGroupElement, "visibility", "hidden");
        }
    }
	
// STEERING INFORMATION	
    updateSteeringInfos(planeHeading) {
        let steeringMode = SimVar.GetSimVarValue("L:NAVMode", "number");
		let isILS = SimVar.GetSimVarValue ("L:ILSReceiverAvailable","boolean")
        let visible = false;
		
		if (steeringMode == 0) {
		}

		if (steeringMode == 1) {
			let currentWaypoint = SimVar.GetSimVarValue("GPS FLIGHT PLAN WP INDEX", "number");
			let distance = SimVar.GetSimVarValue("GPS WP DISTANCE", "nmiles");
            let bearing = SimVar.GetSimVarValue("GPS WP BEARING", "degrees");
            diffAndSetAttribute(this._headingSteeringBugElement, "transform", "translate(" + fastToFixed(this.computeSteeringTranslation(planeHeading, bearing), 1) + ", 0)");
            diffAndSetText(this._hudSteeringDataElement, "WPT "+ fastToFixed(currentWaypoint, 0) + " " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );
            visible = true;
            diffAndSetText(this._hudCplModeElement, "CPL WYPT");				
		}

		if (steeringMode == 2) {
			let distance = SimVar.GetSimVarValue("L:navDistance", "number");
            let bearing = Avionics.Utils.clampAngle(SimVar.GetSimVarValue("NAV1 RADIAL", "degree") + 180);
			if (! isILS) {
	        diffAndSetAttribute(this._headingSteeringBugElement, "transform", "translate(" + fastToFixed(this.computeSteeringTranslation(planeHeading, bearing), 1) + ", 0)");
            diffAndSetText(this._hudSteeringDataElement, "VOR " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );		
			}
			else {
	        diffAndSetAttribute(this._headingSteeringBugElement, "transform", "translate(" + fastToFixed(this.computeSteeringTranslation(planeHeading, bearing), 1) + ", 0)");
            diffAndSetText(this._hudSteeringDataElement, "ILS " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );					
			}
	        visible = true;
            diffAndSetText(this._hudCplModeElement, "CPL VOR");	
		}

		if (steeringMode == 3) {
			let distance = SimVar.GetSimVarValue("L:navDistance", "number");
            let bearing = Avionics.Utils.clampAngle(SimVar.GetSimVarValue("TACAN STATION RADIAL:2", "degree") + 180);
			let tacanChannel = SimVar.GetSimVarValue("A:TACAN ACTIVE CHANNEL:2", "number");
			let tacanY = SimVar.GetSimVarValue("A:TACAN ACTIVE MODE:2", "boolean");
			if (! tacanY) {
	        diffAndSetAttribute(this._headingSteeringBugElement, "transform", "translate(" + fastToFixed(this.computeSteeringTranslation(planeHeading, bearing), 1) + ", 0)");
            diffAndSetText(this._hudSteeringDataElement, fastToFixed(tacanChannel, 0) + "X " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );		
			}
			else {
	        diffAndSetAttribute(this._headingSteeringBugElement, "transform", "translate(" + fastToFixed(this.computeSteeringTranslation(planeHeading, bearing), 1) + ", 0)");
            diffAndSetText(this._hudSteeringDataElement, fastToFixed(tacanChannel, 0) + "Y " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );				
			}
	        visible = true;
            diffAndSetText(this._hudCplModeElement, "CPL TCN");	
		}

        let isCoupled = SimVar.GetSimVarValue("L:F35_IS_STEERING_COUPLED", "boolean");
        if (isCoupled != this.isCoupled) {
            if (this.isCoupled) {
                this.coupledTimer = 10;
            }
            else {
                this.coupledTimer = -1;
            }
            this.isCoupled = isCoupled;
        }
        if (this.isCoupled || this.coupledTimer > 0) {
            diffAndSetStyle(this._hudCplModeElement, StyleProperty.visibility, "visible");
        }
        else {
            diffAndSetStyle(this._hudCplModeElement, StyleProperty.visibility, "hidden");
        }
        diffAndSetAttribute(this._hudCplModeElement, "state", (this.coupledTimer > 0) ? "blink" : "");
        diffAndSetStyle(this._hudSteeringDataElement, StyleProperty.visibility, ((this.clutterLevel != 2) && visible) ? "visible" : "hidden");
		diffAndSetStyle(this._timetosteer, StyleProperty.visibility, ((this.clutterLevel != 2) && visible) ? "visible" : "hidden");
        diffAndSetAttribute(this._headingSteeringBugElement, "visibility", ((this.clutterLevel != 2) && visible) ? "visible" : "hidden");
    }

    updateILS() {
		let navHasGlideslope = SimVar.GetSimVarValue ("L:ILSReceiverAvailable","boolean")
        let visibility = "hidden";
        if (navHasGlideslope)
            visibility = "visible";
        diffAndSetStyle(this._ilslocatorbar, StyleProperty.visibility, visibility);
        diffAndSetStyle(this._ilsglideslopebar, StyleProperty.visibility, visibility);
    }	

    updateautopilot() {
    }	
	
    updateProjection(_deltaTime) {
        this.projectionOffset = F35_DDI_HUD.PROJECTION_OFFSET;
		this.rotationOffset = F35_DDI_HUD.ROTATION_OFFSET;
    }
}
F35_DDI_HUD.YPERDEGREE = 48;
F35_DDI_HUD.PROJECTION_OFFSET = -200;
F35_DDI_HUD.ROTATION_OFFSET = -60;
customElements.define("f35-ddi-hud", F35_DDI_HUD);
//# sourceMappingURL=F35_DDI_HUD.js.map