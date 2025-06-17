

const addWallTypeBtn = document.getElementById('addWallType');
const wallTypes = document.getElementById('wallTypes');
let wallTypeCount = 0;
const wallValues =[];
let wallCount = 0;
let roofCount = 0;
let floorCount = 0;

const houseWalls = [];
const houseRoofs = [];
const houseFloors = [];
let floorSlabLoss = 0;
let floorSlabArea = 0;

let floorLoss = 0;
let floorArea = 0;
let roofOver = {};
let floorOver = {};
let wallOver = {};


let roofRefR = 0;
let wallRefR = 0;
let slabRefR = 0;
let floorRefR = 0;
let openingRefR = 0;
let skylightRefR = 0;


function addWallType() {
	
	if (wallTypeCount<4){
	
		wallTypeCount++;
		const newWallType = document.createElement('div');
		newWallType.id = 'wallType' + wallTypeCount;
		newWallType.innerHTML = `
		
			<div class="wall">
		
				<div class="nextTo">
				
					<p class="itemName" style="margin-right:20px;"> Wall Type ${wallTypeCount} </p>
					
					<div>
						<input type="radio" id="external${wallTypeCount}" name="location${wallTypeCount}" value="external" onchange="calcWallR(${wallTypeCount})" checked="checked">
						<label for="external${wallTypeCount}">External</label>
						<input type="radio" id="internal${wallTypeCount}" name="location${wallTypeCount}" value="internal" onchange="calcWallR(${wallTypeCount})">
						<label for="internal${wallTypeCount}">Internal</label>
					</div>
				</div>		
				
					<br>
					
					<div class="nextTo" style='margin-bottom:14px;'>
					
						<div class="sides" style="width:176px;">
							<label for="claddingType${wallTypeCount}">Cladding</label>
							<br>
							<select style="width:176px;" id="claddingType${wallTypeCount}" name="claddingType${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
								<option value="Brick">Brick 70mm</option>
								<option value="Timber Weatherboards">Timber Weatherboards</option>
								<option value="AAC">AAC 50mm</option>
								<option value="Ply">Ply 12mm</option>
								<option value="Fibre Cement">Fibre Cement Sheet</option>
								<option value="Fibre Cement">Fibre Cement Weatherboards</option>
								<option value="Other">Other</option>
							</select>
						</div>
					
						<div>
							<label for="rValue${wallTypeCount}">Insulation</label>
							<br>
							
							<span class="rLabel">R</span><input class="rValue" type="number" id="rValue${wallTypeCount}" name="rValue${wallTypeCount}" step="0.1" min="1.8" max="5" onchange="updateRoundedValue('rValue${wallTypeCount}'); calcWallR(${wallTypeCount})">
						</div>
					
						
					
						<div class="nextTo">
					
						<div style="width:52px; margin-left:23px">
							<br>
							<div style="display: flex; vertical-align: middle; align-items: center; justify-content: center; height:28px; margin-right: 8px;">
								<p>Stud -</p>
							</div>
						</div>
						
							<div class="sides1">
								<label for="stud${wallTypeCount}">Size</label>
								<br>
								<select id="stud${wallTypeCount}" name="stud${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
									<option value="90x45">90x45mm</option>
									<option value="90x90">90x90mm</option>
									<option value="140x45">140x45mm</option>
								</select>
							</div>
							
							<div class="sides1">
								<label for="studSpacing${wallTypeCount}">Spacing</label>
								<br>
								<select id="studSpacing${wallTypeCount}" name="studSpacing${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
									<option value="0.6">600mm Crs</option>
									<option value="0.4">400mm Crs</option>
								</select>
							</div>
							
							<div class="sides1">
								<label for="nogSpacing${wallTypeCount}">Nogs</label>
								<br>
								<select id="nogSpacing${wallTypeCount}" name="nogSpacing${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
									<option value="0.8">800mm Crs</option>
									<option value="0.4">400mm Crs</option>
								</select>
							</div>
							
							<br>
						</div>
					
					
						
						
					</div>
					
					<div id="airDiv${wallTypeCount}" class="sides" style="width:150px; margin-left:385px;">
							<label for="airBar${wallTypeCount}">Air Barrier</label>
							<br>
							<select style="width:150px;" id="airBar${wallTypeCount}" name="airBar${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
								<option value="flexUnder">Flexible Underlay</option>
								<option value="plyUnder">Plywood RAB</option>
								<option value="fcUnder">Fibre Cement RAB</option>
							</select>
					</div>
						
					
					<br>
					
					<div>
						<p id = "wallDets${wallTypeCount}"></p>
						<br id = "wallTypBr${wallTypeCount}" style = "display:none;">
					</div>
					
				</div>

		`;
		
		wallTypes.appendChild(newWallType);
		
		calcWallR(wallTypeCount);
		
	}

}



const addFloorBtn = document.getElementById('addFloor');

const lessFloorBtn = document.getElementById('lessFloor');


addFloorBtn.addEventListener('click', (event) => {
	event.preventDefault();
	addFloor();
});

lessFloorBtn.addEventListener('click', (event) => {
	event.preventDefault();
	lessFloor();
});


function addFloor() {
	
	if (floorCount<4){
	
		floorCount++;
		const newFloorType = document.createElement('div');
		newFloorType.id = 'floorType' + floorCount;
		newFloorType.classList.add('floor');
		newFloorType.innerHTML = `
		
			<div class="nextToA">
					<p class="itemName" style = "margin-right:20px;"> Floor Area ${floorCount}</p>
					
					<div>
						<span style="font-size:14pt;">(</span>
						<input type="checkbox" id="floorOvr${floorCount}" name="floorOvR${floorCount}" onchange="toggleFloorOver(floorCount, this.checked)"> 
						<label for="floorOvr">R-Value Override</label><span style="font-size:14pt;">)</span>
					</div>
				
			</div>	
			
			<br>
					
			<div class="nextTo">
				
					<div class="sides">
						<label for="floorArea${floorCount}">Area</label> <br>
						<input class="area" type="number" id="floorArea${floorCount}" name="floorArea${floorCount}" step="0.1" min="1" max="300" onchange="updateRoundedValue('floorArea${floorCount}'); calcFloorR(${floorCount})"><span class="units">m²</span>
					</div>
					
					<div id="floorOv${floorCount}" style="display:none;">
						<label for="floorOver${floorCount}">Construction</label> <br>
						<span class="rLabel">R</span><input class="rValue" type="number" id="floorOverR${floorCount}" name="floorOverR${floorCount}" step="0.1" min="1.0" max="8" onchange="updateRoundedValue('floorOverR${floorCount}'); calcFloorR(floorCount)">
					</div>
					
				
					<div class="sides" id="joistInsuOptions${floorCount}">
						<label for="floorR${floorCount}">Insulation</label> <br>
						<span class="rLabel">R</span><input class="rValue" type="number" id="floorR${floorCount}" name="2floorR${floorCount}" step="0.1" min="1.0" max="8" onchange="updateRoundedValue('floorR${floorCount}'); calcFloorR(${floorCount})">
					</div>
					
					
					<div class="nextTo" id="joistOptions${floorCount}" style="margin-bottom:14px;">
						
						<div style="width: 64px; margin-left:31px;">
							<br>
							
							<div style="display: flex; vertical-align: middle; align-items: center; justify-content: center; height:28px; margin-right: 8px;">
								<p>Joists - </p>
							</div>
							
						</div>
					
						
						<div class="sides1">
						
							<label for="joistSpec${floorCount}">Size</label>
							<br>
							<select id="joistSpec${floorCount}" name="joistSpec${floorCount}" onchange="calcFloorR(${floorCount})">
								
								<option value="190x45">190x45mm</option>
								<option value="140x45">140x45mm</option>
								<option value="240x45">240x45mm</option>
								<option value="90x45"> 90x45mm</option>
								<option value="290x45">290x45mm</option>
							</select>
							
						</div>
					
						<div class="sides1">
							<label for="joistSpacing${floorCount}">Spacing</label>
							<br>
							<select id="joistSpacing${floorCount}" name="joistSpacing${floorCount}" onchange="calcFloorR(${floorCount})">
								<option value="0.40">400mm Crs</option>
								<option value="0.45">450mm Crs</option>
								<option value="0.60">600mm Crs</option>
							</select>
						</div>
					
						<div class="sides1">
							
							<label for="lining${floorCount}">Lining Under</label>
							<br>
							<select id="floorLine${floorCount}" name="floorLine${floorCount}" onchange="calcFloorR(${floorCount})">
								<option value="none">None</option>
								<option value="plaster">Plasterboard</option>
								<option value="fcSheet">Fibre Cement Sheet</option>
								<option value="timber">Timber</option>
								<option value="other">Other</option>
							</select>
							
						</div>
						
						<br>
				
					</div>
					
					
				</div>
				
				
				<div class="nextTo">
				
					<div id="gapEnt${floorCount}" style="width:290px; flex-shrink: 0;">
						<div id="spaceEnt${floorCount}" style = "margin-left:156px;">
							<label for="airSpace${floorCount}">Still Air Space</label>
							 
							<br>
							<select id="airSpace${floorCount}" name="airSpace${floorCount}" onchange="calcFloorR(${floorCount})">

								<option value="0">None</option>
								<option value="13">13mm +</option>
								<option value="20">20mm +</option>
								<option value="40">40mm +</option>
								<option value="90">90mm +</option>
							</select>
						</div>
					</div>

					
					
					
					
					<div class="nextTo" id="subFOpt${floorCount}">
						
						<div style="width: 80px; margin-left:14px;">
							<br>
							
							<div style="display: flex; vertical-align: middle; align-items: center; justify-content: center; height:28px; margin-right: 8px;">
								<p>Subfloor - </p>
							</div>
							
						</div>
					
					
					
						<div class="sides1">
							<label for="periType${floorCount}">Enclosure</label>
							<br>
							<select id="periType${floorCount}" name="periType${floorCount}" onchange="calcFloorR(${floorCount})">
								<option value="open">Open</option>
								<option value="open">Skirting Boards</option>
								<option value="closed">Foundation Wall</option>
							</select>
						</div>
						
						<div class="sides1" style="display:none;" id="heightEnt${floorCount}">
							<label for="subHeight">Height</label>
							<br>
							<input class="distance" type="number" id="subHeight${floorCount}" name="subHeight${floorCount}" min="0.1" max="3" step="0.1" onchange="updateRoundedValue('subHeight${floorCount}'); calcFloorR(${floorCount})"><span class="units">m</span>
						</div>
						
						<div class="sides1" style="display:none;" id="periEnt${floorCount}">
							<label for="floorPerimeter" style="display: inline-block; width: 120px;">Perimeter length</label>
							<br>
							<input class="distance" type="number" id="floorPerimeter${floorCount}" name="floorPerimeter${floorCount}" min="1" max="200" step="0.1" onchange="updateRoundedValue('floorPerimeter${floorCount}'); calcFloorR(${floorCount})"><span class="units">m</span>
						</div>
					
					
					</div>
					
					
					
					
				</div>
				
				<br>
				
				<div class = "nextTo">
					
						<div class = "nextTo" style = "width:500px;">
						
							<p id="floorDets${floorCount}"> </p> 
							
						</div>
						

						<div class = "outPut">
							
							<div class = "lossLabel">
								<p id="fLabel${floorCount}"></p>
							</div>
							
							<div class = "resDiv">
								<p id="floorResult${floorCount}"></p> 
							</div>
							
						</div>
					
				</div>	
				
			
			<br id = "floorBr${floorCount}" style = "display:none;">
								
		`;
		
		floorTypes.appendChild(newFloorType);
		
		const floor = new Floor(0, 0, []);
	
		console.log("a new floor has been created " + floor)
		houseFloors.push(floor);
		
		console.log("Floor area " + floor.floorArea);
		console.log("Floor R " + floor.floorR);
		console.log("next");
		console.log("this here " + houseFloors[0].floorR);
		
		
		document.getElementById(`spaceEnt${floorCount}`).style.display = "none";
		
		const lessFloorBtn = document.getElementById(`lessFloor`);
		
		
		
		if(floorCount>1){
			lessFloorBtn.style.display = ""
		}
		else{
			lessFloorBtn.style.display = "none";
		}
		
		
	}

}









