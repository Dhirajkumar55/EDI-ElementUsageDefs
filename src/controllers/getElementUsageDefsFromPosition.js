import { ElementUsageDefs } from "../models/ElementUsageDefs.js";
import generateResponse from "../helpers/genResponse.js";

export async function getElementUsageDefsFromPosition(req, res) {

    const { agency, version, segmentId, segmentPosition, position } = req.body;
    const query = {
        Agency: agency,
        Version: version,
        SegmentID: segmentId,
        Position: position
    };

    let response = null;

    try {
        const data = await ElementUsageDefs.find(query);

        if (data.length > 0) {
            response = generateResponse(true, "found successfully", data);
        }
        else if (data.length === 0) {
            response = generateResponse(true, "No ElementUsageDefs found", null);
        }
    }
    catch (err) {
        response = generateResponse(false, `there occured some error : ${err}`, null);
        res.status(500).send(response);
    }

    response = JSON.parse(response);
    response.segmentPosition = segmentPosition;
    response = JSON.stringify(response);
    res.status(200).send(response);
}