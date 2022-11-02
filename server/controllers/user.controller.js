exports.allAccess = (req, res) => {
  res
    .status(200)
    .send("This is for viewers. Authorized and Authorized persons can see");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