function addRoof() {
	
	if (roofCount<4){
	
		roofCount++;
		const newRoofType = document.createElement('div');
		newRoofType.id = 'roofType' + roofCount;
		newRoofType.classList.add('roof');
		newRoofType.innerHTML = `
		
			<div class="nextToA">
					<p class="itemName" style = "margin-right:20px;"> Roof Area ${roofCount}</p>
					
					<div>
						<span style="font-size:14pt;">(</span><input type="checkbox" id="roofOver" name="roofOver" onchange="toggleRoofOver(roofCount, this.checked)"> <label for="roofOver">R-Value Override</label><span style="font-size:14pt;">)</span>
					</div>
					
			</div>
			
			<div style="height:14px;" id="roofSpacer${roofCount}"></div>
			
			<div id="type${roofCount}" style="padding: 6px 0 6px 0;">
						<input type="radio" id="truss${roofCount}" name="roofType${roofCount}" value="truss" onchange="calcRoofR(${roofCount})" checked="checked">
						<label for="truss${roofCount}">Truss</label>	
					
						<input type="radio" id="rafter${roofCount}" name="roofType${roofCount}" value="rafter" onchange="calcRoofR(${roofCount})">
						<label for="rafter${roofCount}">Rafter</label>
			</div>	
			
			
			
			

					
			<div class="nextTo">
				
					<div class="sides">
						<label for="roofArea${roofCount}">Area</label> <br>
						<input class="areaA" type="number" id="roofArea${roofCount}" name="roofArea${roofCount}" step="0.1" min="1" max="300" onchange="updateRoundedValue('roofArea${roofCount}'); calcRoofR(${roofCount})"><span class="units">m²</span>
					</div>
					
					<div id="roofOver${roofCount}" style="display:none;">
						<label for="roofOver${roofCount}">Construction</label> <br>
						<span class="rLabel">R</span><input class="rValueA" type="number" id="roofOverR${roofCount}" name="roofOverR${roofCount}" step="0.1" min="1.8" max="8" onchange="updateRoundedValue('roofOverR${roofCount}'); calcRoofR(roofCount)">
					</div>
					
						
					<div id="trussOps${roofCount}">
					
						<div class="nextTo" id="insuEnter${roofCount}">
						
							<div class="insu">
								<label for="btmR${roofCount}">Insulation</label> <br>
								<span class="rLabel">R</span><input class="rValueA" type="number" id="btmR${roofCount}" name="btmR${roofCount}" step="0.1" min="1.8" max="8" onchange="updateRoundedValue('btmR${roofCount}'); calcRoofR(${roofCount})">
								<p class="insuTxt"> layer 1</p>
							</div>
							
							<div class="insu">
								<br>
								<span class="rLabel">R</span><input class="rValueA" type="number" id="topR${roofCount}" name="topR${roofCount}" step="0.1" min="1.8" max="8" onchange="updateRoundedValue('topR${roofCount}'); calcRoofR(${roofCount})">
								<p class="insuTxt"> layer 2</p>
							</div>
							
						</div>
						
					</div>
					
				
					<div class="sides" id="rafterInsuOptions${roofCount}">
						<label for="roofR${roofCount}">Insulation</label> <br>
						<span class="rLabel">R</span><input class="rValueA" type="number" id="roofR${roofCount}" name="2roofR${roofCount}" step="0.1" min="1.8" max="8" onchange="updateRoundedValue('roofR${roofCount}'); calcRoofR(${roofCount})">
					</div>
					
					
					<div class="nextTo" id="rafterOptions${roofCount}" style="margin-bottom:14px;">
						
						<div style="width: 64px; margin-left:31px;">
							<br>
							
							<div style="display: flex; vertical-align: middle; align-items: center; justify-content: center; height:28px; margin-right: 8px;">
								<p>Rafter - </p>
							</div>
							
						</div>
					
						
						<div class="sides1">
						
							<label for="rafterSpec${roofCount}">Size</label>
							<br>
							<select class="selA" id="rafterSpec${roofCount}" name="rafterSpec${roofCount}" onchange="calcRoofR(${roofCount})">
								<option value="90x45"> 90x45mm</option>
								<option value="140x45">140x45mm</option>
								<option value="190x45">190x45mm</option>
								<option value="240x45">240x45mm</option>
							</select>
							
						</div>
					
						<div class="sides1">
							<label for="rafterSpacing${roofCount}">Spacing</label>
							<br>
							<select class="selA" id="rafterSpacing${roofCount}" name="rafterSpacing${roofCount}" onchange="calcRoofR(${roofCount})">
								<option value="0.4">400mm Crs</option>
								<option value="0.6">600mm Crs</option>
								<option value="0.9">900mm Crs</option>
							</select>
						</div>
					
						<div class="sides1">
							<label for="roofNog${roofCount}">Blocking</label>
							<br>
							<select class="selA" id="roofNog${roofCount}" name="roofNog${roofCount}" onchange="calcRoofR(${roofCount})">
								<option value="null">None</option>
								<option value="0.4">400mm Crs</option>
								<option value="1.2">1200mm Crs</option>
								<option value="2.4">2400mm Crs</option>
							</select>
						</div>
				
					</div>
					
					
				</div>
				
				<br>
				
				
				
				<div class = "nextTo">
					
						<div class = "nextTo" style = "width:500px;">
						
							<p id="roofDets${roofCount}"> </p> 
							<p id="roofDetsA${roofCount}"> </p> 
							
						</div>

						<div class = "outPut">
							
							<div class = "lossLabel">
								<p id="rLabel${roofCount}"></p>
							</div>
							
							<div class = "resDiv">
							<p id="roofResult${roofCount}"> </p> 
							</div>
							
						</div>
					
				</div>	
				
				
				<br id="roofBreak${roofCount}" style="display: none;">
				
				
				<div class="skyLights" id="skyBar${roofCount}">
					
					<div class="nextTo">
					
						<div style="width:86px;"></div>
						<div class="column"><p>Width<span class="unitsA"> (m)</span></p></div> 
						<div class="column"><p>Length<span class="unitsA"> (m)</span></p></div>
						<div class="column"><p>Area<span class="unitsA"> (m²)</span></p></div>
						<div class="columnS"><p>R</p></div>
					
					</div>
				
					<div id="skyLights${roofCount}">
				
					</div>
					
			</div>
				
			<div class="sides" style="margin-left:156px;">
			
				<button class="addSkylight" data-wall="${roofCount}">+ Skylight</button><button class="removeSkylight" style = "margin-left: 15px;" data-wall="${roofCount}" id="lessSky${roofCount}">- Skylight</button>
				
			</div>
			
			<br>
				
						
		`;
		
		roofTypes.appendChild(newRoofType);
		
		const roof = new Roof(0, 0, []);
	
		console.log("a new roof has been created " + roof)
		houseRoofs.push(roof);
		
		console.log("Roof area " + roof.roofArea);
		console.log("Roof R " + roof.roofR);
		console.log("next");
		console.log("this here " + houseRoofs[0].roofR);
		
		calcRoofR(roofCount);
		
		const skybar = document.getElementById(`skyBar${roofCount}`);
		const lessSkyBtn = document.getElementById(`lessSky${roofCount}`);
		
		skybar.style.display = "none";
		
		lessSkyBtn.style.display = "none";
		
		const lessRoofBtn = document.getElementById(`lessRoof`);
		
		if(roofCount>1){
			lessRoofBtn.style.display = ""
		}
		else{
			lessRoofBtn.style.display = "none";
		}
		
		
	}

}



function lessFloor(){
	
	
	if(floorCount > 1){
		const floorToRemove = document.getElementById('floorType' + floorCount);
		
		floorTypes.removeChild(floorToRemove);
		
		console.log(floorToRemove + ' removed');
		
		floorCount--;
		
		
		houseFloors.pop();
		
		
		console.log(houseFloors);
		
		refBuilding();
		
		
		const lessFloorBtn = document.getElementById(`lessFloor`);
		
		if(floorCount == 1){
			lessFloorBtn.style.display = "none";
		}
		
		
	}
	
}




