class F35_TSD extends BaseInstrument {
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
        this._hmdTrueHeadingElement = this.getChildById("hmd-true-heading");
        this._compassElement = this.getChildById("compass_elements");
		
		this._mapRange1 = this.getChildById("range-value1");
		this._mapRange2 = this.getChildById("range-value2");
		this._mapRange3 = this.getChildById("range-value3");

		this._radarLimitAA1min = this.getChildById("Radar_limit_AA1_min");
		this._radarLimitAA1max = this.getChildById("Radar_limit_AA1_max");
		this._radarLimitAA2min = this.getChildById("Radar_limit_AA2_min");
		this._radarLimitAA2max = this.getChildById("Radar_limit_AA2_max");
		this._radarLimitASmin = this.getChildById("Radar_limit_AS_min");
		this._radarLimitASmax = this.getChildById("Radar_limit_AS_max");		
		this._radarLimitOFF = this.getChildById("Radar_limit_OFF");
		
		this._radarTrack1 = this.getChildById("Radar_track_1");
		this._radarTrack2 = this.getChildById("Radar_track_2");
		this._radarTrack3 = this.getChildById("Radar_track_3");
		this._radarTrack4 = this.getChildById("Radar_track_4");
		this._radarTrack5 = this.getChildById("Radar_track_5");
		this._radarTrack6 = this.getChildById("Radar_track_6");
		this._radarTrack7 = this.getChildById("Radar_track_7");
		this._radarTrack8 = this.getChildById("Radar_track_8");
		this._radarTrack9 = this.getChildById("Radar_track_9");
		this._radarTrack10 = this.getChildById("Radar_track_10");
		
		this._radarTrack11 = this.getChildById("Radar_track_11");
		this._radarTrack12 = this.getChildById("Radar_track_12");
		this._radarTrack13 = this.getChildById("Radar_track_13");
		this._radarTrack14 = this.getChildById("Radar_track_14");
		this._radarTrack15 = this.getChildById("Radar_track_15");
		this._radarTrack16 = this.getChildById("Radar_track_16");
		this._radarTrack17 = this.getChildById("Radar_track_17");
		this._radarTrack18 = this.getChildById("Radar_track_18");
		this._radarTrack19 = this.getChildById("Radar_track_19");
		this._radarTrack20 = this.getChildById("Radar_track_20");
				
		this._radarTrack21 = this.getChildById("Radar_track_21");
		this._radarTrack22 = this.getChildById("Radar_track_22");
		this._radarTrack23 = this.getChildById("Radar_track_23");
		this._radarTrack24 = this.getChildById("Radar_track_24");
		this._radarTrack25 = this.getChildById("Radar_track_25");
		this._radarTrack26 = this.getChildById("Radar_track_26");
		this._radarTrack27 = this.getChildById("Radar_track_27");
		this._radarTrack28 = this.getChildById("Radar_track_28");
		this._radarTrack29 = this.getChildById("Radar_track_29");
		this._radarTrack30 = this.getChildById("Radar_track_30");
	
		this._radarTrack31 = this.getChildById("Radar_track_31");
		this._radarTrack32 = this.getChildById("Radar_track_32");
		this._radarTrack33 = this.getChildById("Radar_track_33");
		this._radarTrack34 = this.getChildById("Radar_track_34");
		this._radarTrack35 = this.getChildById("Radar_track_35");
		this._radarTrack36 = this.getChildById("Radar_track_36");
		this._radarTrack37 = this.getChildById("Radar_track_37");
		this._radarTrack38 = this.getChildById("Radar_track_38");
		this._radarTrack39 = this.getChildById("Radar_track_39");
		this._radarTrack40 = this.getChildById("Radar_track_40");
		
		this._radarTrack41 = this.getChildById("Radar_track_41");
		this._radarTrack42 = this.getChildById("Radar_track_42");
		this._radarTrack43 = this.getChildById("Radar_track_43");
		this._radarTrack44 = this.getChildById("Radar_track_44");
		this._radarTrack45 = this.getChildById("Radar_track_45");
		this._radarTrack46 = this.getChildById("Radar_track_46");
		this._radarTrack47 = this.getChildById("Radar_track_47");
		this._radarTrack48 = this.getChildById("Radar_track_48");
		this._radarTrack49 = this.getChildById("Radar_track_49");
		this._radarTrack50 = this.getChildById("Radar_track_50");

		this._radarTrack51 = this.getChildById("Radar_track_51");
		this._radarTrack52 = this.getChildById("Radar_track_52");
		this._radarTrack53 = this.getChildById("Radar_track_53");
		this._radarTrack54 = this.getChildById("Radar_track_54");
		this._radarTrack55 = this.getChildById("Radar_track_55");
		this._radarTrack56 = this.getChildById("Radar_track_56");
		this._radarTrack57 = this.getChildById("Radar_track_57");
		this._radarTrack58 = this.getChildById("Radar_track_58");
		this._radarTrack59 = this.getChildById("Radar_track_59");
		this._radarTrack60 = this.getChildById("Radar_track_60");		
		
		this._radarTrackAS1 = this.getChildById("Radar_track_AS_1");
		this._radarTrackAS2 = this.getChildById("Radar_track_AS_2");
		this._radarTrackAS3 = this.getChildById("Radar_track_AS_3");
		this._radarTrackAS4 = this.getChildById("Radar_track_AS_4");
		this._radarTrackAS5 = this.getChildById("Radar_track_AS_5");
		this._radarTrackAS6 = this.getChildById("Radar_track_AS_6");
		this._radarTrackAS7 = this.getChildById("Radar_track_AS_7");
		this._radarTrackAS8 = this.getChildById("Radar_track_AS_8");
		this._radarTrackAS9 = this.getChildById("Radar_track_AS_9");
		this._radarTrackAS10 = this.getChildById("Radar_track_AS_10");

		this._radarTrackAS11 = this.getChildById("Radar_track_AS_11");
		this._radarTrackAS12 = this.getChildById("Radar_track_AS_12");
		this._radarTrackAS13 = this.getChildById("Radar_track_AS_13");
		this._radarTrackAS14 = this.getChildById("Radar_track_AS_14");
		this._radarTrackAS15 = this.getChildById("Radar_track_AS_15");
		this._radarTrackAS16 = this.getChildById("Radar_track_AS_16");
		this._radarTrackAS17 = this.getChildById("Radar_track_AS_17");
		this._radarTrackAS18 = this.getChildById("Radar_track_AS_18");
		this._radarTrackAS19 = this.getChildById("Radar_track_AS_19");
		this._radarTrackAS20 = this.getChildById("Radar_track_AS_20");
				
		this._radarTrackAS21 = this.getChildById("Radar_track_AS_21");
		this._radarTrackAS22 = this.getChildById("Radar_track_AS_22");
		this._radarTrackAS23 = this.getChildById("Radar_track_AS_23");
		this._radarTrackAS24 = this.getChildById("Radar_track_AS_24");
		this._radarTrackAS25 = this.getChildById("Radar_track_AS_25");
		this._radarTrackAS26 = this.getChildById("Radar_track_AS_26");
		this._radarTrackAS27 = this.getChildById("Radar_track_AS_27");
		this._radarTrackAS28 = this.getChildById("Radar_track_AS_28");
		this._radarTrackAS29 = this.getChildById("Radar_track_AS_29");
		this._radarTrackAS30 = this.getChildById("Radar_track_AS_30");
	
		this._radarTrackAS31 = this.getChildById("Radar_track_AS_31");
		this._radarTrackAS32 = this.getChildById("Radar_track_AS_32");
		this._radarTrackAS33 = this.getChildById("Radar_track_AS_33");
		this._radarTrackAS34 = this.getChildById("Radar_track_AS_34");
		this._radarTrackAS35 = this.getChildById("Radar_track_AS_35");
		this._radarTrackAS36 = this.getChildById("Radar_track_AS_36");
		this._radarTrackAS37 = this.getChildById("Radar_track_AS_37");
		this._radarTrackAS38 = this.getChildById("Radar_track_AS_38");
		this._radarTrackAS39 = this.getChildById("Radar_track_AS_39");
		this._radarTrackAS40 = this.getChildById("Radar_track_AS_40");
		
