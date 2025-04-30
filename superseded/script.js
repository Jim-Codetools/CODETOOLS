

const addWallTypeBtn = document.getElementById('addWallType');
const wallTypes = document.getElementById('wallTypes');
let wallTypeCount = 0;
const wallValues =[];
let wallCount = 0;
let roofCount = 0;

const houseWalls = [];
const houseRoofs = [];
let floorLoss = 0;
let floorArea = 0;

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
					
					<div class="nextTo">
					
						<div class="sides" style="width:176px;">
							<label for="claddingType${wallTypeCount}">Cladding</label>
							<br>
							<select class="selA" style="width:176px;" id="claddingType${wallTypeCount}" name="claddingType${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
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
							
							<span class="rLabel">R</span><input class="rValueA" type="number" id="rValue${wallTypeCount}" name="rValue${wallTypeCount}" step="0.1" min="1.8" max="5" onchange="updateRoundedValue('rValue${wallTypeCount}'); calcWallR(${wallTypeCount})">
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
								<select class="selA" id="stud${wallTypeCount}" name="stud${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
									<option value="90x45">90x45mm</option>
									<option value="90x90">90x90mm</option>
									<option value="140x45">140x45mm</option>
								</select>
							</div>
							
							<div class="sides1">
								<label for="studSpacing${wallTypeCount}">Spacing</label>
								<br>
								<select class="selA" id="studSpacing${wallTypeCount}" name="studSpacing${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
									<option value="0.6">600mm Crs</option>
									<option value="0.4">400mm Crs</option>
								</select>
							</div>
							
							<div class="sides1">
								<label for="nogSpacing${wallTypeCount}">Nogs</label>
								<br>
								<select class="selA" id="nogSpacing${wallTypeCount}" name="nogSpacing${wallTypeCount}" onchange="calcWallR(${wallTypeCount})">
									<option value="0.8">800mm Crs</option>
									<option value="0.4">400mm Crs</option>
								</select>
							</div>
							
							<br>
					</div>
						
						
						
					</div>
					
					<br>
					
					<div>
						<p id = "wallDets${wallTypeCount}"></p>
						<br>
					</div>
					
				</div>

		`;
		
		wallTypes.appendChild(newWallType);
		
		calcWallR(wallTypeCount);
		
	}

}



function addRoof() {
	
	if (roofCount<4){
	
		roofCount++;
		const newRoofType = document.createElement('div');
		newRoofType.id = 'roofType' + roofCount;
		newRoofType.classList.add('roof');
		newRoofType.innerHTML = `
		
			<div class="nextTo">
					<p class="itemName" style = "margin-right:20px;"> Roof Area ${roofCount}</p>
					
					<div>
						<input type="radio" id="truss${roofCount}" name="roofType${roofCount}" value="truss" onchange="calcRoofR(${roofCount})" checked="checked">
						<label for="truss${roofCount}">Truss</label>	
					
						<input type="radio" id="rafter${roofCount}" name="roofType${roofCount}" value="rafter" onchange="calcRoofR(${roofCount})">
						<label for="rafter${roofCount}">Rafter</label>
					</div>
					<br>
				</div>
				
			</div>	
			
			<br>
					
			<div class="nextTo">
				
					<div class="sides">
						<label for="roofArea${roofCount}">Total Area</label> <br>
						<input class="area" type="number" id="roofArea${roofCount}" name="roofArea${roofCount}" step="0.1" min="1" max="300" onchange="updateRoundedValue('roofArea${roofCount}'); calcRoofR(${roofCount})"><span class="units">m²</span>
					</div>
					
						
					<div id="trussOps${roofCount}">
					
						<div class="nextTo">
						
							<div class="insu">
								<label for="btmR${roofCount}">Insulation</label> <br>
								<span class="rLabel">R</span><input class="rValue" type="number" id="btmR${roofCount}" name="btmR${roofCount}" step="0.1" min="1.8" max="8" onchange="updateRoundedValue('btmR${roofCount}'); calcRoofR(${roofCount})">
								<p class="insuTxt"> layer 1</p>
							</div>
							
							<div class="insu">
								<br>
								<span class="rLabel">R</span><input class="rValue" type="number" id="topR${roofCount}" name="topR${roofCount}" step="0.1" min="1.8" max="8" onchange="updateRoundedValue('topR${roofCount}'); calcRoofR(${roofCount})">
								<p class="insuTxt"> layer 2</p>
							</div>
							
						</div>
						
					</div>
					
				
					<div class="sides" id="rafterInsuOptions${roofCount}">
						<label for="roofR${roofCount}">Insulation</label> <br>
						<span class="rLabel">R</span><input class="rValue" type="number" id="roofR${roofCount}" name="2roofR${roofCount}" step="0.1" min="1.8" max="8" onchange="updateRoundedValue('roofR${roofCount}'); calcRoofR(${roofCount})">
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
							<select id="rafterSpec${roofCount}" name="rafterSpec${roofCount}" onchange="calcRoofR(${roofCount})">
								<option value="90x45"> 90x45mm</option>
								<option value="140x45">140x45mm</option>
								<option value="190x45">190x45mm</option>
								<option value="240x45">240x45mm</option>
							</select>
							
						</div>
					
						<div class="sides1">
							<label for="rafterSpacing${roofCount}">Spacing</label>
							<br>
							<select id="rafterSpacing${roofCount}" name="rafterSpacing${roofCount}" onchange="calcRoofR(${roofCount})">
								<option value="0.4">400mm Crs</option>
								<option value="0.6">600mm Crs</option>
								<option value="0.9">900mm Crs</option>
							</select>
						</div>
					
						<div class="sides1">
							<label for="roofNog${roofCount}">Blocking</label>
							<br>
							<select id="roofNog${roofCount}" name="roofNog${roofCount}" onchange="calcRoofR(${roofCount})">
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
				
				
				<br>
				
				
				<div class="skyLights" id="skyBar${roofCount}">
					
					<div class="nextTo">
					
						<div style="width:86px;"></div>
						<div class="column"><p>Width</p></div> 
						<div class="tableX">x</div>
						<div class="column"><p>Length</p></div>
						<div class="tableM">(m)</div>
						<div class="column"><p>R</p></div>
					
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
	
		houseRoofs.push(roof);
		
		
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
					<input class="rValueOp" type="number" id="skyR${roofNum}_${skyCount}" name="skyR${roofNum}_${skyCount}" max="1.1" step="0.01" value="0.35" onchange="calcSkylight(${roofNum}, ${skyCount})">
					
					
					<div class="skyResult">
						<div style ="width:206px;">
							<p id = "areaLossA${roofNum}_${skyCount}"> </p>
						</div>
						
						<div class = "outPut">
						
							<div class = "resDiv">
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
	
	const trussOps = document.getElementById(`trussOps${roofNumber}`);
	const rafterOps = document.getElementById(`rafterOptions${roofNumber}`);
	const rafterInsuOps = document.getElementById(`rafterInsuOptions${roofNumber}`);
	
	const roofArea = (document.getElementById(`roofArea${roofNumber}`)).value;
	
	let roofRvalue = 0;
	
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
	
	let framingRatio, insuRatio;
	
	
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
	
	houseRoofs[(roofNumber-1)].roofR = Number (roofRvalue);
	houseRoofs[(roofNumber-1)].roofArea = Number (roofArea);
	
	let framePrt = (framingRatio*100).toFixed(1);
	let insuPrt = (insuRatio*100).toFixed(1);
	
	if (roofArea > 0){
		document.getElementById(`roofDetsA${roofNumber}`).innerHTML = `&nbsp;Framing ${framePrt}% | Insulation ${insuPrt}%`;
	}
	else{
		document.getElementById(`roofDetsA${roofNumber}`).innerHTML = ``;
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
			<div class = "nextTo">
				<p class="itemName" style="margin-right:20px;"> Wall ${wallCount} </p>
				
				<div class = "sides">
					<input type="checkbox" id="byArea${wallCount}" name="byArea${wallCount}" onchange="wallArea(${wallCount})">
					<label for="byArea${wallCount}">By Area</label>
				</div>
				
			</div>
			
			<br>
			<div class="nextTo">
			
			
				<div class="nextTo" id = "wallDimsIn${wallCount}">
					<div class="sides">
						<label for="length${wallCount}">Length</label>
						<br>
						<input class="distance" type="number" id="length${wallCount}" name="length${wallCount}" max="40" step="0.1" onchange="updateRoundedValue('length${wallCount}'); wallArea(${wallCount})"><span class="units">m</span>
					</div>
					
					<div >
						<label for="height${wallCount}">Height</label>
						<br>
						<input class="distance" type="number" id="height${wallCount}" name="height${wallCount}" max="4" step="0.1" onchange="updateRoundedValue('height${wallCount}'); wallArea(${wallCount})"><span class="units">m</span>
					</div>
				</div>	
				
				
				<div class="nextTo" id="wallAreaIn${wallCount}">
				
				
					<div style="width:156px;">
					</div>
				
				
					<div>
						<label for="wallAreaInp${wallCount}">Area</label> 
						<br>
						<div>
							<input class="area" type="number" id="wallAreaInp${wallCount}" name="wallAreaInp${wallCount}" min="1" max="300" step="0.1" onchange="updateRoundedValue('wallAreaInp${wallCount}'); wallArea(wallCount)"><span class="units">m²</span>
						</div>
						
					</div>
					
					
				</div>
				
				<div style="margin-left:133px;">
					<br>
					<select id="whichWallType${wallCount}" name="whichWallType${wallCount}" onchange="wallArea(${wallCount})">
								<option value="0">Wall Type 1</option>
					</select>
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
			
			
			<br>
			<div class="windows" id="winBar${wallCount}">
				
				<div class="nextTo">
					
					<div style="width:86px;"></div>
					<div class="column"><p>Width</p></div> 
					<div class="tableX">x</div>
					<div class="column"><p>Height</p></div>
					<div class="tableM">(m)</div>
					<div class="column"><p>R</p></div>
					
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
    
    const lengthSelect = document.getElementById(`length${wallCount}`);
	const heightSelect = document.getElementById(`height${wallCount}`);
	const areaSelect = document.getElementById(`wallAreaInp${wallCount}`);
	
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
	
    } else {
		wallDimsIn.style.display = "";
		wallAreaIn.style.display = "none";
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
	let wallRV = Number(wallRInput.value);
	
	houseWalls[(wallCount-1)].wallR = wallRV;
	
	updateResults();
	 
}