function calcFloorR(floorNumber){
	
	const Ops = document.getElementById(`joistOptions${floorNumber}`);
	
	const floorArea = Number((document.getElementById(`floorArea${floorNumber}`)).value);
	
	let floorRvalue = 0;
	let subSpaceR = 0;
	let flrLoss = 0;
	let apRatio = 0;
	let lingingR = 0;
	let airSpaceR = 0;
	
	let framingRatio, insuRatio;
	
	
	const joistSelect = document.getElementById(`joistSpec${floorNumber}`);
	const spaceSelect = document.getElementById(`joistSpacing${floorNumber}`);
	const insuSelect = document.getElementById(`floorR${floorNumber}`);
	const periSelect = document.getElementById(`floorPerimeter${floorNumber}`);
	const closeSelect = document.getElementById(`periType${floorNumber}`);
	const heightEnt = document.getElementById(`heightEnt${floorNumber}`);
	const heightSelect = document.getElementById(`subHeight${floorNumber}`);
	const liningSelect = document.getElementById(`floorLine${floorNumber}`);
	const airOpt = document.getElementById(`spaceEnt${floorNumber}`);
	const airSelect = document.getElementById(`airSpace${floorNumber}`);
	const insuEntSelect = document.getElementById(`joistInsuOptions${floorNumber}`);
	const joistOptSelect = document.getElementById(`joistOptions${floorNumber}`);
	
	const floorBr = document.getElementById(`floorBr${floorNumber}`);
	
	const subOptSelect = document.getElementById(`subFOpt${floorNumber}`);
	
	const overSelect = document.getElementById(`floorOv${floorNumber}`);
	const overRide = (document.getElementById(`floorOverR${floorNumber}`)).value;
	const gapSelect = document.getElementById(`gapEnt${floorNumber}`);
	
	console.log("override R val =" + overRide);
	console.log("And Type =" + typeof(overRide));
	
	
	const periEnt = document.getElementById(`periEnt${floorNumber}`);
	
	console.log("Checking this ----" + airOpt);
	
	console.log("joist check " + joistSelect.value);
	
	let joistWidth, joistThick, joistSpacing, insuR, rFramingRvalue, rFramingLayer, periLen, enclose, subR, subHeight, lining, airSpace;
	
	
	if(floorOver[floorNumber] === 'yes'){
		insuEntSelect.style.display = "none";
		joistOptSelect.style.display = "none";
		subOptSelect.style.display = "none";
		gapSelect.style.display = "none";
		overSelect.style.display = "";
		
		floorRvalue = Number(overRide);
		console.log("what is the Rvalue here " + floorRvalue);
	}
	else{
		insuEntSelect.style.display = "";
		joistOptSelect.style.display = "";
		subOptSelect.style.display = "";
		gapSelect.style.display = "";
		overSelect.style.display = "none";
		
	
	
	
	
	
	
	if (joistSelect.value === '90x45'){
		joistWidth = 0.090;
		joistThick = 0.045;
	}
	else if (joistSelect.value === '140x45'){
		joistWidth = 0.140;
		joistThick = 0.045;
	}
	else if (joistSelect.value === '190x45'){
		joistWidth = 0.190;
		joistThick = 0.045;
	}
	else if (joistSelect.value === '240x45'){
		joistWidth = 0.240;
		joistThick = 0.045;
	}
	else if (joistSelect.value === '290x45'){
		joistWidth = 0.290;
		joistThick = 0.045;
	}
	

	joistSpacing = spaceSelect.value;
	insuR = Number(insuSelect.value);
	periLen = Number(periSelect.value);
	enclose = closeSelect.value;
	subHeight = Number(heightSelect.value);
	lining = liningSelect.value;
	airSpace = airSelect.value;
	
	
	
	
	console.log("the lining under is ---" + lining);
	
	
	if (lining == 'none'){
		airOpt.style.display = "none";
		liningR = 0;
		console.log("there is no lining, and the R" + liningR);
	}
	else {
		airOpt.style.display = "";
		
		if (lining == 'plaster'){
			liningR = 0.04;
			console.log("the data type is ---" + typeof liningR)
			console.log("the lining is Plaster, and the R" + liningR);
		}
		else if (lining == 'fcSheet'){
			liningR = 0.02;
			console.log("the data type is ---" + typeof liningR)
			console.log("the lining is Fibre Cement, and the R" + liningR);
		}
		else if (lining == 'timber'){
			liningR = 0.07;
			console.log("the data type is ---" + typeof liningR)
			console.log("the lining is Timber, and the R" + liningR);
		}
		else if (lining == 'other'){
			liningR = 0.02;
			console.log("the data type is ---" + typeof liningR)
			console.log("the lining is Other, and the R" + liningR);
		}
		
		
		if (airSpace == 13){
		airSpaceR = 0.15;
		}
		else if (airSpace == 20){
			airSpaceR = 0.17;
		}
		else if (airSpace == 40){
			airSpaceR = 0.19;
		}
		else if (airSpace == 90){
			airSpaceR = 0.20;
		}
		
		
		
	}
	

	if (periLen > 0){
		apRatio = (floorArea/periLen).toFixed(1);
	}
	
	subR = 0;
	console.log("Data types");
	console.log(typeof subR);
	console.log(typeof floorArea);
	console.log(typeof periLen); 
	console.log(typeof subHeight); 
	
	if (enclose != 'open'){
		
		heightEnt.style.display = "";
		
		periEnt.style.display = "";
		
		
		
		if (subHeight > 0 && periLen >0) {
			
			if (subHeight < 0.5 ){
				subHeight = 0.5;
			}
			else if ( subHeight > 1.1){
				subHeight = 1.1;
			}
			
			console.log("why is this code running?????");
		
			subR = ((floorArea/periLen)*0.1)*(-0.9*subHeight+1.45);
			
		}
		
	}
	else{
		heightEnt.style.display = "none";
		periEnt.style.display = "none";
	}
	
	console.log ("Subfloor Thermal resistance = " + subR);
	console.log ("R-Val of subfloor space = " + subSpaceR);
	
	insuRatio = (joistSpacing-joistThick)/joistSpacing;
	
	framingRatio = 1 - insuRatio;
	
	console.log("joist width " + joistWidth);
	console.log("joist thickness " + joistThick);
	console.log("joist spacing " + joistSpacing);
	console.log("insulation R-Value " + insuR);
	console.log("Timber Floor Perimeter Length " + periLen);
	console.log("Edge type " + enclose);
	console.log("A/P " + apRatio);
	
	console.log("Joist insu ratio" + insuRatio);
	console.log("Joist frame ratio" + framingRatio);
	
	rFramingRvalue = joistWidth/0.12;
	
	console.log("check this right here" + typeof framingRatio, framingRatio, typeof rFramingRvalue, rFramingRvalue, typeof insuRatio, insuRatio, typeof insuR, insuR, typeof airSpaceR, airSpaceR);
	
	rFramingLayer = 1/((framingRatio/(rFramingRvalue))+(insuRatio/(insuR + airSpaceR)));
	
	console.log("the lining R added is --" +liningR);
	
	floorRvalue = 0.09 + 0.14 + rFramingLayer + liningR + subR + 0.03;
	floorRvalue = floorRvalue.toFixed(2);

}
	
	console.log("Joist floor has an R value of " + floorRvalue);
	
	
	flrLoss = (floorArea / floorRvalue).toFixed(2);
	console.log(flrLoss + "Floor loss W/C");
		
	
	console.log("The R value of this floor is " + floorRvalue);
	
	console.log("the floor num is " + floorNumber);
	
	houseFloors[(floorNumber-1)].floorR = Number (floorRvalue);
	houseFloors[(floorNumber-1)].floorArea = Number (floorArea);
	
	console.log("The R value saved in the array is " + houseFloors[floorNumber-1].floorR + " And the area is " + houseFloors[floorNumber-1].floorArea);
	
	let framePrt = (framingRatio*100).toFixed(1);
	let insuPrt = (insuRatio*100).toFixed(1);
	
	if (floorArea > 0 && floorRvalue != null && floorRvalue > 0){
		
		
		if (floorOver[floorNumber] === 'yes'){
			document.getElementById(`floorDets${floorNumber}`).innerHTML = `&nbsp;R${floorRvalue}`;
			
			document.getElementById(`fLabel${floorNumber}`).innerHTML = `Heat Loss =`;
			document.getElementById(`floorResult${floorNumber}`).innerHTML = `&nbsp;${flrLoss}<span class="resUnits">W/°C</span>`;
			
			floorBr.style.display = '';
		}
		
		else if (apRatio > 0 && enclose != 'open'){
			document.getElementById(`floorDets${floorNumber}`).innerHTML = `&nbsp;A/P Ratio ${apRatio} | R${floorRvalue} | Framing ${framePrt}% | Insulation ${insuPrt}%`;
		
			document.getElementById(`fLabel${floorNumber}`).innerHTML = `Heat Loss =`;
			document.getElementById(`floorResult${floorNumber}`).innerHTML = `&nbsp;${flrLoss}<span class="resUnits">W/°C</span>`;
			floorBr.style.display = '';
		}
		
		else {
			document.getElementById(`floorDets${floorNumber}`).innerHTML = `&nbsp;R${floorRvalue} | Framing ${framePrt}% | Insulation ${insuPrt}%`;
		
			document.getElementById(`fLabel${floorNumber}`).innerHTML = `Heat Loss =`;
			document.getElementById(`floorResult${floorNumber}`).innerHTML = `&nbsp;${flrLoss}<span class="resUnits">W/°C</span>`;
			floorBr.style.display = '';
		}
		
	}
	else{
		document.getElementById(`floorDets${floorNumber}`).innerHTML = ``;
		document.getElementById(`fLabel${floorNumber}`).innerHTML = ``;
		document.getElementById(`floorResult${floorNumber}`).innerHTML = ``;
		floorBr.style.display = 'none';
	}
	
	console.log("the air space is " + airSpace);
	console.log("***the air space R is " + airSpaceR);
	console.log(typeof airSpaceR);
	
	
	
	
	refBuilding();
	
	
}






const addRoofBtn = document.getElementById('addRoof');

const lessRoofBtn = document.getElementById('lessRoof');



roofs.addEventListener('click', (event) => {
	const target = event.target;

	if (target.classList.contains('addSkylight')) {
		event.preventDefault();
		const roofNum = target.getAttribute('data-wall');
		const skylights = document.getElementById(`skyLights${roofNum}`);
		const skyCount = skylights.childElementCount + 1;
		
		
		if (skyCount < 5){
			const newSkylight = document.createElement('div');
			newSkylight.id = `sky${roofNum}_${skyCount}`;
			newSkylight.classList.add('skylight');
			newSkylight.innerHTML = `
				<div class="nextTo">
					<div style=" height:28px; display:flex; width:86px; justify-content:center; align-items:center; margin: 0px 0px 5px 0px;">
						<p> Skylight ${skyCount} - </p>
					</div>
					<input class="distanceOp" style="border-radius: 6px 0px 0px 6px;" type="number" id="skyWidth${roofNum}_${skyCount}" name="skyWidth${roofNum}_${skyCount}" max="4" maxlength="3" step="0.1" placeholder="0.0" onchange="updateRoundedValue('skyWidth${roofNum}_${skyCount}'); calcSkylight(${roofNum}, ${skyCount})">
					<input class="distanceOp" type="number" id="skyLen${roofNum}_${skyCount}" name="skyLen${roofNum}_${skyCount}" max="4" step="0.1" placeholder="0.0" onchange="updateRoundedValue('skyLen${roofNum}_${skyCount}'); calcSkylight(${roofNum}, ${skyCount})">
					<div class="areaOp">
						<p id = "areaLossA${roofNum}_${skyCount}"> </p>
					</div>
					
					<input class="rValueOp" type="number" id="skyR${roofNum}_${skyCount}" name="skyR${roofNum}_${skyCount}" max="1.1" step="0.01" value="0.35" onchange="calcSkylight(${roofNum}, ${skyCount})">
					
					
					<div class="skyResult">
						
						<div class = "outPut">
						
							<div class = "resDiv" style="margin-left:142px;">
								<p id = "areaLossB${roofNum}_${skyCount}"> </p>
							</div>
							
						</div>
							
					</div>
					
					
				</div>
				
			`;
			
			skylights.appendChild(newSkylight);
			
			const skylight = new Skylight(0, 0);
			(houseRoofs[(roofNum-1)].skylights).push(skylight);
			
			const skybar = document.getElementById(`skyBar${roofNum}`);
			const lessSky = document.getElementById(`lessSky${roofNum}`);
			
		
			lessSky.style.display = "";
			
			console.log(skybar);
		
			if (skyCount != null){
				
				skybar.style.display = "";
				
			}
			
		}

	}
	
});




