const db = require("../Database/db");

exports.storeIntoDb = async (req, res) => {
    const {
        campaignName,
        platform,
        product,
        budget,
        startDate,
        endDate,
        location,
        radius
    } = req.body;
    try {
        await db.none(
            `INSERT INTO campaigns_table (
                campaign_name,
                platform,
                product,
                start_date,
                end_date,
                location
            ) VALUES($1, $2, $3, $4, $5, $6);`,
            [
                campaignName,
                platform,
                product,
                budget,
                startDate,
                endDate,
                location,
                radius
            ]
        );

        return res.status(500).json({
            status: true,
            message: "New Campaign created"
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.getCampaign = async () => {
    try {
        await db.none(
            `SELECT * FROM campaigns_table;`
        ).then((res) => {
            return res.json();
        });
    } catch (err) {
        return console.log(err.message);
    }
}