function roundOne(orgNum){
	let roundNum = orgNum.toFixed(1);
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


function windowArea(wallNum, windowCount){
	
	const widthInput = document.getElementById(`width${wallNum}_${windowCount}`);
	const windowWidth = Number(widthInput.value);
	const heightInput = document.getElementById(`height${wallNum}_${windowCount}`);
	const windowHeight = Number(heightInput.value);
	
	let windowArea = (windowWidth*windowHeight).toFixed(2);
	
	houseWalls[(wallNum-1)].openings[(windowCount-1)].openingArea = windowArea;
	
	
	const openRInput = document.getElementById(`openR${wallNum}_${windowCount}`);
	let openR = Number(openRInput.value);
	
	houseWalls[(wallNum-1)].openings[(windowCount-1)].openingR = openR;
	
	updateResults();
	
	
}

function updateResults(){
	
	for (let i = 0; i < wallCount; i++){
		
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
				document.getElementById(`opArea${(i+1)}_${(x+1)}`).innerHTML = `${openAreaPrint}m²`;
				document.getElementById(`result${(i+1)}_${(x+1)}`).innerHTML = `${openingLoss}W/C°`;
			}
			
		}
		
		let nettWallArea = (grossWallArea - grossOpenArea).toFixed(2);
		let wallRVal = houseWalls[i].wallR;
		
		let wallLoss = (nettWallArea / wallRVal).toFixed(2);
		
		if (nettWallArea > 0){
		document.getElementById(`wDets${(i+1)}`).innerHTML = `Nett Area ${nettWallArea}m²`;
		document.getElementById(`wLabel${(i+1)}`).innerHTML = `Energy Loss =`;
		document.getElementById(`result${(i+1)}`).innerHTML = `${wallLoss}W/C°`;
		}
		
		refBuilding();
		
		
		
		
	}
	
}