roofs.addEventListener('click', (event) => {
	const target = event.target;

	if (target.classList.contains('removeSkylight')) {
			
		event.preventDefault();
		const roofNum = target.getAttribute('data-wall');
		const skylights = document.getElementById(`skyLights${roofNum}`);
		
		const skyCount = skylights.childElementCount;
		
		if(skyCount > 0){
			const skyToRemove = document.getElementById(`sky${roofNum}_${skyCount}`);
			
			skylights.removeChild(skyToRemove);
			
			
			
			(houseRoofs[(roofNum-1)].skylights).pop();
			
			calcRoofR(roofNum);
		
		}
		
		const skybar = document.getElementById(`skyBar${roofNum}`);
		const lessSky = document.getElementById(`lessSky${roofNum}`);
		
		if (skyCount === 1){
				
			skybar.style.display = "none";
			lessSky.style.display = "none";
	
		}
		
			
	}

	
	
});









addRoofBtn.addEventListener('click', (event) => {
	event.preventDefault();
	addRoof();
});

lessRoofBtn.addEventListener('click', (event) => {
	event.preventDefault();
	lessRoof();
});

function lessRoof(){
	
	
	if(roofCount > 1){
		const roofToRemove = document.getElementById('roofType' + roofCount);
		
		roofTypes.removeChild(roofToRemove);
		
		
		
		roofCount--;
		
		
		houseRoofs.pop();
		
		
		
		
		refBuilding();
		
		
		const lessRoofBtn = document.getElementById(`lessRoof`);
		
		if(roofCount == 1){
			lessRoofBtn.style.display = "none";
		}
		
		
	}
	
}










function calcRoofR(roofNumber){
	
	
	const typeSelect = document.getElementsByName(`roofType${roofNumber}`);
	const typeDivSelect = document.getElementById(`type${roofNumber}`);
	const insuEnter = document.getElementById(`insuEnter${roofNumber}`);
	const spaceDiv = document.getElementById(`roofSpacer${roofNumber}`);
	const roofOverR = document.getElementById(`roofOverR${roofNumber}`).value;
	const overSelect = document.getElementById(`roofOver${roofNumber}`);
	const trussOps = document.getElementById(`trussOps${roofNumber}`);
	const rafterOps = document.getElementById(`rafterOptions${roofNumber}`);
	const rafterInsuOps = document.getElementById(`rafterInsuOptions${roofNumber}`);
	const roofArea = (document.getElementById(`roofArea${roofNumber}`)).value;
	
	
	let roofRvalue = 0;
	let framingRatio, insuRatio;
	
	if(roofOver[roofNumber] === 'yes'){
		typeDivSelect.style.display = "none";
		insuEnter.style.display = "none";
		spaceDiv.style.display = "";
		overSelect.style.display = "";
		
		roofRvalue = roofOverR
		
	}
	else{
		typeDivSelect.style.display = "";
		insuEnter.style.display = "";
		spaceDiv.style.display = "none";
		overSelect.style.display = "none";
	
		let roofType = '';
		for (let i = 0; i < typeSelect.length; i++) {
			if (typeSelect[i].checked) {
				roofType = typeSelect[i].value;
				break;
		}
	}
		
		
		
		if(roofType === 'truss') {
			
			rafterOps.style.display = "none";
			rafterInsuOps.style.display = "none";
			trussOps.style.display = "";
		
		} else {
			
			rafterOps.style.display = "";
			rafterInsuOps.style.display = "";
			trussOps.style.display = "none";
		}
		
		
		
		
		if (roofType === 'truss'){
			
			const insuBtmSelect = document.getElementById(`btmR${roofNumber}`);
			const insuTopSelect = document.getElementById(`topR${roofNumber}`);
			
			let framingRvalue, insuBtmR, insuTopR, frameInsuLayer;
			
			insuBtmR = Number(insuBtmSelect.value);
			insuTopR = Number(insuTopSelect.value);
			
			let chordWidth = 0.09;
			let chordThick = 0.045;
			let chordSpacing = 0.9;
			
			insuRatio = (chordSpacing-chordThick)/chordSpacing;
			
			framingRatio = (1 - insuRatio).toFixed(2);
			
			
			framingRvalue = chordWidth/0.12;
			
			frameInsuLayer = 1/((framingRatio/(framingRvalue + insuTopR))+(insuRatio/(insuBtmR + insuTopR)));
			
			roofRvalue = 0.09 + 0.04 + frameInsuLayer + 0.03 + 0.11;
			roofRvalue = roofRvalue.toFixed(2);
			
		}
		
		
		else if (roofType = 'rafter'){
			
			const rafterSelect = document.getElementById(`rafterSpec${roofNumber}`);
			const spaceSelect = document.getElementById(`rafterSpacing${roofNumber}`);
			const nogSelect = document.getElementById(`roofNog${roofNumber}`);
			const insuSelect = document.getElementById(`roofR${roofNumber}`);
			
			let rafterWidth, rafterThick, rafterSpacing, nogSpacing, nogQuan, insuR, rFramingRvalue, rFramingLayer;
			
			if (rafterSelect.value === '90x45'){
				rafterWidth = 0.090;
				rafterThick = 0.045;
			}
			else if (rafterSelect.value === '140x45'){
				rafterWidth = 0.140;
				rafterThick = 0.045;
			}
			else if (rafterSelect.value === '190x45'){
				rafterWidth = 0.190;
				rafterThick = 0.045;
			}
			else if (rafterSelect.value === '240x45'){
				rafterWidth = 0.240;
				rafterThick = 0.045;
			}
			
			rafterSpacing = spaceSelect.value;
			nogSpacing = nogSelect.value;
			insuR = insuSelect.value;
			
			if (nogSpacing != 'null'){
				insuRatio = ((rafterSpacing-rafterThick)*(nogSpacing-rafterThick))/(rafterSpacing*nogSpacing);
			}
			else if (nogSpacing === 'null'){
				insuRatio = (rafterSpacing-rafterThick)/rafterSpacing;
			}
			
			framingRatio = 1 - insuRatio;
			
			rFramingRvalue = rafterWidth/0.12;
			
			rFramingLayer = 1/((framingRatio/(rFramingRvalue))+(insuRatio/(insuR)));
			
			
			roofRvalue = 0.09 + 0.04 + rFramingLayer + 0.03;
			roofRvalue = roofRvalue.toFixed(2);
			
		
		}
	}
	
	houseRoofs[(roofNumber-1)].roofR = Number (roofRvalue);
	houseRoofs[(roofNumber-1)].roofArea = Number (roofArea);
	
	let framePrt = (framingRatio*100).toFixed(1);
	let insuPrt = (insuRatio*100).toFixed(1);
	
	const roofBreak = document.getElementById(`roofBreak${roofNumber}`);
	
	if(roofArea > 0){
		document.getElementById(`roofDetsA${roofNumber}`).innerHTML = `&nbsp; | Framing ${framePrt}% | Insulation ${insuPrt}%`;
		roofBreak.style.display = '';
	}
	else{
		document.getElementById(`roofDetsA${roofNumber}`).innerHTML = ``;
		roofBreak.style.display = 'none';
	}
	
	
	updateRoofResults();
	
	
}


function calcSkylight(roofNumber, skyNumber){
	
	const widthInput = document.getElementById(`skyWidth${roofNumber}_${skyNumber}`);
	const skyWidth = Number(widthInput.value);
	const lengthInput = document.getElementById(`skyLen${roofNumber}_${skyNumber}`);
	const skyLength = Number(lengthInput.value);
	
	let skyArea = (skyWidth*skyLength).toFixed(2);
	
	houseRoofs[(roofNumber-1)].skylights[(skyNumber-1)].skylightArea = skyArea;
	
	const skyRInput = document.getElementById(`skyR${roofNumber}_${skyNumber}`);
	let skyR = Number(skyRInput.value);
	
	houseRoofs[(roofNumber-1)].skylights[(skyNumber-1)].skylightR = skyR;
	
	
	calcRoofR(roofNumber);
		
		
	
}



const addWallBtn = document.getElementById('addWall');
const lessWallBtn = document.getElementById('lessWall');

const building = document.getElementById('building');


function addWall() {
    wallCount++;
    const newWall = document.createElement('div');
    newWall.id = 'wall' + wallCount;
    newWall.innerHTML = `
	
		<div class="wall">
			<div class = "nextToA">
				<p class="itemName" style="margin-right:20px;"> Wall ${wallCount} </p>
				
				<div>
					<span style="font-size:14pt;">(</span><input type="checkbox" id="wallOver" name="wallOver" onchange="toggleWallOver(wallCount, this.checked)"> <label for="wallOver">R-Value Override</label><span style="font-size:14pt;">)</span>
				</div>
				
			</div>
			
			<br>
			<div class="nextTo">
			
			
				<div class="nextTo" id = "wallDimsIn${wallCount}">
					<div class="sides">
						<label for="length${wallCount}">Length</label>
						<br>
						<input class="distanceA" type="number" id="length${wallCount}" name="length${wallCount}" max="40" step="0.1" onchange="updateRoundedValue('length${wallCount}'); wallArea(${wallCount})"><span class="units">m</span>
					</div>
					
					<div >
						<label for="height${wallCount}">Height</label>
						<br>
						<input class="distanceA" type="number" id="height${wallCount}" name="height${wallCount}" max="4" step="0.1" onchange="updateRoundedValue('height${wallCount}'); wallArea(${wallCount})"><span class="units">m</span>
					</div>
				</div>	
				
				
				<div class="nextTo" id="wallAreaIn${wallCount}">
				
					<div>
						<label for="wallAreaInp${wallCount}">Area</label> 
						<br>
						<div>
							<input class="areaA" type="number" id="wallAreaInp${wallCount}" name="wallAreaInp${wallCount}" min="1" max="300" step="0.1" onchange="updateRoundedValue('wallAreaInp${wallCount}'); wallArea(wallCount)"><span class="units">m²</span>
						</div>
						
					</div>
					
					
				</div>
				
				<div style ="width:20px;"></div>
				
				<div class = "sides" style = "width:113px; padding:17px 0 0 0;">
						<input type="checkbox" id="byArea${wallCount}" name="byArea${wallCount}" onchange="wallArea(${wallCount})">
						<label for="byArea${wallCount}">By Area</label>
				</div>
				
				<div id="checkSpacer${wallCount}" style = "width:156px; display:none;"></div>
				
				<div style="margin-left:0px;">
					<br>
					<select class="selA" id="whichWallType${wallCount}" name="whichWallType${wallCount}" onchange="wallArea(${wallCount})">
								<option value="0">Wall Type 1</option>
					</select>
				</div>
				
				<div id="wallOver${wallCount}" style="display:none;">
					<label for="wallOver">Construction</label> <br>
					<span class="rLabel">R</span><input class="rValueA" type="number" id="wallOverR${wallCount}" name="wallOverR${wallCount}" step="0.1" min="1.8" max="8" onchange="updateRoundedValue('wallOverR${wallCount}'); wallArea(wallCount)">
				</div>
				
			</div>
			
			<br>
			
			
			<div class="nextTo">
			
				<div class = "parameters">
						
					<p id="wDets${wallCount}"></p> 
				
							
				</div>
			
				<div class="outPut">
				
					<div class = "resSpace">
					</div>
					
					<div class = "lossLabel">
						<p id="wLabel${wallCount}"> </p>
					</div>
					
					<div class = "resDiv">
						<p id="result${wallCount}"> </p>
					</div>
				
				</div>
				
			</div>
			
			
			<br id = "winBr${wallCount}" style="display:none;">
			
			
			
			<div class="windows" id="winBar${wallCount}">
				
				<div class="nextTo">
					
					<div style="width:94px;"></div>
					<div class="column"><p>Width<span class="unitsA"> (m)</span></p></div> 
					<div class="column"><p>Height<span class="unitsA"> (m)</span></p></div>
					<div class="column"><p>Area<span class="unitsA"> (m²)</span></p></div>
					<div class="columnS"><p>R</p></div>
					
				</div>
			
				<div id="windows${wallCount}"></div>
			
			</div>
			
			
			
			<div style="margin-left:156px">
				<button class="addWindow" data-wall="${wallCount}">+ Joinery</button>
				<button class="removeWindow" data-wall="${wallCount}" id="lessWin${wallCount}">- Joinery</button>
			</div>
			
			<br>	

			
			
					
    `;
    
    building.appendChild(newWall);
	
	const wall = new Wall(0, 0, []);
	
	houseWalls.push(wall);
	
	const winbar = document.getElementById(`winBar${wallCount}`);
	const lessWinBtn = document.getElementById(`lessWin${wallCount}`);
		
		winbar.style.display = "none";
		lessWinBtn.style.display = "none";
		
	const lessWallBtn = document.getElementById(`lessWall`);
		
		if(wallCount>1){
			lessWallBtn.style.display = ""
		}
		else{
			lessWallBtn.style.display = "none";
		}
    
}