		this._radarTrackAS41 = this.getChildById("Radar_track_AS_41");
		this._radarTrackAS42 = this.getChildById("Radar_track_AS_42");
		this._radarTrackAS43 = this.getChildById("Radar_track_AS_43");
		this._radarTrackAS44 = this.getChildById("Radar_track_AS_44");
		this._radarTrackAS45 = this.getChildById("Radar_track_AS_45");
		this._radarTrackAS46 = this.getChildById("Radar_track_AS_46");
		this._radarTrackAS47 = this.getChildById("Radar_track_AS_47");
		this._radarTrackAS48 = this.getChildById("Radar_track_AS_48");
		this._radarTrackAS49 = this.getChildById("Radar_track_AS_49");
		this._radarTrackAS50 = this.getChildById("Radar_track_AS_50");		
		
		
    }
    Init() {
        super.Init();
    }
    onInteractionEvent(_args) {
        super.onInteractionEvent(_args);
    }
    Update() {
            diffAndSetStyle(this, "display", "inherit");
            super.Update();

            const heading = Simplane.getHeadingMagnetic(); 

			const TSDMapRange = SimVar.GetSimVarValue("L:TSD_Map_Range", "number");

			const mapRange1 = SimVar.GetSimVarValue("L:TSD_MapRange1", "number");  
			const mapRange2 = SimVar.GetSimVarValue("L:TSD_MapRange2", "number");
			const mapRange3 = SimVar.GetSimVarValue("L:TSD_MapRange3", "number");

			const scaleFactor = 150 / mapRange2;

			const radarVolumeDisplay = SimVar.GetSimVarValue("L:RadarScanVolumeDisplay", "enum");
			const radarStatus = SimVar.GetSimVarValue("L:RadarStatus", "enum");
			const isAWACSAvailable = SimVar.GetSimVarValue("L:Datalink_AWACS", "bool");
			const radarSweepLimitAA1min = SimVar.GetSimVarValue("L:RadarSweepAA1min", "enum");
			const radarSweepLimitAA1max = SimVar.GetSimVarValue("L:RadarSweepAA1max", "enum");
			const radarSweepLimitAA2min = SimVar.GetSimVarValue("L:RadarSweepAA2min", "enum");
			const radarSweepLimitAA2max = SimVar.GetSimVarValue("L:RadarSweepAA2max", "enum");
			const radarSweepLimitASmin = SimVar.GetSimVarValue("L:RadarSweepASmin", "enum");
			const radarSweepLimitASmax = SimVar.GetSimVarValue("L:RadarSweepASmax", "enum");


			const radarTrackAz1 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_1", "radians");  
			const radarTrackRange1 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_1", "nmiles") * scaleFactor;
			const radarTrackHeading1 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_1", "radians");
			const radarTrackAlt1 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_1", "feet");
			const radarTrackValid1 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_1", "boolean");				

			const radarTrackAz2 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_2", "radians");  
			const radarTrackRange2 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_2", "nmiles") * scaleFactor;
			const radarTrackHeading2 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_2", "radians");
			const radarTrackAlt2 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_2", "feet");
			const radarTrackValid2 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_2", "boolean");		
			
			const radarTrackAz3 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_3", "radians");  
			const radarTrackRange3 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_3", "nmiles") * scaleFactor;
			const radarTrackHeading3 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_3", "radians");
			const radarTrackAlt3 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_3", "feet");
			const radarTrackValid3 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_3", "boolean");	

			const radarTrackAz4 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_4", "radians");  
			const radarTrackRange4 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_4", "nmiles") * scaleFactor;
			const radarTrackHeading4 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_4", "radians");
			const radarTrackAlt4 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_4", "feet");
			const radarTrackValid4 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_4", "boolean");				

			const radarTrackAz5 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_5", "radians");  
			const radarTrackRange5 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_5", "nmiles") * scaleFactor;
			const radarTrackHeading5 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_5", "radians");
			const radarTrackAlt5 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_5", "feet");
			const radarTrackValid5 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_5", "boolean");				

			const radarTrackAz6 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_6", "radians");  
			const radarTrackRange6 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_6", "nmiles") * scaleFactor;
			const radarTrackHeading6 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_6", "radians");
			const radarTrackAlt6 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_6", "feet");
			const radarTrackValid6 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_6", "boolean");				

			const radarTrackAz7 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_7", "radians");  
			const radarTrackRange7 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_7", "nmiles") * scaleFactor;
			const radarTrackHeading7 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_7", "radians");
			const radarTrackAlt7 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_7", "feet");
			const radarTrackValid7 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_7", "boolean");				
			
			const radarTrackAz8 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_8", "radians");  
			const radarTrackRange8 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_8", "nmiles") * scaleFactor;
			const radarTrackHeading8 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_8", "radians");
			const radarTrackAlt8 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_8", "feet");
			const radarTrackValid8 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_8", "boolean");				

			const radarTrackAz9 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_9", "radians");  
			const radarTrackRange9 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_9", "nmiles") * scaleFactor;
			const radarTrackHeading9 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_9", "radians");
			const radarTrackAlt9 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_9", "feet");
			const radarTrackValid9 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_9", "boolean");				

			const radarTrackAz10 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_10", "radians");  
			const radarTrackRange10 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_10", "nmiles") * scaleFactor;
			const radarTrackHeading10 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_10", "radians");
			const radarTrackAlt10 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_10", "feet");
			const radarTrackValid10 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_10", "boolean");

			const radarTrackAz11 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_11", "radians");  
			const radarTrackRange11 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_11", "nmiles") * scaleFactor;
			const radarTrackHeading11 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_11", "radians");
			const radarTrackAlt11 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_11", "feet");
			const radarTrackValid11 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_11", "boolean");		

			const radarTrackAz12 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_12", "radians");  
			const radarTrackRange12 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_12", "nmiles") * scaleFactor;
			const radarTrackHeading12 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_12", "radians");
			const radarTrackAlt12 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_12", "feet");
			const radarTrackValid12 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_12", "boolean");		

			const radarTrackAz13 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_13", "radians");  
			const radarTrackRange13 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_13", "nmiles") * scaleFactor;
			const radarTrackHeading13 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_13", "radians");
			const radarTrackAlt13 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_13", "feet");
			const radarTrackValid13 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_13", "boolean");		

			const radarTrackAz14 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_14", "radians");  
			const radarTrackRange14 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_14", "nmiles") * scaleFactor;
			const radarTrackHeading14 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_14", "radians");
			const radarTrackAlt14 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_14", "feet");
			const radarTrackValid14 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_14", "boolean");		

			const radarTrackAz15 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_15", "radians");  
			const radarTrackRange15 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_15", "nmiles") * scaleFactor;
			const radarTrackHeading15 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_15", "radians");
			const radarTrackAlt15 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_15", "feet");
			const radarTrackValid15 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_15", "boolean");		

			const radarTrackAz16 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_16", "radians");  
			const radarTrackRange16 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_16", "nmiles") * scaleFactor;
			const radarTrackHeading16 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_16", "radians");
			const radarTrackAlt16 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_16", "feet");
			const radarTrackValid16 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_16", "boolean");		

			const radarTrackAz17 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_17", "radians");  
			const radarTrackRange17 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_17", "nmiles") * scaleFactor;
			const radarTrackHeading17 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_17", "radians");
			const radarTrackAlt17 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_17", "feet");
			const radarTrackValid17 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_17", "boolean");		

			const radarTrackAz18 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_18", "radians");  
			const radarTrackRange18 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_18", "nmiles") * scaleFactor;
			const radarTrackHeading18 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_18", "radians");
			const radarTrackAlt18 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_18", "feet");
			const radarTrackValid18 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_18", "boolean");		

			const radarTrackAz19 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_19", "radians");  
			const radarTrackRange19 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_19", "nmiles") * scaleFactor;
			const radarTrackHeading19 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_19", "radians");
			const radarTrackAlt19 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_19", "feet");
			const radarTrackValid19 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_19", "boolean");		

			const radarTrackAz20 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_20", "radians");  
			const radarTrackRange20 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_20", "nmiles") * scaleFactor;
			const radarTrackHeading20 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_20", "radians");
			const radarTrackAlt20 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_20", "feet");
			const radarTrackValid20 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_20", "boolean");		

			const radarTrackAz21 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_21", "radians");  
			const radarTrackRange21 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_21", "nmiles") * scaleFactor;
			const radarTrackHeading21 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_21", "radians");
			const radarTrackAlt21 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_21", "feet");
			const radarTrackValid21 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_21", "boolean");		

			const radarTrackAz22 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_22", "radians");  
			const radarTrackRange22 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_22", "nmiles") * scaleFactor;
			const radarTrackHeading22 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_22", "radians");
			const radarTrackAlt22 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_22", "feet");
			const radarTrackValid22 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_22", "boolean");		

			const radarTrackAz23 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_23", "radians");  
			const radarTrackRange23 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_23", "nmiles") * scaleFactor;
			const radarTrackHeading23 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_23", "radians");
			const radarTrackAlt23 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_23", "feet");
			const radarTrackValid23 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_23", "boolean");		

			const radarTrackAz24 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_24", "radians");  
			const radarTrackRange24 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_24", "nmiles") * scaleFactor;
			const radarTrackHeading24 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_24", "radians");
			const radarTrackAlt24 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_24", "feet");
			const radarTrackValid24 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_24", "boolean");		

			const radarTrackAz25 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_25", "radians");  
			const radarTrackRange25 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_25", "nmiles") * scaleFactor;
			const radarTrackHeading25 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_25", "radians");
			const radarTrackAlt25 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_25", "feet");
			const radarTrackValid25 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_25", "boolean");		

			const radarTrackAz26 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_26", "radians");  
			const radarTrackRange26 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_26", "nmiles") * scaleFactor;
			const radarTrackHeading26 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_26", "radians");
			const radarTrackAlt26 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_26", "feet");
			const radarTrackValid26 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_26", "boolean");		

			const radarTrackAz27 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_27", "radians");  
			const radarTrackRange27 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_27", "nmiles") * scaleFactor;
			const radarTrackHeading27 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_27", "radians");
			const radarTrackAlt27 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_27", "feet");
			const radarTrackValid27 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_27", "boolean");		

			const radarTrackAz28 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_28", "radians");  
			const radarTrackRange28 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_28", "nmiles") * scaleFactor;
			const radarTrackHeading28 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_28", "radians");
			const radarTrackAlt28 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_28", "feet");
			const radarTrackValid28 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_28", "boolean");		

			const radarTrackAz29 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_29", "radians");  
			const radarTrackRange29 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_29", "nmiles") * scaleFactor;
			const radarTrackHeading29 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_29", "radians");
			const radarTrackAlt29 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_29", "feet");
			const radarTrackValid29 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_29", "boolean");		

			const radarTrackAz30 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_30", "radians");  
			const radarTrackRange30 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_30", "nmiles") * scaleFactor;
			const radarTrackHeading30 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_30", "radians");
			const radarTrackAlt30 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_30", "feet");
			const radarTrackValid30 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_30", "boolean");		
		
			const radarTrackAz31 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_31", "radians");  
			const radarTrackRange31 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_31", "nmiles") * scaleFactor;
			const radarTrackHeading31 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_31", "radians");
			const radarTrackAlt31 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_31", "feet");
			const radarTrackValid31 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_31", "boolean");		

			const radarTrackAz32 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_32", "radians");  
			const radarTrackRange32 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_32", "nmiles") * scaleFactor;
			const radarTrackHeading32 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_32", "radians");
			const radarTrackAlt32 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_32", "feet");
			const radarTrackValid32 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_32", "boolean");		

			const radarTrackAz33 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_33", "radians");  
			const radarTrackRange33 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_33", "nmiles") * scaleFactor;
			const radarTrackHeading33 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_33", "radians");
			const radarTrackAlt33 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_33", "feet");
			const radarTrackValid33 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_33", "boolean");		

			const radarTrackAz34 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_34", "radians");  
			const radarTrackRange34 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_34", "nmiles") * scaleFactor;
			const radarTrackHeading34 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_34", "radians");
			const radarTrackAlt34 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_34", "feet");
			const radarTrackValid34 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_34", "boolean");		

			const radarTrackAz35 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_35", "radians");  
			const radarTrackRange35 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_35", "nmiles") * scaleFactor;
			const radarTrackHeading35 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_35", "radians");
			const radarTrackAlt35 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_35", "feet");
			const radarTrackValid35 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_35", "boolean");		

			const radarTrackAz36 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_36", "radians");  
			const radarTrackRange36 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_36", "nmiles") * scaleFactor;
			const radarTrackHeading36 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_36", "radians");
			const radarTrackAlt36 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_36", "feet");
			const radarTrackValid36 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_36", "boolean");		

			const radarTrackAz37 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_37", "radians");  
			const radarTrackRange37 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_37", "nmiles") * scaleFactor;
			const radarTrackHeading37 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_37", "radians");
			const radarTrackAlt37 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_37", "feet");
			const radarTrackValid37 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_37", "boolean");		

			const radarTrackAz38 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_38", "radians");  
			const radarTrackRange38 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_38", "nmiles") * scaleFactor;
			const radarTrackHeading38 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_38", "radians");
			const radarTrackAlt38 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_38", "feet");
			const radarTrackValid38 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_38", "boolean");		

			const radarTrackAz39 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_39", "radians");  
			const radarTrackRange39 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_39", "nmiles") * scaleFactor;
			const radarTrackHeading39 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_39", "radians");
			const radarTrackAlt39 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_39", "feet");
			const radarTrackValid39 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_39", "boolean");		

			const radarTrackAz40 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_40", "radians");  
			const radarTrackRange40 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_40", "nmiles") * scaleFactor;
			const radarTrackHeading40 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_40", "radians");
			const radarTrackAlt40 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_40", "feet");
			const radarTrackValid40 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_40", "boolean");		
				
			const radarTrackAz41 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_41", "radians");  
			const radarTrackRange41 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_41", "nmiles") * scaleFactor;
			const radarTrackHeading41 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_41", "radians");
			const radarTrackAlt41 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_41", "feet");
			const radarTrackValid41 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_41", "boolean");		

			const radarTrackAz42 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_42", "radians");  
			const radarTrackRange42 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_42", "nmiles") * scaleFactor;
			const radarTrackHeading42 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_42", "radians");
			const radarTrackAlt42 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_42", "feet");
			const radarTrackValid42 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_42", "boolean");		

			const radarTrackAz43 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_43", "radians");  
			const radarTrackRange43 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_43", "nmiles") * scaleFactor;
			const radarTrackHeading43 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_43", "radians");
			const radarTrackAlt43 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_43", "feet");
			const radarTrackValid43 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_43", "boolean");		

			const radarTrackAz44 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_44", "radians");  
			const radarTrackRange44 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_44", "nmiles") * scaleFactor;
			const radarTrackHeading44 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_44", "radians");
			const radarTrackAlt44 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_44", "feet");
			const radarTrackValid44 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_44", "boolean");		

			const radarTrackAz45 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_45", "radians");  
			const radarTrackRange45 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_45", "nmiles") * scaleFactor;
			const radarTrackHeading45 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_45", "radians");
			const radarTrackAlt45 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_45", "feet");
			const radarTrackValid45 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_45", "boolean");		

			const radarTrackAz46 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_46", "radians");  
			const radarTrackRange46 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_46", "nmiles") * scaleFactor;
			const radarTrackHeading46 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_46", "radians");
			const radarTrackAlt46 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_46", "feet");
			const radarTrackValid46 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_46", "boolean");		

			const radarTrackAz47 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_47", "radians");  
			const radarTrackRange47 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_47", "nmiles") * scaleFactor;
			const radarTrackHeading47 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_47", "radians");
			const radarTrackAlt47 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_47", "feet");
			const radarTrackValid47 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_47", "boolean");		

			const radarTrackAz48 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_48", "radians");  
			const radarTrackRange48 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_48", "nmiles") * scaleFactor;
			const radarTrackHeading48 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_48", "radians");
			const radarTrackAlt48 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_48", "feet");
			const radarTrackValid48 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_48", "boolean");		

			const radarTrackAz49 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_49", "radians");  
			const radarTrackRange49 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_49", "nmiles") * scaleFactor;
			const radarTrackHeading49 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_49", "radians");
			const radarTrackAlt49 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_49", "feet");
			const radarTrackValid49 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_49", "boolean");		

			const radarTrackAz50 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_50", "radians");  
			const radarTrackRange50 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_50", "nmiles") * scaleFactor;
			const radarTrackHeading50 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_50", "radians");
			const radarTrackAlt50 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_50", "feet");
			const radarTrackValid50 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_50", "boolean");	

			const radarTrackAz51 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_51", "radians");  
			const radarTrackRange51 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_51", "nmiles") * scaleFactor;
			const radarTrackHeading51 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_51", "radians");
			const radarTrackAlt51 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_51", "feet");
			const radarTrackValid51 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_51", "boolean");		

			const radarTrackAz52 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_52", "radians");  
			const radarTrackRange52 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_52", "nmiles") * scaleFactor;
			const radarTrackHeading52 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_52", "radians");
			const radarTrackAlt52 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_52", "feet");
			const radarTrackValid52 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_52", "boolean");		

			const radarTrackAz53 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_53", "radians");  
			const radarTrackRange53 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_53", "nmiles") * scaleFactor;
			const radarTrackHeading53 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_53", "radians");
			const radarTrackAlt53 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_53", "feet");
			const radarTrackValid53 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_53", "boolean");		

			const radarTrackAz54 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_54", "radians");  
			const radarTrackRange54 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_54", "nmiles") * scaleFactor;
			const radarTrackHeading54 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_54", "radians");
			const radarTrackAlt54 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_54", "feet");
			const radarTrackValid54 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_54", "boolean");		

			const radarTrackAz55 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_55", "radians");  
			const radarTrackRange55 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_55", "nmiles") * scaleFactor;
			const radarTrackHeading55 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_55", "radians");
			const radarTrackAlt55 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_55", "feet");
			const radarTrackValid55 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_55", "boolean");		

			const radarTrackAz56 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_56", "radians");  
			const radarTrackRange56 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_56", "nmiles") * scaleFactor;
			const radarTrackHeading56 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_56", "radians");
			const radarTrackAlt56 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_56", "feet");
			const radarTrackValid56 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_56", "boolean");		

			const radarTrackAz57 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_57", "radians");  
			const radarTrackRange57 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_57", "nmiles") * scaleFactor;
			const radarTrackHeading57 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_57", "radians");
			const radarTrackAlt57 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_57", "feet");
			const radarTrackValid57 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_57", "boolean");		

			const radarTrackAz58 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_58", "radians");  
			const radarTrackRange58 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_58", "nmiles") * scaleFactor;
			const radarTrackHeading58 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_58", "radians");
			const radarTrackAlt58 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_58", "feet");
			const radarTrackValid58 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_58", "boolean");		

			const radarTrackAz59 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_59", "radians");  
			const radarTrackRange59 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_59", "nmiles") * scaleFactor;
			const radarTrackHeading59 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_59", "radians");
			const radarTrackAlt59 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_59", "feet");
			const radarTrackValid59 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_59", "boolean");		

			const radarTrackAz60 = SimVar.GetSimVarValue("L:RADAR_TRACK_AZ_60", "radians");  
			const radarTrackRange60 = SimVar.GetSimVarValue("L:RADAR_TRACK_DISTANCE_60", "nmiles") * scaleFactor;
			const radarTrackHeading60 = SimVar.GetSimVarValue("L:RADAR_TRACK_HEADING_60", "radians");
			const radarTrackAlt60 = SimVar.GetSimVarValue("L:RADAR_TRACK_ALT_AGL_60", "feet");
			const radarTrackValid60 = SimVar.GetSimVarValue("L:RADAR_TRACK_VALID_60", "boolean");	

			
			diffAndSetText(this._mapRange1, mapRange1.toFixed(0));
			diffAndSetText(this._mapRange2, mapRange2.toFixed(0));
			diffAndSetText(this._mapRange3, mapRange3.toFixed(0));
			diffAndSetText(this._hmdTrueHeadingElement, Utils.leadingZeros(heading, 3, 0));
			
			diffAndSetText(this._hmdTrueHeadingElement, Utils.leadingZeros(heading, 3, 0));
            diffAndSetStyle(this._hmdTrueHeadingElement, "visibility", "hidden");
			diffAndSetAttribute(this._compassElement,"visibility", "visible");
			diffAndSetAttribute(this._compassElement, "transform", "rotate(" + (Math.abs(heading) * -1).toFixed(0) + " 256 256)");

			diffAndSetAttribute(this._radarLimitAA1min, "transform", "rotate(" + radarSweepLimitAA1min.toFixed(0) + " 256 256)");
			diffAndSetAttribute(this._radarLimitAA1max, "transform", "rotate(" + radarSweepLimitAA1max.toFixed(0) + " 256 256)");
			diffAndSetAttribute(this._radarLimitAA2min, "transform", "rotate(" + radarSweepLimitAA2min.toFixed(0) + " 256 256)");
			diffAndSetAttribute(this._radarLimitAA2max, "transform", "rotate(" + radarSweepLimitAA2max.toFixed(0) + " 256 256)");
			diffAndSetAttribute(this._radarLimitASmin, "transform", "rotate(" + radarSweepLimitASmin.toFixed(0) + " 256 256)");
			diffAndSetAttribute(this._radarLimitASmax, "transform", "rotate(" + radarSweepLimitASmax.toFixed(0) + " 256 256)");			

			diffAndSetStyle(this._radarLimitAA1min, "visibility", "hidden");
			diffAndSetStyle(this._radarLimitAA1max, "visibility", "hidden");
			diffAndSetStyle(this._radarLimitAA2min, "visibility", "hidden");
			diffAndSetStyle(this._radarLimitAA2max, "visibility", "hidden");
			diffAndSetStyle(this._radarLimitASmin, "visibility", "hidden");
			diffAndSetStyle(this._radarLimitASmax, "visibility", "hidden");
			diffAndSetStyle(this._radarLimitOFF, "visibility", "hidden");
			
			if ((radarVolumeDisplay == 1) && (radarStatus != 4) && (radarStatus > 2)) { 
				diffAndSetStyle(this._radarLimitAA1min, "visibility", "visible");
				diffAndSetStyle(this._radarLimitAA1max, "visibility", "visible");
				diffAndSetStyle(this._radarLimitAA2min, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA2max, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitASmin, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitASmax, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitOFF, "visibility", "hidden");
				}

			if ((radarVolumeDisplay == 2) && (radarStatus != 4) && (radarStatus > 2)) { 
				diffAndSetStyle(this._radarLimitAA1min, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA1max, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA2min, "visibility", "visible");
				diffAndSetStyle(this._radarLimitAA2max, "visibility", "visible");
				diffAndSetStyle(this._radarLimitASmin, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitASmax, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitOFF, "visibility", "hidden");
				}							

			if ((radarVolumeDisplay == 3) && (radarStatus != 5) && (radarStatus > 2)) { 
				diffAndSetStyle(this._radarLimitAA1min, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA1max, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA2min, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA2max, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitASmin, "visibility", "visible");
				diffAndSetStyle(this._radarLimitASmax, "visibility", "visible");
				diffAndSetStyle(this._radarLimitOFF, "visibility", "hidden");
				}	
				
			if ((((radarVolumeDisplay == 1) || (radarVolumeDisplay == 2)) && (radarStatus == 4)) || ((radarVolumeDisplay == 3) && (radarStatus == 5)) || ((radarVolumeDisplay > 0) && (radarStatus < 3))) { 
				diffAndSetStyle(this._radarLimitAA1min, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA1max, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA2min, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitAA2max, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitASmin, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitASmax, "visibility", "hidden");
				diffAndSetStyle(this._radarLimitOFF, "visibility", "visible");
				}		



			diffAndSetAttribute(this._radarTrack1, "transform", "translate(" + (Math.sin(radarTrackAz1) * radarTrackRange1).toFixed(0) + ", " + (Math.cos(radarTrackAz1) * radarTrackRange1 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack2, "transform", "translate(" + (Math.sin(radarTrackAz2) * radarTrackRange2).toFixed(0) + ", " + (Math.cos(radarTrackAz2) * radarTrackRange2 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack3, "transform", "translate(" + (Math.sin(radarTrackAz3) * radarTrackRange3).toFixed(0) + ", " + (Math.cos(radarTrackAz3) * radarTrackRange3 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack4, "transform", "translate(" + (Math.sin(radarTrackAz4) * radarTrackRange4).toFixed(0) + ", " + (Math.cos(radarTrackAz4) * radarTrackRange4 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack5, "transform", "translate(" + (Math.sin(radarTrackAz5) * radarTrackRange5).toFixed(0) + ", " + (Math.cos(radarTrackAz5) * radarTrackRange5 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack6, "transform", "translate(" + (Math.sin(radarTrackAz6) * radarTrackRange6).toFixed(0) + ", " + (Math.cos(radarTrackAz6) * radarTrackRange6 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack7, "transform", "translate(" + (Math.sin(radarTrackAz7) * radarTrackRange7).toFixed(0) + ", " + (Math.cos(radarTrackAz7) * radarTrackRange7 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack8, "transform", "translate(" + (Math.sin(radarTrackAz8) * radarTrackRange8).toFixed(0) + ", " + (Math.cos(radarTrackAz8) * radarTrackRange8 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack9, "transform", "translate(" + (Math.sin(radarTrackAz9) * radarTrackRange9).toFixed(0) + ", " + (Math.cos(radarTrackAz9) * radarTrackRange9 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack10, "transform", "translate(" + (Math.sin(radarTrackAz10) * radarTrackRange10).toFixed(0) + ", " + (Math.cos(radarTrackAz10) * radarTrackRange10 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack11, "transform", "translate(" + (Math.sin(radarTrackAz11) * radarTrackRange11).toFixed(0) + ", " + (Math.cos(radarTrackAz11) * radarTrackRange11 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack12, "transform", "translate(" + (Math.sin(radarTrackAz12) * radarTrackRange12).toFixed(0) + ", " + (Math.cos(radarTrackAz12) * radarTrackRange12 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack10, "transform", "translate(" + (Math.sin(radarTrackAz13) * radarTrackRange13).toFixed(0) + ", " + (Math.cos(radarTrackAz13) * radarTrackRange13 * -1).toFixed(0) + ")");			
			diffAndSetAttribute(this._radarTrack13, "transform", "translate(" + (Math.sin(radarTrackAz10) * radarTrackRange10).toFixed(0) + ", " + (Math.cos(radarTrackAz10) * radarTrackRange10 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack14, "transform", "translate(" + (Math.sin(radarTrackAz14) * radarTrackRange14).toFixed(0) + ", " + (Math.cos(radarTrackAz14) * radarTrackRange14 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack15, "transform", "translate(" + (Math.sin(radarTrackAz15) * radarTrackRange15).toFixed(0) + ", " + (Math.cos(radarTrackAz15) * radarTrackRange15 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack16, "transform", "translate(" + (Math.sin(radarTrackAz16) * radarTrackRange16).toFixed(0) + ", " + (Math.cos(radarTrackAz16) * radarTrackRange16 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack17, "transform", "translate(" + (Math.sin(radarTrackAz17) * radarTrackRange17).toFixed(0) + ", " + (Math.cos(radarTrackAz17) * radarTrackRange17 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack18, "transform", "translate(" + (Math.sin(radarTrackAz18) * radarTrackRange18).toFixed(0) + ", " + (Math.cos(radarTrackAz18) * radarTrackRange18 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack19, "transform", "translate(" + (Math.sin(radarTrackAz19) * radarTrackRange19).toFixed(0) + ", " + (Math.cos(radarTrackAz19) * radarTrackRange19 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack20, "transform", "translate(" + (Math.sin(radarTrackAz20) * radarTrackRange20).toFixed(0) + ", " + (Math.cos(radarTrackAz20) * radarTrackRange20 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack21, "transform", "translate(" + (Math.sin(radarTrackAz21) * radarTrackRange21).toFixed(0) + ", " + (Math.cos(radarTrackAz21) * radarTrackRange21 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack22, "transform", "translate(" + (Math.sin(radarTrackAz22) * radarTrackRange22).toFixed(0) + ", " + (Math.cos(radarTrackAz22) * radarTrackRange22 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack23, "transform", "translate(" + (Math.sin(radarTrackAz23) * radarTrackRange23).toFixed(0) + ", " + (Math.cos(radarTrackAz23) * radarTrackRange23 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack24, "transform", "translate(" + (Math.sin(radarTrackAz24) * radarTrackRange24).toFixed(0) + ", " + (Math.cos(radarTrackAz24) * radarTrackRange24 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack25, "transform", "translate(" + (Math.sin(radarTrackAz25) * radarTrackRange25).toFixed(0) + ", " + (Math.cos(radarTrackAz25) * radarTrackRange25 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack26, "transform", "translate(" + (Math.sin(radarTrackAz26) * radarTrackRange26).toFixed(0) + ", " + (Math.cos(radarTrackAz26) * radarTrackRange26 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack27, "transform", "translate(" + (Math.sin(radarTrackAz27) * radarTrackRange27).toFixed(0) + ", " + (Math.cos(radarTrackAz27) * radarTrackRange27 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack28, "transform", "translate(" + (Math.sin(radarTrackAz28) * radarTrackRange28).toFixed(0) + ", " + (Math.cos(radarTrackAz28) * radarTrackRange28 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack29, "transform", "translate(" + (Math.sin(radarTrackAz29) * radarTrackRange29).toFixed(0) + ", " + (Math.cos(radarTrackAz29) * radarTrackRange29 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack30, "transform", "translate(" + (Math.sin(radarTrackAz30) * radarTrackRange30).toFixed(0) + ", " + (Math.cos(radarTrackAz30) * radarTrackRange30 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack31, "transform", "translate(" + (Math.sin(radarTrackAz31) * radarTrackRange31).toFixed(0) + ", " + (Math.cos(radarTrackAz31) * radarTrackRange31 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack32, "transform", "translate(" + (Math.sin(radarTrackAz32) * radarTrackRange32).toFixed(0) + ", " + (Math.cos(radarTrackAz32) * radarTrackRange32 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack33, "transform", "translate(" + (Math.sin(radarTrackAz33) * radarTrackRange33).toFixed(0) + ", " + (Math.cos(radarTrackAz33) * radarTrackRange33 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack34, "transform", "translate(" + (Math.sin(radarTrackAz34) * radarTrackRange34).toFixed(0) + ", " + (Math.cos(radarTrackAz34) * radarTrackRange34 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack35, "transform", "translate(" + (Math.sin(radarTrackAz35) * radarTrackRange35).toFixed(0) + ", " + (Math.cos(radarTrackAz35) * radarTrackRange35 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack36, "transform", "translate(" + (Math.sin(radarTrackAz36) * radarTrackRange36).toFixed(0) + ", " + (Math.cos(radarTrackAz36) * radarTrackRange36 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack37, "transform", "translate(" + (Math.sin(radarTrackAz37) * radarTrackRange37).toFixed(0) + ", " + (Math.cos(radarTrackAz37) * radarTrackRange37 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack38, "transform", "translate(" + (Math.sin(radarTrackAz38) * radarTrackRange38).toFixed(0) + ", " + (Math.cos(radarTrackAz38) * radarTrackRange38 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack39, "transform", "translate(" + (Math.sin(radarTrackAz39) * radarTrackRange39).toFixed(0) + ", " + (Math.cos(radarTrackAz39) * radarTrackRange39 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack40, "transform", "translate(" + (Math.sin(radarTrackAz40) * radarTrackRange40).toFixed(0) + ", " + (Math.cos(radarTrackAz40) * radarTrackRange40 * -1).toFixed(0) + ")");	
			diffAndSetAttribute(this._radarTrack41, "transform", "translate(" + (Math.sin(radarTrackAz41) * radarTrackRange41).toFixed(0) + ", " + (Math.cos(radarTrackAz41) * radarTrackRange41 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack42, "transform", "translate(" + (Math.sin(radarTrackAz42) * radarTrackRange42).toFixed(0) + ", " + (Math.cos(radarTrackAz42) * radarTrackRange42 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack43, "transform", "translate(" + (Math.sin(radarTrackAz43) * radarTrackRange43).toFixed(0) + ", " + (Math.cos(radarTrackAz43) * radarTrackRange43 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack44, "transform", "translate(" + (Math.sin(radarTrackAz44) * radarTrackRange44).toFixed(0) + ", " + (Math.cos(radarTrackAz44) * radarTrackRange44 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack45, "transform", "translate(" + (Math.sin(radarTrackAz45) * radarTrackRange45).toFixed(0) + ", " + (Math.cos(radarTrackAz45) * radarTrackRange45 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack46, "transform", "translate(" + (Math.sin(radarTrackAz46) * radarTrackRange46).toFixed(0) + ", " + (Math.cos(radarTrackAz46) * radarTrackRange46 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack47, "transform", "translate(" + (Math.sin(radarTrackAz47) * radarTrackRange47).toFixed(0) + ", " + (Math.cos(radarTrackAz47) * radarTrackRange47 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack48, "transform", "translate(" + (Math.sin(radarTrackAz48) * radarTrackRange48).toFixed(0) + ", " + (Math.cos(radarTrackAz48) * radarTrackRange48 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack49, "transform", "translate(" + (Math.sin(radarTrackAz49) * radarTrackRange49).toFixed(0) + ", " + (Math.cos(radarTrackAz49) * radarTrackRange49 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack50, "transform", "translate(" + (Math.sin(radarTrackAz50) * radarTrackRange50).toFixed(0) + ", " + (Math.cos(radarTrackAz50) * radarTrackRange50 * -1).toFixed(0) + ")");	
			diffAndSetAttribute(this._radarTrack51, "transform", "translate(" + (Math.sin(radarTrackAz51) * radarTrackRange51).toFixed(0) + ", " + (Math.cos(radarTrackAz51) * radarTrackRange51 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack52, "transform", "translate(" + (Math.sin(radarTrackAz52) * radarTrackRange52).toFixed(0) + ", " + (Math.cos(radarTrackAz52) * radarTrackRange52 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack53, "transform", "translate(" + (Math.sin(radarTrackAz53) * radarTrackRange53).toFixed(0) + ", " + (Math.cos(radarTrackAz53) * radarTrackRange53 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack54, "transform", "translate(" + (Math.sin(radarTrackAz54) * radarTrackRange54).toFixed(0) + ", " + (Math.cos(radarTrackAz54) * radarTrackRange54 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack55, "transform", "translate(" + (Math.sin(radarTrackAz55) * radarTrackRange55).toFixed(0) + ", " + (Math.cos(radarTrackAz55) * radarTrackRange55 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack56, "transform", "translate(" + (Math.sin(radarTrackAz56) * radarTrackRange56).toFixed(0) + ", " + (Math.cos(radarTrackAz56) * radarTrackRange56 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack57, "transform", "translate(" + (Math.sin(radarTrackAz57) * radarTrackRange57).toFixed(0) + ", " + (Math.cos(radarTrackAz57) * radarTrackRange57 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack58, "transform", "translate(" + (Math.sin(radarTrackAz58) * radarTrackRange58).toFixed(0) + ", " + (Math.cos(radarTrackAz58) * radarTrackRange58 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack59, "transform", "translate(" + (Math.sin(radarTrackAz59) * radarTrackRange59).toFixed(0) + ", " + (Math.cos(radarTrackAz59) * radarTrackRange59 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrack60, "transform", "translate(" + (Math.sin(radarTrackAz60) * radarTrackRange60).toFixed(0) + ", " + (Math.cos(radarTrackAz60) * radarTrackRange60 * -1).toFixed(0) + ")");


			diffAndSetAttribute(this._radarTrackAS1, "transform", "translate(" + (Math.sin(radarTrackAz1) * radarTrackRange1).toFixed(0) + ", " + (Math.cos(radarTrackAz1) * radarTrackRange1 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS2, "transform", "translate(" + (Math.sin(radarTrackAz2) * radarTrackRange2).toFixed(0) + ", " + (Math.cos(radarTrackAz2) * radarTrackRange2 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS3, "transform", "translate(" + (Math.sin(radarTrackAz3) * radarTrackRange3).toFixed(0) + ", " + (Math.cos(radarTrackAz3) * radarTrackRange3 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS4, "transform", "translate(" + (Math.sin(radarTrackAz4) * radarTrackRange4).toFixed(0) + ", " + (Math.cos(radarTrackAz4) * radarTrackRange4 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS5, "transform", "translate(" + (Math.sin(radarTrackAz5) * radarTrackRange5).toFixed(0) + ", " + (Math.cos(radarTrackAz5) * radarTrackRange5 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS6, "transform", "translate(" + (Math.sin(radarTrackAz6) * radarTrackRange6).toFixed(0) + ", " + (Math.cos(radarTrackAz6) * radarTrackRange6 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS7, "transform", "translate(" + (Math.sin(radarTrackAz7) * radarTrackRange7).toFixed(0) + ", " + (Math.cos(radarTrackAz7) * radarTrackRange7 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS8, "transform", "translate(" + (Math.sin(radarTrackAz8) * radarTrackRange8).toFixed(0) + ", " + (Math.cos(radarTrackAz8) * radarTrackRange8 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS9, "transform", "translate(" + (Math.sin(radarTrackAz9) * radarTrackRange9).toFixed(0) + ", " + (Math.cos(radarTrackAz9) * radarTrackRange9 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS10, "transform", "translate(" + (Math.sin(radarTrackAz10) * radarTrackRange10).toFixed(0) + ", " + (Math.cos(radarTrackAz10) * radarTrackRange10 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS11, "transform", "translate(" + (Math.sin(radarTrackAz11) * radarTrackRange11).toFixed(0) + ", " + (Math.cos(radarTrackAz11) * radarTrackRange11 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS12, "transform", "translate(" + (Math.sin(radarTrackAz12) * radarTrackRange12).toFixed(0) + ", " + (Math.cos(radarTrackAz12) * radarTrackRange12 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS10, "transform", "translate(" + (Math.sin(radarTrackAz13) * radarTrackRange13).toFixed(0) + ", " + (Math.cos(radarTrackAz13) * radarTrackRange13 * -1).toFixed(0) + ")");			
			diffAndSetAttribute(this._radarTrackAS13, "transform", "translate(" + (Math.sin(radarTrackAz10) * radarTrackRange10).toFixed(0) + ", " + (Math.cos(radarTrackAz10) * radarTrackRange10 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS14, "transform", "translate(" + (Math.sin(radarTrackAz14) * radarTrackRange14).toFixed(0) + ", " + (Math.cos(radarTrackAz14) * radarTrackRange14 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS15, "transform", "translate(" + (Math.sin(radarTrackAz15) * radarTrackRange15).toFixed(0) + ", " + (Math.cos(radarTrackAz15) * radarTrackRange15 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS16, "transform", "translate(" + (Math.sin(radarTrackAz16) * radarTrackRange16).toFixed(0) + ", " + (Math.cos(radarTrackAz16) * radarTrackRange16 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS17, "transform", "translate(" + (Math.sin(radarTrackAz17) * radarTrackRange17).toFixed(0) + ", " + (Math.cos(radarTrackAz17) * radarTrackRange17 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS18, "transform", "translate(" + (Math.sin(radarTrackAz18) * radarTrackRange18).toFixed(0) + ", " + (Math.cos(radarTrackAz18) * radarTrackRange18 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS19, "transform", "translate(" + (Math.sin(radarTrackAz19) * radarTrackRange19).toFixed(0) + ", " + (Math.cos(radarTrackAz19) * radarTrackRange19 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS20, "transform", "translate(" + (Math.sin(radarTrackAz20) * radarTrackRange20).toFixed(0) + ", " + (Math.cos(radarTrackAz20) * radarTrackRange20 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS21, "transform", "translate(" + (Math.sin(radarTrackAz21) * radarTrackRange21).toFixed(0) + ", " + (Math.cos(radarTrackAz21) * radarTrackRange21 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS22, "transform", "translate(" + (Math.sin(radarTrackAz22) * radarTrackRange22).toFixed(0) + ", " + (Math.cos(radarTrackAz22) * radarTrackRange22 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS23, "transform", "translate(" + (Math.sin(radarTrackAz23) * radarTrackRange23).toFixed(0) + ", " + (Math.cos(radarTrackAz23) * radarTrackRange23 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS24, "transform", "translate(" + (Math.sin(radarTrackAz24) * radarTrackRange24).toFixed(0) + ", " + (Math.cos(radarTrackAz24) * radarTrackRange24 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS25, "transform", "translate(" + (Math.sin(radarTrackAz25) * radarTrackRange25).toFixed(0) + ", " + (Math.cos(radarTrackAz25) * radarTrackRange25 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS26, "transform", "translate(" + (Math.sin(radarTrackAz26) * radarTrackRange26).toFixed(0) + ", " + (Math.cos(radarTrackAz26) * radarTrackRange26 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS27, "transform", "translate(" + (Math.sin(radarTrackAz27) * radarTrackRange27).toFixed(0) + ", " + (Math.cos(radarTrackAz27) * radarTrackRange27 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS28, "transform", "translate(" + (Math.sin(radarTrackAz28) * radarTrackRange28).toFixed(0) + ", " + (Math.cos(radarTrackAz28) * radarTrackRange28 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS29, "transform", "translate(" + (Math.sin(radarTrackAz29) * radarTrackRange29).toFixed(0) + ", " + (Math.cos(radarTrackAz29) * radarTrackRange29 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS30, "transform", "translate(" + (Math.sin(radarTrackAz30) * radarTrackRange30).toFixed(0) + ", " + (Math.cos(radarTrackAz30) * radarTrackRange30 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS31, "transform", "translate(" + (Math.sin(radarTrackAz31) * radarTrackRange31).toFixed(0) + ", " + (Math.cos(radarTrackAz31) * radarTrackRange31 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS32, "transform", "translate(" + (Math.sin(radarTrackAz32) * radarTrackRange32).toFixed(0) + ", " + (Math.cos(radarTrackAz32) * radarTrackRange32 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS33, "transform", "translate(" + (Math.sin(radarTrackAz33) * radarTrackRange33).toFixed(0) + ", " + (Math.cos(radarTrackAz33) * radarTrackRange33 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS34, "transform", "translate(" + (Math.sin(radarTrackAz34) * radarTrackRange34).toFixed(0) + ", " + (Math.cos(radarTrackAz34) * radarTrackRange34 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS35, "transform", "translate(" + (Math.sin(radarTrackAz35) * radarTrackRange35).toFixed(0) + ", " + (Math.cos(radarTrackAz35) * radarTrackRange35 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS36, "transform", "translate(" + (Math.sin(radarTrackAz36) * radarTrackRange36).toFixed(0) + ", " + (Math.cos(radarTrackAz36) * radarTrackRange36 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS37, "transform", "translate(" + (Math.sin(radarTrackAz37) * radarTrackRange37).toFixed(0) + ", " + (Math.cos(radarTrackAz37) * radarTrackRange37 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS38, "transform", "translate(" + (Math.sin(radarTrackAz38) * radarTrackRange38).toFixed(0) + ", " + (Math.cos(radarTrackAz38) * radarTrackRange38 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS39, "transform", "translate(" + (Math.sin(radarTrackAz39) * radarTrackRange39).toFixed(0) + ", " + (Math.cos(radarTrackAz39) * radarTrackRange39 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS40, "transform", "translate(" + (Math.sin(radarTrackAz40) * radarTrackRange40).toFixed(0) + ", " + (Math.cos(radarTrackAz40) * radarTrackRange40 * -1).toFixed(0) + ")");	
			diffAndSetAttribute(this._radarTrackAS41, "transform", "translate(" + (Math.sin(radarTrackAz41) * radarTrackRange41).toFixed(0) + ", " + (Math.cos(radarTrackAz41) * radarTrackRange41 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS42, "transform", "translate(" + (Math.sin(radarTrackAz42) * radarTrackRange42).toFixed(0) + ", " + (Math.cos(radarTrackAz42) * radarTrackRange42 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS43, "transform", "translate(" + (Math.sin(radarTrackAz43) * radarTrackRange43).toFixed(0) + ", " + (Math.cos(radarTrackAz43) * radarTrackRange43 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS44, "transform", "translate(" + (Math.sin(radarTrackAz44) * radarTrackRange44).toFixed(0) + ", " + (Math.cos(radarTrackAz44) * radarTrackRange44 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS45, "transform", "translate(" + (Math.sin(radarTrackAz45) * radarTrackRange45).toFixed(0) + ", " + (Math.cos(radarTrackAz45) * radarTrackRange45 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS46, "transform", "translate(" + (Math.sin(radarTrackAz46) * radarTrackRange46).toFixed(0) + ", " + (Math.cos(radarTrackAz46) * radarTrackRange46 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS47, "transform", "translate(" + (Math.sin(radarTrackAz47) * radarTrackRange47).toFixed(0) + ", " + (Math.cos(radarTrackAz47) * radarTrackRange47 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS48, "transform", "translate(" + (Math.sin(radarTrackAz48) * radarTrackRange48).toFixed(0) + ", " + (Math.cos(radarTrackAz48) * radarTrackRange48 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS49, "transform", "translate(" + (Math.sin(radarTrackAz49) * radarTrackRange49).toFixed(0) + ", " + (Math.cos(radarTrackAz49) * radarTrackRange49 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS50, "transform", "translate(" + (Math.sin(radarTrackAz50) * radarTrackRange50).toFixed(0) + ", " + (Math.cos(radarTrackAz50) * radarTrackRange50 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS51, "transform", "translate(" + (Math.sin(radarTrackAz51) * radarTrackRange51).toFixed(0) + ", " + (Math.cos(radarTrackAz51) * radarTrackRange51 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS52, "transform", "translate(" + (Math.sin(radarTrackAz52) * radarTrackRange52).toFixed(0) + ", " + (Math.cos(radarTrackAz52) * radarTrackRange52 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS53, "transform", "translate(" + (Math.sin(radarTrackAz53) * radarTrackRange53).toFixed(0) + ", " + (Math.cos(radarTrackAz53) * radarTrackRange53 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS54, "transform", "translate(" + (Math.sin(radarTrackAz54) * radarTrackRange54).toFixed(0) + ", " + (Math.cos(radarTrackAz54) * radarTrackRange54 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS55, "transform", "translate(" + (Math.sin(radarTrackAz55) * radarTrackRange55).toFixed(0) + ", " + (Math.cos(radarTrackAz55) * radarTrackRange55 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS56, "transform", "translate(" + (Math.sin(radarTrackAz56) * radarTrackRange56).toFixed(0) + ", " + (Math.cos(radarTrackAz56) * radarTrackRange56 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS57, "transform", "translate(" + (Math.sin(radarTrackAz57) * radarTrackRange57).toFixed(0) + ", " + (Math.cos(radarTrackAz57) * radarTrackRange57 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS58, "transform", "translate(" + (Math.sin(radarTrackAz58) * radarTrackRange58).toFixed(0) + ", " + (Math.cos(radarTrackAz58) * radarTrackRange58 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS59, "transform", "translate(" + (Math.sin(radarTrackAz59) * radarTrackRange59).toFixed(0) + ", " + (Math.cos(radarTrackAz59) * radarTrackRange59 * -1).toFixed(0) + ")");
			diffAndSetAttribute(this._radarTrackAS60, "transform", "translate(" + (Math.sin(radarTrackAz60) * radarTrackRange60).toFixed(0) + ", " + (Math.cos(radarTrackAz60) * radarTrackRange60 * -1).toFixed(0) + ")");


			if (radarTrackValid1 == true) { 
				if (radarTrackAlt1 >= 50) { diffAndSetStyle(this._radarTrack1, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS1, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack1, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS1, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack1, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS1, "visibility", "hidden"); }

			if (radarTrackValid2 == true) { 
				if (radarTrackAlt2 >= 50) { diffAndSetStyle(this._radarTrack2, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS2, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack2, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS2, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack2, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS2, "visibility", "hidden"); }
			
			if (radarTrackValid3 == true) { 
				if (radarTrackAlt3 >= 50) { diffAndSetStyle(this._radarTrack3, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS3, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack3, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS3, "visibility", "visible"); } 
				}
			else { diffAndSetStyle(this._radarTrack3, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS3, "visibility", "hidden"); }

			if (radarTrackValid4 == true) { 
				if (radarTrackAlt4 >= 50) { diffAndSetStyle(this._radarTrack4, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS4, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack4, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS4, "visibility", "visible"); }  
				}
			else { diffAndSetStyle(this._radarTrack4, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS4, "visibility", "hidden"); }

			if (radarTrackValid5 == true) { 
				if (radarTrackAlt5 >= 50) { diffAndSetStyle(this._radarTrack5, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS5, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack5, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS5, "visibility", "visible"); } 
				}  
			else { diffAndSetStyle(this._radarTrack5, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS5, "visibility", "hidden"); }			

			if (radarTrackValid6 == true) { 
				if (radarTrackAlt6 >= 50) { diffAndSetStyle(this._radarTrack6, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS6, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack6, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS6, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack6, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS6, "visibility", "hidden"); }
			
			if (radarTrackValid7 == true) { 
				if (radarTrackAlt7 >= 50) { diffAndSetStyle(this._radarTrack7, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS7, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack7, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS7, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack7, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS7, "visibility", "hidden"); }

			if (radarTrackValid8 == true) { 
				if (radarTrackAlt8 >= 50) { diffAndSetStyle(this._radarTrack8, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS8, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack8, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS8, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack8, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS8, "visibility", "hidden"); }

			if (radarTrackValid9 == true) { 
				if (radarTrackAlt9 >= 50) { diffAndSetStyle(this._radarTrack9, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS9, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack9, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS9, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack9, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS9, "visibility", "hidden"); }

			if (radarTrackValid10 == true) { 
				if (radarTrackAlt10 >= 50) { diffAndSetStyle(this._radarTrack10, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS10, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack10, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS10, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack10, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS10, "visibility", "hidden"); }

			if (radarTrackValid11 == true) { 
				if (radarTrackAlt11 >= 50) { diffAndSetStyle(this._radarTrack11, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS11, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack11, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS11, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack11, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS11, "visibility", "hidden"); }

			if (radarTrackValid12 == true) { 
				if (radarTrackAlt12 >= 50) { diffAndSetStyle(this._radarTrack12, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS12, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack12, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS12, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack12, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS12, "visibility", "hidden"); }

			if (radarTrackValid13 == true) { 
				if (radarTrackAlt13 >= 50) { diffAndSetStyle(this._radarTrack13, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS13, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack13, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS13, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack13, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS13, "visibility", "hidden"); }

			if (radarTrackValid14 == true) { 
				if (radarTrackAlt14 >= 50) { diffAndSetStyle(this._radarTrack14, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS14, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack14, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS14, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack14, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS14, "visibility", "hidden"); }

			if (radarTrackValid15 == true) { 
				if (radarTrackAlt15 >= 50) { diffAndSetStyle(this._radarTrack15, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS15, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack15, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS15, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack15, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS15, "visibility", "hidden"); }

			if (radarTrackValid16 == true) { 
				if (radarTrackAlt16 >= 50) { diffAndSetStyle(this._radarTrack16, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS16, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack16, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS16, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack17, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS17, "visibility", "hidden"); }

			if (radarTrackValid17 == true) { 
				if (radarTrackAlt17 >= 50) { diffAndSetStyle(this._radarTrack17, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS17, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack17, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS17, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack17, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS17, "visibility", "hidden"); }

			if (radarTrackValid18 == true) { 
				if (radarTrackAlt18 >= 50) { diffAndSetStyle(this._radarTrack18, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS18, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack18, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS18, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack18, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS18, "visibility", "hidden"); }
			
			if (radarTrackValid19 == true) { 
				if (radarTrackAlt19 >= 50) { diffAndSetStyle(this._radarTrack19, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS19, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack19, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS19, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack19, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS19, "visibility", "hidden"); }

			if (radarTrackValid20 == true) { 
				if (radarTrackAlt20 >= 50) { diffAndSetStyle(this._radarTrack20, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS20, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack20, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS20, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack20, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS20, "visibility", "hidden"); }

			if (radarTrackValid21 == true) { 
				if (radarTrackAlt21 >= 50) { diffAndSetStyle(this._radarTrack21, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS21, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack21, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS21, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack21, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS21, "visibility", "hidden"); }

			if (radarTrackValid22 == true) { 
				if (radarTrackAlt22 >= 50) { diffAndSetStyle(this._radarTrack22, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS22, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack22, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS22, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack22, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS22, "visibility", "hidden"); }

			if (radarTrackValid23 == true) { 
				if (radarTrackAlt23 >= 50) { diffAndSetStyle(this._radarTrack23, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS23, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack23, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS23, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack23, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS23, "visibility", "hidden"); }

			if (radarTrackValid24 == true) { 
				if (radarTrackAlt24 >= 50) { diffAndSetStyle(this._radarTrack24, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS24, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack24, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS24, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack24, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS24, "visibility", "hidden"); }

			if (radarTrackValid25 == true) { 
				if (radarTrackAlt25 >= 50) { diffAndSetStyle(this._radarTrack25, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS25, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack25, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS25, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack25, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS25, "visibility", "hidden"); }

			if (radarTrackValid26 == true) { 
				if (radarTrackAlt26 >= 50) { diffAndSetStyle(this._radarTrack26, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS26, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack26, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS26, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack26, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS26, "visibility", "hidden"); }

			if (radarTrackValid27 == true) { 
				if (radarTrackAlt27 >= 50) { diffAndSetStyle(this._radarTrack27, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS27, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack27, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS27, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack27, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS27, "visibility", "hidden"); }

			if (radarTrackValid28 == true) { 
				if (radarTrackAlt28 >= 50) { diffAndSetStyle(this._radarTrack28, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS28, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack28, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS28, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack28, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS28, "visibility", "hidden"); }

			if (radarTrackValid29 == true) { 
				if (radarTrackAlt29 >= 50) { diffAndSetStyle(this._radarTrack29, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS29, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack29, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS29, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack29, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS29, "visibility", "hidden"); }			

			if (radarTrackValid30 == true) { 
				if (radarTrackAlt30 >= 50) { diffAndSetStyle(this._radarTrack30, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS30, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack30, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS30, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack30, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS30, "visibility", "hidden"); }
			
			if (radarTrackValid31 == true) { 
				if (radarTrackAlt31 >= 50) { diffAndSetStyle(this._radarTrack31, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS31, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack31, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS31, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack31, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS31, "visibility", "hidden"); }

			if (radarTrackValid32 == true) { 
				if (radarTrackAlt32 >= 50) { diffAndSetStyle(this._radarTrack32, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS32, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack32, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS32, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack32, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS32, "visibility", "hidden"); }

			if (radarTrackValid33 == true) { 
				if (radarTrackAlt33 >= 50) { diffAndSetStyle(this._radarTrack33, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS33, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack33, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS33, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack33, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS33, "visibility", "hidden"); }

			if (radarTrackValid34 == true) { 
				if (radarTrackAlt34 >= 50) { diffAndSetStyle(this._radarTrack34, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS34, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack34, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS34, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack34, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS34, "visibility", "hidden"); }

			if (radarTrackValid35 == true) { 
				if (radarTrackAlt35 >= 50) { diffAndSetStyle(this._radarTrack35, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS35, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack35, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS35, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack35, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS35, "visibility", "hidden"); }

			if (radarTrackValid36 == true) { 
				if (radarTrackAlt36 >= 50) { diffAndSetStyle(this._radarTrack36, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS36, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack36, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS36, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack36, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS36, "visibility", "hidden"); }

			if (radarTrackValid37 == true) { 
				if (radarTrackAlt37 >= 50) { diffAndSetStyle(this._radarTrack37, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS37, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack37, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS37, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack37, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS37, "visibility", "hidden"); }

			if (radarTrackValid38 == true) { 
				if (radarTrackAlt38 >= 50) { diffAndSetStyle(this._radarTrack38, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS38, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack38, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS38, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack38, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS38, "visibility", "hidden"); }

			if (radarTrackValid39 == true) { 
				if (radarTrackAlt39 >= 50) { diffAndSetStyle(this._radarTrack39, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS39, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack39, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS39, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack39, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS39, "visibility", "hidden"); }

			if (radarTrackValid40 == true) { 
				if (radarTrackAlt40 >= 50) { diffAndSetStyle(this._radarTrack40, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS40, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack40, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS40, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack40, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS40, "visibility", "hidden"); }

			if (radarTrackValid41 == true) { 
				if (radarTrackAlt41 >= 50) { diffAndSetStyle(this._radarTrack41, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS41, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack41, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS41, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack41, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS41, "visibility", "hidden"); }

			if (radarTrackValid42 == true) { 
				if (radarTrackAlt42 >= 50) { diffAndSetStyle(this._radarTrack42, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS42, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack42, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS42, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack42, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS42, "visibility", "hidden"); }

			if (radarTrackValid43 == true) { 
				if (radarTrackAlt43 >= 50) { diffAndSetStyle(this._radarTrack43, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS43, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack43, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS43, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack43, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS43, "visibility", "hidden"); }

			if (radarTrackValid44 == true) { 
				if (radarTrackAlt44 >= 50) { diffAndSetStyle(this._radarTrack44, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS44, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack44, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS44, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack44, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS44, "visibility", "hidden"); }

			if (radarTrackValid45 == true) { 
				if (radarTrackAlt45 >= 50) { diffAndSetStyle(this._radarTrack45, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS45, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack45, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS45, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack45, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS45, "visibility", "hidden"); }

			if (radarTrackValid46 == true) { 
				if (radarTrackAlt46 >= 50) { diffAndSetStyle(this._radarTrack46, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS46, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack46, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS46, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack46, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS46, "visibility", "hidden"); }

			if (radarTrackValid47 == true) { 
				if (radarTrackAlt47 >= 50) { diffAndSetStyle(this._radarTrack47, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS47, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack47, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS47, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack47, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS47, "visibility", "hidden"); }

			if (radarTrackValid48 == true) { 
				if (radarTrackAlt48 >= 50) { diffAndSetStyle(this._radarTrack48, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS48, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack48, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS48, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack48, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS48, "visibility", "hidden"); }

			if (radarTrackValid49 == true) { 
				if (radarTrackAlt49 >= 50) { diffAndSetStyle(this._radarTrack49, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS49, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack49, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS49, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack49, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS49, "visibility", "hidden"); }

			if (radarTrackValid50 == true) { 
				if (radarTrackAlt50 >= 50) { diffAndSetStyle(this._radarTrack50, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS50, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack50, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS50, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack50, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS50, "visibility", "hidden"); }

			if (radarTrackValid51 == true) { 
				if (radarTrackAlt51 >= 50) { diffAndSetStyle(this._radarTrack51, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS51, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack51, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS51, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack51, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS51, "visibility", "hidden"); }

			if (radarTrackValid52 == true) { 
				if (radarTrackAlt52 >= 50) { diffAndSetStyle(this._radarTrack52, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS52, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack52, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS52, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack52, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS52, "visibility", "hidden"); }

			if (radarTrackValid53 == true) { 
				if (radarTrackAlt53 >= 50) { diffAndSetStyle(this._radarTrack53, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS53, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack53, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS53, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack53, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS53, "visibility", "hidden"); }

			if (radarTrackValid54 == true) { 
				if (radarTrackAlt54 >= 50) { diffAndSetStyle(this._radarTrack44, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS54, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack54, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS54, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack54, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS54, "visibility", "hidden"); }

			if (radarTrackValid55 == true) { 
				if (radarTrackAlt55 >= 50) { diffAndSetStyle(this._radarTrack55, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS55, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack55, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS55, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack55, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS55, "visibility", "hidden"); }

			if (radarTrackValid56 == true) { 
				if (radarTrackAlt56 >= 50) { diffAndSetStyle(this._radarTrack56, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS56, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack56, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS56, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack56, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS56, "visibility", "hidden"); }

			if (radarTrackValid57 == true) { 
				if (radarTrackAlt57 >= 50) { diffAndSetStyle(this._radarTrack57, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS57, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack57, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS57, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack57, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS57, "visibility", "hidden"); }

			if (radarTrackValid58 == true) { 
				if (radarTrackAlt58 >= 50) { diffAndSetStyle(this._radarTrack58, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS58, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack58, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS58, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack58, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS58, "visibility", "hidden"); }

			if (radarTrackValid59 == true) { 
				if (radarTrackAlt59 >= 50) { diffAndSetStyle(this._radarTrack59, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS59, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack59, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS59, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack59, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS59, "visibility", "hidden"); }

			if (radarTrackValid60 == true) { 
				if (radarTrackAlt60 >= 50) { diffAndSetStyle(this._radarTrack60, "visibility", "visible");   diffAndSetStyle(this._radarTrackAS60, "visibility", "hidden"); }  
				else{ diffAndSetStyle(this._radarTrack60, "visibility", "hidden");   diffAndSetStyle(this._radarTrackAS60, "visibility", "visible"); }
				}				
			else { diffAndSetStyle(this._radarTrack60, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS60, "visibility", "hidden"); }


if (radarTrackRange1 < 1) { diffAndSetStyle(this._radarTrack1, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS1, "visibility", "hidden"); }
if (radarTrackRange2 < 1) { diffAndSetStyle(this._radarTrack2, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS2, "visibility", "hidden"); }
if (radarTrackRange3 < 1) { diffAndSetStyle(this._radarTrack3, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS3, "visibility", "hidden"); }
if (radarTrackRange4 < 1) { diffAndSetStyle(this._radarTrack4, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS4, "visibility", "hidden"); }
if (radarTrackRange5 < 1) { diffAndSetStyle(this._radarTrack5, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS5, "visibility", "hidden"); }
if (radarTrackRange6 < 1) { diffAndSetStyle(this._radarTrack6, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS6, "visibility", "hidden"); }
if (radarTrackRange7 < 1) { diffAndSetStyle(this._radarTrack7, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS7, "visibility", "hidden"); }
if (radarTrackRange8 < 1) { diffAndSetStyle(this._radarTrack8, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS8, "visibility", "hidden"); }
if (radarTrackRange9 < 1) { diffAndSetStyle(this._radarTrack9, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS9, "visibility", "hidden"); }
if (radarTrackRange10 < 1) { diffAndSetStyle(this._radarTrack10, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS10, "visibility", "hidden"); }

if (radarTrackRange11 < 1) { diffAndSetStyle(this._radarTrack11, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS11, "visibility", "hidden"); }
if (radarTrackRange12 < 1) { diffAndSetStyle(this._radarTrack12, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS12, "visibility", "hidden"); }
if (radarTrackRange13 < 1) { diffAndSetStyle(this._radarTrack13, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS13, "visibility", "hidden"); }
if (radarTrackRange14 < 1) { diffAndSetStyle(this._radarTrack14, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS14, "visibility", "hidden"); }
if (radarTrackRange15 < 1) { diffAndSetStyle(this._radarTrack15, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS15, "visibility", "hidden"); }
if (radarTrackRange16 < 1) { diffAndSetStyle(this._radarTrack16, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS16, "visibility", "hidden"); }
if (radarTrackRange17 < 1) { diffAndSetStyle(this._radarTrack17, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS17, "visibility", "hidden"); }
if (radarTrackRange18 < 1) { diffAndSetStyle(this._radarTrack18, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS18, "visibility", "hidden"); }
if (radarTrackRange19 < 1) { diffAndSetStyle(this._radarTrack19, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS19, "visibility", "hidden"); }
if (radarTrackRange20 < 1) { diffAndSetStyle(this._radarTrack20, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS20, "visibility", "hidden"); }

if (radarTrackRange21 < 1) { diffAndSetStyle(this._radarTrack21, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS21, "visibility", "hidden"); }
if (radarTrackRange22 < 1) { diffAndSetStyle(this._radarTrack22, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS22, "visibility", "hidden"); }
if (radarTrackRange23 < 1) { diffAndSetStyle(this._radarTrack23, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS23, "visibility", "hidden"); }
if (radarTrackRange24 < 1) { diffAndSetStyle(this._radarTrack24, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS24, "visibility", "hidden"); }
if (radarTrackRange25 < 1) { diffAndSetStyle(this._radarTrack25, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS25, "visibility", "hidden"); }
if (radarTrackRange26 < 1) { diffAndSetStyle(this._radarTrack26, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS26, "visibility", "hidden"); }
if (radarTrackRange27 < 1) { diffAndSetStyle(this._radarTrack27, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS27, "visibility", "hidden"); }
if (radarTrackRange28 < 1) { diffAndSetStyle(this._radarTrack28, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS28, "visibility", "hidden"); }
if (radarTrackRange29 < 1) { diffAndSetStyle(this._radarTrack29, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS29, "visibility", "hidden"); }
if (radarTrackRange30 < 1) { diffAndSetStyle(this._radarTrack30, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS30, "visibility", "hidden"); }

if (radarTrackRange31 < 1) { diffAndSetStyle(this._radarTrack31, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS31, "visibility", "hidden"); }
if (radarTrackRange32 < 1) { diffAndSetStyle(this._radarTrack32, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS32, "visibility", "hidden"); }
if (radarTrackRange33 < 1) { diffAndSetStyle(this._radarTrack33, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS33, "visibility", "hidden"); }
if (radarTrackRange34 < 1) { diffAndSetStyle(this._radarTrack34, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS34, "visibility", "hidden"); }
if (radarTrackRange35 < 1) { diffAndSetStyle(this._radarTrack35, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS35, "visibility", "hidden"); }
if (radarTrackRange36 < 1) { diffAndSetStyle(this._radarTrack36, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS36, "visibility", "hidden"); }
if (radarTrackRange37 < 1) { diffAndSetStyle(this._radarTrack37, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS37, "visibility", "hidden"); }
if (radarTrackRange38 < 1) { diffAndSetStyle(this._radarTrack38, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS38, "visibility", "hidden"); }
if (radarTrackRange39 < 1) { diffAndSetStyle(this._radarTrack39, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS39, "visibility", "hidden"); }
if (radarTrackRange40 < 1) { diffAndSetStyle(this._radarTrack40, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS40, "visibility", "hidden"); }

if (radarTrackRange41 < 1) { diffAndSetStyle(this._radarTrack41, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS41, "visibility", "hidden"); }
if (radarTrackRange42 < 1) { diffAndSetStyle(this._radarTrack42, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS42, "visibility", "hidden"); }
if (radarTrackRange43 < 1) { diffAndSetStyle(this._radarTrack43, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS43, "visibility", "hidden"); }
if (radarTrackRange44 < 1) { diffAndSetStyle(this._radarTrack44, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS44, "visibility", "hidden"); }
if (radarTrackRange45 < 1) { diffAndSetStyle(this._radarTrack45, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS45, "visibility", "hidden"); }
if (radarTrackRange46 < 1) { diffAndSetStyle(this._radarTrack46, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS46, "visibility", "hidden"); }
if (radarTrackRange47 < 1) { diffAndSetStyle(this._radarTrack47, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS47, "visibility", "hidden"); }
if (radarTrackRange48 < 1) { diffAndSetStyle(this._radarTrack48, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS48, "visibility", "hidden"); }
if (radarTrackRange49 < 1) { diffAndSetStyle(this._radarTrack49, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS49, "visibility", "hidden"); }
if (radarTrackRange50 < 1) { diffAndSetStyle(this._radarTrack50, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS50, "visibility", "hidden"); }

if (radarTrackRange51 < 1) { diffAndSetStyle(this._radarTrack51, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS51, "visibility", "hidden"); }
if (radarTrackRange52 < 1) { diffAndSetStyle(this._radarTrack52, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS52, "visibility", "hidden"); }
if (radarTrackRange53 < 1) { diffAndSetStyle(this._radarTrack53, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS53, "visibility", "hidden"); }
if (radarTrackRange54 < 1) { diffAndSetStyle(this._radarTrack54, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS54, "visibility", "hidden"); }
if (radarTrackRange55 < 1) { diffAndSetStyle(this._radarTrack55, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS55, "visibility", "hidden"); }
if (radarTrackRange56 < 1) { diffAndSetStyle(this._radarTrack56, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS56, "visibility", "hidden"); }
if (radarTrackRange57 < 1) { diffAndSetStyle(this._radarTrack57, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS57, "visibility", "hidden"); }
if (radarTrackRange58 < 1) { diffAndSetStyle(this._radarTrack58, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS58, "visibility", "hidden"); }
if (radarTrackRange59 < 1) { diffAndSetStyle(this._radarTrack59, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS59, "visibility", "hidden"); }
if (radarTrackRange60 < 1) { diffAndSetStyle(this._radarTrack60, "visibility", "hidden");  diffAndSetStyle(this._radarTrackAS60, "visibility", "hidden"); }

	}

}
registerInstrument("fa18-hmd", F35_TSD);
//# sourceMappingURL=F35_TSD.js.map