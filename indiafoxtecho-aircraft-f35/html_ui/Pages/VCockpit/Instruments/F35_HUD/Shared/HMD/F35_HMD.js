class FA18_HMD extends BaseInstrument {
    constructor() {
        super(...arguments);
        this._hmdPeakGValue = 0;
        this.headingXSpacing = 150;
        this.clutterLevel = 0;
        this.brightnessMode = 0;
    }
    get templateID() { return "AS04F_HMD"; }
    connectedCallback() {
        super.connectedCallback();
        diffAndSetStyle(this, "display", "none");
        this._hmdAirspeedElement = this.getChildById("hmd-airspeed");
        this._hmdAltitudeElement = this.getChildById("hmd-altitude");
        this._hmdAltitudeLargeElement = this.getChildById("hmd-altitude-large");
        this._hmdAltitudeSmallElement = this.getChildById("hmd-altitude-small");
        this._hmdAltitudeModeElement = this.getChildById("hmd-altitude-mode");
        this._hmdNoRad = this.getChildById("hmd-norad");
		this._hmdMasterArm = this.getChildById("hmd-masterarm");
        this._hmdAOAElement = this.getChildById("hmd-aoa-value");
        this._hmdMachLabel = this.getChildById("hmd-mach-label");
        this._hmdMachElement = this.getChildById("hmd-mach-value");
        this._hmdAutoThrottleEngaged = this.getChildById("hmd-atc-engaged");        
        this._hudSteeringDataElement = this.getChildById("hmd-steering-data");		
		this._clock = this.getChildById("hmd-clock");
		this._timetosteer = this.getChildById("hmd-time-to-steer");
		this._hmdHeadingMarker = this.getChildById("hmd-heading-marker");
		
        ;
        this._headingElement = this.getChildById("hmd-heading-tape-group");
        this._headingClipElement = this.getChildById("hmd-heading-clip");
        if (this._headingElement) {
            const bottom = 300;
            for (let i = -2; i <= 38; i++) {
                let text = document.createElementNS(Avionics.SVG.NS, "text");
                let s = ((i + 36) % 36).toFixed(0);
                s = s.padStart(2, "0");
                diffAndSetText(text, s);
                diffAndSetAttribute(text, "x", (1000 + i * this.headingXSpacing).toFixed(0));
                diffAndSetAttribute(text, "y", (bottom - 30) + "");
                diffAndSetAttribute(text, "font-size", "40");
                diffAndSetAttribute(text, "text-anchor", "middle");
                diffAndSetAttribute(text, "fill", "#67ff37");
                diffAndSetAttribute(text, "clip-path", "url(#hmd-heading-clip)");
                this._headingElement.appendChild(text);
                let lineL = document.createElementNS(Avionics.SVG.NS, "line");
                diffAndSetAttribute(lineL, "x1", (1000 + i * this.headingXSpacing).toFixed(0));
                diffAndSetAttribute(lineL, "y1", (bottom - 20) + '');
                diffAndSetAttribute(lineL, "x2", (1000 + i * this.headingXSpacing).toFixed(0));
                diffAndSetAttribute(lineL, "y2", (bottom) + '');
                diffAndSetAttribute(lineL, "stroke", "#67ff37");
                diffAndSetAttribute(lineL, "stroke-width", "3");
                diffAndSetAttribute(lineL, "clip-path", "url(#hmd-heading-clip)");
                this._headingElement.appendChild(lineL);
                let lineS = document.createElementNS(Avionics.SVG.NS, "line");
                diffAndSetAttribute(lineS, "x1", (925 + i * this.headingXSpacing).toFixed(0));
                diffAndSetAttribute(lineS, "y1", (bottom - 11) + '');
                diffAndSetAttribute(lineS, "x2", (925 + i * this.headingXSpacing).toFixed(0));
                diffAndSetAttribute(lineS, "y2", (bottom) + '');
                diffAndSetAttribute(lineS, "stroke", "#67ff37");
                diffAndSetAttribute(lineS, "stroke-width", "3");
                diffAndSetAttribute(lineS, "clip-path", "url(#hmd-heading-clip)");
                this._headingElement.appendChild(lineS);
            }
        }        
        this.brightnessMode = SimVar.GetSimVarValue("L:XMLVAR_AS04F_HMD_BrightnessMode", "number");
        this.onBrightnessChanged();
    }
    Init() {
        super.Init();
    }

    onBrightnessChanged() {
        this.brightnessKnobValue = Utils.Clamp(SimVar.GetSimVarValue("L:AS04F_HELMET_MOUNTED_DISPLAY_BRIGHTNESS", "number"), 0, 1);
    }
    updateBrightness() {
        this.brightnessSetting = Utils.Clamp(SimVar.GetSimVarValue("L:AS04F_HELMET_MOUNTED_DISPLAY_BRIGHTNESS", "number"), 0, 1);
		diffAndSetStyle(this, "opacity", this.brightnessSetting + '');
    }
    Update() {
		this.clutterLevel = SimVar.GetSimVarValue("L:HMDDeclutter", "number");

        if ( (SimVar.GetSimVarValue("IS CAMERA RAY INTERSECT WITH NODE:1", "Bool")) || (SimVar.GetSimVarValue("L:AS04F_HELMET_MOUNTED_DISPLAY_BRIGHTNESS", "number") == 0 ) || (SimVar.GetSimVarValue("L:HMDOffBoresight", "Boolean") == 0 )) {
            diffAndSetStyle(this, "display", "none");
        }
        else {
            diffAndSetStyle(this, "display", "inherit");
            super.Update();
            this.updateBrightness();

            if ((SimVar.GetSimVarValue("L:AS04F_HELMET_MOUNTED_DISPLAY_BRIGHTNESS", "number")) > 0) {
                const airspeed = Simplane.getIndicatedSpeed();
                const verticalSpeed = Simplane.getVerticalSpeed();
                const heading = SimVar.GetSimVarValue("L:AircraftHeadingReference", "degrees");  
                const cameraPitch = SimVar.GetSimVarValue("CAMERA GAMEPLAY PITCH YAW:0", "degree");
                const cameraYaw = SimVar.GetSimVarValue("CAMERA GAMEPLAY PITCH YAW:1", "degree");
				const groundSpeed = SimVar.GetSimVarValue("GPS GROUND SPEED", "knots");
                const aoa = Simplane.getAngleOfAttack("degree");
                const mach = Simplane.getMachSpeed();
                const g = Simplane.getGForce();
                let altitude = Simplane.getAltitude();
				let isRadiating = SimVar.GetSimVarValue("L:RadarIsRadiating", "bool");
				let masterarm = SimVar.GetSimVarValue("L:MasterArmSwitch", "number");
                diffAndSetText(this._hmdAirspeedElement, airspeed.toFixed(0));
                diffAndSetStyle(this._hmdAirspeedElement, StyleProperty.border, "none");                
                let displayedAltitude;
                if (SimVar.GetSimVarValue("L:XMLVAR_AS04F_HUD_Alt_Selector", "number") == 1) {
                    displayedAltitude = SimVar.GetSimVarValue("RADIO HEIGHT", "feet");
                    if (displayedAltitude > 5000 || Math.abs(Simplane.getBank()) > 60) {
                        displayedAltitude = altitude;
                        diffAndSetText(this._hmdAltitudeModeElement, "B");
                        diffAndSetAttribute(this._hmdAltitudeModeElement, "state", "blink");
                    }
                    else {
                        diffAndSetText(this._hmdAltitudeModeElement, "R");
                        diffAndSetAttribute(this._hmdAltitudeModeElement, "state", "");
                    }
                }
                else {
                    displayedAltitude = altitude;
                    diffAndSetText(this._hmdAltitudeModeElement, "");
                }
                let formatedAltitude = Avionics.Utils.computeThousandsAltitude(displayedAltitude);
                diffAndSetText(this._hmdAltitudeLargeElement, formatedAltitude);
				let smallAltitude = (Math.abs(altitude) % 1000);
				smallAltitude = Math.round(smallAltitude / 10) * 10;
				if (smallAltitude > 990) { smallAltitude = 990; }
				if (smallAltitude < 10) { smallAltitude = 0; }				
				

				diffAndSetText(this._hmdAltitudeSmallElement, smallAltitude.toFixed(0).padStart(3, "0"));				
                diffAndSetStyle(this._hmdAltitudeElement, StyleProperty.border, "none");
				
				if (isRadiating) { diffAndSetText(this._hmdNoRad, " "); } else { diffAndSetText(this._hmdNoRad, "NO RAD"); }
				if (masterarm > 0) { diffAndSetText(this._hmdMasterArm, "ARM"); } else { diffAndSetText(this._hmdMasterArm, ""); }
								
			
                diffAndSetStyle(this._hmdNoRad, "visibility", (this.clutterLevel < 2) ? "visible" : "hidden");
				diffAndSetStyle(this._hmdMasterArm, "visibility", (this.clutterLevel < 2) ? "visible" : "hidden");
                const headingDiff = Avionics.Utils.clampAngle(Avionics.Utils.diffAngle(cameraYaw, heading));
                diffAndSetAttribute(this._headingElement, "transform", "translate(" + (-headingDiff * this.headingXSpacing / 10) + ", 0)");
                diffAndSetAttribute(this._headingClipElement, "transform", "translate(" + (headingDiff * this.headingXSpacing / 10) + ", 0)");
                diffAndSetStyle(this._headingElement, "visibility", (this.clutterLevel < 1) ? "visible" : "hidden");
				diffAndSetStyle(this._hmdHeadingMarker, "visibility", (this.clutterLevel < 1) ? "visible" : "hidden");				
                diffAndSetStyle(this._hmdTrueHeadingElement, "visibility", (this.clutterLevel < 1) ? "visible" : "hidden");
                this._hmdPeakGValue = Utils.Clamp(this._hmdPeakGValue, g, 99);
                diffAndSetText(this._hmdAOAElement, aoa.toFixed(1));
                diffAndSetText(this._hmdMachElement, mach.toFixed(2));
				diffAndSetText(this._hmdMachElement, groundSpeed.toFixed(0));
				

				                
                diffAndSetStyle(this._hmdAutoThrottleEngaged, "visibility", ((this.clutterLevel < 2) && SimVar.GetSimVarValue("AUTOTHROTTLE ACTIVE", "Bool")) ? "hidden" : "hidden");
				
				let clockhours = SimVar.GetSimVarValue("L:StopwatchHours", "Number");
				let clockminutes = SimVar.GetSimVarValue("L:StopwatchMinutes", "Number");
				let clockseconds = SimVar.GetSimVarValue("L:StopwatchSeconds", "Number");
				let swsecondsrunning = SimVar.GetSimVarValue("L:TotalRunning", "seconds");
				if (swsecondsrunning > 0) { diffAndSetText(this._clock, (clockhours).toFixed(0).padStart(2, "0")+":"+(clockminutes).toFixed(0).padStart(2, "0")+":"+(clockseconds).toFixed(0).padStart(2, "0") ); } 
				else { diffAndSetText(this._clock, ""); } 
				
				let ttshours = SimVar.GetSimVarValue("L:TimeToSteerHours", "Number");
				let ttsminutes = SimVar.GetSimVarValue("L:TimeToSteerMinutes", "Number");
				let ttsseconds = SimVar.GetSimVarValue("L:TimeToSteerSeconds", "Number");
				diffAndSetText(this._timetosteer, (ttshours).toFixed(0).padStart(2, "0")+":"+(ttsminutes).toFixed(0).padStart(2, "0")+":"+(ttsseconds).toFixed(0).padStart(2, "0"));
				

				let steeringMode = SimVar.GetSimVarValue("L:NAVMode", "number");
				let isILS = SimVar.GetSimVarValue ("L:ILSReceiverAvailable","bool")
				let navvisible = false;

				if (steeringMode == 0) {
				}

				if (steeringMode == 1) {
				let currentWaypoint = SimVar.GetSimVarValue("GPS FLIGHT PLAN WP INDEX", "number");
				let distance = SimVar.GetSimVarValue("GPS WP DISTANCE", "nmiles");
				let bearing = SimVar.GetSimVarValue("GPS WP BEARING", "degrees");            
				diffAndSetText(this._hudSteeringDataElement, "WPT "+ fastToFixed(currentWaypoint, 0) + " " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );
				navvisible = true;		
				}

				if (steeringMode == 2) {
				let distance = SimVar.GetSimVarValue("L:navDistance", "number");
				let bearing = Avionics.Utils.clampAngle(SimVar.GetSimVarValue("NAV1 RADIAL", "degree") + 180);
				if (! isILS) {
				diffAndSetText(this._hudSteeringDataElement, "VOR " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );		
				}
				else {	        
				diffAndSetText(this._hudSteeringDataElement, "ILS " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );					
				}
				navvisible = true;
				}
				
				if (steeringMode == 3) {
					let distance = SimVar.GetSimVarValue("L:navDistance", "number");
					let bearing = Avionics.Utils.clampAngle(SimVar.GetSimVarValue("TACAN STATION RADIAL:2", "degree") + 180);
					let tacanChannel = SimVar.GetSimVarValue("A:TACAN ACTIVE CHANNEL:2", "number");
					let tacanY = SimVar.GetSimVarValue("A:TACAN ACTIVE MODE:2", "bool");
					if (! tacanY) {
						diffAndSetText(this._hudSteeringDataElement, fastToFixed(tacanChannel, 0) + "X " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );		
					}
					else {
						diffAndSetText(this._hudSteeringDataElement, fastToFixed(tacanChannel, 0) + "Y " + fastToFixed(bearing, 0) + " / " + fastToFixed(distance, 1) );				
					}
					navvisible = true;
				}

				diffAndSetStyle(this._hudSteeringDataElement, StyleProperty.visibility, ((this.clutterLevel != 2) && navvisible) ? "visible" : "hidden");
				diffAndSetStyle(this._timetosteer, StyleProperty.visibility, ((this.clutterLevel != 2) && navvisible) ? "visible" : "hidden");	

            }
        }
		
		this.updateDeclutter();
    }
    updateDeclutter() {
        let visibility = (this.clutterLevel == 0) ? "visible" : "hidden";
        diffAndSetStyle(this._hmdMachLabel, StyleProperty.visibility, visibility);
        diffAndSetStyle(this._hmdMachElement, StyleProperty.visibility, visibility);
    }
	
	

}
registerInstrument("fa18-hmd", FA18_HMD);
//# sourceMappingURL=FA18_HMD.js.map