import { ElementUsageDefs } from "../models/ElementUsageDefs.js";
import generateResponse from "../helpers/genResponse.js";

export async function getElementUsageDefs(req, res) {

    const { agency, version, segmentId } = req.body;
    const query = {
        Agency: agency,
        Version: version,
        SegmentID: segmentId,
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

    res.status(200).send(response);
}