function updateRoofResults(){

	
	for (let i = 0; i < roofCount; i++){
		
		let grossRoofArea = houseRoofs[i].roofArea;
		
		
		let skyCount = houseRoofs[i].skylights.length;
		
		
		let grossSkyArea = 0;
		
		for (let x = 0; x < skyCount; x++) {
			
			let skyArea = Number(houseRoofs[i].skylights[x].skylightArea);
			let skyAreaPrint = skyArea.toFixed(2);
			let skyR = houseRoofs[i].skylights[x].skylightR;
			let skyLoss = (skyArea / skyR).toFixed(2);
			
			grossSkyArea = grossSkyArea + skyArea;
			
			
			if (skyArea > 0 && skyR > 0){
			document.getElementById(`areaLossA${(i+1)}_${(x+1)}`).innerHTML = ` ${skyAreaPrint}m²`;
			document.getElementById(`areaLossB${(i+1)}_${(x+1)}`).innerHTML = `${skyLoss}W/C°`;
			}
			else {
				document.getElementById(`areaLossA${(i+1)}_${(x+1)}`).innerHTML = ``;
				document.getElementById(`areaLossB${(i+1)}_${(x+1)}`).innerHTML = ``;		
			}
			
		}
		
		let nettRoofArea = (grossRoofArea - grossSkyArea).toFixed(2);
		let roofRVal = houseRoofs[i].roofR;
		
		
		let roofLoss = (nettRoofArea / roofRVal).toFixed(2);
		
		if (roofLoss > 0){
			
			document.getElementById(`roofDets${(i+1)}`).innerHTML = `Nett Area ${nettRoofArea}m² | R${roofRVal} |`;
			document.getElementById(`rLabel${(i+1)}`).innerHTML = `Energy Loss =`;
			document.getElementById(`roofResult${(i+1)}`).innerHTML = `${roofLoss}W/C°`;
			
			refBuilding();
		}
		
		
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
				<div style=" height:28px; display:flex; width:86px; justify-content:center; align-items:center; margin: 0px 0px 5px 0px;">
					<p1> Joinery ${windowCount} - </p1>
				</div>
				
				<input class="distanceOp" style ="border-radius:6px 0px 0px 6px;" type="number" id="width${wallNum}_${windowCount}" name="width${wallNum}_${windowCount}" max="6" step="0.1" placeholder="0.0" onchange="updateRoundedValue('width${wallNum}_${windowCount}'); windowArea(${wallNum}, ${windowCount})">
				
				<input class="distanceOp" type="number" id="height${wallNum}_${windowCount}" name="height${wallNum}_${windowCount}" max="4" step="0.1" placeholder="0.0" onchange="updateRoundedValue('height${wallNum}_${windowCount}'); windowArea(${wallNum}, ${windowCount})">
				
				<input class="rValueOp" type="number" id="openR${wallNum}_${windowCount}" name="openR${wallNum}_${windowCount}" max="1.1" step="0.01" value="${typOpeningR}" onchange="windowArea(${wallNum}, ${windowCount})">
				
				<div class="opResult"> 
				
					<div style ="width:206px;">
						<p1 id="opArea${wallNum}_${windowCount}"> </p1>
					</div>
					
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
			
			
			refBuilding();
			
			
			updateResults();
			
			
			if(windowCount == 1){
				const joineryHead = document.getElementById(`winBar${wallNum}`)
				const lessBtn = document.getElementById(`lessWin${wallNum}`)
				
				lessBtn.style.display = "none";
				joineryHead.style.display = "none";
				
			}
			
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


function calcSlabR() {
	
	const slabArea = (document.getElementById('slabArea')).value;
	const slabPerimeter = (document.getElementById('slabPerimeter')).value;
	
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
	
	
	
	
	let apRatio = 0;
	let slabRvalue = 0;
	
	
	apRatio = slabArea / slabPerimeter;
	apRatio = apRatio.toFixed(2);

	

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
		
		let slabLoss = (slabArea / slabRvalue).toFixed(2);
		
		floorLoss = Number(slabLoss);
		floorArea = Number(slabArea);
		
		if (slabLoss > 0 && slabLoss < 500 && slabArea <= 300) {
			
			document.getElementById("slabDets").innerHTML = "A/P Ratio " + apRatio + " | R" + slabRvalue.toFixed(1);
			document.getElementById("sLabel").innerHTML = "Energy Loss =";
			document.getElementById("slabResult").innerHTML = slabLoss + "W/C°";

		}
		
		else {
			
			document.getElementById("slabDets").innerHTML = "";
			document.getElementById("sLabel").innerHTML = "";
			document.getElementById("slabResult").innerHTML = "";
			
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
	
	const cladLabel = document.querySelector(`label[for='claddingType${wallTypeNumber}']`);
	
	const locationSelect = document.getElementsByName(`location${wallTypeNumber}`);
	let locationValue = '';
	for (let i = 0; i < locationSelect.length; i++) {
		if (locationSelect[i].checked) {
			locationValue = locationSelect[i].value;
			break;
			}
	}
	
	
	if(locationValue === 'internal') {
		claddingSelect.style.display = "none";
		cladLabel.style.display = "none";
	
    } else {
		claddingSelect.style.display = "";
		cladLabel.style.display = "";
    }
	
	
	let studWidth, studThickness, nogQty, framingRvalue, framingLayer, cavityLayer, claddingLayer, wallRvalue;
	
	
	
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
		wallRvalue = 0.09 + 0.04 + framingLayer + claddingLayer + 0.03;
	}
	
	wallRvalue = wallRvalue.toFixed(2);
	
	let arrayRef = wallTypeNumber - 1;
	
	wallValues[arrayRef] = wallRvalue;
	
	if (insulationRvalue > 0){
			
			document.getElementById(`wallDets${wallTypeNumber}`).innerHTML = `Framing ${framePrint}% | Insulation ${insuPrint}% | R${wallRvalue}`;
		}
	
	updateOptions();
	
}


let roofRefR = 0;
let wallRefR = 0;
let slabRefR = 0;
let openingRefR = 0;
let skylightRefR = 0;

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
		openingRefR = 0.46;
		skylightRefR = 0.46;
	}
	else if (climateZone === '2'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.5;
		openingRefR = 0.46;
		skylightRefR = 0.46;
	}
	else if (climateZone === '3'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.5;
		openingRefR = 0.46;
		skylightRefR = 0.54;
	}
	else if (climateZone === '4'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.5;
		openingRefR = 0.46;
		skylightRefR = 0.54;
	}
	else if (climateZone === '5'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.6;
		openingRefR = 0.5;
		skylightRefR = 0.62;
	}
	else if (climateZone === '6'){
		roofRefR = 6.6;
		wallRefR = 2.0;
		slabRefR = 1.7;
		openingRefR = 0.5;
		skylightRefR = 0.62;
	}
	
	refBuilding();
	
}