function wallArea(wallCount){
    
	let wallRV = 0;
	
    const lengthSelect = document.getElementById(`length${wallCount}`);
	const heightSelect = document.getElementById(`height${wallCount}`);
	const areaSelect = document.getElementById(`wallAreaInp${wallCount}`);
	const spacer = document.getElementById(`checkSpacer${wallCount}`);
	
	const overRval = document.getElementById(`wallOverR${wallCount}`).value;
	
	const byAreaCheck = document.getElementById(`byArea${wallCount}`);
	let byArea = false;
	
	if (byAreaCheck.checked) {
		byArea = true;
	} else {
		byArea = false;
	}
	
	
	const wallDimsIn = document.getElementById(`wallDimsIn${wallCount}`);
	const wallAreaIn = document.getElementById(`wallAreaIn${wallCount}`);
	
	
	if(byArea === true) {
		
		wallDimsIn.style.display = "none";
		wallAreaIn.style.display = "";
		spacer.style.display = "";
	
		
	
    } else {
		wallDimsIn.style.display = "";
		wallAreaIn.style.display = "none";
		spacer.style.display = "none";
    }
	
	
	
	
	
    
    const wallLength = Number(lengthSelect.value);
	const wallHeight = Number(heightSelect.value);
	const grossWallArea = Number(areaSelect.value);
	
	let wallArea = 0;
	
	if(byArea === false){
		wallArea = wallLength*wallHeight;
	}
	else {
		wallArea = grossWallArea; 
	}
	
	houseWalls[(wallCount-1)].wallArea = wallArea;
	
	const wallRInput = document.getElementById(`whichWallType${wallCount}`);
	const wallOverSel = document.getElementById(`wallOver${wallCount}`);
	
	
	if(wallOver[wallCount] === 'yes'){
		wallRInput.style.display = "none";
		wallOverSel.style.display = "";
		
		wallRV = overRval;
	}
	else{
		wallRInput.style.display = "";
		wallOverSel.style.display = "none";
	
		wallRV = Number(wallRInput.value);
	
	}
	
	houseWalls[(wallCount-1)].wallR = wallRV;
	
	updateResults();
	 
}

function roundOne(orgNum){
	let roundNum = orgNum.toFixed(1);
	return roundNum;
}

function roundTwo(orgNum){
	let roundNum = orgNum.toFixed(2);
	return roundNum;
}

function updateRoundedValue(inputId) {
    
    let inputElement = document.getElementById(inputId);

    
    let userValue = parseFloat(inputElement.value);

    
    if (!isNaN(userValue)) {
		
        let roundedValue = roundOne(userValue);

        
        inputElement.value = roundedValue;
    }
		
}


function updateRoundedValueA(inputId) {
    
    let inputElement = document.getElementById(inputId);

    
    let userValue = parseFloat(inputElement.value);

    
    if (!isNaN(userValue)) {
		
        let roundedValue = roundTwo(userValue);

        
        inputElement.value = roundedValue;
    }
		
}

function Opening(openingArea, openingR){
	this.openingArea = openingArea;
	this.openingR = openingR;
}

function Wall(wallArea, wallR, openings){
	this.wallArea = wallArea;
	this.wallR = wallR;
	this.openings = openings;
}

function House(floor, walls, roofs){
	this.floor = floor;
	this.walls = walls;
	this.roof = roofs;
}

function Skylight(skylightArea, skylightR){
	this.skylightArea = skylightArea;
	this.skylightR = skylightR;
}

function Roof(roofArea, roofR, skylights){
	this.roofArea = roofArea;
	this.roofR = roofR;
	this.skylights = skylights;
}

function Floor(floorArea, floorR){
	this.floorArea = floorArea;
	this.floorR = floorR;
}


function windowArea(wallNum, windowCount){
	
	const widthInput = document.getElementById(`width${wallNum}_${windowCount}`);
	const windowWidth = Number(widthInput.value);
	
	const heightInput = document.getElementById(`height${wallNum}_${windowCount}`);
	const windowHeight = Number(heightInput.value);
	
	const calcSelect = document.getElementById(`wArea${wallNum}_${windowCount}`);
	
	const areaSelect = document.getElementById(`winArea${wallNum}_${windowCount}`)
	const userArea = (areaSelect.value);
	
	const byAreaCheck = document.getElementById(`winByArea${wallNum}_${windowCount}`);
	
	let byArea = false;
	
	let windowArea = 0;
	
	if (byAreaCheck.checked) {
		byArea = true;
	
		widthInput.style.display = "none";
		heightInput.style.display = "none";
		calcSelect.style.display = "none";
		areaSelect.style.display = "";
		
		windowArea = userArea;
		
		if (userArea != null || userArea == 0){
			document.getElementById(`result${wallNum}_${windowCount}`).innerHTML = ``;
			
		}
	
	} else {
		byArea = false;
	
		widthInput.style.display = "";
		heightInput.style.display = "";
		calcSelect.style.display = "";
		areaSelect.style.display = "none";
	
		windowArea = (windowWidth*windowHeight).toFixed(2);
	
	}
	
	
	
	
	
	
	
	
	
	houseWalls[(wallNum-1)].openings[(windowCount-1)].openingArea = windowArea;
	
	
	const openRInput = document.getElementById(`openR${wallNum}_${windowCount}`);
	let openR = Number(openRInput.value);
	
	houseWalls[(wallNum-1)].openings[(windowCount-1)].openingR = openR;
	
	
	updateResults();
	
	
}

function updateResults(){
	
	const winBrSel = document.getElementById(`winBr${wallCount}`);
	
	
	const lessWallBtn = document.getElementById('lessWall');
	
	for (let i = 0; i < wallCount; i++){
		
		const winBrSel = document.getElementById(`winBr${i+1}`);
		
		let grossWallArea = houseWalls[i].wallArea;
		
		
		
		let openingCount = houseWalls[i].openings.length;
		
		
		let grossOpenArea = 0;
		
		for (let x = 0; x < openingCount; x++) {
			
			let openArea = Number(houseWalls[i].openings[x].openingArea);
			let openAreaPrint = openArea.toFixed(2);
			let openR = houseWalls[i].openings[x].openingR;
			let openingLoss = (openArea / openR).toFixed(2);
			
			grossOpenArea = grossOpenArea + openArea;
			
			
			if (openArea > 0){
				document.getElementById(`opArea${(i+1)}_${(x+1)}`).innerHTML = `${openAreaPrint}`;
				document.getElementById(`result${(i+1)}_${(x+1)}`).innerHTML = `${openingLoss}<span class="resUnits">W/°C</span>`;
			}
			
		}
		
		let nettWallArea = (grossWallArea - grossOpenArea).toFixed(2);
		let wallRVal = houseWalls[i].wallR;
		
		
		let wallLoss = (nettWallArea / wallRVal).toFixed(2);
		
		if (nettWallArea > 0){
			document.getElementById(`wDets${(i+1)}`).innerHTML = `Nett Area ${nettWallArea}m²`;
			document.getElementById(`wLabel${(i+1)}`).innerHTML = `Heat Loss =`;
			document.getElementById(`result${(i+1)}`).innerHTML = `${wallLoss}<span class="resUnits">W/°C</span>`;
			winBrSel.style.display = "";
		}
		else{
			winBrSel.style.display = "none";
			document.getElementById(`wDets${(i+1)}`).innerHTML = ``;
			document.getElementById(`wLabel${(i+1)}`).innerHTML = ``;
			document.getElementById(`result${(i+1)}`).innerHTML = ``;
			
		}
		
		refBuilding();
		
		
		
		
	}
	
}



function updateRoofResults(){
	
	let grossRoofArea = 0;
	
	
	for (let i = 0; i < roofCount; i++){
		
		grossRoofArea = houseRoofs[i].roofArea;
		
		let skyCount = houseRoofs[i].skylights.length;
		
		let grossSkyArea = 0;
		
		for (let x = 0; x < skyCount; x++) {
			
			let skyArea = Number(houseRoofs[i].skylights[x].skylightArea);
			let skyAreaPrint = skyArea.toFixed(2);
			let skyR = houseRoofs[i].skylights[x].skylightR;
			let skyLoss = (skyArea / skyR).toFixed(2);
			
			grossSkyArea = grossSkyArea + skyArea;
			
			if (skyArea > 0 && skyR > 0){
			document.getElementById(`areaLossA${(i+1)}_${(x+1)}`).innerHTML = ` ${skyAreaPrint}`;
			document.getElementById(`areaLossB${(i+1)}_${(x+1)}`).innerHTML = `${skyLoss}<span class="resUnits">W/°C</span>`;
			}
			else {
				document.getElementById(`areaLossA${(i+1)}_${(x+1)}`).innerHTML = ``;
				document.getElementById(`areaLossB${(i+1)}_${(x+1)}`).innerHTML = ``;		
			}
			
		}
		
		let nettRoofArea = (grossRoofArea - grossSkyArea).toFixed(2);
		let roofRVal = houseRoofs[i].roofR;
		
		let roofLoss = (nettRoofArea / roofRVal).toFixed(2);
		
		if (roofLoss > 0 && grossRoofArea > 0){
			
			document.getElementById(`roofDets${(i+1)}`).innerHTML = `Nett Area ${nettRoofArea}m² | R${roofRVal}`;
			document.getElementById(`rLabel${(i+1)}`).innerHTML = `Heat Loss =`;
			document.getElementById(`roofResult${(i+1)}`).innerHTML = `${roofLoss}<span class="resUnits">W/°C<span>`;
		}
		else{
			document.getElementById(`roofDets${(i+1)}`).innerHTML = ``;
			document.getElementById(`rLabel${(i+1)}`).innerHTML = ``;
			document.getElementById(`roofResult${(i+1)}`).innerHTML = ``;
			
		}
		
		refBuilding();
	}
	
	
	
}





