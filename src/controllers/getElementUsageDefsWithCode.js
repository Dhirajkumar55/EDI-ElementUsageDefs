import { ElementUsageDefs } from "../models/ElementUsageDefs.js";
import { Code } from "../models/Code.js";
import generateResponse from "../helpers/genResponse.js";

let numberOfElements = 0;
let numberOfElementsRetrieved = 0;

export async function getElementUsageDefsWithCode(req, res) {

    const { agency, version, segmentId } = req.body;
    const query = {
        Agency: agency,
        Version: version,
        SegmentID: segmentId,
    };

    let object = null;

    try {
        const data = await ElementUsageDefs.find(query).lean();
        numberOfElements = data.length;

        if (data.length > 0) {
            object = generateResponse(true, "found successfully", data);
        }
        else if (data.length === 0) {
            object = generateResponse(true, "No ElementUsageDefs found", null);
        }
    }
    catch (err) {
        object = generateResponse(false, `there occured some error : ${err}`, null);
        res.status(500).send(object);
    }

    if(numberOfElements === 0){
        res.status(200).send(object);
    }
    else{
        numberOfElementsRetrieved=0;
        object = JSON.parse(object);
        getCodeWithElement(object, res);
    }

}

async function getCodeWithElement(obj,res){
    console.log("yes");
	if(numberOfElementsRetrieved<numberOfElements){

		obj.data[numberOfElementsRetrieved]['Code']="";
		const params=obj.data[numberOfElementsRetrieved];
		const query={
			Agency : params['Agency'],
			Version : params['Version'],		
			ElementID : params['ElementID']
		};

		const msg = await getOne(query);
        obj.data[numberOfElementsRetrieved]['Code']=JSON.parse(msg)['status'];
        numberOfElementsRetrieved++;
        getCodeWithElement(obj,res);

	}
	else{
		res.send(obj);
	}
}

async function getOne(query){

    let response;
    try{
        const data = await Code.findOne(query);

        if(data === null){
            response = generateResponse(false,"No record", data);
        }
        else if( data !== null ){
			response = generateResponse(true,"found successfully", data);	
		}
    }
    catch(err){
        response = generateResponse(false, `there occured some error : ${err}`, null);
    }

    return response;
}