function refBuilding (){
	
		let refLoss = 0;
		
		let grossWallArea = 0;
		let grossRoofArea = 0;
		
		for (let w = 0; w < wallCount; w++) {
			
			grossWallArea = grossWallArea + (houseWalls[w].wallArea);	
		}
		
		let nettWallArea = grossWallArea * 0.7;
		let openingArea = grossWallArea * 0.3;
		
		let wallLoss = nettWallArea / wallRefR;
		
		let openingLoss = openingArea / openingRefR;

		
		for (let r = 0; r < roofCount; r++) {
			
			grossRoofArea = grossRoofArea + houseRoofs[r].roofArea;
				
		}
		
		let roofLoss = grossRoofArea / roofRefR;
		
		
		
		let refSlabLoss = floorArea / slabRefR;
		
		
		
		refLoss = Number((wallLoss + openingLoss + roofLoss + refSlabLoss).toFixed(2));
		
		
		
		
		if (refSlabLoss > 0 && refSlabLoss < 500){
			document.getElementById("refSlab").innerHTML = refSlabLoss.toFixed(2) + "W/C°";
			document.getElementById("slabVals").innerHTML = "= " + floorArea.toFixed(1) + "m²" + " / " + "R" + slabRefR;
		}
		
		
		if (roofLoss > 0 && roofLoss < 500){
			document.getElementById("refRoof").innerHTML = roofLoss.toFixed(2) + "W/C°";
			document.getElementById("roofVals").innerHTML = "= " + grossRoofArea.toFixed(1) + "m²" + " / " + "R" + roofRefR;
		}
		
		if (wallLoss > 0 && wallLoss < 500) {
			document.getElementById("refWalls").innerHTML = wallLoss.toFixed(2) + "W/C°";
			document.getElementById("wallVals").innerHTML = "= " + nettWallArea.toFixed(1) + "m²" + " / " + "R" + wallRefR.toFixed(1);
		}
		
		if (openingLoss > 0 && openingLoss < 500){
			document.getElementById("refOpen").innerHTML = openingLoss.toFixed(2) + "W/C°";
			document.getElementById("openVals").innerHTML = "= " + openingArea.toFixed(1) + "m²" + " / " + "R" + openingRefR.toFixed(2);
		}
		
		if (refLoss > 0 && refLoss < 5000) {
			document.getElementById("refTot").innerHTML = refLoss + "W/C°";
		}
		
		


	proBuilding(refLoss);
	
}

