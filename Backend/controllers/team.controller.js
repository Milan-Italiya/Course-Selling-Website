import { v2 as cloudinary } from 'cloudinary'
import { Team } from '../models/team.model.js';

export const CreateTeam = async (req, res) => {
    const adminId = req.adminId; // corrected destructuring
    try {
        const { name, email, role, bio, skills, linkedin, twitter, instagram } = req.body;
        console.log("body data", req.body);
        console.log("uploaded file", req.files); // Check what's arriving

        const ImgFormat = ['image/png', 'image/jpg', 'image/jpeg'];

        if (!name || !email || !role || !bio || !skills || !linkedin || !twitter || !instagram) {
            return res.status(400).json({ errors: "All fields are required" });
        }

        if (!req.files || !req.files.image) {
            return res.status(400).json({ errors: "No image uploaded" });
        }

        const image = req.files.image;

        if (!ImgFormat.includes(image.mimetype)) {
            return res.status(400).json({ errors: "Only png, jpg and jpeg are allowed" });
        }

        // Upload to cloudinary
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloud_response || cloud_response.error) {
            return res.status(500).json({ errors: "Cloudinary upload failed" });
        }

        const newTeam = new Team({
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.secure_url
            },
            name,
            email,
            role,
            bio,
            skills,
            linkedin,
            twitter,
            instagram,
            creatorId: adminId
        });

        await newTeam.save();

        return res.status(201).json({ message: "Team member created successfully", team: newTeam });

    } catch (error) {
        console.log('Error in creating team: ', error.message);
        return res.status(500).json({ errors: error.message });
    }
}
export const UpdateTeam = async (req, res) => {
    const adminId = req.adminId
    const { teamId } = req.params;
    const { name, email, role, bio, skills, linkedin, twitter, instagram } = req.body;

    try {
        const teamFind = await Team.findById(teamId)
        if (!teamFind) {
            return res.status(404).json({ errors: "Team not found" });
        }

        let updatedImage = teamFind.image;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "teams"
            });
            updatedImage = {
                public_id: result.public_id,
                url: result.url
            }
        }

        const team = await Team.findOneAndUpdate(
            { _id: teamId, creatorId: adminId },
            {
                name,
                email,
                role,
                bio,
                skills,
                linkedin,
                twitter,
                instagram
            }
        )
        if (!team) {
            res.status(404).json({ errors: "Can't update this team member because it is created by other admin" })
        }
        res.status(200).json({ message: "Team updated successfully", team });
    } catch (error) {
        console.log("error in update team : ", error);
        return res.status(500).json({ errors: error.message });
    }
}
export const DeleteTeam = async (req, res) => {
    const adminId = req.adminId
    const { teamId } = req.params
    try {
        const team = await Team.findByIdAndDelete({
            _id: teamId,
            creatorId: adminId
        })
        if (!team) {
            return res.status(404).json({ errors: "Can't delete this team member because it is created by other admin" });
        }
        return res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        console.log("error in delete team member : ", error);
        return res.status(500).json({ errors: error.message });
    }
}
export const GetTeams = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json({ message: "All teams", teams });
    } catch (error) {
        console.log('Error in getting teams: ', error.message);
        return res.status(500).json({ errors: error.message });
    }
}
