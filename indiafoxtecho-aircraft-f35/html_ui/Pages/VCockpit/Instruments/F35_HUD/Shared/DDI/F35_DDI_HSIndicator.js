class F35_DDI_HSIndicator extends HTMLElement {
    constructor() {
        super(...arguments);
        this.fontSize = 7;
        this.refStartX = 0;
        this.refWidth = 0;
        this.isCoupled = false;
        this.coupledTimer = -1;
    }
    connectedCallback() {
        this.construct();
    }
    setInstrument(instrument) {
        this.instrument = instrument;
    }
    construct() {
        let posX = 0;
        let posY = 0;
        let width = 200;
        let height = 200;
        this.rootSVG = document.createElementNS(Avionics.SVG.NS, "svg");
        diffAndSetAttribute(this.rootSVG, "id", "ViewBox");
        diffAndSetAttribute(this.rootSVG, "viewBox", "0 0 " + width + " " + height);
        {
            let circleRadius = 60;
            this.rotatingCompass = document.createElementNS(Avionics.SVG.NS, "g");
            diffAndSetAttribute(this.rotatingCompass, "id", "Circle");
            this.rootSVG.appendChild(this.rotatingCompass);
            {
                this.rotatingCompassX = posX + width * 0.5;
                this.rotatingCompassY = posY + height * 0.5;
                let graduationsGroup = document.createElementNS(Avionics.SVG.NS, "g");
                diffAndSetAttribute(graduationsGroup, "id", "Graduations");
                this.rotatingCompass.appendChild(graduationsGroup);
                {
                    let angle = 0;
                    for (let i = 0; i < 36; i++) {
                        let isPrimary = (i % 3 == 0) ? true : false;
                        let length = 1;
                        if (isPrimary) {
                            let text = document.createElementNS(Avionics.SVG.NS, "text");
                            let textContent = "";
                            if (i === 0) {
                                textContent = "N";
                            }
                            else if (i === 9) {
                                textContent = "E";
                            }
                            else if (i === 18) {
                                textContent = "S";
                            }
                            else if (i === 27) {
                                textContent = "W";
                            }
                            else {
                                textContent = (angle / 10) + '';
                            }
                            diffAndSetText(text, textContent);
                            diffAndSetAttribute(text, "x", this.rotatingCompassX + '');
                            diffAndSetAttribute(text, "y", (this.rotatingCompassY - circleRadius) + '');
                            diffAndSetAttribute(text, "fill", "#ffffff");
                            diffAndSetAttribute(text, "font-size", 5);
                            diffAndSetAttribute(text, "font-family", "Arial, Helvetica, sans-serif");
                            diffAndSetAttribute(text, "text-anchor", "middle");
                            diffAndSetAttribute(text, "alignment-baseline", "central");
                            diffAndSetAttribute(text, "transform", "rotate(" + angle + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
                            graduationsGroup.appendChild(text);
                        }
                        else {
                            let dot = document.createElementNS(Avionics.SVG.NS, "line");
                            diffAndSetAttribute(dot, "x1", this.rotatingCompassX + '');
                            diffAndSetAttribute(dot, "y1", (this.rotatingCompassY - circleRadius) + '');
                            diffAndSetAttribute(dot, "x2", this.rotatingCompassX + '');
                            diffAndSetAttribute(dot, "y2", (this.rotatingCompassY - circleRadius + length) + '');
                            diffAndSetAttribute(dot, "stroke", "#ffffff");
                            diffAndSetAttribute(dot, "stroke-width", "1");
                            diffAndSetAttribute(dot, "transform", "rotate(" + angle + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
                            graduationsGroup.appendChild(dot);
                        }
                        angle += 360 / 36;
                    }
                }
            }
            this.magneticHeadingGroup = document.createElementNS(Avionics.SVG.NS, "g");
            diffAndSetAttribute(this.magneticHeadingGroup, "id", "magneticHeadingGroup");
            this.rootSVG.appendChild(this.magneticHeadingGroup);
            {
                this.magneticHeadingBug = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(this.magneticHeadingBug, "x", this.rotatingCompassX.toFixed(0));
                diffAndSetAttribute(this.magneticHeadingBug, "y", (this.rotatingCompassY - circleRadius - 10).toFixed(0));
                diffAndSetAttribute(this.magneticHeadingBug, "width", "0.7");
                diffAndSetAttribute(this.magneticHeadingBug, "height", "15");
                diffAndSetAttribute(this.magneticHeadingBug, "fill", "#ffffff");
                diffAndSetAttribute(this.magneticHeadingBug, "id", "magneticHeadingBug");
                this.magneticHeadingGroup.appendChild(this.magneticHeadingBug);
            }
            {
                this.currentTrackIndicator = document.createElementNS(Avionics.SVG.NS, "path");
                diffAndSetAttribute(this.currentTrackIndicator, "id", "CurrentTrack");
                let x = this.rotatingCompassX;
                let y = this.rotatingCompassY - circleRadius + 15;
                diffAndSetAttribute(this.currentTrackIndicator, "d", "M " + x + " " + y + " l -3 -3, l 3 -3, l 3 3, l -3 3, v8 Z");
                diffAndSetAttribute(this.currentTrackIndicator, "fill", "none");
                diffAndSetAttribute(this.currentTrackIndicator, "stroke", "#ffffff");
                diffAndSetAttribute(this.currentTrackIndicator, "stroke-width", "0.7");
                this.rootSVG.appendChild(this.currentTrackIndicator);
            }
			
	// Heading bug					
            this.selectedHeadingGroup = document.createElementNS(Avionics.SVG.NS, "g");
            diffAndSetAttribute(this.selectedHeadingGroup, "id", "selectedHeadingGroup");
            {
                let selectedHeadingMarkerBox = document.createElementNS(Avionics.SVG.NS, "rect");
                diffAndSetAttribute(selectedHeadingMarkerBox, "x", (this.rotatingCompassX - 5).toFixed(0));
                diffAndSetAttribute(selectedHeadingMarkerBox, "y", (this.rotatingCompassY - circleRadius - 7.5).toFixed(0));
                diffAndSetAttribute(selectedHeadingMarkerBox, "width", "10");
                diffAndSetAttribute(selectedHeadingMarkerBox, "height", "3");
                diffAndSetAttribute(selectedHeadingMarkerBox, "fill", "none");
                diffAndSetAttribute(selectedHeadingMarkerBox, "stroke", "#ffff00");
                diffAndSetAttribute(selectedHeadingMarkerBox, "stroke-width", "1");
                this.selectedHeadingGroup.appendChild(selectedHeadingMarkerBox);
                let selectedHeadingMarkerCenter = document.createElementNS(Avionics.SVG.NS, "line");
                diffAndSetAttribute(selectedHeadingMarkerCenter, "x1", (this.rotatingCompassX).toFixed(0));
                diffAndSetAttribute(selectedHeadingMarkerCenter, "y1", (this.rotatingCompassY - circleRadius - 7.5).toFixed(0));
                diffAndSetAttribute(selectedHeadingMarkerCenter, "x2", (this.rotatingCompassX).toFixed(0));
                diffAndSetAttribute(selectedHeadingMarkerCenter, "y2", (this.rotatingCompassY - circleRadius - 7.5 + 3).toFixed(0));
                diffAndSetAttribute(selectedHeadingMarkerCenter, "stroke", "#ffff00");
                diffAndSetAttribute(selectedHeadingMarkerCenter, "stroke-width", "2");
                this.selectedHeadingGroup.appendChild(selectedHeadingMarkerCenter);
            }
            this.rootSVG.appendChild(this.selectedHeadingGroup);
            {
                let selectedHeadingReadout = document.createElementNS(Avionics.SVG.NS, "g");
                diffAndSetAttribute(selectedHeadingReadout, "id", "selectedHeadingReadout");
            }
			
	// Waypoint Indicator				
            {
                this.currentWaypointIndicator = document.createElementNS(Avionics.SVG.NS, "g");
                diffAndSetAttribute(this.currentWaypointIndicator, "id", "currentWaypointIndicator");
                {
                    let toIndicator = document.createElementNS(Avionics.SVG.NS, "g");
                    diffAndSetAttribute(toIndicator, "id", "currentWaypointToIndicator");
                    let x = this.rotatingCompassX;
                    let y = this.rotatingCompassY - circleRadius + 2.5;
                    let triangle = document.createElementNS(Avionics.SVG.NS, "path");
                    diffAndSetAttribute(triangle, "d", "M " + x + " " + y + " l -4 7 h 8 Z");
                    diffAndSetAttribute(triangle, "stroke", "#ffff00");
                    diffAndSetAttribute(triangle, "stroke-width", "1");
                    diffAndSetAttribute(triangle, "fill", "none");
                    toIndicator.appendChild(triangle);
                    let circle = document.createElementNS(Avionics.SVG.NS, "circle");
                    diffAndSetAttribute(circle, "cx", x + '');
                    diffAndSetAttribute(circle, "cy", (y + 4.5) + '');
                    diffAndSetAttribute(circle, "r", 2 + '');
                    diffAndSetAttribute(circle, "stroke", "#ffff00");
                    diffAndSetAttribute(circle, "stroke-width", "1");
                    diffAndSetAttribute(circle, "fill", "none");
                    toIndicator.appendChild(circle);
                    this.currentWaypointIndicator.appendChild(toIndicator);
                }
                {
                    let fromIndicator = document.createElementNS(Avionics.SVG.NS, "rect");
                    diffAndSetAttribute(fromIndicator, "id", "currentWaypointFromIndicator");
                    diffAndSetAttribute(fromIndicator, "width", "2.5");
                    diffAndSetAttribute(fromIndicator, "height", "10");
                    diffAndSetAttribute(fromIndicator, "x", (this.rotatingCompassX - 1.25) + '');
                    diffAndSetAttribute(fromIndicator, "y", (this.rotatingCompassY + circleRadius - 13) + '');
                    diffAndSetAttribute(fromIndicator, "fill", "none");
                    diffAndSetAttribute(fromIndicator, "stroke", "#ffff00");
                    diffAndSetAttribute(fromIndicator, "stroke-width", "1");
                    this.currentWaypointIndicator.appendChild(fromIndicator);
                }
                diffAndSetAttribute(this.currentWaypointIndicator, "visibility", "hidden");
                this.rootSVG.appendChild(this.currentWaypointIndicator);
            }
			
	// Tacan		
			
            {
                this.currentTacanIndicator = document.createElementNS(Avionics.SVG.NS, "g");
                this.currentTacanIndicator.setAttribute("id", "currentTacanIndicator");
                {
                    let toIndicator = document.createElementNS(Avionics.SVG.NS, "g");
                    toIndicator.setAttribute("id", "currentTacanToIndicator");
                    let x = this.rotatingCompassX;
                    let y = this.rotatingCompassY - circleRadius + 2.5;
                    let triangle = document.createElementNS(Avionics.SVG.NS, "path");
                    triangle.setAttribute("d", "M " + x + " " + y + " l -4 7 h 8 Z");
                    triangle.setAttribute("stroke", "#00ff00");
                    triangle.setAttribute("stroke-width", "1");
                    triangle.setAttribute("fill", "none");
                    toIndicator.appendChild(triangle);
                    let horizontalShape = document.createElementNS(Avionics.SVG.NS, "path");
                    horizontalShape.setAttribute("d", "M " + (x - 2) + " " + (y + 5.5) + " h 4");
                    horizontalShape.setAttribute("stroke", "#00ff00");
                    horizontalShape.setAttribute("stroke-width", "1");
                    horizontalShape.setAttribute("fill", "none");
                    toIndicator.appendChild(horizontalShape);
                    let verticalShape = document.createElementNS(Avionics.SVG.NS, "path");
                    verticalShape.setAttribute("d", "M " + x + " " + (y + 1) + " v 5");
                    verticalShape.setAttribute("stroke", "#00ff00");
                    verticalShape.setAttribute("stroke-width", "1");
                    verticalShape.setAttribute("fill", "none");
                    toIndicator.appendChild(verticalShape);
                    this.currentTacanIndicator.appendChild(toIndicator);
                }
                {
                    let fromIndicator = document.createElementNS(Avionics.SVG.NS, "rect");
                    fromIndicator.setAttribute("id", "currentTacanFromIndicator");
                    fromIndicator.setAttribute("width", "2.5");
                    fromIndicator.setAttribute("height", "10");
                    fromIndicator.setAttribute("x", (this.rotatingCompassX - 1.25) + '');
                    fromIndicator.setAttribute("y", (this.rotatingCompassY + circleRadius - 13) + '');
                    fromIndicator.setAttribute("fill", "#00ff00");
                    this.currentTacanIndicator.appendChild(fromIndicator);
                }
                diffAndSetAttribute(this.currentTacanIndicator, "visibility", "hidden");
                this.rootSVG.appendChild(this.currentTacanIndicator);
            }
            {
                this.tacanGroup = document.createElementNS(Avionics.SVG.NS, "g");
                diffAndSetAttribute(this.tacanGroup, "id", "tacanInformation");
                {
                    let x = 40;
                    let y = 10;
                    this.tacanBearingDistance = document.createElementNS(Avionics.SVG.NS, "text");
                    diffAndSetText(this.tacanBearingDistance, "");
                    diffAndSetAttribute(this.tacanBearingDistance, "x", (x) + '');
                    diffAndSetAttribute(this.tacanBearingDistance, "y", (y) + '');
                    diffAndSetAttribute(this.tacanBearingDistance, "fill", "#00ff00");
                    diffAndSetAttribute(this.tacanBearingDistance, "font-size", this.fontSize + '');
                    diffAndSetAttribute(this.tacanBearingDistance, "text-anchor", "start");
                    this.tacanGroup.appendChild(this.tacanBearingDistance);
                    this.tacanETE = document.createElementNS(Avionics.SVG.NS, "text");
                    diffAndSetText(this.tacanETE, "");
                    diffAndSetAttribute(this.tacanETE, "x", (x) + '');
                    diffAndSetAttribute(this.tacanETE, "y", (y + 7) + '');
                    diffAndSetAttribute(this.tacanETE, "fill", "#00ff00");
                    diffAndSetAttribute(this.tacanETE, "font-size", this.fontSize + '');
                    diffAndSetAttribute(this.tacanETE, "text-anchor", "start");
                    this.tacanGroup.appendChild(this.tacanETE);
                    this.tacanIdentifier = document.createElementNS(Avionics.SVG.NS, "text");
                    diffAndSetText(this.tacanIdentifier, "");
                    diffAndSetAttribute(this.tacanIdentifier, "x", (x) + '');
                    diffAndSetAttribute(this.tacanIdentifier, "y", (y + 14) + '');
                    diffAndSetAttribute(this.tacanIdentifier, "fill", "#00ff00");
                    diffAndSetAttribute(this.tacanIdentifier, "font-size", this.fontSize + '');
                    diffAndSetAttribute(this.tacanIdentifier, "text-anchor", "start");
                    this.tacanGroup.appendChild(this.tacanIdentifier);
                }
                diffAndSetAttribute(this.tacanGroup, "visibility", "visible");
                this.rootSVG.appendChild(this.tacanGroup);
            }
            {
                this.waypointGroup = document.createElementNS(Avionics.SVG.NS, "g");
                diffAndSetAttribute(this.waypointGroup, "id", "waypointInformation");
                {
                    let x = 150;
                    let y = 10;
                    this.waypointBearingDistance = document.createElementNS(Avionics.SVG.NS, "text");
                    diffAndSetText(this.waypointBearingDistance, " ");
                    diffAndSetAttribute(this.waypointBearingDistance, "x", (x) + '');
                    diffAndSetAttribute(this.waypointBearingDistance, "y", (y) + '');
                    diffAndSetAttribute(this.waypointBearingDistance, "fill", "#ffff00");
                    diffAndSetAttribute(this.waypointBearingDistance, "font-size", this.fontSize + '');
                    diffAndSetAttribute(this.waypointBearingDistance, "text-anchor", "end");
                    this.waypointGroup.appendChild(this.waypointBearingDistance);
                    this.waypointETE = document.createElementNS(Avionics.SVG.NS, "text");
                    diffAndSetText(this.waypointETE, "-:--");
                    diffAndSetAttribute(this.waypointETE, "x", (x) + '');
                    diffAndSetAttribute(this.wETE, "y", (y + 7) + '');
                    diffAndSetAttribute(this.waypointETE, "fill", "#ffff00");
                    diffAndSetAttribute(this.waypointETE, "font-size", this.fontSize + '');
                    diffAndSetAttribute(this.waypointETE, "text-anchor", "end");
                    this.waypointGroup.appendChild(this.waypointETE);
                }
                diffAndSetAttribute(this.waypointGroup, "visibility", "visible");
                this.rootSVG.appendChild(this.waypointGroup);
            }
        }
        this.appendChild(this.rootSVG);
    }
    update(deltaTime) {
		let compass = SimVar.GetSimVarValue("PLANE HEADING DEGREES MAGNETIC", "Degree");
        let heading = compass;
        let track = SimVar.GetSimVarValue("GPS GROUND MAGNETIC TRACK", "degree");
        let groundSpeed = SimVar.GetSimVarValue("GPS GROUND SPEED", "knots");
        let isNorthUp = SimVar.GetSimVarValue("L:F35_DDI_HSI_NORTH_UP", "Bool");
        if (isNorthUp)
            compass = 0;
        if (this.rotatingCompass) {
            diffAndSetAttribute(this.rotatingCompass, "transform", "rotate(" + (-compass) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
        if (this.magneticHeadingGroup) {
            let delta = compass - heading;
            diffAndSetAttribute(this.magneticHeadingGroup, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
        if (this.currentTrackIndicator) {
            if (groundSpeed <= 10)
                track = compass;
            let delta = compass - track;
            diffAndSetAttribute(this.currentTrackIndicator, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
		
	// Selected heading		
		
        if (this.selectedHeadingGroup || this.selectedHeadingValue) {
            let hselValue = SimVar.GetSimVarValue("AUTOPILOT HEADING LOCK DIR", "degrees");
            if (this.selectedHeadingGroup) {
                let delta = compass - hselValue;
                diffAndSetAttribute(this.selectedHeadingGroup, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
            }
            if (this.selectedHeadingValue) {
                diffAndSetText(this.selectedHeadingValue, Utils.leadingZeros(hselValue, 3, 0) + Avionics.Utils.DEGREE_SYMBOL);
            }
        }
		
        if (this.trueAirspeedIndicator) {
            diffAndSetText(this.trueAirspeedIndicator, Utils.leadingZeros(Simplane.getTrueSpeed(), 3, 0) + "T");
        }
        if (this.groundSpeedIndicator) {
            diffAndSetText(this.groundSpeedIndicator, Utils.leadingZeros(groundSpeed, 3, 0) + "G");
        }

	// STEERING CUE NUMBER 1
	
        let steeringMode = SimVar.GetSimVarValue("L:PFD_NAV_SOURCE", "enum"); 	
        let steeringMode2 = SimVar.GetSimVarValue("L:PFD_NAV_POINTER_2", "enum"); 	
	
        let navHasTacan = SimVar.GetSimVarValue("NAV HAS TACAN:1", "Bool");
        let tacanMode = SimVar.GetSimVarValue("L:Glasscockpit_TACAN_Mode", "number");


        diffAndSetAttribute(this.tacanGroup, "visibility", "hidden");
        diffAndSetAttribute(this.currentTacanIndicator, "visibility", "hidden");

        if (steeringMode == 1) {
            let tacanBearing = Avionics.Utils.clampAngle(SimVar.GetSimVarValue("NAV1 RADIAL", "degree") + 180);
            let tacanDistance = SimVar.GetSimVarValue("NAV1 DME", "nautical mile");
            let tacanIdentifier = SimVar.GetSimVarValue("NAV1 IDENT", "string");
			let hasGlideSlope = SimVar.GetSimVarValue("NAV HAS GLIDE SLOPE:1", "boolean");
			let hasDME = SimVar.GetSimVarValue("NAV HAS GLIDE DME:1", "boolean");
            diffAndSetAttribute(this.tacanGroup, "visibility", "visible");
            let ete = Avionics.Utils.computeETEinSeconds(tacanDistance);
            if (!hasDME) {
                diffAndSetText(this.tacanETE, "---.-");
            }
            else {
                diffAndSetText(this.tacanETE, (tacanDistance).toFixed(1));
            }
            if (!hasDME) { diffAndSetText(this.tacanBearingDistance, "VOR"); }
			if (hasDME) { diffAndSetText(this.tacanBearingDistance, "VOR DME"); }
            if (hasGlideSlope) { diffAndSetText(this.tacanBearingDistance, "ILS"); }			
            diffAndSetText(this.tacanIdentifier, tacanIdentifier);
            diffAndSetAttribute(this.currentTacanIndicator, "visibility", "visible");
            let delta = compass - tacanBearing;
            diffAndSetAttribute(this.currentTacanIndicator, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
        else {
        }	
		
        if (steeringMode == 2) {
            let tacanBearing = SimVar.GetSimVarValue("GPS WP BEARING", "degrees");		
            let tacanDistance = SimVar.GetSimVarValue("(A:GPS WP DISTANCE", "nautical mile");
            let tacanIdentifier = SimVar.GetSimVarValue("GPS WP NEXT ID", "string");
            diffAndSetAttribute(this.tacanGroup, "visibility", "visible");
            let ete = Avionics.Utils.computeETEinSeconds(tacanDistance);
            if (tacanDistance > 0) {
                diffAndSetText(this.tacanETE, (tacanDistance).toFixed(1));
            }
            else {
                diffAndSetText(this.tacanETE, "---.-");
            }
            diffAndSetText(this.tacanBearingDistance, "EGI");
			diffAndSetText(this.tacanIdentifier, tacanIdentifier);
            diffAndSetAttribute(this.currentTacanIndicator, "visibility", "visible");
            let delta = compass - tacanBearing;
            diffAndSetAttribute(this.currentTacanIndicator, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
        else {
        }

        if (steeringMode == 3) {
            let tacanBearing = Avionics.Utils.clampAngle(SimVar.GetSimVarValue("TACAN STATION RADIAL:2", "degree") + 180);
            let tacanDistance = SimVar.GetSimVarValue("TACAN STATION DISTANCE:2", "nautical mile");
            let tacanIdentifier = SimVar.GetSimVarValue("TACAN STATION IDENT:2", "string");
            diffAndSetAttribute(this.tacanGroup, "visibility", "visible");
            let ete = Avionics.Utils.computeETEinSeconds(tacanDistance);

            if (tacanDistance > 0) {
                diffAndSetText(this.tacanETE, (tacanDistance).toFixed(1));
            }
            else {
                diffAndSetText(this.tacanETE, "---.-");
            }
            diffAndSetText(this.tacanBearingDistance, "TACAN");

            diffAndSetText(this.tacanIdentifier, tacanIdentifier);
            diffAndSetAttribute(this.currentTacanIndicator, "visibility", "visible");
            let delta = compass - tacanBearing;
            diffAndSetAttribute(this.currentTacanIndicator, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
        else {
        }	

        diffAndSetAttribute(this.waypointGroup, "visibility", "hidden");
        diffAndSetAttribute(this.currentWaypointIndicator, "visibility", "hidden");

        if (steeringMode2 == 1) {
            let tacanBearing = Avionics.Utils.clampAngle(SimVar.GetSimVarValue("NAV1 RADIAL", "degree") + 180);
            let tacanDistance = SimVar.GetSimVarValue("NAV1 DME", "nautical mile");
            let tacanIdentifier = SimVar.GetSimVarValue("NAV1 IDENT", "string");
            diffAndSetAttribute(this.waypointGroup, "visibility", "visible");

			diffAndSetText(this.waypointBearingDistance, "VOR");		
			
            diffAndSetAttribute(this.currentWaypointIndicator, "visibility", "visible");
            let delta = compass - tacanBearing;
            diffAndSetAttribute(this.currentWaypointIndicator, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
        else {
        }	
		
        if (steeringMode2 == 2) {
            let tacanBearing = SimVar.GetSimVarValue("GPS WP BEARING", "degrees");		
            let tacanDistance = SimVar.GetSimVarValue("(A:GPS WP DISTANCE", "nautical mile");
            let tacanIdentifier = SimVar.GetSimVarValue("GPS WP NEXT ID", "string");
            diffAndSetAttribute(this.waypointGroup, "visibility", "visible");

			diffAndSetText(this.waypointBearingDistance, "EGI");

            diffAndSetAttribute(this.currentWaypointIndicator, "visibility", "visible");
            let delta = compass - tacanBearing;
            diffAndSetAttribute(this.currentWaypointIndicator, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
        else {
        }

        if (steeringMode2 == 3) {
            let tacanBearing = Avionics.Utils.clampAngle(SimVar.GetSimVarValue("TACAN STATION RADIAL:2", "degree") + 180);
            let tacanDistance = SimVar.GetSimVarValue("TACAN STATION DISTANCE:2", "nautical mile");
            let tacanIdentifier = SimVar.GetSimVarValue("TACAN STATION IDENT:2", "string");
            diffAndSetAttribute(this.waypointGroup, "visibility", "visible");
            let ete = Avionics.Utils.computeETEinSeconds(tacanDistance);

			diffAndSetText(this.waypointBearingDistance, "TACAN");

            diffAndSetAttribute(this.currentWaypointIndicator, "visibility", "visible");
            let delta = compass - tacanBearing;
            diffAndSetAttribute(this.currentWaypointIndicator, "transform", "rotate(" + (-delta) + " " + this.rotatingCompassX + " " + this.rotatingCompassY + ")");
        }
        else {
        }	



    }
}
customElements.define("f35-ddi-hs-indicator", F35_DDI_HSIndicator);
//# sourceMappingURL=F35_DDI_HSIndicator.js.map