const Track = require("../models/Track");

const { syncLeetCode } = require("./sync");

const syncTrack = async (trackId, userId) => {

    const track = await Track.findOne({
        _id: trackId,
        user: userId,
    });

    if (!track) {
        throw new Error("Track not found.");
    }

    for (const profile of track.connectedProfiles) {

        try {

            switch (profile.platform.toLowerCase()) {

                case "leetcode":

                    await syncLeetCode(
                        userId,
                        profile.username
                    );

                    profile.lastSynced = new Date();

                    break;

                case "github":

                    console.log("GitHub sync coming soon...");

                    break;

                case "codeforces":

                    console.log("Codeforces sync coming soon...");

                    break;

                case "codechef":

                    console.log("CodeChef sync coming soon...");

                    break;

                case "gfg":

                    console.log("GFG sync coming soon...");

                    break;

                default:

                    console.log(
                        `Platform ${profile.platform} not supported`
                    );

            }

        } catch (err) {

            console.error(
                `${profile.platform} sync failed`,
                err.message
            );

        }

    }

    await track.save();

    return track;

};

module.exports = {
    syncTrack,
};