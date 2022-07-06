import { ElementUsageDefs } from "../models/ElementUsageDefs.js";
import generateResponse from "../helpers/genResponse.js";

export async function getMandatoryElementStatus(req, res) {

    const { agency, version, segmentId } = req.body;
    const query = {
        Agency: agency,
        Version: version,
        SegmentID: segmentId,
        RequirementDesignator: 'M'
    };

    let response = null;

    try {
        const data = await ElementUsageDefs.findOne(query);

        if (data !== null) {
            response = generateResponse(true, "found successfully", data);
        }
        else if (data === null) {
            response = generateResponse(true, "No record found", null);
        }
    }
    catch (err) {
        response = generateResponse(false, `there occured some error : ${err}`, null);
        res.status(500).send(response);
    }

    res.status(200).send(response);
}

