const {
    getDSAWorkspace,
} = require("../services/workspaceService");

const getWorkspace = async (req, res) => {
    try {

        const workspace =
            await getDSAWorkspace(req.user.id);

        console.log(workspace);

        res.status(200).json({
            success: true,
            workspace,
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

module.exports = {
    getWorkspace,
};