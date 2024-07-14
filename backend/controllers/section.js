const Course = require("../models/Course");
const { Section, SubSection } = require("../models/Section");
const { uploadToCloudinary } = require("../utilities/imageUploader");

exports.addSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;
    // validation
    if (!sectionName || !courseId) {
      throw "Missing Properties";
    }
    // careated section
    const sectionDetails = await Section.create({ sectionName });
    // find course
    const courseDetails = await Course.findById(courseId);
    // course validation
    if (!courseDetails) {
      throw "course not existed error creating section";
    }
    // update details of course
    courseDetails.sections.push(sectionDetails._id);
    const updatedCourse = await courseDetails.save();
    return res.status(200).json({
      success: true,
      message: "successfully created section",
      reponse: {
        updatedCourse,
        sectionDetails,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;
    if (!sectionName || !sectionId) {
      throw "missing properties";
    }
    const section = await Section.findById(sectionId);
    if (!section) {
      throw new Error("section not found");
    }
    section.sectionName = sectionName;
    const updatedSection = await section.save();
    return res.status(200).json({
      success: true,
      message: "Successfully updated section",
      response: updatedSection,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    if (!sectionId || !courseId) {
      throw "missing Property";
    }
    const section = await Section.findByIdAndDelete(sectionId);
    if (!section) {
      throw new Error("section not found");
    }
    // TODO delete from course
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      throw new Error("course not found");
    }
    courseDetails.sections = courseDetails.sections.filter(
      (id) => id.toString() !== sectionId,
    );
    const updatedCourse = await courseDetails.save();
    return res.status(200).json({
      success: true,
      message: "Successfully deleted section",
      response: updatedCourse,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
exports.addSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;
    // validate
    if (!title || !timeDuration || !description || !sectionId) {
      throw new Error("missing details");
    }
    // validate subseciton already exist?
    const sectionDetails = await Section.findById(sectionId);
    let subSection = await SubSection.findOne({ title, timeDuration });

    if (subSection && sectionDetails.subSection.includes(subSection._id)) {
      throw new Error("sub section already exist");
    }
    // get video from req.body and upload to cloudinary
    const video = req.files.videoFile;
    //create subsection
    const videoFile = await uploadToCloudinary(
      video.tempFilePath,
      process.env.CLOUD_FOLDER,
    );
    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      // videurl and addition url
      videoUrl: videoFile,
    });
    // update to section
    sectionDetails.subSection.push(subSectionDetails._id);
    await sectionDetails.save();
    return res.status(200).json({
      success: true,
      message: "added sub section successfully",
      reponse: { sectionDetails, subSectionDetails },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, subSectionId, video } = req.body;
    if (!title || !timeDuration || !description || !subSectionId) {
      throw "missing properties";
    }
    const subSectionDetails = await SubSection.findById(subSectionId);

    if (!subSectionDetails) {
      throw new Error(" sub section not found ");
    }
    if (video) {
      const videoFileLink = await uploadToCloudinary(
        video.tempFilePath,
        process.env.CLOUD_FOLDER,
      );
      subSectionDetails.videoUrl = videoFileLink;
    }
    if (title) {
      subSectionDetails.title = title;
    }
    if (timeDuration) {
      subSectionDetails.timeDuration = timeDuration;
    }
    if (description) {
      subSectionDetails.description = description;
    }
    const updatedSubSection = await subSectionDetails.save();
    return res.status(200).json({
      success: true,
      message: "updated subsection success",
      response: updatedSubSection,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;
    if (!sectionId || !subSectionId) {
      throw "missing Properties";
    }
    const sectionDetails = await Section.findById(sectionId);
    const subSectionDetails = await SubSection.findById(subSectionId);
    if (!sectionDetails) {
      throw new Error("section not found");
    }

    if (!subSectionDetails) {
      throw new Error("sub section not found");
    }

    sectionDetails.subSection = sectionDetails.subSection.filter(
      (id) => id.toString() !== subSectionId,
    );
    const updatedSection = await sectionDetails.save();
    return res.status(200).json({
      success: true,
      message: "deleted sub section successfully",
      response: updatedSection,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.showAllSections = async (req, res) => {
  try {
    const sectionDetails = await Section.find({}, { name: true })
      .populate("subSection")
      .exec();
    return res.status(200).json({
      success: true,
      message: "fetched all section successfully",
      response: sectionDetails,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
exports.showAllSubSections = async (req, res) => {
  try {
    const subSectionDetails = await Section.find(
      {},
      {
        title: true,
        timeDuration: true,
        description: true,
        videoUrl: true,
      },
    );
    return res.status(200).json({
      success: true,
      message: "fetched all sub section successfully",
      response: subSectionDetails,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