function updateWinR() {
    const walls = document.querySelectorAll('[id^="wall"]');
    walls.forEach((wall) => {
        const windows = wall.querySelectorAll('[id^="window"]');
        windows.forEach((window) => {
            const openR = window.querySelector('input[id^="openR"]');
			openR.value = (document.getElementById('joinerySpec')).value;
			openR.dispatchEvent(new Event('change'));
			
        });
    });
}



	
function updateOptions(){

	
	const currentSelections =[];
		

	
	for (let i = 1; i <= wallCount; i++) {
		
		const selectType = document.getElementById(`whichWallType${i}`);
		
		const selectedOption = selectType.selectedIndex;
		currentSelections.push(selectedOption);
		
		let optionsNum = selectType.options.length;
		
		for (let x = optionsNum - 1; x >= 0; x--) {
			selectType.remove(x);
		}
		
		
		for (y = 1; y <= wallTypeCount; y++){
			const option = document.createElement('option');
			option.text = "Wall Type " + y + " - R" + wallValues[(y-1)];
			option.value = wallValues[(y-1)];
			selectType.appendChild(option);
		}
		
		selectType.value = selectType.options[currentSelections[(i-1)]].value;
		
		selectType.dispatchEvent(new Event('change'));
	
	}
	
	
}




addWall();


addWallType();



addRoof();


addFloor();








addWallBtn.addEventListener('click', (event) => {
	event.preventDefault();
	addWall();
	updateOptions();
});



lessWallBtn.addEventListener('click', (event) => {
	event.preventDefault();
	lessWall();
});



function lessWall(){
	
	if(wallCount > 1){
		const wallToRemove = document.getElementById('wall' + wallCount);
		
		building.removeChild(wallToRemove);
		
		wallCount--;
		
		houseWalls.pop();
		
		refBuilding();
		
		const lessWallBtn = document.getElementById(`lessWall`);
		
		if(wallCount==1){
			lessWallBtn.style.display = "none";
		}
		
	}
	
}





building.addEventListener('click', (event) => {
	const target = event.target;
	
	const typOpeningR = (document.getElementById('joinerySpec')).value;

	if (target.classList.contains('addWindow')) {
		event.preventDefault();
		const wallNum = target.getAttribute('data-wall');
		const windows = document.getElementById(`windows${wallNum}`);
		const windowCount = windows.childElementCount + 1;
		
		const newWindow = document.createElement('div');
		newWindow.id = `window${wallNum}_${windowCount}`;
		newWindow.innerHTML = `
			<div class="nextTo">
				<div style=" height:28px; display:flex; width:94px; justify-content:center; align-items:center; margin: 0px 0px 5px 0px;">
					<input class = "joineryNames" type="text" value = "Window ${windowCount}" maxlength="10"><span style="padding:0px 6px 0px 0px;">-</span>
				</div>
				
				<input class="distanceOp" style ="border-radius:6px 0px 0px 6px;" type="number" id="width${wallNum}_${windowCount}" name="width${wallNum}_${windowCount}" max="6" step="0.1" placeholder="0.0" onchange="updateRoundedValue('width${wallNum}_${windowCount}'); windowArea(${wallNum}, ${windowCount})">
				
				<input class="distanceOp" type="number" id="height${wallNum}_${windowCount}" name="height${wallNum}_${windowCount}" max="4" step="0.1" placeholder="0.0" onchange="updateRoundedValue('height${wallNum}_${windowCount}'); windowArea(${wallNum}, ${windowCount})">
				
				<div class="areaOp" id="wArea${wallNum}_${windowCount}">
						<p id="opArea${wallNum}_${windowCount}"> </p>
				</div>
				
				<input class="distanceOp" style="display: none; margin-left:164px;" type="number" id="winArea${wallNum}_${windowCount}" name="winArea${wallNum}_${windowCount}" max="300" step="0.01" placeholder="0.00" onchange="updateRoundedValueA('winArea${wallNum}_${windowCount}'); windowArea(${wallNum}, ${windowCount})">
				
				
				<input class="rValueOp" type="number" id="openR${wallNum}_${windowCount}" name="openR${wallNum}_${windowCount}" max="1.1" step="0.01" value="${typOpeningR}" onchange="windowArea(${wallNum}, ${windowCount})">
				
				
				
				
				<div class = "areaCheck">
					<input type="checkbox" id="winByArea${wallNum}_${windowCount}" name="winByArea${wallNum}_${windowCount}" onchange="windowArea(${wallNum}, ${windowCount})">
					<label for="winByArea${wallNum}_${windowCount}">By Area</label>
				</div>
				
				
				
				
				
				<div style="width:52px;"></div>
				
				
				<div class="opResult"> 
					
					<div class = "outPut">
					
						<div class = "resDiv">
							<p1 id="result${wallNum}_${windowCount}"> </p1>	
						</div>
						
					</div>
						
				</div>
				
				
				
			</div>
			
		`;
		
		
		windows.appendChild(newWindow);
		
		const opening = new Opening(0, 0);
		(houseWalls[(wallNum-1)].openings).push(opening);
		
		const winbar = document.getElementById(`winBar${wallNum}`);
		const lessWin = document.getElementById(`lessWin${wallNum}`);
		
			if (windowCount != null){
				
				winbar.style.display = "";
				lessWin.style.display = "";
				
			}
		
		
		
	}
	
});




building.addEventListener('click', (event) => {
	const target = event.target;

	if (target.classList.contains('removeWindow')) {
		event.preventDefault();
		const wallNum = target.getAttribute('data-wall');
		const windows = document.getElementById(`windows${wallNum}`);
		const windowCount = windows.childElementCount;
		
		
		if(windowCount > 0){
			const windowToRemove = document.getElementById(`window${wallNum}_${windowCount}`);
			
			windows.removeChild(windowToRemove);
			
			(houseWalls[(wallNum-1)].openings).pop();
			
			if(windowCount == 1){
				const joineryHead = document.getElementById(`winBar${wallNum}`)
				const lessBtn = document.getElementById(`lessWin${wallNum}`)
				lessBtn.style.display = "none";
				joineryHead.style.display = "none";
				
			}
			
			refBuilding();
			
			
			updateResults();
			
			
			
			
		}
		
		if (windowCount > 0 ){
				
				winbar.style.display = "";
				
			}
		
		
	}
	
	

});










let veneer = 'no';
let slabEdge = 0;
let underSlab = 0;



function toggle(attribute, checked){
	if(attribute === 'veneer'){
		veneer = checked ? 'yes' : 'no';
	}
	else if (attribute === 'edge'){
		slabEdge = checked ? 1 : 0;
	}
	else if (attribute === 'under'){
		underSlab = checked ? 1.2 : 0;
	}
	calcSlabR();
}

let slabOver = 'no';




function toggleOver(attribute, checked){
	if(attribute === 'over'){
		slabOver = checked ? 'yes' : 'no';
	}
	calcSlabR();
}



function toggleRoofOver(roofCount, checked){
	roofOver[roofCount] = checked ? 'yes' : 'no';
	calcRoofR(roofCount);
}


function toggleWallOver(wallCount, checked){
	wallOver[wallCount] = checked ? 'yes' : 'no';
	wallArea(wallCount);
}

function toggleFloorOver(floorCount, checked){
	floorOver[floorCount] = checked ? 'yes' : 'no';
	calcFloorR(floorCount);
}


