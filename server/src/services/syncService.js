const Track = require("../models/Track");

const platformServices = require("./platforms");

const syncTrack = async (trackId, userId) => {

    const track = await Track.findOne({
        _id: trackId,
        user: userId,
    });

    if (!track) {
        throw new Error("Track not found.");
    }

    for (const profile of track.connectedProfiles) {

        const service = platformServices[profile.platform];

        if (!service) {
            console.log(`${profile.platform} is not supported.`);
            continue;
        }

        try {

            const data = await service(profile.username);

            profile.syncedData = data;
            profile.lastSynced = new Date();

        } catch (error) {

            console.log(
                `Failed to sync ${profile.platform}:`,
                error.message
            );

        }

    }

    await track.save();

    return track;
};

module.exports = {
    syncTrack,
};