import generateResponse from "../helpers/genResponse.js";
import { Code } from "../models/Code.js"

export async function getCode(req, res) {
    const { agency, version, element } = req.body;
    const query = {
        Agency: agency,
        Version: version,
        ElementID: element
    };

    let response = null;

    try {
        const data = await Code.find(query).select({ ElementID: 1, Value: 1, Description: 1, _id: 0 });
        
        if (data.length > 0) {
            response = generateResponse(true, "found successfully", data);
        }
        else if (data === undefined) {
            response = generateResponse(true, "No code found null", null);
        }
        else if (data.length != 0) {
            response = generateResponse(true, "No code found", null);
        }
    }
    catch (err) {
        response = generateResponse(false, `there occured some error : ${err}`, null);
        res.status(500).send(response);
    }

    res.status(200).send(response);
}