function calcSlabR() {
	
	const slabArea = (document.getElementById('slabArea')).value;
	const slabPerimeter = (document.getElementById('slabPerimeter')).value;
	
	const overrideSelect = (document.getElementById('slabOver'));
	const sTypeSelect = (document.getElementById('slabTypeD'));
	const slabFeaturesSelect = (document.getElementById('slabFeatures'));
	
	const sPeriSelect = (document.getElementById('sPeri'));
	const periNoteSelect = (document.getElementById('periNote'));
	
	let slabOverR = Number((document.getElementById('slabOverR')).value);
	
	
	
	if (slabOver == 'yes'){
		overrideSelect.style.display = "";
		sTypeSelect.style.display = "none";
		slabFeaturesSelect.style.display = "none";
		sPeriSelect.style.display = "none";
		periNoteSelect.style.display = "none";
	}
	else {
		overrideSelect.style.display = "none";
		sTypeSelect.style.display = "";
		slabFeaturesSelect.style.display = "";
		sPeriSelect.style.display = "";
		periNoteSelect.style.display = "";
	}
	
	
	let apRatio = 0;
	let slabRvalue = 0;


		const slabTypeSelect = document.getElementsByName(`type`);
		
		let slabType = '';
		for (let i = 0; i < slabTypeSelect.length; i++) {
			if (slabTypeSelect[i].checked) {
				slabType = slabTypeSelect[i].value;
				break;
				}
		}
		
		const underSlabSelect = document.getElementById(`underSlab`);
		
		const underLabel = document.querySelector(`label[for="underSlab"]`);
		
		if(slabType === 'raft') {
			underSlabSelect.style.display = "none";
			underLabel.style.display = "none";
		
		} else {
			underSlabSelect.style.display = "";
			underLabel.style.display = "";
		}
		
		
		
		
		
		
		
		apRatio = slabArea / slabPerimeter;
		apRatio = apRatio.toFixed(2);
		

	if (slabOver == 'yes'){
		slabRvalue = slabOverR;
	}
	else {

		if (slabType === "100mm"){
			
			if(veneer === "yes"){
				
				if(slabEdge === 0 && underSlab === 0){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 0.8;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 0.9;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.0;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.0;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.1;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.2;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.2;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.3;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 1.4;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 1.4;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 1.5;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 1.6;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 1.6;}
					
				}
				else if (slabEdge === 1 && underSlab === 0){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 0.9;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.0;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.1;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.1;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.2;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.3;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.3;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.4;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 1.5;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 1.6;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 1.6;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 1.7;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 1.8;}
					
				}
				else if (underSlab === 1.2 && slabEdge === 0){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.3;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.4;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.5;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.6;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.7;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.8;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.9;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 2.1;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 2.2;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 2.3;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 2.3;}
					
				}
				else if (slabEdge === 1 && underSlab === 1.2){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.4;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.5;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.6;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.7;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.8;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.9;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 2.1;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 2.2;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 2.3;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 2.3;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 2.4;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 2.5;}
				}
			
			}
			
			else {
				
				if(slabEdge === 0 && underSlab === 0){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 0.8;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 0.8;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 0.9;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 0.9;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.0;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.1;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.1;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.2;}	
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 1.2;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 1.3;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 1.4;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 1.4;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 1.5;}
				}
				
				else if (slabEdge === 1 && underSlab === 0){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.0;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.0;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.1;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.2;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.3;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.3;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.4;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.5;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 1.5;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 1.6;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 1.7;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 1.8;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 1.8;}
					
				}
				
				else if (underSlab === 1.2 && slabEdge === 0){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.1;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.2;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.3;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.4;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.5;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.5;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.6;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.7;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 1.8;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 1.8;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 1.9;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 2.9;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 2.1;}
					
				}
				
				else if (slabEdge === 1 && underSlab === 1.2){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.4;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.6;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.7;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.7;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.8;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.9;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 2.1;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 2.2;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 2.3;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 2.4;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 2.4;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 2.5;}
					
				}
				
			}
			

				

			
		}
		
		else if (slabType === "raft"){
			
			if(veneer === "yes"){
			
				if(slabEdge === 0){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.2;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.3;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.3;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.4;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.5;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.6;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.7;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.7;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 1.8;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 1.9;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 2.0;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 2.1;}
						
				}
				
				else if(slabEdge === 1){
					
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.3;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.4;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.4;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.5;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.6;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.7;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.8;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.9;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 2.1;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 2.2;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 2.2;}
			
				}
			}

			
			else{
					
				if(slabEdge === 0){
						
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.0;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.1;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.2;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.2;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.3;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.4;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.4;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.5;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 1.6;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 1.6;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 1.7;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 1.8;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 1.9;}
				}
				
				if(slabEdge === 1){
						
					if (apRatio>=1.6 && apRatio<1.8)
						{slabRvalue = 1.3;}
					else if (apRatio>=1.8 && apRatio<2.0)
						{slabRvalue = 1.4;}
					else if (apRatio>=2.0 && apRatio<2.2)
						{slabRvalue = 1.5;}
					else if (apRatio>=2.2 && apRatio<2.4)
						{slabRvalue = 1.5;}
					else if (apRatio>=2.4 && apRatio<2.6)
						{slabRvalue = 1.6;}
					else if (apRatio>=2.6 && apRatio<2.8)
						{slabRvalue = 1.7;}
					else if (apRatio>=2.8 && apRatio<3.0)
						{slabRvalue = 1.8;}
					else if (apRatio>=3.0 && apRatio<3.2)
						{slabRvalue = 1.9;}
					else if (apRatio>=3.2 && apRatio<3.4)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.4 && apRatio<3.6)
						{slabRvalue = 2.0;}
					else if (apRatio>=3.6 && apRatio<3.8)
						{slabRvalue = 2.1;}
					else if (apRatio>=3.8 && apRatio<4.0)
						{slabRvalue = 2.2;}
					else if (apRatio>=4.0 && apRatio<4.2)
						{slabRvalue = 2.3;}
				}
			}
			
		}
	}
		
		let slabLoss = 0;
		
		if(slabArea > 0 && slabRvalue > 0){
			slabLoss = (slabArea / slabRvalue).toFixed(2);
		}
		
		floorSlabLoss = Number(slabLoss);
		floorSlabArea = Number(slabArea);
		
		const slabBr = document.getElementById("slabBreak");
		
		if (slabLoss > 0 && slabLoss < 500 && slabArea <= 300) {
			
			
			document.getElementById("slabDets").innerHTML = "A/P Ratio " + apRatio + " | R" + slabRvalue.toFixed(1);
			document.getElementById("sLabel").innerHTML = "Heat Loss =";
			document.getElementById("slabResult").innerHTML = slabLoss + '<span class="resUnits">W/°C</span>';

			slabBr.style.display = '';

		}
		
		else {
			
			document.getElementById("slabDets").innerHTML = "";
			document.getElementById("sLabel").innerHTML = "";
			document.getElementById("slabResult").innerHTML = "";
			
			slabBr.style.display = 'none';
			
		}
		
		refBuilding();
	
	
}


addWallTypeBtn.addEventListener('click', (event) => {
	event.preventDefault();
	addWallType();
});

function calcWallR(wallTypeNumber) {
	
	const studSpecSelect = document.getElementById(`stud${wallTypeNumber}`);
	const studSpacingSelect = document.getElementById(`studSpacing${wallTypeNumber}`);
	const nogSpacingSelect = document.getElementById(`nogSpacing${wallTypeNumber}`);
	const insulationSelect = document.getElementById(`rValue${wallTypeNumber}`);
	const claddingSelect = document.getElementById(`claddingType${wallTypeNumber}`);
	const airBar = (document.getElementById(`airBar${wallTypeNumber}`)).value;
	const airDivSelect = document.getElementById(`airDiv${wallTypeNumber}`);
	const wallTypBr = document.getElementById(`wallTypBr${wallTypeNumber}`);
	
	
	
	const cladLabel = document.querySelector(`label[for='claddingType${wallTypeNumber}']`);
	
	const locationSelect = document.getElementsByName(`location${wallTypeNumber}`);
	let locationValue = '';
	for (let i = 0; i < locationSelect.length; i++) {
		if (locationSelect[i].checked) {
			locationValue = locationSelect[i].value;
			break;
			}
	}
	
	console.log("Also checking this" + claddingSelect);
	
	console.log("Check -" + claddingSelect);
	
	if(locationValue === 'internal') {
		claddingSelect.style.display = "none";
		cladLabel.style.display = "none";
		airDivSelect.style.display = "none";
	
    } else {
		claddingSelect.style.display = "";
		cladLabel.style.display = "";
		airDivSelect.style.display = "";
    }
	
	
	console.log("wall " + wallTypeNumber + "location " + locationValue);
	
	
	let studWidth, studThickness, nogQty, framingRvalue, framingLayer, cavityLayer, claddingLayer, wallRvalue, airBarR;
	
	if(airBar === 'flexUnder'){
		airBarR = 0;
	}
	else if (airBar === 'plyUnder'){
		airBarR = 0.05;
	}
	else if (airBar === 'fcUnder'){
		airBarR = 0.02;
	}
	
	console.log('the air barrier is ' + airBar + ' and it Rval is ' + airBarR);
	
	
	
	
	if(studSpecSelect.value === '90x45'){
		studWidth = 0.090;
		studThickness = 0.045;
	}
	else if (studSpecSelect.value === '90x90'){
		studWidth = 0.090;
		studThickness = 0.090;
	}
	else if (studSpecSelect.value === '140x45'){
		studWidth = 0.140;
		studThickness = 0.045;
	}
	
	
	if (nogSpacingSelect.value === '0.4'){
		nogQty = 7;
	}
	else if (nogSpacingSelect.value === '0.8'){
		nogQty = 4;
	}
	
	const studSpacing = Number(studSpacingSelect.value);
	const insulationRvalue = Number(insulationSelect.value);
	
	
	
	console.log("stud thickness" + studThickness);
	console.log("stud spacing" + studSpacing);
	console.log("Nog Quantity" + nogQty);
	console.log(studThickness*2.4);
	console.log(nogQty*(studSpacing*0.045));
	console.log(2.4*studSpacing);
	
	
	let insulationRatio = ((studSpacing-studThickness)*(2.4-nogQty*0.045))/(2.4*studSpacing);
	
	let insuPrint = (insulationRatio*100).toFixed(1);
	
	let framingRatio = 1 - insulationRatio;
	
	let framePrint = (framingRatio*100).toFixed(1);
	
	
	framingRvalue = studWidth/0.12;
	
	if (claddingSelect.value === "Brick"){
		claddingLayer = 0.03;
	}
	else if (claddingSelect.value === "Timber Weatherboards"){
		claddingLayer = 0.07;
	}
	else if (claddingSelect.value === "AAC"){
		claddingLayer = 0.14;
	}
	else if (claddingSelect.value === "Ply"){
		claddingLayer = 0.05;
	}
	else if (claddingSelect.value === "Fibre Cement"){
		claddingLayer = 0.02;
	}
	else if (claddingSelect.value === "Other"){
		claddingLayer = 0.01;
	}
	
	if(locationValue === 'internal') {
		framingLayer = 1/((framingRatio/(framingRvalue))+(insulationRatio/(insulationRvalue)));
		wallRvalue = 0.09 + 0.04 + framingLayer + 0.04 + 0.03;
	}
	else if (locationValue === 'external'){
		framingLayer = 1/((framingRatio/(framingRvalue+0.08))+(insulationRatio/(insulationRvalue+0.08)));
		wallRvalue = 0.09 + 0.04 + framingLayer + airBarR + claddingLayer + 0.03;
	}
	
	wallRvalue = wallRvalue.toFixed(2);
	
	let arrayRef = wallTypeNumber - 1;
	
	console.log("Wall R-Value - " + wallRvalue );
	console.log("Wall Type - " + wallTypeNumber);
	
	wallValues[arrayRef] = wallRvalue;
	
	console.log(wallValues);
	
	console.log("Wall " + wallTypeNumber);
	console.log("Framing " + framingRatio);
	console.log("Insulation " + insulationRatio);
	console.log(framingLayer);
	
	if (insulationRvalue > 0){
			
			wallTypBr.style.display = '';
			document.getElementById(`wallDets${wallTypeNumber}`).innerHTML = `Framing ${framePrint}% | Insulation ${insuPrint}% | R${wallRvalue}`;
		}
	else {
		wallTypBr.style.display = 'none';
		document.getElementById(`wallDets${wallTypeNumber}`).innerHTML = ``;
		
	}
	
	updateOptions();
	
}




function setClimate(){
	
	const climateSelect = document.getElementsByName(`zone`);
	
	let climateZone = '';
	for (let i = 0; i < climateSelect.length; i++) {
		if (climateSelect[i].checked) {
			climateZone = climateSelect[i].value;
			break;
			}
	}
	
	if (climateZone === '1'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.5;
		floorRefR = 2.5;
		openingRefR = 0.46;
		skylightRefR = 0.46;
	}
	else if (climateZone === '2'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.5;
		floorRefR = 2.5;
		openingRefR = 0.46;
		skylightRefR = 0.46;
	}
	else if (climateZone === '3'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.5;
		floorRefR = 2.5;
		openingRefR = 0.46;
		skylightRefR = 0.54;
	}
	else if (climateZone === '4'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.5;
		floorRefR = 2.8;
		openingRefR = 0.46;
		skylightRefR = 0.54;
	}
	else if (climateZone === '5'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.6;
		floorRefR = 3.0;
		openingRefR = 0.5;
		skylightRefR = 0.62;
	}
	else if (climateZone === '6'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.7;
		floorRefR = 3.0;
		openingRefR = 0.5;
		skylightRefR = 0.62;
	}
	
	refBuilding();
	
	console.log("Roof R" + roofRefR);
	console.log("Wall R" + wallRefR);
	console.log("Slab R" + slabRefR);
	console.log("Floor R" + floorRefR);
	console.log("opening R" + openingRefR);
	console.log("skylight R" + skylightRefR);	
	
}