function proBuilding(refLoss){
	
	let totalLoss = 0;
	let roofLossPrint = 0;
	let skyLossPrint = 0;
	let wallLossPrint = 0;
	let openingLossPrint = 0;
	
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
		
		let nettWallArea = grossWallArea - grossOpenArea;
		let wallRVal = Number(houseWalls[i].wallR);
		
		let wallLoss = nettWallArea / wallRVal;
		
		wallLossPrint = wallLossPrint + wallLoss;
		
		totalLoss = totalLoss + wallLoss;
		
	}
	
	
	
	totalLoss = (totalLoss + floorLoss).toFixed(2);
	
	if (totalLoss > 0 && totalLoss < 5000){
		document.getElementById("proTot").innerHTML = totalLoss + "W/C°";
	}
	
	if (floorLoss > 0 && floorLoss < 500){
		document.getElementById("proSlab").innerHTML = floorLoss.toFixed(2) + "W/C°";
	}
	else {
		document.getElementById("proSlab").innerHTML = " ";
	}
	
	if (roofLossPrint > 0 && roofLossPrint < 500) {
		document.getElementById("proRoof").innerHTML = roofLossPrint.toFixed(2) + "W/C°";
	}
	else {
		document.getElementById("proRoof").innerHTML = " ";
	}
	
	if (skyLossPrint > 0 && skyLossPrint < 500) {
		document.getElementById("proSky").innerHTML = skyLossPrint.toFixed(2) + "W/C°";
	}	
	else {
		document.getElementById("proSky").innerHTML = " ";
	}
	
	
	if (wallLossPrint > 0 && wallLossPrint < 500) {
		document.getElementById("proWalls").innerHTML = wallLossPrint.toFixed(2) + "W/C°";
	}
	else {
		document.getElementById("proWalls").innerHTML = " ";
	}
	
	
	if (openingLossPrint > 0 && openingLossPrint < 500) {
		document.getElementById("proOpen").innerHTML = openingLossPrint.toFixed(2) + "W/C°";
	}
	else {
		document.getElementById("proOpen").innerHTML = " ";
	}
	
	
}



var modal = document.getElementById("myModal");

window.onload = function() {
	
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