function refBuilding (){
	
		console.log("refbuilding function has ran!!!!!!!!");
	
		let refLoss = 0;
		
		let grossWallArea = 0;
		let grossRoofArea = 0;
		let grossFloorArea = 0;
		
		for (let w = 0; w < wallCount; w++) {
			
			grossWallArea = grossWallArea + (houseWalls[w].wallArea);
			console.log("ref build wall area " + grossWallArea);	
		}
		
		let nettWallArea = grossWallArea * 0.7;
		let openingArea = grossWallArea * 0.3;
		
		let wallLoss = nettWallArea / wallRefR;
		
		let openingLoss = openingArea / openingRefR;
		
		console.log("Reference Building Wall loss " + wallLoss + " W/°C " + "Window Loss " + openingLoss + " W/°C ");
		
		for (let r = 0; r < roofCount; r++) {
			
			grossRoofArea = grossRoofArea + houseRoofs[r].roofArea;
			console.log("ref build roof area " + grossRoofArea);	
			
		}
		
		
		let roofLoss = 0;
		if(grossRoofArea > 0){
			roofLoss = grossRoofArea / roofRefR;
		}
		else {
			document.getElementById("refRoof").innerHTML = '';
			document.getElementById("roofVals").innerHTML = '';
		}
		
		console.log("Reference Building Roof loss " + roofLoss + " W/°C ");
		console.log(grossRoofArea);
		
	
		console.log('****floor slab area = ' + floorSlabArea + " slab ref R-val " + slabRefR);
		let refSlabLoss = floorSlabArea / slabRefR;
		
		console.log("Reference Building Slab loss " + refSlabLoss + " W/°C ");
		
		
		
		
		for (let r = 0; r < floorCount; r++) {
			
			grossFloorArea = grossFloorArea + houseFloors[r].floorArea;
			console.log("ref build floor area " + grossFloorArea);	
		}
		
		let refFloorLoss = grossFloorArea / floorRefR;
		
		console.log("Reference Building Floor loss " + refFloorLoss + " W/°C ");
		
		refLoss = Number((wallLoss + openingLoss + roofLoss + refSlabLoss + refFloorLoss).toFixed(2));
		
		console.log("Total ref building heat loss " + refLoss + " W/°C");
		
		
		
		
		
		
		
		if (refSlabLoss > 0 && refSlabLoss < 500){
			document.getElementById("refSlab").innerHTML = refSlabLoss.toFixed(2) + '<span class="resUnits">W/°C</span>';
			document.getElementById("slabVals").innerHTML = "= " + floorSlabArea.toFixed(1) + "m²" + " / " + "R" + slabRefR;
		}
		else{
			document.getElementById("refSlab").innerHTML ='';
			document.getElementById("slabVals").innerHTML ='';
		}
		
		if (refFloorLoss > 0 && refFloorLoss < 500){
			document.getElementById("refFloor").innerHTML = refFloorLoss.toFixed(2) + '<span class="resUnits">W/°C</span>';
			document.getElementById("floorVals").innerHTML = "= " + grossFloorArea.toFixed(1) + "m²" + " / " + "R" + floorRefR;
		}
		else{
			document.getElementById("refFloor").innerHTML = '';
			document.getElementById("floorVals").innerHTML = '';
		}
		
		
		if (roofLoss > 0 && roofLoss < 500){
			console.log("!!!!this shouldn't be happening");
			document.getElementById("refRoof").innerHTML = roofLoss.toFixed(2) + '<span class="resUnits">W/°C</span>';
			document.getElementById("roofVals").innerHTML = "= " + grossRoofArea.toFixed(1) + "m²" + " / " + "R" + roofRefR;
		}
		
		
		if (wallLoss > 0 && wallLoss < 500) {
			document.getElementById("refWalls").innerHTML = wallLoss.toFixed(2) + '<span class="resUnits">W/°C</span>';
			document.getElementById("wallVals").innerHTML = "= " + nettWallArea.toFixed(1) + "m²" + " / " + "R" + wallRefR.toFixed(1);
		}
		else{
			document.getElementById("refWalls").innerHTML = '';
			document.getElementById("wallVals").innerHTML = '';
		}
		
		
		if (openingLoss > 0 && openingLoss < 500){
			document.getElementById("refOpen").innerHTML = openingLoss.toFixed(2) + '<span class="resUnits">W/°C</span>';
			document.getElementById("openVals").innerHTML = "= " + openingArea.toFixed(1) + "m²" + " / " + "R" + openingRefR.toFixed(2);
		}
		else{
			document.getElementById("refOpen").innerHTML = '';
			document.getElementById("openVals").innerHTML = '';
		}
		
		if (refLoss > 0 && refLoss < 5000) {
			document.getElementById("refTot").innerHTML = refLoss + '<span class="resUnits">W/°C</span>';
		}
		else{
			document.getElementById("refTot").innerHTML = '';
		}
		
		


	proBuilding(refLoss);
	
}

function proBuilding(refLoss){
	
	let totalLoss = 0;
	let roofLossPrint = 0;
	let floorLossPrint = 0;
	let floorLoss = 0;
	let skyLossPrint = 0;
	let wallLossPrint = 0;
	let openingLossPrint = 0;
	
	let totWall = 0;
	let totJoin = 0;
	
	for (let i = 0; i < roofCount; i++){
		
		let grossRoofArea = Number(houseRoofs[i].roofArea);
		let skyCount = houseRoofs[i].skylights.length;		
		let grossSkyArea = 0;
	
		for (let x = 0; x < skyCount; x++) {
			
			let skyArea = Number(houseRoofs[i].skylights[x].skylightArea);
			let skyR = Number(houseRoofs[i].skylights[x].skylightR);
			let skyLoss = skyArea / skyR;
			
			skyLossPrint = skyLossPrint + skyLoss;
			
			totalLoss = totalLoss + skyLoss;
			grossSkyArea = grossSkyArea + skyArea;
		}
	
		let nettRoofArea = grossRoofArea - grossSkyArea;
		let roofRVal = Number(houseRoofs[i].roofR);
	
		let roofLoss = nettRoofArea / roofRVal;
		
		roofLossPrint = roofLossPrint + roofLoss;
		
		totalLoss = totalLoss + roofLoss;
		
		console.log("Roof - the total loss at this time is " + totalLoss);
	}	
	
	
	
	
	for (let i = 0; i < floorCount; i++){
		
		let nettFloorArea = Number(houseFloors[i].floorArea);
		console.log(nettFloorArea + "= nett Floor area");
		console.log(typeof(nettFloorArea));
	
		let floorRVal = Number(houseFloors[i].floorR);
		console.log(floorRVal + "= Floor R-Val");
		console.log(typeof(floorRVal));
	
		if (nettFloorArea > 0 && floorRVal > 0){
			console.log("hello hello");
			floorLoss = nettFloorArea / floorRVal;
			console.log(floorLoss);
		}
		
		console.log(floorLoss + "checking ()()(");
		console.log(floorLossPrint + "checking ()()(");
		
		floorLossPrint = floorLossPrint + floorLoss;
		
		console.log(floorLossPrint + "checking ()()(");
		
		console.log(floorLossPrint + "the floor loss to be printed")
		
		totalLoss = totalLoss + floorLoss;
		console.log("the total loss at this time is " + totalLoss);
	}	
	
	
	
	for (let i = 0; i < wallCount; i++){
		
		let grossWallArea = Number(houseWalls[i].wallArea);
		
		let openingCount = houseWalls[i].openings.length;
		
		let grossOpenArea = 0;
		
		for (let x = 0; x < openingCount; x++) {
			
			let openArea = Number(houseWalls[i].openings[x].openingArea);
			let openR = Number(houseWalls[i].openings[x].openingR);
			let openingLoss = openArea / openR;
			
			openingLossPrint = openingLossPrint + openingLoss;
			
			grossOpenArea = grossOpenArea + openArea;
			totalLoss = totalLoss + openingLoss;
			
		}
		
		totWall = totWall + grossWallArea;
		totJoin = totJoin + grossOpenArea;
		
		let nettWallArea = grossWallArea - grossOpenArea;
		let wallRVal = Number(houseWalls[i].wallR);
		
		let wallLoss = nettWallArea / wallRVal;
		
		wallLossPrint = wallLossPrint + wallLoss;
		
		totalLoss = totalLoss + wallLoss;
		
	}
	
	
	const warnBr = document.getElementById(`warnBreak`);
	
	let glazeCheck = totJoin/totWall;
	
	if (glazeCheck > 0.4){
		console.log("Glazing exceed 40% of wall area")
		document.getElementById("winWarn").innerHTML = "WARNING! Joinery elements exceed 40% of the total wall area";
		warnBr.style.display = '';
		
		}
		else{console.log("Glazing pass")
		document.getElementById("winWarn").innerHTML = "";
		warnBr.style.display = 'none';
	}
	
	
	
	console.log("total loss now" + totalLoss);
	console.log("Slab loss now " + floorSlabLoss)
	
	totalLoss = (totalLoss + floorSlabLoss).toFixed(2);
	
	console.log("total loss after" + totalLoss);
	
	console.log("The total heat loss from this building is " + totalLoss + " W/°C");
	
	if (totalLoss > 0 && totalLoss < 5000){
		document.getElementById("proTot").innerHTML = totalLoss + '<span class="resUnits">W/°C</span>';
	}
	else{
		document.getElementById("proTot").innerHTML = '';
	}
	
	if (floorSlabLoss > 0 && floorSlabLoss < 500){
		document.getElementById("proSlab").innerHTML = floorSlabLoss.toFixed(2) + '<span class="resUnits">W/°C</span>';
	}
	else {
		document.getElementById("proSlab").innerHTML = " ";
	}
	
	if (floorLossPrint > 0 && floorLossPrint < 500){
		document.getElementById("proFloor").innerHTML = floorLossPrint.toFixed(2) + '<span class="resUnits">W/°C</span>';
	}
	else {
		document.getElementById("proFloor").innerHTML = " ";
	}
	
	if (roofLossPrint > 0 && roofLossPrint < 500) {
		document.getElementById("proRoof").innerHTML = roofLossPrint.toFixed(2) + '<span class="resUnits">W/°C</span>';
	}
	else {
		document.getElementById("proRoof").innerHTML = " ";
	}
	
	if (skyLossPrint > 0 && skyLossPrint < 500) {
		document.getElementById("proSky").innerHTML = skyLossPrint.toFixed(2) + '<span class="resUnits">W/°C</span>';
	}	
	else {
		document.getElementById("proSky").innerHTML = " ";
	}
	
	
	if (wallLossPrint > 0 && wallLossPrint < 500) {
		document.getElementById("proWalls").innerHTML = wallLossPrint.toFixed(2) + '<span class="resUnits">W/°C</span>';
	}
	else {
		document.getElementById("proWalls").innerHTML = " ";
	}
	
	
	if (openingLossPrint > 0 && openingLossPrint < 500) {
		document.getElementById("proOpen").innerHTML = openingLossPrint.toFixed(2) + '<span class="resUnits">W/°C</span>';
	}
	else {
		document.getElementById("proOpen").innerHTML = " ";
	}
	
	
}







var modal = document.getElementById("myModal");


window.onload = function() {
	console.log(modal);
    modal.style.display = "block";
};


function closeModal() {
    modal.style.display = "none";
}


function acceptTerms() {
    var agreeCheckbox = document.getElementById("agree");

    if (agreeCheckbox.checked) {
        closeModal(); 
    } else {
        alert("Please agree to the terms and conditions.");
    }
}
